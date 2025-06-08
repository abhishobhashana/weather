import { useEffect, useState } from "react";

export const useWidgetContainerHeight = (contentHeight = 173) => {
  const [widgetHeight, setWidgetHeight] = useState(
    window.innerHeight - contentHeight - 110
  );

  useEffect(() => {
    const handleResize = () => {
      setWidgetHeight(window.innerHeight - contentHeight - 110);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [contentHeight]);

  return `${widgetHeight}px`;
};
