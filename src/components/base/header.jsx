import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchInput } from ".";
import {
  setAddBtn,
  setSideMenuOpen,
  setWeatherListByLocations,
} from "../../store/main";
import { Plus, Sidemenu } from "../../assets/icons";
import data from "../../data/data.json";

export default function Header({
  className = "",
  isMenuOpen = false,
  fill = "",
  bgColor = "",
  textColor = "",
  crossFill = "",
  placeholder = "",
  inputBg = "",
  showAddBtn = false,
}) {
  const addLocationData = useSelector(
    (state) => state?.weather?.addLocationData
  );
  const dispatch = useDispatch();

  const [addBtnText, setAddBtnText] = useState("Add");

  useEffect(() => {
    dispatch(setAddBtn(false));
  }, []);

  return (
    <div
      className={`${className} z-20 fixed hidden lg:flex md:flex font-sans items-center justify-between p-3 pl-5 bg-transparent`}
    >
      <div className="flex items-center gap-5">
        <span
          className={`${isMenuOpen ? "hidden" : ""} cursor-pointer`}
          title="open sidemenu"
          onClick={() => {
            dispatch(setSideMenuOpen(true));
          }}
        >
          <Sidemenu />
        </span>
      </div>

      <div className="hidden xl:flex gap-2.5">
        {showAddBtn ? (
          <button
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg shadow-md bg-default/5 backdrop-brightness-90 backdrop-blur-md text-base`}
            onClick={() => {
              dispatch(setWeatherListByLocations(addLocationData));
              setAddBtnText("Added");
              setTimeout(() => {
                dispatch(setAddBtn(false));
                setAddBtnText("Add");
              }, 400);
            }}
          >
            <Plus fill={fill} />
            <span className="text-white">{addBtnText}</span>
          </button>
        ) : null}

        <SearchInput
          className="relative xl:flex items-center md:hidden"
          inputBg={inputBg}
          placeholder={placeholder}
          fill={fill}
          crossFill={crossFill}
        />
      </div>
    </div>
  );
}
