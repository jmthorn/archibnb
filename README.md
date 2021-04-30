# Welcome to ArchiBnb

This AirBnb

A live Link to our website can be found here: https://brainfood-app.herokuapp.com/users/signup

## A walkthrough of our website

https://github.com/jmthorn/BrainFood/blob/main/2021-04-12%2009-46-32.gif

## Technologies Used to build our awesome website

- HTML (using PUG), Vanilla CSS, Javascript (Front-end)
- Heroku (hosting services) (Front-end)
- csurf, dotenv, bcrypt, cookie-parser (Back-end)
- express, express-session, express-validator (Back-end)
- nodemon (Back-end)
- postgreSQL, sequelize (Back-end)

## Functionalities

- User authentication is completed by hashing passwords using bcrypt js library (csurf protected as well)
- Only user/readers who are logged in can access the home page, the bookshelf page and the individual books page
- Querying for book-specific information, related tags, reviews, ratings, and user-specific read-status and bookshelves as well as writing new reviews with edit and delete functionality
- Once logged in a user can only edit/delete books, reviews and bookshelves that they have created
- Used Modals to render editing features
- Implemented AJAX when creating a review on a specific book page
- A user can filter their books by choosing a pre-defined or custom bookshelf
- Logged in user can have user-specific read-status on a book
- Logged in user can add tags to books
- Logged in user can edit a book's information
- Logged in user has a profile page
- Nav bar includes routes to the home page, bookshelf page, allows user to view their profile and logout.

## Our routes code snippet:

```
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser } = require('../auth');
const { check, validationResult } = require('express-validator');
const db = require('../db/models');

router.get("/:id", asyncHandler(async (req, res) => {
    const userId = req.session.auth.userId
    if (!userId) res.redirect("/users/login");
    let bookId = parseInt(req.params.id, 10)
    let book = await db.Book.findByPk(bookId, { include: db.Tag })
    let bookshelves = await db.Bookshelf.findAll({ where: { userId } })
    let stringTime = book.updatedAt.toString()
    let splitTime = stringTime.split(" ")
    let date = splitTime.slice(1, 4).join(" ")
    let reviews = await db.Review.findAll({
        where: { bookId },
        include: db.User,
        order: [["createdAt", "DESC"]]
    })
    const lowestShelf = bookshelves[0];

    let readStatus = await db.ReadStatus.findOne({ where: { userId, bookId } })
    let status;
    if (!readStatus) status = "None"
    else status = readStatus.status
    // if (!status) status = "None"

    res.render('book', {
        book,
        reviews,
        userId,
        bookshelves,
        date,
        lowestShelf,
        status
    })
}))

//UPDATING BOOK==================================================

router.post("/:id", asyncHandler(async (req, res) => {
    let bookId = parseInt(req.params.id, 10)
    let book = await db.Book.findByPk(bookId)
    const { cover, title, author, published, description } = req.body
    await book.update({ cover, title, author, published, description })
    res.redirect(`/books/${bookId}`)
}))

//ADDING REVIEW====================================================

router.post("/:id/reviews", asyncHandler(async (req, res) => {
    const userId = req.session.auth.userId
    const user = await db.User.findByPk(userId)
    const { review, bookId, rating } = req.body;

    const newReview = await db.Review.create({ review, rating, userId, bookId, author: user.username })
    res.json({ newReview })
}))

//EDIT REVIEW FROM BOOK=============================================
router.post("/reviews/:id", asyncHandler(async (req, res) => {
    const userId = req.session.auth.userId
    let reviewId = parseInt(req.params.id, 10)
    let reviewObject = await db.Review.findByPk(reviewId)
    if (userId === reviewObject.userId) {
        const { rating, review } = req.body;
        await reviewObject.update({ rating, review })
        res.redirect(`/books/${reviewObject.bookId}`)
    } else {
        // TODO: display a 403 response FORBIDDEN
    }
}))

//DELETE REVIEW FROM BOOK=============================================
router.delete("/reviews/:id", asyncHandler(async (req, res) => {
    const userId = req.session.auth.userId;
    const reviewId = parseInt(req.params.id);
    const review = await db.Review.findByPk(reviewId)
    if (userId === review.userId) {
        let destroyedReview = await db.Review.destroy({ where: { id: reviewId } });
        res.json()
    } else {
        // TODO: display a 403 response FORBIDDEN
    }

}));


//ADD BOOK TO BOOKSHELF=============================================

router.post("/:id/bookshelves", asyncHandler(async (req, res) => {
    const userId = req.session.auth.userId
    // const user = await db.User.findByPk(userId)
    const { bookshelfId, bookId } = req.body;
    let bookshelf = db.Bookshelf.findByPk(bookshelfId)
    let bookshelfToBook = await db.BookshelfToBook.create({ bookshelfId: parseInt(bookshelfId), bookId: parseInt(bookId) });
    res.json({ userId, bookshelfToBook })
}));

//DELETE BOOK =========================================================

router.post("/:id/delete", asyncHandler(async (req, res) => {
    // const userId = req.session.auth.userId
    const { bookId } = req.body;
    let book = await db.Book.findByPk(bookId)
    let deletedBook = await db.Book.destroy({ where: { id: parseInt(bookId) } });
    console.log('DELETEEEEEEEEE', deletedBook)
    res.json({ userId, deletedBook })
}));


//ADDING TAGS ===========================================================


router.post("/:id/tags", asyncHandler(async (req, res) => {
    const userId = req.session.auth.userId
    const user = await db.User.findByPk(userId)
    const { category, bookId } = req.body;
    let existingTag = await db.Tag.findOne({ where: { category } })

    if (!existingTag) {

        const newTag = await db.Tag.create({ category })
        let bookToTags = await db.BookToTag.create({ tagId: parseInt(newTag.id), bookId: parseInt(bookId) });

        res.json({ newTag })
    } else {
        let bookToTags = await db.BookToTag.create({ tagId: parseInt(existingTag.id), bookId: parseInt(bookId) });
        console.log(bookToTags)
        res.json({ existingTag })
    }
}))


// Edit Read Status ==============================================

router.post("/:id/readstatus", asyncHandler(async (req, res) => {
    const userId = req.session.auth.userId
    let bookId = parseInt(req.params.id, 10)
    const { status } = req.body;
    let readStatus = await db.ReadStatus.findOne({ where: { bookId, userId } })
    await readStatus.update({ status });
    res.redirect(`/books/${bookId}`);
}))


//DELETE TAG============================================================



router.post("/tags/:id", asyncHandler(async (req, res) => {

    let { bookId, tagId } = req.body
    console.log(bookId, tagId)
    const tag = await db.Tag.findOne({ where: { tagId, bookId }, include: db.Book });
    // await tag.destroy();
    console.log('HELOOOOOOOOOOOOO', tag)

    res.redirect(`/books/${bookId}`);
})
);



module.exports = router;
```

## Challenges

- There were issues with implementing the delete button for the profile page. The page would not redirect to the login page, but hang in current profile page. The button itself would delete the user from the front end but would stay on the profile page until the browser was closed and reopened.

## Future Implementations

- Search bar functionality
- Delete functionality on tags
- More robust styling

## The BrainFood Creator

- ===[@jmthorn](https://github.com/jmthorn) 🐈
