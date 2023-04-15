import { Chart, Line, Area } from "react-native-responsive-linechart";

const chartStyle = {
	height: 200,
	width: 300,
};
const color = "orange";
const lineTheme = {
	stroke: {
		color: color,
		width: 3,
	}
};
const areaTheme = {
	gradient: {
		from: {
			color: color,
			opacity: 1,
		},
		to: {
			color: color,
			opacity: 0.2,
		},
	},
};
const smoothing = "bezier";
const tension = 0.3;

export default function RatingsGraph({ data }: { data: {x: Number, y: Number }[] }) {
	return (
		/* ignore type error about Chart's children; works fine */
		<Chart style={chartStyle} data={data} xDomain={{ min: 0, max: 10 }} yDomain={{ min: 0, max: 20 }}>
			<Line smoothing={smoothing} tension={tension} theme={lineTheme}/>
			<Area smoothing={smoothing} tension={tension} theme={areaTheme}/>
		</Chart>
	);
}
