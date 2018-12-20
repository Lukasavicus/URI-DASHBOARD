/*

*/

var OnlineJudgeCard = {
	target_id : "",
	onlinejudge : ""
};

function uva_mapping(data){
	data = data[0];

	answer = {
		user_id : data.userid,
		username : data.username,
		name : data.name,
		rank : data.rank,
		accepted : data.ac,
		photo_address : "https://uva.onlinejudge.org/templates/hm_yaml_2_5/img/onlinejudgelogo2.png",
		link : ("http://uhunt.onlinejudge.org/id/" + data.userid)
	};

	return answer;
}

function uva_mapping_problems(data){

	return data.length;
}

function uri_mapping(data){
	answer = {
		user_id : data.userid,
		username : data.username,
		name : data.name,
		rank : data.rank,
		accepted : data.ac,
		photo_address : "https://uva.onlinejudge.org/templates/hm_yaml_2_5/img/onlinejudgelogo2.png",
		link : ("http://uhunt.onlinejudge.org/id/" + data.userid)
	};

	return answer;
}

function uri_mapping_problems(data){
	//console.log(data.num_exercises);
	return data.num_exercises;
}

function loadStyle(href){
	var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.media = 'all';
    link.href = href;
    head.appendChild(link);
}

OnlineJudgeCard.doYourMagic = function (){
	var user_id = this.target_id;
	var onlineJudge = this.onlineJudge;

	var ojc = this;
	
	var address_userdata = "";
	var address_probdata = "";
	var mapping_func_userdata = function(){};
	var mapping_func_probdata = function(){};

    // load styles
    loadStyle("general_style.css");

	if(onlineJudge == "uva"){
		address_userdata = "http://uhunt.onlinejudge.org/api/ranklist/" + user_id + "/0/0";
		address_probdata = "http://uhunt.onlinejudge.org/api/p";
		mapping_func_probdata = uva_mapping_problems;
		mapping_func_userdata = uva_mapping;
		loadStyle("uva_style.css");
	}
	else if(onlineJudge == "uri"){
		address_userdata = "uri_data_provider.php?userid=" + user_id;
		address_probdata = "uri_problem_data_provider.php";
		mapping_func_probdata = uri_mapping_problems;
		mapping_func_userdata = uri_mapping;
		loadStyle("uri_style.css");
	}
	else{
		return false;
	}



	var promise_user_data = new Promise(function(resolve, reject){
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", address_userdata, true);
		xhttp.onload = function(){
			if (this.readyState == 4 && this.status == 200){
				var data = JSON.parse(this.responseText);
				console.log("Okay promise user data", data);
				resolve(data);
			}
			else{
				reject("Something wen't wrong: " + this.status);
			}
		};

		xhttp.onerror = function(){
			reject("Damn it");
		}
		xhttp.send();
	})
	.then(function(data){
		console.log("data", ojc);
		ojc.data = mapping_func_userdata(data);
	})
	.catch(e => {
		console.log("promise user data got wrong");
		console.log(e);
	});
	



	var promise_problem_data = new Promise(function(resolve, reject){
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", address_probdata, true);
		xhttp.onload = function(){
			if (this.readyState == 4 && this.status == 200){
				var data = JSON.parse(this.responseText);
				console.log("Okay promise problem data", data);
				resolve(data);
			}
			else{
				reject("Something wen't wrong: " + this.status);
			}
		};

		xhttp.onerror = function(){
			reject("Damn it");
		}

		xhttp.send();
	})
	.then(function(data){
		console.log(ojc);
		ojc.data.total_number_of_problems = mapping_func_probdata(data);
		return ojc;
	})
	.then(ojc => createTheCard(ojc.element, ojc.data))
	.catch(e => {
		console.log(e);
	});
}


function createTheCard(div_element, data){

	var text_node;
	var name = data.username;
	

	/* ========================================================================== */

		/* Creating the container element */

		var superior_p = document.createElement('p');
		superior_p.classList.add('superior_half');

		var inferior_p = document.createElement('p');
		inferior_p.classList.add('inferior_half');

		var link = document.createElement('a');
		link.title = data.name;
		link.href = data.link;

		circle_p = document.createElement('img');
		circle_p.classList.add('inner_circle');
		circle_p.src = data.photo_address;

		link.appendChild(circle_p);
	/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


	/* ========================================================================== */

		/* Putting all things together */


		// Element on superior left - name/username

			var left_superior_p = document.createElement('p');
			left_superior_p.classList.add('left_superior_text');
			left_superior_p.classList.add('tooltip');
			var font_ls = document.createElement('font');
			//font_ls.classList.add();
			text_node = document.createTextNode(data.name);
			left_superior_p.appendChild(text_node);

			var tooltip_ls;
			tooltip_ls = document.createElement('span');
			tooltip_ls.classList.add('tooltiptext');
			tooltip_ls.innerHTML = name + "'s Name";

			left_superior_p.appendChild(tooltip_ls);
		// -----------------------------------------------


		// Element on superior right - rank

			var right_superior_p = document.createElement('p');
			right_superior_p.classList.add('right_superior_text');
			right_superior_p.classList.add('tooltip');
			var font_rs = document.createElement('font');
			//font_rs.classList.add();
			text_node = document.createTextNode(data.rank + "º");
			right_superior_p.appendChild(text_node);

			var tooltip_rs;
			tooltip_rs = document.createElement('span');
			tooltip_rs.classList.add('tooltiptext');
			tooltip_rs.innerHTML = name + "'s Rank Position";

			right_superior_p.appendChild(tooltip_rs);
		// -----------------------------------------------


		// Element on inferior left - number of accepted problems

			var left_inferior_p = document.createElement('p');
			left_inferior_p.classList.add('left_inferior_text');
			left_inferior_p.classList.add('tooltip');
			var font_li = document.createElement('font');
			//font_li.classList.add();
			text_node = document.createTextNode(data.accepted);
			left_inferior_p.appendChild(text_node);

			var tooltip_li;
			tooltip_li = document.createElement('span');
			tooltip_li.classList.add('tooltiptext');
			tooltip_li.innerHTML = name + "'s # Accepted Problems";

			left_inferior_p.appendChild(tooltip_li);
		// -----------------------------------------------


		// Element on inferior left - % of accepted problems

			var right_inferior_p = document.createElement('p');
			right_inferior_p.classList.add('right_inferior_text');
			right_inferior_p.classList.add('tooltip');
			var font_ri = document.createElement('font');
			//font_ri.classList.add();
			text_node = document.createTextNode( parseFloat((data.accepted / data.total_number_of_problems) * 100).toFixed(2) + "%" );
			right_inferior_p.appendChild(text_node);

			var tooltip_ri;
			tooltip_ri = document.createElement('span');
			tooltip_ri.classList.add('tooltiptext');
			tooltip_ri.innerHTML = name + "'s % Accepted Problems";

			right_inferior_p.appendChild(tooltip_ri);
		// -----------------------------------------------

	/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

	/* ========================================================================== */

		/* Putting all things together */

		div_element.appendChild(superior_p);
		div_element.appendChild(inferior_p);
		div_element.appendChild(link);
		div_element.appendChild(left_superior_p);
		div_element.appendChild(right_superior_p);
		div_element.appendChild(left_inferior_p);
		div_element.appendChild(right_inferior_p);
	/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
}