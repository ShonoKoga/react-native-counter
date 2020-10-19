import { NativeModules, NativeEventEmitter } from 'react-native';

type TryNativeModulesType = {
  multiply(a: number, b: number): Promise<number>;
};

type Counter = {
  initialCount: number;
  getCount: (callback: (count: number) => void) => void;
  decrement: () => Promise<string>;
  increment: () => void;
};

const { TryNativeModules, Counter } = NativeModules;
const counterEventEmitter = new NativeEventEmitter(Counter);

export default {
  TryNativeModules: TryNativeModules as TryNativeModulesType,
  Counter: { ...(Counter as Counter), EventEmitter: counterEventEmitter },
};
