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

    console.log("Target:", event.target.id);

    switch (event.target.id) {
        case "audio":
        case "audioImg":
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

        case "schloss":
            SchlossClick();
            break;

        case "lock":
            LockClick();
            break;

        case "unlock":
            UnlockClick();
            break;

        case "open":
            OpenClick();
            break;

        case "close":
            CloseClick();
            break;

        case "random":
            SongClick();
            break;
    }
}
document.querySelector('main').addEventListener("click", handleMainClick);

function HomeClick() {
    clearInterval(StatusClick);
    let mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    mainElement.appendChild(document.getElementById("mainpage").content.cloneNode(true));
    document.getElementById("home").style.display = "none";
}

function FensterClick() {
    let mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    mainElement.appendChild(document.getElementById("fensterpage").content.cloneNode(true));
}

var i = 0;

function StatusClick() {
    let mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    mainElement.appendChild(document.getElementById("statustemplate").content.cloneNode(true));

    var statusInterval = setInterval(
        function StatusInfo() {
            fetch("http://192.168.0.52:5000/status")
            .then(response => response.json())
            .then(function (statusInfo){
                document.getElementsByClassName("info")[0].innerHTML = "Geschwindigkeit: " + statusInfo.speed + "khm";
                document.getElementsByClassName("info")[1].innerHTML = "Verbrauch: "+ statusInfo.consumption + "l";
                document.getElementsByClassName("info")[2].innerHTML = "Luftdruck: " + Math.round(statusInfo.pressure) + "Pa";
                document.getElementsByClassName("info")[3].innerHTML = "Temperatur: " + Math.round(statusInfo.temp) + "°C";
                document.getElementsByClassName("info")[4].innerHTML = "Feuchtigkeit: " + Math.round(statusInfo.humidity) + "g/m³";
                });
        
            if(i===25){
                clearInterval(statusInterval);
            }

        i++;
        }
    ,1000);
};

function SchlossClick() {
    var newDiv1 = document.createElement("div");
    newDiv1.innerHTML = "Abschließen";
    newDiv1.id = "lock";
    newDiv1.style.textAlign = "center";
    newDiv1.className = "item1";
    document.getElementsByTagName("main")[0].appendChild(newDiv1);

    var newDiv2 = document.createElement("div");
    newDiv2.innerHTML = "Aufschließen";
    newDiv2.style.textAlign = "center";
    newDiv2.id = "unlock";
    newDiv2.className = "item1";
    document.getElementsByTagName("main")[0].appendChild(newDiv2);
}

function LockClick() {
    fetch("http://192.168.0.52:5000/action/lock").then(function (response) {
        console.log("Response: ", response);
        response.text().then(function (text) {
            let mainElement = document.querySelector('main');
            mainElement.innerHTML = '';
            document.getElementsByTagName("main")[0].appendChild(
                document.getElementById("mainpage").content.cloneNode(true));
            document.getElementById("home").style.display = "none";
            let schlossbutton = document.getElementById("schloss");
            schlossbutton.innerHTML += "Locked";
        });
    });
};

function UnlockClick() {
    fetch("http://192.168.0.52:5000/action/unlock").then(function (response) {
        console.log("Response: ", response);
        response.text().then(function (text) {
            let mainElement = document.querySelector('main');
            mainElement.innerHTML = '';
            document.getElementsByTagName("main")[0].appendChild(
                document.getElementById("mainpage").content.cloneNode(true));
            document.getElementById("home").style.display = "none";
            let schlossbutton = document.getElementById("schloss");
            schlossbutton.innerHTML += "Unlocked";
        });
    });
};

function AudioClick() {
    let mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    mainElement.appendChild(document.getElementById("audiopage").content.cloneNode(true));

    fetch("http://192.168.0.52:5000/music")
        .then(response => response.json())
        .then(function (musicList) {
            console.log("musicList: ", musicList);
            musicList = musicList;
            var list = document.getElementsByTagName("UL")[0];
            list.getElementsByTagName("a")[0].innerHTML = musicList[0].title + " - " + musicList[0].artist;
            list.getElementsByTagName("a")[1].innerHTML = musicList[1].title + " - " + musicList[1].artist;
            list.getElementsByTagName("a")[2].innerHTML = musicList[2].title + " - " + musicList[2].artist;
            list.getElementsByTagName("a")[3].innerHTML = musicList[3].title + " - " + musicList[3].artist;
        });
    
        function SongClick() {
            console.log(AudioClick(musicList[0].path));
        }
};

function OpenClick() {
    fetch("http://192.168.0.52:5000/window/open").then(function (response) {
        console.log("Response: ", response);
        response.text().then(function (text) {
            let mainElement = document.querySelector('main');
            mainElement.innerHTML = '';
            mainElement.appendChild(document.getElementById("fensterpage").content.cloneNode(true));
        });
    });
};

function CloseClick() {
    fetch("http://192.168.0.52:5000/window/close").then(function (response) {
        console.log("Response: ", response);
        response.text().then(function (text) {
            let mainElement = document.querySelector('main');
            mainElement.innerHTML = '';
            mainElement.appendChild(document.getElementById("fensterpage").content.cloneNode(true));
        });
    });
};


/* let items = document.getElementsByClassName("item");

for (let i = 0; i < items.length; i++) {

    console.log("Item " + i, items[i]);
} */