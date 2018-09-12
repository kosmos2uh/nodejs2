const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.use(require('../routes'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '../views/layouts')
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '../views'));

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
});


const boot = () => {
    app.listen(port, hostname, (err) => {
        if (err) {
            return console.log('something bad happened', err);
        }
        console.log(`Server running at http://${hostname} and listening on ${port}`);
    });
};


const shutdown = () => {
    process.exit();
};

if (require.main === module) {
    boot();
} else {
    console.info('Running app as a module');
    exports.boot = boot;
    exports.shutdown = shutdown;
    exports.port = port;
    exports.hostname = hostname;
}