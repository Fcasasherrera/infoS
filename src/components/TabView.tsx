import React, {FC, useEffect, useState} from 'react';
import {
  View,
  useWindowDimensions,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {statusColor} from '../constants/colors';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const FirstRoute = () => <View style={styles.bottomCard}></View>;

const SecondRoute = () => <View style={styles.bottomCard}></View>;
export const TabsView: FC<{
  tabs: Array<any>;
  firstRoute?: any;
  secondRoute?: any;
}> = ({tabs, firstRoute = FirstRoute, secondRoute = SecondRoute}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState(tabs);
  useEffect(() => {
    setRoutes(tabs);
  }, [tabs]);
  const _renderTabBar = (props: {
    navigationState: {routes: any[]};
    position: {interpolate: (arg0: {inputRange: any; outputRange: any}) => any};
  }) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route: any, i: any) => {
          return (
            <AnimatedTouchable
              style={[
                styles.tabItem,
                {backgroundColor: index === i ? 'white' : statusColor.blue},
              ]}
              key={i}
              onPress={() => setIndex(i)}>
              <Animated.Text
                style={{color: index === i ? statusColor.blue : 'white'}}>
                {route.title}
              </Animated.Text>
            </AnimatedTouchable>
          );
        })}
      </View>
    );
  };
  const renderScene = SceneMap({
    '1': firstRoute,
    '2': secondRoute,
  });
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={_renderTabBar}
      initialLayout={{width: layout.width}}
    />
  );
};
export const shadow = {
  shadowColor: '#171717',
  shadowOffset: {width: -1, height: 5},
  shadowOpacity: 0.25,
  shadowRadius: 6,
  elevation: 8,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 24,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    ...shadow,
  },
  bottomCard: {
    flex: 1,
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    padding: 24,
    ...shadow,
  },
});
