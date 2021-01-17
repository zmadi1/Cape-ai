var mysql = require('mysql');


var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'nahman',
    database: 'zakhele'
});

const query = () => {
    return new Promise((resolve, reject) => {


        pool.query("select * from users", (error, results) => {
            if (error) reject(error);
            resolve(results);
        });
    })
}

const getdata = async () => {
    try {
        console.log(await query())
    } catch (error) {
        console.log(error)
    }
}

getdata()

module.exports = query