import React, {useEffect, useState} from "react";
import Header from "next/head";
import Grid from "@mui/material/Grid";

type gridLayoutProps = {
	columns?: 1 | 2 | 3 | 4 | 6,
	children: React.ReactElement[]
};

const GridLayout = ({columns = 1, children}:gridLayoutProps) => {

	console.log(':::FC props:',columns,children)

	const elements = () => {
		const res = [];
		const rows = Math.ceil(children.length / columns);
		console.log(':::Rows:',rows);
		console.log(':::Columns:',columns);
		for(let i = 0; i < rows; i++) {
			const row = [];
			for(let j = 0; j < columns; j++) {
				if(i*columns + j >= children.length) continue;
				const cell = <Grid key={`grid-cell-${i}-${j}`} item xs={12} sm={(12/columns)-1}>{children[(i * columns) + j]}</Grid>;
				row.push(cell);
			}
			console.log(i,'Pushing ',row.length, 'elements');
			res.push(
				<Grid key={`grid-cell-${i}`} container direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
					{row}
				</Grid>
			)
		}
		return res;
	}

	return (
		<Grid container direction={'column'}>
			{elements()}
		</Grid>
	)
}
export default GridLayout;
