import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,  Validators  } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';
import { Mail } from '../Model/mail';
import { LoginService } from './login.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  startSpace;
  endSpace;
  valid = false;
mail = new Mail();
  loginformgrp = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12),
      Validators.pattern('^[a-zA-Z0-9!@#$%^&*(),._~`/?":;{}[]|]*$')]),
      rememberme: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private loginservice: LoginService,
    private notifyservice: NotificationService) { }

  ngOnInit() {
  }
  get useremail() {
    return this.loginformgrp.controls.email.value;
  }
  get userpassword() {
    return this.loginformgrp.controls.password.value;
  }

  get userRemember() {
    return this.loginformgrp.controls.rememberme.value.checked;
  }
  checked(value: string) {
    if (value === 'checked') {
     this.submitted = true;
    }
  }

  loginUpdate() {
  this.mail.email = this.useremail;
  this.mail.Password = this.userpassword;
  this.mail.rememberme = this.userRemember;
  if (this.loginformgrp.valid) {
    this.valid = true;
  this.loginservice.loginUser(this.mail, {'Content-Type': 'application/json', 'responseType': 'text'}).subscribe(data => {
    console.log('login success');
    console.log(data);
    localStorage.setItem('token', data);
    if (data) {
      this.notifyservice.success('Login Successfull !!');
    this.orderlist();
    }
  }, (err: HttpErrorResponse) => { console.log(err);
    this.notifyservice.warn('Please check UserName and Password');
  });
  }
  }
     orderlist() {
      this.router.navigate(['orders']);
      }

}
