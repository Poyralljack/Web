const mongoose =require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/person",{useNewUrlParser:true});
}
const fruitSchema=new mongoose.Schema({
  name: {
    type:String,
    required:[true,"Please check your data entry,no name specified"]
  },
  rating:{
    type: Number,
    min:1,
    max:10
  },
  review:String
});
const personSchema=new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit:fruitSchema
});
const Fruit =mongoose.model("Fruit",fruitSchema);

const Person =mongoose.model("Person",personSchema);
const pineapple=new Fruit({
  name:"Pineapple",
  rating:9,
  review:"Great fruit."
});
const person=new Person({
  name:"Amy",
  age:12,
  favouriteFruit:pineapple
})
pineapple.save(function(err){
  if(err)
    return handleError(err); 
});

person.save();

Person.find(function(err,people){
  if(err){
    console.log(err);
  }else{
    mongoose.connection.close();
    people.forEach(function(person){
      console.log(person.name);
    });
  }
})

/*Fruit.updateOne({_id:"62174aa01192db5067c70c57"}, {name: "Peach!"},function(err){
  if(err){
    console.log(err);
    console.log("here");
  }
  else{
    console.log("Succesfully added");
  }
});
*/

/*Person.deleteMany({name:'Amy'},function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Succesfully deleted");
  }
})*/