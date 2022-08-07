import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-yourposts',
  templateUrl: './yourposts.component.html',
  styleUrls: ['./yourposts.component.scss']
})
export class YourpostsComponent implements OnInit {

  lost: any[] = [];
  found: any[] = [];
  user: any;
  lossClicked: boolean = true;
  foundClicked: boolean = false;

  constructor(private _postsService: PostsService, private router: Router) { }

  ngOnInit(): void {
    this._postsService.viewYourLosses().subscribe((res => {
      if (res.message == "done") {
        this.user = res.user;
        this.lost = res.posts;
      }
    }), (err) => {
      console.log(err);
    });
    this._postsService.viewYourFounds().subscribe((res => {
      if (res.message == "done") {
        this.found = res.posts;
      }
    }), (err) => {
      console.log(err);

    })
  }
  viewLosses() {
    this._postsService.viewYourLosses().subscribe((res => {
      if (res.message == "done") {
        this.lost = res.posts;
        this.lossClicked = true;
        this.foundClicked = false
      }
    }), (err) => {
      console.log(err);
    })
  }
  viewFound() {
    this._postsService.viewYourFounds().subscribe((res => {
      if (res.message == "done") {
        this.found = res.posts;
        this.lossClicked = false;
        this.foundClicked = true
      }
    }), (err) => {
      console.log(err);

    })
  }
  //to reload the url
  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  deleteLoss(id: any) {
    this._postsService.deleteLost(id).subscribe((res => {
      if (res.message == "done") {
        this.redirectTo('profile');
      }
    }), (err) => {
      console.log(err);

    })
  }
  deleteFound(id: any) {
    this._postsService.deleteFound(id).subscribe((res => {
      if (res.message == "done") {
        this.redirectTo('profile');
      }
    }), (err) => {
      console.log(err);

    })
  }
  searchInLosses(id: any) {
    this.redirectTo(`/found/search/${id}`)
  }
}
