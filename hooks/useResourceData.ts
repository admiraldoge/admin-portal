import {useEffect, useState} from "react";
interface resourceType {
	path: string,
	name: string,
}

export default function useResourceData(resource:resourceType, id:any) {

	const [model, setModel] = useState(null);

	useEffect(() => {
		if(resource.path && id) {
			(async () => {
				const request
					= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}${resource.path}/${id}`,
					{
						method: "GET",
						credentials: 'include',
						headers: {
							'accept':  'application/json'
						}
					});
				const response = await request.json();
				setModel(response.data);
			})();
		}
	},[resource.path])
	return model;
}
