export const updateObjectInArray = (array:any[], idx:number, value:any) => {
	const newArray = [...array];
	newArray[idx] = {...newArray[idx], ...value};
	console.log('Array updated', newArray);
	return newArray;
}
