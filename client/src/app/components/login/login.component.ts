import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logForm: FormGroup;
  token: string;
  errors: any = {
    email: '',
    password: ''
  };

  onSubmit(logData) {
    this.errors.email = '';
    this.errors.password = '';
    this.apiservice.submitLogin(logData)
      .subscribe(
        data => {
          Object.keys(data).forEach(key => {
            localStorage.setItem(key, data[key]);
          });
          this.router.navigate(['/main']);
        },
        err => {
          Object.keys(err.error).forEach(key => {
            this.errors[key] = err.error[key];
          });
        });
  }

  constructor(private apiservice: ApiService, private router: Router, private formBuilder: FormBuilder) {
    this.logForm = this.formBuilder.group({
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
