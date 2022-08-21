const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geocode = require("./Utils/geocode")
const forecast = require("./Utils/foreCast")

console.log(__dirname)

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')



//setup handlerbars engine and views location
app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//setup express static directory to serve
app.use(express.static(publicDirectoryPath))

//routes
app.get('', (req, res) => {

    res.render('index', { title: "weather", author: "nour" })
})

app.get('/about', (req, res) => {

    res.render('about', { title: "about me", author: "nour" })
})

app.get('/help', (req, res) => {

    res.render('help', { title: "help", author: "nour" })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {

        return res.send("error : please enter an address");
    }
    geocode(req.query.address, (error, {latitude,longititude,city,country}) => {
        if(error){
    
            return res.send({error})
        }
        forecast(latitude,longititude,(error,forecastData)=>{

            if(error){
    
                return res.send({error})
            }
            else{

                res.send({city : city,country:country,forecast:forecastData});
            }
          
        })
    
    })


});


app.get('/help/*', (req, res) => {

    res.send("help article not found")
})

app.get('*', (req, res) => {

    res.render('404', { messageError: "Page Not Found", author: 'nour', title: "404" })
});

app.listen(3000, () => {

    console.log("the server is up and running");
})