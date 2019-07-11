import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterService } from './register.service';
import { Users } from '../Model/users';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
   regformgrp = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
    });
user = new Users();

  constructor(private httpclient: HttpClient, private notifyservice: NotificationService,
     private regservice: RegisterService, private router: Router) { }

  ngOnInit() {
  }
get firstname() {
return this.regformgrp.controls.firstName.value;
}
get lastname(): string {
return this.regformgrp.controls.lastName.value;
}

get email(): string {
return this.regformgrp.controls.email.value;
}

get password(): string {
  return this.regformgrp.controls.password.value;
  }

get gender(): string {
    return this.regformgrp.controls.gender.value;
    }
get phoneNo() {
      return this.regformgrp.controls.phone.value;
      }


RegisterUser() {
  this.submitted = true;
  this.user.firstName = this.firstname;
  this.user.LastName = this.lastname;
  this.user.email = this.email;
  this.user.Password = this.password;
  this.user.Gender = this.gender;
  this.user.PhoneNo = this.phoneNo;
  // if (this.regformgrp.valid) {
    // this.usermail();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Accept,Cookie,DNT,Host,Keep-Alive,Origin,Referer,User-Agent,X-Requested-With'
    });
 this.regservice.registerUser(this.user, headers).subscribe(data => {
   console.log(data);
console.log('data submitted');
if (data) {
this.notifyservice.success('Registered Successfully!!');
}
this.router.navigateByUrl('login');
 }, error => {
console.log(error);
  // this.notifyservice.warn('User already exists');
 });
  // }
}
}
