# Money

Create JS money objects from strings, integers or floats

[![Build Status](https://travis-ci.org/sealink/money_beans.svg?branch=master)](https://travis-ci.org/sealink/money_beans)

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

### Deployment

Build / Deployment is handled via travis CI.
Package management is via NPM.

First create the release branch
```
git branch release/0.3.0
```

Second Update package.json and specify the version you are releasing

Next Tag and push to travis
```
git tag v0.3.0
git push origin master --tags
```
Remember to merge changes back to the master branch
