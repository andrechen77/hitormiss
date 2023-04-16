import { StyleSheet, View, KeyboardAvoidingView, Text, TextInput, Button, Alert, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { RatingInputPanel } from './RatingInputPanel';

export default function RatingView({ name }: { name: string }) {
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
						<RatingInputPanel/>
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
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		color: "black",
		fontSize: 72,
		fontWeight: "200",
	},
	inputPanel: {
		flex: 3,
		alignContent: "center",
		justifyContent: "center",
	},
});
