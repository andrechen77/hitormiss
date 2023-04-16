import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
// @ts-ignore
import Swiper from 'react-native-screens-swiper';
import LocationPage from './components/LocationPage';
import { RatingData, DataContext } from './contexts/DataContext';
import { useState, useEffect } from 'react';

const diningHalls: { id: string, displayName: string }[] = [
	{ id: "sargent", displayName: "Sarge 🤮" },
	{ id: "elder", displayName: "Elder" },
	{ id: "allison", displayName: "Allison" },
	{ id: "plex_east", displayName: "Plex East" },
	{ id: "plex_west", displayName: "Plex West" },
];

export default function App() {
	const [ratingData, setRatingData] = useState<RatingData>({});
	const [loading, setLoading] = useState(true);

	const getData = async () => {
		try {
			const response = await fetch("https://dif1okje93.execute-api.us-east-2.amazonaws.com/Testing/GetRatings");
			const json = await response.json();
			setRatingData(json);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<DataContext.Provider value={ratingData}>
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
		</DataContext.Provider>
	);
}

const swiperStyles = {
	pillContainer: {
		display: "none",
	},
};
