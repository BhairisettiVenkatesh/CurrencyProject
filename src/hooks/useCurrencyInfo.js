import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!currency) return;

    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
      .then((res) => res.json()) // <-- FIXED: `res` was missing
      .then((res) => setData(res[currency]))
      .catch((err) => {
        console.error("Error fetching currency data:", err);
        setData({});
      });
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
