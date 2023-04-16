import { Chart, Line, Area, ChartDataPoint } from "react-native-responsive-linechart";
import { Slider } from "@miblanchard/react-native-slider";
import { View, Text, StyleSheet } from 'react-native';
import { DataContext, RatingData } from '../contexts/DataContext';
import { useContext } from 'react';

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
const graphCeiling = 4;

interface RatingSliderGraphProps {
	id: string,
	disabled: boolean,
	rating: number,
	setRating: (newRating: number) => void,
}

export default function RatingSliderGraph({ id, disabled, rating, setRating }: RatingSliderGraphProps) {
	const ratingData = useContext(DataContext);
	// const ratingData = {
	// 	"allison": [],
	// 	"sargent": [0.2, 0.7],
	// };
	const frequencies = calculateFrequencies(ratingData, id);

	return (
		<View>
			{/* ignore type error about Chart's children; works fine */}
			<Chart style={chartStyle} data={frequencies} xDomain={{ min: 0, max: 1 }} yDomain={{ min: 0, max: graphCeiling }} disableGestures>
				<Line smoothing={smoothing} tension={tension} theme={lineTheme}/>
				<Area smoothing={smoothing} tension={tension} theme={areaTheme}/>
			</Chart>
			<View style={styles.slider}>
				<Slider
					disabled={disabled}
					value={rating}
					onValueChange={newRating => setRating(newRating)} // can ingnore type error here; works fine
					minimumValue={0}
					maximumValue={1}
					step={0.01}
					maximumTrackTintColor={color}
					minimumTrackTintColor={color}
					thumbTintColor={color}
					thumbStyle={disabled ? { opacity: 0.5 } : {}}
					renderBelowThumbComponent={SliderTip}
					thumbTouchSize={{ width: 50, height: 80 }}
					trackMarks={Array.from({ length: 6 }, (v, i) => i * 0.2)}
					renderTrackMarkComponent={i => <View style={styles.trackMark}/>}
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
			<Text style={styles.text}>{index.toFixed(2)}</Text>
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
		marginTop: -20,
		marginBottom: -15,
	},
	trackMark: {
		height: 10,
		width: 3,
		backgroundColor: color,
		transform: [{ translateX: 8}],
	},
	tip: {
		transform: [{ translateX: -30}],
		width: 60,
	},
	text: {
		fontSize: 24,
		fontWeight: "200",
		textAlign: "center",
	},
});

function calculateFrequencies(ratingData: RatingData, id: string): ChartDataPoint[] {
	const frequencies = [];
	for (let x = 0; x <= 1; x += 0.01) {
		frequencies.push({ x: x, y: 0 });
	}
	if (ratingData.hasOwnProperty(id) && ratingData[id].length > 0) {
		for (const rating of ratingData[id]) {
			for (const point of frequencies) {
				const delta = Math.pow(Math.E, -200 * Math.pow(rating - point.x, 2)); // factor of 50 because we choose SD = 0.05
				point.y += delta;
			}
		}
		/* Each rating added an area of 0.05sqrt(2pi)a to the total area. In order to normalize the
		total area under the graph to be 1, we divide the whole graph by n*0.05sqrt(2pi). Be very
		careful that we ensure that there is at least one data point. */
		const totalArea = ratingData[id].length * 0.12533141;
		for (const point of frequencies) {
			point.y /= totalArea;
			point.y = Math.min(point.y, graphCeiling);
		}
	}
	return frequencies;
}
