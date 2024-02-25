import {
    Grid,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import { ChangeEventHandler, useState } from 'react';
import { Dish, SubmitDishItem } from '../types';
import useRootContext from '../hooks/useRootContext';

interface DishItemProps {
    dishes: Dish[];
    item: SubmitDishItem;
}

const DishItem = (props: DishItemProps) => {
    const { dishes, item } = props;
    const { submitDishItem, setSubmitDishItemState } = useRootContext();
    const [dishSelect, setDishSelect] = useState<number>(item.id || -1);
    const [numOfServing, setNumOfServing] = useState<number>(
        item.numOfServing || 1,
    );

    const onDishChange = (event: SelectChangeEvent<number>) => {
        setDishSelect(Number(event.target.value));
        const dishValue = dishes.find(
            (item) => item.id === Number(event.target.value),
        );
        const newList = submitDishItem.map((sdi) => {
            if (sdi.index === item.index) {
                return {
                    ...sdi,
                    id: dishValue?.id,
                    name: dishValue?.name,
                };
            }
            return sdi;
        });
        setSubmitDishItemState(newList);
    };

    const onNumOfServingChange: ChangeEventHandler<HTMLInputElement> = (
        event,
    ) => {
        setNumOfServing(Number(event.target.value));
        const newList = submitDishItem.map((sdi) => {
            if (sdi.index === item.index) {
                return {
                    ...sdi,
                    numOfServing: Number(event.target.value),
                };
            }
            return sdi;
        });
        setSubmitDishItemState(newList);
    };

    return (
        <Grid item container xs={12} spacing={4}>
            <Grid item container xs={6} spacing={2}>
                <Grid item xs={12}>
                    <Typography>Please Select a Dish</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Select
                        sx={{ width: '100%' }}
                        value={dishSelect}
                        onChange={onDishChange}
                    >
                        <MenuItem value={-1}>---</MenuItem>
                        {dishes.map((item) => (
                            <MenuItem value={item.id} key={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
            <Grid container item xs={6} spacing={2}>
                <Grid item xs={12}>
                    <Typography>Please enter no. of serving</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        sx={{ width: '100%' }}
                        type="number"
                        onChange={onNumOfServingChange}
                        value={numOfServing}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DishItem;
