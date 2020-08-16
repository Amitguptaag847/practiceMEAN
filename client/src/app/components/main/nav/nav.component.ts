import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  data: any;
  constructor(private router: Router, private dataService: DataService) {
    this.dataService.dataChange.subscribe(value => {
      this.data = value;
    });
  }

  logout() {
    localStorage.setItem('token', '');
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
