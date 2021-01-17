const path = require('path')
const express = require('express');

const geocode = require('./utilities/geocode')

const forecast = require('./utilities/forecast')
// const query = require('../model.js');

const port = process.env.PORT || 3000;

const hbs = require('hbs');
const {
    send
} = require('process');


// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express();




//Setup handlebars engine and views locaion
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath)); //we use this when 
//we are handling static html files(in public folder)
// app.set('views', __dirname + '/views');


app.get('', (req, res) => { //we use this when we're handling dynamic html files
    res.render('index', {
        title: 'WeatherApp',
        name: 'Zakhele Madi'
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        product: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        name: 'Zakhele',
        title: 'Help'
    })
})

var mysql = require('mysql');




app.get('/about', async (req, res) => {
    try {
        let pool = mysql.createPool({
            host: 'updated_db_1',
            port: 3306,
            user: 'root',
            password: 'nahman',
            database: 'zakhele'
        });
        const query = () => {
            return new Promise((resolve, reject) => {
                pool.query("select * from zakhele.users", (error, results, fields) => {
                    console.log(results)
                    if (error) reject(error);
                    resolve(results[0]);
                });
            })
        }
        try {
            let {
                first_name,
                last_name,
                funniest_joke
            } = await query();
            res.render('about', {
                first_name: first_name,
                last_name: last_name,
                funniest_joke: funniest_joke
            });
        } catch (error) {
            console.log(error)
            res.render('about', {
                error: error
            });
        }
    }
    catch (error) {
        res.render('about', { first_name: error });
    }
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        nam: 'Zakhele',
        errorMessage: 'Help article not found'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zakhele',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})