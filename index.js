import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

let titles = [];
let contents = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.render("index.ejs",{
       numberOfCards : titles.length,
       heading : titles,
       para : contents, 
    })
})

app.get("/create",(req,res)=>{
    res.render("create.ejs")
})

app.get("/open-blog/:number",(req,res)=>{
    let id = req.params.number;
    res.render("blog.ejs", {
        title : titles,
        content : contents,
        number : id
    })
})

app.get("/edit/:number",(req,res)=>{
    let id = req.params.number;
    res.render("edit.ejs",{
        number : id,
        head : titles,
        content : contents
    })
})

app.get("/delete/:number",(req,res)=>{
    let id = req.params.number;
    titles.splice(id,1);
    contents.splice(id,1);
    res.render("deleted.ejs")
})

app.get("/about",(req,res)=>{
    res.render("about.ejs")
})

app.post("/submit",(req,res)=>{
    if (req.body["title"].length<=0 || req.body["content"].length<=0) {
        res.render("unsuccessfull.ejs");
    }else{
    titles.push(req.body["title"]);
    contents.push(req.body["content"]);
    res.render("submitted.ejs");
    }
    // console.log(titles);
})

app.post("/editted/:number",(req,res)=>{
    let index = req.params.number;
    titles[index]=req.body["title"];
    contents[index]=req.body["content"];
    res.render("edit_success.ejs")
})

app.listen(port,() => console.log(`Server running at port ${port}`));