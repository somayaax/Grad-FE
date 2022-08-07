import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { faUniversity, faUserGraduate, faGlobe, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //icons
  faUniversity = faUniversity;
  faUserGraduate = faUserGraduate;
  faChalkboardTeacher = faChalkboardTeacher;
  faGlobe = faGlobe;

  //owl carousel
  customOptions: OwlOptions = {
    loop: true,
    autoplay: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 600,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    // nav: true
  }
  constructor() { }

  ngOnInit(): void {
  }

}
