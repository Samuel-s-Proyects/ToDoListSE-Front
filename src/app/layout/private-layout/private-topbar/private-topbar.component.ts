import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { ThemeService } from '../../../core/services/theme.service';
import { ThemePreference } from '../../../core/models/theme.model';
import { AuthSessionService } from '../../../core/services/auth-session.service';
import {
  faBars,
  faGlobe,
  faSun,
  faMoon,
  faDesktop,
  faUser,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-private-topbar',
  templateUrl: './private-topbar.component.html',
  styleUrls: ['./private-topbar.component.scss'],
})
export class PrivateTopbarComponent {
  @Output() readonly menuToggled = new EventEmitter<void>();

  readonly faBars = faBars;
  readonly faGlobe = faGlobe;
  readonly faSun = faSun;
  readonly faMoon = faMoon;
  readonly faDesktop = faDesktop;
  readonly faUser = faUser;
  readonly faRightFromBracket = faRightFromBracket;

  langMenuOpen = false;
  themeMenuOpen = false;
  userMenuOpen = false;

  constructor(
    readonly themeService: ThemeService,
    readonly transloco: TranslocoService,
    readonly authSession: AuthSessionService,
    private readonly router: Router,
  ) {}

  get userName(): string {
    return this.authSession.getUser()?.name ?? '';
  }

  onToggleMenu(): void {
    this.menuToggled.emit();
  }

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
    this.userMenuOpen = false;
  }

  onToggleThemeMenu(): void {
    this.themeMenuOpen = !this.themeMenuOpen;
    this.langMenuOpen = false;
    this.userMenuOpen = false;
  }

  onToggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
    this.langMenuOpen = false;
    this.themeMenuOpen = false;
  }

  onLogout(): void {
    this.userMenuOpen = false;
    this.authSession.clearToken();
    this.router.navigate(['/login']);
  }
}
