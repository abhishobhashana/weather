import { Clock, Sunrise, Sunset } from "../../assets/icons";
import {
  formatTime,
  getWeatherIconByCode,
  isNightTime,
} from "../../utils/useWeather";
import moment from "moment-timezone";
import data from "../../data/data.json";

export default function HourlyForecast({
  hourlyData,
  timezone = "UTC",
  bgColor = "",
  textColor = "",
  fill = "",
  onClick = () => {},
}) {
  const now = moment()?.tz(timezone)?.startOf("hour");
  const end = moment(now)?.tz(timezone)?.add(25, "hours");

  const filteredHourlyData = hourlyData?.timelines?.hourly?.filter((hour) => {
    const hourTime = moment(hour.time).tz(timezone);
    return hourTime.isSameOrAfter(now) && hourTime.isBefore(end);
  });

  return (
    <div
      className={`xl:max-w-4xl md:min-w-full sm:max-w-sm w-full h-full flex flex-col cursor-pointer backdrop-blur-md rounded-xl`}
      onClick={onClick}
    >
      <span
        className={`sticky top-0 flex items-center gap-2 px-4 py-3 text-sm ${bgColor} backdrop-blur-md ${textColor} rounded-t-xl`}
      >
        <Clock fill={fill} />
        {data.hourly_forecast.toUpperCase()}
      </span>

      <div
        className={`w-full h-full overflow-x-scroll ${bgColor} rounded-b-xl p-4 pt-0 focus:outline-none`}
      >
        <div className="w-full h-full flex items-center justify-between gap-7">
          {filteredHourlyData?.map((hour, index) => {
            const hourTime = moment(hour.time).tz(timezone);
            const isNow = hourTime.isSame(now, "hour");

            const matchedDaily = hourlyData?.timelines?.daily?.find((day) =>
              moment(day.time).isSame(hourTime, "day")
            );

            const sunrise = moment(matchedDaily?.values?.sunriseTime).tz(
              timezone
            );
            const sunset = moment(matchedDaily?.values?.sunsetTime).tz(
              timezone
            );

            const isExactSunrise =
              hourTime.isSame(sunrise, "hour") && hourTime.isSameOrAfter(now);
            const isExactSunset =
              hourTime.isSame(sunset, "hour") && hourTime.isSameOrAfter(now);

            const isNight = isNightTime(hourTime, sunrise, sunset);

            let label = isNow ? "Now" : formatTime(hour.time, timezone);

            let valueLabel = `${Math.round(hour?.values?.temperature)}°`;

            let icon = getWeatherIconByCode(
              hour?.values?.weatherCode,
              Math.round(hour?.values?.windSpeed),
              isNight
            );

            if (isExactSunrise) {
              valueLabel = "Sunrise";
              icon = <Sunrise width="24" />;
            } else if (isExactSunset) {
              valueLabel = "Sunset";
              icon = <Sunset width="24" />;
            }

            return (
              <div
                key={index}
                className="w-full h-full flex flex-col items-center justify-between gap-4 last:pr-4"
              >
                <span className="text-xs">{label}</span>
                <div>{icon}</div>
                <span className="text-base">{valueLabel}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
