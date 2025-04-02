
import { store } from '../store';
import { updateCryptoPrice } from '../store/cryptoSlice';
import { toast } from '../components/ui/use-toast';

// WebSocket API endpoint
const WEBSOCKET_URL = 'wss://ws.coincap.io/prices?assets=bitcoin,ethereum,cardano,ripple,solana,polkadot,dogecoin,litecoin,chainlink,uniswap';

let socket: WebSocket | null = null;
let reconnectInterval: NodeJS.Timeout | null = null;
let lastPrices: Record<string, number> = {};
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;

export function startWebSocketConnection() {
  if (socket) {
    socket.close();
  }

  try {
    console.log('Connecting to WebSocket...');
    socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => {
      console.log('WebSocket connection established');
      
      // Reset reconnect attempts on successful connection
      reconnectAttempts = 0;
      
      // Clear any reconnect interval
      if (reconnectInterval) {
        clearInterval(reconnectInterval);
        reconnectInterval = null;
      }
      
      // Show notification of connection
      toast({
        title: "Real-time Updates Active",
        description: "You're now receiving live cryptocurrency price updates",
      });
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Process each crypto price update
        Object.entries(data).forEach(([cryptoId, price]) => {
          const numericPrice = Number(price);
          
          // Get previous price to detect significant changes
          const previousPrice = lastPrices[cryptoId] || numericPrice;
          const priceChange = numericPrice - previousPrice;
          const percentChange = (priceChange / previousPrice) * 100;
          
          // Update the price in Redux store
          store.dispatch(updateCryptoPrice({
            id: cryptoId,
            price: numericPrice
          }));
          
          // Update our lastPrices object
          lastPrices[cryptoId] = numericPrice;
          
          // Show notification for significant price changes (>= 0.5%)
          if (Math.abs(percentChange) >= 0.5) {
            showPriceChangeNotification(cryptoId, numericPrice, percentChange);
          }
        });
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event.code, event.reason);
      
      // Attempt to reconnect with exponential backoff
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS && !reconnectInterval) {
        const delay = Math.min(1000 * (2 ** reconnectAttempts), 30000); // Max 30 seconds
        reconnectAttempts++;
        
        reconnectInterval = setInterval(() => {
          console.log(`Reconnect attempt ${reconnectAttempts}...`);
          startWebSocketConnection();
        }, delay);
      } else if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        console.log('Maximum reconnection attempts reached. Stopping reconnection.');
        toast({
          title: "Connection Lost",
          description: "Could not reconnect to real-time price feed. Try refreshing the page.",
          variant: "destructive",
        });
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      socket?.close();
    };
  } catch (error) {
    console.error('Failed to connect to WebSocket:', error);
  }
}

export function stopWebSocketConnection() {
  if (socket) {
    socket.close();
    socket = null;
  }
  
  if (reconnectInterval) {
    clearInterval(reconnectInterval);
    reconnectInterval = null;
  }
  
  reconnectAttempts = 0;
}

function showPriceChangeNotification(cryptoId: string, price: number, percentChange: number) {
  // Format the crypto ID for display
  const formattedId = cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1);
  
  // Format the price and percent change
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
  
  const formattedPercent = new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: 'always'
  }).format(percentChange / 100);
  
  // Determine if this is a positive or negative change
  const changeType = percentChange > 0 ? 'positive' : 'negative';
  
  // Show toast notification
  toast({
    title: `${formattedId} Price Alert`,
    description: `${formattedId} is now ${formattedPrice} (${formattedPercent})`,
    variant: changeType === 'positive' ? 'default' : 'destructive',
  });
}

// Simulate weather alerts for demo purposes
export function startSimulatedWeatherAlerts() {
  // Simulate random weather alerts every 30-60 seconds
  setInterval(() => {
    const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];
    const alertTypes = [
      { type: 'Heavy Rain', icon: '🌧️' }, 
      { type: 'Strong Winds', icon: '💨' }, 
      { type: 'Heat Wave', icon: '🔥' }, 
      { type: 'Thunderstorm', icon: '⛈️' }, 
      { type: 'Flood Warning', icon: '🌊' }
    ];
    
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    
    // Show toast notification
    toast({
      title: `Weather Alert: ${randomCity} ${randomAlert.icon}`,
      description: `${randomAlert.type} expected in ${randomCity}. Take necessary precautions.`,
      variant: 'destructive',
    });
  }, Math.random() * 30000 + 30000); // Random interval between 30-60 seconds
}
