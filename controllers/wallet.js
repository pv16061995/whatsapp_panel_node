const dao = require("../dao/common");

exports.addMoney = async (
  reqBody,
  senderUserDetails,
  receiverUserDetails,
  getUsersTableDetails,
  getFundsTableDetails,
  senderUserFilter,
  receiverUserFilter
) => {
  const fundData = [
    {
      sender_id: reqBody.receiver_id,
      receiver_id: reqBody.sender_id,
      amount: reqBody.amount,
      type: "credit",
      status: 1,
    },
  ];

  if (senderUserDetails.user_type != 1) {
    fundData.push({
      sender_id: reqBody.sender_id,
      receiver_id: reqBody.receiver_id,
      amount: reqBody.amount,
      type: "debit",
      status: 1,
    });

    const updateSenderBalance = {
      balance: parseInt(senderUserDetails.balance) - parseInt(reqBody.amount),
    };
    await dao.updateData(
      updateSenderBalance,
      getUsersTableDetails,
      senderUserFilter
    );
  }

  const updateReceiverBalance = {
    balance: parseInt(receiverUserDetails.balance) + parseInt(reqBody.amount),
  };

  await dao.updateData(
    updateReceiverBalance,
    getUsersTableDetails,
    receiverUserFilter
  );

  return await dao.saveData(fundData, getFundsTableDetails);
};

exports.receiveMoney = async (reqBody, getTableDetails) => {
  return await dao.saveData(reqBody, getTableDetails);
};
