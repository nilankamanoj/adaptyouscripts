var data = "user=" + username;
addCss('https://auscripts.herokuapp.com/styles.css');
if (!window.location.hash) {


    var xhr = new XMLHttpRequest();


    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(["success"]);
            var res = JSON.parse(this.responseText);
            if (res["success"] && res["label"] != "deffault") {
                label = res["label"].split(',');
                if (label.length < elements.length) {

                    var deleted = [];

                    for (var i = 0; i < elements.length; i++) {
                        if (!label.includes((i + 1).toString())) {
                            node = document.getElementById(elements[i]);
                            node.style.display = "none";
                            //node.remove();
                            deleted.push(elements[i]);
                            delete elements[i];
                            
                        }
                    }
                    
                    var controlStr = "";
                    for (var i = 0; i < deleted.length; i++) {
                        controlStr += "<div id = 'ctrl_li' class = 'view-one-btn' onclick = 'viewOne(\"" + deleted[i] + "\");' >" + document.getElementById(deleted[i]).title + "</div>";
                    }
                    console.log(controlStr)
                    document.getElementById('adapt_info').innerHTML = "<div id='default_loader'></div>"
                        + "<div id='myModal' class='modal'>"
                        + "<div class='modal-content'>"
                        + "<div class='modal-header'>"
                        + "<span class='close'>&times;</span>"
                        + "<h2>AdaptYou UI Customizer</h2>"
                        + "</div>"
                        + "<div class='modal-body'>"
                        + "<p> <div id = 'deafualt_load' class = 'default-btn' onclick = 'loadDefault();' > Load Default View </div>"
                        + "<p>Load Individual Hidden Components</p>"
                        + controlStr
                        + "</div>"
                        + "<div class='modal-footer'>"
                        + "<h3>Modal Footer</h3>"
                        + "</div>"
                        + "</div>"
                        + "</div>";

                    elmId = "default_loader";
                    var elem = document.getElementById(elmId);
                    document.getElementById(elmId).innerHTML += '<div class = "ctrl-bar" > content edited by the <strong>ADAPTIVE UI GENERATOR</strong> <input id="clickMe" class = "cntrl-btn" type="button" value="Control View" onclick="loadUtil();" /></div>'
                    



                }
            }
            else {

            }
        }
    });

    xhr.open("POST", "https://adaptyoumain.herokuapp.com/capture/control");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
}
else {
    elmId = "adapt_info";
    document.getElementById(elmId).innerHTML += ' <input id="clickMe" class ="cntrl-btn"  type="button" value="load adapt view" onclick="loadAdapt();" />'
    

}

function loadDefault() {
    window.location = window.location + '#loaded';
    window.location.reload();


}

function viewOne(id) {
    node = document.getElementById(id);
    node.style.display = "block";
}

function loadUtil() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    modal.style.display = "block";
}
function loadAdapt() {

    var uri = window.location.href.split("#")[0];
    window.location.replace(uri);

}
var arrayLength = elements.length;
for (var i = 0; i < arrayLength; i++) {
    element = elements[i];



    document.getElementById(element).addEventListener("click", function (e) {
        mouseClick(element);
    });
    document.getElementById(element).addEventListener("mouseover", function (e) {
        mouseIn(element);
    });
    document.getElementById(element).addEventListener("mouseout", function (e) {
        mouseOut(element);
    });
}



var time = 0;

function mouseIn(id) {
    time = Date.now();
}
function mouseOut(id) {
    var difference = Date.now() - time;
    sendData(id, difference);

}
function mouseClick(id) {
    sendData(id, 0);
}
function sendData(id, difference) {
    var data = "user=" + username + "&id=" + id + "&value=" + difference;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "https://adaptyoumain.herokuapp.com/capture/save", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
}

function addCss(fileName) {

  var head = document.head;
  var link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;

  head.appendChild(link);
}
