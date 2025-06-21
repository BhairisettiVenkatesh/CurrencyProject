import { useState } from 'react';
import './App.css';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import { InputBox } from './Components/index.js';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const convert = () => {
    if (currencyInfo[to]) {
      const result = amount * currencyInfo[to];
      setConvertedAmount(result);
    }
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg)`
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full -mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
              />
            </div>

            <div className="relative w-full h-0.5 my-3">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>

            <div className="w-full -mb-1">
              <InputBox
                label="To"
                amount={+convertedAmount.toFixed(2)} // 👈 Show formatted amount in the input
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                amountDisabled // 👈 disables input
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg mt-4"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>

            {/* 👇 Display result below */}
            {convertedAmount > 0 && (
              <div className="mt-4 text-center text-white text-lg font-semibold">
                {amount} {from.toUpperCase()} = {convertedAmount.toFixed(2)} {to.toUpperCase()}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
