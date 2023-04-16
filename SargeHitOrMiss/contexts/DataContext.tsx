import React from 'react';

export interface RatingData {
	[location: string]: number[],
}

export type MenuItem = string;

export interface MenuData {
	[location: string]: { [meal: string]: MenuItem[] },
}

export interface DataContextInfo {
	loading: boolean,
	requestReload: () => void,
	ratingData: RatingData,
	menuData: MenuData,
}

export const DataContext = React.createContext<DataContextInfo>({
	loading: false,
	requestReload: () => {},
	ratingData: {},
	menuData: {},
});
