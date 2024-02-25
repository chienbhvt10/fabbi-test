import {
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import useRootContext from '../hooks/useRootContext';
import { restaurant } from '../utils/data';
import { useMemo } from 'react';
import { MEAL } from '../constants';

const Step2 = () => {
    const {
        mealSelect,
        restaurantSelect,
        setRestaurantSelectState,
        setSubmitDishItemState,
    } = useRootContext();

    const restaurantList = useMemo(() => {
        if (mealSelect === MEAL.BREAK_FAST) {
            const list = restaurant[MEAL.BREAK_FAST].map(
                (item) => item.restaurant,
            );
            return [...new Set(list)];
        } else if (mealSelect === MEAL.LUNCH) {
            const list = restaurant[MEAL.LUNCH].map((item) => item.restaurant);
            return [...new Set(list)];
        } else {
            const list = restaurant[MEAL.DINNER].map((item) => item.restaurant);
            return [...new Set(list)];
        }
    }, [mealSelect]);

    const onRestaurantChange = (event: SelectChangeEvent<string>) => {
        setRestaurantSelectState(event.target.value);
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
            <Grid item xs={12}>
                <Typography>Please Select a Restaurant</Typography>
            </Grid>
            <Grid item xs={5}>
                <Select
                    sx={{ width: '100%' }}
                    value={restaurantSelect}
                    onChange={onRestaurantChange}
                >
                    <MenuItem value={''}>---</MenuItem>
                    {restaurantList.map((item) => (
                        <MenuItem value={item} key={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
        </Grid>
    );
};

export default Step2;
