import React, {useState} from 'react'
import {ITrack} from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import {Button, Card, Grid, TextField} from "@material-ui/core";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import Image from "next/image";
import {useInput} from "../../hooks/useInput";
import API from "../../libs/apiClient";

const TrackPage = ({serverTrack}) => {
    const router = useRouter()
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
        try {
            const {data} = await API.post(process.env.SERVER_URL + "tracks/comment", {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({...track, comments: [data, ...track.comments]})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MainLayout title={"Music platform - " + track.name + " - " + track.artist}
                    keywords={["Music", "artists", track.name, track.artist].join(", ")}
        >
            <Button variant={"outlined"} onClick={()=>router.push('/tracks')}>Go to list</Button>
            <Grid container style={{margin: '20px 0'}}>
                <Image src={process.env.SERVER_URL + track.picture} width={200} height={200}/>
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
                <TextField style={{marginTop: '10px'}} label={"Your name"} fullWidth {...username}></TextField>
                <TextField style={{marginTop: '10px'}} label={"Comment"} fullWidth multiline rows={4} {...text}></TextField>
                <Button style={{marginTop: '10px'}} variant={'outlined'} onClick={addComment}>Send</Button>
            </Grid>
            <div style={{marginTop: '10px'}}>
                {track.comments.map(comment =>
                    <Card key={comment._id} variant="outlined" style={{padding: "10px 20px", marginBottom: "4px"}}>
                        <div>{comment.username}: <i>{comment.text}</i></div>
                    </Card>
                )}
            </div>
        </MainLayout>
    )
}

export default TrackPage

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const {data} = await API.get("tracks/" + params.id)

    if (!data) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            serverTrack: data
        }
    }
}