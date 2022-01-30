import * as React from 'react';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
type TableProps = {
	subject?: any,
	columns: any,
	defaultPageSize?: number,
	pageQuery?: any,
	queryParams?: any,
	serverData?: boolean,
	data: any,
	globalFilterEnabled?: boolean,
	onRowCreate?: any,
	onRowDelete?: any,
	onRowUpdate?: any,
	onRowEnable?: any,
	rowModel: any,

}

const EditableCell = ({columns, data, rowModel, onRowUpdate}: TableProps) => {
	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={data}
				columns={columns}
				density={'compact'}
				editRowsModel={rowModel}
				onEditRowsModelChange={onRowUpdate}
			/>
		</div>
	);
}

export default EditableCell;
