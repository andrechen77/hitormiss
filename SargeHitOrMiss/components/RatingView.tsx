import { StyleSheet, View, KeyboardAvoidingView, Text, TextInput, Button, Alert, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from "react";
import RatingSliderGraph from './RatingSliderGraph';

export default function RatingView({ name }: { name: string }) {
	const [rating, setRating] = useState(5);
	const [comment, setComment] = useState("");

	const onButtonPress = () => {
		Alert.alert(`submitting or some sht\nRating: ${rating}${comment && `\nComment: ${comment}`}`);
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.innerContainer}>
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
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	innerContainer: {
		flex: 1,
	},
	titlePanel: {
		flex: 1,
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
