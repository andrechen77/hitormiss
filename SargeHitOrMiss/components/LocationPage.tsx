import { StyleSheet, View, KeyboardAvoidingView, Text, TextInput, Button, Alert, Platform, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { RatingInputPanel } from './RatingInputPanel';
import IconButton from './IconButton';
import MenuDisplay from './MenuDisplay';
import React, { useContext, useState, useEffect } from 'react';
import SlideUpModal from './SlideUpModal';
import CommentsDisplay from './CommentsDisplay';
import { DataContext } from '../contexts/DataContext';

export default function LocationPage({ id, displayName }: { id: string, displayName: string }) {
	const { requestReload } = useContext(DataContext);
	const [currentView, setCurrentView] = useState<"main" | "menu" | "comments">("main");
	const [hideNavButtons, setHideNavButtons] = useState(false);

	useEffect(() => {
		const showListener = Keyboard.addListener("keyboardWillShow", () => {
			setHideNavButtons(true)
		});
		const hideListener = Keyboard.addListener("keyboardWillHide", () => {
			setHideNavButtons(false)
		});
		return () => {
			showListener.remove();
			hideListener.remove();
		}
	});

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.innerContainer}>
					<View style={styles.titlePanel}>
						<Text style={styles.title}>{displayName}</Text>
					</View>
					<View style={styles.inputPanel}>
						<RatingInputPanel id={id}/>
					</View>
					<View style={[styles.navButtons]}>
						{!hideNavButtons && <>
							<IconButton name="library-books" onPress={() => setCurrentView("menu")}/>
							<IconButton name="feedback" onPress={() => setCurrentView("comments")}/>
							<IconButton name="replay" onPress={requestReload}/>
						</>}
					</View>
					<SlideUpModal visible={currentView === "menu"} onClose={() => setCurrentView("main")}>
						<MenuDisplay id={id}/>
					</SlideUpModal>
					<SlideUpModal visible={currentView === "comments"} onClose={() => setCurrentView("main")}>
						<CommentsDisplay id={id}/>
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
	navButtons: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
});
