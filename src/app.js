const express = require('express')
const path = require('path');
const hbs = require('hbs');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app = express();


app.use(express.static(path.join(__dirname, '../public')))

const viewsPath = path.join(__dirname, '../templates/views');
const partialPaths = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)



app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "iman kalyan Mandal"
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "iman kalyan Mandal"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: "iman kalyan Mandal",
        helpTest: 'This is some useful text',
        title: "Help"
    })
})

app.get('/weather', (req, res) => {
    if (req.query.address) {
       geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
           if(error){
               return res.send({error});
           }else{
               forecast(latitude,longitude,(error,forecastData)=>{
                   if(error){
                       return res.send({error});
                   }else{
                       res.send({
                           forecast:forecastData,
                           location,
                           address:req.query.address
                       })
                   }
               })
           }
       })
    } else {
        res.send({
            error: "provide a location"
        });
    }
})

app.get('/help/*', (req, res) => {
    res.send('help article not found')
})

app.get('*', (req, res) => {
    res.render('error', {
        name: "iman kalyan Mandal",
        helpTest: 'this is a wrong page.',
        title: "Error"
    })
})






app.listen(4000, () => {
    console.log("Example app listening at http://localhost:4000")
})