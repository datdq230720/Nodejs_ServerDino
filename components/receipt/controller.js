const receiptService = require("./service");

exports.getReceiptByUser = async (user_id) => {
  let data = await receiptService.getReceiptByUser(user_id);
  data = data.map((receipt) => {
    let Day = receipt.Date;
    receipt = {
      id: receipt._id,
      user_id: receipt.name,
      price: receipt.price,
      coin: receipt.coin,
      date:
        Day.getDate() +
        "-" +
        Day.getMonth() +
        "-" +
        Day.getFullYear() +
        "  " +
        Day.getHours() +
        ":" +
        Day.getMinutes() +
        ":" +
        Day.getSeconds(),
    };
    return receipt;
  });
  return data;
};


// Trả ra _id(user_id) và total_price
exports.getReceiptPriceByUser = async (user_id) => {
  const receip = await receiptService.getReceiptPriceByUser(user_id);
  return receip;
}

exports.insert = async (body) => {
  const result = await receiptService.insert(body);
  return result;
};

exports.update = async (id, map) => {
  await receiptService.update(id, map);
};

exports.delete = async (id) => {
  await receiptService.delete(id);
};

exports.getPrice = async () => {
  let data = await receiptService.getPrice();
  data = data.map((item) => {
    return item.price;
  });
  return data;
};

exports.getAllPrice = async () => {
  let data = await receiptService.getPrice();
  data = data.map((item) => {
    return item.price;
  });
  return data;
};

// danh sách 20 người chơi có tỉ lệ nạp thẻ nhiều nhất
exports.getTopPrice = async () => {
  let data = await receiptService.getTopPrice();
  data = data.map((item, index) => {
    item = {
      _id: item._id,
      price: item.price,
    };
    return item;
  });
  return data;
};

exports.getReceiptPriceByUser = async (user_id) => {
  const receip = await receiptService.getReceiptPriceByUser(user_id);
  return receip;
}

exports.getTopReceiptPriceByUser = async (user_id) => {
  const receip = await receiptService.getTopReceiptPriceByUser(user_id);
  return receip;
}
