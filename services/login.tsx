
type loginCredentials = {
	username: string,
	password: string
}
export const login = (credentials: loginCredentials) => async (dispatch:any) => {
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
	//dispatch(setEditor({object: response.data.form}));

}
