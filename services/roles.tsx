import {setTable} from "../redux/actions";
import {ROLE} from "../constants/subjects";
import {appendArray} from "../utils/query";

export const getRolePage = (page:number, limit:number, fullSearch: string, filters: any, order: any) => async (dispatch:any) => {
	let params = new URLSearchParams({ page: page.toString(), limit: limit.toString(), fullSearch, order });
	params = appendArray(params, filters, 'filters');
	console.log('Parsed filters : ',params);
	const request
		= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}/roles?` + params,
		{
			method: "GET",
			credentials: 'include',
			headers: {
				'accept':  'application/json'
			}
		});
	const response = await request.json();
	const data = response.data;
	dispatch(setTable({[ROLE]: data}))
	return data;
}
