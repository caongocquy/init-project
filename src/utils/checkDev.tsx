import deviceStore from "./deviceStore";

type ENVType = 'DEV' | 'PRODUCTION' | 'STAGING';
const checkDev = async () => {
  const env: ENVType = (await deviceStore.get('ENV')) || (__DEV__ ? 'DEV' : 'PRODUCTION');
 
  return env;
}
export default checkDev;