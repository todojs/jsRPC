const expect = require ('chai').expect;

describe ('jsRPC', () => {
  describe ('arithmetic example', () => {
    let app;
    before (() => {
      app = require ('../example/arithmetic-skeleton');
    });
    after ((done) => {
      app.close (() => {
        done ();
      });
    });
    it ('Object.getOwnPropertyNames()', () => {
      const Arithmetic = require ('../example/arithmetic-stub');
      const result     = Object.getOwnPropertyNames (Arithmetic);
      expect (result).to.be.eql ([
        'addition',
        'subtraction',
        'multiplication',
        'division'
      ]);
    });
    it ('Object.keys()', () => {
      const Arithmetic = require ('../example/arithmetic-stub');
      const result     = Object.keys (Arithmetic);
      expect (result).to.be.eql ([
        'addition',
        'subtraction',
        'multiplication',
        'division'
      ]);
    });
    it ('Object.getOwnPropertyDescriptors()', () => {
      const Arithmetic = require ('../example/arithmetic-stub');
      const result     = Object.getOwnPropertyDescriptors (Arithmetic);
      expect (result).to.be.eql ({
        "addition"       : {
          "configurable" : true,
          "enumerable"   : true,
          "value"        : Arithmetic.addition,
          "writable"     : true
        },
        "division"       : {
          "configurable" : true,
          "enumerable"   : true,
          "value"        : Arithmetic.division,
          "writable"     : true
        },
        "multiplication" : {
          "configurable" : true,
          "enumerable"   : true,
          "value"        : Arithmetic.multiplication,
          "writable"     : true
        },
        "subtraction"    : {
          "configurable" : true,
          "enumerable"   : true,
          "value"        : Arithmetic.subtraction,
          "writable"     : true
        }
      });
    });
    it ('addition', async () => {
      const Arithmetic = require ('../example/arithmetic-stub');
      expect (await Arithmetic.addition (2, 3)).to.be.equal (5);
    });
    it ('subtraction', async () => {
      const Arithmetic = require ('../example/arithmetic-stub');
      expect (await Arithmetic.subtraction (2, 3)).to.be.equal (-1);
    });
    it ('multiplication', async () => {
      const Arithmetic = require ('../example/arithmetic-stub');
      expect (await Arithmetic.multiplication (2, 3)).to.be.equal (6);
    });
    it ('division', async () => {
      const Arithmetic = require ('../example/arithmetic-stub');
      expect (await Arithmetic.division (2, 3)).to.be.equal (2 / 3);
    });
    it ('unkown function', async () => {
      const Arithmetic = require ('../example/arithmetic-stub');
      await Arithmetic.other (2, 3).catch (err => {
        expect (err.message).to.be.equal ('Method not found')
      });
    });
  });
});