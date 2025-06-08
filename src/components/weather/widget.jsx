export default function widget({
  bgColor,
  textColor,
  icon,
  header,
  value,
  subValue,
  degree,
  description,
  children,
  contentClassName,
  onClick = () => {},
}) {
  return (
    <div
      className={`w-full h-full flex flex-col text-white cursor-pointer backdrop-blur-md rounded-xl`}
      onClick={onClick}
    >
      <span
        className={`sticky z-10 top-0 flex gap-2 items-center px-4 py-3 text-sm ${bgColor} backdrop-blur-md ${textColor}  rounded-t-xl`}
      >
        {icon}
        {header.toUpperCase()}
      </span>

      <div
        className={`${
          contentClassName ? contentClassName : ""
        } w-full h-full flex flex-col justify-between ${bgColor} rounded-b-xl p-4 pt-0`}
      >
        <div className="flex">
          <span className="text-3xl">
            {value}
            {degree}
          </span>
        </div>
        <span>{subValue}</span>
        {children ? children : null}
        {description ? (
          <span className="text-sm leading-none">{description}</span>
        ) : null}
      </div>
    </div>
  );
}
