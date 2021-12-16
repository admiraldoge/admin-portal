import type { NextPage } from 'next';
import styles from '../styles/pages/Index.module.scss';
import Grid from "@mui/material/Grid";
import LogoLoader from "../components/common/LogoLoader";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {useAppSelector} from "../redux/hooks";
import {RootState} from "../redux/store";

const Home: NextPage = () => {
	const router = useRouter();
	const layout = useAppSelector((state: RootState) => state.layout);
	//Use this page to load heavy data, before proceding to acutal panel
	useEffect(()=>{
		router.push(layout.initialPath);
	})

  return (
    <Grid container direction={"row"} justifyContent={"center"} alignContent={"center"} className={styles.ctn}>
	    <Grid item xs={12}>
		    <LogoLoader/>
	    </Grid>
    </Grid>
  )
}

export default Home
