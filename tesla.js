function Clickit(){
    console.log("huhu");
    var newDiv = document.createElement ("div");
    newDiv.innerHTML = "Hallo Welt";
    newDiv.style.backgroundColor = "green";
    document.getElementsByTagName("main")[0].appendChild(newDiv);
}
document.getElementsByTagName("div")[0].addEventListener("click", Clickit);


    function Clickit(){
    console.log("huhu");
    var newDiv = document.createElement("div");
    newDiv.innerHTML = "Hallo Welt";
    newDiv.style.backgroundColor = "green";
    document.getElementsByTagName("main")[0].appendChild(newDiv);
    }
    document.getElementsByClassName("item")[0].addEventListener("click", Clickit);