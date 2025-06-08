import { Compass, DirectionArrow, WindIcon } from "../../assets/icons";
import data from "../../data/data.json";

export default function Wind({
  fill = "",
  bgColor = "",
  textColor = "",
  border = "",
  directionIcon = "",
  direction = "",
  speed = "",
  gusts = "",
  onClick = () => {},
}) {
  return (
    <div
      className={`w-full h-full flex flex-col cursor-pointer backdrop-blur-md rounded-xl`}
      onClick={onClick}
    >
      <span
        className={`sticky top-0 z-[1] flex gap-2 items-center px-4 py-3 text-sm ${bgColor} backdrop-blur-md ${textColor} rounded-t-xl`}
      >
        <WindIcon fill={fill} />
        {data.wind.toUpperCase()}
      </span>

      <div
        className={`w-full h-full z-0 flex items-center justify-center ${bgColor} ${textColor} rounded-b-xl gap-6 p-4 pt-0`}
      >
        <div className="w-full flex flex-col rounded-b-xl pt-0">
          <div
            className={`flex justify-between border-b-[0.5px] ${border} py-2`}
          >
            <span className="text-white">{data.wind}</span>
            <span>{speed} m/s</span>
          </div>
          <div
            className={`flex justify-between border-b-[0.5px] ${border} py-2`}
          >
            <span className="text-white">{data.gusts}</span>
            <span>{gusts} m/s</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-white">{data.direction}</span>
            <span>{direction}</span>
          </div>
        </div>

        <div className="w-fit">
          <div className="relative w-full">
            <Compass />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pt-1 pl-1">
              <DirectionArrow fill={directionIcon} rotate={Number(direction)} />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex flex-col items-center gap-1 text-white">
                <span className="text-base leading-none">{speed}</span>
                <span className="font-light text-sm leading-none">m/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
