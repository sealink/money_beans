# Money

Create JS money objects from strings, integers or floats

## Get started

```coffee
Money = require('money')

new Money()
# returns => Object {cents: 0}

new Money('12.2')
# returns => Object {cents: 1220}

new Money(195)
# returns => Object {cents: 19500}

```

## Render

```coffee
Money = require('money')
price = new Money(10)

price.format()
# returns = '10.00'

price.render()
# returns => "<span class='money positive'>$10.00</span>"

```

## Operations

```coffee
Money = require('money')

## Multiply

productPrice = new Money('49.95')
quantity = 3
subTotal = productPrice.multiply(quantity)
# returns => Object {cents: 14985}

## Addition

shipping = new Money('20')
total = subTotal.add(shipping)
# returns => Object {cents: 16985}

## Subtraction

discount = new Money('10')
finalTotal = total.subtract(discount)
# returns => Object {cents: 15985}

```
