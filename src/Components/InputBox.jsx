import React, { useId } from 'react';

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = 'usd',
  amountDisabled = false,
  currencyDisabled = false,
  className = "",
}) {
  const id = useId();

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      {/* Amount Input Section */}
      <div className="w-1/2 pr-2">
        <label htmlFor={id} className="text-black/40 mb-2 inline-block">{label}</label>
        <input border-none
          id={id}
          type="number"
          value={amount} // ✅ make it controlled
          onChange={(e) => !amountDisabled && onAmountChange && onAmountChange(Number(e.target.value))}
          disabled={amountDisabled}
          className="outline-none w-full bg-transparent py-1.5"
          placeholder="Amount"
        />
      </div>

      {/* Currency Select Section */}
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <label className="text-black/40 mb-2 w-full">Currency Type</label>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)} // ✅ fixed
          disabled={currencyDisabled}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
