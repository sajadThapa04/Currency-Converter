import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
useCurrencyInfo
function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("aud");
  const [to, setTo] = useState("npr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from); // Fetch data for the 'from' currency
  const options = Object.keys(currencyInfo || {}); // Safeguard against empty or undefined data
  console.log("Currency Info for", from, ":", currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
    } else {
      console.warn("Conversion rate not available for the selected currency.");
    }
  };

  return (
    <div
      className="pb-10 w-full h-screen flex rounded-3xl flex-wrap justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://plus.unsplash.com/premium_photo-1677690630178-acde209d6027?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="w-full">
      <h1 className="bg-black/70 p-4 rounded-lg text-white/85 font-serif font-semibold  text-3xl mb-7">Currency Converter</h1>

        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amt) => setAmount(amt)}
                selectCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                onClick={swap}
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-opacity-30 border-teal-300 rounded-md bg-white/85 text-black px-2 py-1"
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg"
            >
              Convert {String(from).toUpperCase()} to {String(to).toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
