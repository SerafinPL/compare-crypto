/** @type {import('next').NextConfig} */
const nextConfig = {
 
    rewrites:() => {
      return [
        {
          source: "/gateio-currency_pairs",
          destination: "https://api.gateio.ws/api/v4/spot/currency_pairs",
        },
        {
          source: "/gateio-tickers",
          destination: "https://api.gateio.ws/api/v4/spot/tickers",
        },
        {
          source: "/kucoin-currency_pairs",
          destination: "https://api.kucoin.com/api/v2/symbols",
        },
        {
          source: "/kucoin-currency_prices",
          destination: "https://api.kucoin.com/api/v1/market/allTickers",
        },
        {
          source: "/kraken-currency_pairs",
          destination: "https://api.kucoin.com/api/v2/symbols",
        },
      ];
    },
  
  };

export default nextConfig;
