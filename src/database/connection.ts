import { createConnection } from 'typeorm'

createConnection().then(data => {
  data.isConnected && console.log('\x1b[32m%s\x1b[0m', 'Database Connected!')
}).catch(err => {
  console.log(err)
});