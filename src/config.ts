export const config = {
  apis: {
    weather: {
      url: 'https://api.weatherbit.io/v2.0',
      key: process.env.WEATHER_API_KEY,
    },
    google: {
      url: 'https://maps.googleapis.com/maps/api',
      key: process.env.GOOGLE_API_KEY,
    },
  },
};
