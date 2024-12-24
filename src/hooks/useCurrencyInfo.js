import { useEffect, useState } from "react";

const useCurrencyInfo = (currencyCode) => {
  const [currencyData, setCurrencyData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currencyCode || typeof currencyCode !== "string") {
      console.warn("Invalid currency code:", currencyCode);
      return;
    }

    const fetchCurrencyData = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyCode}.json`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch currency data for ${currencyCode}`);
        }
        const data = await response.json();
        console.log("Fetched currencies:", data); // Log the fetched data

        setCurrencyData(data[currencyCode] || {});
      } catch (err) {
        console.error("Error fetching currency data:", err.message);
        setError(err);
      }
    };

    fetchCurrencyData();
  }, [currencyCode]);

  return currencyData || {}; // Return empty object if no data is fetched
};

export default useCurrencyInfo;
