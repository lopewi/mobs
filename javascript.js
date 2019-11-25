document.getElementsByTagName("div")[0].innerHTML = "xx"; //Bezug auf Div
document.getElementsByClassName("item")[0].innerHTML = "testxx"; //Bezug auf class und damit item
document.getElementsByTagName("nav")[0].innerHTML="I am the new nav";
document.getElementsByTagName("li") [0].innerHTML += " Erledigt.";
document.getElementsByTagName("li") [2].style.color = "blue";

document.querySelector(".item").style.background = "green";
//document.querySelector(".exercise").innerHTML += "Erledigt"
document.getElementsByTagName("li") [1].innerHTML += " Erledigt.";

document.getElementsByTagName("nav") [0].innerHTML = ""


document.getElementsByTagName("nav")[0].innerHTML='<ul><li>Punkt1</li><li>Punkt2</li></ul>'

//ul und li in nav einbauen
/*
var node = document.createElement("ul");

var nodeli = document.createElement("li")
var textnode = document.createTextNode ("Text1")

node.appendChild(nodeli);
nodeli.appendChild(textnode);
document.getElementsByTagName("nav")[0].appendChild(node);

//Löschen eines Elements aus dem main-Element
document.getElementsByClassName("item")[1].remove();
*/


document.getElementsByClassName("item")[1].addEventListener("click", function(){
    //document.getElementsByClassName("item")[1].innerHTML = "Hello World";
    document.createElement("img")
    var img = new Image();
    img.src = "file:///home/itlabuser/tmp/clone_test/mobs_test/Mops.jpg";
    document.body.appendChild(img);
});


/*const ClickLi = document.getElementsByTagName("li")[0];
function CheckIt() {
    var IMG = document.createElement("IMG");
    IMG.setAttribute("src", "file:///home/itlabuser/tmp/clone_test/mobs_test/Mops.jpg");

    var item = document.createElement("div");
    item.classList.add("picture");

    item.appendChild(IMG);
    document.getElementsByTagName("main")(0).appendChild(item);

}

clickLi.addEventListener("click",CheckIt);
*/