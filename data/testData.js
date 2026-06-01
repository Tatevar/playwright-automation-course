export const users = {
  standard: {
    username: process.env.SAUCE_USERNAME ?? 'standard_user',
    password: process.env.SAUCE_PASSWORD ?? 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: process.env.SAUCE_PASSWORD ?? 'secret_sauce',
  },
};

export const products = {
  backpack: 'Sauce Labs Backpack',
  boltTShirt: 'Sauce Labs Bolt T-Shirt',
};

export const checkoutCustomer = {
  firstName: 'Sam',
  lastName: 'Shopper',
  postalCode: '90210',
};
