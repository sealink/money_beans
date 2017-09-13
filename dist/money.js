"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    root.myModule = factory();
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
    module.exports = root.Money = factory();
  } else {
    root.Money = factory();
  }
})(this, function () {
  var Money = function () {
    function Money(num) {
      _classCallCheck(this, Money);

      this.cents = this.getCents(num);
    }

    _createClass(Money, [{
      key: "getCents",
      value: function getCents(num) {
        if (typeof num === 'number' && !isNaN(num)) return num;
        if (typeof num === 'string') return this.buildFromString(num);
        if (num.cents != null) return num.cents;
        return 0;
      }
    }, {
      key: "buildFromString",
      value: function buildFromString(stringNumber) {
        // remove everything (comma, $, etc.) except the number and decimal in between
        // - decimal optional, no decimal = dollars
        var number = stringNumber.replace(/,/g, '').match(/[0-9]+.?[0-9]*/, '');
        if (number == null) return 0; // if num is other string
        var numbers = number[0].split('.');
        var dollars = parseInt(numbers[0]);
        var cents = numbers[1] != null ? parseInt(numbers[1]) : 0;
        return dollars * 100 + cents;
      }
    }, {
      key: "dollars",
      value: function dollars() {
        return this.cents / 100.0;
      }
    }, {
      key: "format",
      value: function format() {
        return this.dollars().toFixed(2);
      }
    }, {
      key: "signClass",
      value: function signClass() {
        if (this.sign() === 1) return 'positive';
        if (this.sign() === -1) return 'negative';
        return 'zero';
      }
    }, {
      key: "sign",
      value: function sign() {
        return this.cents && this.cents / Math.abs(this.cents);
      }
    }, {
      key: "absoluteFormat",
      value: function absoluteFormat() {
        return Math.abs(this.dollars()).toFixed(2);
      }
    }, {
      key: "isZero",
      value: function isZero() {
        return this.cents === 0;
      }
    }, {
      key: "isPositive",
      value: function isPositive() {
        return this.cents > 0;
      }
    }, {
      key: "isNegative",
      value: function isNegative() {
        return this.cents < 0;
      }
    }, {
      key: "equals",
      value: function equals(other) {
        return this.cents === other.cents;
      }
    }, {
      key: "currencySymbol",
      value: function currencySymbol() {
        return '$'; // TODO: implement proper currency;
      }
    }, {
      key: "signSymbol",
      value: function signSymbol() {
        if (this.sign() == -1) return '-';
        return '';
      }
    }, {
      key: "currencyFormat",
      value: function currencyFormat() {
        return this.signSymbol() + this.currencySymbol() + this.absoluteFormat();
      }
    }, {
      key: "add",
      value: function add(other) {
        return new Money(this.cents + other.cents);
      }
    }, {
      key: "subtract",
      value: function subtract(other) {
        return new Money(this.cents - other.cents);
      }
    }, {
      key: "multiply",
      value: function multiply(num) {
        var absoluteResult = Math.abs(this.cents) * num;
        return new Money(Math.round(absoluteResult) * this.sign());
      }
    }, {
      key: "render",
      value: function render() {
        return "<span class=\"money " + this.signClass() + "\">" + this.currencyFormat() + "</span>";
      }
    }, {
      key: "toString",
      value: function toString() {
        return this.format();
      }
    }]);

    return Money;
  }();

  return Money;
});