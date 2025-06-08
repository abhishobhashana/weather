import { Chart } from "../../assets/icons";
import data from "../../data/data.json";

export default function averages({
  bgColor,
  textColor,
  value,
  high,
  low,
  fill,
  degree,
  onClick = () => {},
}) {
  return (
    <div
      className={`w-full h-full flex flex-col text-white cursor-pointer backdrop-blur-md rounded-xl`}
      onClick={onClick}
    >
      <span
        className={`sticky top-0 flex gap-2 items-center px-4 py-3 text-sm ${bgColor} backdrop-blur-md ${textColor}  rounded-t-xl`}
      >
        <Chart fill={fill} />
        {data.averages.toUpperCase()}
      </span>

      <div
        className={`w-full h-full flex flex-col justify-between ${bgColor} rounded-b-xl p-4 pt-0`}
      >
        <span className="text-3xl">
          {value}
          {degree}
        </span>

        <div className="flex items-center justify-between">
          <div className={`flex flex-col ${textColor}`}>
            <span>Today</span>
            <span>Average</span>
          </div>
          <div className="flex flex-col items-center justify-between">
            <span>{`H:${high}${degree}`}</span>
            <span>{`L:${low}${degree}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
