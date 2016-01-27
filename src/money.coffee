((root, factory) ->
  if typeof define == 'function' and define.amd
    define [], factory
  else if typeof exports == 'object'
    module.exports = factory()
  else
    root.Money = factory()
  return
) this, ->

  class Money
    constructor: (num) ->
      @cents = @getCents(num)

    getCents: (num) ->
      return 0 if num is NaN
      return num if typeof num is 'number'
      return @buildFromString num if typeof num is 'string'
      console.warn "Please use a number when creating a Money object not a #{typeof num}. Called from #{arguments.callee.caller.toString()} with ", num
      0

    buildFromString: (num) ->
      # remove everything (comma, $, etc.) except the number and decimal in between
      # - decimal optional, no decimal = dollars
      num = num.replace(/,/g,'').match(/[0-9]+.?[0-9]*/, '')
      return 0 unless num? # if num is other string
      nums = num[0].split('.')
      dollars = parseInt(nums[0])
      cents = if nums[1]? then parseInt(nums[1]) else 0
      dollars * 100 + cents

    dollars: ->
      @cents / 100.0

    format: ->
      @dollars().toFixed(2)

    signClass: ->
      if @sign() == 1 then 'positive' else if @sign() == -1 then 'negative' else 'zero'

    sign: ->
      @cents && (@cents / Math.abs(@cents))

    absoluteFormat: ->
      Math.abs(@dollars()).toFixed(2)

    isZero: ->
      @cents == 0

    isPositive: ->
      @cents > 0

    isNegative: ->
      @cents < 0

    equals: (other) ->
      @cents == other.cents

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
      absoluteResult = Math.abs(@cents) * num
      new Money Math.round(absoluteResult) * @sign()

    render: ->
      "<span class=\"money #{@signClass()}\">#{@currencyFormat()}</span>"

    toString: ->
      @format()
