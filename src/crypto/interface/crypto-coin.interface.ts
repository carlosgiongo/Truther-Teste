interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: any;
  last_updated: string;
}

interface SpecificCoin {
  id: string;
  symbol: string;
  market_data: MarketData;
}

interface MarketData {
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  market_cap: {
    brl: number;
  };
  ath: {
    brl: number;
  };
  atl: {
    brl: number;
  };
  current_price: {
    brl: number;
  };
}
