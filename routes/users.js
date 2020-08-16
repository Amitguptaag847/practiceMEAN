const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../config/keys');
const User = require('../models/User');
const Education = require('../models/Education');
const Compatibility = require('../models/Compatibility');
const Jobs = require('../models/Jobs');

const router = express.Router();

const Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + Date.now() + file.originalname);
    }
});

const upload = multer({ storage: Storage }).single('image');

router.post("/uploadimage", (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(JSON.stringify(err));
            res.status(400).send('fail saving image');
        } else {
            const url = 'uploads/' + req.file.filename;
            await User.updateOne({ _id: req.body.id }, { avatar: url }, { upsert: true });
            const id = req.body.id;
            const user = await getUser(id, res);
            const edu = await getEdu(id);
            const job = await getJobs(id);
            if (user) {
                user.password = '';
                res.status(200).json({ 'user': user, 'job': job, 'edu': edu });
            } else {
                res.status(404).json({ 'error': user });
            }
        }
    });
});

router.post("/matches", async (req, res) => {
    const users = await User.find({});
    const compatibility = await Compatibility.find({});
    const compHashMap = [];
    await compatibility.forEach(temp => {
        compHashMap[temp.userId] = temp; 
    });
    com = compHashMap[req.body.id];
    const matches = [];
    await users.forEach(async user => {
        if (user._id != req.body.id) {
            const usermatch = compHashMap[user._id];
            let count = 0;
            const data = {
                id: user._id,
                matching: [],
                avatar: user.avatar,
                name: user.name,
                percentage: null
            };
            if (usermatch && com) {
                if (usermatch.hobbies === com.hobbies && usermatch.hobbies != '') {
                    data.matching.push(com.hobbies);
                    count++;
                }
                if (usermatch.smoke === com.smoke && usermatch.smoke != '') {
                    if (usermatch.smoke === "no") {
                        data.matching.push("Doesn't smoke");
                    } else {
                        data.matching.push("Does smoke");
                    }
                    count++;
                }
                if (usermatch.place === com.place && usermatch.place != '') {
                    data.matching.push('Favorite place '+com.place);
                    count++;
                }
            }
            data.percentage = Math.round(count * 100 / 3);
            matches.push(data);
        }
    });
    matches.sort((a, b) => {
        return b.percentage - a.percentage;
    });
    res.status(200).json(matches);
});

router.post("/setcompt", (req, res) => {
    const newCompt = new Compatibility({
        userId: req.body.id,
        hobbies: req.body.hobbies,
        smoke: req.body.smoke,
        place: req.body.place
    });
    newCompt.save()
        .then(compt => {
            User.updateOne({ _id: req.body.id }, { new: false }, { upsert: true })
                .then(data => res.status(200).json({ 'msg': 'success' }))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

router.post("/edit", async (req, res) => {
    const newUser = {
        phonenumber: req.body.phonenumber,
        gender: req.body.gender,
        dob: req.body.dob,
        facebook: req.body.facebook
    }
    const newEdu = {
        institutionName: req.body.institutionName,
        marks_cgpa: req.body.marks_cgpa,
        from: req.body.edufrom,
        to: req.body.eduto
    }
    const newJob = {
        companyName: req.body.companyName,
        designation: req.body.designation,
        from: req.body.jobfrom,
        to: req.body.jobto
    }
    await User.findOneAndUpdate({ _id: req.body.id }, { "$set": newUser });
    await Jobs.findOneAndUpdate({ userId: req.body.id }, { "$set": newJob });
    await Education.findOneAndUpdate({ userId: req.body.id }, { "$set": newEdu });

    const id = req.body.id;
    const user = await getUser(id, res);
    const edu = await getEdu(id);
    const job = await getJobs(id);
    if (user) {
        user.password = '';
        res.status(200).json({ 'user': user, 'job': job, 'edu': edu });
    } else {
        res.status(404).json({ 'error': user });
    }

});

router.post("/getprofile", async (req, res) => {
    const id = req.body.id;
    const user = await getUser(id, res);
    const edu = await getEdu(id);
    const job = await getJobs(id);
    if (user) {
        user.password = '';
        res.status(200).json({ 'user': user, 'job': job, 'edu': edu });
    } else {
        res.status(404).json({ 'error': user });
    }
});

router.post('/register', (req, res) => {
    const errors = {
        email: '',
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'Email already exists'
                return res.status(400).json(errors);
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    phonenumber: '',
                    facebook: '',
                    gender: '',
                    dob: null,
                    avatar: 'uploads/profile.jpg',
                    new: true
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                const newEdu = new Education({
                                    userId: user._id,
                                    institutionName: '',
                                    marks_cgpa: '',
                                    from: '',
                                    to: ''
                                });
                                newEdu.save();
                                const newJobs = new Jobs({
                                    userId: user._id,
                                    companyName: '',
                                    designation: '',
                                    from: '',
                                    to: ''
                                });
                                newJobs.save();
                                res.status(200).json(user);
                            })
                            .catch(console.log(err));
                    });
                });

            }
        })
});


router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = {
        email: '',
        password: ''
    }

    // Find the user by phone number
    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            } else {
                // Check password
                bcrypt.compare(password, user.password)
                    .then(isMatched => {
                        if (isMatched) {
                            // User matched
                            const payload = {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                new: user.new
                            }
                            // Sign Token
                            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                res.json({
                                    token: 'Bearer ' + token
                                });
                            });
                        } else {
                            errors.password = 'Password incorrect';
                            return res.status(400).json(errors);
                        }
                    });
            }
        });
});

router.get('/auth', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        new: req.user.new
    });
});

async function getUser(id, res) {
    const user = await User.findOne({ _id: id });
    if (user) {
        return user;
    } else {
        return false;
    }
}

async function getEdu(id) {
    const edu = await Education.findOne({ userId: id })
    if (edu) {
        return edu;
    } else {
        return false;
    }
}

async function getJobs(id) {
    const job = await Jobs.findOne({ userId: id })
    if (job) {
        return job;
    } else {
        return false;
    }
}

async function getCompt(id) {
    const comp = await Compatibility.findOne({ userId: id });
    if (comp) {
        return comp;
    } else {
        return false;
    }
}

module.exports = router;