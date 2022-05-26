const { response } = require('express')
const express = require('express')
const app = express()
const port = 3000 
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.use(express.static('public')) 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Setting the route and corresponding response
app.get('/', (req, res ) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant });
})

// route search part
app.get("/search", (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase().trim())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// Listen and start the server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})