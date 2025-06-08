import { useEffect, useState } from "react";

export const useResolution = () => {
  const [size, setSize] = useState(0);

  useEffect(() => {
    setSize(window.innerWidth);

    const handleResize = () => setSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};

export const useBackground = (weatherCondition) => {
  const size = useResolution();

  const getWeatherImagePath = async (condition, screenSize) => {
    try {
      const image = await import(
        `../assets/images/weather-bg/${screenSize}/${condition}.jpg`
      );
      return image.default;
    } catch (e) {
      console.error(`Image not found`);
      return "";
    }
  };

  const getScreenSize = () => {
    if (size < 768) {
      return "Small";
    } else if (size >= 768 && size < 1024) {
      return "Medium";
    } else {
      return "Large";
    }
  };

  const [weatherImagePath, setWeatherImagePath] = useState("");
  const screenSize = getScreenSize();

  useEffect(() => {
    const fetchImage = async () => {
      const imagePath = await getWeatherImagePath(weatherCondition, screenSize);
      setWeatherImagePath(imagePath);
    };
    fetchImage();
  }, [weatherCondition, screenSize]);

  return weatherImagePath;
};

export const getColors = (weatherCondition) => {
  const colorMappings = {
    "light-blue-main-bg": "rgb(81, 141, 202)",
    "light-blue-menu-bg": "rgb(47, 100, 154)",
    "light-blue-bg": "rgb(49, 122, 191)",
    "light-blue-bg-direction": "rgb(49, 122, 191)",
    "light-blue-text": "rgb(126, 200, 252)",

    "navy-main-bg": "rgb(32, 35, 66)",
    "navy-menu-bg": "rgb(32, 35, 66)",
    "navy-bg": "rgb(32, 35, 66)",
    "navy-text": "rgb(110, 113, 144)",
    "navy-bg-direction": "rgb(32, 35, 66)",

    "grey-main-bg": "rgb(123, 175, 188)",
    "grey-menu-bg": "rgb(80, 96, 112)",
    "grey-bg": "rgb(123, 175, 188)",
    "grey-text": "rgb(178, 230, 243)",

    "dark-grey-main-bg": "rgb(77, 103, 126)",
    "dark-grey-menu-bg": "rgb(80, 96, 112)",
    "dark-grey-bg": "rgb(77, 103, 126)",
    "dark-grey-text": "rgb(138, 164, 187)",
    "dark-grey-bg-direction": "rgb(77, 103, 126)",
  };

  const weatherColors = {
    Cloudy: {
      "main-bg": colorMappings["light-blue-main-bg"],
      menu: "bg-light-blue-menu-bg",
      bg: "bg-light-blue-bg",
      text: "text-light-blue-text",
      icon: colorMappings["light-blue-text"],
      directionIcon: colorMappings["light-blue-bg-direction"],
      border: "border-light-blue-text",
      placeholder: "placeholder-light-blue-text",
      inputBg: "bg-light-blue-input",
      inputCloseIconBg: "rgb(69, 128, 186)",
    },
    Sunny: {
      "main-bg": colorMappings["light-blue-main-bg"],
      menu: "bg-light-blue-menu-bg",
      bg: "bg-light-blue-bg",
      text: "text-light-blue-text",
      icon: colorMappings["light-blue-text"],
      directionIcon: colorMappings["light-blue-bg-direction"],
      border: "border-light-blue-text",
      placeholder: "placeholder-light-blue-text",
      inputBg: "bg-light-blue-input",
      inputCloseIconBg: "rgb(69, 128, 186)",
    },
    Evening: {
      "main-bg": colorMappings["light-blue-main-bg"],
      menu: "bg-light-blue-menu-bg",
      bg: "bg-light-blue-bg",
      text: "text-light-blue-text",
      icon: colorMappings["light-blue-text"],
      directionIcon: colorMappings["light-blue-bg-direction"],
      border: "border-light-blue-text",
      placeholder: "placeholder-light-blue-text",
      inputBg: "bg-light-blue-input",
      inputCloseIconBg: "rgb(69, 128, 186)",
    },
    HeavyRain: {
      "main-bg": colorMappings["dark-grey-main-bg"],
      menu: "bg-dark-grey-menu-bg",
      bg: "bg-dark-grey-second",
      text: "text-dark-grey-text",
      icon: colorMappings["dark-grey-text"],
      directionIcon: colorMappings["dark-grey-bg-direction"],
      border: "border-seperator",
      placeholder: "placeholder-light-grey-second",
      inputBg: "bg-dark-grey-input-bg",
      inputCloseIconBg: "rgba(54, 71, 87, 0.9)",
    },
    Rain: {
      "main-bg": colorMappings["dark-grey-main-bg"],
      menu: "bg-dark-grey-menu-bg",
      bg: "bg-dark-grey-bg",
      text: "text-dark-grey-text",
      icon: colorMappings["dark-grey-text"],
      directionIcon: colorMappings["dark-grey-bg-direction"],
      border: "border-seperator",
      placeholder: "placeholder-light-grey-second",
      inputBg: "bg-grey-input-bg",
      inputCloseIconBg: "rgb(105, 127, 140)",
    },
    Night: {
      "main-bg": colorMappings["navy-main-bg"],
      menu: "bg-navy-menu-bg",
      bg: "bg-navy-bg",
      text: "text-navy-text",
      icon: colorMappings["navy-text"],
      directionIcon: colorMappings["navy-bg-direction"],
      border: "border-seperator",
      placeholder: "placeholder-navy-text",
      inputBg: "bg-navy-bg",
      inputCloseIconBg: "rgba(32, 35, 66, 0.9)",
    },
    default: {
      "main-bg": colorMappings["dark-grey-main-bg"],
      menu: "bg-dark-grey-menu-bg",
      bg: "bg-dark-grey-bg",
      text: "text-dark-grey-text",
      icon: colorMappings["dark-grey-text"],
      directionIcon: colorMappings["light-blue-bg-direction"],
      border: "border-seperator",
      placeholder: "placeholder-dark-grey-text",
      inputCloseIconBg: "rgb(105, 127, 140)",
    },
  };

  return weatherColors[weatherCondition] || weatherColors.default;
};
