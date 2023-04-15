import RatingsGraph from './RatingsGraph';
import RatingSlider from './RatingSlider';
import { View, Text, StyleSheet } from 'react-native';

const data = [
	{ x: 0, y: 0 },
	{ x: 1, y: 1 },
	{ x: 2, y: 3 },
	{ x: 3, y: 6 },
	{ x: 4, y: 10 },
	{ x: 5, y: 15 },
	{ x: 6, y: 10 },
	{ x: 7, y: 6 },
];

export default function RatingSliderGraph({ rating, setRating }: { rating: number, setRating: (newRating: number) => void }) {
	return (
		<View>
			<RatingsGraph data={data}/>
			<RatingSlider rating={rating} setRating={setRating}/>
			<View style={styles.ratingBoxEndpoints}>
				<Text>Miss</Text>
				<Text>Hit</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	ratingBoxEndpoints: {
		width: 300,
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
