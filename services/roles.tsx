import {setTable} from "../redux/actions";
import {ROLE} from "../constants/subjects";

export const getRolePage = (page:number, limit:number, fullSearch: string, filter: any, order: any) => async (dispatch:any) => {

	const request
		= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}/roles?`
		//@ts-ignore
		+ new URLSearchParams({ page: page.toString(), limit: limit.toString(), fullSearch, filter, order }),
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
