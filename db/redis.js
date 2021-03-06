const redis = require('redis');
const redisClient = redis.createClient(require('../config/redis'));
const APIError = require('../util/error');

const requestLimit = 60;
const requestLimitTime = 60; // unit: seconds

redisClient.on('connection', () => {
  // eslint-disable-next-line no-console
  console.log('redis connect successfully');
});

redisClient.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log('redis connect failed', err);
});

const getCacheValue = (key) => new Promise((resolve, reject) => {
  redisClient.get(key, (err, result) => {
    if (err) {
      reject(new APIError('get cache ley error', 500));
    }
    if (result >= requestLimit) {
      reject(new APIError('over request limit', 429));
    }
    resolve(result);
  });
});

const setCacheValue = (key, value) => new Promise((resolve, reject) => {
  redisClient.setex(key, requestLimitTime, value, (err) => {
    if (err) {
      reject(new APIError('set cache key and ttl error', 500));
    }
    resolve(1);
  });
});

const increaseCacheAmount = (key) => new Promise((resolve, reject) => {
  redisClient.incr(key, (err, value) => {
    if (err) {
      reject(new APIError('incr cache key value error', 500));
    }
    resolve(value);
  });
});

module.exports = {
  getCacheValue,
  setCacheValue,
  increaseCacheAmount,
};
