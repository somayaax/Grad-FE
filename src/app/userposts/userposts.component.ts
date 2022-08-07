import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCircleExclamation, faX } from '@fortawesome/free-solid-svg-icons';
import { PostsService } from '../posts.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-userposts',
  templateUrl: './userposts.component.html',
  styleUrls: ['./userposts.component.scss']
})
export class UserpostsComponent implements OnInit {
  id: string;
  user: any
  losses: any;
  founds: any;
  lossClicked: boolean = true
  foundClicked: boolean = false
  error = '';
  faCircleExclamation = faCircleExclamation;
  faX = faX

  reportClicked: boolean = false
  postClicked: string = '';
  reportForm = new FormGroup({
    reportComment: new FormControl(null, [Validators.required])
  })

  constructor(private _ActivatedRoute: ActivatedRoute, private router: Router, private _postsService: PostsService, private _profileService: ProfileService) {
    this.id = _ActivatedRoute.snapshot.params['id'];
    _postsService.viewUserLosses(this.id).subscribe((res) => {
      this.losses = res.posts
      // console.log(this.losses);
    }, (err) => {
      console.log(err);
    })
    _postsService.viewUserFounds(this.id).subscribe((res) => {
      this.founds = res.posts
      // console.log(this.founds);
    }, (err) => {
      console.log(err);
    })
    _profileService.viewProfileByID(this.id).subscribe((res) => {
      this.user = res.user
      // console.log(res.user);
    }, (err) => {
      console.log(err);
    })
  }


  viewLosses() {
    this._postsService.viewUserLosses(this.id).subscribe((res) => {
      this.losses = res.posts
      this.lossClicked = true;
      this.foundClicked = false
      // console.log(this.losses);
    }, (err) => {
      console.log(err);
    })
  }
  viewFound() {
    this._postsService.viewUserFounds(this.id).subscribe((res) => {
      this.founds = res.posts
      this.lossClicked = false;
      this.foundClicked = true
      // console.log(this.founds);
    }, (err) => {
      console.log(err);
    })
  }

  ngOnInit(): void {
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
      } else if (err.error.err.message == "jwt malformed") {
        this.router.navigate(['/signin'])
      } else {
        this.error = "cannot report something went wrong";
      }

    })
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