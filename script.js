var DAILY_SECONDS = 8 * 60 * 60; // 8 hours

window.onload = function() {

    var inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("input", function() {
            this.value = this.value.replace(/[^0-9]/g, "");
            if (this.value.length === 2) {
                if (inputs[i+1]) {
                    inputs[i+1].focus();
                }
            }
        });
    }
};

function isInvalid(h, m, s) {
    if (h > 23 || m > 59 || s > 59) {
        return true;
    }
    return false;
}

function calculate() {

    var wh = parseInt(document.getElementById("workH").value);
    var wm = parseInt(document.getElementById("workM").value);
    var ws = parseInt(document.getElementById("workS").value);

    var eh = parseInt(document.getElementById("entryH").value);
    var em = parseInt(document.getElementById("entryM").value);
    var es = parseInt(document.getElementById("entryS").value);

    var outH = document.getElementById("outH");
    var outM = document.getElementById("outM");
    var outS = document.getElementById("outS");
    var outPeriod = document.getElementById("outPeriod");
    var errorMsg = document.getElementById("errorMsg");

    if (isNaN(wh) || isNaN(wm) || isNaN(ws) ||
        isNaN(eh) || isNaN(em) || isNaN(es)) {
        errorMsg.innerHTML = "Please enter all fields";
        return;
    }

    if (isInvalid(wh, wm, ws) || isInvalid(eh, em, es)) {
        errorMsg.innerHTML = "Invalid Time";
        outH.value = "";
        outM.value = "";
        outS.value = "";
        outPeriod.value = "";
        return;
    }

    errorMsg.innerHTML = "";

    var workSeconds = (wh * 3600) + (wm * 60) + ws;
    var entrySeconds = (eh * 3600) + (em * 60) + es;

    var remaining = DAILY_SECONDS - workSeconds;
    if (remaining < 0) remaining = 0;

    var outSeconds = (entrySeconds + remaining) % 86400;

    var h24 = Math.floor(outSeconds / 3600);
    var m = Math.floor((outSeconds % 3600) / 60);
    var s = Math.floor(outSeconds % 60);

    var period = (h24 >= 12) ? "PM" : "AM";
    var h12 = h24 % 12;
    if (h12 === 0) h12 = 12;

    outH.value = (h12 < 10 ? "0" + h12 : h12);
    outM.value = (m < 10 ? "0" + m : m);
    outS.value = (s < 10 ? "0" + s : s);
    outPeriod.value = period;
}
