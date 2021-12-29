import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useRouter} from "next/router";
import Table from "../../../components/common/Table";
import {CURRENCY, ROLE, USER} from "../../../constants/subjects";
import Grid from "@mui/material/Grid";
import Checkbox from '@mui/material/Checkbox';
import {RootState} from "../../../redux/store";
import {deleteRow, getPage} from "../../../services/tableService";
const Currency: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const me = useAppSelector((state: RootState) => state.me);
	const subject = {path: '/currencies', name: CURRENCY};

	const [subjectsModal, setSubjectsModal] = useState({
		open: false,
		data: {}
	});

	const columns = [
		{
			Header: 'ID',
			accessor: 'id',
			width: 10,
			centered: true,
			type: 'number'
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
			accessor: 'symbol',
			width: 50,
		}
	]

	function onRowDelete(row:any){
		console.log('Executing inner verison of on rowDelete', row);
		dispatch(deleteRow(subject, row.id));
	}

	return (
		<Grid className={styles.ctn}>
			<Grid item xs={12}>
				<Table
					subject={subject}
					columns={columns} defaultPageSize={10} pageQuery={getPage} serverData={true}
					globalFilterEnabled={true}
					onRowDelete={onRowDelete}
				/>
			</Grid>

		</Grid>
	)
}

export default Currency
