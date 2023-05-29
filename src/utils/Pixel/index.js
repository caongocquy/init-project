import { Platform } from "react-native";

const BIAS_FONT_SIZE = Platform.OS === 'ios' ? 0 : -1;
const pixelPerfect = size => Math.ceil(size)

export default {
  pixelPerfect: pixelPerfect,
  perfectFontSize: fontSize =>
    // Math.ceil(pixelPerfect(fontSize));
    Math.ceil(pixelPerfect(fontSize + BIAS_FONT_SIZE)),
};
