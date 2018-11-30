const util = require('util')

module.exports = redisClient => {
  redisClient.lpushAsync = util.promisify(redisClient.lpush)
  redisClient.lrangeAsync = util.promisify(redisClient.lrange)
  redisClient.getAsync = util.promisify(redisClient.get)
  redisClient.setAsync = util.promisify(redisClient.set)
  redisClient.delAsync = util.promisify(redisClient.del)
  redisClient.keysAsync = util.promisify(redisClient.keys)
}
