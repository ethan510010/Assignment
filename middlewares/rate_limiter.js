const { getCacheValue, setCacheValue, increaseCacheAmount } = require('../db/redis');

const checkLimit = async (req, res, next) => {
  const clientIP = req.ip;
  try {
    const requestAmount = await getCacheValue(clientIP);
    let currentRequestValue;
    if (requestAmount) {
      currentRequestValue = await increaseCacheAmount(clientIP);
    } else {
      currentRequestValue = await setCacheValue(clientIP, 1, 60);
    }
    req.currentRequestValue = currentRequestValue;
    next();
  } catch (error) {
    res.status(error.statusCode).send(error.msg);
  }
};

module.exports = checkLimit;
