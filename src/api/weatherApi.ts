
// API key would typically be in environment variables
const API_KEY = '42a9bda8accc2ac51e4f52dad95ef97f'; // Replace with actual key in production
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeatherForCity(city: string) {
  try {
    // In a real implementation, we would use the actual API key
    // For now, using a mock response for demo purposes
    
    // Simulate API call
    // const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
    // if (!response.ok) throw new Error('Weather data fetch failed');
    // const data = await response.json();
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data for development
    const mockData = getMockWeatherData(city);
    
    return {
      cityId: mockData.id.toString(),
      city: mockData.name,
      country: mockData.sys.country,
      temperature: mockData.main.temp,
      feelsLike: mockData.main.feels_like,
      humidity: mockData.main.humidity,
      windSpeed: mockData.wind.speed,
      description: mockData.weather[0].description,
      icon: mockData.weather[0].icon,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Mock weather data for development
function getMockWeatherData(city: string) {
  const cityData: Record<string, any> = {
    'New York': {
      id: 5128581,
      name: 'New York',
      main: {
        temp: 22.5,
        feels_like: 23.1,
        humidity: 65,
        pressure: 1015,
      },
      weather: [
        {
          description: 'partly cloudy',
          icon: '02d',
        },
      ],
      wind: {
        speed: 4.2,
      },
      sys: {
        country: 'US',
      },
      visibility: 10000,
    },
    'London': {
      id: 2643743,
      name: 'London',
      main: {
        temp: 18.2,
        feels_like: 17.8,
        humidity: 78,
        pressure: 1011,
      },
      weather: [
        {
          description: 'light rain',
          icon: '10d',
        },
      ],
      wind: {
        speed: 5.1,
      },
      sys: {
        country: 'GB',
      },
      visibility: 8000,
    },
    'Tokyo': {
      id: 1850147,
      name: 'Tokyo',
      main: {
        temp: 26.7,
        feels_like: 27.9,
        humidity: 60,
        pressure: 1008,
      },
      weather: [
        {
          description: 'clear sky',
          icon: '01d',
        },
      ],
      wind: {
        speed: 3.5,
      },
      sys: {
        country: 'JP',
      },
      visibility: 10000,
    },
    'Paris': {
      id: 2988507,
      name: 'Paris',
      main: {
        temp: 19.8,
        feels_like: 19.3,
        humidity: 71,
        pressure: 1012,
      },
      weather: [
        {
          description: 'scattered clouds',
          icon: '03d',
        },
      ],
      wind: {
        speed: 3.9,
      },
      sys: {
        country: 'FR',
      },
      visibility: 9000,
    },
    'Sydney': {
      id: 2147714,
      name: 'Sydney',
      main: {
        temp: 24.3,
        feels_like: 24.8,
        humidity: 55,
        pressure: 1016,
      },
      weather: [
        {
          description: 'sunny',
          icon: '01d',
        },
      ],
      wind: {
        speed: 6.2,
      },
      sys: {
        country: 'AU',
      },
      visibility: 10000,
    },
  };

  // Default fallback data if city not found
  const defaultData = {
    id: 1000000 + Math.floor(Math.random() * 1000),
    name: city,
    main: {
      temp: 20 + Math.random() * 10,
      feels_like: 20 + Math.random() * 10,
      humidity: 50 + Math.floor(Math.random() * 40),
      pressure: 1010 + Math.floor(Math.random() * 10),
    },
    weather: [
      {
        description: 'clear sky',
        icon: '01d',
      },
    ],
    wind: {
      speed: 2 + Math.random() * 6,
    },
    sys: {
      country: 'XX',
    },
    visibility: 8000 + Math.floor(Math.random() * 2000),
  };

  return cityData[city] || defaultData;
}
