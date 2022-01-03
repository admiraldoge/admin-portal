import {appendArray} from "../utils/query";
import {setTable} from "../redux/actions";
import {ROLE, USER} from "../constants/subjects";

export const getListOfChartAccounts = () => async (dispatch:any) => {
	const request
		= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}/chart-accounts`,
		{
			method: "GET",
			credentials: 'include',
			headers: {
				'accept':  'application/json'
			}
		});
	const response = await request.json();
	const data = response.data;
	dispatch(setTable({[USER]: data}))
	return data;
}
