import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pages/Index.module.scss'
import Content from "../components/layouts/Content";
import Grid from "@mui/material/Grid";
import LogoLoader from "../components/common/LogoLoader";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {getMe} from "../services/me";
import {RootState} from "../redux/store";
import {useRouter} from "next/router";
import {setLayout} from "../redux/actions";

const Home: NextPage = () => {

	const dispatch = useAppDispatch();
	const router = useRouter();
	const me = useAppSelector((state: RootState) => state.me);
	const layout = useAppSelector((state: RootState) => state.layout);

	useEffect(() => {
		router.push("/panel");
		dispatch(setLayout({showDrawer: true, showHeader: true}));
	},[me])

  return (
    <Grid container direction={"row"} justifyContent={"center"} alignContent={"center"} className={styles.ctn}>
	    <Grid item xs={12}>
		    <LogoLoader/>
	    </Grid>
    </Grid>
  )
}

export default Home
