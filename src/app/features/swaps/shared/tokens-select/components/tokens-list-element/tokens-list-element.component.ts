import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { TokenAmount } from '@shared/models/tokens/token-amount';
import { IframeService } from '@core/services/iframe/iframe.service';
import { TokensService } from '@core/services/tokens/tokens.service';
import { DEFAULT_TOKEN_IMAGE } from '@shared/constants/tokens/default-token-image';
import { AuthService } from '@core/services/auth/auth.service';
import { WalletError } from '@core/errors/models/provider/wallet-error';
import { ErrorsService } from '@core/errors/errors.service';

@Component({
  selector: 'app-tokens-list-element',
  templateUrl: './tokens-list-element.component.html',
  styleUrls: ['./tokens-list-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokensListElementComponent {
  public loadingFavoriteToken: boolean;

  /**
   * Token element.
   */
  @Input() token: TokenAmount;

  @Output() toggleFavoriteToken: EventEmitter<void> = new EventEmitter<void>();

  public readonly DEFAULT_TOKEN_IMAGE = DEFAULT_TOKEN_IMAGE;

  /**
   * Is iframe has horizontal view.
   */
  public readonly isHorizontalFrame: boolean;

  constructor(
    iframeService: IframeService,
    private readonly tokensService: TokensService,
    private readonly cdr: ChangeDetectorRef,
    private readonly errorsService: ErrorsService,
    private readonly authService: AuthService
  ) {
    this.loadingFavoriteToken = false;
    this.isHorizontalFrame = iframeService.iframeAppearance === 'horizontal';
  }

  public onImageError($event: Event): void {
    this.tokensService.onTokenImageError($event, this.token);
  }

  /**
   * Makes token favorite or not favorite in the list.
   */
  public toggleFavorite(): void {
    if (this.loadingFavoriteToken) {
      return;
    }
    if (!this.authService.userAddress) {
      this.errorsService.catch(new WalletError());
      return;
    }
    this.loadingFavoriteToken = true;
    const request$ = this.token.favorite
      ? this.tokensService.removeFavoriteToken(this.token)
      : this.tokensService.addFavoriteToken(this.token);

    request$.subscribe({
      error: () => {
        this.errorsService.catch(new WalletError());
      },
      complete: () => {
        this.loadingFavoriteToken = false;
        this.cdr.markForCheck();
        this.toggleFavoriteToken.emit();
      }
    });
  }
}
