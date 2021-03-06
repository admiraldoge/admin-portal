export const getModules = () => async (dispatch:any) => {
	const request
		= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}/modules`,
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
