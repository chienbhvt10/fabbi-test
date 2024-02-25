export interface Meal {
    id: string;
    name: string;
}

export interface Restaurant {
    id: number;
    name: string;
}

export interface Dish {
    id: number;
    name: string;
    restaurant: string;
    availableMeals: string[];
}

export interface SubmitDishItem extends Partial<Dish> {
    index: number;
    numOfServing: number;
}
