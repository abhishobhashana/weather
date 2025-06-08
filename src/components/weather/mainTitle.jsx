export default function MainTitle({
  textColor = "",
  location = "",
  temp = "",
  desc = "",
  high = "",
  low = "",
  degree = "",
}) {
  return (
    <div className="flex flex-col text-white items-center">
      <span className="text-3xl">{location}</span>
      <span className="font-extralight text-7xl">
        {temp}
        {degree}
      </span>
      <span className={textColor}>{desc}</span>
      <span>
        H:{high}
        {degree} L:{low}
        {degree}
      </span>
    </div>
  );
}
