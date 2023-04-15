import { Slider } from "@miblanchard/react-native-slider";
import { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';

export default function RatingSlider() {
	const [rating, setRating] = useState(5);

	return (
		<View style={styles.container}>
			<Slider
				value={rating}
				onValueChange={newRating => setRating(newRating)} // can ingnore type error here; works fine
				minimumValue={0}
				maximumValue={10}
				step={1}
				renderBelowThumbComponent={SliderTip}
			/>
		</View>
	);
}

function SliderTip(value: number, index: number) {
	return (
		<Text>{index}</Text>
	)
}

const styles = StyleSheet.create({
	container: {
		width: 300,
	},
});