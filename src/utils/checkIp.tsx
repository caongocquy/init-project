import deviceStore from "./deviceStore";

const getIp = async () => {
      const ipStorage = await deviceStore.get('ip')
      return ipStorage || ''
    };
export default getIp;