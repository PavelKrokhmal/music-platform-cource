import React, {useCallback, useEffect} from 'react'
import {Grid, IconButton} from "@material-ui/core";
import {Pause, PlayArrow, VolumeDown, VolumeUp} from "@material-ui/icons";
import styles from '../styles/Player.module.scss'
import TrackProgress from "./TrackProgress";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

let audio;

const Player = () => {
    const {pause, volume, currentTime, duration, active} = useTypedSelector(state => state.player)
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration} = useActions()

    useEffect(() => {

        if (!audio) {
            audio = new Audio()
        }

        if (pause) {
            audio.pause()
        } else {
            if (audio.activeTrack !== active) {
                setAudio()
            }
            audio.play()
        }

    }, [active, pause])

    const setAudio = () => {
        if (active) {
            audio.src = process.env.serverURL + active.audio
            audio.volume = volume / 100
            audio.activeTrack = active
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }

    const play = () => {
        pause ? playTrack() : pauseTrack()
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }

    if (!active) {
        return null
    }


    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                {pause ? <PlayArrow/> : <Pause/>}
            </IconButton>
            <Grid container direction={'column'} style={{width:200, margin: '0 20px'}}>
                <div>{active?.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <VolumeUp style={{marginLeft: 'Auto'}}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </div>
    )
}

export default Player