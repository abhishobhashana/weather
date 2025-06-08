import { createSlice } from "@reduxjs/toolkit";
import { getWeatherDescription } from "../utils/useWeather";
import { updateLocation } from "./main";

const WEATHER_API_KEY = "xT0d6ID8TaCB1T1HB8EZg8Pn1eLH24Rk";
// const WEATHER_API_KEY = "FUibTfBTbC0dDUi2yMYCyJfpuXPXFmlz";

const initialState = {
  loading: false,
  data: null,
  addLocationData: null,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    fetchWeatherStart: (state) => {
      state.loading = true;
    },
    fetchWeatherSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    setAddLocationData: (state, action) => {
      state.loading = false;
      state.addLocationData = action.payload;
    },
    fetchWeatherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const { actions, reducer } = weatherSlice;

export const {
  fetchWeatherStart,
  fetchWeatherSuccess,
  setAddLocationData,
  fetchWeatherFailure,
} = actions;

export const fetchWeather =
  (location, locationDetails, item) => async (dispatch) => {
    dispatch(fetchWeatherStart());
    try {
      const response = await fetch(
        `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=${WEATHER_API_KEY}`
      );

      if (response.ok) {
        const result = await response.json();

        const dailyData = result?.timelines?.daily[0];
        const hourlyData = result?.timelines?.hourly[0];

        dispatch(fetchWeatherSuccess(result));
        if (locationDetails) {
          const location = {
            name: locationDetails.name,
            country: locationDetails.country,
            address: locationDetails.address,
            lat: locationDetails?.lat,
            lng: locationDetails?.lng,
            time: dailyData?.time,
            temp: Math.round(hourlyData?.values?.temperature),
            tempLow: Math.round(dailyData?.values?.temperatureMin),
            tempHigh: Math.round(dailyData?.values?.temperatureMax),
            condition: getWeatherDescription(
              hourlyData?.values?.weatherCode,
              hourlyData?.values?.windSpeed
            ),
          };
          dispatch(setAddLocationData(location));
        } else if (item) {
          const res = {
            ...item,
            time: dailyData?.time,
            temp: Math.round(hourlyData?.values?.temperature),
            tempLow: Math.round(dailyData?.values?.temperatureMin),
            tempHigh: Math.round(dailyData?.values?.temperatureMax),
            condition: getWeatherDescription(
              hourlyData?.values?.weatherCode,
              hourlyData?.values?.windSpeed
            ),
          };
          dispatch(updateLocation(res));
        }
      } else {
        console.warn(response.statusText);
      }
    } catch (error) {
      dispatch(fetchWeatherFailure(error?.message));
    }
  };

export default reducer;
