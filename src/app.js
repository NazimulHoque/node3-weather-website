const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')


const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



//for express documentation:
//http://expressjs.com/en/4x/api.html#express
const app = express()
const port = process.env.PORT || 3000
//path module allows easy manipulation of file paths
// '../public' move up one directory, then go into public
const public_path = path.join(__dirname, '../public')
const views_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partials_path)



//set up handlebars templating engine, and views location
app.set('view engine','hbs')
app.set('views',views_path )

//set up static web elements for use
app.use(express.static(public_path))

//routes
app.get('', (req, res)=>{
    //call to render particular view, argument must match with the template inside views without the extention
    res.render('index', {
        name: 'Naz',
        title: 'weather stuff and bigfoot'
    })

})

app.get('/about', (req, res)=>{
    //call to render particular view, argument must match with the template inside views without the extention
    res.render('about', {
        name: 'Nazimul Hoque',
        title: 'Sas whereabouts'

        
    })

})

app.get('/help', (req, res)=>{
    //call to render particular view, argument must match with the template inside views without the extention
    res.render('help', {
        name: 'Nazimul Hoque',
        help: 'this is a help message, i hope this was helpfull',
        title: 'Was this helpfull?'
       
    })

})


app.get('/weather', (req, res)=>{

    if(!req.query.address) {
        res.send({
            error: 'you must provide a search term'
        })
    }else{    
        geocode(req.query.address, (error, {longitude, latitude, place} = {})=>{
            if (error){
              return res.send({
                  message: 'problem in geocode',
                  error
              })
            }
            forecast(longitude, latitude, (error, {temp, rain, feelslike, description} = {}) => {
              if (error){
                res.send({
                    message: 'problem in forcast',
                    error
                })
              }else{
                //console.log('Location:', place)
                //console.log("The current temperature is "+temp+" F, but feels like "+feelslike+" F and the precipitation will be " + rain +" mm")
                res.send({
                    location: place,
                    rain,
                    temperature: feelslike,
                    temperature: temp,
                    address: req.query.address,
                    long: longitude,
                    lat: latitude,
                    forecast: "The weather is " + description +" The current temperature is "+temp+" C, but feels like "+feelslike+" C and the precipitation will be " + rain +" mm",

                })
              }
            })
          
          })
        
    }

    
})


app.get('/products', (req, res) =>{
    //run when there is no search term
    if (!req.query.search) { 
        res.send({
            error: 'you must provide a search term'
        })
    }else{
        //retrieving query strings
        console.log(req.query)
        res.send({
            products: []  
        })
    }
    
})

//wild card route: 404 page
//this is must be at the end because express looks for a rout match top to bottom
app.get('*', (req, res)=>{
    res.send('404: this page aint on it')
})

app.listen(port, () =>{
    console.log('http://localhost:3000 server is up on port ( 3000 )')
})