function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const fetchCurrencyRate = async (setValue, setError) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    setValue(response.data.ethereum.usd);
    console.log(response.data.ethereum.usd);
    return response.data.ethereum.usd;
  } catch (error) {
    setError("Can't fetch ethereum");
    return error;
  }
};
export { isEmpty, classNames, fetchCurrencyRate };
