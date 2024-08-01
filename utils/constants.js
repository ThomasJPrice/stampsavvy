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

export const icons = {
  coffeeCup: {
    name: 'Coffee Cup',
    internals:
      <g id="line">
        <ellipse cx="36" cy="36" rx="19" ry="28" fill="none" stroke="#000" stroke-width="2" />
        <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m36,36s-3-5.5964-3-12.5,3-12.5,3-12.5" />
        <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m36,36s3,5.5964,3,12.5-3,12.5-3,12.5" />
      </g>,
  }
}