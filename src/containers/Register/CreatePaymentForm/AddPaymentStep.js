import React from "react";
const inputClasses = `bg-white appearance-none border-2 border-gray-200 bg-white rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-purple-500`;

const AddPaymentStep = ({ setAmount, amount }) => {
  return (
    <div className="p-2">
      <input
        value={amount}
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        placeholder={"entrer le montant"}
        name="amount"
        className={inputClasses}
      />
    </div>
  );
};

export default AddPaymentStep;
