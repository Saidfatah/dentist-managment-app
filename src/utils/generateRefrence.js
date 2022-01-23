export const REF_LENGTH = 4;
export const CLIENT_REF_PREFIX = "C";
export const PAYMENT_REF_PREFIX = "P";

const generateRefrence = (count, prefix, refLength) => {
  const countArrayed = (++count).toString().split("");
  let zeros = new Array(refLength - countArrayed.length).fill(
    "0",
    0,
    refLength - countArrayed.length
  );
  return [...zeros, ...countArrayed].reduce((a, c) => a + c, prefix);
};

export default generateRefrence;
