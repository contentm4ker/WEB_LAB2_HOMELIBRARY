var express = require('express');
var router = express.Router();

var myBooksLib = require('../blib');
myBooksLib = JSON.parse(JSON.stringify(myBooksLib));

var myBooksLibArray = [];
for (key in myBooksLib) {
    myBooksLib[key].ind = Number(key);
    myBooksLibArray.push(myBooksLib[key]);
}
console.log(myBooksLibArray);


//rout for updating book characteristics
router.put('/books/:num(\\d+)', (req, res) => {
    let body = req.body;
    if (!body.author || !body.name ||
        !body.release.toString().match(/^\d+$/g)) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        for (var i = 0; i < myBooksLibArray.length; i++) {
            if (myBooksLibArray[i].ind == req.params.num) {
                myBooksLibArray[i].author = body.author;
                myBooksLibArray[i].name = body.name;
                myBooksLibArray[i].release = body.release;
                break;
            }
        }
    }
});

//rout for giving or taking back book
router.post('/books/:num(\\d+)', (req, res) => {
    let body = req.body;
    if (!body.inStock || !body.retName ||
        !body.retDate.toString().match(/^\d\d\.\d\d\.\d\d\d\d$/g)) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        for (var i = 0; i < myBooksLibArray.length; i++) {
            if (myBooksLibArray[i].ind == req.params.num) {
                if (body.inStock === 'true') {
                    myBooksLibArray[i].inStock = false;
                    myBooksLibArray[i].ret.date = body.retDate;
                    myBooksLibArray[i].ret.pname = body.retName;
                } else {
                    myBooksLibArray[i].inStock = true;
                    myBooksLibArray[i].returnDate = body.retDate;
                    myBooksLibArray[i].ret.date = "";
                    myBooksLibArray[i].ret.pname = "";
                }
                break;
            }
        }
    }
});

//rout for getting def book
router.get('/books/:num(\\d+)', function(req, res, next) {
    const book = myBooksLibArray.filter((b) => {
        if (b.ind == req.params.num) {
            return true;
        }
    });
    res.render('book', {
        name: book[0].name,
        author: book[0].author,
        release: book[0].release,
        inStock: book[0].inStock,
        ret_date: book[0].ret.date,
        ret_pname: book[0].ret.pname
    });
});

router.put('/books', (req, res) => {
    let body = req.body;
    if (!body.author || !body.name ||
        !body.release.toString().match(/^\d\d\d\d$/g)) {
        res.status(400);
        res.json({message: "Bad Request"});
    } else {
        myBooksLibArray.push({
            name: body.name,
            author: body.author,
            release: body.release,
            returnDate: '-',
            inStock: true,
            ret: { date: '', pname: '' },
            ind: myBooksLibArray.length
        });
    }
    res.render('bookslib', { books: myBooksLibArray});
});

router.delete('/:ind', (req, res)=>{
    myBooksLibArray.splice(req.params.ind, 1);
    for (let i = 0; i < myBooksLibArray.length; i++) {
        myBooksLibArray[i].ind = i;
    }
    res.render('bookslib', { books: myBooksLibArray});
});

//get filtered by inStock books
router.get('/books/filter/inStock/:val', function(req, res, next) {
    let inStock = Boolean(Number(req.params.val));
    let newBooks = [];
    for (var i = 0; i < myBooksLibArray.length; i++) {
        if (myBooksLibArray[i].inStock === inStock) {
            newBooks.push(myBooksLibArray[i]);
        }
    }
    if (newBooks.length === 0) {
        res.render('bookslib', { books: newBooks, isBackBttn: true});
    } else {
        res.render('bookslib', { books: newBooks, isBackBttn: true});
    }
});

//get filtered by overdue books
router.get('/books/filter/overdue/:val', function(req, res, next) {
    let overdue = Boolean(Number(req.params.val));
    let newBooks = [];
    for (var i = 0; i < myBooksLibArray.length; i++) {
        if (myBooksLibArray[i].inStock === false) {
            let dateParts = myBooksLibArray[i].ret.date.split(".");
            let correctDateString = dateParts[1] + '-' + dateParts[0] + '-' + dateParts[2];
            let currentDate = new Date();
            if (!overdue && Number(Date.parse(correctDateString)) < Number(Date.parse(currentDate))) {
                newBooks.push(myBooksLibArray[i]);
            } else if (overdue && Date.parse(correctDateString) > currentDate) {
                newBooks.push(myBooksLibArray[i]);
            }
        }
    }
    if (newBooks.length === 0) {
        res.render('bookslib', { books: newBooks, isBackBttn: true});
    } else {
        res.render('bookslib', { books: newBooks, isBackBttn: true});
    }
});

router.get('/books', function(req, res, next) {
    res.render('bookslib', { books: myBooksLibArray});
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Домашняя библиотека' });
});



module.exports = router;
module.exports.obj = myBooksLibArray;
