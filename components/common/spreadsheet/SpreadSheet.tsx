import Spreadsheet from "react-spreadsheet";
import {useEffect, useRef, useState} from "react";

const SpreadSheet = () => {
	const [data, setData] = useState([
		[{ value: "Vanilla" }, { value: "Chocolate" }],
		[{ value: "Strawberry" }, { value: "Cookies" }],
	]);

	return <Spreadsheet data={data} onChange={setData} columnLabels={['Nombre', 'Cantidad']}/>;
}

export default SpreadSheet
