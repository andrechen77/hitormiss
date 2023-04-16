import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, TouchableHighlight } from 'react-native';

export default function IconButton({ name, onPress }: { name: string, onPress: () => void }) {
	return (
		<TouchableHighlight
			onPress={onPress}
			activeOpacity={1}
			underlayColor="#e2e2e2"
			style={styles.button}
		>
			<Icon name={name} size={50} color="orange" />
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	button: {
		width: 50,
		height: 50,
	},
})
