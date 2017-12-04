const booksData = require('./data/books');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');

const { find, includes, max, map, isString } = require('lodash');

function* idSequence(initial) {
  let i = initial;
  while (true) { yield i++; } // eslint-disable-line no-constant-condition, no-plusplus
}

const booksIdGen = idSequence(max(map(booksData, 'id')) + 1);

const isBook = (book) => !!book.title && isString(book.title) && !!book.authors && isString(book.authors);
const hasBook = (req, res, next) => {
    if (isBook(req.body)) {
        next();
    } else {
        res.status(404).json({ error: 'invalid payload structure' });
    }
}
const byId = (id) => (book) => book.id === +id;


 // ----------  EXPRESS ----------

const app = express();
app.use(bodyParser.json()); 
app.use(morgan('combined')); 

app.get('/services/rest/books', (req, res) => {
  res.json(booksData);
});

app.post('/services/rest/book', hasBook, (req, res) => {
    if (req.body.id) {
        const book = booksData.find(byId(req.body.id));
        if (book) {
            const updatedBook = req.body;
            Object.assign(book, updatedBook);
            res.json(book);
        } else {
            res.status(404).json({ error: 'book not found' });
        }
    } else {
        const newBook = req.body;
        newBook.id = booksIdGen.next().value;
        booksData.push(newBook);
        res.json(newBook);
    }
});



app.get('/services/rest/book/:id', (req, res) => {
  const book = booksData.find(byId(req.params.id));
  book ? res.json(book) : res.status(404).json({ error: 'book not found' });
});


function matchBooksForQuery(query) {
    const text = query.text;
    return booksData
        .map(({title, authors}) => ({title, authors})) // expose fields available for search (here hde id)
        .filter((book) => includes(JSON.stringify(book).toLowerCase(), text.toLowerCase()));
}

app.get('/services/rest/search', (req, res) => {
  res.json(matchBooksForQuery(req.query));
});

const delayedRequest = false;
app.get('/services/rest/search/delay', (req, res) => {
  const matches = matchBooksForQuery(req.query);
  
  if (delayedRequest) {
    console.log(`Serving delayed for: ${text}`);
    setTimeout(() => res.json(matches), 2000)
  } else {
    console.log(`Serving instantly for: ${text}`);
    res.json(matches);
  }
  delayedRequest = !delayedRequest;
});


app.listen(8080, () => console.log('REST API running on port 8080'));
