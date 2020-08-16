import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mcq',
  templateUrl: './mcq.component.html',
  styleUrls: ['./mcq.component.css']
})
export class McqComponent implements OnInit {
  data: any;
  comptForm: FormGroup;

  constructor(private dataService: DataService, private apiservice: ApiService, private formBuilder: FormBuilder, private router: Router) {
    this.data = this.dataService.getData();
    this.comptForm = this.formBuilder.group({
      hobbies: [null],
      smoke: [null],
      place: [null]
    });
  }

  onSubmit(comptData) {
    comptData.id = this.dataService.getData().id;
    this.apiservice.submitCompt(comptData)
      .subscribe(
        data => {
          this.router.navigate(['/main']);
        },
        err => {
          console.log(err);
        });
  }

  ngOnInit(): void {
    this.apiservice.authonicateUser()
      .subscribe(
        data => {
          if (data) {
            this.dataService.setData(data);
            if (!this.dataService.getData().new) {
              this.router.navigate(['/main']);
            }
          }
        },
        err => {
          localStorage.setItem('token', '');
          this.router.navigate(['/login']);
        }
      );
  }

}
