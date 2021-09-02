import 'express-async-errors'
import dotenv from 'dotenv'
import { connect, ConnectOptions } from 'mongoose'
import express from 'express'
import cors from 'cors'
import router from './routes/router'
import { handle404, handleOtherErrors } from './middlewares/errorHandlers'

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors({ origin: true, credentials: true }))

app.use('/api/v1/', router)
app.use('*', handle404)
app.use(handleOtherErrors)

interface ConnectionOptionsExtend extends ConnectOptions {
  useNewUrlParser: boolean
  useUnifiedTopology: boolean
}

const options: ConnectionOptionsExtend = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
}
const dbUri = process.env.DB_URL! as string
connect(dbUri, options)
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log('DB Connected \nServer Running')
    })
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
