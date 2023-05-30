import { StackNavigationOptions } from '@react-navigation/stack';
import Modal from "./modal-1";

const optionsDefault: StackNavigationOptions = {};

export default {
    modal1: {
      component: Modal,
      name: 'modal1',
      params: { isLightStatusBar: false },
      options: { ...optionsDefault },
    },
}