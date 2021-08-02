import {TrackAction, TrackActionType, TrackState} from "../../types/track";

const initialState: TrackState = {
    tracks: [],
    error: ''
}

export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
    switch (action.type) {
        case TrackActionType.FETCH_TRACKS:
            return {tracks: action.payload, error: ''}
        case TrackActionType.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}