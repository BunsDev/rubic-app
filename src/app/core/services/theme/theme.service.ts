import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StoreService } from 'src/app/core/services/store/store.service';
import { DOCUMENT } from '@angular/common';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _theme$: BehaviorSubject<Theme>;

  get theme(): Theme {
    return this._theme$.getValue();
  }

  get theme$(): Observable<Theme> {
    return this._theme$.asObservable();
  }

  constructor(private readonly store: StoreService, @Inject(DOCUMENT) private document: Document) {
    const localTheme = (this.store.getItem('theme') as Theme) || 'dark';
    this._theme$ = new BehaviorSubject<Theme>(localTheme);

    if (localTheme !== 'dark') {
      this.document.documentElement.classList.toggle('dark');
      this.document.documentElement.classList.toggle('light');
    } else {
      document.getElementsByTagName('html')[0].classList.toggle('dark_colored');
    }
  }

  public switchTheme(): void {
    const isCurrentThemeDark = this._theme$.value === 'dark';
    if (isCurrentThemeDark) {
      setTimeout(() => this.processSwitch(isCurrentThemeDark), 100);
    } else {
      setTimeout(() => this.processSwitch(isCurrentThemeDark), 100);
      setTimeout(
        () => document.getElementsByTagName('html')[0].classList.toggle('dark_colored'),
        450
      );
    }
  }

  public setTheme(theme: Theme): void {
    if (theme !== this.theme) {
      this.switchTheme();
    }
  }

  private processSwitch(isCurrentThemeDark: boolean): void {
    const nextTheme = isCurrentThemeDark ? 'light' : 'dark';
    this._theme$.next(nextTheme);
    this.store.setItem('theme', nextTheme);

    this.document.documentElement.classList.toggle('dark');
    this.document.documentElement.classList.toggle('light');
  }
}
