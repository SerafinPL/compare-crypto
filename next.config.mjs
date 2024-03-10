/** @type {import('next').NextConfig} */
const nextConfig = {
 
    rewrites:() => {
      return [
        {
          source: "/gateio-currency_pairs",
          destination: "https://api.gateio.ws/api/v4/flash_swap/currency_pairs",
        },
        {
          source: "/ducks",
          destination: "https://random-d.uk/api/random",
        },
      ];
    },
  
  };

export default nextConfig;
