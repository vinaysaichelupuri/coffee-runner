export const getRandomLane = () => Math.floor(Math.random() * 3);

export const generateId = () => Math.random().toString(36).substr(2, 9);
