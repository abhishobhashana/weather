import { motion } from "framer-motion";
import { SideMenu } from "../components/base";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../utils/useResolution";
import { parseWeatherData } from "../utils/useWeather";
import WeatherContainer from "../components/weatherContainer";
import { useEffect } from "react";
import { setActiveWeather, setLocation } from "../store/main";
import { fetchWeather } from "../store/weather";

const Home = () => {
  const isMenuOpen = useSelector((state) => state.main.isSideMenuOpen);
  const searchValue = useSelector((state) => state.main.searchValue);
  const isSearchPanelOpen = useSelector(
    (state) => state.main.isSearchPanelOpen
  );
  const searchResultValue = useSelector(
    (state) => state.main.searchResultValue
  );
  const timezone = useSelector((state) => state?.main?.timezone);
  const showAddBtn = useSelector((state) => state?.main?.showAddBtn);
  const location = useSelector((state) => state?.main?.location);
  const loading = useSelector((state) => state?.weather?.loading);
  const weather = useSelector((state) => state?.weather?.data);
  const weatherData = parseWeatherData(weather);
  const weatherListByLocations = useSelector(
    (state) => state?.main?.weatherListByLocations
  );
  const dispatch = useDispatch();
  const {
    menu,
    bg,
    text,
    icon,
    directionIcon,
    border,
    inputBg,
    inputCloseIconBg,
    placeholder,
  } = getColors(weatherData?.condition);

  useEffect(() => {
    if (weatherListByLocations?.length) {
      const item = weatherListByLocations[weatherListByLocations.length - 1];
      dispatch(setActiveWeather(weatherListByLocations.length));
      dispatch(fetchWeather(`${item?.lat},${item?.lng}`, undefined, item));
      dispatch(setLocation(item));
    }
  }, []);

  return (
    <div
      className={`grid ${
        isMenuOpen ? "grid-cols-5" : "grid-cols-1"
      } h-screen w-full overflow-hidden ${menu}`}
    >
      {isMenuOpen && (
        <motion.div
          className="sm:col-span-5 md:col-span-2 xl:col-span-1"
          initial={{ x: "-10%" }}
          animate={{ x: isMenuOpen ? "0%" : "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <SideMenu
            fill={icon}
            bgColor={menu}
            input={bg}
            inputBg={inputBg}
            crossFill={inputCloseIconBg}
            placeholder={placeholder}
            loading={loading}
            listData={weatherListByLocations}
          />
        </motion.div>
      )}

      <WeatherContainer
        loading={loading}
        weather={weather}
        location={location}
        weatherData={weatherData}
        isMenuOpen={isMenuOpen}
        icon={icon}
        inputCloseIconBg={inputCloseIconBg}
        bg={bg}
        inputBg={inputBg}
        placeholder={placeholder}
        text={text}
        fill={icon}
        directionIcon={directionIcon}
        border={border}
        showAddBtn={showAddBtn}
        searchValue={searchValue}
        searchResultValue={searchResultValue}
        isSearchPanelOpen={isSearchPanelOpen}
        timezone={timezone}
      />
    </div>
  );
};

export default Home;
