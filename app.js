const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars') // 沒給路徑，則判斷去node_modules裡面找
const methodOverride = require('method-override') // 載入 method-override
const flash = require('connect-flash') // flash message

// dotenv把東西放入process.env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes') // 引用路由器

const usePassport = require('./config/passport') // 載入設定檔，要寫在 express-session 以後
require('./config/mongoose')

const app = express()
const port = 3000

// setting static files靜態檔案
app.use(express.static('public'))

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 express-session (至少放在app.use(routes)前就好)
app.use(
  session({
    secret: 'ThisIsMySecret',
    resave: false,
    saveUninitialized: true
  })
)

// setting body-parser
app.use(express.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)

// flash message
app.use(flash())

// 設定本地變數 res.locals，在 usePassport(app) 之後、app.use(routes) 之前
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
  next()
})

// 將 request 導入路由器
app.use(routes)

// listen
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
