// queries.js
// Task 2: Basic CRUD Operations
// Find all books in a specific genre
db.books.find({genre:"Fiction"})

// Find books published after a certain year
db.books.find({published_year: {$gt: 1950}})

// Find books by a specific author
db.books.find({author: "George Orwell"})

// Update the price of a specific book
db.books.updateOne({title: "1984"}, {$set: {price: 13.99}})

// Delete a book by its title
db.books.deleteOne({title:"The Catcher in the Rye"})

// Advanced Queries 
// Find books in stock and published after 2010
db.books.find({in_stock: true, published_year: {$gt: 1950}})

// Projection: show only title, author and price
db.books.find({}, {title: 1, author:1, price: 1, _id: 0})

// Sort books by price ascending
db.books.find().sort({price: 1})

// Sort books by price ascending
db.books.find().sort({price: -1})

// Pagination: show 1st page (5 books)
db.books.find().limit(5)

// Pagination: show 2nd page (skip 5)
db.books.find().skip(5).limit(5)

// Task 4: Aggregation Pipeline

// Average price of books by genre
db.books.aggregate([
    {$group: {_id: "$genre", averagePrice: {$avg: "$price"}}}
])

// Author with the most books
db.books.aggregate([
    {$group: {_id: "$author", totalBooks: {$sum: 1}}},
    {$sort: {totalBooks: -1}},
    {$limit: 1}
])

// Group books by publication decade and count
db.books.aggregate([
    {
        $group: {
            _id: {
                $concat: [
                    {$toString:{$multiply: [{$floor: {$divide: ["$published_year", 10]}}, 10]}},
                    "s"
                ]
            },
            totalBooks: {$sum: 1}
        }
    }
])

// Task 5:Indexing

// Create an index on title
db.books.createIndex({title: 1})

// Create a compound index on author and published_year
db.books.createIndex({author:1, published_year:1})

// Explain performance of a query using the compound index 
db.books.find({author: "David Brown", published_year:2015}).explain()
