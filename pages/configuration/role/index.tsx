import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch} from "../../../redux/hooks";
import {useRouter} from "next/router";
import { useTable, usePagination } from 'react-table';
import Table from "../../../components/common/Table";
import {getRolePage} from "../../../services/roles";
import {ROLE} from "../../../constants/subjects";
import Grid from "@mui/material/Grid";
import Checkbox from '@mui/material/Checkbox';
import RoleModal from "../../../components/common/configuration/RoleModal";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const Role: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [subjectsModal, setSubjectsModal] = useState({
		open: false,
		data: {}
	});

	const columns = [
		{
			Header: 'ID',
			accessor: 'id',
			width: 10,
			centered: true
		},
		{
			Header: 'Nombre',
			accessor: 'loc',
			width: 50,
		},
		{
			Header: 'Activo',
			accessor: (row:any, index:any) => {
				return (
					<Grid container justifyContent={"center"}>
						<Checkbox checked={row.isActive} />
					</Grid>
				);
			},
			disableSortBy: true,
			disableFilters: true,
			width: 10
		},
		{
			Header: 'Acciones',
			accessor: (row:any, index:any) => {
				return (
					<Grid container direction={"row"} justifyContent={"center"} alignItems={"center"}>
						<Grid item>
							<ModeEditIcon
								onClick={() => {
									setSubjectsModal({data: row, open: true});
								}}
								style={{cursor: "pointer"}}
							/>
						</Grid>
					</Grid>
				);
			},
			disableSortBy: true,
			disableFilters: true,
			width: 30
		}
	]

	return (
		<Grid className={styles.ctn}>
			<Grid item xs={12}>
				<Table
					columns={columns} defaultPageSize={10} pageQuery={getRolePage} entityName={ROLE} serverData={true}
					globalFilterEnabled={true}
				/>
			</Grid>
			<RoleModal state={subjectsModal} setState={setSubjectsModal}/>
		</Grid>
	)
}

export default Role
