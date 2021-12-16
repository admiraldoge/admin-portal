import {getMe} from "../services/me";

export const loadSessionData = () => async (dispatch:any) => {
	dispatch(getMe());

}
