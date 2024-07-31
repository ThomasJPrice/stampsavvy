export const plans = [
  // monthly
  {
    link:
      process.env.NODE_ENV === 'development'
        ? 'https://buy.stripe.com/test_00g01X3cm2M13EQcMM'
        : '',
    priceId:
      process.env.NODE_ENV === 'development'
        ? 'price_1PiXyaLt42gOHyJ293dl44la'
        : '',
    price: 35,
    duration: '/month',
    title: 'Monthly'
  },

  // yearly
  {
    link:
      process.env.NODE_ENV === 'development'
        ? 'https://buy.stripe.com/test_6oEbKF4gqfyNgrC145'
        : '',
    priceId:
      process.env.NODE_ENV === 'development'
        ? 'price_1PiZBoLt42gOHyJ2fJPcdFPB'
        : '',
    price: 350,
    duration: '/year',
    title: 'Yearly'
  }
]