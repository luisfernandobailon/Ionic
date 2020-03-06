import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private router: Router
  constructor() { }

  ngOnInit() {
  }

  openRegister(){
    this.router.navigate(['/register']);
  }

}
