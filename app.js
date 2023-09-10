const express = require ('express')
const app = express()



app.set('view engine','ejs')


app.use(express.json())
app.use(express.urlencoded({extended:true}))

const {blogs} =require("./model/index.js")

app.get('/',async (req,res)=>{

    const allBlogs = await blogs.findAll()
    
    res.render('blog.ejs',{blogs:allBlogs})
})


app.get('/createBlog',(req,res)=>{
    res.render('createBlog.ejs')
})



app.get('/single/:id',async (req,res)=>{
    const id = req.params.id
    const blog = await blogs.findAll({
        where:{
            id:id
        }
    })
    res.render('singleBlog.ejs',{blog:blog})
})

app.post('/createBlog', async(req,res)=>{

    const title= req.body.title
    const subTitle = req.body.subTitle
    const description = req.body.description
    

    await  blogs.create({
        title: title,
        subTitle: subTitle,
        description: description
    })
    res.redirect('/')
})


app.get('/delete/:id',async (req,res)=>{
    const id = req.params.id
    await blogs.destroy({
        where:{
            id:id
        }
    })
    res.redirect('/')
})



app.listen('3000',function(){
    console.log("App has started at port 3000")
})