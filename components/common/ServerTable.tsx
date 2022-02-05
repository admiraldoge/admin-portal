import * as React from 'react';
import {DataGrid, GridRowModel, GridToolbar} from '@mui/x-data-grid';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {useState} from "react";
import {getPage, getSubjectPage} from "../../services/tableService";
import {useRouter} from "next/router";
type TableProps = {
	subject: any,
	columns: any,
	onRowCreate?: any,
	onRowDelete?: any,
	onRowUpdate?: any,
	onRowEnable?: any
}

interface RowsState {
	page: number;
	pageSize: number;
	rows: any[];
	loading: boolean;
}

const ServerTable = ({subject, columns, onRowCreate, onRowUpdate, onRowDelete}: TableProps) => {

	const router = useRouter();
	const [sortModel, setSortModel] = useState([] as any);
	const [filterModel, setFilterModel] = useState({items: []} as any);
	const [selectionModel, setSelectionModel] = useState([] as any);

	const [rowsState, setRowsState] = React.useState({
		page: 1,
		pageSize: 5,
		rows: [],
		loading: false,
		rowCount: 0
	});

	React.useEffect(() => {
		let active = true;
		console.log('ServerTable useEffect with rowsState', rowsState);
		(async () => {
			setRowsState((prev:any) => ({ ...prev, loading: true }));
			const pageData = await getSubjectPage(subject, rowsState.page, rowsState.pageSize, 'undefined', [], [], []);
			const {total:rowCount, items:rows } = pageData;
			console.log('ServerTable newRows', rowCount, rows);
			if (!active) {
				return;
			}
			setRowsState((prev:any) => ({...prev, rowCount}));
			setRowsState((prev:any) => {
				const newState = { ...prev, loading: false, rows, rowCount};
				console.log('New state: ', newState);
				return newState;
			});
		})();

		return () => {
			active = false;
		};
	}, [rowsState.page, rowsState.pageSize]);

	const handleSortModel = (model:any) => {
		console.log('Sort Model',model);
		setSortModel(model);
	}

	const handleSelectionModel = (model:any) => {
		console.log('Selection Model',model);
		setSelectionModel(model);
	}

	const handleFilterModel = (model:any) => {
		console.log('Filter Model',model);
		setFilterModel(model);
	}

	const handleRowClick = (model:any) => {
		console.log('Row click: ', model);
		router.push('/administration/role/[id]',`/administration/role/${model.id}`);
	}

	return (
		<Grid container direction={'column'} spacing={2}>
			<Grid item>
				<Grid container direction={'row'} justifyContent={'flex-end'}>
					<Button variant="contained" size={'small'} onClick={ () => {onRowCreate()}}>Agregar</Button>
				</Grid>
			</Grid>
			<Grid item style={{ height: 400, width: '100%' }}>
				<DataGrid
					components={{ Toolbar: GridToolbar }}
					columns={columns}
					{...rowsState}
					page={rowsState.page-1}
					rowCount={rowsState.rowCount}
					checkboxSelection={true}
					selectionModel={selectionModel}
					onSelectionModelChange={handleSelectionModel}
					sortModel={sortModel}
					onSortModelChange={handleSortModel}
					filterModel={filterModel}
					onFilterModelChange={handleFilterModel}
					pagination={true}
					paginationMode='server'
					filterMode={'server'}
					density={'compact'}
					onPageChange={(page) => {
						setRowsState((prev) => ({ ...prev, page: Math.max(page,1) }))
					}}
					sortingMode={'server'}
					onPageSizeChange={(pageSize) =>
						setRowsState((prev) => ({ ...prev, pageSize }))
					}
					onRowClick={handleRowClick}
				/>
			</Grid>
		</Grid>
	);
}

export default ServerTable;
