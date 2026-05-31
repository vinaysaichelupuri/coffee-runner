export const getRandomLane = () => {
  'worklet';
  return Math.floor(Math.random() * 3);
};

export const generateId = () => {
  'worklet';
  return Math.random().toString(36).substring(2, 11);
};
