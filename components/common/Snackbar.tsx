import React, {FC} from "react";
import {Snackbar as MuiSnackbar} from '@mui/material';
import {Alert} from "@mui/material";

type props = {
	children?: React.ReactElement
	open: boolean,
	setOpen: any,
	message?: string,
	type?: 'error' | 'warning' | 'info' | 'success',
	autoHideDuration?: number
}

const Snackbar: FC<props> = (
	{
		children,
		open,
		setOpen,
		type,
		message,
		autoHideDuration = 6000
	}
	) => {
	return (
		<MuiSnackbar open={open} autoHideDuration={autoHideDuration} onClose={() => setOpen(false)} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
			<Alert onClose={() => setOpen(false)} severity={type} sx={{ width: '100%' }}>
				{message ? message : children}
			</Alert>
		</MuiSnackbar>
	)
}

export default Snackbar
