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
        case "statusImg":
            StatusClick();
            break;

        case "home":
        case "homeImg":
            HomeClick();
            break;

        case "fenster":
        case "fensterImg":
            FensterClick();
            break;

        case "schloss":
        case "schlossImg":
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

        case "shuffle":
        case "shuffleImg":
            ShuffleClick();
            break;
        
        case "maps":
            MapsClick();
            break;
    }
}
document.querySelector('main').addEventListener("click", handleMainClick);

function MapsClick() {
    let mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    mainElement.appendChild(document.getElementById("mapspage").content.cloneNode(true));
}

function HomeClick() {
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

var a;

function StatusClick() {
    let mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    mainElement.appendChild(document.getElementById("statustemplate").content.cloneNode(true));

    var statusInterval = setInterval(
        function StatusInfo() {
            fetch("http://192.168.0.59:5000/status")
            .then(response => response.json())
            .then(function (statusInfo){
                document.getElementsByClassName("info")[0].innerHTML = "Geschwindigkeit: " + statusInfo.speed + "khm";
                document.getElementsByClassName("info")[1].innerHTML = "Verbrauch: "+ statusInfo.consumption + "l";
                document.getElementsByClassName("info")[2].innerHTML = "Luftdruck: " + Math.round(statusInfo.pressure) + "Pa";
                document.getElementsByClassName("info")[3].innerHTML = "Temperatur: " + Math.round(statusInfo.temp) + "°C";
                document.getElementsByClassName("info")[4].innerHTML = "Feuchtigkeit: " + Math.round(statusInfo.humidity) + "g/m³";
                });
        
            if(a===25){
                clearInterval(statusInterval);
            }

        a++;
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
    fetch("http://192.168.0.59:5000/action/lock").then(function (response) {
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
    fetch("http://192.168.0.59:5000/action/unlock").then(function (response) {
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

var SongListpath = [];
var SongNumber = [];
var SongTitle = [];
var SongArtist = [];

function AudioClick() {
    let mainElement = document.querySelector('main');
    mainElement.innerHTML = '';
    mainElement.appendChild(document.getElementById("audiopage").content.cloneNode(true));

    fetch("http://192.168.0.59:5000/music")
        .then(response => response.json())
        .then(function (musicList) {
            console.log("musicList: ", musicList);

            for(let i = 0; i<musicList.length; i++) {
                window.SongListpath.push(musicList[i].path);
                window.SongNumber.push(i);
                window.SongTitle.push(musicList[i].title);
                window.SongArtist.push(musicList[i].artist);
                var newDivs = document.createElement("div");
                newDivs.id = "song"+i;
                newDivs.className = "hitmusic";
                newDivs.innerHTML = i + musicList[i].title + " - " + musicList[i].artist;
                mainElement.appendChild(newDivs);
            }
        });
};

/* function SongClick(data) {
    document.getElementById("song")audioplayer.src = window.SongList[data];
} */

function ShuffleClick() {
    var randomSong = window.SongListpath[Math.floor(Math.random()*window.SongListpath.length)];
    document.getElementById("audioplayer").src = randomSong;
}

/* function SongClick() {
    var songWahl = 
} */

function OpenClick() {
    fetch("http://192.168.0.59:5000/window/open").then(function (response) {
        console.log("Response: ", response);
        response.text().then(function (text) {
            let mainElement = document.querySelector('main');
            mainElement.innerHTML = '';
            mainElement.appendChild(document.getElementById("fensterpage").content.cloneNode(true));
        });
    });
};

function CloseClick() {
    fetch("http://192.168.0.59:5000/window/close").then(function (response) {
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