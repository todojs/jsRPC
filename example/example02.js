// Warning: run arithmetic-skeleton.js before this

const Arithmetic = require ('./arithmetic-stub');

(async () => {
  console.assert (await Arithmetic.addition (2, 3) === 5);
  console.assert (await Arithmetic.subtraction (2, 3) === -1);
  console.assert (await Arithmetic.multiplication (2, 3) === 6);
  console.assert (await Arithmetic.division (2, 3) === 2 / 3);
  try {
    await Arithmetic.other (2, 3)
  } catch(err) {
    console.assert(err.message === 'Method not found')
  }
}) ();