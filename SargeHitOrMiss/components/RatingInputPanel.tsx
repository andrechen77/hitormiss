import { Button, StyleSheet, TextInput, View, ActivityIndicator } from 'react-native';
import RatingSliderGraph from './RatingSliderGraph';
import { useState } from "react";

const defaultRating = 0.5;

interface Review {
	dininghall: string,
	rating: number,
	undercooked: boolean,
	tweet: string,
}

async function sendReview(review: Review): Promise<boolean> {
	try {
		const response = await fetch(
			"https://dif1okje93.execute-api.us-east-2.amazonaws.com/Testing/InsertRating",
			{
				method: "POST",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(review),
			},
		);
		const json = await response.json();
		// Alert.alert(JSON.stringify(json));
		return true;
	} catch (error) {
		return false;
	}
}

export function RatingInputPanel({ id }: { id: string }) {
	const [rating, setRating] = useState(defaultRating);
	const [comment, setComment] = useState("");
	const [disabled, setDisabled] = useState(false);
	const [sending, setSending] = useState(false);

	const onSubmit = () => {
		setDisabled(true);
		setSending(true);
		const review: Review = {
			dininghall: id,
			rating: rating,
			undercooked: false,
			tweet: comment,
		};
		sendReview(review).then((success) => {
			setSending(false);
		});
	};

	const onReset = () => {
		setComment("");
		setDisabled(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.graph}>
				<RatingSliderGraph id={id} disabled={disabled} rating={rating} setRating={setRating}/>
			</View>
			<View style={styles.commentBoxContainer}>
				<TextInput
					style={[styles.commentBox, disabled && styles.grayedText]}
					placeholder={"opt. comment (140 chars)"}
					onChangeText={setComment}
					maxLength={140}
					multiline
					value={disabled && comment === "" ? "no comment" : comment}
					editable={!disabled}
				/>
			</View>
			{sending ?
				<ActivityIndicator style={styles.activityIndicator}/>
			:
				<View style={styles.submitButton}>
					{disabled ?
						<Button
							onPress={onReset}
							title="Write another review"
							color="white"
						/>
					:
						<Button
							onPress={onSubmit}
							title="Submit review"
							color="white"
						/>
					}
				</View>
			}
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
	grayedText: {
		opacity: 0.25,
	},
	activityIndicator: {
		margin: 7,
	},
	submitButton: {
		backgroundColor: "orange",
		borderRadius: 15,
		fontSize: 10,
		fontWeight: "light",
	},
})
