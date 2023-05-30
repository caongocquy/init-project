import React from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
  ScrollView,
  ViewProps,
  KeyboardAvoidingView,
  ScrollViewProps,
  LayoutChangeEvent,
  // SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import CIcon from '../CIcon';
import CText from '../CText';
import CTouchable from '../CTouchable';
import R from 'src/res/R';
import metrics from 'src/config/metrics';

type Props = {
  isFullHeight?: boolean;
  isRenderNavBar?: boolean;
  children: React.ReactNode;
  scrollEnabled?: boolean;
  allowAndroidBackPress?: boolean;
  isRenderCloseButton?: boolean;
  isRenderMiniBar?: boolean;
  onRequestClose?: () => void;
  headerComponent?: () => React.ReactNode;
  renderBottom?: () => React.ReactNode;
  headerRight?: () => React.ReactNode;
  navBarStyle?: ViewProps['style'];
  title?: string;
  backButtonStyle?: 'close' | 'back';
  scrollViewProps?: ScrollViewProps;
};

export default function ModalWraper(props: Props) {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {
    allowAndroidBackPress = true,
    isFullHeight = false,
    isRenderCloseButton = true,
    scrollEnabled = true,
    isRenderMiniBar = true,
    navBarStyle,
    title = '',
    backButtonStyle = 'close',
    headerRight,
    scrollViewProps,
    isRenderNavBar = true,
  } = props || {};

  React.useEffect(() => {
    const handleBackListener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (allowAndroidBackPress) {
        return false;
      }
      return true;
    });
    return () => {
      handleBackListener.remove();
    };
  }, []);

  const handleLayoutNav = React.useCallback((event: LayoutChangeEvent) => {
    const offsetY = (event.nativeEvent.layout.y || 0) + 60; // + nav height
    navigation.setOptions({ gestureResponseDistance: offsetY });
  }, []);

  const renderCloseButton = () => {
    return (
      <CTouchable
        activeOpacity={0.8}
        style={[styles.closeButton,{ right: 0 }]}
        onPress={() => {
          props?.onRequestClose ? props?.onRequestClose() : navigation.goBack()
        }}
      >
        <CIcon
          size={24}
          // source={isClose ? R.images.iconClose() : R.images.iconBack()}
          source={R.images.iconClose()}
          tintColor={R.colors.S_dark}
        />
      </CTouchable>
    );
  };

  return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior="padding"
        enabled={metrics.isIOS}
        style={{ flex: 1 }}
        // keyboardVerticalOffset={-metrics.iPhoneXIndicatorLine}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => {
            if (!allowAndroidBackPress) return;
            props?.onRequestClose? props?.onRequestClose() : navigation.goBack();
          }}
        />
        <View
          style={[
            isFullHeight ? styles.containerFullHeight : styles.container,
            props.renderBottom ? { paddingBottom: 0 } : {},
          ]}
          onLayout={handleLayoutNav}
          edges={['top']}
        >
          {isRenderNavBar ? <View style={[styles.navBarContainer, navBarStyle]}>
            {/* {isRenderMiniBar ? (
              <View style={styles.navBar}>
                <View style={styles.miniBar} />
              </View>
            ) : null} */}
            {props?.headerComponent?
              <View>
                {props?.headerComponent?.()}
              </View>
              :<View style={styles.headerContent}>
                <View style={styles.wrapTitle}>
                  <CText type='medium' size={'large'} color={R.colors.darkText}>
                    {title}
                  </CText> 
                </View>
                {isRenderCloseButton ? renderCloseButton() : null}
              </View>
            }
          </View> : null}
          {isFullHeight ? (
            props.children
          ) : (
            <ScrollView bounces={false} scrollEnabled={scrollEnabled} {...scrollViewProps}>
              {props.children}
            </ScrollView>
          )}
          {props?.renderBottom?.()}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: R.colors.white,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginTop: 'auto',
    maxHeight: metrics.screenHeight - (metrics.statusBarHeight + 24),
    paddingBottom: 24 + metrics.iPhoneXIndicatorLine,
  },
  containerFullHeight: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: R.colors.white,
    overflow: 'hidden',
    marginTop: 'auto',
    flex: 1,
    maxHeight: metrics.screenHeight - (metrics.statusBarHeight + 24),
    paddingBottom: 24 + metrics.iPhoneXIndicatorLine,
  },
  miniBar: {
    height: 4,
    width: 32,
    borderRadius: 8,
    backgroundColor: R.colors.lightGray,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBar: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBarContainer: {
    backgroundColor: R.colors.white,
    minHeight: 60,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  wrapTitle: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  headerRight: {
    height: '100%',
    right: 0,
    position: 'absolute',
  },
});