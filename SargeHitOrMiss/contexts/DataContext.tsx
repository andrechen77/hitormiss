import React from 'react';

export interface RatingData {
	[location: string]: number[],
}

export const DataContext = React.createContext<RatingData>({});
