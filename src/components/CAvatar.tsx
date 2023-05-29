import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {CIcon, CImage, CText, CTouchable, ImageSheet} from '.';
import {Image} from 'react-native-image-crop-picker';
import R from '../res/R';

type Props = {
  title?: string;
  titleRight?: string;
  onUpload?: (i: Image) => void;
  profilePicture?: string;
};

export default function ({title, titleRight, onUpload, profilePicture}: Props) {
  const imageSheetRef = React.useRef<Record<string, any>>(null);

  const [state, setState] = React.useState({
    isUploading: false,
    isError: false,
  });

  const [image, setImage] = React.useState<Image>();

  const requestUpload = async (i: Image) => {
    onUpload?.(i);
  };

  const renderStatus = () => {
    const {isUploading, isError} = state;
    if (!isUploading && !isError) {
      return null;
    }
    return (
      <View style={styles.overlay}>
        {isUploading ? (
          <ActivityIndicator color={R.colors.white} />
        ) : isError ? (
          <CText
            color={R.colors.white}
            size="tiny"
            style={{textAlign: 'center'}}>
            Có lỗi xảy ra
          </CText>
        ) : null}
      </View>
    );
  };

  const renderTitle = () => {
    if (!title && !titleRight) {
      return null;
    }
    return (
      <View style={styles.title}>
        {title ? (
          <CText size="small" color={R.colors.S_dark}>
            {title}
          </CText>
        ) : null}
        {titleRight ? (
          <CText size="small" color={R.colors.darkText}>
            {titleRight}
          </CText>
        ) : null}
      </View>
    );
  };

  return (
    <View>
      {renderTitle()}
      <CTouchable
        onPress={() => {
          imageSheetRef.current?.show();
        }}
        activeOpacity={0.8}
        style={styles.imageWrap}>
        {image?.path ? (
          <CImage source={{uri: image.path}} style={styles.image} />
        ) : profilePicture ? (
          <CImage source={{uri: profilePicture}} style={styles.image} />
        ) : (
          <CImage
            source={R.images.imageDefault}
            style={styles.image}
          />
        )}
        {renderStatus()}
        <View style={styles.wrapIcon}>
          <CIcon
            source={R.images.iconCamera()}
            size={15}
            tintColor={R.colors.darkText}
          />
        </View>
      </CTouchable>
      <ImageSheet
        isSelectAvatar
        ref={imageSheetRef}
        onSelected={img => {
          setImage(img);
          requestUpload(img);
        }}
      />
    </View>
  );
}

const IMAGE_SIZE = 64;

const styles = StyleSheet.create({
  overlay: {
    zIndex: 1,
    ...StyleSheet.absoluteFillObject,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    backgroundColor: R.colors.overlay05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
  },
  imageWrap: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.25,
    borderColor: R.colors.light,
    backgroundColor: R.colors.background,
    overflow: 'visible',
  },
  wrapIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.colors.white,
    position: 'absolute',
    bottom: 0,
    right: 0,

    shadowColor: R.colors.darkGray,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
