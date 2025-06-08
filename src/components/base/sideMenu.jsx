// import { Sidemenu } from "../../assets/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { setSideMenuOpen } from "../../store/main";
// import { SearchInput, SearchList } from ".";
// import { useResolution } from "../../utils/useResolution";
// import { useSelectedItembyClick } from "../../utils/useSelectedItemByClick";
// import data from "../../data/data.json";
// import { List } from "./List";
// import { useState } from "react";

// export default function sideMenu({
//   className = "",
//   bgColor = "",
//   fill = "",
//   input = "",
//   inputBg = "",
//   placeholder = "",
//   crossFill = "",
//   loading = false,
//   listData = [],
// }) {
//   const searchValue = useSelector((state) => state.main.searchValue);
//   const isSearchPanelOpen = useSelector(
//     (state) => state.main.isSearchPanelOpen
//   );
//   const searchResultValue = useSelector(
//     (state) => state.main.searchResultValue
//   );

//   const dispatch = useDispatch();

//   const screenWidth = useResolution();
//   const isMobileScreen = screenWidth < 768;

//   const handleDelete = (id) => {
//     setItems((prevItems) => prevItems.filter((item) => item.id !== id));
//   };

//   return (
//     <div
//       className={`${className} sticky w-full h-full flex flex-col gap-4 p-6 pt-3 ${bgColor} text-white shadow-md`}
//     >
//       <span
//         className="w-fit cursor-pointer"
//         onClick={() => {
//           dispatch(setSideMenuOpen(false));
//         }}
//       >
//         <Sidemenu />
//       </span>

//       <span className="font-sans font-semibold text-3xl text-secondary dark:text-light-white pr-6 md:flex xl:hidden">
//         {data.app}
//       </span>

//       <SearchInput
//         className="relative w-full sm:flex md:flex items-center xl:hidden"
//         inputBg={inputBg}
//         placeholder={placeholder}
//         fill={fill}
//         crossFill={crossFill}
//       />

//       {searchValue?.length > 0 && isSearchPanelOpen && isMobileScreen ? (
//         <SearchList
//           className="p-0 shadow-none"
//           inputBg={bgColor}
//           value={searchValue}
//           result={searchResultValue}
//           loading={loading}
//           onClick={(place) => {
//             useSelectedItembyClick(place, dispatch);
//             dispatch(setSideMenuOpen(false));
//           }}
//         />
//       ) : null}

//       <div className="flex flex-col gap-2.5">
//         <List items={listData} onDelete={handleDelete} />
//       </div>
//     </div>
//   );
// }

import { Sidemenu } from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLocation,
  setActiveWeather,
  setLocation,
  setSideMenuOpen,
} from "../../store/main";
import { SearchInput, SearchList } from ".";
import { useResolution } from "../../utils/useResolution";
import { useSelectedItembyClick } from "../../utils/useSelectedItemByClick";
import data from "../../data/data.json";
import { List } from "./List";
import { useState } from "react";
import { fetchWeather } from "../../store/weather";

export default function sideMenu({
  className = "",
  bgColor = "",
  fill = "",
  input = "",
  inputBg = "",
  placeholder = "",
  crossFill = "",
  loading = false,
  listData = [],
}) {
  const searchValue = useSelector((state) => state.main.searchValue);
  const isSearchPanelOpen = useSelector(
    (state) => state.main.isSearchPanelOpen
  );
  const searchResultValue = useSelector(
    (state) => state.main.searchResultValue
  );

  const dispatch = useDispatch();

  const screenWidth = useResolution();
  const isMobileScreen = screenWidth < 768;

  const [isEditList, setIsEditList] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteLocation(id));
  };

  const handleSelect = (item) => {
    dispatch(setLocation(item));
    dispatch(fetchWeather(`${item?.lat},${item?.lng}`, undefined, item));
    dispatch(setActiveWeather(item.id));
  };

  return (
    <div
      className={`${className} sticky w-full h-full max-h-screen overflow-auto flex flex-col gap-4 bg-transparent backdrop-brightness-90 backdrop-blur-md text-white shadow-md`}
    >
      <div
        className={`sticky top-0 z-20 w-full flex flex-col gap-4 p-6 bg-transparent backdrop-brightness-90 backdrop-blur-md`}
      >
        <div className="flex items-center justify-between">
          <span
            className="w-fit cursor-pointer"
            onClick={() => {
              dispatch(setSideMenuOpen(false));
            }}
          >
            <Sidemenu />
          </span>

          {listData?.length > 0 ? (
            <span
              className="w-fit cursor-pointer text-white"
              onClick={() => {
                setIsEditList(!isEditList);
              }}
            >
              {isEditList ? "Done" : "Edit List"}
            </span>
          ) : null}
        </div>
        <span
          className={`flex font-sans font-semibold text-3xl text-secondary dark:text-light-white pr-6`}
        >
          {data.app}
        </span>
        <SearchInput
          className="relative w-full sm:flex md:flex items-center xl:hidden"
          inputBg={inputBg}
          placeholder={placeholder}
          fill={fill}
          crossFill={crossFill}
        />
      </div>

      <div className="z-10 flex flex-col gap-4 p-6 pt-0">
        {searchValue?.length > 0 && isSearchPanelOpen && isMobileScreen ? (
          <SearchList
            className="p-0 shadow-none"
            inputBg={bgColor}
            value={searchValue}
            result={searchResultValue}
            loading={loading}
            onClick={(place) => {
              useSelectedItembyClick(place, dispatch);
              dispatch(setSideMenuOpen(false));
            }}
          />
        ) : null}

        <div className="flex flex-col gap-2.5">
          <List
            items={listData}
            editMode={isEditList}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
