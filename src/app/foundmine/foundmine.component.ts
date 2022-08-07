import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ReportfoundService } from '../reportfound.service';

@Component({
  selector: 'app-foundmine',
  templateUrl: './foundmine.component.html',
  styleUrls: ['./foundmine.component.scss']
})
export class FoundmineComponent implements OnInit {
  id: string;
  post: any;
  clicked: boolean = false;
  faCheckCircle = faCheckCircle;
  image: any;
  mineForm = new FormGroup({
    desc: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    image: new FormControl(null),
  })
  constructor(_ActivatedRoute: ActivatedRoute, private _reportFoundService: ReportfoundService, private _postsService: PostsService, private router: Router) {
    this.id = _ActivatedRoute.snapshot.params['id']
  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file
    }
  }


  ngOnInit(): void {
    this._reportFoundService.getFound(this.id).subscribe((res) => {
      if (res.message == "done") {
        console.log(res);
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
  sendEmail(id: any, data: any): any {
    if (this.image) {
      const formData:FormData = new FormData();
      // console.log(formData);
      formData.append('image', this.image, this.image.name)
      formData.append('desc', this.mineForm.get('desc')?.value)
      data = formData
    }else{
      data = data.getRawValue()    
    }
    this._reportFoundService.foundMine(id, data).subscribe((res) => {
      if (res.message == "done") {
        this.clicked = true
      }
    }, (err) => {
      console.log(err);

    })
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
      if (err.error.err.message == "jwt malformed") {
        this.router.navigate([`/signin`])
      } else {
        console.log(err);
      }
    })
  }
}
