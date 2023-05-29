import AsyncStorage from '@react-native-community/async-storage';

async function get(key: string, defaultValue: any = undefined) {
  let value = defaultValue;
  try {
    const strValue = await AsyncStorage.getItem(key || '');
    if (strValue) value = JSON.parse(strValue);
  } catch (e) { /** */ }
  return value;
}

async function set(key: string, value: string | Object) {
  try {
    const strValue = JSON.stringify(value);
    await AsyncStorage.setItem(key || '', strValue);
  } catch (e) { /** */ }
}

async function remove(key: string) {
  try { await AsyncStorage.removeItem(key || ''); } catch (e) { /** */ }
}

export default { get, set, remove };
