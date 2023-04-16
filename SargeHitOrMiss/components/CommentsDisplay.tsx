import { FlatList, StyleSheet, Text, View } from 'react-native';

interface Comment {
	time: Date,
	content: string,
}

const data: Comment[] = [
	{ time: new Date(), content: "chef jet busted my ass chef jet busted my ass chef jet busted my ass chef jet busted my ass"},
	{ time: new Date(), content: "chef jet busted my ass chef jet busted my ass chef jet busted my ass chef jet busted my ass"},
	{ time: new Date(), content: "chef jet busted my ass chef jet busted my ass chef jet busted my ass chef jet busted my ass"},
	{ time: new Date(), content: "chef jet busted my ass chef jet busted my ass chef jet busted my ass chef jet busted my ass"},
];

export default function CommentsDisplay({ name }: { name: string }) {
	return (
		<View style={styles.container}>
			<View style={styles.titleBox}>
				<Text style={styles.title}>Comments</Text>
			</View>
			<FlatList
				data={data}
				renderItem={CommentCard}
			/>
		</View>
	);
}

function CommentCard({ item }: { item: Comment }) {
	return (
		<View style={styles.card}>
			<View style={{ flex: 5 }}>
				<Text style={styles.commentContent}>{item.content}</Text>
			</View>
			<View style={{ flex: 1 }}>
				<Text style={styles.commentTime}>{item.time.toLocaleTimeString()}</Text>
			</View>
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
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	titleBox: {
		padding: 10,
	},
	title: {
		fontSize: 36,
		textAlign: "center",
		fontWeight: "200",
	},
	commentContent: {
		fontSize: 24,
	},
	commentTime: {
		fontSize: 16,
	},
});
