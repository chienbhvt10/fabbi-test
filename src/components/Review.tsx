import { Grid, Typography } from '@mui/material';
import useRootContext from '../hooks/useRootContext';

interface ReviewProps {}

const Review = (props: ReviewProps) => {
    const { mealSelect, numOfPeople, restaurantSelect, submitDishItem } =
        useRootContext();

    return (
        <Grid container spacing={2}>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={6}>
                    <Typography>Meal</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{mealSelect}</Typography>
                </Grid>
            </Grid>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={6}>
                    <Typography>No. of People</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{numOfPeople}</Typography>
                </Grid>
            </Grid>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={6}>
                    <Typography>Restaurant</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{restaurantSelect}</Typography>
                </Grid>
            </Grid>
            <Grid container item spacing={2} xs={12}>
                <Grid item xs={6}>
                    <Typography>Dishes</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Grid sx={{ border: '2px solid #000', p: 1.5 }}>
                        {submitDishItem.map((item) => (
                            <Typography key={item.index}>
                                {item.name} - {item.numOfServing}
                            </Typography>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Review;
