import React, {FC, useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import {useAppDispatch} from "../../../redux/hooks";
import {getRoleSubjects} from "../../../services/roles";
import Table from "../Table";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import {CREATE, DELETE, READ, UPDATE} from "../../../constants/abilities";
import {updateObjectInArray} from "../../../utils/table";


const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 800,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	pt: 2,
	px: 4,
	pb: 3,
};

type actionsModalProps = {
	state: {
		open: boolean,
		data: any
	},
	setState: any
}

const RoleModal: FC<actionsModalProps> = ({state, setState}) => {
	const dispatch = useAppDispatch();
	const [roleData, setRoleData] = useState([] as any);

	useEffect(() => {
		async function getData() {
			const data = await dispatch(getRoleSubjects(state.data.id));
			const parsedData = [] as any;
			data.forEach((subject:any, i:number) => {
				const row = {} as any;
				row.id = subject.id;
				row.name = subject.name;
				row.read = subject.abilities[READ-1].can;
				row.create = subject.abilities[CREATE-1].can;
				row.update = subject.abilities[UPDATE-1].can;
				row.delete = subject.abilities[DELETE-1].can;
				parsedData.push(row);
			})
			setRoleData(parsedData);
			console.log(':::Parsed data: ',parsedData);
		}
		if(state.open) {
			getData();
		}
	},[state.open])

	const columns = [
		{
			Header: 'Nombre',
			accessor: 'name',
			width: 50,
			centered: true,
			disableSortBy: true,
			disableFilters: true,
		},
		{
			Header: 'Leer',
			accessor: (row:any, index:any) => {
				return (
					<Grid container justifyContent={"center"}>
						<Checkbox
							checked={row.read}
		          onChange={(e) => {
								setRoleData(updateObjectInArray(roleData, index, {read: e.target.checked}))
							}}
						/>
					</Grid>
				);
			},
			disableSortBy: true,
			disableFilters: true,
			width: 10
		},
		{
			Header: 'Crear',
			accessor: (row:any, index:any) => {
				return (
					<Grid container justifyContent={"center"}>
						<Checkbox
							checked={row.create}
		          onChange={(e) => {
			          setRoleData(updateObjectInArray(roleData, index, {create: e.target.checked}))
		          }}
						/>
					</Grid>
				);
			},
			disableSortBy: true,
			disableFilters: true,
			width: 10
		},
		{
			Header: 'Modificar',
			accessor: (row:any, index:any) => {
				return (
					<Grid container justifyContent={"center"}>
						<Checkbox
							checked={row.update}
		          onChange={(e) => {
			          setRoleData(updateObjectInArray(roleData, index, {update: e.target.checked}))
		          }}
						/>
					</Grid>
				);
			},
			disableSortBy: true,
			disableFilters: true,
			width: 10
		},
		{
			Header: 'Borrar',
			accessor: (row:any, index:any) => {
				return (
					<Grid container justifyContent={"center"}>
						<Checkbox
							checked={row.delete}
		          onChange={(e) => {
			          setRoleData(updateObjectInArray(roleData, index, {delete: e.target.checked}))
		          }}
						/>
					</Grid>
				);
			},
			disableSortBy: true,
			disableFilters: true,
			width: 10
		},
	]

	return (
		<Modal
			open={state.open}
			onClose={() => setState({...state, open: false})}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography variant="h6">Cambiar Habilidades</Typography>
				<Table columns={columns} defaultPageSize={10} data={roleData}/>
			</Box>
		</Modal>
	)
}

export default RoleModal
