import { formatDate } from "../../../utils/formatDate";
export const PaymentSchema = (refrence, amount, fullName, date) => {
  if (amount <= 0) throw new Error("payment not provided");

  return {
    fullName: fullName || "",
    date: formatDate(date) || date(new Date()),
    amount: amount, // required
    refrence: refrence || "", //P0000
  };
};
