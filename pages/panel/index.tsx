import type { NextPage } from 'next'
import styles from '../../styles/pages/Panel.module.scss';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useRouter} from "next/router";
import Content from "../../components/layouts/Content";
import {useEffect} from "react";
import {RootState} from "../../redux/store";
import {getMe} from "../../services/me";

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
