// 寫完記得要執行 node models/seeds/rest_seeders.js 或npm run seed
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../user')
const Restaurant = require('../restaurant.js') // 載入 restaurant model
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

const seedData = [
  {
    name: '第一位使用者',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: '第二位使用者',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(seedData[0].password, salt))
    .then((hash) =>
      User.create({
        name: seedData[0].name,
        email: seedData[0].email,
        password: hash
      })
    )
    .then((user) => {
      const userId = user._id
      for (let i = 0; i < 3; i++) {
        restaurantList[i].userId = userId
      }
      return Promise.all(
        Array.from({ length: 3 }, (value, i) =>
          Restaurant.create(restaurantList[i])
        )
      )
    })
    .then(() => {
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(seedData[1].password, salt))
        .then((hash) =>
          User.create({
            name: seedData[1].name,
            email: seedData[1].email,
            password: hash
          })
        )
        .then((user) => {
          const userId = user._id
          for (let i = 3; i < 6; i++) {
            restaurantList[i].userId = userId
          }
          return Promise.all(
            Array.from({ length: 3 }, (_, i) =>
              Restaurant.create(restaurantList[i + 3])
            )
          )
        })
        // 必須放在裡面
        .then(() => {
          console.log('Done!')
          process.exit()
        })
    })
})

// console.log(process.env.MONGODB_URI);
