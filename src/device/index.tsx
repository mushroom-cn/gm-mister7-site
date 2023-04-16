import React from "react";
import { useMediaQuery } from "react-responsive";

export enum DeviceType {
  _2340_1080 = "(min-width: 2340px)",
  _1024_768 = "(min-width: 1024px)",
  _960_1180 = "(min-width: 960px)",
  _820_1180 = "(min-width: 820px)",
  _768_1024 = "(min-width: 768px)",
}

export function Device({
  children,
}: {
  children?: React.ReactNode;
  type: DeviceType;
}) {
  const isDesktopOrLaptop = useMediaQuery({
    query: DeviceType._1024_768,
  });
  return <>{(isDesktopOrLaptop && children) ?? null}</>;
}

export function useIsDevice_1024_768() {
  return useMediaQuery({
    query: DeviceType._1024_768,
  });
}
export function useIsDevice_2340_1080() {
  return useMediaQuery({
    query: DeviceType._2340_1080,
  });
}
export function useIsDevice_960_1180() {
  return useMediaQuery({
    query: DeviceType._960_1180,
  });
}
export function useIsDevice_768_1024() {
  return useMediaQuery({
    query: DeviceType._768_1024,
  });
}
export function useGrid() {
  const is_1024_768 = useIsDevice_1024_768();
  const is_2340_1080 = useIsDevice_2340_1080();
  const is_960_1180 = useIsDevice_960_1180();
  //   const is_768_1024 = useIsDevice_768_1024();
  if (is_2340_1080) {
    return [8, 48, 32];
  }
  if (is_1024_768) {
    return [6, 40, 32];
  }
  if (is_960_1180) {
    return [3, 32, 32];
  }
  return [1, 32, 32];
}
