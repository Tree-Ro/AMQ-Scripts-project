// ==UserScript==
// @name         AMQ Show Ping-Pong
// @version      1.0.1
// @description  Shows ping together with online player count
// @author       Zolhungaj
// @match        https://animemusicquiz.com/*
// @grant        none
// @updateURL    https://github.com/amq-script-project/AMQ-Scripts/raw/master/gameplay/amqShowPingPong.user.js
// @downloadURL  https://github.com/amq-script-project/AMQ-Scripts/raw/master/gameplay/amqShowPingPong.user.js
// ==/UserScript==

// Wait until the LOADING... screen is hidden and load script
if (typeof Listener === "undefined") return;
let loadInterval = setInterval(() => {
    if ($("#loadingScreen").hasClass("hidden")) {
        clearInterval(loadInterval);
        setup();
    }
}, 500);

let setup = () => {
    const container = document.getElementById("mmSocialButtonOnlineContainer");
    const pingContainer = document.createElement("div");
    pingContainer.className = "mmSocialButtonOnlineCountContainer";

    const counter = document.createElement("h4");
    counter.id = "ping";
    const initialPingDisplay = document.createTextNode("-");
    counter.appendChild(initialPingDisplay);

    const description = document.createElement("h5");
    const descriptionText = document.createTextNode("Ping");
    description.appendChild(descriptionText);

    pingContainer
        .append(counter, description);

    container.appendChild(pingContainer);

    const counterList = container.getElementsByClassName("mmSocialButtonOnlineCountContainer");

    const width = 100 / counterList.length;

    for(const counterElement of counterList){
        counterElement.setAttribute("style", `width:${width}%`);
    }
    container.setAttribute("style", "right:3%");
    socket._socket.on("pong", time => document.getElementById("ping").innerText = time);
}
