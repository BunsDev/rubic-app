import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ProviderPanelComponent } from '@features/swaps/features/instant-trade/components/providers-panels/components/provider-panel/provider-panel.component';
import { InstantTradeBottomFormComponent } from 'src/app/features/swaps/features/instant-trade/components/instant-trade-bottom-form/instant-trade-bottom-form.component';
import { ProvidersPanelsContainerComponent } from 'src/app/features/swaps/features/instant-trade/components/providers-panels/components/providers-panels-container/providers-panels-container.component';
import { InstantTradeService } from '@features/swaps/features/instant-trade/services/instant-trade-service/instant-trade.service';
import { InstantTradeProvidersService } from '@features/swaps/features/instant-trade/services/instant-trade-service/instant-trade-providers.service';
import { SwapButtonContainerModule } from '@features/swaps/shared/swap-button-container/swap-button-container.module';
import { SwapsSharedModule } from '@features/swaps/shared/swaps-shared.module';

@NgModule({
  declarations: [
    InstantTradeBottomFormComponent,
    ProviderPanelComponent,
    ProvidersPanelsContainerComponent
  ],
  providers: [InstantTradeService, InstantTradeProvidersService],
  exports: [InstantTradeBottomFormComponent],
  imports: [CommonModule, SharedModule, SwapButtonContainerModule, SwapsSharedModule]
})
export class InstantTradeModule {}
