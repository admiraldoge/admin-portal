import type { NextPage } from 'next'
import styles from '../../styles/pages/Panel.module.scss';
import {useAppDispatch} from "../../redux/hooks";
import {useRouter} from "next/router";
import Content from "../../components/layouts/Content";

const Panel: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	return (
		<div className={styles.ctn}>
			xd
		</div>
	)
}

export default Panel
