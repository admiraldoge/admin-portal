// standard middleware definition, with 3 nested functions:
// 1) Accepts `{dispatch, getState}`
// 2) Accepts `next`
// 3) Accepts `action`
export const getItemData = ({ dispatch, getState }:any) => (next:any) => (action:any) => {
				// If the "action" is actually a function instead...
				if (typeof action === 'function') {
					// then call the function and pass `dispatch` and `getState` as arguments
					return action(dispatch, getState)
				}

				// Otherwise, it's a normal action - send it onwards
				return next(action)
			}
