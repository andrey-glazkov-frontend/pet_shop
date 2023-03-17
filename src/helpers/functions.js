import { sortValues } from '../redux/slices/sortProductSlice'

const getTimeOfCreating = (timestamp) => {
  const date = new Date(timestamp)
  return date.valueOf()
}

export const getDiscountedPrice = (price, discount) => Math.round(price * ((100 - discount) / 100))

const highPriceCounter = (prodA, prodB) => {
  const priceA = prodA.discount
    ? getDiscountedPrice(prodA.price, prodA.discount) : prodA.price
  const priceB = prodB.discount
    ? getDiscountedPrice(prodB.price, prodB.discount) : prodB.price
  return priceA - priceB
}

export const getProductRate = (product) => {
  const rating = product.reviews.length
    ? product.reviews.reduce((sum, rate) => sum + rate.rating, 0) / product.reviews.length : 0
  return rating.toFixed(1)
}

const ratingCounter = (productA, productB) => {
  const rateOne = getProductRate(productA)
  const rateTwo = getProductRate(productB)
  return rateTwo - rateOne
}

export const sortProducts = (products, sortValue) => {
  switch (sortValue) {
    case sortValues.POPULAR:
      products.sort((a, b) => b.likes.length - a.likes.length)
      break
    case sortValues.NEWEST:
      products.sort((a, b) => getTimeOfCreating(b.created_at)
          - getTimeOfCreating(a.created_at))
      break
    case sortValues.PRICE_LOW:
      products.sort((a, b) => highPriceCounter(a, b))
      break
    case sortValues.PRICE_HIGH:
      products.sort((a, b) => -highPriceCounter(a, b))
      break
    case sortValues.RATE:
      products.sort((a, b) => ratingCounter(a, b))
      break
    case sortValues.DISCOUNT:
      products.sort((a, b) => b.discount - a.discount)
      break

    default:
      break
  }
}

export const token = localStorage.getItem('userToken')
