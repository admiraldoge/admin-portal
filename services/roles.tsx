import {setTable} from "../redux/actions";
import {ROLE} from "../constants/subjects";
import {appendArray} from "../utils/query";

export const getRolePage = (page:number, limit:number, fullSearch: string, filters: any, sortBy: any) => async (dispatch:any) => {
	let params = new URLSearchParams({ page: page.toString(), limit: limit.toString(), fullSearch });
	params = appendArray(params, filters, 'filters');
	params = appendArray(params, sortBy, 'sortBy');
	console.log('Parsed filters : ',params);
	console.log('Sort by : ',sortBy);
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

export const getRoleSubjects = (roleId: number) => async (dispatch:any) => {
	const request
		= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}/roles/${roleId}`,
		{
			method: "GET",
			credentials: 'include',
			headers: {
				'accept':  'application/json'
			}
		});
	const response = await request.json();
	const data = response.data;
	return data;
}
