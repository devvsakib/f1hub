// export interface Car {
//     id: string;
//     name: string;
//     teamId: string;
//     teamName: string;
//     year: number;
//     imageUrl: string;
//     side: string; // 'side', 'front', 'top', etc.
//     wins: number;
//     poles: number;
//     championships: boolean;
//     description: string;
// }

export const cars = [
    {
        id: "ferrari-sf25-side",
        name: "Ferrari SF-25",
        teamId: "ferrari",
        teamName: "Ferrari",
        year: 2025,
        imageUrl: "/assets/cars/ferrari-2025-side.png",
        side: "side",
        wins: 3,
        poles: 4,
        championships: false,
        description: "The SF-25 features significant aerodynamic improvements and a powerful new power unit. With Lewis Hamilton joining the team, Ferrari has high hopes for this championship contender."
    },
    {
        id: "ferrari-sf25-front",
        name: "Ferrari SF-25",
        teamId: "ferrari",
        teamName: "Ferrari",
        year: 2025,
        imageUrl: "/assets/cars/ferrari-2025-front.png",
        side: "front",
        wins: 3,
        poles: 4,
        championships: false,
        description: "The SF-25 features significant aerodynamic improvements and a powerful new power unit. With Lewis Hamilton joining the team, Ferrari has high hopes for this championship contender."
    },
    {
        id: "mercedes-w16-side",
        name: "Mercedes W16",
        teamId: "mercedes",
        teamName: "Mercedes",
        year: 2025,
        imageUrl: "/assets/cars/mercedes-2025-side.png",
        side: "side",
        wins: 2,
        poles: 2,
        championships: false,
        description: "The W16 represents a significant change in design philosophy for Mercedes, seeking to regain their championship form after several challenging seasons."
    },
    {
        id: "mercedes-w16-front",
        name: "Mercedes W16",
        teamId: "mercedes",
        teamName: "Mercedes",
        year: 2025,
        imageUrl: "/assets/cars/mercedes-2025-front.png",
        side: "front",
        wins: 2,
        poles: 2,
        championships: false,
        description: "The W16 represents a significant change in design philosophy for Mercedes, seeking to regain their championship form after several challenging seasons."
    },
    {
        id: "redbull-rb21-side",
        name: "Red Bull RB21",
        teamId: "redbull",
        teamName: "Red Bull",
        year: 2025,
        imageUrl: "/assets/cars/redbull-2025-side.png",
        side: "side",
        wins: 6,
        poles: 6,
        championships: false,
        description: "After dominating previous seasons, the RB21 continues Red Bull's aggressive design philosophy with further refinements to maintain their advantage."
    },
    {
        id: "redbull-rb21-front",
        name: "Red Bull RB21",
        teamId: "redbull",
        teamName: "Red Bull",
        year: 2025,
        imageUrl: "/assets/cars/redbull-2025-front.png",
        side: "front",
        wins: 6,
        poles: 6,
        championships: false,
        description: "After dominating previous seasons, the RB21 continues Red Bull's aggressive design philosophy with further refinements to maintain their advantage."
    },
    {
        id: "mclaren-mcl39-side",
        name: "McLaren MCL39",
        teamId: "mclaren",
        teamName: "McLaren",
        year: 2025,
        imageUrl: "/assets/cars/mclaren-2025-side.png",
        side: "side",
        wins: 2,
        poles: 1,
        championships: false,
        description: "Building on their resurgence, the MCL39 represents McLaren's best chance at a championship in over a decade with impressive straight-line speed and improved reliability."
    },
    {
        id: "mclaren-mcl39-front",
        name: "McLaren MCL39",
        teamId: "mclaren",
        teamName: "McLaren",
        year: 2025,
        imageUrl: "/assets/cars/mclaren-2025-front.png",
        side: "front",
        wins: 2,
        poles: 1,
        championships: false,
        description: "Building on their resurgence, the MCL39 represents McLaren's best chance at a championship in over a decade with impressive straight-line speed and improved reliability."
    },
    // Historical cars
    {
        id: "ferrari-f2004-side",
        name: "Ferrari F2004",
        teamId: "ferrari",
        teamName: "Ferrari",
        year: 2004,
        imageUrl: "/assets/cars/ferrari-2004-side.png",
        side: "side",
        wins: 15,
        poles: 12,
        championships: true,
        description: "One of the most dominant F1 cars of all time, the F2004 powered Michael Schumacher to his seventh and final World Championship title."
    },
    {
        id: "mercedes-w11-side",
        name: "Mercedes W11",
        teamId: "mercedes",
        teamName: "Mercedes",
        year: 2020,
        imageUrl: "/assets/cars/mercedes-2020-side.png",
        side: "side",
        wins: 13,
        poles: 15,
        championships: true,
        description: "Widely considered one of the most dominant F1 cars ever built, the W11 helped Lewis Hamilton secure his seventh World Championship, equalling Michael Schumacher's record."
    }
];

export const getCars = (filters) => {
    let filteredCars = [...cars];

    if (filters?.year) {
        filteredCars = filteredCars.filter(car => car.year === filters.year);
    }

    if (filters?.teamId) {
        filteredCars = filteredCars.filter(car => car.teamId === filters.teamId);
    }

    return Promise.resolve(filteredCars);
};

export const getCar = (carId) => {
    const car = cars.find(car => car.id === carId);
    return Promise.resolve(car);
};