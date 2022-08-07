import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCircleExclamation, faX } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-allfounds',
  templateUrl: './allfounds.component.html',
  styleUrls: ['./allfounds.component.scss']
})
export class AllfoundsComponent implements OnInit {
  founds: any;
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
    this._postsService.getAllFound().subscribe((res) => {
      // console.log(res);
      this.founds = res.posts
      // console.log(this.founds);
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
  viewUserFound(id: any) {
    this._postsService.viewUserFounds(id).subscribe((res) => {
      this.getCurrentUser()
      if (this.getCurrentUser() == id) {
        this.router.navigate([`/profile`])
      } else {
        this.router.navigate([`/user/posts/${id}`])
      }
    }, (err) => {
      console.log(err);
      
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
  reportFound(id: any, data: any) {
    this._postsService.reportFoundPost(id, data.getRawValue()).subscribe((res) => {
      if (res.message == "done") {
        // console.log(res);
        this.reportClicked = false

      }
    }, (err) => {
      if (err.error.message == "reported") {
        this.error = "cannot report twice!";
      } else if (err.error.err.message == "jwt malformed") {
        this.router.navigate(['/signin'])
      } else {
        this.error = "cannot report something went wrong";
      }

    })
  }
}
