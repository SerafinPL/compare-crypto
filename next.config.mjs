/** @type {import('next').NextConfig} */
const nextConfig = {
 
    rewrites:() => {
      return [
        {
          source: "/gateio-currency_pairs",
          destination: "https://api.gateio.ws/api/v4/flash_swap/currency_pairs",
        },
        {
          source: "/kucoin-currency_pairs",
          destination: "https://api.kucoin.com/api/v2/symbols",
        },
        {
          source: "/kraken-currency_pairs",
          destination: "https://api.kucoin.com/api/v2/symbols",
        },
      ];
    },
  
  };

export default nextConfig;
