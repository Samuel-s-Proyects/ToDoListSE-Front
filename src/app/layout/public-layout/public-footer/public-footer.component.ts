import { Component } from '@angular/core';
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-public-footer',
  templateUrl: './public-footer.component.html',
  styleUrls: ['./public-footer.component.scss'],
})
export class PublicFooterComponent {
  readonly currentYear = new Date().getFullYear();
  readonly faFacebook = faFacebook;
  readonly faInstagram = faInstagram;
  readonly faLinkedinIn = faLinkedinIn;
  readonly faYoutube = faYoutube;
}
