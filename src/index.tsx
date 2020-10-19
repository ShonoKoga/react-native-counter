import { NativeModules } from 'react-native';

type CounterType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Counter } = NativeModules;

export default Counter as CounterType;
