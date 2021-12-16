import React, {useEffect, useState} from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import App from "next/app";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {RootState} from "../../redux/store";
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {setLayout} from "../../redux/actions";
import {useRouter} from "next/router";
import {StarBorder} from "@mui/icons-material";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
	CONFIGURATION,
	drawerMenu,
	pathToDrawerConfiguration
} from "./DrawerConfiguration";
import {
	getDrawerSubjectsConfiguration,
	ROLE,
	subjectPaths,
	subjectToDrawerConfiguration
} from "../../constants/subjects";
import {getPath} from "../../utils/router";
import {updateObjectInArray} from "../../utils/table";

type drawerProps = {

};

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
});

const MaterialUIDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme),
		}),
	}),
);

const Drawer: React.FunctionComponent<drawerProps> = ({}) => {
	const dispatch = useAppDispatch();
	const layout = useAppSelector((state: RootState) => state.layout);
	const me = useAppSelector((state: RootState) => state.me);
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const [subjectSelected, setSubjectSelected] = React.useState(getDrawerSubjectsConfiguration());
	const [menuCollapsed, setMenuCollapsed] = useState(drawerMenu);

	const handleClick = (subMenu:string) => {
		setMenuCollapsed({...menuCollapsed, [subMenu]: !menuCollapsed[subMenu]});
	};
	const router = useRouter();
	const showDrawer = router.pathname !== "/login" && router.pathname !== "/" ? false : true;

	useEffect(() => {
		const path = getPath(router.pathname);
		const [menu, subMenu] = path;
		console.log('Router pathname modified ::: DRAWER', router, getPath(router.pathname))
		setMenuCollapsed({...drawerMenu, [pathToDrawerConfiguration[menu]]: true});
		setSubjectSelected({...getDrawerSubjectsConfiguration(), [subjectToDrawerConfiguration[subMenu]]: true})
	},[router.pathname])

	const handleDrawerClose = () => {
		setOpen(false);
		dispatch(setLayout({drawerExpanded: false}));
	};

	interface AppBarProps extends MuiAppBarProps {
		drawerExpanded?: boolean;
	}

	const DrawerHeader = styled('div')(({ theme }) => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	}));

	const goToPage = (path:string) => {
		router.push(path);
	}

	if(showDrawer) return null;
	return (
		<div>
			<MaterialUIDrawer variant={"permanent"} open={layout.drawerExpanded}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{me.showDrawerCategory[CONFIGURATION] && <ListItemButton onClick={() => handleClick(CONFIGURATION)}>
						<ListItemIcon>
							<InboxIcon/>
						</ListItemIcon>
						<ListItemText primary="Configuración"/>
						{menuCollapsed[CONFIGURATION] ? <ExpandLess/> : <ExpandMore/>}
					</ListItemButton>}
					<Collapse in={menuCollapsed[CONFIGURATION]} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{
								me.read[ROLE] &&
								<ListItemButton
									sx={{pl: 4}}
									onClick={() => goToPage(subjectPaths[ROLE])}
									selected={subjectSelected[ROLE]}
								>
									<ListItemIcon>
										<StarBorder/>
									</ListItemIcon>
									<ListItemText primary="Roles"/>
								</ListItemButton>
							}
						</List>
					</Collapse>
					<ListItemButton>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary="Inbox" />
					</ListItemButton>
				</List>
			</MaterialUIDrawer>
		</div>
	);
}
export default Drawer;
