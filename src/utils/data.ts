import { MEAL } from '../constants';
import { Dish, Meal } from '../types';
import data from '../utils/data.json';

export const mealData: Meal[] = [
    {
        id: MEAL.BREAK_FAST,
        name: 'Breakfirst',
    },
    {
        id: MEAL.LUNCH,
        name: 'Lunch',
    },
    {
        id: MEAL.DINNER,
        name: 'Dinner',
    },
];

export const dishes = data.dishes;

export const restaurant = dishes.reduce<{
    breakfast: Dish[];
    lunch: Dish[];
    dinner: Dish[];
}>(
    (acc, current: Dish) => {
        if (current.availableMeals.includes(MEAL.BREAK_FAST)) {
            return {
                ...acc,
                breakfast: [...acc.breakfast, current],
            };
        } else if (current.availableMeals.includes(MEAL.LUNCH)) {
            return {
                ...acc,
                lunch: [...acc.lunch, current],
            };
        } else {
            return {
                ...acc,
                dinner: [...acc.dinner, current],
            };
        }
    },
    {
        breakfast: [],
        lunch: [],
        dinner: [],
    },
);
