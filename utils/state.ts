export const updateValueInArray = (array:any[], idx:number, value:any) => {
	const newArray = [...array];
	newArray[idx] = value;
	//console.log('Array updated', newArray);
	return newArray;
}
export const updateObjectInArray = (array:any[], idx:number, value:any) => {
	const newArray = [...array];
	newArray[idx] = {...newArray[idx], ...value};
	//console.log('Array object',idx,'updated', newArray);
	return newArray;
}
