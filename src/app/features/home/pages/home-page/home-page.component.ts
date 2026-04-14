import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { take } from 'rxjs/operators';
import {
  faClipboardList,
  faPalette,
  faFilter,
  faEnvelope,
  faListCheck,
  faChartLine,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { SeoService } from '../../../../core/services/seo.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  readonly faClipboardList = faClipboardList;
  readonly faPalette = faPalette;
  readonly faFilter = faFilter;
  readonly faEnvelope = faEnvelope;
  readonly faListCheck = faListCheck;
  readonly faChartLine = faChartLine;
  readonly faArrowRight = faArrowRight;

  constructor(
    private readonly seoService: SeoService,
    private readonly transloco: TranslocoService,
  ) {}

  ngOnInit(): void {
    this.transloco.selectTranslate('home.seoTitle').pipe(take(1)).subscribe((title) => {
      this.seoService.update({
        title,
        description: this.transloco.translate('home.seoDescription'),
      });
    });
  }
}
