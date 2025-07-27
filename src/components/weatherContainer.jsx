import { useDispatch, useSelector } from "react-redux";
import {
  CircularGauge,
  Footer,
  Header,
  Loader,
  Modal,
  SearchList,
} from "./base";
import {
  Averages,
  DailyForecast,
  HourlyForecast,
  MainTitle,
  Precipitation,
  Widget,
  Wind,
} from "./weather";
import {
  Drop,
  Eye,
  Gauge,
  Humidity,
  Plus,
  Sun,
  Sunset,
  Thermometer,
} from "../assets/icons";
import {
  setAddBtn,
  setModalOpen,
  setModalValue,
  setSideMenuOpen,
  setWeatherListByLocations,
} from "../store/main";
import { useSelectedItembyClick } from "../utils/useSelectedItemByClick";
import { useWidgetContainerHeight } from "../utils/useWidgetContainerHeight";
import { useBackground, useResolution } from "../utils/useResolution";
import moment from "moment-timezone";
import data from "../data/data.json";
import { useEffect, useState } from "react";
import { fetchWeatherFailure } from "../store/weather";

export default function WeatherContainer({
  weather = {},
  weatherData = {},
  isMenuOpen = false,
  icon = "",
  inputCloseIconBg = "",
  bg = "",
  inputBg = "",
  placeholder = "",
  showAddBtn = false,
  searchValue = "",
  searchResultValue = "",
  isSearchPanelOpen = false,
  loading = false,
  text = "",
  directionIcon = "",
  border = "",
  location = "",
  timezone = "",
}) {
  const addLocationData = useSelector(
    (state) => state?.weather?.addLocationData
  );
  const dispatch = useDispatch();

  const screenWidth = useResolution();
  const widgetContainerHeight = useWidgetContainerHeight();
  const getBackground = useBackground(weatherData?.condition);

  const isTabScreen = screenWidth >= 768 && screenWidth < 1024;

  const onWidgetClick = (id) => {
    dispatch(setModalOpen(true));
    dispatch(setModalValue(id));
  };

  useEffect(() => {
    dispatch(fetchWeatherFailure());
    dispatch(setAddBtn(false));
  }, []);

  const [addBtnText, setAddBtnText] = useState("Add");

  return (
    <>
      <div
        className={
          isMenuOpen
            ? "xl:col-span-4 md:col-span-3 md:col-start-3 xl:grid md:grid sm:hidden relative bg-cover"
            : "col-span-1 relative bg-cover"
        }
        style={{ backgroundImage: `url(${getBackground})` }}
      >
        <Header
          className={isMenuOpen ? "w-[80%]" : "w-full"}
          isMenuOpen={isMenuOpen}
          fill={icon}
          crossFill={inputCloseIconBg}
          bgColor={bg}
          textColor={text}
          inputBg={inputBg}
          placeholder={placeholder}
          showAddBtn={showAddBtn}
          condition={weatherData?.condition}
        />

        {searchValue?.length > 0 && isSearchPanelOpen && isTabScreen ? (
          <SearchList
            className="px-5 py-5"
            inputBg={inputBg}
            value={searchValue}
            result={searchResultValue}
            loading={loading}
            onClick={(place) => useSelectedItembyClick(place, dispatch)}
          />
        ) : loading ? (
          <div className="flex items-center justify-center h-screen w-full">
            <Loader className="!p-3 !w-8 !h-8" />
          </div>
        ) : weather && Object.keys(weather).length > 0 ? (
          <>
            {showAddBtn ? (
              <div className="z-20 w-full lg:hidden md:flex sm:flex items-center justify-between px-4 py-2">
                <span
                  className="pl-2 text-white"
                  onClick={() => {
                    dispatch(setSideMenuOpen(true));
                    dispatch(setAddBtn(false));
                  }}
                >
                  {data?.cancel}
                </span>

                <span
                  className="text-white"
                  onClick={() => {
                    dispatch(setWeatherListByLocations(addLocationData));
                    setAddBtnText("Added");
                    setTimeout(() => {
                      dispatch(setAddBtn(false));
                      setAddBtnText("Add");
                    }, 400);
                  }}
                >
                  {addBtnText}
                </span>
              </div>
            ) : null}

            <div
              className={`z-10 w-full flex flex-col gap-5 xl:p-24 md:p-12 sm:p-6 sm:pt-10 sm:pb-0 pb-0 items-center justify-center ${
                isMenuOpen ? "sm:hidden xl:flex md:flex" : ""
              }`}
            >
              <MainTitle
                textColor={text}
                location={location?.name}
                temp={Math.round(weatherData?.temperature)}
                desc={weatherData?.subtitle}
                high={Math.round(weatherData?.temperatureMax)}
                low={Math.round(weatherData?.temperatureMin)}
                degree="°"
              />

              <div
                className="w-full overflow-auto hide-scroll"
                style={{ height: widgetContainerHeight }}
              >
                <div className="w-full h-full grid xl:gap-4 md:gap-4 sm:gap-2.5 text-white">
                  {/* Hourly Forecast */}
                  <div
                    className={`relative ${
                      isMenuOpen
                        ? "xl:col-span-8 xl:row-start-1 md:col-span-2 md:row-start-1"
                        : "xl:col-start-1 md:col-start-1 sm:col-start-1 row-start-1 xl:col-span-4 md:col-span-4 sm:col-span-2 row-span-1"
                    }`}
                  >
                    <HourlyForecast
                      hourlyData={weather}
                      timezone={timezone}
                      bgColor={bg}
                      textColor={text}
                      border={border}
                      fill={icon}
                      sunriseTime={moment(weatherData?.sunriseTime)}
                      sunsetTime={moment(weatherData?.sunsetTime)}
                      onClick={() => onWidgetClick(0)}
                    />
                  </div>

                  {/* Precipitation */}
                  <div
                    className={`relative ${
                      isMenuOpen
                        ? "xl:col-span-4 xl:row-start-2 xl:col-start-5 md:col-span-2 md:row-start-3"
                        : "xl:col-start-5 md:col-start-3 sm:col-span-2 sm:row-start-3 xl:row-start-1 md:row-start-2 xl:row-end-3 md:row-end-5 col-span-2 xl:row-span-2 md:row-span-4"
                    }`}
                  >
                    <Precipitation
                      bgColor={bg}
                      textColor={text}
                      fill={icon}
                      location={location}
                      weatherData={weatherData}
                      temp={Math.round(weatherData?.temperature)}
                    />
                  </div>

                  {/* Daily Forecast */}
                  <div
                    className={`relative ${
                      isMenuOpen
                        ? "xl:col-span-4 xl:row-span-2 xl:row-start-2 md:col-span-2 md:row-start-2"
                        : "xl:col-start-1 md:col-start-1 sm:col-span-2 sm:row-start-2 xl:row-start-2 md:row-start-2 md:row-end-6 xl:col-span-2 md:col-span-2 xl:row-span-3 md:row-span-4"
                    }`}
                  >
                    <DailyForecast
                      dailyData={weather}
                      bgColor={bg}
                      textColor={text}
                      border={border}
                      fill={icon}
                      onClick={() => onWidgetClick(0)}
                    />
                  </div>

                  {/* Wind */}
                  <div
                    className={`relative ${
                      isMenuOpen
                        ? "xl:col-span-4 xl:row-span-1 xl:row-start-3 md:col-span-2 md:row-start-4"
                        : "xl:col-start-3 md:col-start-3 xl:row-start-2 md:row-start-5 col-span-2 row-span-1 sm:col-span-2 sm:row-start-4"
                    }`}
                  >
                    <Wind
                      bgColor={bg}
                      textColor={text}
                      border={border}
                      fill={icon}
                      directionIcon={directionIcon}
                      direction={weatherData?.windDirection}
                      speed={Math.round(weatherData?.windSpeed)}
                      gusts={Math.round(weatherData?.windGust)}
                      onClick={() => onWidgetClick(2)}
                    />
                  </div>

                  {/* Sunrise Widget */}
                  <div
                    className={`relative ${
                      isMenuOpen
                        ? "xl:col-span-2 xl:row-start-4 xl:col-start-1 md:col-start-1 md:row-start-5"
                        : "xl:col-start-3 md:col-start-1 xl:row-start-3 col-span-1 row-span-1"
                    }`}
                  >
                    <Widget
                      bgColor={bg}
                      textColor={text}
                      icon={<Sunset fill={icon} />}
                      header={data.sunset}
                      value={moment(weatherData?.sunsetTime).format("LT")}
                      description={`Sunrise: ${moment(
                        weatherData?.sunriseTime
                      ).format("LT")}`}
                      onClick={() => onWidgetClick(7)}
                    />
                  </div>

                  {/* Precipitation Widget */}
                  <div
                    className={`relative ${
                      isMenuOpen
                        ? "xl:col-span-2 xl:row-start-4 xl:col-start-3 md:col-start-2 md:row-start-5"
                        : "xl:col-start-4 xl:row-start-3 col-span-1 row-span-1"
                    }`}
                  >
                    <Widget
                      bgColor={bg}
                      textColor={text}
                      icon={<Drop fill={icon} />}
                      header={data.precipitation}
                      value={`${weatherData?.precipitationProbability} mm`}
                      subValue="in last 24h"
                      description={`${Math.round(
                        weatherData?.precipitationProbabilityAvg
                      )} expected in next 24h.`}
                      onClick={() => onWidgetClick(3)}
                    />
                  </div>

                  {/* Feels Like Widget */}
                  <div
                    className={`relative ${
                      isMenuOpen
                        ? "xl:col-span-2 xl:row-start-4 xl:col-start-5"
                        : "xl:col-start-5 xl:row-start-3 col-span-1 row-span-1"
                    } `}
                  >
                    <Widget
                      bgColor={bg}
                      textColor={text}
                      icon={<Thermometer fill={icon} />}
                      header={data.feels_like}
                      value={Math.round(weatherData?.temperatureApparent)}
                      degree="°"
                      subValue={`Actual: ${Math.round(
                        weatherData?.temperature
                      )}°`}
                      description={weatherData?.feelsLikeDescription}
                      onClick={() => onWidgetClick(0)}
                    />
                  </div>

                  {/* UV Index Widget */}
                  <div
                    className={`relative ${
                      isMenuOpen
                        ? "xl:col-span-2 xl:row-start-4 xl:col-start-7"
                        : "xl:col-start-6 xl:row-start-3 col-span-1 row-span-1"
                    } `}
                  >
                    <Widget
                      bgColor={bg}
                      textColor={text}
                      icon={<Sun fill={icon} />}
                      header={data.uv_index}
                      value={weatherData?.uvIndex}
                      subValue={weatherData?.uvLabel}
                      description={weatherData?.uvHealthMessage}
                      onClick={() => onWidgetClick(1)}
                    >
                      <div className="z-0 relative text-xl py-2 pointer-events-none">
                        {/* <div className="relative"> */}
                        <div className="h-1 w-full rounded bg-gradient-to-r from-[#00e400] to-[#8f3f97]"></div>

                        <span
                          className={`absolute left-0 top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 bg-white border-2 ${border} rounded-full cursor-pointer`}
                          style={{
                            left: `${
                              (weatherData?.uvIndex / 11) * 100 >= 100
                                ? "100"
                                : (weatherData?.uvIndex / 11) * 100
                            }%`,
                          }}
                        ></span>
                      </div>
                      {/* </div> */}
                    </Widget>
                  </div>

                  {/* Humidity Widget */}
                  <div
                    className={`relative ${
                      isMenuOpen
                        ? "xl:col-span-2 xl:row-start-5 xl:col-start-1"
                        : "xl:col-start-3 xl:row-start-4 col-span-1 row-span-1"
                    } `}
                  >
                    <Widget
                      bgColor={bg}
                      textColor={text}
                      icon={<Humidity fill={icon} border={bg} />}
                      header={data.humidity}
                      value={`${weatherData?.humidity}%`}
                      description={`The dew point is ${Math.round(
                        weatherData?.dewPoint
                      )} right now.`}
                      onClick={() => onWidgetClick(4)}
                    />
                  </div>

                  {/* Visibility Widget */}
                  <div
                    className={`relative ${
                      isMenuOpen
                        ? "xl:col-span-2 xl:row-start-5 xl:col-start-3"
                        : "xl:col-start-4 xl:row-start-4 col-span-1 row-span-1"
                    } `}
                  >
                    <Widget
                      bgColor={bg}
                      textColor={text}
                      icon={<Eye fill={icon} />}
                      header={data.visibility}
                      value={`${Math.round(weatherData?.visibility)} km`}
                      description={
                        weatherData?.visibility > 20
                          ? "Perfectly clear view."
                          : "Clear view."
                      }
                      onClick={() => onWidgetClick(5)}
                    />
                  </div>

                  {/* Pressure Widgets */}
                  <div
                    className={`relative ${
                      isMenuOpen
                        ? "xl:col-span-2 xl:row-start-5 xl:col-start-5"
                        : "xl:col-start-5 xl:row-start-4 col-span-1 row-span-1"
                    } `}
                  >
                    <Widget
                      bgColor={bg}
                      textColor={text}
                      icon={<Gauge fill={icon} />}
                      header={data.pressure}
                      contentClassName="items-center"
                      onClick={() => onWidgetClick(9)}
                    >
                      <CircularGauge
                        size={150}
                        strokeWidth={20}
                        ticks={50}
                        tickLength={8}
                        tickColor={icon}
                        value={
                          Math.round(weatherData?.pressureSurfaceLevel) < 950
                            ? 950
                            : Math.round(weatherData?.pressureSurfaceLevel) >
                              1050
                            ? 1050
                            : Math.round(weatherData?.pressureSurfaceLevel)
                        }
                        dotWidth={4}
                        dotHeight={20}
                        dotColor="#fff"
                        dotRadius={4}
                      />
                    </Widget>
                  </div>

                  {/* Averages Widgets */}
                  <div
                    className={`relative ${
                      isMenuOpen
                        ? "xl:col-span-2 xl:row-start-5 xl:col-start-7"
                        : "xl:col-start-6 xl:row-start-4 col-span-1 row-span-1"
                    } `}
                  >
                    <Averages
                      fill={icon}
                      bgColor={bg}
                      textColor={text}
                      value={Math.round(weatherData?.temperatureAvg)}
                      high={Math.round(weatherData?.temperatureMax)}
                      low={Math.round(weatherData?.temperatureMin)}
                      degree="°"
                      onClick={() => onWidgetClick(8)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Modal weatherData={weatherData} />
          </>
        ) : (
          <span className="h-full w-full flex items-center justify-center text-center font-semibold text-4xl text-white p-4">
            {data.noLocation}
          </span>
        )}

        <Footer isMenuOpen={isMenuOpen} bgColor={bg} border={border} />
      </div>
    </>
  );
}
