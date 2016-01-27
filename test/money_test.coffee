describe 'Money', ->
  describe 'when calcalating multiplications', ->
    operand = .015

    it 'rounds the positive amount conventionally', ->
      money = new Money 3900
      expect(money.multiply(operand).cents).toEqual 59

    it 'rounds the negative amount symmetrically', ->
      money = new Money -3900
      expect(money.multiply(operand).cents).toEqual -59
