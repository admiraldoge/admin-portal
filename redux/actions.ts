import {createAction} from "@reduxjs/toolkit";

// LAYOUT
export const setLayout = createAction<object>('setLayout')
export const cleanLayout = createAction('cleanLayout')

// ME
export const setMe = createAction<object>('setMe');
