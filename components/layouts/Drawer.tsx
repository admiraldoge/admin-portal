import React, {useEffect, useState} from "react";
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {RootState} from "../../redux/store";
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {setLayout} from "../../redux/actions";
import {useRouter} from "next/router";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
	conf
} from "./DrawerConfiguration";
import {getPath} from "../../utils/router";
import {updateObjectInArray} from "../../utils/state";

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
		width: `calc(${theme.spacing(7)} + 4px)`,
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
		'& .MuiListItemButton-root': {
			fontSize: 15,
			paddingRight: 24,
		},
		'& .MuiListItemIcon-root': {
			minWidth: 0,
			marginRight: 16,
		},
		'& .MuiSvgIcon-root': {
			fontSize: 20,
		},
	}),
);

const Drawer: React.FunctionComponent<drawerProps> = ({}) => {
	const dispatch = useAppDispatch();
	const layout = useAppSelector((state: RootState) => state.layout);
	const me = useAppSelector((state: RootState) => state.me);
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const [state, setState] = useState(JSON.parse(JSON.stringify(conf)) as any);

	const router = useRouter();
	const showDrawer = router.pathname !== "/login" && router.pathname !== "/" ? false : true;

	useEffect(() => {
		const path = getPath(router.pathname);
		const [module, subject] = path;
		//console.log('Router pathname modified ::: DRAWER', router, getPath(router.pathname))
		selectSubject(module, subject);
	},[router.pathname])

	const handleDrawerClose = () => {
		setOpen(false);
		dispatch(setLayout({drawerExpanded: false}));
	};

	const selectSubject = (module:string, subject:string) => {
		const newState = JSON.parse(JSON.stringify(state));
		for(let i = 0; i < state.length; i++) {
			if(newState[i].path === module) {
				newState[i].expanded = true;
			}
			if(state[i]._template === 'module') {
				for(let j = 0; j < state[i].children.length; j++) {
					if(state[i].children[j].path === `/${module}/${subject}`) {
						setState(
							updateObjectInArray(
								newState,
								i, {children: updateObjectInArray(newState[i].children, j, {selected: true})}
							)
						)
						break;
					}
				}
			}
		}
	}

	const DrawerHeader = styled('div')(({ theme }) => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	}));

	const ListItem = (item:any, idx:number, i:number) => {
		switch (item._template) {
			case 'title':
				return (
					<ListItemButton key={item.loc}>
						<ListItemIcon>

						</ListItemIcon>
						<ListItemText
							sx={{ my: 0 }}
							primary={item.loc}
							primaryTypographyProps={{
								fontSize: 15,
								fontWeight: 'medium',
								letterSpacing: 0,
							}}
						/>
					</ListItemButton>
				);
				break;
			case 'subject':
				if(me.read[item.subject]) {
					return (
						<ListItemButton
							key={`subject-${idx}-${i}`}
							sx={{pl: 4}}
							onClick={(e) => {
								const newState = JSON.parse(JSON.stringify(state));
								for(let i = 0; i < newState.length; i++) {
									if(newState[i]._template === 'module') {
										for(let j = 0; j < newState[i].children.length; j++) {
											newState[i].children[j].selected = false;
										}
									}
								}
								setState(
									updateObjectInArray(
										newState,
										idx, {children: updateObjectInArray(newState[idx].children, i, {selected: true})}
									)
								)
								router.push(item.path);
							}}
							selected={state[idx].children[i].selected}
						>
							<ListItemIcon>
								{item.icon}
							</ListItemIcon>
							<ListItemText
								sx={{ my: 0 }}
								primary={me.subjectsLocMap ? item.loc : me.subjectsLocMap[item.subject]}
								primaryTypographyProps={{
									fontSize: 14,
									fontWeight: 'medium',
									letterSpacing: 0,
								}}
							/>
						</ListItemButton>
					)
				}
				return null;
		}
	}

	const navItems = conf.map((item:any, idx:number) => {
		//console.log('Conf input-item: ',input-item);
		switch (item._template) {
			case 'title':
				return (
					<ListItemButton key={`title-${idx}`}>
						<ListItemIcon>
							{item.icon}
						</ListItemIcon>
						<ListItemText primary={item.loc} />
					</ListItemButton>
				);
				break;
			case 'module':
				return [
					<ListItemButton key={`module-${idx}`} onClick={() => {
						setState(updateObjectInArray(state, idx, {expanded: !state[idx].expanded}))
					}}>
						<ListItemIcon>
							{item.icon}
						</ListItemIcon>
						{layout.drawerExpanded && <ListItemText
							sx={{my: 0}}
							primary={item.loc}
							primaryTypographyProps={{
								fontSize: 15,
								fontWeight: 'medium',
								letterSpacing: 0,
							}}
						/>}
						{layout.drawerExpanded ? state[idx].expanded ? <ExpandLess/> : <ExpandMore/> : null}
					</ListItemButton>,
					<Collapse key={`module-${idx}-list`} in={state[idx].expanded} timeout="auto" unmountOnExit>
						<List component="div" disablePadding>
							{item.children.map((item:any,i:number) => {
								return ListItem(item, idx, i);
							})}
						</List>
					</Collapse>
				];
				break;
		}
	})

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
					{navItems}
				</List>
			</MaterialUIDrawer>
		</div>
	);
}
export default Drawer;
