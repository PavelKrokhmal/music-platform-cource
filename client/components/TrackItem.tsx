import React from 'react'
import {ITrack} from "../types/track";
import {Card, Grid, IconButton} from "@material-ui/core";
import styles from '../styles/TrackItem.module.scss';
import {Delete, Pause, PlayArrow} from "@material-ui/icons";
import {useRouter} from "next/router";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface TrackItemProps {
    track: ITrack;
    active?: boolean
}

const TrackItem: React.FC<TrackItemProps> = ({track, active= false})=> {
    const router = useRouter()
    const {playTrack, pauseTrack, setActiveTrack} = useActions()

    const play = (e) => {
        e.stopPropagation()

        if(!active) {
            setActiveTrack(track)
            playTrack()
        } else {
            setActiveTrack(null)
            pauseTrack()
        }
    }

    return (
        <Card className={styles.track} variant="outlined" onClick={()=>router.push('/tracks/' + track._id)}>
            <IconButton onClick={play}>
                {!active ? <PlayArrow/> : <Pause/>}
            </IconButton>
            <img width={70} height={70} src={track.picture}/>
            <Grid container direction={'column'} style={{width:200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            {active && <div>02:42 / 03:22</div>}
            <IconButton style={{marginLeft: 'auto'}} onClick={e => e.stopPropagation()}>
                <Delete/>
            </IconButton>
        </Card>
    )
}

export default TrackItem