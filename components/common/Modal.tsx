import React, {FC} from 'react';
import {Modal as MuiModal, useMediaQuery} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import CloseIcon from '@mui/icons-material/Close';

type actionsModalProps = {
	children?: React.ReactElement | React.ReactElement[]
	open: boolean,
	setOpen: any,
	width?: number
}

const Modal: FC<actionsModalProps> = ({children, open, setOpen, width= 400}) => {

	const isMobile = useMediaQuery('(max-width:600px)');
	const responsiveWidth = isMobile ? 350 : (width ? width : 400);
	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: responsiveWidth,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		pt: 2,
		px: 4,
		pb: 3,
	};

	return (
		<MuiModal
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style} style={{maxHeight: '100vh', overflowY: 'scroll'}}>
				<Grid container direction={'row'} justifyContent={'flex-end'}>
					<CloseIcon style={{cursor: 'pointer'}} onClick={() => setOpen(false)}/>
				</Grid>
				{children}
			</Box>
		</MuiModal>
	)
}

export default Modal
