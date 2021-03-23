const Money = require("../dist/money");

describe("Money", () => {
  describe("when constructing money", () => {
    it("returns correct integer value", () => {
      const num = 1200;
      const money = new Money(num);
      expect(money.cents).toBe(1200);
    });

    it("returns correct string value", () => {
      const string = "22";
      const money = new Money(string);
      expect(money.cents).toBe(2200);
    });

    it("returns correct money string value", () => {
      const moneyString = "$1.00";
      const money = new Money(moneyString);
      expect(money.cents).toBe(100);
    });

    it("returns correct money string value", () => {
      const moneyString = "10.2";
      const money = new Money(moneyString);
      expect(money.cents).toBe(1020);
    });

    it("returns correct money string value", () => {
      const moneyString = ".2";
      const money = new Money(moneyString);
      expect(money.cents).toBe(20);
    })

    it("returns correct money string value", () => {
      const moneyString = "1.2";
      const money = new Money(moneyString);
      expect(money.cents).toBe(120);
    })

    it("returns correct money string value", () => {
      const moneyString = "1.200";
      const money = new Money(moneyString);
      expect(money.cents).toBe(120);
    })

    it("returns correct money from invalid string value", () => {
      const money = new Money("abc");
      expect(money.cents).toBe(0);
    });

    it("returns correct money object value", () => {
      const num = {
        cents: 1000
      };
      const money = new Money(num);
      expect(money.cents).toBe(1000);
    });

    it("returns correct object value", () => {
      const object = {
        key: 1000
      };
      const money = new Money(object);
      expect(money.cents).toBe(0);
    });

    it("returns correct array value", () => {
      const array = [10];
      const money = new Money(array);
      expect(money.cents).toBe(0);
    });

    it("returns correct NaN value", () => {
      const aNaNValue = 10 / "a";
      const money = new Money(aNaNValue);
      expect(money.cents).toBe(0);
    });
  });

  describe("when calcalating multiplications", () => {
    const operand = 0.015;
    it("rounds the positive amount conventionally", () => {
      const money = new Money(3900);
      expect(money.multiply(operand).cents).toBe(59);
    });

    it("rounds the negative amount symmetrically", () => {
      const money = new Money(-3900);
      expect(money.multiply(operand).cents).toBe(-59);
    });
  });

  describe("comparison", () => {
    it("Should not equal an object with different cents", () => {
      const money = new Money(3000);
      expect(money.equals(new Money(20))).toBe(false);
    });

    it("Should equal an object with same cents value", () => {
      const money = new Money(3000);
      expect(money.equals(new Money(3000))).toBe(true);
    });
  });

  describe("add", () => {
    it("should add money values", () => {
      expect(new Money(3000).add(new Money(3000)).cents).toBe(6000);
    });
  });

  describe("subtract", () => {
    it("should subtract money values", () => {
      expect(new Money(3000).subtract(new Money(3000)).cents).toBe(0);
    });
  });

  describe("isNegative", () => {
    it("should detect negative values", () => {
      expect(new Money(3000).isNegative()).toBe(false);
      expect(new Money(0).isNegative()).toBe(false);
      expect(new Money(-3000).isNegative()).toBe(true);
    });
  });

  describe("isPositive", () => {
    it("should detect positive values", () => {
      expect(new Money(3000).isPositive()).toBe(true);
      expect(new Money(0).isPositive()).toBe(false);
      expect(new Money(-3000).isPositive()).toBe(false);
    });
  });

  describe("isZero", () => {
    it("should detect zero values", () => {
      expect(new Money(3000).isZero()).toBe(false);
      expect(new Money(0).isZero()).toBe(true);
      expect(new Money(-3000).isZero()).toBe(false);
    });
  });

  describe("formatting", () => {
    it("formats to html with positive", () => {
      const money = new Money(3000);
      expect(money.render()).toBe('<span class="money positive">$30.00</span>');
    });

    it("formats to html with negative", () => {
      const money = new Money(-3000);
      expect(money.render()).toBe('<span class="money negative">-$30.00</span>');
    });

    it("formats to html with zero value", () => {
      const money = new Money(0);
      expect(money.render()).toBe('<span class="money zero">$0.00</span>');
    });

    it("formats to html without thousand serperator", () => {
      const money = new Money(100000);
      expect(money.render()).toBe('<span class="money positive">$1000.00</span>');
    });

    it("converts to string", () => {
      const money = new Money(3000);
      expect(money.toString()).toBe("30.00");
    });

    it("does not have thousand seperators", () => {
      const money = new Money(884936);
      expect(money.toString()).toBe("8849.36");
    });

    it("does not have thousand seperators for negative numbers", () => {
      const money = new Money(-884936);
      expect(money.toString()).toBe("-8849.36");
    });
  });

  describe("coercion", () => {
    // Large is determined by when the "," seperator gets applied which is currently at 1000
    it("has correct primitive value for large positive fractionals", () => {
      const money = new Money("$1000.50");
      expect(Math.abs(money)).toBe(1000.50);
    });

    it("has correct primitive value for large negative fractionals", () => {
      const money = new Money("$-1000.50");
      expect(Math.abs(money)).toBe(1000.50);
    });

    it("has correct primitive value for large whole numbers", () => {
      const money = new Money("$1000");
      expect(Math.abs(money)).toBe(1000);
    });

    it(
      "has correct primitive value for large negative whole numbers",
      () => {
        const money = new Money("$-1000");
        expect(Math.abs(money)).toBe(1000);
      }
    );

    it("has correct primitive value for small whole numbers", () => {
      const money = new Money("$1");
      expect(Math.abs(money)).toBe(1);
    });

    it("has correct primitive value for small fractional numbers", () => {
      const money = new Money("$1.5");
      expect(Math.abs(money)).toBe(1.50);
    });
  });

  describe("rounding", () => {
    describe("positive numbers", () => {
      it("rounds down", () => {
        const money = new Money(121);
        expect(money.round().cents).toBe(120);
      });

      it("rounds down", () => {
        const money = new Money(122);
        expect(money.round().cents).toBe(120);
      });

      it("rounds up", () => {
        const money = new Money(123);
        expect(money.round().cents).toBe(125);
      });

      it("rounds up", () => {
        const money = new Money(124);
        expect(money.round().cents).toBe(125);
      });

      it("stays the same", () => {
        const money = new Money(125);
        expect(money.round().cents).toBe(125);
      });

      it("rounds down", () => {
        const money = new Money(126);
        expect(money.round().cents).toBe(125);
      });

      it("rounds down", () => {
        const money = new Money(127);
        expect(money.round().cents).toBe(125);
      });

      it("rounds up", () => {
        const money = new Money(128);
        expect(money.round().cents).toBe(130);
      });

      it("rounds up", () => {
        const money = new Money(129);
        expect(money.round().cents).toBe(130);
      });

      it("stays the same", () => {
        const money = new Money(130);
        expect(money.round().cents).toBe(130);
      });
    });

    describe("negative numbers", () => {
      it("rounds up", () => {
        const money = new Money(-121);
        expect(money.round().cents).toBe(-120);
      });

      it("rounds up", () => {
        const money = new Money(-122);
        expect(money.round().cents).toBe(-120);
      });

      it("rounds down", () => {
        const money = new Money(-123);
        expect(money.round().cents).toBe(-125);
      });

      it("rounds down", () => {
        const money = new Money(-124);
        expect(money.round().cents).toBe(-125);
      });

      it("stays the same", () => {
        const money = new Money(-125);
        expect(money.round().cents).toBe(-125);
      });

      it("rounds up", () => {
        const money = new Money(-126);
        expect(money.round().cents).toBe(-125);
      });

      it("rounds up", () => {
        const money = new Money(-127);
        expect(money.round().cents).toBe(-125);
      });

      it("rounds down", () => {
        const money = new Money(-128);
        expect(money.round().cents).toBe(-130);
      });

      it("rounds down", () => {
        const money = new Money(-129);
        expect(money.round().cents).toBe(-130);
      });

      it("stays the same", () => {
        const money = new Money(-130);
        expect(money.round().cents).toBe(-130);
      });
    });
  });
});
