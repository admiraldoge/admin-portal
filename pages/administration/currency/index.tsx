import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useRouter} from "next/router";
import { useTable, usePagination } from 'react-table';
import Table from "../../../components/common/Table";
import {getRolePage} from "../../../services/roles";
import {CURRENCY, ROLE, USER} from "../../../constants/subjects";
import Grid from "@mui/material/Grid";
import Checkbox from '@mui/material/Checkbox';
import RoleModal from "../../../components/common/configuration/RoleModal";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {getUserPage} from "../../../services/users";
import {RootState} from "../../../redux/store";
import {getPage} from "../../../services/tableService";

const Currency: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const me = useAppSelector((state: RootState) => state.me);

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
			accessor: 'name',
			width: 50,
		},
		{
			Header: 'ISO',
			accessor: 'iso',
			width: 50,
		},
		{
			Header: 'Símbolo',
			accessor: 'simbol',
			width: 50,
		},
		{
			Header: 'Activo',
			accessor: (row:any, index:any) => {
				return (
					<Grid container justifyContent={"center"}>
						<Checkbox checked={row.appUserIsActive} />
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
					subject={{path: '/currencies', name: CURRENCY}}
					columns={columns} defaultPageSize={10} pageQuery={getPage} serverData={true}
					globalFilterEnabled={true}
				/>
			</Grid>

		</Grid>
	)
}

export default Currency
