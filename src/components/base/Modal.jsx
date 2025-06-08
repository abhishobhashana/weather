import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../../store/main";
import {
  AirQualityIcon,
  Arrow,
  Chart,
  Check,
  CloseCircle,
  Conditions,
  Dot,
  Drop,
  Eye,
  Gauge,
  Humidity,
  Sun,
  Sunset,
  WindIcon,
} from "../../assets/icons";
import { useResolution } from "../../utils/useResolution";
import moment from "moment-timezone";
import data from "../../data/data.json";

const Modal = ({ weatherData = {} }) => {
  const isModalOpen = useSelector((state) => state.main.isModalOpen);
  const modalValue = useSelector((state) => state.main.modalValue || 0);

  const lgModalRef = useRef(null);
  const smModalRef = useRef(null);

  const mapTypes = [
    {
      id: 0,
      name: data.temp,
      subName: data.feels_like,
      icon: <Conditions width="20" />,
    },
    {
      id: 1,
      name: data.uv_index,
      icon: <Sun width="18" fill="#FFF" />,
    },
    {
      id: 2,
      name: data.wind,
      icon: <WindIcon width="18" fill="#FFF" />,
    },
    {
      id: 3,
      name: data.precipitation,
      icon: <Drop fill="#FFF" />,
    },
    {
      id: 4,
      name: data.humidity,
      icon: <Humidity width="18" fill="#FFF" />,
    },
    {
      id: 5,
      name: data.visibility,
      icon: <Eye width="18" fill="#FFF" />,
    },
    {
      id: 6,
      name: data.air_quality,
      icon: <AirQualityIcon width="15" fill="#FFF" />,
    },
    {
      id: 7,
      name: data.sunset,
      icon: <Sunset width="18" fill="white" />,
    },
    {
      id: 8,
      name: data.averages,
      icon: <Chart fill="#FFF" />,
    },
    {
      id: 9,
      name: data.pressure,
      icon: <Gauge width="18" fill="#FFF" />,
    },
  ];

  const [mapTypeLayer, setMapTypeLayer] = useState(mapTypes[modalValue]);

  const getDetailsData = () => {
    switch (mapTypeLayer?.id) {
      case 0:
        return {
          header: "Conditions",
          title: data.feels_like_temp,
          desc: data.feels_like_desc,
          icon: <Conditions width="20" />,
          insight: {
            title: Math.round(weatherData?.temperature),
            subTitle: `H:${Math.round(
              weatherData?.temperatureMax
            )} L:${Math.round(weatherData?.temperatureMin)}`,
            icon: <Conditions />,
          },
        };
      case 1:
        return {
          header: data.uv_index,
          title: data.uv_index,
          desc: data.uv_index_desc,
          icon: <Sun height="16" width="16" fill="#FFF" />,
          insight: {
            title: weatherData?.uvIndex,
            subTitle: "World Health Organization UVI",
          },
        };
      case 2:
        return {
          header: data.wind,
          title: data.wind_speed_gusts,
          desc: data.wind_desc,
          icon: <WindIcon height="18" width="18" fill="#FFF" />,
          insight: {
            title: `${Math.round(weatherData?.windSpeed)} m/s`,
            subTitle: `Gusts: ${Math.round(weatherData?.windGust)} m/s`,
          },
        };
      case 3:
        return {
          header: data.precipitation,
          title: data.precipitation_intensity,
          desc: data.precipitation_desc,
          icon: <Drop fill="#FFF" />,
          insight: {
            title: `${weatherData?.precipitationProbability} mm`,
            subTitle: "Total for the day",
          },
        };
      case 4:
        return {
          header: data.humidity,
          title: data.relative_humidity,
          desc: data.humidity_desc,
          icon: <Humidity height="16" width="16" fill="#FFF" />,
          insight: {
            title: `${weatherData?.humidity}%`,
            subTitle: `Dew point: ${Math.round(weatherData?.dewPoint)}`,
          },
        };
      case 5:
        return {
          header: data.visibility,
          title: data.visibility,
          desc: data.visibility_desc,
          icon: <Eye height="18" width="18" fill="#FFF" />,
          insight: {
            title: `${Math.round(weatherData?.visibility)} km`,
            subTitle:
              weatherData?.visibility > 20
                ? "Perfectly clear view"
                : "Clear view",
          },
        };
      case 7:
        return {
          header: data.sunset,
          title: data.sunset,
          desc: data.visibility_desc,
          icon: <Sunset height="18" width="18" fill="white" />,
          insight: {
            title: moment(weatherData?.sunsetTime).format("LT"),
            subTitle: `Sunrise tomorrow: ${moment(
              weatherData?.sunriseTime
            ).format("LT")}`,
          },
        };
      case 8:
        return {
          header: data.averages,
          title: data.averages,
          desc: data.avg_temp_desc,
          icon: <Chart fill="#FFF" />,
          insight: {
            title: Math.round(weatherData?.temperatureAvg),
            subTitle: `Average high: ${Math.round(
              weatherData?.temperatureMax
            )}`,
          },
        };
      case 9:
        return {
          header: data.pressure,
          title: data.pressure,
          desc: data.pressure_desc,
          icon: <Gauge fill="#FFF" />,
          insight: {
            title: `${Math.round(weatherData?.pressureSurfaceLevel)} hPa`,
            subTitle: "Today",
          },
        };
      default:
        break;
    }
  };

  const { header, title, desc, icon, insight } = getDetailsData();

  const dispatch = useDispatch();

  const screenWidth = useResolution();
  const isLargeScreen = screenWidth >= 768;

  const handleClose = () => {
    dispatch(setModalOpen(false));
    setMapTypeLayer(mapTypes[modalValue]);
  };

  useEffect(() => {
    setMapTypeLayer(mapTypes[modalValue]);
  }, [modalValue]);

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={isLargeScreen ? lgModalRef : smModalRef}
        className="relative z-30"
        onClose={handleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 backdrop-blur-md bg-default/50"
            aria-hidden="true"
          />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-300"
          enterFrom="translate-y-full opacity-75"
          enterTo="translate-y-0 opacity-100"
          leave="transform transition ease-in-out duration-300"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-full opacity-75"
        >
          <div
            className={`fixed inset-0 flex ${
              isLargeScreen ? "items-center justify-center p-4" : "items-end"
            }`}
          >
            <Dialog.Panel className="w-full max-w-md flex flex-col transform overflow-hidden lg:rounded-xl md:rounded-xl sm:rounded-t-xl shadow-xl transition-all sm:min-h-[96dvh] md:min-h-[60dvh] lg:min-h-[90vh] max-h-[96dvh] lg:max-h-[90vh] bg-light-white dark:bg-dark-bg align-middle">
              <div className="z-20 w-full absolute top-0 flex items-center justify-between px-4 py-3 bg-dark-bg/80 backdrop-blur-md text-white border-b border-dark-seperator">
                <span className="pl-6"></span>
                <span className="flex items-center gap-2 text-lg lg:text-base font-semibold">
                  {icon}
                  {header}
                </span>
                <span
                  ref={isLargeScreen ? lgModalRef : smModalRef}
                  className="w-fit cursor-pointer active:opacity-60"
                  onClick={handleClose}
                >
                  <CloseCircle popup />
                </span>
              </div>

              <div className="z-10 flex flex-col items-center h-full pt-12">
                <div className="w-full flex items-center justify-between p-4 border-t border-dark-seperator">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl text-white">
                        {insight.title}
                      </span>
                      {insight.icon && insight.icon}
                    </div>
                    <span className="text-base text-light-grey-third">
                      {insight.subTitle}
                    </span>
                  </div>

                  <Listbox
                    as="div"
                    by="id"
                    value={mapTypeLayer}
                    onChange={setMapTypeLayer}
                  >
                    {({ open }) => (
                      <div className="relative mt-1.5">
                        <Listbox.Button className="relative w-fit cursor-pointer focus:outline-none flex items-center gap-2 rounded-full px-2 py-1.5 bg-light-grey">
                          {icon}
                          <Arrow />
                        </Listbox.Button>
                        <Transition
                          show={open}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-50"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-200"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-50"
                        >
                          <Listbox.Options className="absolute mt-2 right-[-0.5rem] overflow-auto rounded-xl bg-light-white dark:bg-light-grey-forth/80 backdrop-blur-md text-base shadow-lg focus:outline-none">
                            {mapTypes.map((items) => (
                              <Listbox.Option
                                key={items.id}
                                value={items}
                                className={({ selected }) =>
                                  `relative cursor-pointer select-none pl-8 pr-24 py-2.5 border-b border-seperator/10 dark:border-dark-seperator last:border-b-0`
                                }
                              >
                                {({ selected }) => (
                                  <>
                                    {items.subName ? (
                                      <div className="flex flex-col">
                                        <span className="block truncate text-base text-secondary dark:text-white leading-5">
                                          Conditions
                                        </span>
                                        <div className="truncate flex items-center gap-2 text-sm text-secondary dark:text-light-grey-third leading-5">
                                          {items.name}
                                          <Dot /> {items.subName}
                                        </div>
                                      </div>
                                    ) : (
                                      <span className="block truncate text-base text-secondary dark:text-white">
                                        {items.name}
                                      </span>
                                    )}
                                    {selected && (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <Check aria-hidden="true" />
                                      </span>
                                    )}
                                    <span className="absolute inset-y-0 right-4 flex items-center text-amber-600">
                                      {items.icon}
                                    </span>
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    )}
                  </Listbox>
                </div>

                <div className="w-full flex flex-col gap-2 p-4 text-white">
                  <span className="text-lg font-semibold">
                    {data.about} {title}
                  </span>
                  <span className="px-3 py-2 text-base bg-light-grey-forth rounded-lg leading-5">
                    {desc}
                  </span>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
