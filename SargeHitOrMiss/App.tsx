import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Swiper from 'react-native-screens-swiper'; // ignore missing module declaration error; seems to work fine
import PageSargent from './components/PageSargent';
import PageElder from './components/PageElder';

export default function App() {
  return (
    <Swiper
      data={[
        {
          tabLabel: "Sargent",
          component: PageSargent,
        },
        {
          tabLabel: "Elder",
          component: PageElder,
        },
      ]}
      isStaticPills={false}
      style={swiperStyles}
    />
  );
}

const swiperStyles = {
  pillContainer: {
    display: "none",
  },
};
