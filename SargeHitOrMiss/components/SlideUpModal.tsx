import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

interface SlideUpModalProps {
	visible: boolean,
	onClose: () => void,
	children: any,
}

export default function SlideUpModal({ visible, onClose, children }: SlideUpModalProps) {
	return (
		<Modal transparent visible={visible} animationType="slide">
			<View style={styles.modalContainer}>
				<View style={styles.titleGlassPanel}>
					<TouchableWithoutFeedback onPress={onClose}>
						<View style={{ flex: 1 }}></View>
					</TouchableWithoutFeedback>
				</View>
				<View style={styles.titleActualPanel}>
					{children}
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
	},
	/* The titleGlassPanel and titleActualPanel Views are to perfectly recreate the proportions of
	the title panel and the input panel + buttons on the main screen. */
	titleGlassPanel: {
		flex: 1,
	},
	titleActualPanel: {
		flex: 4,
	},
});
