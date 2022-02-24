const express=require("express");

const bodyParser=require("body-parser");

const date=require(__dirname+"/date.js");

const mongoose=require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'))

mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});

const itemsSchema={
    name:String
};

const Item=mongoose.model("Item",itemsSchema);

const item1=new Item({
    name:"Welcome to your todolist."
})
const item2=new Item({
    name:"Hit the +button to add a new item."
})
const item3=new Item({
    name:"Hit this to delete an item."
})
const defaultItems=[item1,item2,item3];

app.get("/",function(req,res){

    
    Item.find({},function(err,results){

        if(results.length==0){
            Item.insertMany(defaultItems,function(err){
                if(err)
                    console.log(err);
                else{
                    console.log("Succesfully added");
                } 
            });
            res.redirect("/");
        }
        else{res.render('list', {listTitle: "Today",newListItems:results});
        }
    });
    
});

app.post("/",function(req,res){
    const itemName =req.body.newItem;

    const item=new Item({name:itemName});

    item.save(function(err){
        if(err){
        res.redirect("/");
        }else{
        console.log("Saved item");
        }
        });
        res.redirect("/");
})
app.post("/delete",function(req,res){
   const checkedItemID=req.body.checkbox;

   Item.findByIdAndRemove(checkedItemID,function(err){
        if(err)
            console.log(err);
        else{
            console.log("Succesfully deleted");
        }
   })
   res.redirect("/");
})
app.get("/work",function(req,res){
    res.render("list",{
    listTitle:"Work List",
    newListItems:workItems
    });
});
app.post("/work",function(req,res){
    let item=req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})
app.listen(3000,function(){
    console.log("Server started on port 3000");
    
})