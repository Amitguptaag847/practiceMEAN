import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})

export class EditprofileComponent implements OnInit {
  data: any;
  profile: any;
  editForm: FormGroup;
  constructor(private dataService: DataService, private apiservice: ApiService, private formBuilder: FormBuilder) {
    this.data = this.dataService.getData();
    this.dataService.dataChange.subscribe(value => {
      this.data = value;
      if (this.data) {
        this.apiservice.getUserData(this.data.id)
          .subscribe(
            data => {
              this.profile = data;
              this.setProfile(data);
            },
            err => {
              console.log(err);
            }
          );
      }
    });
    this.editForm = this.formBuilder.group({
      email: [null],
      gender: [null],
      phonenumber: [null],
      dob: [null],
      facebook: [null],
      institutionName: [null],
      marks_cgpa: [null],
      edufrom: [null],
      eduto: [null],
      companyName: [null],
      designation: [null],
      jobfrom: [null],
      jobto: [null]
    });
  }
  arr(n: number, startFrom: number): number[] {
    return [...Array(n).keys()].map(i => i + startFrom);
  }

  processFile(e) {
    const file: File = e.target.files[0];
    this.apiservice.uploadImage(file, this.data.id)
      .subscribe(
        data => {
          if (data) {
            this.profile = data;
            this.setProfile(data);
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  onSubmit(editData) {
    if (this.data) {
      editData.id = this.data.id;
    }
    this.apiservice.submitEdit(editData)
      .subscribe(
        data => {
          alert('Profile updated!!!');
          this.profile = data;
          this.setProfile(data);
        },
        err => {
          console.log(err);
        });
  }

  ngOnInit(): void {
    if (this.data) {
      this.apiservice.getUserData(this.data.id)
        .subscribe(
          data => {
            this.profile = data;
            this.setProfile(data);
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  setProfile(d: any) {
    this.editForm.setValue({
      email: d.user.email,
      gender: d.user.gender,
      phonenumber: d.user.phonenumber,
      dob: d.user.dob == null ? null : (new Date(d.user.dob)).toISOString().split('T')[0],
      facebook: d.user.facebook,
      institutionName: d.edu.institutionName,
      marks_cgpa: d.edu.marks_cgpa,
      edufrom: d.edu.from,
      eduto: d.edu.to,
      companyName: d.job.companyName,
      designation: d.job.designation,
      jobfrom: d.job.from,
      jobto: d.job.to
    });
  }
}
