const express = require('express')
const app = express()
const morgan = require('morgan')
const path = require("path")
const axios = require('axios');
const cors= require('cors')
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})
const db = mongoose.connection
db.on('error',(error)=> console.error(error))
db.once('open',()=> console.log('connected to database'))

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "/")))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/', (req,res) => {
    res.render('index')
})
app.get('/get', async (req, res) => {
    var ipData;
    var IP;
    await axios.get('https://ipapi.co/json/')
    .then(resp => ipData = resp.data)
    .catch(err=> console.log(err))
    IP = req.ip;
    console.log(ipData.country_name);
    await axios.post('http://localhost:4000/dc/userData', {
        IP: IP,
        Country: ipData.country_name,
        Region: ipData.region,
        City: ipData.city,
        Latitude: ipData.latitude,
        Longitude: ipData.longitude,
    }).then(res => console.log(res)).catch(err => console.log(err))
    res.send({})
})

const resourceRoute = require('./routes/resource-route');
const userDataRoute = require('./routes/user-data-route');

app.use('/info', resourceRoute);
app.use('/dc', userDataRoute);

app.listen(4000, () => {
    console.log(`listening on port 4000`)
})