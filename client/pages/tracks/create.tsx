import React, {useState} from 'react'
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import {Button, Grid, TextField} from "@material-ui/core";
import FileUpload from "../../components/FileUpload";
import {useInput} from "../../hooks/useInput";
import axios from "axios";
import {useRouter} from "next/router";

const Create = () => {
    const router = useRouter()

    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)

    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')

    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('artist', artist.value)
            formData.append('text', text.value)
            formData.append('picture', picture)
            formData.append('audio', audio)

            axios.post(process.env.serverURL + "tracks", formData)
                .then((response) => {
                    return router.push("/tracks")
                })
                .catch(e => console.log(e))
        }
    }

    const back = () => {
        setActiveStep(prev => prev - 1)
    }

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 && (
                    <Grid container direction={"column"} style={{padding: "20px"}}>
                        <TextField style={{marginTop: "10px"}} label={'Track name'} {...name}/>
                        <TextField style={{marginTop: "10px"}} label={'Artist'} {...artist}/>
                        <TextField style={{marginTop: "10px"}} label={'Text'} multiline rows={3} {...text}/>
                    </Grid>
                )}
                {activeStep === 1 && (
                    <FileUpload setFile={file => setPicture(file)} accept={'image/*'}>
                        <Button>Upload preview</Button>
                    </FileUpload>
                )}
                {activeStep === 2 && (
                    <FileUpload setFile={file => setAudio(file)} accept={'audio/*'}>
                        <Button>Upload track</Button>
                    </FileUpload>
                )}
            </StepWrapper>
            <Grid container justifyContent={'space-between'}>
                <Button disabled={!activeStep} variant={'outlined'} onClick={back}>Back</Button>
                <Button variant={'outlined'} onClick={next}>Next</Button>
            </Grid>
        </MainLayout>
    )
}

export default Create