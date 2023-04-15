import { StyleSheet, View, KeyboardAvoidingView, Text, TextInput, Button, Alert } from 'react-native';
import { useState } from "react";
import RatingSliderGraph from './RatingSliderGraph';

export default function RatingView({ name }: { name: string}) {
	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState("");

	const onButtonPress = () => {
		Alert.alert(`submitting or some sht\nRating: ${rating}${comment && `\nComment: ${comment}`}`);
	}

	return (
		<View style={styles.container}>
			<View style={styles.titlePanel}>
				<Text style={styles.title}>{name}</Text>
			</View>
			<View style={styles.inputPanel}>
				<View style={styles.graph}>
					<RatingSliderGraph rating={rating} setRating={setRating}/>
				</View>
				<View style={styles.commentBox}>
					<TextInput
						placeholder="opt. comment (140 chars)"
						onChangeText={setComment}
						value={comment}
					/>
				</View>
				<View style={styles.submitButton}>
					<Button
						onPress={onButtonPress}
						title="Submit Rating"
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titlePanel: {
		flex: 2,
		backgroundColor: "green",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		color: "red",
		fontSize: 72,
	},
	inputPanel: {
		flex: 3,
		backgroundColor: "red",
		alignItems: "center",
		justifyContent: "center",
	},
	graph: {
		margin: 15,
	},
	commentBox: {
		borderRadius: 5,
		border: 10,
		backgroundColor: "white",
		width: 300,
		margin: 15,
	},
	submitButton: {
		backgroundColor: "blue",
		borderRadius: 15,
	},
});
