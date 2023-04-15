import { StyleSheet, View, Text } from 'react-native';

export default function RatingView({ name }: { name: string}) {
	return (
		<View style={styles.container}>
			<View style={styles.titleBox}>
				<Text style={styles.title}>{name}</Text>
			</View>
			<View style={styles.ratingBox}>
				<Text style={{ fontSize: 72, }}>Ratings go here</Text>
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
	title: {
		color: "red",
		fontSize: 72,
	},
});
