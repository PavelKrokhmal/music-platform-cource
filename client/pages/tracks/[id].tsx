import React from 'react'
import {ITrack} from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import {Button, Card, Grid, TextField} from "@material-ui/core";
import {useRouter} from "next/router";

const TrackPage = () => {
    const router = useRouter()
    const track: ITrack = {_id: '3', name: 'Track 3', artist: "Face", text: 'Lorem10', listens: 3, picture: '',
        audio: '', comments: [{_id: "1", username: "Pavel", text: "Some comment"}]}
    return (
        <MainLayout>
            <Button variant={"outlined"} onClick={()=>router.push('/tracks')}>Go to list</Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={track.picture} width={200} height={200}/>
                <div style={{marginLeft: '20px'}}>
                    <h1>Name: {track.name}</h1>
                    <h1>Artist: {track.artist}</h1>
                    <h1>Listens: {track.listens}</h1>
                </div>
            </Grid>
            <h1>Track text</h1>
            <p>{track.text}</p>
            <h1>Comments</h1>
            <Grid container>
                <TextField style={{marginTop: '10px'}} label={"Your name"} fullWidth></TextField>
                <TextField style={{marginTop: '10px'}} label={"Comment"} fullWidth multiline rows={4}></TextField>
                <Button style={{marginTop: '10px'}} variant={'outlined'}>Send</Button>
            </Grid>
            <div style={{marginTop: '10px'}}>
                {track.comments.map(comment =>
                    <Card key={comment._id} variant="outlined" style={{padding: "10px 20px"}}>
                        <div>{comment.username}: <i>{comment.text}</i></div>
                    </Card>
                )}
            </div>
        </MainLayout>
    )
}

export default TrackPage