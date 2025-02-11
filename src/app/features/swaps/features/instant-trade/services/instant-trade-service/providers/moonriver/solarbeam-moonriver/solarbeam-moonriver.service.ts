import { Injectable } from '@angular/core';
import { SOLAR_BEAM_MOON_RIVER_CONSTANTS } from '@features/swaps/features/instant-trade/services/instant-trade-service/providers/moonriver/solarbeam-moonriver/solarbeam-moonriver-constants';
import { CommonUniswapV2Service } from '@features/swaps/features/instant-trade/services/instant-trade-service/providers/common/uniswap-v2/common-service/common-uniswap-v2.service';
import { Multicall } from '@core/services/blockchain/models/multicall';
import { INSTANT_TRADE_PROVIDER } from '@shared/models/instant-trade/instant-trade-provider';
import { SOLARBEAM_CONTRACT_ABI } from '@features/swaps/features/instant-trade/services/instant-trade-service/providers/moonriver/solarbeam-moonriver/constants/solarbeam-contract-abi';

@Injectable({
  providedIn: 'root'
})
export class SolarBeamMoonRiverService extends CommonUniswapV2Service {
  public readonly providerType = INSTANT_TRADE_PROVIDER.SOLARBEAM;

  protected readonly contractAbi = SOLARBEAM_CONTRACT_ABI;

  constructor() {
    super(SOLAR_BEAM_MOON_RIVER_CONSTANTS);
  }

  /**
   * Makes multi call of contract's methods.
   * @param routesMethodArguments Arguments for calling uni-swap contract method.
   * @param methodName Method of contract.
   * @return Promise<Multicall[]>
   */
  protected getRoutes(routesMethodArguments: unknown[], methodName: string): Promise<Multicall[]> {
    const methodParams = routesMethodArguments.map((methodArguments: string[]) => {
      // Solarbeam router requires additional parameter 'fee'
      const solarMethodArguments = methodArguments.concat('25');
      return {
        methodName,
        methodArguments: solarMethodArguments
      };
    });

    return this.web3Public.multicallContractMethods<{ amounts: string[] }>(
      this.contractAddress,
      this.contractAbi,
      methodParams
    );
  }
}
