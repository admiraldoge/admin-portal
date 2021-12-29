import { configureStore, createReducer } from '@reduxjs/toolkit'
import {cleanMe, setLayout, setMe, setTable} from "./actions";
import {CURRENCY, ROLE, USER} from "../constants/subjects";

const layoutReducer = createReducer(
	{
		showDrawer: false,
		showHeader: false,
		drawerExpanded: true,
		login: {
			errorMessage: null
		},
		loading: {
			loadValue: 0
		},
		initialPath: "/panel"
	},
	(builder) => {
		builder
			.addCase(setLayout, (state, action) => {
				return {...state, ...action.payload};
			})
			.addDefaultCase((state, action) => {
			})
	}
)

const meReducer = createReducer(
	{
		showDrawerCategory: {},
		error: {},
		read: {},
		write: {},
		delete: {},
		update: {},
		subjectsLocMap: {}
	},
	(builder) => {
		builder
			.addCase(setMe, (state, action) => {
				return {...state, ...action.payload};
			})
			.addCase(cleanMe, (state, action) => {
				const baseState = {
					showDrawerCategory: {},
					error: {},
					read: {},
					write: {},
					delete: {},
					update: {},
					subjectsLocMap: {}
				};
				return {...baseState};
			})
			.addDefaultCase((state, action) => {
			})
	}
)

const tableReducer = createReducer(
	{
		[ROLE]: {pageCount: 0, items: [], total: 0},
		[USER]: {pageCount: 0, items: [], total: 0},
		[CURRENCY]: {pageCount: 0, items: [], total: 0},
	},
	(builder) => {
		builder
			.addCase(setTable, (state, action) => {
				return {...state, ...action.payload};
			})
			.addDefaultCase((state, action) => {
			})
	}
)

const store = configureStore({
	reducer: {
		layout: layoutReducer,
		me: meReducer,
		table: tableReducer
	}
}) as any

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

