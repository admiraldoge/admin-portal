export const getPath = (path:string) => {
	const pathAsArray = path.split('/');
	return pathAsArray.slice(1);
}
