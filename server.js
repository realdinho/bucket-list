const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const bucketListItemRoutes = require('./routes/api/bucketListItems')

// get environment variables
dotenv.config({ path: './config.env' })

// proxies
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

// connect to database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB database connected...'))
  .catch((err) => console.log(err))

app.use('/api/bucketListItems', bucketListItemRoutes)
app.get('/', (req, res) => res.send('Hello world!'))

app.listen(process.env.PORT, () => console.log(`App listening at http://localhost:${process.env.PORT}`))