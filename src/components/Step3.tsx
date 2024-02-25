import { AddCircleOutlineRounded } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import useRootContext from '../hooks/useRootContext';
import DishItem from './DishItem';
import { dishes } from '../utils/data';
import { useMemo } from 'react';

const Step3 = () => {
    const {
        mealSelect,
        restaurantSelect,
        submitDishItem,
        addMoreSubmitDishItem,
    } = useRootContext();

    const dishList = useMemo(() => {
        const list =
            dishes.filter(
                (item) =>
                    item.availableMeals.includes(mealSelect) &&
                    item.restaurant === restaurantSelect,
            ) || [];
        return list;
    }, [mealSelect, restaurantSelect]);

    return (
        <Grid container spacing={2} sx={{ mt: 4 }}>
            {submitDishItem.map((item) => (
                <DishItem key={item.index} dishes={dishList} item={item} />
            ))}
            <IconButton onClick={addMoreSubmitDishItem} sx={{ my: 2 }}>
                <AddCircleOutlineRounded fontSize="large" />
            </IconButton>
        </Grid>
    );
};

export default Step3;
