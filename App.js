import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler'
const SIZE= 100.00;

export default function App() {

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
      <PanGestureHandler>
          <Animated.View style={styles.square}/>
      </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square:{
    height:SIZE,
    width:SIZE,
    backgroundColor:'rgba(0,0,256,0.5)',
    borderRadius:20,
  }
});
