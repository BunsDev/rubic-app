import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InlineSVGModule } from 'ng-inline-svg-2';
import {
  TuiToggleModule,
  TuiInputModule,
  TuiTabsModule,
  TuiInputCountModule,
  TuiDataListWrapperModule,
  TuiBadgeModule,
  TuiTagModule
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiHintModule,
  TuiSvgModule,
  TuiTooltipModule,
  TuiHostedDropdownModule,
  TuiLoaderModule,
  TuiManualHintModule
} from '@taiga-ui/core';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { RubicTokensComponent } from 'src/app/shared/components/rubic-tokens/rubic-tokens.component';
import { RubicLanguageSelectComponent } from 'src/app/core/header/components/header/components/rubic-language-select/rubic-language-select.component';
import { RubicRefreshButtonComponent } from 'src/app/shared/components/rubic-refresh-button/rubic-refresh-button.component';
import { GasIndicatorComponent } from 'src/app/shared/components/gas-indicator/gas-indicator.component';
import { LetDirective } from 'src/app/shared/directives/let/let.directive';
import { NoFrameDirective } from 'src/app/shared/directives/noFrame/no-frame.directive';
import { OnlyFrameDirective } from 'src/app/shared/directives/onlyFrame/only-frame.directive';
import { UsdPriceContainerComponent } from 'src/app/shared/components/usd-price-container/usd-price-container.component';
import { PanelErrorContentComponent } from '@features/swaps/features/instant-trade/components/providers-panels/components/provider-panel/panel-error-content/panel-error-content.component';
import { PanelContentComponent } from '@features/swaps/features/instant-trade/components/providers-panels/components/provider-panel/panel-content/panel-content.component';
import { BigNumberFormatPipe } from './pipes/big-number-format.pipe';
import { ScannerLinkPipe } from './pipes/scanner-link.pipe';
import { SafetyLinkDirective } from './directives/safety-link/safety-link.directive';
import { ShortAddressPipe } from './pipes/short-address.pipe';
import { WithRoundPipe } from './pipes/with-round.pipe';
import { IconButtonComponent } from './components/buttons/icon-button/icon-button.component';
import { DropdownSelectorComponent } from './components/dropdown-selector/dropdown-selector.component';
import { TokenAmountDirective } from './directives/token-amount/token-amount.directive';
import { RubicButtonCircleComponent } from './components/rubic-button-circle/rubic-button-circle.component';
import { RubicButtonComponent } from './components/rubic-button/rubic-button.component';
import { ShortenAmountPipe } from './pipes/shorten-amount.pipe';
import { RubicVolumeComponent } from './components/rubic-volume/rubic-volume.component';
import { IframeBlockchainIndicatorComponent } from './components/iframe-blockchain-indicator/iframe-blockchain-indicator.component';
import { ThemedIconPipe } from './pipes/themed-icon.pipe';
import { SuccessTxModalComponent } from './components/success-tx-modal/success-tx-modal.component';
import { SuccessTrxNotificationComponent } from './components/success-trx-notification/success-trx-notification.component';
import { RotatingIconComponent } from './components/rotating-icon/rotating-icon.component';
import { InfoHintComponent } from './components/info-hint/info-hint.component';
import { BuyTokenComponent } from './components/buy-token/buy-token.component';
import { NotificationBadgeComponent } from './components/notification-badge/notification-badge.component';
import { FalsyPipe } from './pipes/falsy.pipe';
import { RubicContainerComponent } from './components/rubic-container/rubic-container.component';
import { CopyContainerComponent } from './components/copy-container/copy-container.component';
import { FunctionCallPipe } from '@shared/pipes/function-call.pipe';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ProgressTrxNotificationComponent } from '@shared/components/progress-trx-notification/progress-trx-notification.component';

@NgModule({
  declarations: [
    // Components.
    DropdownSelectorComponent,
    RubicButtonCircleComponent,
    RubicButtonCircleComponent,
    RubicButtonComponent,
    IconButtonComponent,
    RubicLanguageSelectComponent,
    RubicVolumeComponent,
    RubicTokensComponent,
    RubicRefreshButtonComponent,
    SuccessTxModalComponent,
    SuccessTrxNotificationComponent,
    GasIndicatorComponent,
    PanelErrorContentComponent,
    PanelContentComponent,
    UsdPriceContainerComponent,
    RotatingIconComponent,
    InfoHintComponent,
    BuyTokenComponent,
    IframeBlockchainIndicatorComponent,
    RubicContainerComponent,
    RotatingIconComponent,
    InfoHintComponent,
    NotificationBadgeComponent,
    CopyContainerComponent,
    IframeBlockchainIndicatorComponent,
    StatusBadgeComponent,
    ChipsComponent,
    ProgressTrxNotificationComponent,
    // Pipes.
    BigNumberFormatPipe,
    ScannerLinkPipe,
    ShortAddressPipe,
    WithRoundPipe,
    ShortenAmountPipe,
    ThemedIconPipe,
    FalsyPipe,
    FunctionCallPipe,
    // Directives.
    SafetyLinkDirective,
    TokenAmountDirective,
    LetDirective,
    NoFrameDirective,
    OnlyFrameDirective
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ScrollingModule,
    InlineSVGModule.forRoot(),
    TuiSvgModule,
    TuiTooltipModule,
    TuiHintModule,
    TuiInputModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiActiveZoneModule,
    TuiDropdownModule,
    TuiHostedDropdownModule,
    TuiToggleModule,
    TuiSvgModule,
    TuiHintModule,
    TuiToggleModule,
    TuiTabsModule,
    TuiInputCountModule,
    TuiDataListWrapperModule,
    TuiLoaderModule,
    TuiBadgeModule,
    TuiManualHintModule,
    TuiTagModule
  ],
  exports: [
    BigNumberFormatPipe,
    ScannerLinkPipe,
    TranslateModule,
    ShortAddressPipe,
    RubicButtonCircleComponent,
    DropdownSelectorComponent,
    RubicButtonCircleComponent,
    RubicButtonComponent,
    IconButtonComponent,
    ShortenAmountPipe,
    RubicLanguageSelectComponent,
    RubicVolumeComponent,
    FalsyPipe,
    WithRoundPipe,
    SafetyLinkDirective,
    RubicTokensComponent,
    RubicRefreshButtonComponent,
    TokenAmountDirective,
    GasIndicatorComponent,
    PanelErrorContentComponent,
    PanelContentComponent,
    LetDirective,
    NoFrameDirective,
    OnlyFrameDirective,
    IframeBlockchainIndicatorComponent,
    ThemedIconPipe,
    UsdPriceContainerComponent,
    RotatingIconComponent,
    InfoHintComponent,
    BuyTokenComponent,
    NotificationBadgeComponent,
    RubicContainerComponent,
    CopyContainerComponent,
    FunctionCallPipe,
    StatusBadgeComponent,
    ChipsComponent
  ],
  providers: [ScannerLinkPipe, WithRoundPipe, BigNumberFormatPipe],
  entryComponents: [SuccessTrxNotificationComponent, ProgressTrxNotificationComponent]
})
export class SharedModule {}
