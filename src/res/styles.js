
import {Platform, StyleSheet} from 'react-native';
import { Func, Pixel, Navigation } from "src/utils";
import fonts from './fonts';
import values from './values';
export default StyleSheet.create({
  normalPage: {
    position: "relative",
    flex: 1,
    backgroundColor: "#3AA5DD",
  },

  pageCenter: {
    alignItems: "center",
    justifyContent: "center",
  },

  textInput: {
    borderRadius: Pixel.pixelPerfect(25),
    borderWidth: 2,
    marginBottom: Pixel.pixelPerfect(20),
    fontSize: values.fontSizeSmall,
    height:Pixel.pixelPerfect(40),
    backgroundColor: "#FFF",
    borderColor: "#DEEEFF",
    color: "#667B9D",
    width: "100%",
    fontFamily: fonts.regular,
  },

  shadow: Platform.select({
    ios: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    }
  }),
})
