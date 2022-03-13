exports.responseHelper = (res, status, data, statusCode, message) => {
  const resStatus = status ? "success" : "fail";
  const validRes = {
    status: resStatus,
    data,
    message,
  };
  res.status(statusCode).send(validRes);
};
