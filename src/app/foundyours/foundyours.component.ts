import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { PostsService } from '../posts.service';
import { ReportfoundService } from '../reportfound.service';

@Component({
  selector: 'app-foundyours',
  templateUrl: './foundyours.component.html',
  styleUrls: ['./foundyours.component.scss']
})
export class FoundyoursComponent implements OnInit {
  id: string;
  post: any;
  clicked: boolean = false;
  faCheckCircle = faCheckCircle;

  constructor(private _ActivatedRoute: ActivatedRoute, private _reportFoundService: ReportfoundService, private _postsService: PostsService, private router: Router) { 
    this.id = _ActivatedRoute.snapshot.params['id']

  }
  ngOnInit(): void {
    this._reportFoundService.getLoss(this.id).subscribe((res) => {
      if (res.message == "done") {
        this.post = res.post
      }
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

  sendEmail(id: any, user: any): any {
    this._reportFoundService.foundUsers(id, user).subscribe((res) => {
      if (res.message == "done") {
        this.clicked = true 
      }
    }, (err) => {
      console.log(err);

    })
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
}
