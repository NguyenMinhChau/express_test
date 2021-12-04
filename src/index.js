const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const router = require('./routers');
const db = require('./config/db');
const methodOverride = require('method-override');
const SortMiddleware = require('./middleware/sortMiddleware')
const app = express();
const port = 3000;

app.engine(
    '.hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (column, _sort) => {
                var filed = _sort.column === column ? _sort.type : 'default';
                const iconTypes = {
                    'default': 'fas fa-sort',
                    'asc': 'fas fa-sort-amount-up-alt',
                    'desc': 'fas fa-sort-amount-down',
                }
                const typeSorts = {
                    'default': 'asc',
                    'asc': 'desc',
                    'desc': 'asc',
                }
                const icon = iconTypes[filed];
                const type = typeSorts[_sort.type];
                return `
                <a href='?_sort&column=${column}&type=${type}' style='color:black'>
                    <i class="${icon}"></i>
                </a>
                `
            }
        },
    }),
);
app.set('view engine', '.hbs');
app.set('views', './src/views');

//static file
app.use(express.static(path.join(__dirname, '../assets/')));
//submit form method = POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(SortMiddleware);

db.connect();
router(app);

app.listen(process.env.PORT || port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
