import {NativeModules, Platform, Linking, Dimensions} from 'react-native';

const validateEmail = data => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(data.toLowerCase())) {
    return 1;
  } else {
    // number
    if (/^\d+$/.test(data)) {
      if (data.length < 10 || data[0] != '0' || data.length > 11) {
        return 0;
      }

      if (data.length == 10) {
        if (
          data[1] == '0' ||
          data[1] == '1' ||
          data[1] == '2' ||
          data[1] == '4' ||
          data[1] == '6'
        ) {
          return 0;
        }
        return 1;
      }

      let starter = data.substring(1, 4);
      if (data.length == 11) {
        if (
          '162,163,164,165,166,167,168,169,120,121,122,123,124,125,126,127,128,129,186,188,199'.indexOf(
            starter,
          ) >= 0
        ) {
          return -1;
        }
        return 0;
      }

      return 1;
      // not a number
    } else {
      return 0;
    }
  }
};

const getProvinceName = (type, list, id) => {
  let result = null;
  if (list && id) {
    list.some(item => {
      if (id == item.id) {
        result = item;
        return true;
      }

      return false;
    });
  }

  return result ? result[`${type}_name`] : null;
};

const getProvinceId = (type, list, name) => {
  let result = null;
  if (list && name) {
    list.some(item => {
      if (name == item.name) {
        result = item;
        return true;
      }

      return false;
    });
  }

  return result ? result.id : null;
};

const canOpenPhoneCall = async phone => {
  console.log('start Check phone calling');
  if (phone) {
    return await Linking.canOpenURL(openPhoneCallUrl(phone));
  } else {
    return false;
  }
};

const canOpenSMS = async phone => {
  console.log('start Check SMS sending');
  if (phone) {
    return await Linking.canOpenURL(openSMSAppUrl(phone));
  } else {
    return false;
  }
};

const canOpenEmail = async email => {
  console.log('start Check Send Email');
  if (email) {
    return await Linking.canOpenURL(openEmailAppUrl(email));
  } else {
    return false;
  }
};

const openPhoneCallUrl = phone => {
  return Platform.OS === 'ios' ? `telprompt://${phone}` : `tel://${phone}`;
};

const openSMSAppUrl = phone => {
  return `sms://${phone}`;
};

const openEmailAppUrl = email => {
  return Platform.OS === 'ios' ? `mailTo:${email}` : `mailto:${email}`;
};

const openPhoneCall = phone => {
  if (phone && canOpenPhoneCall(phone)) {
    Linking.openURL(openPhoneCallUrl(phone));
  }
};

const openSMS = phone => {
  if (phone && canOpenSMS(phone)) {
    Linking.openURL(openSMSAppUrl(phone));
  }
};

const openEmail = email => {
  if (email && canOpenEmail(email)) {
    Linking.openURL(openEmailAppUrl(email));
  }
};

const htmlToText = html => {
  if (!html) {
    return null;
  }

  let rawText = html;

  rawText = rawText.replace(/&nbsp;/g, ' ');
  rawText = rawText.replace(/<br>/g, '\r\n');
  rawText = rawText.replace(/<br\/>/g, '\r\n');
  rawText = rawText.replace(/<\/p>/g, '\r\n');
  rawText = rawText.replace(/<(.|\n)*?>/g, '');

  return rawText;
};

const fullNameToShort = fullName => {
  if (fullName && fullName.length > 0) {
    const elements = fullName.split(' ');
    if (elements.length === 1) {
      return fullName.slice(0, 1);
    } else {
      const lastName = elements[0];
      const firstName = elements[elements.length - 1];
      return lastName.slice(0, 1) + firstName.slice(0, 1);
    }
  } else {
    return '';
  }
};

const trackingAPIPerf = (api, time) => {
  console.log('TrackingAPIPerf', api, time, 'ms');
};

const goToURL = url => {
  // Check url
  if (url.indexOf('http://') < 0 && url.indexOf('https://') < 0) {
    url = 'http://' + url;
  }
  // Open
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.log("Can't handle url: " + url);
    } else {
      return Linking.openURL(url);
    }
  });
};

const isIPhoneX = () => {
  const D_WIDTH = Dimensions.get('window').width;
  const D_HEIGHT = Dimensions.get('window').height;

  let isXSeries = (Platform.OS === 'ios' &&
    (D_WIDTH < 500 && D_HEIGHT > 800 && D_HEIGHT != 847));
  return isXSeries;
};

const exitApp = () => {
  if (Platform.OS === 'android') {
    NativeModules.RNExitApp.exitApp();
  }
};
const verifyStoragePermissions = () => {
  if (Platform.OS === 'android') {
    NativeModules.RNExitApp.verifyStoragePermissions();
  }
};

const removeAccents = (str) => {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"    
  ];
  for (var i=0; i<AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

export default {
  validateEmail: validateEmail,
  getProvinceName: getProvinceName,
  getProvinceId: getProvinceId,
  canOpenPhoneCall: canOpenPhoneCall,
  canOpenSMS: canOpenSMS,
  canOpenEmail: canOpenEmail,
  openPhoneCallUrl: openPhoneCallUrl,
  openSMSAppUrl: openSMSAppUrl,
  openEmailAppUrl: openEmailAppUrl,
  openPhoneCall: openPhoneCall,
  openSMS: openSMS,
  openEmail: openEmail,
  htmlToText: htmlToText,
  fullNameToShort: fullNameToShort,
  trackingAPIPerf: trackingAPIPerf,
  goToURL: goToURL,
  isIPhoneX: isIPhoneX,
  exitApp: exitApp,
  verifyStoragePermissions: verifyStoragePermissions,
  removeAccents: removeAccents,
};
