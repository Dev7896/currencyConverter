const url = "2dce6a3b84aa8122b65e82f1";

let selectElements = document.querySelectorAll(".currency-type");
let selectOne = document.querySelector("#first_currency");
let selectSecond = document.querySelector("#second_currency");
let currencyElementOne = document.querySelector("#currency-one");
let currencyElementSecond = document.querySelector("#currency-two");
let inputElementOne = document.querySelector("#first-amount");
let inputElementSecond = document.querySelector("#second-amount");
let convert = document.querySelector("#convert");
const swap = document.querySelector(".swap");

const currencies = [
  "",
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "FOK",
  "GBP",
  "GEL",
  "GGP",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "IMP",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KID",
  "KMF",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLE",
  "SLL",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TVD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "UYU",
  "UZS",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XCD",
  "XDR",
  "XOF",
  "XPF",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL",
];

function putElements(cur_array) {
  selectElements.forEach((select) => {
    cur_array.forEach((currency) => {
      let option = document.createElement("option");
      option.value = currency;
      option.textContent = currency;
      select.appendChild(option);
    });
  });
}

function currencyPrinter(curele, selectEle) {
  let currency = selectEle.value;
  curele.textContent = currency;
}

async function getCurrencyData(url, from_cur, to_curr) {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${url}/latest/${from_cur}`
    );
    const data = await response.json();
    // console.log(data);
    let result = data["conversion_rates"][`${to_curr}`];
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

function currencyConverter(to_curr, amount) {
  let result = amount * to_curr;
  return result;
}

function swaping() {
  let temp = selectOne.value;
  selectOne.value = selectSecond.value;
  selectSecond.value = temp;

  selectOne.dispatchEvent(new Event('change')) ;
  selectSecond.dispatchEvent(new Event('change')) ;
}

document.addEventListener("DOMContentLoaded", () => {
  // console.log('hello world')
  putElements(currencies);
  selectOne.addEventListener("change", () => {
    currencyPrinter(currencyElementOne, selectOne);
  });
  selectSecond.addEventListener("change", () => {
    currencyPrinter(currencyElementSecond, selectSecond);
  });

  convert.addEventListener("click", async () => {
    try {
      if (
        currencyElementOne.textContent == "currency" ||
        currencyElementSecond.textContent == "currency"
      ) {
        alert("select some values....");
        throw new Error("select some values");
      }
      if (currencyElementOne.textContent == currencyElementSecond.textContent) {
        alert("same currency..select some different currencies");
        throw new Error("same currency");
      }
      if (
        inputElementOne.value == 0 ||
        inputElementOne.value == "" ||
        inputElementOne.value == null
      ) {
        alert("enter some amount to convert..");
        throw new Error("enter some amount to convert...");
      }
      const result = await getCurrencyData(
        url,
        currencyElementOne.textContent.toUpperCase(),
        currencyElementSecond.textContent.toUpperCase()
      );
      // console.log(result);
      let currency = currencyConverter(result, inputElementOne.value);
      inputElementSecond.value = `${currency}`;
    } catch (error) {
      console.log(error.message);
    }
  });
  convert.addEventListener("dbclick", () => {
    alert("do not click multiple times..");
  });

  swap.addEventListener("click", () => {
    swaping();
  });
});
