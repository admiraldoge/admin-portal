import type { NextPage } from 'next'
import React, {useEffect} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch} from "../../../redux/hooks";
import {useRouter} from "next/router";
import { useTable, usePagination } from 'react-table';
import Table from "../../../components/common/Table";
import {getRolePage} from "../../../services/roles";
import {ROLE} from "../../../constants/subjects";

const Role: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const columns = [
		{
			Header: ' ',
			columns: [
				{
					Header: 'ID',
					accessor: 'id'
				},
				{
					Header: 'Nombre',
					accessor: 'loc',
				}
			],
		}
	]

	const data = [{name: "A"},{name: "B"},{name: "C"},{name: "D"},]

	return (
		<div className={styles.ctn}>
			<Table columns={columns} defaultPageSize={10} pageQuery={getRolePage} entityName={ROLE}/>
		</div>
	)
}

export default Role
