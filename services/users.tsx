import {appendArray} from "../utils/query";
import {setTable} from "../redux/actions";
import {ROLE, USER} from "../constants/subjects";

export const getUserPage = (page:number, limit:number, fullSearch: string, filters: any, sortBy: any, queryParams: any[]) => async (dispatch:any) => {
	let params = new URLSearchParams({ page: page.toString(), limit: limit.toString(), fullSearch });
	params = appendArray(params, filters, 'filters');
	queryParams.forEach((item:any) => {
		params.append('filters',JSON.stringify(item));
	})
	params = appendArray(params, sortBy, 'sortBy');
	console.log('Parsed filters : ',params);
	console.log('Sort by : ',sortBy);
	const request
		= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}/app-users?` + params,
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
