export type HealthRecord = {
    id: string;
    glucose: string;
    fasting: string;
    date: string;
};

export type User = {
    fullName: string;
    email: string;
    password: string;
    healthRecords?: HealthRecord[];
};