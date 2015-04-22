class Money
  constructor: (num) ->
    @cents = if typeof num == 'number'
      num || 0
    else
      num = num.replace(/,/g,'').match(/[0-9]+.?[0-9]*/, '')[0] # remove everything (comma, $, etc.) except the number and decimal in between - decimal optional, no decimal = dollars
      nums = num.split('.')
      dollars = parseInt(nums[0])
      cents = if nums[1]? then parseInt(nums[1]) else 0
      dollars * 100 + cents

  format: ->
    (@cents/100.0).toFixed(2)

  signClass: ->
    if @sign() == 1 then 'positive' else if @sign() == -1 then 'negative' else 'zero'

  sign: ->
    @cents && (@cents / Math.abs(@cents))

  absoluteFormat: ->
    Math.abs(@cents/100.0).toFixed(2)

  isZero: ->
    @cents == 0

  isPositive: ->
    @cents > 0

  isNegative: ->
    @cents < 0

  currencySymbol: ->
    '$' #TODO: implement proper currency

  signSymbol: ->
    if @sign() == -1 then '-' else ''

  currencyFormat: ->
    @signSymbol() + @currencySymbol() +  @absoluteFormat()

  add: (other) ->
    new Money(@cents + other.cents)

  subtract: (other) ->
    new Money(@cents - other.cents)

  multiply: (num) ->
    new Money(Math.round(@cents * num))

  render: ->
    "<span class=\"money #{@signClass()}\">#{@currencyFormat()}</span>"

  toString: ->
    @format()

module.exports = Money
