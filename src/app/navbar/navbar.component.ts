import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  //use this value to determine what to show or hide in navbar
  isLogin: boolean = false
  isAdmin: boolean = false
  constructor(private _AuthService: AuthService) {
    //returns true if there is a token in localStorage
    _AuthService.currentUser.subscribe(() => {
      if (this._AuthService.currentUser.getValue() !== null) {
        this.isLogin = true
        if (this._AuthService.getCurrentRole() == 'admin') {
          this.isAdmin = true
        } else {
          this.isAdmin = false
        }
      } else {
        this.isLogin = false
      }
    })
  }
  logout() {
    //removes token from localStorage
    this._AuthService.logOut()
    this.isLogin = false;
  }
  ngOnInit(): void { }
}
