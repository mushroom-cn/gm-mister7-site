import { useMediaQuery } from "react-responsive";

export function useIsDevice_2560_1440() {
  return useMediaQuery({
    minWidth: 2560,
  });
}

export function useIsDevice_1920_1080() {
  return useMediaQuery({
    maxWidth: 1920,
  });
}

export function useIsDevice_1536_864() {
  return useMediaQuery({
    maxWidth: 1536,
  });
}

export function useIsDevice_1366_768() {
  return useMediaQuery({
    maxWidth: 1366,
  });
}

export function useIsDevice_1024_768() {
  return useMediaQuery({
    maxWidth: 1024,
  });
}

export function useIsDevice_960_1180() {
  return useMediaQuery({
    maxWidth: 960,
  });
}

export function useIsDevice_768_1024() {
  return useMediaQuery({
    // query: DeviceMediaQuery._768_1024,
    maxWidth: 768,
  });
}

export function useGrid(): [colCount: number, rowGap: number, colGap: number] {
  const is_768_1024 = useIsDevice_768_1024();
  const is_960_1180 = useIsDevice_960_1180();
  const is_1024_768 = useIsDevice_1024_768();
  const is_1366_1180 = useIsDevice_1366_768();
  const is_1536_1180 = useIsDevice_1536_864();
  const is_1920_1180 = useIsDevice_1920_1080();
  const is_2560_1440 = useIsDevice_2560_1440();

  if (is_768_1024) {
    return [1, 32, 32];
  }
  if (is_960_1180) {
    return [2, 32, 32];
  }
  if (is_1024_768) {
    return [3, 40, 32];
  }
  if (is_1366_1180) {
    return [4, 40, 32];
  }
  if (is_1536_1180) {
    return [5, 40, 32];
  }
  if (is_1920_1180) {
    return [6, 40, 32];
  }
  if (is_2560_1440) {
    return [7, 48, 32];
  }
  return [8, 48, 32];
}
