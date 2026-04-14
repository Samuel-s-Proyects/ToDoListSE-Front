import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemePreference, ResolvedTheme } from '../models/theme.model';

const THEME_STORAGE_KEY = 'todolist_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  private readonly preferenceSubject = new BehaviorSubject<ThemePreference>(this.loadPreference());
  private mediaQuery: MediaQueryList | null = null;
  private mediaListener: ((e: MediaQueryListEvent) => void) | null = null;

  get preference$(): Observable<ThemePreference> {
    return this.preferenceSubject.asObservable();
  }

  get currentPreference(): ThemePreference {
    return this.preferenceSubject.value;
  }

  get resolvedTheme(): ResolvedTheme {
    return this.resolve(this.currentPreference);
  }

  setPreference(preference: ThemePreference): void {
    this.preferenceSubject.next(preference);
    localStorage.setItem(THEME_STORAGE_KEY, preference);
    this.applyTheme(this.resolve(preference));
    this.updateMediaListener(preference);
  }

  initialize(): void {
    const pref = this.currentPreference;
    this.applyTheme(this.resolve(pref));
    this.updateMediaListener(pref);
  }

  ngOnDestroy(): void {
    this.removeMediaListener();
  }

  private loadPreference(): ThemePreference {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    return 'system';
  }

  private resolve(preference: ThemePreference): ResolvedTheme {
    if (preference === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return preference;
  }

  private applyTheme(theme: ResolvedTheme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private updateMediaListener(preference: ThemePreference): void {
    this.removeMediaListener();
    if (preference === 'system') {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaListener = (e: MediaQueryListEvent) => {
        this.applyTheme(e.matches ? 'dark' : 'light');
      };
      this.mediaQuery.addEventListener('change', this.mediaListener);
    }
  }

  private removeMediaListener(): void {
    if (this.mediaQuery && this.mediaListener) {
      this.mediaQuery.removeEventListener('change', this.mediaListener);
      this.mediaQuery = null;
      this.mediaListener = null;
    }
  }
}
