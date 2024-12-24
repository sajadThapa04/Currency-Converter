import { useId } from "react";

function InputBox({
  label,
  className = "",
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
}) {
  const amountInputId = useId();
  return (
    <div className={`bg-black/85 p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label
          htmlFor={amountInputId}
          className="text-white-400 font-serif text-xl mb-2 inline-block"
        >
          {label}
        </label>
        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5 text-2xl"
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          } //we have to convert it to Number because by default it is string as currency is Number
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-white font-serif  text-xl mb-2 w-full">Currency Type</p>
        <select
          value={selectCurrency}
          onChange={(e) => {
            onCurrencyChange && onCurrencyChange((e.target.value));
            console.log(onCurrencyChange(e.target.value));
          }}
          disabled={currencyDisable}
          className="rounded-lg px-1 py-1 bg-green-500 cursor-pointer outline-none"
        >
          {currencyOptions.map((currency) =>(
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
