import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;
const API_KEY = 'API_KEY';

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("index.ejs",{
        movie_name : null,
        movie : null,
        error : null
    });
})

app.get("/submit" ,async (req,res)=>{
    const title = req.query.title;
    console.log(title);
    try{
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`);

        const result = response.data;
        console.log(result);
        
        res.render("index.ejs",{
            movie_name : title,
            movie : result,
            error: "Search for a Movie"
        })
        res.redirect("/");
    }catch(err)
    {
        console.log(err);
        
    }
    
})

app.listen(port, ()=>{
    console.log(`Server Running From Port ${port}`);
})