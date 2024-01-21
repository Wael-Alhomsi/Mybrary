const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre('deleteOne', function(next) {
    
    Book.find({author: this.id}, (err, books) => {
        if (err) {
            next(err)
        } else if (books.length > 0) {
            next(new Error('This author has books still'))
        } else {
            next()
        }
    })
})

// authorSchema.pre('deleteOne', function(next) {
//     console.log('delete wmwmwmwmwmwmw')
//     next()
// })

// authorSchema.pre('save', function(next) {
//     console.log('save wmwmwmwmwmwmw')
//     next()
// })

module.exports = mongoose.model('Author', authorSchema)