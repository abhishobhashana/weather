import moment from "moment-timezone";
import { Cloud, Moon, Sun, WindIcon } from "../assets/icons";
import { useSelector } from "react-redux";

export function getTimezonesByCountry(countryCode) {
  if (!countryCode || typeof countryCode !== "string") return [];

  const zones = moment.tz.zonesForCountry(countryCode.toUpperCase(), true);
  if (!zones || zones.length === 0) return [];

  return zones.map((zone) => zone.name);
}

const formatTime = (time, tz = "UTC") => {
  const hourMoment = moment.tz(time, tz);
  const hours = hourMoment.hour();
  const suffix = hours >= 12 ? "PM" : "AM";
  let display = hours % 12;
  if (display === 0) display = 12;
  return `${display}${suffix}`;
};

const isNightTime = (hourTime, sunrise, sunset) => {
  const time = moment(hourTime);
  return time.isBefore(sunrise) || time.isAfter(sunset);
};

export const getWeatherDescription = (code, wind = 0) => {
  if (Math.round(wind) >= 7) {
    return "Windy";
  }
  const weatherCodes = {
    0: "Unknown",
    1000: "Clear",
    1001: "Cloudy",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",
    2000: "Fog",
    2100: "Light Fog",
    3000: "Light Wind",
    3001: "Wind",
    3002: "Strong Wind",
    4000: "Drizzle",
    4001: "Rain",
    4200: "Light Rain",
    4201: "Heavy Rain",
    5000: "Snow",
    5001: "Flurries",
    5100: "Light Snow",
    5101: "Heavy Snow",
    6000: "Freezing Drizzle",
    6001: "Freezing Rain",
    6200: "Light Freezing Rain",
    6201: "Heavy Freezing Rain",
    7000: "Ice Pellets",
    7101: "Heavy Ice Pellets",
    7102: "Light Ice Pellets",
    8000: "Thunderstorm",
  };
  return weatherCodes[code.toString()];
};

const getWeatherIconByCode = (code, wind = 0, isNight = false) => {
  if (wind >= 7) {
    return <WindIcon />;
  }
  switch (code) {
    case 1000:
      return isNight ? <Moon /> : <Sun />;

    case 1001:
    case 1102:
      return <Cloud />;

    case 1100:
    case 1101:
    case 1103:
      return isNight ? <Cloud type="moon" /> : <Cloud type="sun" />;

    case 2000:
    case 2100:
    case 2101:
    case 2102:
    case 2103:
    case 2106:
    case 2107:
    case 2108:
      return <Cloud type="fog" />;

    case 4000:
    case 4200:
      return <Cloud type="drizzle" />;

    case 4001:
      return <Cloud type="rain" />;

    case 4201:
      return <Cloud type="heavy-rain" />;

    case 4202:
    case 4203:
    case 4204:
    case 4205:
    case 4208:
    case 4209:
    case 4210:
    case 4211:
    case 4212:
    case 4213:
    case 4214:
    case 4215:
      return isNight ? (
        <Cloud type="cloudy-drizzle" />
      ) : (
        <Cloud type="cloudy-sun-drizzle" />
      );

    case 5000:
    case 5001:
    case 5100:
    case 5102:
    case 5103:
    case 5104:
    case 5105:
    case 5106:
    case 5107:
    case 5115:
    case 5116:
    case 5117:
    case 5119:
    case 5120:
    case 5121:
      return <Cloud type="snow" />;

    case 5101:
      return <Cloud type="heavy-snow" />;

    case 5108:
    case 5110:
    case 5112:
    case 5114:
    case 5122:
    case 6000:
    case 6001:
    case 6002:
    case 6003:
    case 6004:
    case 6200:
    case 6201:
    case 6203:
    case 6204:
    case 6205:
    case 6209:
    case 6212:
    case 6213:
    case 6214:
    case 6215:
    case 6222:
    case 7000:
    case 7101:
    case 7102:
      return <Cloud type="snow-drizzle" />;

    case 8000:
      return <Cloud type="thunderstorm" />;

    default:
      return <Cloud />;
  }
};

const uvLevels = [
  {
    level: 0,
    label: "Low",
    message: "Low for the rest of the day.",
  },
  {
    level: 3,
    label: "Moderate",
    message: "Moderate risk. Stay in shade near midday.",
  },
  {
    level: 6,
    label: "High",
    message: "High risk. Limit exposure from 10 a.m. to 4 p.m.",
  },
  {
    level: 8,
    label: "Very High",
    message: "Very high risk. Avoid the sun during peak hours.",
  },
  {
    level: 11,
    label: "Extreme UV",
    message: "Extreme risk. Protect skin and eyes completely.",
  },
];

const getWeatherCategory = (
  code,
  wind = 0,
  time = "",
  sunriseTime = "",
  sunsetTime = ""
) => {
  const timezone = useSelector((state) => state?.main?.timezone || "UTC");

  const hourTime = moment(time).tz(timezone);

  const sunrise = moment(sunriseTime).tz(timezone);
  const sunset = moment(sunsetTime).tz(timezone);

  const isNight = isNightTime(hourTime, sunrise, sunset);

  if (wind >= 7) return "Cloudy";

  if (code === 1000) return isNight ? "Night" : "Sunny";

  if (code === 1001) return isNight ? "NightCloudy" : "Cloudy";

  const heavyRainCodes = [
    4000, 4200, 4201, 4202, 4203, 4204, 4205, 4208, 4209, 4210, 4211, 4212,
    4213, 4214, 4215,
  ];
  if (heavyRainCodes.includes(code)) return "HeavyRain";

  const eveningCodes = [1100, 1101, 1103];
  if (isNight && eveningCodes.includes(code)) return "Evening";

  return "Cloudy";
};

const getUVDescription = (index) =>
  uvLevels.reduce(
    (acc, curr) => (index >= curr.level ? curr : acc),
    uvLevels[0]
  );

const getFeelsLikeDescription = (temp, tempApparent) => {
  if (typeof temp !== "number" || typeof tempApparent !== "number") return "";

  const diff = Math.abs(temp - tempApparent);

  if (diff <= 0.5) return "Similar to the actual temperature.";
  if (tempApparent > temp) return "Humidity is making it feel warmer.";
  if (tempApparent < temp) return "Wind is making it feel cooler.";

  return "";
};

const parseWeatherData = (weather) => {
  const currentDaily = weather?.timelines?.daily[0]?.values || {};
  const currentHourly = weather?.timelines?.hourly[0]?.values || {};
  const currentMinutely = weather?.timelines?.minutely[0]?.values || {};

  const {
    temperatureMin = 0,
    temperatureMax = 0,
    temperatureAvg = 0,
    precipitationProbabilityAvg = 0,
    sunsetTime = new Date(),
    sunriseTime = new Date(),
  } = currentDaily;

  const {
    temperature = 0,
    weatherCode = 0,
    uvHealthConcern = 0,
    windSpeed = 0,
    windGust = 0,
    windDirection = 0,
    humidity = 0,
    dewPoint = 0,
    visibility = 0,
    temperatureApparent = 0,
    pressureSurfaceLevel = 0,
  } = currentHourly;

  const { uvIndex = 0, precipitationProbability = 0 } = currentMinutely;

  const subtitle = getWeatherDescription(weatherCode, windSpeed);
  const condition = getWeatherCategory(
    weatherCode,
    windSpeed,
    weather?.timelines?.daily[0]?.time,
    sunriseTime,
    sunsetTime
  );

  const { label: uvLabel, message: uvHealthMessage } =
    getUVDescription(uvIndex);

  const feelsLikeDescription = getFeelsLikeDescription(
    temperature,
    temperatureApparent
  );

  return {
    condition,
    temperature,
    temperatureMin,
    temperatureMax,
    temperatureAvg,
    subtitle,
    uvIndex,
    uvLabel,
    uvHealthConcern,
    uvHealthMessage,
    windSpeed,
    windGust,
    windDirection,
    humidity,
    dewPoint,
    visibility,
    temperatureApparent,
    feelsLikeDescription,
    precipitationProbability,
    precipitationProbabilityAvg,
    sunsetTime,
    sunriseTime,
    pressureSurfaceLevel,
  };
};

export { formatTime, isNightTime, getWeatherIconByCode, parseWeatherData };
