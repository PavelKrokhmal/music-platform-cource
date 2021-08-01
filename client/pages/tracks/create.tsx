import React, {useState} from 'react'
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import {Button, Grid, TextField} from "@material-ui/core";
import FileUpload from "../../components/FileUpload";

const Create = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)

    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1)
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
                        <TextField style={{marginTop: "10px"}} label={'Track name'}/>
                        <TextField style={{marginTop: "10px"}} label={'Artist'}/>
                        <TextField style={{marginTop: "10px"}} label={'Text'} multiline rows={3}/>
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