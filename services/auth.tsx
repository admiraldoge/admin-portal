import {setMe} from "../redux/actions";
import {getMe} from "./me";

type loginCredentials = {
	username: string,
	password: string
}
export const auth = (credentials: loginCredentials) => async (dispatch:any) => {
	dispatch(setMe({error: {}}))
	const request
		= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}/auth`,
		{
			method: "POST",
			credentials: 'include',
			body: JSON.stringify(credentials),
			headers: {
				'Content-Type': 'application/json',
				'accept':  'application/json'
			}
		});
	const response = await request.json();
	console.log('Response public? data: ',response);
	dispatch(getMe());
	//dispatch(setEditor({object: response.data.form}));

}
export const logout = () => async (dispatch:any) => {
	const request
		= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}/auth`,
		{
			method: "DELETE",
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'accept':  'application/json'
			}
		});
	const response = await request.json();
}
