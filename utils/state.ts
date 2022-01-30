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
export const updateObjectInArrayById = (array:any[], value:any) => {
	console.log(':::Array received: ', array);
	const newArray = [...array];
	for(let i in newArray) {
		if(newArray[i].id === value.id) {
			newArray[i] = {...newArray[i], ...value};
		}
	}
	return newArray;
}
