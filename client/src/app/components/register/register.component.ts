import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;
  token: string;
  errors: any = {
    name: '',
    email: '',
    password: ''
  };

  onSubmit(regData) {
    this.errors.name = '';
    this.errors.email = '';
    this.errors.password = '';
    this.apiservice.submitRegister(regData)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        err => {
          console.log(err);
          Object.keys(err.error).forEach(key => {
            this.errors[key] = err.error[key];
          });
        });
  }

  constructor(private apiservice: ApiService, private router: Router, private formBuilder: FormBuilder) {
    this.regForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.router.navigate(['/main']);
    }
  }
}
