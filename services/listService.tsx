import {appendArray} from "../utils/query";
import {setList, setTable} from "../redux/actions";
import {ROLE, USER} from "../constants/subjects";
import {CHART_ACCOUNT_LIST} from "../constants/lists";

export const getList = (list:any) => async (dispatch:any) => {
	const request
		= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}${list.path}?page=1&limit=999999999`,
		{
			method: "GET",
			credentials: 'include',
			headers: {
				'accept':  'application/json'
			}
		});
	const response = await request.json();
	const data = response.data;
	dispatch(setList({[list.name]: data.items}))
	return data;
}
