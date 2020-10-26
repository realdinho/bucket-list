const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const bucketListItemRoutes = require('./routes/api/bucketListItems')
const path = require('path')

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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'))
  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  })
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`App listening at http://localhost:${port}`))