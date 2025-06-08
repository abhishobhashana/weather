import { Maps } from "../map";
import { Umbrella } from "../../assets/icons";
import data from "../../data/data.json";

export default function precipitation({
  fill = "",
  bgColor = "",
  textColor = "",
  location = {},
  weatherData = {},
  temp = 0,
}) {
  return (
    <div className="w-full h-full flex flex-col text-light-blue-text">
      <span
        className={`sticky top-0 flex gap-2 items-center px-4 py-3 text-sm ${bgColor} backdrop-blur-md ${textColor} rounded-t-xl z-10`}
      >
        <Umbrella fill={fill} />
        {data.precipitation.toUpperCase()}
      </span>
      <div
        className={`w-full h-full flex flex-col ${bgColor} text-white rounded-b-xl gap-2.5 p-4 pt-0`}
      >
        <Maps
          location={location}
          weatherData={weatherData}
          temp={temp}
          bgColor={bgColor}
        />
      </div>
    </div>
  );
}
