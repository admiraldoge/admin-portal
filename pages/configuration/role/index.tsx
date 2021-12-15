import type { NextPage } from 'next'
import React, {useEffect} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch} from "../../../redux/hooks";
import {useRouter} from "next/router";
import { useTable, usePagination } from 'react-table';
import Table from "../../../components/common/Table";
import {getRolePage} from "../../../services/roles";
import {ROLE} from "../../../constants/subjects";
import Grid from "@mui/material/Grid";
import Checkbox from '@mui/material/Checkbox';

const Role: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const columns = [
		{
			Header: 'ID',
			accessor: 'id',
			width: '5%',
		},
		{
			Header: 'Nombre',
			accessor: 'loc',
			width: '20%',
		},
		{
			Header: 'Activo',
			accessor: (row:any, index:any) => {
				console.log('Row?',row,'index',row.isActive);
				return (
					<Grid container justifyContent={"center"}>
						<Grid item xs={2}>
							<Checkbox checked={row.isActive} />
						</Grid>
					</Grid>
				);
			},
			disableFilters: true,
			width: '5%'
		},
		{
			Header: 'Acciones',
			disableFilters: true,
			width: '10%'
		}
	]

	return (
		<Grid className={styles.ctn}>
			<Grid item xs={12}>
				<Table columns={columns} defaultPageSize={10} pageQuery={getRolePage} entityName={ROLE}/>
			</Grid>
		</Grid>
	)
}

export default Role
