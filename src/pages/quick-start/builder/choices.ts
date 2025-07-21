import { DisplayChoice } from "../interfaces";

// Platform choices
export const REACT = "REACT";
export const NEXTJS = "NEXTJS";
export const VUE = "VUE";
export const ANGULAR = "ANGULAR";
export const ANDROID = "ANDROID";
export const IOS = "IOS";
export const WEBGL = "WEBGL";
export const REACT_NATIVE = "REACT_NATIVE";
export const FLUTTER = "FLUTTER";

export const LANGS: DisplayChoice[] = [
  { key: REACT, displayName: "React" },
  { key: NEXTJS, displayName: "Next JS" },
  { key: VUE, displayName: "Vue" },
  { key: ANGULAR, displayName: "Angular" },
  { key: ANDROID, displayName: "Android" },
  { key: IOS, displayName: "iOS/Swift" },
  { key: REACT_NATIVE, displayName: "React Native" },
  { key: FLUTTER, displayName: "Flutter" },
];

// Misc choices

export const YES = "YES";
export const NO = "NO";

export const TOGGLE: DisplayChoice[] = [
  { key: NO, displayName: "No" },
  { key: YES, displayName: "Yes" },
];
