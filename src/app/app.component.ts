import { AfterViewInit, Component, Inject, isDevMode } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { ErrorsService } from 'src/app/core/errors/errors.service';
import { IframeService } from 'src/app/core/services/iframe/iframe.service';
import { DOCUMENT } from '@angular/common';
import { HealthcheckService } from '@core/services/backend/healthcheck/healthcheck.service';
import { QueryParams } from '@core/services/query-params/models/query-params';
import { QueryParamsService } from '@core/services/query-params/query-params.service';
import { GoogleTagManagerService } from '@core/services/google-tag-manager/google-tag-manager.service';
import { isSupportedLanguage } from '@shared/models/languages/supported-languages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public isBackendAvailable: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly translateService: TranslateService,
    private readonly cookieService: CookieService,
    private readonly iframeService: IframeService,
    private readonly gtmService: GoogleTagManagerService,
    private readonly healthCheckService: HealthcheckService,
    private readonly queryParamsService: QueryParamsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly errorService: ErrorsService
  ) {
    this.printTimestamp();
    this.initQueryParamsSubscription();
    this.setupLanguage();
    this.checkHealth();
  }

  ngAfterViewInit() {
    this.gtmService.addGtmToDom();
    this.setupIframeSettings();
  }

  /**
   * Setups settings for app in iframe.
   */
  private setupIframeSettings(): void {
    if (this.iframeService.isIframe) {
      this.removeLiveChatInIframe();
    }
  }

  /**
   * Removes carrot chat in iframe mode.
   */
  private removeLiveChatInIframe(): void {
    const observer = new MutationObserver(() => {
      const liveChat = this.document.getElementsByClassName('carrotquest-css-reset')[0];
      if (liveChat) {
        liveChat.remove();
        observer.disconnect();
      }
    });
    observer.observe(this.document.body, {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: false
    });
  }

  /**
   * Setups list of languages and current language.
   */
  private setupLanguage(): void {
    let userRegionLanguage = navigator.language?.split('-')[0];
    userRegionLanguage = isSupportedLanguage(userRegionLanguage) ? userRegionLanguage : 'en';
    const lng = this.cookieService.get('lng') || userRegionLanguage;
    this.translateService.setDefaultLang(lng);
    this.translateService.use(lng);
  }

  /**
   * Log current dev build timestamp.
   * @private
   */
  private printTimestamp(): void {
    if (isDevMode()) {
      // @ts-ignore
      import('@app/timestamp')
        .then(data => console.debug(`It's a development build, timestamp: ${data.timestamp}`))
        .catch(() => {
          console.debug('timestamp file is not found');
        });
    }
  }

  /**
   * Inits site query params subscription.
   */
  private initQueryParamsSubscription(): void {
    const queryParamsSubscription$ = this.activatedRoute.queryParams.subscribe(
      (queryParams: QueryParams) => {
        try {
          this.queryParamsService.setupQueryParams(queryParams);
          if (queryParams?.hideUnusedUI) {
            this.setupUISettings(queryParams);
          }
        } catch (err) {
          this.errorService.catch(err);
        }
      }
    );
    setTimeout(() => {
      queryParamsSubscription$.unsubscribe();
    });
  }

  /**
   * Checks health of backend server.
   */
  private checkHealth(): void {
    this.healthCheckService.healthCheck().then(isAvailable => {
      this.isBackendAvailable = isAvailable;
      document.getElementById('loader')?.classList.add('disabled');
      setTimeout(() => document.getElementById('loader')?.remove(), 400); /* ios safari */
    });
  }

  private setupUISettings(queryParams: QueryParams): void {
    const hideUI = queryParams.hideUnusedUI === 'true';

    if (hideUI) {
      this.document.body.classList.add('hide-unused-ui');
      this.removeLiveChatInIframe();
    }
  }
}
