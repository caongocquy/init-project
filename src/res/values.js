import { Dimensions, Platform, StatusBar } from 'react-native';
import { Func, Pixel } from 'src/utils';
import DeviceInfo from 'react-native-device-info';
// LIVE
// const serverUrl = 'http://b4be-118-69-235-218.ngrok.io';\

export const NOTIFICATION_TYPES = {
  VOUCHER: 1,
  GENERAL: 2,
  ORDER : 3,
  LEVEL_UP: 4,
  DEAL_RATING: 5,
}
const appVersion = DeviceInfo.getVersion()
export default {
  deviceWidth: Dimensions.get('screen').width,
  deviceHeight: Dimensions.get('screen').height,
  statusBarHeight:
    Platform.OS === 'android'
      ? StatusBar.currentHeight
      : Func.isIPhoneX()
        ? 44
        : 20,
  navBarHeight: 44,

  padding: 16,
  paddingBig: 25,
  paddingSmall: 10,
  paddingMicro: 6,

  borderRadius: 5,
  borderRadiusMicro: 2,
  borderRadiusLarge: 10,
  borderRadiusBig: 30,

  fontSizeNano: Pixel.perfectFontSize(10),
  fontSizeMicro: Pixel.perfectFontSize(12),
  fontSizeSmall: Pixel.perfectFontSize(14),
  fontSizeNormal: Pixel.perfectFontSize(16),
  fontSizeLarge: Pixel.perfectFontSize(18),
  fontSizeTitleLarge: Pixel.perfectFontSize(24),
  fontSizeTitleGiant: Pixel.perfectFontSize(28),
  countDown: false,
  debugAPI: false,
  staticMapAPIKey: 'AIzaSyDThBQqvQqL15F4_izZoh7-Z5z3zjOvDKM',
  goongApi: '7f6nnjtdmpVmrZOcOfFQYngmXTUt67iPoxsJ7WzW',
  //API
  // Auth
  apiProductHome: `/v1/home/getHome`,
  apiUsers: `/v1/customer`,
  apiGetResDetails: `/v1/restaurant/getRestaurantDetail`,
  apiRestaurant: `/v1/restaurant/getRestaurants`,
  apiProvinces: `/v1/area/getProvinces`,
  apiDistricts: `/v1/area/getDistricts`,
  apiGetCoupon: `/v1/coupon/getCouponsCustomer`,
  apiCancelOrder: `/v1/order/cancelOrder`,
  apiUpdateFCMToken: `/v1/base/storeDevice`,
  apiGetNotification: `/v1/message/getMessages`,
  apiReadNotification: `/v1/message/readMessage`,
  apiReservation: `/v1/reservation/storeReservation`,
  apiBooking: `/v1/carBooking/storeCarBooking`,
  apiInit: `/v1/customer/init`,
  apiChangePass: `/v1/changePassword`,
  apiUpdateProfiles: `/v1/updateProfile`,
  apiRating: `/v1/rating/storeRating`,
  apiGetAllRestaurant: `/v1/restaurant/getRestaurantAll`,
  apiAppVersion: `/v1/base/getVersionDetail`,

  // api v2
  apiLogin: `/v2/signIn`,
  apiLogout: `/v2/signOut`,
  apiSignUp: `/v2/signUp`,
  apiSendOTP: `/v2/sendOTP`,
  apiVerifyOTP: `/v2/verifyOTP`,
  apiDeleteAccount: `/v2/deleteAccount`,

  apiCities: `/v2/area/getCities`,
  apiWards: `/v2/area/getWards`,
  apiAddress: `/v2/address/getAddresses`,
  apiCreateAddress: `/v2/address/storeAddress`,
  apiUpdateAddress: `/v2/address/updateAddress`,

  apiProduct: `/v2/product/getProducts`,
  apiProductDetails: `/v2/product/getProduct`,
  apiCategoty: `/v2/product/getProductCategoryList`,

  apiAddCart: `/v2/order/addToCart`,
  apiGetCart: `/v2/order/getCartDetail`,
  apiCheckout: `/v2/order/checkOutCart`,

  apiOrderDetails: `/v2/order/getOrderDetail`,
  apiOrder: `/v2/order/getOrders`,

  apiGetUsableVouchers: '/v2/vouchers/getVoucherCanUseList',
  apiGetMyVouchers: '/v2/vouchers/getMyVoucher',
  apiRedeemVoucher: '/v2/vouchers/redeemVoucher',

  //goong api
  apiGetListPlace: 'https://rsapi.goong.io/Place/AutoComplete',
  apiGetListGeocoding: 'https://rsapi.goong.io/Geocode',
  apiGetPlaceDetails: 'https://rsapi.goong.io/Place/Detail',
  apiGetDirection: 'https://rsapi.goong.io/Direction',
  // js bundle version
  version: `${appVersion} (23041401)`,
};
