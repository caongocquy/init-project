import { Easing, Platform } from 'react-native';
import { TransitionPresets, /* type */ StackCardInterpolationProps } from '@react-navigation/stack';

const ANDROID_VERSION_LOLLIPOP = 22;

const fadeInAndroidTransitionSpec = {
  animation: 'timing',
  config: {
    duration: 300,
    easing: Easing.linear,
  },
};

const customCardStyleInterpolator = ({ current, layouts: { screen } /* ,inverted */ }: StackCardInterpolationProps) => {
  // const translateY = Animated.multiply(
  //   current.progress.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: [screen.height, 0],
  //   }),
  //   inverted,
  // );
  const translateY = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [screen.height, 0],
  });

  return {
    cardStyle: { transform: [{ translateY }] },
    overlayStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: current.progress },
  };
};

const fadeInAndroidTransition = {
  gestureDirection: 'vertical',
  transitionSpec: {
    open: fadeInAndroidTransitionSpec,
    close: fadeInAndroidTransitionSpec,
  },
  cardStyleInterpolator: ({ current }: StackCardInterpolationProps) => ({ cardStyle: { opacity: current.progress } }),
  headerStyleInterpolator: () => ({}), // noAnimation
};

const defaultTransition = Platform.select({
  android:
    Platform.Version > ANDROID_VERSION_LOLLIPOP ? TransitionPresets.FadeFromBottomAndroid : fadeInAndroidTransition,
  default: TransitionPresets.DefaultTransition,
});

const modalTransition = {
  gestureEnabled: true,
  cardOverlayEnabled: true,
  cardStyle: { backgroundColor: 'transparent' },
  transitionSpec: TransitionPresets.ModalSlideFromBottomIOS.transitionSpec,
  gestureDirection: TransitionPresets.ModalSlideFromBottomIOS.gestureDirection,
  headerStyleInterpolator: TransitionPresets.ModalSlideFromBottomIOS.headerStyleInterpolator,
  cardStyleInterpolator: customCardStyleInterpolator,
};

const modalFadeIn = {
  gestureEnabled: true,
  cardOverlayEnabled: true,
  cardStyle: { backgroundColor: 'transparent' },
  cardStyleInterpolator: ({ current }: StackCardInterpolationProps) => ({
    cardStyle: { opacity: current.progress },
    overlayStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: current.progress },
  }),
};

const noAnimation = { cardStyleInterpolator: () => ({}) };
export { defaultTransition, modalTransition, noAnimation, modalFadeIn };
