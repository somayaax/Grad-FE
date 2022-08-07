import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { PostsService } from '../posts.service';
import { ReportfoundService } from '../reportfound.service';
import { SearchImgService } from '../search-img.service';
import { faCircleExclamation, faX } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  yourPost: any;
  id: string;
  faCircleExclamation = faCircleExclamation
  faX = faX
  reportClicked: boolean = false
  postClicked: string = '';
  error = '';
  reportForm = new FormGroup({
    reportComment: new FormControl(null, [Validators.required])
  })
  constructor(private _AuthService: AuthService, _ActivatedRoute: ActivatedRoute, private _searchImgService: SearchImgService, private _reportFoundService: ReportfoundService, private router: Router, private _postsService: PostsService) {
    this.id = _ActivatedRoute.snapshot.params['id'];
  }
  posts: any = [];

  ngOnInit(): void {
    //get your found post by id
    this._reportFoundService.getFound(this.id).subscribe((res) => {
      if (res.message == "done") {
        this.yourPost = res.post
      }
    }, (err) => {
      console.log(err);
    })

    /////////////////search
    this._searchImgService.searchInLosses(this.id, this._AuthService.getCurrentUser()).subscribe((res) => {
      console.log(res);
      
      for (let i = 0; i < res.cartona.length; i++) {
        if (res.cartona[i].mismatch <= 20) {
          console.log(res.cartona[i]);
          this.posts.push(res.cartona[i]);
        }
      }
      // console.log(this.posts);

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
      } else {
        this.error = "cannot report something went wrong";
      }
    })
  }
}
