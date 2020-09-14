import currency from "currency.js";

export default class Money {
  constructor(num) {
    this.cents = Money.getCents(num);
  }

  static getCents(num) {
    if (typeof num === "number" && !Number.isNaN(num)) return num;
    if (typeof num === "string") return Money.buildFromString(num);
    if (num.cents != null) return num.cents;
    return 0;
  }

  static buildFromString(stringNumber) {
    return currency(stringNumber).intValue;
  }

  static format(amount) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  static currencySymbol() {
    return "$"; // TODO: implement proper currency;
  }

  dollars() {
    return this.cents / 100.0;
  }

  format() {
    return Money.format(this.dollars());
  }

  signClass() {
    if (this.sign() === 1) return "positive";
    if (this.sign() === -1) return "negative";
    return "zero";
  }

  sign() {
    return this.cents && this.cents / Math.abs(this.cents);
  }

  absoluteFormat() {
    return Money.format(Math.abs(this.dollars()));
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

  signSymbol() {
    if (this.sign() === -1) return "-";
    return "";
  }

  currencyFormat() {
    return this.signSymbol() + Money.currencySymbol() + this.absoluteFormat();
  }

  add(other) {
    return new Money(this.cents + other.cents);
  }

  subtract(other) {
    return new Money(this.cents - other.cents);
  }

  multiply(num) {
    const absoluteResult = Math.abs(this.cents) * num;
    return new Money(Math.round(absoluteResult) * this.sign());
  }

  render() {
    return `<span class="money ${this.signClass()}">${this.currencyFormat()}</span>`;
  }

  toString() {
    return this.format();
  }

  round() {
    const modulo = this.cents % 5;

    if (Math.abs(modulo) <= 2) return new Money(this.cents - modulo);
    if (modulo < 0) return new Money(this.cents - (5 + modulo));
    return new Money(this.cents + (5 - modulo));
  }
}
