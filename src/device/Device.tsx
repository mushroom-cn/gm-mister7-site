import React, { createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import device from "./styles/index.scss";

export const DeviceSize = {
  DESKTOP: device["desktop"],
  TABLET: device["tablet"],
  NOTE: device["note"],
  MOBILE: device["mobile"],
};

export type DeviceType = keyof typeof DeviceSize;

const DeviceMediaQuery = {
  _1025_1180: `(min-width: 1025px)`,
  _1024_768: `(max-width: 1024px)`,
  _960_1180: `(max-width: 960px)`,
  _768_1024: `(max-width: 768px)`,
};

export function Device({ children }: { children?: React.ReactNode }) {
  const isDesktopOrLaptop = useMediaQuery({
    query: DeviceMediaQuery._1025_1180,
  });
  return <>{(isDesktopOrLaptop && children) ?? null}</>;
}

export const DeviceGridContext = createContext<
  [colCount: number, rowGap: number, colGap: number]
>([0, 0, 0]);

export const useDeviceGridContext = () => {
  return useContext(DeviceGridContext);
};
