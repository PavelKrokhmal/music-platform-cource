import React from 'react'
import Navbar from "../components/Navbar";
import {Container} from "@material-ui/core";

const MainLayout: React.FC = ({children}) => {
    return (
        <>
            <Navbar/>
            <Container style={{marginTop: '32px'}}>
                {children}
            </Container>
        </>
    );
};

export default MainLayout;