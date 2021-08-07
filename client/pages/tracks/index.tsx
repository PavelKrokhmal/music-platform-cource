import React from 'react'
import MainLayout from "../../layouts/MainLayout";
import {Box, Button, Card, Grid} from "@material-ui/core";
import {useRouter} from "next/router";
import TrackList from "../../components/TrackList";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {NextThunkDispatch, wrapper} from "../../store";
import {fetchTracks} from "../../store/actions-creators/track";
import {GetServerSideProps, GetServerSidePropsResult} from "next";

const Index = () => {
    const router = useRouter()
    const {tracks, error} = useTypedSelector(state => state.track)

    if(error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

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

export const getServerSideProps = wrapper.getServerSideProps(store =>
    async ({req, res, query, params}) => {
        const dispatch = store.dispatch as NextThunkDispatch
        await dispatch(fetchTracks())
        return {props: {}}
    }
);