import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  losses: any;
  founds: any;
  constructor(private _adminService: AdminService, private _authService: AuthService, private router:Router) {
    _adminService.viewReportedLosses().subscribe((res) => {
      this.losses = res.posts
    }, (err) => {
      console.log(err);
    })
 
    _adminService.viewReportedFounds().subscribe((res) => {
      this.founds = res.posts
    }, (err) => {
      console.log(err);

    })
  }
   //to reload the url
   redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
  blockLoss(id: any) {
    this._adminService.blockLoss(id, this._authService.getCurrentUser()).subscribe((res) => {
      this.redirectTo('admin')
    }, (err) => {
      console.log(err);

    })
  }
  blockFound(id: any) {
    this._adminService.blockFound(id, this._authService.getCurrentUser()).subscribe((res) => {
      this.redirectTo('admin')

    }, (err) => {
      console.log(err);
    })
  }
  ngOnInit(): void {
  }

}
