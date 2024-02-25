import { Box, Button, Container } from '@mui/material';
import { useState } from 'react';
import Review from './components/Review';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import StepBar from './components/StepBar';
import { STEP } from './constants';
import useRootContext from './hooks/useRootContext';

function App() {
    const { step, onGoPrevious, onGoNext, onSubmit } = useRootContext();

    return (
        <Container
            maxWidth="sm"
            style={{
                height: 600,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <StepBar step={step} />
            {step === STEP.STEP1 && <Step1 />}
            {step === STEP.STEP2 && <Step2 />}
            {step === STEP.STEP3 && <Step3 />}
            {step === STEP.REVIEW && <Review />}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {step !== STEP.STEP1 ? (
                    <Button variant="outlined" onClick={onGoPrevious}>
                        Previous
                    </Button>
                ) : (
                    <Box></Box>
                )}
                {step !== STEP.REVIEW ? (
                    <Button variant="outlined" onClick={onGoNext}>
                        Next
                    </Button>
                ) : (
                    <Button variant="outlined" onClick={onSubmit}>
                        Submit
                    </Button>
                )}
            </Box>
        </Container>
    );
}

export default App;
