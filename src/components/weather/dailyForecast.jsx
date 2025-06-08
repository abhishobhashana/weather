import { Calendar } from "../../assets/icons";
import { getWeatherIconByCode } from "../../utils/useWeather";
import moment from "moment-timezone";
import data from "../../data/data.json";

export default function DailyForecast({
  dailyData,
  fill = "",
  bgColor = "",
  textColor = "",
  border = "",
  onClick = () => {},
}) {
  const dailyForecast = dailyData?.timelines?.daily || [];

  const allTemps = dailyForecast.flatMap((day) => [
    day.values?.temperatureMin,
    day.values?.temperatureMax,
  ]);
  const globalMinTemp = Math.min(...allTemps);
  const globalMaxTemp = Math.max(...allTemps);

  const sections = [
    { range: [1, 10], color: "#0a84ff" },
    { range: [11, 20], color: "#8f3f97" },
    { range: [21, 30], color: "#7ecf32" },
    { range: [31, 40], color: "#c8b400" },
    { range: [41, 50], color: "#e08b00" },
    { range: [51, 60], color: "#d4570d" },
  ];

  const findColor = (temp) => {
    for (const { range, color } of sections) {
      if (temp >= range[0] && temp <= range[1]) return color;
    }
    return temp < sections[0].range[0]
      ? sections[0].color
      : sections[sections.length - 1].color;
  };

  const getGradientFromLowHigh = (lowTemp, highTemp) => {
    const lowColor = findColor(lowTemp);
    const highColor = findColor(highTemp);
    return `linear-gradient(to right, ${lowColor} 0%, ${highColor} 100%)`;
  };

  return (
    <div
      className={`w-full h-full flex flex-col cursor-pointer ${bgColor} backdrop-blur-md rounded-xl`}
      onClick={onClick}
    >
      <span
        className={`sticky z-[1] top-0 flex gap-2 items-center px-4 py-3 text-sm ${bgColor} backdrop-blur-md ${textColor} rounded-t-xl`}
      >
        <Calendar fill={fill} />
        {data["06Day_forecast"].toUpperCase()}
      </span>

      <div
        className={`w-full flex flex-col justify-between ${bgColor} rounded-b-xl px-4 py-0`}
      >
        {dailyForecast?.map((day, index) => {
          const date = moment(day.time);
          const isToday = date.isSame(moment(), "day");
          const label = isToday ? "Today" : date.format("ddd");

          const lowTemp = Math.round(day.values?.temperatureMin);
          const highTemp = Math.round(day.values?.temperatureMax);
          const globalRange = globalMaxTemp - globalMinTemp;
          const leftPercent = ((lowTemp - globalMinTemp) / globalRange) * 100;
          const widthPercent = ((highTemp - lowTemp) / globalRange) * 100;
          const gradientBackground = getGradientFromLowHigh(lowTemp, highTemp);

          const icon = getWeatherIconByCode(
            day.values.weatherCodeMax,
            Math.round(day?.values?.windSpeedAvg)
          );

          return (
            <div
              key={index}
              className={`flex justify-between items-center gap-5 py-3 ${border} border-t-[0.5px]`}
            >
              <span className="text-white w-12">{label}</span>
              <span className="w-8 mx-2">{icon}</span>

              <span className={`${textColor} w-fit text-right`}>
                {lowTemp}°
              </span>

              <div className="relative flex-grow h-1 mx-2 rounded overflow-hidden bg-[#29324b]">
                <div
                  style={{
                    width: `${widthPercent}%`,
                    left: `${leftPercent}%`,
                    position: "absolute",
                    height: "100%",
                    borderRadius: "9999px",
                    background: gradientBackground,
                  }}
                />
              </div>

              <span className="text-white w-fit text-right">{highTemp}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
