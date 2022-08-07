import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  //icons
  faCircleExclamation = faCircleExclamation
  error: string = ''

  //reactive form
  signinForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  })
  constructor(private _AuthService: AuthService, private router: Router) { }
  ngOnInit(): void {
  }

  signin(signinInfo: any) {
    return this._AuthService.signin(signinInfo.value).subscribe((res) => {
      if (res.message === "done") {
        //store token in local storage
        localStorage.setItem("userToken", res.token)        
        this._AuthService.saveCurrentUser()
        //open profile page
        this.router.navigate(['profile'])
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
