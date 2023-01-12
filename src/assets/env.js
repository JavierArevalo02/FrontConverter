(function (window) {
    window["env"] = window["env"] || {};
    window["env"].production = false;
    window["env"].converterFixer = "https://api.apilayer.com/fixer/convert?";
    window["env"].converterCurrency = "https://api.apilayer.com/currency_data/convert?";
    window["env"].converterExchangerates = "https://api.apilayer.com/exchangerates_data/convert?";
})(this)