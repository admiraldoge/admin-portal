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
		<Grid className={styles.ctn}>
			<ResourceContainer path={me.companyId ? `/companies/${me.companyId}` : null} resourceName={'company'}>
				<Form config={formTemplate} validationSchema={validationSchema} resourcePath={`/companies/${me.companyId}`}/>
			</ResourceContainer>
		</Grid>
	)
}

export default ConfigurationCompany
