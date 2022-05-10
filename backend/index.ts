import http from 'http'
import app from './app'
import { connectToDB } from './src/utils/db'
import { startMetricsServer } from './src/utils/metrics'

const mongoUri = process.env.MONGO_URI ?? 'localhost'
const PORT = process.env.PORT ?? 8000

connectToDB(mongoUri)
.then(() => console.log('Connect to Mongo Success'))
.catch((err) => console.log(`Connect to Mongo fail, ${err}`))

const server : http.Server = http.createServer(app)

server.listen(PORT, () : void => {
    console.log(`http server started at port ${PORT}`)
    startMetricsServer()
})

export default server