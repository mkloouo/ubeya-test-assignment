export const config = {
  apis: {
    weather: {
      url: 'https://api.weatherbit.io/v2.0',
      key: process.env['REACT_APP_WEATHER_API_KEY'],
    },
    google: {
      url: 'https://maps.googleapis.com/maps/api',
      key: process.env['REACT_APP_GOOGLE_API_KEY'],
    },
  },
};
