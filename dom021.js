const B1click = document.getElementsByTagName("button")[0];
function FillIn() {
    console.log("huhu");
    var newDiv= document.createElement("div");
    newDiv.innerHTML="hallo";

    document.getElementsByTagName("main")[0].appendChild(newDiv);
}

B1click.addEventListener("click", FillIn);
