import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faCircleExclamation, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  faCircleExclamation = faCircleExclamation;
  faEyeSlash = faEyeSlash;
  error: string = ''
  user: any = '';
  phone: any = '';

  constructor(private _ProfileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    this._ProfileService.viewProfile().subscribe((res) => {
      if (res.message === "done") {
        if (res.user.role == 'admin') {
          this.router.navigate(['/admin'])
        } else {
          // console.log(res.phone);
          this.user = res.user
          this.phone = res.user.phone
        }

      } else {
        this.router.navigate(['/signin'])
      }
    }, (err) => {
      this.router.navigate(['/signin'])
    })
  }

  //reactive form
  CompleteForm = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]{11}$')]),
    faculty: new FormControl(null, [Validators.required]),
  })

  //to reload the url
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  complete(completeInfo: any) {
    this._ProfileService.completeProfile(completeInfo.value).subscribe((res) => {
      if (res.message === "done") {
        this.redirectTo('profile');
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
