const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const exphbs = require('express-handlebars');
const PORT = 80;
const server = http.createServer(app);
const multer = require('multer');
const upload = multer();

const utils = require('./views/routes/utils');

// Body Parser MW
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// public css/imgs
app.use(upload.array());
app.use(express.static('public'));

// Functions
app.use('/api/user', utils);

// Handlebars MW
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',

    // functions for handlebars
    helpers: {
        calcPercent: function(fields, section, value) {
            let sum = 0;

            if (section === 1) {
                for(let i = 0; i < 1; i++) sum += fields[i].value;
            } else if (section === 2) {
                for(let i = 2; i < 7; i++) sum += fields[i].value;
            } else if (section === 3) {
                for(let i = 11; i < 18; i++) sum += fields[i].value;
            }

            if (sum === 0) return "0.00%";
            else return (value / sum).toFixed(2).toString() + "%";
        }
    }
});

app.engine('.hbs', hbs.engine); // template engine
app.set('view engine', '.hbs');

app.use('/', require('./views/routes/index')); // handles switching pages

// set static folder
app.use('/', express.static(path.join(__dirname, 'public')));

server.listen(PORT, () => console.log(`Server running at ${PORT}`));
