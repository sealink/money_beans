const expect = require("expect.js");
const Money = require("../dist/money");

describe("Money", function() {
  describe("when constructing money", function() {
    it("returns correct integer value", function() {
      const num = 1200;
      const money = new Money(num);
      expect(money.cents).to.be(1200);
    });

    it("returns correct string value", function() {
      const string = "22";
      const money = new Money(string);
      expect(money.cents).to.be(2200);
    });

    it("returns correct money string value", function() {
      const moneyString = "$1.00";
      const money = new Money(moneyString);
      expect(money.cents).to.be(100);
    });

    it("returns correct money string value", function() {
      const moneyString = ".2";
      const money = new Money(moneyString);
      expect(money.cents).to.be(20);
    })

    it("returns correct money string value", function() {
      const moneyString = "1.2";
      const money = new Money(moneyString);
      expect(money.cents).to.be(120);
    })

    it("returns correct money from invalid string value", function() {
      const money = new Money("abc");
      expect(money.cents).to.be(0);
    });

    it("returns correct money object value", function() {
      const num = {
        cents: 1000
      };
      const money = new Money(num);
      expect(money.cents).to.be(1000);
    });

    it("returns correct object value", function() {
      const object = {
        key: 1000
      };
      const money = new Money(object);
      expect(money.cents).to.be(0);
    });

    it("returns correct array value", function() {
      const array = [10];
      const money = new Money(array);
      expect(money.cents).to.be(0);
    });

    it("returns correct NaN value", function() {
      const aNaNValue = 10 / "a";
      const money = new Money(aNaNValue);
      expect(money.cents).to.be(0);
    });
  });

  describe("when calcalating multiplications", function() {
    const operand = 0.015;
    it("rounds the positive amount conventionally", function() {
      const money = new Money(3900);
      expect(money.multiply(operand).cents).to.be(59);
    });

    it("rounds the negative amount symmetrically", function() {
      const money = new Money(-3900);
      expect(money.multiply(operand).cents).to.be(-59);
    });
  });

  describe("comparison", function() {
    it("Should not equal an object with different cents", function() {
      const money = new Money(3000);
      expect(money.equals(new Money(20))).to.be(false);
    });

    it("Should equal an object with same cents value", function() {
      const money = new Money(3000);
      expect(money.equals(new Money(3000))).to.be(true);
    });
  });

  describe("add", function() {
    it("should add money values", function() {
      expect(new Money(3000).add(new Money(3000)).cents).to.be(6000);
    });
  });

  describe("subtract", function() {
    it("should subtract money values", function() {
      expect(new Money(3000).subtract(new Money(3000)).cents).to.be(0);
    });
  });

  describe("isNegative", function() {
    it("should detect negative values", function() {
      expect(new Money(3000).isNegative()).to.be(false);
      expect(new Money(0).isNegative()).to.be(false);
      expect(new Money(-3000).isNegative()).to.be(true);
    });
  });

  describe("isPositive", function() {
    it("should detect positive values", function() {
      expect(new Money(3000).isPositive()).to.be(true);
      expect(new Money(0).isPositive()).to.be(false);
      expect(new Money(-3000).isPositive()).to.be(false);
    });
  });

  describe("isZero", function() {
    it("should detect zero values", function() {
      expect(new Money(3000).isZero()).to.be(false);
      expect(new Money(0).isZero()).to.be(true);
      expect(new Money(-3000).isZero()).to.be(false);
    });
  });

  describe("formatting", function() {
    it("formats to html with positive", function() {
      const money = new Money(3000);
      expect(money.render()).to.be(
        '<span class="money positive">$30.00</span>'
      );
    });

    it("formats to html with negative", function() {
      const money = new Money(-3000);
      expect(money.render()).to.be(
        '<span class="money negative">-$30.00</span>'
      );
    });

    it("formats to html with zero value", function() {
      const money = new Money(0);
      expect(money.render()).to.be('<span class="money zero">$0.00</span>');
    });

    it("formats to html with thousand serperator", function() {
      const money = new Money(100000);
      expect(money.render()).to.be(
        '<span class="money positive">$1,000.00</span>'
      );
    });

    it("converts to string", function() {
      const money = new Money(3000);
      expect(money.toString()).to.be("30.00");
    });

    it("has thousand seperators", function() {
      const money = new Money(884936);
      expect(money.toString()).to.be("8,849.36");
    });

    it("has thousand seperators for negative numbers", function() {
      const money = new Money(-884936);
      expect(money.toString()).to.be("-8,849.36");
    });
  });

  describe("rounding", function() {
    describe("positive numbers", function() {
      it("rounds down", function() {
        const money = new Money(121);
        expect(money.round().cents).to.be(120);
      });

      it("rounds down", function() {
        const money = new Money(122);
        expect(money.round().cents).to.be(120);
      });

      it("rounds up", function() {
        const money = new Money(123);
        expect(money.round().cents).to.be(125);
      });

      it("rounds up", function() {
        const money = new Money(124);
        expect(money.round().cents).to.be(125);
      });

      it("stays the same", function() {
        const money = new Money(125);
        expect(money.round().cents).to.be(125);
      });

      it("rounds down", function() {
        const money = new Money(126);
        expect(money.round().cents).to.be(125);
      });

      it("rounds down", function() {
        const money = new Money(127);
        expect(money.round().cents).to.be(125);
      });

      it("rounds up", function() {
        const money = new Money(128);
        expect(money.round().cents).to.be(130);
      });

      it("rounds up", function() {
        const money = new Money(129);
        expect(money.round().cents).to.be(130);
      });

      it("stays the same", function() {
        const money = new Money(130);
        expect(money.round().cents).to.be(130);
      });
    });

    describe("negative numbers", function() {
      it("rounds up", function() {
        const money = new Money(-121);
        expect(money.round().cents).to.be(-120);
      });

      it("rounds up", function() {
        const money = new Money(-122);
        expect(money.round().cents).to.be(-120);
      });

      it("rounds down", function() {
        const money = new Money(-123);
        expect(money.round().cents).to.be(-125);
      });

      it("rounds down", function() {
        const money = new Money(-124);
        expect(money.round().cents).to.be(-125);
      });

      it("stays the same", function() {
        const money = new Money(-125);
        expect(money.round().cents).to.be(-125);
      });

      it("rounds up", function() {
        const money = new Money(-126);
        expect(money.round().cents).to.be(-125);
      });

      it("rounds up", function() {
        const money = new Money(-127);
        expect(money.round().cents).to.be(-125);
      });

      it("rounds down", function() {
        const money = new Money(-128);
        expect(money.round().cents).to.be(-130);
      });

      it("rounds down", function() {
        const money = new Money(-129);
        expect(money.round().cents).to.be(-130);
      });

      it("stays the same", function() {
        const money = new Money(-130);
        expect(money.round().cents).to.be(-130);
      });
    });
  });
});
