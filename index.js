const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const port = 80;

async function getData(q) {
    const appID = "ENTER APPID HERE";
    const appKEY = "ENTER APPKEY HERE";
    let response = await fetch(`https://api.edamam.com/search?q=${q}&app_id=${appID}&app_key=${appKEY}`);
    let data = await response.json();
    return data;
}


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('./static'));

app.get('/', (req, res) => {
    res.render('index');
    }
    );


app.post('/recipe', (req, res) => {
    let q = req.body['search'];
    getData(q).then(data => {
    
    res.render('recipe', {
        data: data,
        q: q
    })})

});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

