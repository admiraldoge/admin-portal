import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/components/LogoLoader.module.scss';
import Grid from "@mui/material/Grid";
import {FC} from "react";

const LogoLoader: FC = () => {
	return (
			<Grid container direction={"row"} justifyContent={"center"} alignContent={"center"} className={styles.ctn}>
				<Grid item xs={12} sm={5} lg={4}>
					<Image src={"/images/logo_transparent.png"} layout={"responsive"} width={"100%"} height={"100%"}/>
				</Grid>
			</Grid>
	)
}

export default LogoLoader
