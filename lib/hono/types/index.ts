export interface WeatherSearchData {
  message: string;
  cod: string;
  count: number;
  list: List[];
}

export interface List {
  id: number;
  name: string;
  coord: Coord;
  main: Main;
  dt: number;
  wind: Wind;
  sys: Sys;
  rain: any;
  snow: any;
  clouds: Clouds;
  weather: Weather[];
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Sys {
  country: string;
}

export interface Clouds {
  all: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: WeatherDataWind;
  clouds: Clouds;
  dt: number;
  sys: WeatherDataSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherDataWind {
  speed: number;
  deg: number;
  gust: number;
}

export interface WeatherDataSys {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface KVCachedData<T = any> {
  timestamp: number;
  data: T;
}
