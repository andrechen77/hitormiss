import { FlatList, StyleSheet, Text, View } from 'react-native';
import { MenuItem, MenuData, DataContext } from '../contexts/DataContext'
import { useContext } from 'react';

export default function MenuDisplay({ id }: { id: string }) {
	const { menuData } = useContext(DataContext);

	const data: MenuItem[] = [];
	if (menuData.hasOwnProperty(id)) {
		for (const meal in menuData[id]) {
			for (const item of menuData[id][meal]) {
				data.push(item);
			}
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.titleBox}>
				<Text style={styles.title}>Menu Items</Text>
			</View>
			<FlatList
				data={data}
				renderItem={MenuItemCard}
			/>
		</View>
	);
}

function MenuItemCard({ item }: { item: MenuItem }) {
	return (
		<View style={styles.card}>
			<Text style={styles.menuItemName}>{item}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "lightgray",
	},
	card: {
		borderRadius: 10,
		backgroundColor: "white",
		margin: 10,
		padding: 10,
	},
	titleBox: {
		padding: 10,
	},
	title: {
		fontSize: 36,
		textAlign: "center",
		fontWeight: "200",
	},
	menuItemName: {
		fontSize: 24,
		fontWeight: "200",
	},
});
