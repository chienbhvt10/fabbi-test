import { Stack, Button } from '@mui/material';
import { STEP } from '../constants';

interface StepBarProps {
    step: number;
}

const StepBar = (props: StepBarProps) => {
    const { step } = props;
    return (
        <Stack
            direction="row"
            spacing={1}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                pt: 5,
            }}
        >
            <Button
                variant={step === STEP.STEP1 ? 'contained' : 'outlined'}
                color={step === STEP.STEP1 ? 'info' : 'inherit'}
            >
                Step 1
            </Button>
            <Button
                variant={step === STEP.STEP2 ? 'contained' : 'outlined'}
                color={step === STEP.STEP2 ? 'info' : 'inherit'}
            >
                Step 2
            </Button>
            <Button
                variant={step === STEP.STEP3 ? 'contained' : 'outlined'}
                color={step === STEP.STEP3 ? 'info' : 'inherit'}
            >
                Step 3
            </Button>
            <Button
                variant={step === STEP.REVIEW ? 'contained' : 'outlined'}
                color={step === STEP.REVIEW ? 'info' : 'inherit'}
            >
                Review
            </Button>
        </Stack>
    );
};

export default StepBar;
