import React, {FC} from 'react';
import {Modal as MuiModal} from '@mui/material';
import Box from '@mui/material/Box';

type actionsModalProps = {
	children?: React.ReactElement
	open: boolean,
	setOpen: any,
	width?: number
}

const Modal: FC<actionsModalProps> = ({children, open, setOpen, width= 400}) => {
	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: width,
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
			<Box sx={style}>
				{children}
			</Box>
		</MuiModal>
	)
}

export default Modal
