const receiptModel = require("./model");

exports.getReceiptByUser = async (user_id) => {
  const receip = await receiptModel.find({ user_id: user_id });
  return receip;
};

exports.getReceiptPriceByUser = async (user_id) => {
  const receip = await receiptModel.aggregate([
    {
      $group: {
        _id: "$Date",
        total_price: { $sum: "$price" },
      },
    },
  ]);
  return receip;
};

exports.insert = async (receipt) => {
  const r = new receiptModel(receipt);
  let result = null;
  await r
    .save()
    .then((data) => {
      console.log(">>>>>" + data);
      result = true;
    })
    .catch((err) => {
      console.log("thất bại");
      result = false;
    });
  return result;
};
exports.update = async (id, receipt) => {
  await receiptModel
    .findByIdAndUpdate(id, receipt)
    .then((data) => {
      console.log(">>>>>" + data);
      result = true;
    })
    .catch((err) => {
      console.log("thất bại");
      result = false;
    });
  return result;
};
exports.delete = async (id) => {
  await receiptModel.findIdAndDelete(id);
};

exports.getPrice = async () => {
  const data = await receiptModel.find().populate("user_id");
  return data;
};

// danh sách 20 người chơi có tỉ lệ nạp thẻ cao nhất
exports.getTopPrice = async () => {
  const user = await receiptModel
    .find({ price: { $gt: 0 } })
    .sort("-price")
    .limit(20);
  return user;
};

exports.getReceiptPriceByUser = async (user_id) => {
  const receip = await receiptModel.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%m", date: "$Date" } },
        total_price: { $sum: "$price" },
      },
    },
  ]);
  return receip;
};

exports.getTopReceiptPriceByUser = async () => {
  const receip = await receiptModel.aggregate([
    {
      $group: {
        _id: "$user_id",
        total_price: { $sum: "$price" },
      },
    },
    { $sort: { total_price: -1 } },
    { $limit: 20 },
  ]);
  return receip;
};
