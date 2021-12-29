import {appendArray} from "../utils/query";
import {setTable} from "../redux/actions";

export const getPage = (subject: any, page:number, limit:number, fullSearch: string, filters: any, sortBy: any, queryParams: any[]) => async (dispatch:any) => {
	let params = new URLSearchParams({ page: page.toString(), limit: limit.toString(), fullSearch });
	params = appendArray(params, filters, 'filters');
	if(queryParams) {
		console.log('Query params: ',queryParams);
		queryParams.forEach((item:any) => {
			params.append('filters',JSON.stringify(item));
		})
	}
	params = appendArray(params, sortBy, 'sortBy');
	const request
		= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}${subject.path}?` + params,
		{
			method: "GET",
			credentials: 'include',
			headers: {
				'accept':  'application/json'
			}
		});
	const response = await request.json();
	const data = response.data;
	dispatch(setTable({[subject.name]: data}))
	return data;
}
