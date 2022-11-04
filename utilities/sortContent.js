function sortContent (sort) {
  switch (sort) {
    case '0':
      return { _id: 'desc' }
    case '1':
      return { name: 'asc' }
    case '2':
      return { name: 'desc' }
    case '3':
      return { category: 'asc' }
    case '4':
      return { location: 'asc' }
    case '5':
      return { rating: 'desc' }
    case '6':
      return { rating: 'asc' }
  }
}

module.exports = sortContent
