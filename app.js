const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/test');

const Cat = mongoose.model('Cat', { no1 : Number , no2 : Number })

const app = express()
const port = 3000

app.use(express.static('public'))
app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.use(express.urlencoded())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//EJS
app.get('/Template_demo',(req,res) => {
  res.render('Template_demo' , {val : "Megh"})
})



//Rest of code

app.get('/home',(req,res) => {
  res.sendFile(__dirname+"/Home.html")
})

app.get('/Sum',(req,res) => {
  res.sendFile(__dirname+"/Sum.html")
})

app.get('/SumProcess',(req,res) => {

  


  var a=req.query.no1
  var b=req.query.no2


  const kitty = new Cat({no1 : a,no2 : b})
  kitty.save().then(() => console.log("Record Added"))

  var c=parseInt(a)+parseInt(b)
  res.send(`Number 1 : ${a} <br> Number 2 : ${b} <br> Sum : ${c}`)
})





app.get('/product/:id',(req,res) => {
  res.send("Value is "+req.params.id)
})

app.get('/search/',(req,res) => {
  res.send("Value is "+req.query.q)
})

app.listen(port, () => {
  console.log(`Example app listening http://127.0.0.1:3000`)
})
