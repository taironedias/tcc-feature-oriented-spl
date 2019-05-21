import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigSubjectService } from '../services/subject.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private accessPage: string;

  constructor(public router: Router,
              private configS: ConfigSubjectService) {}

  ngOnInit() {
    this.configS.getInitConfig()
      .subscribe(data => this.accessPage = data.access);
  }

  teacherUser() {
    this.router.navigate(['login']);
  }

  studantUser() {
    this.router.navigate([this.accessPage]);
  }
}
