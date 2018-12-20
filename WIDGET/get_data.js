(function (){
	alert("loaded");
	//http://uhunt.onlinejudge.org/api/ranklist/541697/0/0
	var url = "http://uhunt.onlinejudge.org/api/ranklist/541697/0/0";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			//document.getElementById("demo").innerHTML =
			alert(this.responseText);
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
})();