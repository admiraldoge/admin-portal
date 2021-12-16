import type { NextPage } from 'next'
import React, {FC, useEffect, useState} from 'react';
import styles from "../../styles/components/Table.module.scss";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import {
	useTable,
	usePagination,
	ColumnInterface,
	Column,
	useGlobalFilter,
	useFilters,
	useAsyncDebounce, useSortBy
} from 'react-table';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import {InputBase, TextField} from "@mui/material";
import {RootState} from "../../redux/store";
import Typography from "@mui/material/Typography";
import SortIcon from '@mui/icons-material/Sort';
import { makeStyles } from '@material-ui/styles';
import {TableColumnInterface} from "../../types/table";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

type TableProps = {
	columns: Column[],
	defaultPageSize: number,
	pageQuery: any,
	entityName: string
}

const columnSearch = (theme:any) => ({
	textField: {
		height: '50px',
		width: '90%',
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingBottom: 0,
		marginTop: 0,
		fontWeight: 200
	},
	input: {
		color: 'white'
	}
});

const useColumnSearchStyles = makeStyles((theme:any) => ({
	root: {
		"& label.Mui-focused, label:not(.Mui-focused)": {

		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": { height: '20px'},
			"&:hover fieldset": { height: '20px'},
			"&.Mui-focused fieldset": {
				borderColor: 'red'
			},
		},
	},
	textField: {
		height: '20px',
		width: '90%',
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingBottom: 0,
		marginTop: 0,
		fontWeight: 500,
		backgroundColor: "red"
	},
	input: {
		height: '24px',
		color: 'black',
		paddingLeft: '4px'
	}
}));

const columnsToFilter = (columns:any) => {
	const res = [] as any;
	columns.forEach((item:any) => {
		res.push({
			columnName: item.accessor,
			searchValue: ""
		})
	})
	return res;
}

const columnsToOrder = (columns:any) => {
	const res = [] as any;
	columns.forEach((item:any) => {
		res.push({
			columnName: item.accessor,
			searchValue: ""
		})
	})
	return res;
}

const Table:FC<TableProps> = ({columns = [], defaultPageSize = 10, pageQuery, entityName}) => {
	const classes = useColumnSearchStyles();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [data, setData] = useState([]);
	const [searchText, setSearchText] = useState("");
	const table = useAppSelector((state: RootState) => state.table[entityName]);
	const [filter, setFilter] = useState(columnsToFilter(columns));
	const [order, setOrder] = useState(columnsToOrder(columns));

	function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter,}) {
		const count = preGlobalFilteredRows.length
		const [value, setValue] = React.useState(globalFilter)
		const onChange = useAsyncDebounce(value => {
			setGlobalFilter(value || undefined)
		}, 500)

		return (
			<Grid container direction={"row"}>
				<TextField
					id="filled-search"
					label="Search field"
					type="search"
					variant="filled"
					value={value || ""}
					onChange={e => {
						setValue(e.target.value);
						onChange(e.target.value);
					}}
					onKeyPress={(e) => {
						if(e.key === 'Enter'){
							updateData();
						}
					}}
					placeholder={`${count} records...`}
				/>
    </Grid>
		)
	}

	function DefaultColumnFilter({column: { filterValue, preFilteredRows, setFilter},}) {
		const count = preFilteredRows.length
		return (
			<TextField
				id="email"
				margin="normal"
				fullWidth={true}
				inputProps={{
					style: {
						padding: 0
					}
				}}
				onChange={e => {
					setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
				}}
				value={filterValue || ''}
			/>
		)
	}


	const defaultColumn = React.useMemo(
		() => ({
			// Let's set up our default Filter UI
			Filter: DefaultColumnFilter,
		}),
		[]
	)

	const {getTableProps,
		getTableBodyProps, prepareRow, page, canPreviousPage, canNextPage, nextPage,
		previousPage, setPageSize, gotoPage, pageCount, headerGroups, preGlobalFilteredRows,
		setGlobalFilter,
		state: { pageIndex, pageSize, filters, globalFilter, sortBy }}
		= useTable(
			{
				columns,
				data: table.items,
				initialState: { pageIndex: 0, pageSize: 10 },
				pageCount: 10,
				manualSortBy: true,
				manualFilters: true,
				manualGlobalFilter: true,
				defaultColumn
			},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	)

	const updateData = () => {
		dispatch(pageQuery(pageIndex+1, pageSize, globalFilter, filters, sortBy))
	}

	useEffect(() => {
		updateData();
	},[pageIndex, filters, globalFilter, sortBy])

	const sortIcon = () => {

	}

	return (
		<div className={styles.ctn}>
			<Grid container justifyContent={"center"} alignContent={"center"} direction={"column"}>
				<Grid item xs={12} sm={6} lg={4}>
					<GlobalFilter
						preGlobalFilteredRows={preGlobalFilteredRows}
						globalFilter={globalFilter}
						setGlobalFilter={setGlobalFilter}
					/>
				</Grid>
				<Grid>
				</Grid>
				<Grid container direction={"row"}>
					<Grid item xs={12}>
						<table className={styles.table}>
							<thead className={styles.head}>
							{headerGroups.map(headerGroup => {
								return (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map((column: any) => {
											//console.log('Column: ',column);
											return (
												<th {...column.getHeaderProps()} style={{width: column.width}}>
													<Grid container direction={"column"} justifyContent={"center"} alignItems={"stretch"}>
														<Grid container direction={"row"} alignItems={"center"} justifyContent={"center"} style={{height: '100%'}}>
															<Grid item xs={9}>
																<Typography variant="h6">{column.render('Header')}</Typography>
															</Grid>
															<Grid item xs={2}>
																<Grid container direction="row" alignItems={"center"} justifyContent={"center"}>
																	{
																		column.canSort ?
																			column.isSorted ?
																				column.isSortedDesc ?
																					<ArrowDropDownIcon style={{cursor: "pointer"}} onClick={()=>column.toggleSortBy()}/>
																					: <ArrowDropUpIcon style={{cursor: "pointer"}} onClick={()=>column.toggleSortBy()}/>
																				: <SortIcon style={{cursor: "pointer"}} onClick={()=>column.toggleSortBy()}/>
																			: null
																	}
																</Grid>
															</Grid>
														</Grid>
														<Grid container direction={"row"} justifyContent={"center"}>
															<Grid item xs={11}>
																<div>{column.canFilter ? column.render('Filter') : null}</div>
															</Grid>
														</Grid>
													</Grid>
												</th>
											)
										})}
									</tr>
								)
							})}
							</thead>
							<tbody>
							{page.map((row, i) => {
								prepareRow(row)
								return (
									<tr {...row.getRowProps()} className={styles.row}>
										{row.cells.map(cell => {
											//console.log('Cell:',cell,cell.column.centered);
											if(typeof cell.value !== 'function') {
												return (
													<td {...cell.getCellProps()} className={styles.cell}>
														<Grid container direction={"row"} justifyContent={"center"}>
															<Grid item xs={11}>
																<Grid container direction={"row"} justifyContent={cell.column.centered ? "center" : "flex-start"}>
																	<Typography variant={"subtitle2"}>{cell.render('Cell')}</Typography>
																</Grid>
															</Grid>
														</Grid>
													</td>
												)
											} else {
												<td>{cell.render('Cell')}</td>
											}
										})}
									</tr>
								)
							})}
							</tbody>
						</table>
					</Grid>
				</Grid>
				<Grid container justifyContent={"center"} alignContent={"flex-end"} direction={"row"} className={styles.paginationRow}>
					<Grid item>
						<ButtonGroup size="small" aria-label="small button group">
							<Button variant="contained" endIcon={<NavigateBeforeIcon />} disabled={!canPreviousPage}
							        onClick={previousPage}
							/>
							{pageIndex !== 0 &&
								<Button key="previous" onClick={() => gotoPage(pageIndex)}>{pageIndex}</Button>
							}
							<Button key="current" variant={"contained"}>{pageIndex+1}</Button>
							{canNextPage && <Button key="next" onClick={() => gotoPage(pageIndex + 2)}>{pageIndex + 2}</Button>}
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
