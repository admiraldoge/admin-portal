import type { NextPage } from 'next'
import styles from '../../styles/pages/Panel.module.scss';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {RootState} from "../../redux/store";
import Meta from "../../components/layouts/Meta";

const Panel: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const me = useAppSelector((state: RootState) => state.me);

	useEffect(() => {
		if (me.error.statusCode === 401) {
			router.push("/login");
		}
	},[me.error])

	return (
		<div className={styles.ctn}>
			xd
		</div>
	)
}

export default Panel
