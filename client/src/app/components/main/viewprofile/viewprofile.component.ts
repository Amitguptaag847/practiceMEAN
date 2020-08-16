import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  id: any;
  profile: any;
  viewForm: FormGroup;
  constructor(private apiservice: ApiService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.viewForm = this.formBuilder.group({
      email: new FormControl({ value: '', disabled: true }),
      gender: new FormControl({ value: '', disabled: true }),
      phonenumber: new FormControl({ value: '', disabled: true }),
      dob: new FormControl({ value: null, disabled: true }),
      facebook: new FormControl({ value: '', disabled: true }),
      institutionName: new FormControl({ value: '', disabled: true }),
      marks_cgpa: new FormControl({ value: '', disabled: true }),
      edufrom: new FormControl({ value: '', disabled: true }),
      eduto: new FormControl({ value: '', disabled: true }),
      companyName: new FormControl({ value: '', disabled: true }),
      designation: new FormControl({ value: '', disabled: true }),
      jobfrom: new FormControl({ value: '', disabled: true }),
      jobto: new FormControl({ value: '', disabled: true })
    });
  }
  arr(n: number, startFrom: number): number[] {
    return [...Array(n).keys()].map(i => i + startFrom);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id) {
      this.apiservice.getUserData(this.id)
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
    this.viewForm.setValue({
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
