import type { ReactNode } from 'react';
import { createContext, useState } from 'react';
import { ValidationError } from 'yup';
import { STEP } from '../constants';
import useNotification from '../hooks/useNotification';
import { SubmitDishItem } from '../types';
import { validateStep1, validateStep2 } from '../utils/validationSchema';

export interface RootContextValue {
    step: number;
    mealSelect: string;
    numOfPeople: number;
    restaurantSelect: string;
    submitDishItem: SubmitDishItem[];
    setMealSelectState: (value: string) => void;
    setNumOfPeopleState: (value: number) => void;
    setRestaurantSelectState: (value: string) => void;
    setSubmitDishItemState: (value: SubmitDishItem[]) => void;
    addMoreSubmitDishItem: () => void;
    onGoNext: () => void;
    onGoPrevious: () => void;
    onSubmit: () => void;
    setStepState: (value: number) => void;
}

export const RootContext = createContext<RootContextValue | null>(null);

interface Props {
    children: ReactNode;
}

const RootProvider = (props: Props) => {
    const { children } = props;
    const setNotification = useNotification();
    const [mealSelect, setMealSelect] = useState<string>('');
    const [numOfPeople, setNumOfPeople] = useState<number>(1);
    const [restaurantSelect, setRestaurantSelect] = useState<string>('');
    const [step, setStep] = useState<number>(STEP.STEP1);
    const [submitDishItem, setSubmitDishItem] = useState<SubmitDishItem[]>([
        {
            index: 1,
            id: 0,
            name: '',
            numOfServing: 1,
        },
    ]);

    const onSubmit = () => {
        console.log(`Meal: ${mealSelect}`);
        console.log('Number of people: ', numOfPeople);
        console.log('Restaurant: ', restaurantSelect);
        console.log(
            'Dishes: ',
            submitDishItem.map((item) => `${item.name} - ${item.numOfServing}`),
        );
        setNotification({
            message: 'Submit successfully',
            severity: 'success',
        });
        return;
    };

    const onGoNext = () => {
        step === STEP.STEP1 && checkPassStep1();
        step === STEP.STEP2 && checkPassStep2();
        step === STEP.STEP3 && checkPassStep3();
    };

    const checkPassStep1 = () => {
        validateStep1
            .validate({
                meal: mealSelect,
                numOfPeople,
            })
            .then(() => {
                setStep((prev) => prev + 1);
            })
            .catch((err: ValidationError) => {
                setNotification({ message: err.message, severity: 'error' });
            });
    };

    const checkPassStep2 = () => {
        validateStep2
            .validate({
                restaurant: restaurantSelect,
            })
            .then(() => {
                setStep((prev) => prev + 1);
            })
            .catch((err: ValidationError) => {
                setNotification({ message: err.message, severity: 'error' });
            });
    };

    const checkPassStep3 = () => {
        const totalNumOfServing = submitDishItem.reduce((acc, cur) => {
            return (acc += cur.numOfServing);
        }, 0);

        if (submitDishItem.find((item) => !item.id)) {
            setNotification({
                message: 'Please select all dish options!',
                severity: 'error',
            });
            return;
        }

        if (submitDishItem.find((item) => item.numOfServing < 1)) {
            setNotification({
                message: 'The number of serving must be positive!',
                severity: 'error',
            });
            return;
        }

        if (totalNumOfServing > 10) {
            setNotification({
                message: 'The total number of dishes must be maximum 10',
                severity: 'error',
            });
            return;
        }
        if (totalNumOfServing < numOfPeople) {
            setNotification({
                message:
                    'The total number of dishes must be and greater or equal to number of people',
                severity: 'error',
            });
            return;
        }

        setStep((prev) => prev + 1);
    };

    const onGoPrevious = () => {
        setStep((prev) => prev - 1);
    };

    const setStepState = (step: number) => {
        setStep(step);
    };

    const setMealSelectState = (value: string) => {
        setMealSelect(value);
    };

    const setNumOfPeopleState = (value: number) => {
        setNumOfPeople(value);
    };

    const setRestaurantSelectState = (value: string) => {
        setRestaurantSelect(value);
    };

    const addMoreSubmitDishItem = () => {
        setSubmitDishItem([
            ...submitDishItem,
            {
                index: submitDishItem.length + 1,
                id: 0,
                name: '',
                numOfServing: 1,
            },
        ]);
    };

    const setSubmitDishItemState = (value: SubmitDishItem[]) => {
        setSubmitDishItem(value);
    };

    return (
        <RootContext.Provider
            value={{
                step,
                mealSelect,
                numOfPeople,
                restaurantSelect,
                submitDishItem,
                setMealSelectState,
                setNumOfPeopleState,
                setRestaurantSelectState,
                setSubmitDishItemState,
                addMoreSubmitDishItem,
                onGoNext,
                onGoPrevious,
                onSubmit,
                setStepState,
            }}
        >
            {children}
        </RootContext.Provider>
    );
};

export { RootProvider, RootContext as default };
