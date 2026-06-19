const K = 32;

function expectedScore(r1, r2) {
  return 1 / (1 + Math.pow(10, (r2 - r1) / 400));
}

function updateRatings(r1, r2, result) {

  const e1 = expectedScore(r1, r2);
  const e2 = expectedScore(r2, r1);

  let s1;
  let s2;

  if (result === "LEFT") {
    s1 = 1;
    s2 = 0;
  }
  else if (result === "RIGHT") {
    s1 = 0;
    s2 = 1;
  }
  else {
    s1 = 0.5;
    s2 = 0.5;
  }

  const newR1 = r1 + K * (s1 - e1);
  const newR2 = r2 + K * (s2 - e2);

  return {
    leftRating: newR1,
    rightRating: newR2
  };
}

module.exports = {
  updateRatings
};