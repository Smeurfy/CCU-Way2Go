import { Dimensions } from "react-native";

export const responsiveHeight = h => {
  const { height, width } = Dimensions.get("window");
  const hg = height > width? height:width;
  return hg * (h / 100);
};

export const responsiveWidth = w => {
  const { height, width } = Dimensions.get("window");
  const wd = height > width? width:height;
  return wd * (w / 100);
};

export const responsiveFontSize = f => {
  const { height, width } = Dimensions.get("window");
  const wd = height > width? width:height;
  const tempHeight = (16 / 9) * wd;
  return Math.sqrt(Math.pow(tempHeight, 2) + Math.pow(wd, 2)) * (f / 100);
};