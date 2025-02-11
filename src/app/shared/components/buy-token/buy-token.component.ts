import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { first, map, switchMap } from 'rxjs/operators';
import { BLOCKCHAIN_NAME, BlockchainName } from '@shared/models/blockchain/blockchain-name';
import { Router } from '@angular/router';
import { SwapsService } from 'src/app/features/swaps/core/services/swaps-service/swaps.service';
import { SwapFormService } from 'src/app/features/swaps/features/main-form/services/swap-form-service/swap-form.service';
import { TuiAppearance } from '@taiga-ui/core';
import { List } from 'immutable';
import { TokenAmount } from '@shared/models/tokens/token-amount';
import { from, Observable } from 'rxjs';
import BigNumber from 'bignumber.js';
import { NATIVE_TOKEN_ADDRESS } from '@shared/constants/blockchain/native-token-address';
import { compareTokens } from '@shared/utils/utils';
import { GoogleTagManagerService } from '@core/services/google-tag-manager/google-tag-manager.service';
import { ThemeService } from '@core/services/theme/theme.service';

export interface TokenInfo {
  blockchain: BlockchainName;
  address: string;
  symbol: string;
  amount?: BigNumber;
}

interface TokenPair {
  from: Required<TokenInfo>;
  to: TokenInfo;
}

@Component({
  selector: 'app-buy-token',
  templateUrl: './buy-token.component.html',
  styleUrls: ['./buy-token.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuyTokenComponent {
  @Input() appereance: TuiAppearance = TuiAppearance.Outline;

  /**
   * Banner type. Component Renders different texts based on type.
   */
  @Input() tokensType: 'default' | 'custom';

  private readonly customTokens: TokenPair;

  private readonly defaultTokens: TokenPair;

  public readonly theme$ = this.themeService.theme$;

  public rubicIcon = {
    light: 'assets/images/icons/header/rubic.svg',
    dark: 'assets/images/icons/header/rubic-light.svg'
  };

  constructor(
    private readonly router: Router,
    private readonly swapsService: SwapsService,
    private readonly swapFormService: SwapFormService,
    private readonly gtmService: GoogleTagManagerService,
    private readonly themeService: ThemeService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.tokensType = 'default';
    this.customTokens = {
      from: {
        blockchain: BLOCKCHAIN_NAME.FANTOM,
        address: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
        symbol: 'USDC',
        amount: new BigNumber(100)
      },
      to: {
        blockchain: BLOCKCHAIN_NAME.FANTOM,
        address: NATIVE_TOKEN_ADDRESS,
        symbol: 'FTM'
      }
    };
    this.defaultTokens = {
      from: {
        blockchain: BLOCKCHAIN_NAME.ETHEREUM,
        address: NATIVE_TOKEN_ADDRESS,
        symbol: 'ETH',
        amount: new BigNumber(1)
      },
      to: {
        blockchain: BLOCKCHAIN_NAME.ETHEREUM,
        address: '0xa4eed63db85311e22df4473f87ccfc3dadcfa3e3',
        symbol: 'RBC'
      }
    };
  }

  /**
   * Finds tokens by address.
   * @return Observable from and to tokens.
   */
  private findTokensByAddress(searchedTokens?: {
    from: TokenInfo;
    to: TokenInfo;
  }): Observable<{ fromToken: TokenAmount; toToken: TokenAmount }> {
    const fromToken =
      searchedTokens?.from || this.tokensType === 'default'
        ? this.defaultTokens.from
        : this.customTokens.from;
    const toToken =
      searchedTokens?.to || this.tokensType === 'default'
        ? this.defaultTokens.to
        : this.customTokens.to;

    return this.swapsService.availableTokens$.pipe(
      first(tokens => tokens?.size > 0),
      map((tokens: List<TokenAmount>) => ({
        fromToken: tokens.find(token => compareTokens(token, fromToken)),
        toToken: tokens.find(token => compareTokens(token, toToken))
      }))
    );
  }

  /**
   * Navigates to swap page and fill in tokens form.
   */
  public buyToken(searchedTokens?: { from: TokenInfo; to: TokenInfo }): void {
    this.gtmService.reloadGtmSession();
    this.gtmService.fireClickEvent('click', 'buy_rbc');
    from(this.router.navigate(['/']))
      .pipe(switchMap(() => this.findTokensByAddress(searchedTokens)))
      .subscribe(({ fromToken, toToken }) => {
        this.swapFormService.input.patchValue({
          fromToken,
          toToken,
          fromBlockchain: fromToken.blockchain,
          toBlockchain: toToken.blockchain,
          fromAmount:
            this.tokensType === 'default'
              ? this.defaultTokens.from.amount
              : this.customTokens.from.amount
        });
      });
  }
}
