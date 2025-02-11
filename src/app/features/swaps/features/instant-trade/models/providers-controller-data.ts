import InstantTrade from '@features/swaps/features/instant-trade/models/instant-trade';
import { INSTANT_TRADE_STATUS } from '@features/swaps/features/instant-trade/models/instant-trades-trade-status';
import { INSTANT_TRADE_PROVIDER } from '@shared/models/instant-trade/instant-trade-provider';
import { RubicError } from '@core/errors/models/rubic-error';
import { ERROR_TYPE } from '@core/errors/models/error-type';

export interface InstantTradeProviderData {
  readonly name: INSTANT_TRADE_PROVIDER;
  trade: InstantTrade | null;
  tradeStatus: INSTANT_TRADE_STATUS;
  needApprove: boolean;
  error?: RubicError<ERROR_TYPE>;

  // UI data
  readonly label: string;
  isSelected: boolean;
}
