import { StyleSheet, Text, View } from 'react-native';

export default function MenuDisplay({ name }: { name: string }) {
	return (
		<View style={styles.container}>
			<Text>Comments for {name} here</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "red",
	},
});
