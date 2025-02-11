import { INSTANT_TRADE_PROVIDER } from '@shared//models/instant-trade/instant-trade-provider';

export const instantTradesLabels: Record<INSTANT_TRADE_PROVIDER, string> = {
  [INSTANT_TRADE_PROVIDER.ONEINCH]: '1inch',
  [INSTANT_TRADE_PROVIDER.UNISWAP_V2]: 'Uniswap V2',
  [INSTANT_TRADE_PROVIDER.UNISWAP_V3]: 'Uniswap V3',
  [INSTANT_TRADE_PROVIDER.PANCAKESWAP]: 'Pancakeswap',
  [INSTANT_TRADE_PROVIDER.QUICKSWAP]: 'Quickswap',
  [INSTANT_TRADE_PROVIDER.SUSHISWAP]: 'Sushiswap',
  [INSTANT_TRADE_PROVIDER.ZRX]: '0x',
  [INSTANT_TRADE_PROVIDER.PANGOLIN]: 'Pangolin',
  [INSTANT_TRADE_PROVIDER.JOE]: 'Joe',
  [INSTANT_TRADE_PROVIDER.SOLARBEAM]: 'Solarbeam',
  [INSTANT_TRADE_PROVIDER.SPOOKYSWAP]: 'Spookyswap',
  [INSTANT_TRADE_PROVIDER.SPIRITSWAP]: 'Spiritswap',
  [INSTANT_TRADE_PROVIDER.WRAPPED]: 'Wrapped',
  [INSTANT_TRADE_PROVIDER.RAYDIUM]: 'Raydium',
  [INSTANT_TRADE_PROVIDER.ALGEBRA]: 'Algebra',
  [INSTANT_TRADE_PROVIDER.VIPER]: 'Viperswap',
  [INSTANT_TRADE_PROVIDER.TRISOLARIS]: 'Trisolaris',
  [INSTANT_TRADE_PROVIDER.WANNASWAP]: 'Wannaswap',
  [INSTANT_TRADE_PROVIDER.REF]: 'Ref finance',
  [INSTANT_TRADE_PROVIDER.ZAPPY]: 'Zappy'
};
