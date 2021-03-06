import type { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import styles from '../../../styles/pages/Role.module.scss';
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useRouter} from "next/router";
import Grid from "@mui/material/Grid";
import ResourceContainer from "../../../components/containers/ResourceContainer";
import {RootState} from "../../../redux/store";
import Form from "../../../components/common/Form/Form";
import {
	formTemplate,
	validationSchema
} from "../../../configurations/forms/CompanyFormConfiguration";

const ConfigurationCompany: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const me = useAppSelector((state: RootState) => state.me);

	return (
		<Grid className={styles.ctn} container direction={"row"}>
			<ResourceContainer path={me.employerId ? `/persons/${me.employerId}` : null} resourceName={'initialData'}>
				<Form config={formTemplate} validationSchema={validationSchema} resourcePath={`/persons/${me.employerId}`}/>
			</ResourceContainer>
		</Grid>
	)
}

export default ConfigurationCompany
