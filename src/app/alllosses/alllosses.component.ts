import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PostsService } from '../posts.service';
import { BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { faCircleExclamation, faX } from '@fortawesome/free-solid-svg-icons'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alllosses',
  templateUrl: './alllosses.component.html',
  styleUrls: ['./alllosses.component.scss']
})
export class AlllossesComponent implements OnInit {
  losses: any;
  searchTerm = '';
  term = '';
  error = '';
  faCircleExclamation = faCircleExclamation;
  faX = faX

  reportClicked: boolean = false
  postClicked: string = '';
  reportForm = new FormGroup({
    reportComment: new FormControl(null, [Validators.required])
  })

  constructor(private _postsService: PostsService, private router: Router) { }

  ngOnInit(): void {
    this._postsService.getAllLoss().subscribe((res) => {
      this.losses = res.posts
    }, (err) => {
      console.log(err);
    })
  }

  getCurrentUser(): any {
    let token: any = localStorage.getItem('userToken')
    if (token) {
      let user: any = new BehaviorSubject(jwtDecode(token));
      return user.getValue().id;
    }
  }

  viewUserLoss(id: any) {
    this._postsService.viewUserLosses(id).subscribe((res) => {
      this.getCurrentUser()
      if (this.getCurrentUser() == id) {
        this.router.navigate([`/profile`])
      } else {
        this.router.navigate([`/user/posts/${id}`])
      }
    }, (err) => {
      if (err.error.err.message == "jwt malformed") {
        this.router.navigate([`/signin`])
      } else {
        console.log(err);
      }
    })
  }
  report(postId: string) {
    if (this.reportClicked == false) {
      this.reportClicked = true
      this.postClicked = postId
    }
  }
  exit() {
    this.reportClicked = false;
    this.postClicked = '';
    this.error = ''
  }
  reportLoss(id: any, data: any) {
    this._postsService.reportLossPost(id, data.getRawValue()).subscribe((res) => {
      if (res.message == "done") {
        // console.log(res);
        this.reportClicked = false
      }
    }, (err) => {
      if (err.error.message == "reported") {
        this.error = "cannot report twice!";
      } else if (err.error.err.message == 'jwt malformed') {
        // console.log(err);
        this.router.navigate(['/signin'])
      } else {
        this.error = "cannot report something went wrong";
      }

    })
  }
}