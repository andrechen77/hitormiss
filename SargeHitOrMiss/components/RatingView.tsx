import { StyleSheet, View, Text } from 'react-native';
import RatingsGraph from './RatingsGraph';
import RatingSlider from './RatingSlider';

const data = [
	{ x: 0, y: 0 },
	{ x: 1, y: 1 },
	{ x: 2, y: 3 },
	{ x: 3, y: 6 },
	{ x: 4, y: 10 },
	{ x: 5, y: 15 },
	{ x: 6, y: 10 },
	{ x: 7, y: 6 },
	{ x: 8, y: 3 },
	{ x: 9, y: 1 },
	{ x: 10, y: 0 },
];

export default function RatingView({ name }: { name: string}) {
	return (
		<View style={styles.container}>
			<View style={styles.titleBox}>
				<Text style={styles.title}>{name}</Text>
			</View>
			<View style={styles.ratingBox}>
				<RatingsGraph data={data}/>
				<RatingSlider/>
				<View style={styles.ratingBoxEndpoints}>
					<Text>Miss</Text>
					<Text>Hit</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleBox: {
		flex: 2,
		backgroundColor: "green",
		alignItems: "center",
		justifyContent: "center",
	},
	ratingBox: {
		flex: 3,
		backgroundColor: "red",
		alignItems: "center",
		justifyContent: "center",
	},
	ratingBoxEndpoints: {
		width: 300,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	title: {
		color: "red",
		fontSize: 72,
	},
});
