import { configureStore, createReducer } from '@reduxjs/toolkit'
import {cleanMe, deleteRowFromTable, setLayout, setList, setMe, setTable} from "./actions";
import {
	ADMINISTRATION_BRAND,
	ADMINISTRATION_CATEGORY,
	ADMINISTRATION_CHART_ACCOUNT, ADMINISTRATION_CITY,
	ADMINISTRATION_COUNTRY,
	ADMINISTRATION_EXPENSE_TYPE,
	ADMINISTRATION_INCOME_TYPE,
	ADMINISTRATION_PAYMENT_METHOD,
	ADMINISTRATION_TAX_TYPE,
	ADMINISTRATION_TRANSACTION_TYPE,
	ADMINISTRATION_UNIT_OF_MEASURE,
	CURRENCY,
	ROLE,
	USER
} from "../constants/subjects";
import {CHART_ACCOUNT_LIST, TAX_TYPE_LIST, TRANSACTION_TYPE_LIST} from "../constants/lists";

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
		snackbar: {
			open: false,
			type: 'info',
			message: ''
		},
		theme: 'light',
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
		[ADMINISTRATION_CHART_ACCOUNT]: {pageCount: 0, items: [], total: 0},
		[ADMINISTRATION_BRAND]: {pageCount: 0, items: [], total: 0},
		[ADMINISTRATION_CATEGORY]: {pageCount: 0, items: [], total: 0},
		[ADMINISTRATION_TRANSACTION_TYPE]: {pageCount: 0, items: [], total: 0},
		[ADMINISTRATION_TAX_TYPE]: {pageCount: 0, items: [], total: 0},
		[ADMINISTRATION_UNIT_OF_MEASURE]: {pageCount: 0, items: [], total: 0},
		[ADMINISTRATION_PAYMENT_METHOD]: {pageCount: 0, items: [], total: 0},
		[ADMINISTRATION_INCOME_TYPE]: {pageCount: 0, items: [], total: 0},
		[ADMINISTRATION_EXPENSE_TYPE]: {pageCount: 0, items: [], total: 0},
		[ADMINISTRATION_COUNTRY]: {pageCount: 0, items: [], total: 0},
		[ADMINISTRATION_CITY]: {pageCount: 0, items: [], total: 0},
	},
	(builder) => {
		builder
			.addCase(setTable, (state, action) => {
				return {...state, ...action.payload};
			})
			.addCase(deleteRowFromTable, (state:any, action:any) => {
				const table = JSON.parse(JSON.stringify(state[action.payload.subject]));
				table.items = table.items.filter((item:any) => item.id !== action.payload.id);
				return {...state, [action.payload.subject]: table};
			})
			.addDefaultCase((state, action) => {
			})
	}
)

const listsReducer = createReducer(
	{
		[CHART_ACCOUNT_LIST.name]: [],
		[TRANSACTION_TYPE_LIST.name]: [],
		[TAX_TYPE_LIST.name]: [],
	},
	(builder) => {
		builder
			.addCase(setList, (state, action) => {
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
		table: tableReducer,
		list: listsReducer
	}
}) as any

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

