import React from 'react';

export interface RatingData {
	[location: string]: number[],
}

export interface DataContextInfo {
	loading: boolean,
	requestReload: () => void,
	ratingData: RatingData,
}

export const DataContext = React.createContext<DataContextInfo>({
	loading: false,
	requestReload: () => {},
	ratingData: {},
});
