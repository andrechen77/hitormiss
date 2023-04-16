import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Swiper from 'react-native-screens-swiper'; // ignore missing module declaration error; seems to work fine
import LocationPage from './components/LocationPage';

const diningHalls: { id: string, displayName: string }[] = [
	{ id: "sarge", displayName: "Sarge 🤮" },
	{ id: "elder", displayName: "Elder" },
	{ id: "allison", displayName: "Allison" },
	{ id: "plex_east", displayName: "Plex East" },
	{ id: "plex_west", displayName: "Plex West" },
];

export default function App() {
	return (
		<Swiper
			data={
				diningHalls.map(({ id, displayName }) => {
					return {
						component: LocationPage,
						props: { id: id, displayName: displayName }
					};
				})
			}
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
