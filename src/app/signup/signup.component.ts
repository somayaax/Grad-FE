import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  faCircleExclamation = faCircleExclamation
  error: string = ''  
  //reactive form
  signupForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$')]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$')]),
    gender: new FormControl(null, [Validators.required, Validators.pattern('^(female|male)$')])
  })

  constructor(private _AuthService: AuthService, private Router:Router) { }

  ngOnInit(): void { }

  saveUser(registerInfo: any) {
    // console.log(registerInfo.value);
    this._AuthService.signup(registerInfo.value).subscribe((res) => {
      if (res.message === "done") {
        //alert to verify email
        window.alert('an email was sent to you, please confirm')
        //open sign in page
        this.Router.navigate(['/signin'])
      }
    }, (err) => {
      if (err.error.msg) {
        this.error = err.error.msg
      } else if (err.error.error) {
        this.error = err.error.error[0].msg
      } else if (err.error.message) {
        this.error = err.error.message
      }
    })
  }
}
