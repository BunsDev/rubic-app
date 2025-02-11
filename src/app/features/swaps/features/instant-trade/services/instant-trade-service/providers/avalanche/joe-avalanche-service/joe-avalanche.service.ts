import { Injectable } from '@angular/core';
import { JOE_AVALANCHE_CONSTANTS } from '@features/swaps/features/instant-trade/services/instant-trade-service/providers/avalanche/joe-avalanche-service/joe-avalanche-constants';
import { CommonUniswapV2Service } from '@features/swaps/features/instant-trade/services/instant-trade-service/providers/common/uniswap-v2/common-service/common-uniswap-v2.service';
import AVAX_CONTRACT_ABI from '@features/swaps/features/instant-trade/services/instant-trade-service/providers/avalanche/models/avax-contract-abi';
import { AVAX_SWAP_METHOD } from '@features/swaps/features/instant-trade/services/instant-trade-service/providers/avalanche/models/swap-method';
import { INSTANT_TRADE_PROVIDER } from '@shared/models/instant-trade/instant-trade-provider';

@Injectable({
  providedIn: 'root'
})
export class JoeAvalancheService extends CommonUniswapV2Service {
  public readonly providerType = INSTANT_TRADE_PROVIDER.JOE;

  protected readonly contractAbi = AVAX_CONTRACT_ABI;

  protected readonly swapsMethod = AVAX_SWAP_METHOD;

  constructor() {
    super(JOE_AVALANCHE_CONSTANTS);
  }
}
