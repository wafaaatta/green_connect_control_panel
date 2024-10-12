// taxService.js

import taxApi from "./taxApi";

export const calculateTax = (amount) => {
  const taxRate = taxApi.getTaxRate(); // External service call
  console.log(taxApi.getTaxRate());
  
  return amount * taxRate;
};
