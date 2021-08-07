import {AnyAction, combineReducers} from "redux";
import {playerReducer} from "./playerReducer";
import {HYDRATE} from "next-redux-wrapper";
import {trackReducer} from "./trackReducer";

const rootReducer = combineReducers({
    player: playerReducer,
    track: trackReducer
})

export const reducer = (state, action: AnyAction) => {
    if (action.type === HYDRATE) {
        return {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
    } else {
        return rootReducer(state, action)
    }
}

export type RootState = ReturnType<typeof rootReducer>