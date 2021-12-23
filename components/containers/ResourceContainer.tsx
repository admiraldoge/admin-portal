import React, {FC, ReactChildren, ReactElement, useEffect, useState} from "react";

type dataContainerProps = {
	children: React.ReactElement
	path: string | null,
	resourceName: string
}

const ResourceContainer:FC<dataContainerProps> = ({children,path, resourceName}) => {

	const [data, setData] = useState(null);
	useEffect(() => {
		if(path) {
			(async () => {
				const request
					= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}${path}`,
					{
						method: "GET",
						credentials: 'include',
						headers: {
							'accept':  'application/json'
						}
					});
				const response = await request.json();
				setData(response.data);
			})();
		}
	},[path, resourceName])

	return (
		<>
			{data ? React.cloneElement(children, {[resourceName]: data}) : <h1>Loading</h1>}
		</>
	);
}
export default ResourceContainer;
