import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BLOCKCHAIN_NAME, BlockchainName } from '@shared/models/blockchain/blockchain-name';
import { SwapFormService } from '@features/swaps/features/main-form/services/swap-form-service/swap-form.service';
import { startWith } from 'rxjs/operators';

interface TargetAddress {
  value: string;
  isValid: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TargetNetworkAddressService {
  private readonly networksRequiresAddress: BlockchainName[] = [
    BLOCKCHAIN_NAME.SOLANA,
    BLOCKCHAIN_NAME.NEAR
  ];

  private readonly _targetNetworkAddress$ = new BehaviorSubject<TargetAddress | null>(null);

  public readonly targetAddress$ = this._targetNetworkAddress$.asObservable();

  private readonly _displayAddress$ = new BehaviorSubject<boolean>(false);

  public readonly displayAddress$ = this._displayAddress$.asObservable();

  public get targetAddress(): TargetAddress | null {
    return this._targetNetworkAddress$.value;
  }

  public set targetAddress(targetAddress: TargetAddress | null) {
    this._targetNetworkAddress$.next(targetAddress);
  }

  constructor(private readonly formService: SwapFormService) {
    this.formService.input.valueChanges
      .pipe(startWith(this.formService.inputValue))
      .subscribe(form => {
        const needDisplayAddress =
          (this.networksRequiresAddress.includes(form.fromBlockchain) ||
            this.networksRequiresAddress.includes(form.toBlockchain)) &&
          Boolean(form.fromToken && form.toToken);

        this._displayAddress$.next(needDisplayAddress);

        if (!needDisplayAddress) {
          this._targetNetworkAddress$.next(null);
        }
      });
  }
}
