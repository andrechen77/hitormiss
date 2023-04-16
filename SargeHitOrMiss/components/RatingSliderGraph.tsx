import { Chart, Line, Area } from "react-native-responsive-linechart";
import { Slider } from "@miblanchard/react-native-slider";
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

const chartStyle = {
	height: 200,
	width: 300,
};
const color = "orange";
const lineTheme = {
	stroke: {
		color: color,
		width: 3,
	}
};
const areaTheme = {
	gradient: {
		from: {
			color: color,
			opacity: 1,
		},
		to: {
			color: color,
			opacity: 0,
		},
	},
};
const smoothing = "bezier";
const tension = 0.3;

interface RatingSliderGraphProps {
	disabled: boolean,
	rating: number,
	setRating: (newRating: number) => void,
}

export default function RatingSliderGraph({ disabled, rating, setRating }: RatingSliderGraphProps) {
	return (
		<View>
			{/* ignore type error about Chart's children; works fine */}
			<Chart style={chartStyle} data={data} xDomain={{ min: 0, max: 7 }} yDomain={{ min: -1, max: 20 }} disableGestures>
				<Line smoothing={smoothing} tension={tension} theme={lineTheme}/>
				<Area smoothing={smoothing} tension={tension} theme={areaTheme}/>
			</Chart>
			<View style={styles.slider}>
				<Slider
					disabled={disabled}
					value={rating}
					onValueChange={newRating => setRating(newRating)} // can ingnore type error here; works fine
					minimumValue={0}
					maximumValue={7}
					step={1}
					maximumTrackTintColor={color}
					minimumTrackTintColor={color}
					thumbTintColor={color}
					thumbStyle={disabled ? { opacity: 0.5 } : {}}
					renderBelowThumbComponent={SliderTip}
					thumbTouchSize={{ width: 50, height: 80 }}
				/>
			</View>
			<View style={styles.ratingBoxEndpoints}>
				<Text style={styles.text}>Miss</Text>
				<Text style={styles.text}>Hit</Text>
			</View>
		</View>
	)
}

function SliderTip(value: number, index: number) {
	return (
		<View style={styles.tip}>
			<Text style={styles.text}>{index}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	ratingBoxEndpoints: {
		width: 300,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	slider: {
		width: 300,
		marginTop: -29,
		marginBottom: -15,
	},
	tip: {
		transform: [{ translateX: -5}],
	},
	text: {
		fontSize: 24,
		fontWeight: "200",
	}
});
