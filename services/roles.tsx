export const getRolePage = (page:number, limit:number) => async (dispatch:any) => {
	const request
		= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}/role`+ new URLSearchParams({ page, limit }),
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
