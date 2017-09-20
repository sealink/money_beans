"use strict";
(function (root, factory) {
  if(typeof define === "function" && define.amd) {
    root.myModule = factory();
  } else if(typeof module === "object" && module.exports) {
    module.exports = (root.Money = factory());
  } else {
    root.Money = factory();
  }
}(this, function() {

  class Money {

    constructor(num) {
      this.cents = this.getCents(num);
    }

    getCents(num) {
      if ( typeof num === 'number' && !isNaN(num) ) return num;
      if ( typeof num === 'string' ) return this.buildFromString(num);
      if ( num.cents != null ) return num.cents;
      return 0;
    }

    buildFromString(stringNumber) {
      // remove everything (comma, $, etc.) except the number and decimal in between
      // - decimal optional, no decimal = dollars
      const number = stringNumber.replace(/,/g,'').match(/[0-9]+.?[0-9]*/, '')
      if (number == null) return 0;  // if num is other string
      const numbers = number[0].split('.');
      const dollars = parseInt(numbers[0]);
      const cents   = numbers[1] != null ? parseInt(numbers[1]): 0;
      return dollars * 100 + cents;
    }

    dollars() {
      return this.cents / 100.0;
    }

    format() {
      return this.dollars().toFixed(2);
    }

    signClass() {
      if (this.sign() === 1) return 'positive';
      if (this.sign() === -1) return 'negative';
      return 'zero';
    }

    sign() {
      return this.cents && (this.cents / Math.abs(this.cents));
    }

    absoluteFormat() {
      return Math.abs(this.dollars()).toFixed(2);
    }

    isZero() {
      return this.cents === 0;
    }

    isPositive() {
      return this.cents > 0;
    }

    isNegative() {
      return this.cents < 0;
    }

    equals(other) {
      return this.cents === other.cents;
    }

    currencySymbol() {
      return '$'; // TODO: implement proper currency;
    }

    signSymbol() {
      if ( this.sign() == -1 ) return '-';
      return '';
    }

    currencyFormat() {
      return this.signSymbol() + this.currencySymbol() +  this.absoluteFormat();
    }

    add(other) {
      return new Money(this.cents + other.cents);
    }

    subtract(other) {
      return new Money(this.cents - other.cents);
    }

    multiply(num) {
      const absoluteResult = Math.abs(this.cents) * num;
      return new Money( Math.round(absoluteResult) * this.sign() );
    }

    render() {
      return `<span class="money ${this.signClass()}">${this.currencyFormat()}</span>`;
    }

    toString() {
      return this.format();
    }

  }
  return Money;
}));
