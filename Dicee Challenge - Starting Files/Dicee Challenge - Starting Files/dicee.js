var random =Math.floor(Math.random()*6)+1;
var random2=Math.floor(Math.random()*6)+1;

var randomDiceImage="dice"+random+".png";

var randomImageSource="images/"+randomDiceImage;
var image1=document.querySelectorAll("img")[0];

image1.setAttribute("src",randomImageSource);

var randomDiceImage2="dice"+random2+".png";

var randomImageSource2="images/"+randomDiceImage2;

var image2=document.querySelectorAll("img")[1];

image2.setAttribute("src",randomImageSource2);


if(random>random2)
{
  document.querySelector("h1").innerHTML="Play 1 Wins!";
}
else if(random2>random)
{
  document.querySelector("h1").innerHTML="Play 2 Wins!";
}
else
{
  document.querySelector("h1").innerHTML="Draw!";
}
