const expect = require('expect.js');
const Money = require('../dist/money');

describe('Money', function() {

  describe('when constructing money', function() {
    it('returns correct integer value', function() {
      const num = 1200;
      const money = new Money(num);
      expect(money.cents).to.be(1200);
    });

    it('returns correct string value', function() {
      const string = '22';
      const money = new Money(string);
      expect(money.cents).to.be(2200);
    });

    it('returns correct money string value', function() {
      const moneyString = '$1.00';
      const money = new Money(moneyString);
      expect(money.cents).to.be(100);
    });

    it('returns correct money object value', function() {
      const num = {
        cents: 1000
      };
      const money = new Money(num);
      expect(money.cents).to.be(1000);
    });

    it('returns correct object value', function() {
      const object = {
        key: 1000
      };
      const money = new Money(object);
      expect(money.cents).to.be(0);
    });

    it('returns correct array value', function() {
      const array = [10];
      const money = new Money(array);
      expect(money.cents).to.be(0);
    });

    it('returns correct NaN value', function() {
      const aNaNValue = 10 / 'a';
      const money = new Money(aNaNValue);
      expect(money.cents).to.be(0);
    });

  });

  describe('when calcalating multiplications', function() {
    const operand = .015;
    it('rounds the positive amount conventionally', function() {
      const money = new Money(3900);
      expect(money.multiply(operand).cents).to.be(59);
    });

    it('rounds the negative amount symmetrically', function() {
      const money = new Money(-3900);
      expect(money.multiply(operand).cents).to.be(-59);
    });

  });
});
