const Redis = require('ioredis');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const crypto = require('crypto')
const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times) => {
      return Math.min(times * 50, 2000);
    }
});

const redisConnection =()=>{

redisClient.on('error', (err) => {
    console.error('Error de conexión a Redis:', err);
  });
  redisClient.on('connect', () => {
    console.log('Conexión exitosa a Redis');
  });
}


// Generar un secreto aleatorio para las sesiones
const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports={
    generateSecret,
    RedisStore,
    session,
    redisClient,
    redisConnection
    
}