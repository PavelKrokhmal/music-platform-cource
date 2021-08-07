import {Dispatch} from "react";
import {TrackAction, TrackActionType} from "../../types/track";
import axios from "axios";

// export type AppStore = ReturnType<typeof makeStore>;
// export type AppState = ReturnType<AppStore['getState']>;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get('http://localhost:5000/tracks')
            dispatch({type: TrackActionType.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({type: TrackActionType.FETCH_TRACKS_ERROR, payload: 'Fetch tracks error'})
        }
    }
}