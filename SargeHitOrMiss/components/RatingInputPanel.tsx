import { Button, StyleSheet, TextInput, View, ActivityIndicator, Text } from 'react-native';
import RatingSliderGraph from './RatingSliderGraph';
import { useState, useContext } from "react";
import { Switch } from "react-native";
import { DataContext } from '../contexts/DataContext';

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
					"Accept": "text",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(review),
			},
		);
		// const msg = await response.text();
		return true;
	} catch (error) {
		return false;
	}
}

export function RatingInputPanel({ id }: { id: string }) {
	const [rating, setRating] = useState(defaultRating);
	const [comment, setComment] = useState("");
	const [undercooked, setUndercooked] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [sending, setSending] = useState(false);
	const { requestReload } = useContext(DataContext);

	const onSubmit = () => {
		setDisabled(true);
		setSending(true);
		const review: Review = {
			dininghall: id,
			rating: rating,
			undercooked: undercooked,
			tweet: comment,
		};
		sendReview(review).then((success) => {
			setSending(false);
			if (success) {
				requestReload();
			}
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
			{id === "sargent" && <View style={styles.undercookedIndicator}>
				<Switch
					disabled={disabled}
					onValueChange={setUndercooked}
					value={undercooked}
					trackColor={{ false: "orange", true: "orange" }}
				/>
				<Text style={styles.labelStyle}>Undercooked</Text>
			</View>}
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
	undercookedIndicator: {
		width: 300,
		margin: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	labelStyle: {
		fontSize: 18,
		fontWeight: "200",
		margin: 10
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
