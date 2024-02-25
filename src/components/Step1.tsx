import {
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import { ChangeEventHandler } from 'react';
import useRootContext from '../hooks/useRootContext';
import { mealData } from '../utils/data';

interface Step1Props {}

const Step1 = (props: Step1Props) => {
    const {
        mealSelect,
        numOfPeople,
        setMealSelectState,
        setNumOfPeopleState,
        setSubmitDishItemState,
        setRestaurantSelectState,
    } = useRootContext();

    const onMealChange = (event: SelectChangeEvent<string>) => {
        setMealSelectState(event.target.value);
    };

    const onChangeNumOfPeople: ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        setNumOfPeopleState(Number(event.target.value));
        setRestaurantSelectState('');
        setSubmitDishItemState([
            {
                index: 1,
                id: 0,
                name: '',
                numOfServing: 1,
            },
        ]);
    };

    return (
        <Grid container spacing={2}>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12}>
                    <Typography>Please Select a meal</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Select
                        sx={{ width: '100%' }}
                        value={mealSelect}
                        onChange={onMealChange}
                    >
                        <MenuItem value="">---</MenuItem>
                        {mealData.map((item) => (
                            <MenuItem value={item.id} key={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
                <Grid item xs={12}>
                    <Typography>Please Enter Number of people</Typography>
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        sx={{ width: '100%' }}
                        type="number"
                        value={numOfPeople}
                        onChange={onChangeNumOfPeople}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Step1;
