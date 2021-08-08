import {Dispatch} from "react";
import {TrackAction, TrackActionType} from "../../types/track";
import axios from "axios";
import API from "../../libs/apiClient";

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await API.get('tracks')
            dispatch({type: TrackActionType.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({type: TrackActionType.FETCH_TRACKS_ERROR, payload: 'Fetch tracks error'})
        }
    }
}

export const searchTrack = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await API.get('tracks/search?query=' + query)
            dispatch({type: TrackActionType.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({type: TrackActionType.FETCH_TRACKS_ERROR, payload: 'Fetch tracks error'})
        }
    }
}