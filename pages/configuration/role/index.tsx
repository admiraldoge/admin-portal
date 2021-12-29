import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch} from "../../../redux/hooks";
import {useRouter} from "next/router";
import { useTable, usePagination } from 'react-table';
import Table from "../../../components/common/Table";
import {getRolePage} from "../../../services/roles";
import {CURRENCY, ROLE} from "../../../constants/subjects";
import Grid from "@mui/material/Grid";
import Checkbox from '@mui/material/Checkbox';
import RoleModal from "../../../components/common/configuration/RoleModal";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {getPage} from "../../../services/tableService";

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
		}
	]

	return (
		<Grid className={styles.ctn}>
			<Grid item xs={12}>
				<Table
					subject={{path: '/roles', name: ROLE}}
					columns={columns} defaultPageSize={10} pageQuery={getPage} serverData={true}
					globalFilterEnabled={true}
				/>
			</Grid>
			<RoleModal state={subjectsModal} setState={setSubjectsModal}/>
		</Grid>
	)
}

export default Role
