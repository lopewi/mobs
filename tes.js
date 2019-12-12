"use strict";

function timedate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
    var day = date.getDate();
    if (day < 10) { day = "0" + day; }
    document.getElementById("date").innerHTML = day + "." + monthNames[month] + " " + year;
    var time = new Date();
    var hour = time.getHours();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    if (hour < 10) { hour = "0" + hour; }
    if (min < 10) { min = "0" + min; }
    if (sec < 10) { sec = "0" + sec; }
    document.getElementById("time").innerHTML = hour + ":" + min + ":" + sec;
    var tdreload = setTimeout(timedate, 1000);
}

function handleMainClick(event) {
    switch(event.target.id){
        case "audio":
            AudioClick();
            break;
        
        case "fahrzeugstatus":
            StatusClick();
            break;

        case "home":
            HomeClick();
            break;

        case "fenster":
            FensterClick();
            break;
    }
}
document.querySelector('main').addEventListener("click", handleMainClick);

function HomeClick() {
    let mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    document.getElementsByTagName("main")[0].appendChild(
        document.getElementById("mainpage").content.cloneNode(true));
    document.getElementById("home").style.display="none";
}

function FensterClick() {
    let mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    document.getElementsByTagName("main")[0].appendChild(
        document.getElementById("fensterpage").content.cloneNode(true));
}

function AudioClick() {
    let mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    document.getElementsByTagName("main")[0].appendChild(
        document.getElementById("audiopage").content.cloneNode(true));
}
     
function StatusClick() {
    let mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    let statusTemplate = document.getElementById('statustemplate');
    mainElement.appendChild(statusTemplate.content.cloneNode(true));

    fetch("http://192.168.0.59:5000/status").then(function (response) {
        console.log("Response: ", response);
        response.text().then(function (text) {
            console.log(text);
            var array = text.split(",");
            var speed = array[3].split(":")
            var consumption = array[0].split(":");
            var humidity = array[1].substr(15, 6);
            var temp = array[4].substr(12, 4);
            var pressure = array[2].substr(15, 6);
            document.getElementsByClassName("info")[0].append(speed[1] + "kmh");
            document.getElementsByClassName("info")[1].append(consumption[1] + "l");
            document.getElementsByClassName("info")[2].append(pressure + "Pa");
            document.getElementsByClassName("info")[3].append(temp + "°C");
            document.getElementsByClassName("info")[4].append(humidity + "g/m³");

            });
        });
    };

                    
            /* let items = document.getElementsByClassName("item");

            for (let i = 0; i < items.length; i++) {

                console.log("Item " + i, items[i]);
            } */