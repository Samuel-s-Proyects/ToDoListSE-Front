import { Component } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ThemeService } from '../../../core/services/theme.service';
import { ThemePreference } from '../../../core/models/theme.model';
import { AuthSessionService } from '../../../core/services/auth-session.service';
import {
  faGlobe,
  faRightToBracket,
  faSun,
  faMoon,
  faDesktop,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-public-topbar',
  templateUrl: './public-topbar.component.html',
  styleUrls: ['./public-topbar.component.scss'],
})
export class PublicTopbarComponent {
  readonly faGlobe = faGlobe;
  readonly faRightToBracket = faRightToBracket;
  readonly faSun = faSun;
  readonly faMoon = faMoon;
  readonly faDesktop = faDesktop;

  langMenuOpen = false;
  themeMenuOpen = false;

  constructor(
    readonly themeService: ThemeService,
    readonly transloco: TranslocoService,
    readonly authSession: AuthSessionService,
  ) {}

  onSetLang(lang: string): void {
    this.transloco.setActiveLang(lang);
    this.langMenuOpen = false;
  }

  onSetTheme(pref: ThemePreference): void {
    this.themeService.setPreference(pref);
    this.themeMenuOpen = false;
  }

  onToggleLangMenu(): void {
    this.langMenuOpen = !this.langMenuOpen;
    this.themeMenuOpen = false;
  }

  onToggleThemeMenu(): void {
    this.themeMenuOpen = !this.themeMenuOpen;
    this.langMenuOpen = false;
  }

  onCloseMenus(): void {
    this.langMenuOpen = false;
    this.themeMenuOpen = false;
  }
}
