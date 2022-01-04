import type { NextPage } from 'next';
import styles from '../styles/pages/Index.module.scss';
import Grid from "@mui/material/Grid";
import LogoLoader from "../components/common/LogoLoader";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {useAppSelector} from "../redux/hooks";
import {RootState} from "../redux/store";
import _ from "lodash";

const Home: NextPage = () => {
	const router = useRouter();
	const me = useAppSelector((state: RootState) => state.me);
	const layout = useAppSelector((state: RootState) => state.layout);

	useEffect(() => {
		if(!_.isEmpty(me.read)) {
			console.log('Index: me has loaded, so pushing to initialPath:',layout.initialPath);
			router.push(layout.initialPath);
		}
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
