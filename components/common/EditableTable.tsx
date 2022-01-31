import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
type TableProps = {
	columns: any,
	data: any,
	onRowCreate?: any,
	onRowDelete?: any,
	onRowUpdate?: any,
	onRowEnable?: any,
	rowModel: any,
}

const EditableTable = ({columns, data, rowModel, onRowCreate, onRowUpdate}: TableProps) => {
	return (
		<Grid container direction={'column'} spacing={2}>
			<Grid item>
				<Grid container direction={'row'} justifyContent={'flex-end'}>
					<Button variant="contained" size={'small'} onClick={ () => {onRowCreate()}}>Agregar</Button>
				</Grid>
			</Grid>
			<Grid item style={{ height: 400, width: '100%' }}>
				<DataGrid
					rows={data}
					columns={columns}
					density={'compact'}
					editRowsModel={rowModel}
					onEditRowsModelChange={onRowUpdate}
					editMode={'row'}
				/>
			</Grid>
		</Grid>
	);
}

export default EditableTable;
