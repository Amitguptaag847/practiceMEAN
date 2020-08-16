import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private apiservice: ApiService, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.apiservice.authonicateUser()
      .subscribe(
        data => {
          if (data) {
            this.dataService.setData(data);
            if (this.dataService.getData().new) {
              this.router.navigate(['/mcq']);
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
