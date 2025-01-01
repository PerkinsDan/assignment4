export type Activity = {
    _id: string;
    name: string;
    date: string;
    instructor: string;
    boats: string[];
};

export type Boat = {
    _id: string;
    name: string;
    model: string;
    manufacturer: string;
    capacity: number;
};

export type Instructor = {
    _id: string;
    name: string;
    yearsExperience: number;
};
