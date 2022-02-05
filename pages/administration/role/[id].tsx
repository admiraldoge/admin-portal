import type {GetStaticPaths, NextPage} from 'next'
import React, {useEffect, useState} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch} from "../../../redux/hooks";
import Grid from "@mui/material/Grid";
import useResourceData from "../../../hooks/useResourceData";
import {ADMINISTRATION_ROLE} from "../../../constants/subjects";
import {useRouter} from "next/router";

const Role: NextPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const {id} = router.query;
	const useResource = useResourceData(ADMINISTRATION_ROLE, id)
	console.log(':::Role query', router.query);
	return (
		<Grid className={styles.ctn}>
			<h1>Role configuration {id}</h1>
		</Grid>
	)
}
export default Role
