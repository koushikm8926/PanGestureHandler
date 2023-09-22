import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler'


const SIZE= 100.0;
const CIRCLE_REDIUS= SIZE*2;
export default function App() {

  const translateX= useSharedValue(0)
  const translateY= useSharedValue(0)

  const panGestureEvent = useAnimatedGestureHandler({
    onStart:(event, context)=>{
      context.translateX= translateX.value
      context.translateY= translateY.value
    },
    onActive:(event, context)=>{
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd:()=>{

      const distance = Math.sqrt(translateX.value**2 + translateY.value**2);

      if(distance< CIRCLE_REDIUS){
        translateX.value=withSpring(0);
        translateY.value=withSpring(0);
      }
     
    }

  })


  const reanimatedStyle= useAnimatedStyle(()=>{
    return{
      transform:[
        {
        translateX:translateX.value,
      },
      {
        translateY:translateY.value,
      },
    ]
    }
  })


  return (
    <View style={styles.container}>
      <GestureHandlerRootView >
        <View style={styles.circle}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.square, reanimatedStyle]}/>
      </PanGestureHandler>
        </View>
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
    borderRadius:50,
  },
  circle:{
    height:CIRCLE_REDIUS *1.9,
    width:CIRCLE_REDIUS *1.9,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:CIRCLE_REDIUS,
    borderWidth:5,
    borderColor:'rgba(0,0,256,0.5)', 
  }
});
