export type HealthRecord = {
    id: string;

    glucose: string;
    fasting: string;

    systolic?: string;
    diastolic?: string;
    bloodPressureResult?: string;


    weight?: string;
    height?: string;

    bmi?: string;
    bmiResult?: string;

    date: string;
    result?: string;
};

export type User = {
    fullName: string;
    email: string;
    password: string;

    healthRecords?: HealthRecord[];
};