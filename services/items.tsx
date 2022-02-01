import {appendArray} from "../utils/query";
import {setTable} from "../redux/actions";
import {ROLE, USER} from "../constants/subjects";

export const getItem = async  (itemId:number) => {
	console.log('Service about to retrieve item,', itemId);
	const request
		= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}/items/${itemId}?`,
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
