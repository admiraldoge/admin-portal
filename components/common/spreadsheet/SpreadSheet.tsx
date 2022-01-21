import Spreadsheet from "react-spreadsheet";
import {useEffect, useRef, useState} from "react";

type spreadSheetProps = {
	columnLabels: any
}

const SpreadSheet = ({columnLabels}:spreadSheetProps) => {
	const [data, setData] = useState([[{value: '1'},{value: '1'},{value: '1'},{value: '1'},],]);

	const updateData = (values:any) => {
		console.log(values);
		setData(values);
		return data;
	}

	return <Spreadsheet data={data} onChange={updateData} columnLabels={columnLabels}/>;
}

export default SpreadSheet
