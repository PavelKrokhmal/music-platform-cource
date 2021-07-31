import React from 'react'
import MainLayout from "../../layouts/MainLayout";
import {Box, Button, Card, Grid} from "@material-ui/core";
import {useRouter} from "next/router";
import {ITrack} from "../../types/track";
import TrackList from "../../components/TrackList";

const Index = () => {
    const router = useRouter()
    const tracks: ITrack[] = [
        {_id: '1', name: 'Track 1', artist: "Face", text: 'Some text 1', listens: 1, picture: '', audio: '', comments: []},
        {_id: '2', name: 'Track 2', artist: "Face", text: 'Some text 2', listens: 2, picture: '', audio: '', comments: []},
        {_id: '3', name: 'Track 3', artist: "Face", text: 'Some text 3', listens: 3, picture: '', audio: '', comments: []},
    ]
    return (
        <MainLayout>
            <Grid container>
                <Card style={{width: 900}}>
                    <Box p={4}>
                        <Grid container justifyContent={'space-between'}>
                            <h1>Track list</h1>
                            <Button onClick={()=>router.push('/tracks/create')}>Upload</Button>
                        </Grid>
                    </Box>
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    )
}

export default Index