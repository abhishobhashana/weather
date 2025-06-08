import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideMenuOpen: true,
  isModalOpen: false,
  modalValue: 0,
  isSearchPanelOpen: false,
  searchValue: "",
  searchResultValue: [],
  location: {},
  timezone: "",
  showAddBtn: false,
  weatherListByLocations: [],
  activeWeather: 0,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setSideMenuOpen: (state, action) => {
      state.isSideMenuOpen = action.payload;
    },
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setModalValue: (state, action) => {
      state.modalValue = action.payload;
    },
    setSearchPanelOpen: (state, action) => {
      state.isSearchPanelOpen = action.payload;
    },
    setSearchValueState: (state, action) => {
      state.searchValue = action.payload;
    },
    setSearchResultState: (state, action) => {
      state.searchResultValue = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setTimezone: (state, action) => {
      state.timezone = action.payload;
    },
    setAddBtn: (state, action) => {
      state.showAddBtn = action.payload;
    },
    setWeatherListByLocations: (state, action) => {
      const index = state.weatherListByLocations.findIndex(
        (item) => item.name === action.payload.name
      );
      if (!(index > -1)) {
        const len = state.weatherListByLocations.length;
        state.weatherListByLocations.push({
          id: state.weatherListByLocations.length >= 1 ? len + 1 : 1,
          ...action.payload,
        });
      }
    },
    updateLocation: (state, action) => {
      const index = state.weatherListByLocations.findIndex(
        (item) => item.name === action.payload.name
      );
      if (index > -1) {
        state.weatherListByLocations.splice(index, 1, action.payload);
      }
    },
    deleteLocation: (state, action) => {
      const index = state.weatherListByLocations.findIndex(
        (item) => item.id === action.payload
      );
      if (index > -1) {
        state.weatherListByLocations.splice(index, 1);
      }
    },
    setActiveWeather: (state, action) => {
      state.activeWeather = action.payload;
    },
  },
});

const { actions, reducer } = mainSlice;

export const {
  setSideMenuOpen,
  setModalOpen,
  setSearchPanelOpen,
  setModalValue,
  setSearchValueState,
  setSearchResultState,
  setLocation,
  setTimezone,
  setAddBtn,
  setWeatherListByLocations,
  deleteLocation,
  updateLocation,
  setActiveWeather,
} = actions;

export default reducer;
