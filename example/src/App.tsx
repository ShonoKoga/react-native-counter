/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import NativeModules from 'react-native-counter';

const { Counter } = NativeModules;

export default function App() {
  const [result, setResult] = React.useState<number>(Counter.initialCount);

  React.useEffect(() => {
    Counter.EventEmitter.addListener('onIncrement', ({ count }) =>
      setResult(count)
    );
    Counter.EventEmitter.addListener('onDecrement', ({ count }) =>
      setResult(count)
    );

    return () => {
      Counter.EventEmitter.removeListener('onIncrement', ({ count }) =>
        setResult(count)
      );
      Counter.EventEmitter.removeListener('onDecrement', ({ count }) =>
        setResult(count)
      );
    };
  }, []);

  const handleIncrement = React.useCallback(() => {
    Counter.increment();
  }, []);

  const handleDecrement = React.useCallback(() => {
    Counter.decrement();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <View style={{ marginTop: 20 }}>
        <Button title="Increment" onPress={handleIncrement} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button
          title="Decrement"
          onPress={handleDecrement}
          disabled={result === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
