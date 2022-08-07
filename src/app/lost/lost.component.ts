import { Component, OnInit } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { PostsService } from '../posts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCircleExclamation, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-lost',
  templateUrl: './lost.component.html',
  styleUrls: ['./lost.component.scss']
})
export class LostComponent implements OnInit {
  faArrowDown = faArrowDown;
  faCheckCircle = faCheckCircle;
  error: string = '';
  faCircleExclamation = faCircleExclamation;
  image:any;
  submitted:boolean =false;
  post:any;
  //reactive form
  lostForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    desc: new FormControl(null, [Validators.required]),
    location: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
  })

  constructor(private _postsService: PostsService, private router : Router) { }

  selectImage(event:any){
    if (event.target.files.length>0) {
      const file = event.target.files[0];
      this.image = file
    }
  }

  resubmit(){
    this.submitted =false
  }

  lost(postInfo: any) {
    const formData:FormData = new FormData();
    // console.log(formData);
    formData.append('image', this.image, this.image.name)
    formData.append('title', this.lostForm.get('title')?.value)
    formData.append('desc', this.lostForm.get('desc')?.value)
    formData.append('location', this.lostForm.get('location')?.value)
    postInfo = formData
    this._postsService.addLost(postInfo).subscribe((res) => {
      if (res.message === "done") {
        this.submitted = true
        console.log(res);
        this.post =res.savePost
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

  ngOnInit(): void {
  }

}
