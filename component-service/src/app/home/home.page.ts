import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../variability-config/config.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private access: string;

  constructor(public router: Router,
              private configS: ConfigService) {}

  ngOnInit() {
    this.configS.getInitConfig()
        .subscribe(data => this.access = data.access);
  }

  teacherUser() {
    this.router.navigate(['login']);
  }

  studantUser() {
    this.router.navigate([this.access]);
  }

}
