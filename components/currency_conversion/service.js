const currencyConversion = require('./model');

exports.getCurrencyConversion = async () => {
    const exchangeMoney = await currencyConversion.find().sort('money');
    return exchangeMoney;
}

exports.getCurrencyConversionById = async (id) => {
  const currency_conversion = await currencyConversion.findById(id);
  return currency_conversion;
}
exports.getOneMoney = async (money) => {
    const exchangeMoney = await currencyConversion.findOne({money: money});
    return exchangeMoney;
}
exports.insert = async (exchangeMoney) => {
    const em = new pointModel(exchangeMoney);
    await em.save();
  }
exports.update = async (id, exchange) => {
    const open = await currencyConversion.findByIdAndUpdate(id, exchange)
    .then(data =>{
        console.log(">>>>>"+data);
        return true;
      }).catch(err =>{
        console.log("thất bại");
        return false;
      });
}
exports.delete = async (id) => {
    const open = currencyConversion.findIdAndDelete({ id: id });
    return open;
}

exports.inserConversion = async (exchange) => {
  const c= new currencyConversion(exchange);
  await c.save();
}

exports.hidden = async (id,status) => {
  var status = false;
  const exchange = await currencyConversion.findById(id);
  exchange.status = status;   
  await currencyConversion.findByIdAndUpdate(id, exchange);
  return exchange;
}

exports.unHidden = async (id,status) => {
  var status = true;
  const exchange = await currencyConversion.findById(id);
  exchange.status = status;   
  await currencyConversion.findByIdAndUpdate(id, exchange);
  return exchange;
}