import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';
import { WalletConnectorService } from '@app/core/services/blockchain/wallets/wallet-connector-service/wallet-connector.service';
import { ThemeService } from '@app/core/services/theme/theme.service';
import { WalletsModalService } from '@app/core/wallets/services/wallets-modal.service';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { combineLatest } from 'rxjs';
import { filter, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { LiquidityProvidingService } from '../../services/liquidity-providing.service';

@Component({
  selector: 'app-lp-page',
  templateUrl: './lp-page.component.html',
  styleUrls: ['./lp-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService]
})
export class LpPageComponent implements OnInit {
  public readonly noDeposits$ = combineLatest([
    this.authService.getCurrentUser(),
    this.lpService.deposits$
  ]).pipe(
    map(([user, deposits]) => {
      return !(user?.address && Boolean(deposits?.length));
    }),
    takeUntil(this.destroy$)
  );

  public readonly depositsLoading$ = this.lpService.depositsLoading$;

  public readonly isDarkTheme$ = this.themeService.theme$.pipe(map(theme => theme === 'dark'));

  public readonly isLpEnded = this.lpService.isLpEneded;

  constructor(
    private readonly walletsModalService: WalletsModalService,
    private readonly authService: AuthService,
    private readonly lpService: LiquidityProvidingService,
    private readonly destroy$: TuiDestroyService,
    private readonly walletConnectorService: WalletConnectorService,
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    private readonly themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.waitForStopWatchingWhitelist();

    this.getDepositsForCurrentUser();
  }

  public login(): void {
    this.walletsModalService.open().subscribe();
  }

  public navigateBack(): void {
    this.router.navigate(['staking-lp']);
  }

  public waitForStopWatchingWhitelist(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationStart) => {
        if (!event.url.includes('liquidity-providing')) {
          this.lpService.stopWatchWhitelist();
        }
      });
  }

  private getDepositsForCurrentUser(): void {
    this.walletConnectorService.addressChange$
      .pipe(
        startWith(undefined),
        switchMap(() => this.lpService.getDeposits()),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.lpService.setDepositsLoading(false);
        this.cdr.detectChanges();
      });
  }
}
