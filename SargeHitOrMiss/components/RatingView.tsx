import { StyleSheet, View, KeyboardAvoidingView, Text, TextInput, Button, Alert, Platform, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { RatingInputPanel } from './RatingInputPanel';
import IconButton from './IconButton';
import MenuDisplay from './MenuDisplay';
import React, { useState } from 'react';
import SlideUpModal from './SlideUpModal';
import CommentsDisplay from './CommentsDisplay';

export default function RatingView({ name }: { name: string }) {
	const [currentView, setCurrentView] = useState<"main" | "menu" | "comments">("main");

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
					<View style={styles.navButtons}>
						<IconButton name="library-books" onPress={() => setCurrentView("menu")}/>
						<IconButton name="feedback" onPress={() => setCurrentView("comments")}/>
					</View>
					<SlideUpModal visible={currentView === "menu"} onClose={() => setCurrentView("main")}>
						<MenuDisplay name={name}/>
					</SlideUpModal>
					<SlideUpModal visible={currentView === "comments"} onClose={() => setCurrentView("main")}>
						<CommentsDisplay name={name}/>
					</SlideUpModal>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
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
		backgroundColor: "blue",
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
		// backgroundColor: "red",
	},
	navButtons: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
});
