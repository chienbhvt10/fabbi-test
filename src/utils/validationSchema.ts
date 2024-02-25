import { object, array, number, ValidationError, string } from 'yup';
import { Dish } from '../types';

export interface ValueStep1 {
    meal: number;
    numOfPeoples: number;
}

export interface ValueStep2 {
    restaurant: number;
}

export interface ValueStep3 {
    dishes: Dish[];
}

export const validateStep1 = object<ValueStep1>({
    meal: string().required('Please select meal!'),
    numOfPeople: number()
        .typeError('Please enter a number!')
        .required('Please select meal!')
        .min(1, 'Number of people must more than 1!')
        .max(10, 'Number of people must less than 10!'),
});

export const validateStep2 = object<ValueStep2>({
    restaurant: string().required('Please select restaurant!'),
});

export const validateStep3 = object<ValueStep3>({
    dishes: array().min(1, 'At least one dish!'),
});
