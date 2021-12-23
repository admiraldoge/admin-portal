import {setMe} from "../redux/actions";
import {showDrawerCategory} from "../components/layouts/DrawerConfiguration";
import {subjectsCategory} from "../constants/subjects";

export const getMe = () => async (dispatch:any) => {
	const request
		= await fetch(`${process.env.NEXT_PUBLIC_PANAMA_HOST}/me`,
		{
			method: "GET",
			credentials: 'include',
			headers: {
				'accept':  'application/json'
			}
		});
	const response = await request.json();
	if(request.ok) {
		const data = response.data;
		if(!data) {

		}
		if(data.subjects) {
			const subjectsLocMap = {} as any;
			data.subjects.forEach((item: { name: string; loc: string;}, idx:number) => {
				subjectsLocMap[item.name] = item.loc;
			});
		}
		const READ = 0;
		const CREATE = 1;
		const UPDATE = 2;
		const DELETE = 3;
		if(data.subjects) {
			data.read = {};
			data.update = {};
			data.delete = {};
			data.create = {};
			data.showDrawerCategory = {...showDrawerCategory};
			for(let i in data.subjects) {
				data.read[data.subjects[i].name] = data.subjects[i].abilities[READ].can;
				data.update[data.subjects[i].name] = data.subjects[i].abilities[UPDATE].can;
				data.delete[data.subjects[i].name] = data.subjects[i].abilities[DELETE].can;
				data.create[data.subjects[i].name] = data.subjects[i].abilities[CREATE].can;

				if(data.read[data.subjects[i].name])
				{
					data.showDrawerCategory[subjectsCategory[data.subjects[i].name]]
						= data.read[data.subjects[i].name] || data.showDrawerCategory[subjectsCategory[data.subjects[i].name]];
				}

			}
		}
		dispatch(setMe(data));
		//dispatch(setEditor({object: response.data.form}));
	} else {
		dispatch(setMe({error: response}));
	}
}
