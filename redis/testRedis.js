const {
    redisClient,   
}=require('../redis/redisClient')
// ejecutar archivo para verificar connexion
redisClient.set('test_key', 'test_value', (err) => {
  if (err) {
    console.error('Error setting key:', err);
  } else {
    redisClient.get('test_key', (err, result) => {
      if (err) {
        console.error('Error getting key:', err);
      } else {
        console.log('Got value:', result); // Debería imprimir 'test_value'
      }
      redisClient.quit(); // Cerrar la conexión una vez que se ha realizado la operación
    });
  }
});
