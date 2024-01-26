const { createReadStream } = require('fs')
const { parse } = require('csv-parse')

exports.readAndParseFile = async ({ filePath }) => {
    return new Promise((resolve, reject) => {
        const bookingList = []
        createReadStream(filePath)
            .pipe(parse({ delimiter: ':' }))
            .on('data', function (row) {
                bookingList.push(row)
            })
            .on('end', function () {
                resolve(parseCsv({ bookingList }))
            })
            .on('error', (err) => {
                reject(err)
            })
    })
}

const parseCsv = ({ bookingList }) => {
    const [, ...restRows] = bookingList
    const parsedBookingList = []
    restRows.forEach(element => {
        if (element.join() !== '') {
            const val = element.join().trim().toLowerCase().replace(/\s+/g, '').split(',')
            parsedBookingList.push(new Booking(...val))
        }
    })
    return parsedBookingList
}

function Booking (id, username, type) {
    this.id = id
    this.userName = username
    this.bookingType = type
}

exports.countByBookingType = ({ bookingList }) => {
    return bookingList.reduce((result, { bookingType }) => {
        result[bookingType] += 1
        return result
    }, {
        group: 0,
        individual: 0
    })
}
