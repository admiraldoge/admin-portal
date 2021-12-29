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
import {
	InputBase,
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Table as MuiTable, Pagination
} from "@mui/material";
import {RootState} from "../../redux/store";
import Typography from "@mui/material/Typography";
import SortIcon from '@mui/icons-material/Sort';
import { makeStyles, withStyles } from '@material-ui/styles';
import {TableColumnInterface} from "../../types/table";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteRow} from "../../services/tableService";
import Checkbox from "@mui/material/Checkbox";
import {width} from "@mui/system";

type TableProps = {
	subject: any,
	columns: Column[],
	defaultPageSize: number,
	pageQuery?: any,
	queryParams?: any,
	serverData?: boolean,
	data?: [],
	globalFilterEnabled?: boolean,
	onRowCreate?: any,
	onRowDelete?: any,
	onRowUpdate?: any,
	onRowEnable?: any
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
			"& fieldset": { height: '24px'},
			"&:hover fieldset": { height: '24px'},
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

const Table:FC<TableProps> = (
	{
		subject,
		columns = [],
		defaultPageSize = 10,
		pageQuery,
		queryParams = [],
		serverData = false,
		data = [],
		globalFilterEnabled = false,
		onRowCreate,
		onRowDelete,
		onRowUpdate,
		onRowEnable
	}
) => {
	const classes = useColumnSearchStyles();
	const dispatch = useAppDispatch();
	const table = useAppSelector((state: RootState) => state.table[subject.name]);

	function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter}:any) {
		const count = preGlobalFilteredRows.length
		const [value, setValue] = React.useState(globalFilter)
		const onChange = useAsyncDebounce(value => {
			setGlobalFilter(value || undefined)
		}, 500)
		if(!globalFilterEnabled) return null;
		return (
			<Grid container direction={"row"}>
				<TextField
					id="filled-search"
					label="Buscar ..."
					type="search"
					variant="filled"
					fullWidth={true}
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

	function DefaultColumnFilter(columns:any) {
		const {column} = columns;
		const {filterValue, preFilteredRows, setFilter} = column;
		//console.log(':::Column filter: ',column);
		return (
			<TextField
				id="filter"
				margin="normal"
				fullWidth={true}
				inputProps={{
					style: {
						padding: 0,
						paddingLeft: '4px',
						height: '20px'
					}
				}}
				classes={classes}
				onChange={e => {
					setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
				}}
				value={filterValue || ''}
				style={{marginTop: 0, marginBottom: 0}}
				type={column.type ? column.type : 'text'}
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

	const actionColumn = {
		Header: 'Acciones',
		accessor: (row:any, index:any) => {
			return (
				<Grid container direction={"row"} justifyContent={"center"} alignItems={"center"}>
					<Checkbox checked={row.appUserIsActive} />
					<ModeEditIcon
						onClick={() => {
							console.log('OnClick edit');
							onRowUpdate(row);
						}}
						style={{cursor: "pointer"}}
					/>
					<DeleteIcon
						onClick={() => {
							console.log('OnClick delete');
							onRowDelete(row);
						}}
						style={{cursor: "pointer"}}
					/>
				</Grid>
			);
		},
		disableSortBy: true,
		disableFilters: true,
		width: 10
	} as any;

	const totalColumns = [...columns, actionColumn];

	const {getTableProps,
		getTableBodyProps, prepareRow, page, canPreviousPage, canNextPage, nextPage,
		previousPage, setPageSize, gotoPage, pageCount, headerGroups, preGlobalFilteredRows,
		setGlobalFilter,
		state: { pageIndex, pageSize, filters, globalFilter, sortBy }}
		= useTable(
			{
				columns: totalColumns,
				data: serverData ? table.items : data,
				initialState: { pageIndex: 0, pageSize: 10 },
				pageCount: table.pageCount ? table.pageCount : 10,
				manualSortBy: serverData,
				manualFilters: serverData,
				manualGlobalFilter: serverData,
				manualPagination: serverData,
				autoResetHiddenColumns: false,
				defaultColumn
			},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	)

	const updateData = () => {
		dispatch(pageQuery(subject, pageIndex+1, pageSize, globalFilter, filters, sortBy, queryParams))
	}

	useEffect(() => {
		if(serverData) updateData();
	},[pageIndex, filters, globalFilter, sortBy])

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
						<TableContainer component={Paper}>
							<MuiTable sx={{ minWidth: 650 }}  aria-label="simple table" size={'small'}>
								{headerGroups.map((headerGroup, idx:number) => {
									return (
										<colgroup {...headerGroup.getHeaderGroupProps()} key={idx}>
											{headerGroup.headers.map((column: any, idx:number) => {
												//console.log('Column: ',column);
												return (
													<col key={`col-${idx}`} width={`${column.width ? column.width+'%' : 'auto'}`} />
												)
											})}
										</colgroup>
									)
								})}
								<TableHead>
									{headerGroups.map((headerGroup, idx:number) => {
										return (
											<TableRow {...headerGroup.getHeaderGroupProps()} key={idx}>
												{headerGroup.headers.map((column: any, idx:number) => {
													//console.log('Column: ',column);
													return (
														<TableCell {...column.getHeaderProps()} key={`th-${idx}`} align={"center"} variant={'head'}>
															<Grid container direction={"column"} justifyContent={"center"} alignItems={"stretch"}>
																<Grid container direction={"row"} alignItems={"center"} justifyContent={"center"} style={{height: '100%'}}>
																	<Grid item xs={column.canSort ? 9 : 12}>
																		<Typography variant="subtitle2">{column.render('Header')}</Typography>
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
														</TableCell>
													)
												})}
											</TableRow>
										)
									})}
								</TableHead>
								<TableBody>
									{page.map((row, rowIdx) => {
										prepareRow(row);
										return (
											<TableRow {...row.getRowProps()} className={styles.row} key={`tr-${rowIdx}`}>
												{row.cells.map((cell:any, cellIdx: number) => {
													//console.log('Cell:',cell);
													if(typeof cell.value !== 'object') {
														//console.log('Simple accesor',typeof cell.value)
														return (
															<TableCell key={`td-${cellIdx}}`} {...cell.getCellProps()} className={styles.cell} variant={'body'}>
																<Grid container direction={"row"} justifyContent={"center"}>
																	<Grid item xs={11}>
																		<Grid container direction={"row"} justifyContent={cell.column.centered ? "center" : "flex-start"}>
																			<Typography variant={"subtitle2"}>{cell.render('Cell')}</Typography>
																		</Grid>
																	</Grid>
																</Grid>
															</TableCell>
														)
													} else {
														//console.log('Custom accesor',typeof cell.value)
														return (
															<td key={`td-${cellIdx}}`}>{cell.render('Cell')}</td>
														)
													}
												})}
											</TableRow>
										)
									})}
								</TableBody>
							</MuiTable>
						</TableContainer>
						<table className={styles.table} style={{display: "none"}}>
							<thead className={styles.head}>
							{headerGroups.map((headerGroup, idx:number) => {
								return (
									<tr {...headerGroup.getHeaderGroupProps()} key={idx}>
										{headerGroup.headers.map((column: any, idx:number) => {
											//console.log('Column: ',column);
											return (
												<th {...column.getHeaderProps()} style={{width: column.width}} key={`th-${idx}`}>
													<Grid container direction={"column"} justifyContent={"center"} alignItems={"stretch"}>
														<Grid container direction={"row"} alignItems={"center"} justifyContent={"center"} style={{height: '100%'}}>
															<Grid item xs={column.canSort ? 9 : 12}>
																<Typography variant="subtitle2">{column.render('Header')}</Typography>
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
							{page.map((row, rowIdx) => {
								prepareRow(row);
								return (
									<tr {...row.getRowProps()} className={styles.row} key={`tr-${rowIdx}`} >
										{row.cells.map((cell:any, cellIdx: number) => {
											//console.log('Cell:',cell);
											if(typeof cell.value !== 'object') {
												//console.log('Simple accesor',typeof cell.value)
												return (
													<td key={`td-${cellIdx}}`} {...cell.getCellProps()} className={styles.cell}>
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
												//console.log('Custom accesor',typeof cell.value)
												return (
													<td key={`td-${cellIdx}}`}>{cell.render('Cell')}</td>
												)
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
						<Pagination count={pageCount} page={pageIndex+1} onChange={(event, value) => {gotoPage(value-1)}} />
					</Grid>
				</Grid>
			</Grid>
		</div>
	)
}

export default Table
