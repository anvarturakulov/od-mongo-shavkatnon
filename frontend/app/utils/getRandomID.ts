export const getRandomID = () => {
  let min = 0;
  let max = 1679615;

  let int = Math.floor(Math.random() * (max - min + 1)) + min;
  return int;
}
