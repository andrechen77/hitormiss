import { Slider } from "@miblanchard/react-native-slider";
import { View, Text, StyleSheet } from 'react-native';

export default function RatingSlider({ rating, setRating }: { rating: number, setRating: (newRating: number) => void }) {
	return (
		<View style={styles.container}>
			<Slider
				value={rating}
				onValueChange={newRating => setRating(newRating)} // can ingnore type error here; works fine
				minimumValue={0}
				maximumValue={7}
				step={1}
				renderBelowThumbComponent={SliderTip}
			/>
		</View>
	);
}

function SliderTip(value: number, index: number) {
	return (
		<View style={styles.tip}>
			<Text>{index}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: 300,
		marginTop: -29,
		marginBottom: -15,
	},
	tip: {
		transform: [{ translateX: -4}],
	},
});