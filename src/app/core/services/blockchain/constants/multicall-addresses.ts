import { BLOCKCHAIN_NAME, EthLikeBlockchainName } from '@shared/models/blockchain/blockchain-name';

export const MULTICALL_ADDRESS: Record<EthLikeBlockchainName, string> = {
  [BLOCKCHAIN_NAME.ETHEREUM]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: '0x15dc8b5ed578AA7a019dd0139B330cfD625cA795',
  [BLOCKCHAIN_NAME.POLYGON]: '0x176730799C812d70C6608F51aEa6C7e5cdA7eA50',
  [BLOCKCHAIN_NAME.HARMONY]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [BLOCKCHAIN_NAME.AVALANCHE]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [BLOCKCHAIN_NAME.MOONRIVER]: '0x270f2F35bED92B7A59eA5F08F6B3fd34c8D9D9b5',
  [BLOCKCHAIN_NAME.FANTOM]: '0x22D4cF72C45F8198CfbF4B568dBdB5A85e8DC0B5',
  [BLOCKCHAIN_NAME.ARBITRUM]: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
  [BLOCKCHAIN_NAME.AURORA]: '0xe0e3887b158F7F9c80c835a61ED809389BC08d1b',
  [BLOCKCHAIN_NAME.TELOS]: '0x53dC7535028e2fcaCa0d847AD108b9240C0801b1' // Rubic own multicall v2.
};
