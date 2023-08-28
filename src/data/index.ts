import { WeatherData } from '../../lib/hono/types';
import backgroundImageMap from '../assets/images/backgrounds/';
import iconImageMap from '../assets/images/icons/';

export const DefaultWeatherData = {
  coord: {
    lon: 0,
    lat: 0,
  },
  weather: [
    {
      id: 0,
      main: 'initial',
      description: '-',
      icon: '',
    },
  ],
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    grnd_level: 0,
    sea_level: 0,
  },
  wind: {
    speed: 0,
    deg: 0,
    gust: 0,
  },
  clouds: {
    all: 0,
  },
  dt: 0,
  sys: {
    country: '-',
    sunrise: 0,
    sunset: 0,
  },
  timezone: 0,
  name: '-',
  base: '-',
  visibility: 0,
  cod: 0,
  id: 0,
} satisfies WeatherData;

export const DynamicBackGroundImageMap = new Map<
  string,
  {
    day: string;
    night: string;
  }
>([
  [
    'Clear',
    {
      day: backgroundImageMap.dayBg,
      night: backgroundImageMap.nightBg,
    },
  ],
  [
    'Clouds',
    {
      day: backgroundImageMap.cloudyDayBg,
      night: backgroundImageMap.cloudyNightBg,
    },
  ],
  [
    'Haze',
    {
      day: backgroundImageMap.hazeDayBg,
      night: backgroundImageMap.hazeNightBg,
    },
  ],
  [
    'Thunderstorm',
    {
      day: backgroundImageMap.thunderstormBg,
      night: backgroundImageMap.thunderstormBg,
    },
  ],
  [
    'Rain',
    {
      day: backgroundImageMap.rainyBg,
      night: backgroundImageMap.rainyBg,
    },
  ],
  [
    'Drizzle',
    {
      day: backgroundImageMap.rainyBg,
      night: backgroundImageMap.rainyBg,
    },
  ],
  [
    'Snow',
    {
      day: backgroundImageMap.snowyBg,
      night: backgroundImageMap.snowyBg,
    },
  ],
  [
    'default',
    {
      day: backgroundImageMap.dayBg,
      night: backgroundImageMap.nightBg,
    },
  ],
  [
    'Default',
    {
      day: backgroundImageMap.dayBg,
      night: backgroundImageMap.nightBg,
    },
  ],
]);

export const DynamicIconMap = new Map<string, string>([
  ['01d', iconImageMap.i01d],
  ['01n', iconImageMap.i01n],
  ['02d', iconImageMap.i02d],
  ['02n', iconImageMap.i02n],
  ['03d', iconImageMap.i03d],
  ['03n', iconImageMap.i03n],
  ['04d', iconImageMap.i04d],
  ['04n', iconImageMap.i04n],
  ['09d', iconImageMap.i09d],
  ['09n', iconImageMap.i09n],
  ['10d', iconImageMap.i10d],
  ['10n', iconImageMap.i10n],
  ['11d', iconImageMap.i11d],
  ['11n', iconImageMap.i11n],
  ['13d', iconImageMap.i13d],
  ['13n', iconImageMap.i13n],
  ['50d', iconImageMap.i50d],
  ['50n', iconImageMap.i50n],
  ['default', iconImageMap.i01d],
  ['Default', iconImageMap.i01d],
]);
