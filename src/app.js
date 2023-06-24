const express = require("express")
const db = require("./db.json")
const cors = require("cors")
const bodyParser = require("body-parser")
const PORT = 5000
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

var tweets = [
]
var userData = {}


app.post("/sign-up", (req, res) => {
   
     userData = req.body
     console.log("userdata:", userData)
     res.status(200).send("OK")
  
})
app.post("/tweets", (req, res) => {
     if (!req.body.username || !req.body.tweet) {
          res.status(400).send("preencha todos os campos!!")
          return
     }
     if(req.body.username !== userData.username){
          res.status(403).send("UNAUTHORIZED")
     }
     let tweet = {
          username: req.body.username,
          avatar: userData.avatar,
          tweet: req.body.tweet
     }
     tweets.push(tweet)
     res.status(200).send("OK")
})

app.get("/tweets", (req, res) => {
     if (tweets.length <= 10) {
          res.status(200).send(tweets)
          console.log("tweets", tweets)
     } else {
          let Tweets = []
          for(i=0 ; i< 10; i++){
               Tweets.push(tweets[i])
          }
          console.log("tweets-reduzidos", Tweets)
          res.status(200).send(Tweets)
     }
})


app.listen(`${PORT}`, () => console.log(`server rodando  na porta ${PORT} !!`))