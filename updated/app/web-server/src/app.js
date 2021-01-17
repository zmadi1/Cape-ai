const path = require('path')

const express = require('express');

const port = process.env.PORT || 3000;

const hbs = require('hbs');
const mysql = require('mysql');




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



app.get('', (req, res) => {
    res.render('index', {
        title: 'My amazing landing page',
        name: 'Zakhele',

    })
})



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
                funniest_joke: funniest_joke,
                name: first_name
            });
        } catch (error) {
            console.log(error)
            res.render('about', {
                error: error
            });
        }
    } catch (error) {
        res.render('about', {
            first_name: error
        });
    }
});


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