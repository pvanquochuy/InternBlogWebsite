import express from 'express'
import articleRouter from "./routers/articles.js"
import mongoose from 'mongoose'
import Article from './models/article.js'
import methodOverride from 'method-override'

const port = 3000
const app = express()

mongoose.connect('mongodb://localhost/blogDatabse')

app.set("view engine", "ejs") //   giúp chuyển đổi file ejs sang HTML
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.get("/", async (req, res)=>{
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render("articles/index", {articles: articles})
})

app.use("/articles", articleRouter)

app.listen(port, ()=>{
    console.log(`server is running  http://localhost:${port}/`)
})


// npm i
// npm run blogwebsite