import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  data: any;
  matches: any;
  constructor(private apiservice: ApiService, private dataService: DataService) {
    this.dataService.dataChange.subscribe(value => {
      this.data = value;
      this.apiservice.getMatches(this.data.id)
        .subscribe(
          data => {
            if (data) {
              this.matches = data;
            }
          },
          err => {
            console.log(err);
          }
        );
    });
  }

  ngOnInit(): void {
    this.data = this.dataService.getData();
    if (this.data) {
      this.apiservice.getMatches(this.data.id)
        .subscribe(
          data => {
            if (data) {
              this.matches = data;
            }
          },
          err => {
            console.log(err);
          }
        );
    }
  }

}
