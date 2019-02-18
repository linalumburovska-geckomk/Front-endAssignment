//Step1- Button "Create feed" on click loads step 2
$("#button1").click(function(e){
    e.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("step1").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "step2.html", true);
    xhttp.send();
});