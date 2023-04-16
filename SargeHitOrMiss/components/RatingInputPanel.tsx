import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import RatingSliderGraph from './RatingSliderGraph';
import { useState } from "react";

const defaultRating = 0.5;

export function RatingInputPanel({ id }: { id: string }) {
	const [rating, setRating] = useState(defaultRating);
	const [comment, setComment] = useState("");
	const [disabled, setDisabled] = useState(false);

	const onSubmit = () => {
		setDisabled(true);
		Alert.alert(`submitting or some sht\nRating: ${rating}${comment && `\nComment: ${comment}`}`);
	}

	const onReset = () => {
		setRating(defaultRating);
		setComment("");
		setDisabled(false);
	}

	return (
		<View style={styles.container}>
			<View style={styles.graph}>
				<RatingSliderGraph id={id} disabled={disabled} rating={rating} setRating={setRating}/>
			</View>
			<View style={styles.commentBoxContainer}>
				<TextInput style={styles.commentBox}
					placeholder={disabled ? "no comment" : "opt. comment (140 chars)"}
					onChangeText={setComment}
					maxLength={140}
					multiline
					value={comment}
					editable={!disabled}
				/>
			</View>
			<View style={styles.submitButton}>
				{disabled ?
					<Button
						onPress={onReset}
						title="Write another rating"
						color="white"
					/>
				:
					<Button
						onPress={onSubmit}
						title="Submit Rating"
						color="white"
					/>
				}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	graph: {
		margin: 15,
	},
	commentBoxContainer: {
		width: 300,
		margin: 15,
	},
	commentBox: {
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 10,
		height: 65,
		fontSize: 24,
		padding: 10,
	},
	submitButton: {
		backgroundColor: "orange",
		borderRadius: 15,
		fontSize: 10,
		fontWeight: "light",
	},
})
