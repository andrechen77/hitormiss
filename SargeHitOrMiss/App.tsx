import { StatusBar } from 'expo-status-bar';
// @ts-ignore
import Swiper from 'react-native-screens-swiper';
import LocationPage from './components/LocationPage';
import { RatingData, MenuData, DataContext } from './contexts/DataContext';
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
	const [menuData, setMenuData] = useState<MenuData>({});
	const [loading, setLoading] = useState(true);

	const loadData = async () => {
		setLoading(true);
		try {
			const ratingsResponse = await fetch("https://dif1okje93.execute-api.us-east-2.amazonaws.com/Testing/GetRatings");
			const ratingsJson = await ratingsResponse.json();
			setRatingData(ratingsJson);

			const menuResponse = await fetch("https://dif1okje93.execute-api.us-east-2.amazonaws.com/GetMenus");
			const menuJson = await menuResponse.json();
			setMenuData(menuJson);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<DataContext.Provider
			value={{
				loading: loading,
				requestReload: loadData,
				ratingData: ratingData,
				menuData: menuData,
			}}
		>
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
