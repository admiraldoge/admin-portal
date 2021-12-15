export const appendArray = (url:URLSearchParams, array:any, name:string) => {
	array.forEach((item:any) => {
		url.append(name,JSON.stringify(item));
	})
	return url;
}
