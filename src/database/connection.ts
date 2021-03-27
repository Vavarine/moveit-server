import { createConnection } from 'typeorm';

createConnection().then(data => {
  data.isConnected && console.log('Database Connected!')
}).catch(err => {
  console.log(err)
});