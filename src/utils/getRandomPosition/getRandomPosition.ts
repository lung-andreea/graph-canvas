const MIN_VAL = 100;
const MAX_VAL = 800;

const getRandomInRange = (min, max) => {
  return Math.random() * (max - min) + min;
};
export default function getRandomPosition() {
  return {
    x: getRandomInRange(MIN_VAL, MAX_VAL),
    y: getRandomInRange(MIN_VAL, MAX_VAL),
  };
}
