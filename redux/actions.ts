import {createAction} from "@reduxjs/toolkit";

// LAYOUT
export const setLayout = createAction<object>('setLayout')
export const cleanLayout = createAction('cleanLayout')

// ME
export const setMe = createAction<object>('setMe');
export const cleanMe = createAction('cleanMe');

//TABLE
export const setTable = createAction<object>('setTable');
export const deleteRowFromTable = createAction<object>('deleteRowFromTable');

//LIST
export const setList = createAction<object>('setList');

//ITEM
export const setItem = createAction<object>('setItem');

//FORM
export const setForm = createAction<object>('setForm');
export const addElementToSet = createAction<object>('addElementToSet');

