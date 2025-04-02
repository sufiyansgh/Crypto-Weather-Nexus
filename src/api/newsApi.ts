
// API key would typically be in environment variables
const API_KEY = 'f5b1047bb44445b9a448ba7e3fcaa0d7'; // Replace with actual key in production
const BASE_URL = 'https://newsdata.io/api/1/news';

export async function fetchCryptoNews() {
  try {
    // In a real implementation, we would use the actual API
    // For now, using a mock response for demo purposes
    
    // Simulate API call
    // const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&q=cryptocurrency&language=en`);
    // if (!response.ok) throw new Error('News fetch failed');
    // const data = await response.json();
    
    // Mock data for development
    const mockData = getMockNewsData();
    
    return mockData.map((item: any) => ({
      id: item.article_id,
      title: item.title,
      description: item.description,
      url: item.link,
      source: item.source_name,
      publishedAt: item.pubDate,
      imageUrl: item.image_url,
    }));
  } catch (error) {
    console.error('Error fetching news data:', error);
    throw error;
  }
}

// Mock news data for development
function getMockNewsData() {
  return [
    {
      article_id: "news001",
      title: "Bitcoin Surges Past $70,000 as Institutional Adoption Grows",
      description: "Bitcoin has reached new all-time highs as major financial institutions continue to invest in the cryptocurrency.",
      link: "https://example.com/news/bitcoin-surge",
      source_name: "Crypto Daily",
      pubDate: "2024-06-10T09:12:34.000Z",
      image_url: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&auto=format&fit=crop"
    },
    {
      article_id: "news002",
      title: "Ethereum Completes Major Network Upgrade, Improving Scalability",
      description: "The Ethereum network has successfully implemented its latest upgrade, significantly reducing transaction fees and improving throughput.",
      link: "https://example.com/news/ethereum-upgrade",
      source_name: "Blockchain Insider",
      pubDate: "2024-06-09T14:35:12.000Z",
      image_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop"
    },
    {
      article_id: "news003",
      title: "Regulatory Changes in Europe Could Benefit Cryptocurrency Markets",
      description: "New regulatory framework being developed in the EU aims to provide clear guidelines for cryptocurrency businesses, potentially fostering innovation.",
      link: "https://example.com/news/eu-crypto-regulation",
      source_name: "Financial Times",
      pubDate: "2024-06-08T11:47:23.000Z",
      image_url: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&auto=format&fit=crop"
    },
    {
      article_id: "news004",
      title: "Major Bank Launches Cryptocurrency Custody Service for Institutional Clients",
      description: "One of the world's largest banks has announced a new service allowing institutional clients to safely store and manage digital assets.",
      link: "https://example.com/news/bank-custody-service",
      source_name: "Banking Today",
      pubDate: "2024-06-07T16:28:09.000Z",
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop"
    },
    {
      article_id: "news005",
      title: "NFT Market Shows Signs of Recovery After Year-Long Slump",
      description: "The market for non-fungible tokens is showing signs of renewed interest, with trading volumes increasing for the first time in over a year.",
      link: "https://example.com/news/nft-recovery",
      source_name: "Digital Art Review",
      pubDate: "2024-06-06T08:19:45.000Z",
      image_url: "https://images.unsplash.com/photo-1659658994746-470aa8225120?w=600&auto=format&fit=crop"
    }
  ];
}
