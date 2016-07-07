describe 'Money', ->
  describe 'when constructing money', ->

    it 'returns correct integer value', ->
      num = 1200
      money = new Money(num)
      expect(money.cents).toEqual 1200

    it 'returns correct string value', ->
      string = '22'
      money = new Money(string)
      expect(money.cents).toEqual 2200

    it 'returns correct money string value', ->
      moneyString = '$1.00'
      money = new Money(moneyString)
      expect(money.cents).toEqual 100

    it 'returns correct money object value', ->
      num = {cents: 1000}
      money = new Money(num)
      expect(money.cents).toEqual 1000

    it 'returns correct object value', ->
      object = {key: 1000}
      money = new Money(object)
      expect(money.cents).toEqual 0

    it 'returns correct array value', ->
      array = [10]
      money = new Money(array)
      expect(money.cents).toEqual 0

    it 'returns correct NaN value', ->
      aNaNValue = 10/'a'
      money = new Money(aNaNValue)
      expect(money.cents).toEqual 0


  describe 'when calcalating multiplications', ->
    operand = .015

    it 'rounds the positive amount conventionally', ->
      money = new Money 3900
      expect(money.multiply(operand).cents).toEqual 59

    it 'rounds the negative amount symmetrically', ->
      money = new Money -3900
      expect(money.multiply(operand).cents).toEqual -59
