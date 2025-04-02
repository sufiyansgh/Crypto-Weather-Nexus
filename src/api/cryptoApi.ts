
// API endpoints
const BASE_URL = 'https://api.coingecko.com/api/v3';

export async function fetchCryptoData() {
  try {
    // In a real implementation, we would use the actual API
    // For now, using a mock response for demo purposes
    
    // Simulate API call
    // const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1`);
    // if (!response.ok) throw new Error('Crypto data fetch failed');
    // const data = await response.json();
    
    // Mock data for development
    const mockData = getMockCryptoData();
    
    return mockData.map((crypto: any) => ({
      id: crypto.id,
      symbol: crypto.symbol,
      name: crypto.name,
      price: crypto.current_price,
      priceChangePercent24h: crypto.price_change_percentage_24h,
      marketCap: crypto.market_cap,
      volume24h: crypto.total_volume,
      lastUpdated: new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw error;
  }
}

export async function fetchCryptoDetail(cryptoId: string) {
  try {
    // In a real implementation, we would use the actual API
    // Simulate API call
    // const response = await fetch(`${BASE_URL}/coins/${cryptoId}`);
    // if (!response.ok) throw new Error('Crypto detail fetch failed');
    // const data = await response.json();
    
    // Mock data for development
    const allCryptos = getMockCryptoData();
    const crypto = allCryptos.find((c: any) => c.id === cryptoId) || allCryptos[0];
    
    return {
      id: crypto.id,
      symbol: crypto.symbol,
      name: crypto.name,
      price: crypto.current_price,
      priceChangePercent24h: crypto.price_change_percentage_24h,
      marketCap: crypto.market_cap,
      volume24h: crypto.total_volume,
      high24h: crypto.high_24h,
      low24h: crypto.low_24h,
      circulatingSupply: crypto.circulating_supply,
      totalSupply: crypto.total_supply,
      allTimeHigh: crypto.ath,
      allTimeHighDate: crypto.ath_date,
      description: crypto.description || 'No description available',
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching crypto detail:', error);
    throw error;
  }
}

// Mock crypto data for development
function getMockCryptoData() {
  return [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      current_price: 70215.82,
      price_change_percentage_24h: 2.35,
      market_cap: 1380491044337,
      total_volume: 36938283075,
      high_24h: 70962.33,
      low_24h: 68532.21,
      circulating_supply: 19662193,
      total_supply: 21000000,
      ath: 73738,
      ath_date: "2024-03-14T14:13:42.033Z",
      description: "Bitcoin is the first decentralized cryptocurrency."
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      current_price: 3783.91,
      price_change_percentage_24h: -0.62,
      market_cap: 454701340233,
      total_volume: 18266551214,
      high_24h: 3851.12,
      low_24h: 3724.89,
      circulating_supply: 120000000,
      total_supply: 120000000,
      ath: 4878.26,
      ath_date: "2021-11-10T14:24:19.604Z",
      description: "Ethereum is a decentralized platform that runs smart contracts."
    },
    {
      id: "cardano",
      symbol: "ada",
      name: "Cardano",
      current_price: 0.452287,
      price_change_percentage_24h: 0.78,
      market_cap: 16009572851,
      total_volume: 435212549,
      high_24h: 0.461234,
      low_24h: 0.448967,
      circulating_supply: 35341513358,
      total_supply: 45000000000,
      ath: 3.09,
      ath_date: "2021-09-02T06:00:10.474Z",
      description: "Cardano is a proof-of-stake blockchain platform."
    },
    {
      id: "solana",
      symbol: "sol",
      name: "Solana",
      current_price: 169.42,
      price_change_percentage_24h: 3.12,
      market_cap: 73947421834,
      total_volume: 2941523087,
      high_24h: 172.18,
      low_24h: 162.34,
      circulating_supply: 436665134,
      total_supply: 556765134,
      ath: 259.96,
      ath_date: "2021-11-06T21:54:35.825Z",
      description: "Solana is a high-performance blockchain supporting smart contracts and decentralized applications."
    },
    {
      id: "ripple",
      symbol: "xrp",
      name: "XRP",
      current_price: 0.491342,
      price_change_percentage_24h: -1.23,
      market_cap: 27083234568,
      total_volume: 832157469,
      high_24h: 0.498765,
      low_24h: 0.486543,
      circulating_supply: 55175152078,
      total_supply: 100000000000,
      ath: 3.4,
      ath_date: "2018-01-07T00:00:00.000Z",
      description: "XRP is the native cryptocurrency of the XRP Ledger."
    }
  ];
}
