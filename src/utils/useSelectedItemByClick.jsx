import {
  setAddBtn,
  setLocation,
  setSearchPanelOpen,
  setTimezone,
} from "../store/main";
import { fetchWeather } from "../store/weather";
import { getTimezonesByCountry } from "./useWeather";

export const useSelectedItembyClick = (place, dispatch) => {
  const details = {
    name: place?.name,
    country: place?.address?.country,
    country_code: place?.address?.country_code.toUpperCase(),
    address: place?.display_name,
    lat: place?.lat,
    lng: place?.lon,
  };

  const getTimezone = getTimezonesByCountry(details?.country_code);
  const timezone = getTimezone?.[0] || "UTC";

  dispatch(setAddBtn(true));
  dispatch(setSearchPanelOpen(false));
  dispatch(setLocation(details));
  dispatch(setTimezone(timezone));
  dispatch(fetchWeather(`${details?.lat},${details?.lng}`, details));
};
