const ConversionServer = require("./service");

exports.getCurrencyConversion = async () => {
  let data = await ConversionServer.getCurrencyConversion();
  data.map((item, index) => {
    item = {
      _id: item._id,
      money: item.money,
      exchangeMoney: item.exchangeMoney,
    };
    return item;
  });
  return data;
};

exports.getCurrencyConversionById = async (id) => {
  let currency_conversion = await ConversionServer.getCurrencyConversionById(
    id
  );
  currency_conversion = {
    _id: currency_conversion._id,
    money: currency_conversion.money,
    exchangeMoney: currency_conversion.exchangeMoney,
  };
  return currency_conversion;
};

exports.exchangeMoney = async (money) => {
  let data = await ConversionServer.getOneMoney(money);
  return data.exchangeMoney;
};
exports.insert = async (body) => {
  const result = await ConversionServer.insert(body);
  return result;
};
exports.update = async (id, product) => {
  await ConversionServer.update(id, product);
};
exports.delete = async (id) => {
  await ConversionServer.delete(id);
};

exports.inserConversion = async (body) => {
  await ConversionServer.inserConversion(body);
};

exports.hidden = async (id, map) => {
  await ConversionServer.hidden(id, map);
};

exports.unHidden = async (id, map) => {
  await ConversionServer.unHidden(id, map);
};
