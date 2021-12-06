import type { NextPage } from 'next'
import React, {FC, useEffect, useState} from 'react';
import styles from "../../styles/components/Table.module.scss";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useTable, usePagination } from 'react-table';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import {InputBase, TextField} from "@mui/material";
import {RootState} from "../../redux/store";

type TableProps = {
	columns: any[],
	defaultPageSize: number,
	pageQuery: any,
	entityName: string
}

const Table:FC<TableProps> = ({columns = [], defaultPageSize = 10, pageQuery, entityName}) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [data, setData] = useState([]);
	const [searchText, setSearchText] = useState("");
	const table = useAppSelector((state: RootState) => state.table[entityName]);

	const data2 = React.useMemo(() => [{loc: "A"},{loc: "B"},{loc: "C"},{loc: "D"},], [])

	const {getTableProps,
		getTableBodyProps, prepareRow, page, canPreviousPage, canNextPage, nextPage,
		previousPage, setPageSize, gotoPage, pageCount, headerGroups,
		state: { pageIndex, pageSize }} = useTable({columns, data: table.items, initialState: { pageIndex: 0, pageSize: 10 }, pageCount: 10}, usePagination)

	const updateData = () => {
		dispatch(pageQuery(pageIndex+1, pageSize, searchText, [], []))
	}

	useEffect(() => {
		updateData();
	},[pageIndex])


	return (
		<div className={styles.ctn}>
			<Grid container justifyContent={"center"} alignContent={"center"} direction={"column"}>
				<Grid>
					<TextField
						id="filled-search"
						label="Search field"
						type="search"
						variant="filled"
						value={searchText}
						onChange={(e) => setSearchText(e.currentTarget.value)}
						onKeyPress={(e) => {
							if(e.key === 'Enter'){
								updateData();
							}
						}}
					/>
				</Grid>
				<Grid>
					<pre>
        <code>
          {JSON.stringify(
	          {
		          pageIndex,
		          pageSize,
		          pageCount,
		          canNextPage,
		          canPreviousPage,
	          },
	          null,
	          2
          )}
        </code>
      </pre>
				</Grid>
				<Grid>
					<table>
						<thead>
						{headerGroups.map(headerGroup => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<th {...column.getHeaderProps()}>{column.render('Header')}</th>
								))}
							</tr>
						))}
						</thead>
						<tbody>
						{page.map((row, i) => {
							prepareRow(row)
							console.log('Row',row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map(cell => {
										return (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										)
									})}
								</tr>
							)
						})}
						</tbody>
					</table>
				</Grid>
				<Grid container justifyContent={"center"} alignContent={"center"} direction={"row"}>
					<Grid>
						<ButtonGroup size="small" aria-label="small button group">
							<Button variant="contained" endIcon={<NavigateBeforeIcon />} disabled={!canPreviousPage}
							        onClick={previousPage}
							/>
							{pageIndex !== 0 &&
								<Button key="previous" onClick={() => gotoPage(pageIndex-1)}>{pageIndex - 1}</Button>
							}
							<Button key="current" variant={"contained"}>{pageIndex}</Button>
							<Button key="next" onClick={() => gotoPage(pageIndex+1)}>{pageIndex+1}</Button>
							<Button variant="contained" endIcon={<NavigateNextIcon />}
							        disabled={!canNextPage}
							        onClick={nextPage}
							/>
						</ButtonGroup>
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default Table
