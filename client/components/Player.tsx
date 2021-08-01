import React from 'react'
import {Card, Grid, IconButton} from "@material-ui/core";
import {Pause, PlayArrow, VolumeUp} from "@material-ui/icons";
import styles from '../styles/Player.module.scss'
import {ITrack} from "../types/track";
import TrackProgress from "./TrackProgress";

const Player = () => {
    const active = false
    const track: ITrack = {_id: '3', name: 'Track 3', artist: "Face", text: 'Lorem10', listens: 3, picture: '',
        audio: '', comments: [{_id: "1", username: "Pavel", text: "Some comment"}]}
    return (
        <div className={styles.player}>
            <IconButton onClick={e => e.stopPropagation()}>
                {!active ? <PlayArrow/> : <Pause/>}
            </IconButton>
            <Grid container direction={'column'} style={{width:200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            <TrackProgress left={0} right={100} onChange={()=>({})}/>
            <VolumeUp style={{marginLeft: 'Auto'}}/>
            <TrackProgress left={0} right={100} onChange={()=>({})}/>
        </div>
    )
}

export default Player