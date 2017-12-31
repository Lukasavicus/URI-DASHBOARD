window.onload = function(){
	var table_info = document.getElementById("table-info");
	var table_user = document.getElementById("table-user");
	var table_prob = document.getElementById("table-prob");

	var qnt_rows = table_user.rows.length;
	var qnt_cols = table_user.rows[0].cells.length;

	load_table_info(table_info, table_user, table_prob, qnt_rows, qnt_cols);

	document.getElementById("btn-user").addEventListener('click',
		function (){
			user_view(table_info, table_user, table_prob, qnt_rows, qnt_cols);
		}
	);

	document.getElementById("btn-relative").addEventListener('click',
		function (){
			porcentage_view(table_info, table_user, table_prob, qnt_rows, qnt_cols);
		}
	);

	document.getElementById("btn-total").addEventListener('click',
		function (){
			total_view(table_info, table_user, table_prob, qnt_rows, qnt_cols);
		}
	);

	var labelsProb2assign = [];
	for(i = 1; i < qnt_cols-1; i++)
		labelsProb2assign[i-1] = table_info.rows[0].cells[i].innerHTML;

	var labelsLevel2assign = [];
	for(i = 1; i < qnt_rows-1; i++)
		labelsLevel2assign[i-1] = "Level " + table_info.rows[i].cells[0].innerHTML;

	var levelStats2assign = [];
	for(i = 1; i < qnt_rows-1; i++){
		if(table_prob.rows[i].cells[qnt_cols-1].innerHTML != 0)
			levelStats2assign[i-1] = ((table_user.rows[i].cells[qnt_cols-1].innerHTML/table_prob.rows[i].cells[qnt_cols-1].innerHTML)* 100).toFixed(0);
		else
			levelStats2assign[i-1] = (0).toFixed(0);
	}

	var probStats2assign = [];
	for(i = 1; i < qnt_cols-1; i++){
		if(table_prob.rows[qnt_rows-1].cells[i].innerHTML != 0)
		probStats2assign[i-1] = ((table_user.rows[qnt_rows-1].cells[i].innerHTML/table_prob.rows[qnt_rows-1].cells[i].innerHTML)* 100).toFixed(0);
		else
			probStats2assign[i-1] = (0).toFixed(0);
	}

	// console.log(labelsProb2assign);
	// console.log(levelStats2assign);
	// console.log(probStats2assign);

	loadProbRadar(labelsProb2assign, probStats2assign);

	loadLevelRadar(labelsLevel2assign, levelStats2assign);

}

function load_table_info(table_info, table_user, table_prob, qnt_rows, qnt_cols){

	var row = table_info.insertRow(0);
	for(var i = 0; i < qnt_cols; i++){
		var cell = row.insertCell(i);
		cell.innerHTML = table_user.rows[0].cells[i].innerHTML;
	}

	for(var i = 1; i <= qnt_cols; i++){
		var row = table_info.insertRow(i);
		var cell = row.insertCell(0);
		cell.innerHTML = table_user.rows[i].cells[0].innerHTML;
		for(var j = 1; j < (qnt_rows-1); j++) {
			
			var cell = row.insertCell(j);
			var user = table_user.rows[i].cells[j].innerHTML;
			var prob = table_prob.rows[i].cells[j].innerHTML;

			var calc = (((user) / (prob)) * 100);

			if(prob == 0)
				cell.innerHTML = "-";
			else
				cell.innerHTML = calc.toFixed(2) + " %";
		}
	}

	return false;
}

function user_view(table_info, table_user, table_prob, qnt_rows, qnt_cols){
	for(var i = 1; i <= qnt_cols; i++){
		for(var j = 1; j < (qnt_rows-1); j++) {
			
			var cell_elem = table_info.rows[i].cells[j];
			var user = table_user.rows[i].cells[j].innerHTML;

			cell_elem.innerHTML = user;
		}
	}
	return false;
}

function porcentage_view(table_info, table_user, table_prob, qnt_rows, qnt_cols){
	for(var i = 1; i <= qnt_cols; i++){
		for(var j = 1; j < (qnt_rows-1); j++) {
			
			var cell_elem = table_info.rows[i].cells[j];

			var user = table_user.rows[i].cells[j].innerHTML;
			var prob = table_prob.rows[i].cells[j].innerHTML;

			var calc = (((user) / (prob)) * 100);

			if(prob == 0)
				cell_elem.innerHTML = "-";
			else
				cell_elem.innerHTML = calc.toFixed(2) + " %";
		}
	}
	return false;
}

function total_view(table_info, table_user, table_prob, qnt_rows, qnt_cols){
	for(var i = 1; i <= qnt_cols; i++){
		for(var j = 1; j < (qnt_rows-1); j++) {
			
			var cell_elem = table_info.rows[i].cells[j];

			var user = table_user.rows[i].cells[j].innerHTML;
			var prob = table_prob.rows[i].cells[j].innerHTML;

			cell_elem.innerHTML = user + " / " + prob;
		}
	}
	return false;
}

function loadProbRadar(labels2assign, data2assign){
		var context, data, options, chart;

	    // RADAR CHART
	    context = $('#radar-chart-category').get(0).getContext('2d');
	    data = {
	        labels: labels2assign,
	        datasets: [
	            {
	                label: "",
	                fillColor: "rgba(66, 139, 202, 0.2)",
	                strokeColor: "rgba(66, 139, 202, 0.7)",
	                pointColor: "rgba(66, 139, 202, 1.0)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(66, 139, 202, 1.0)",
	                data: data2assign
	            }
	        ]
	    };

	    options = {
	        // Number - Tooltip label font size in pixels
	        tooltipFontSize: 12,

	        // Number - Pixel radius of the tooltip border
	        tooltipCornerRadius: 3,

	        // String - Template string for single tooltips
	        tooltipTemplate: "<%= value %>%",

	        // Boolean - Whether to show lines for each scale point
	        scaleShowLine: true,

	        // Boolean - Whether we show the angle lines out of the radar
	        angleShowLineOut: true,

	        // Boolean - Whether to show labels on the scale
	        scaleShowLabels: false,

	        // Boolean - Whether the scale should begin at zero
	        scaleBeginAtZero: true,

	        // String - Colour of the angle line
	        angleLineColor: "rgba(0,0,0,.1)",

	        // Number - Pixel width of the angle line
	        angleLineWidth: 1,

	        // String - Point label font declaration
	        pointLabelFontFamily: "'Arial'",

	        // String - Point label font weight
	        pointLabelFontStyle: "normal",

	        // Number - Point label font size in pixels
	        pointLabelFontSize: 14,

	        // String - Point label font colour
	        pointLabelFontColor: "#666",

	        // Boolean - Whether to show a dot for each point
	        pointDot: true,

	        // Number - Radius of each point dot in pixels
	        pointDotRadius: 3,

	        // Number - Pixel width of point dot stroke
	        pointDotStrokeWidth: 1,

	        // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	        pointHitDetectionRadius: 20,

	        // Boolean - Whether to show a stroke for datasets
	        datasetStroke: true,

	        // Number - Pixel width of dataset stroke
	        datasetStrokeWidth: 2,

	        // Boolean - Whether to fill the dataset with a colour
	        datasetFill: true,

	        // String - A legend template
	        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	    };

	    chart = new Chart(context).Radar(data, options);
	    console.log("OK");
}

function loadLevelRadar(labels2assign, data2assign){
		var context, data, options, chart;

		console.log(labels2assign);
		console.log(data2assign);

	    // RADAR CHART
	    context = $('#radar-chart-level').get(0).getContext('2d');
	    data = {
	        labels: labels2assign,
	        datasets: [
	            {
	                label: "",
	                fillColor: "rgba(66, 139, 202, 0.2)",
	                strokeColor: "rgba(66, 139, 202, 0.7)",
	                pointColor: "rgba(66, 139, 202, 1.0)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(66, 139, 202, 1.0)",
	                data: data2assign
	            }
	        ]
	    };

	    options = {
	        // Number - Tooltip label font size in pixels
	        tooltipFontSize: 12,

	        // Number - Pixel radius of the tooltip border
	        tooltipCornerRadius: 3,

	        // String - Template string for single tooltips
	        tooltipTemplate: "<%= value %>%",

	        // Boolean - Whether to show lines for each scale point
	        scaleShowLine: true,

	        // Boolean - Whether we show the angle lines out of the radar
	        angleShowLineOut: true,

	        // Boolean - Whether to show labels on the scale
	        scaleShowLabels: false,

	        // Boolean - Whether the scale should begin at zero
	        scaleBeginAtZero: true,

	        // String - Colour of the angle line
	        angleLineColor: "rgba(0,0,0,.1)",

	        // Number - Pixel width of the angle line
	        angleLineWidth: 1,

	        // String - Point label font declaration
	        pointLabelFontFamily: "'Arial'",

	        // String - Point label font weight
	        pointLabelFontStyle: "normal",

	        // Number - Point label font size in pixels
	        pointLabelFontSize: 14,

	        // String - Point label font colour
	        pointLabelFontColor: "#666",

	        // Boolean - Whether to show a dot for each point
	        pointDot: true,

	        // Number - Radius of each point dot in pixels
	        pointDotRadius: 3,

	        // Number - Pixel width of point dot stroke
	        pointDotStrokeWidth: 1,

	        // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	        pointHitDetectionRadius: 20,

	        // Boolean - Whether to show a stroke for datasets
	        datasetStroke: true,

	        // Number - Pixel width of dataset stroke
	        datasetStrokeWidth: 2,

	        // Boolean - Whether to fill the dataset with a colour
	        datasetFill: true,

	        // String - A legend template
	        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	    };

	    chart = new Chart(context).Radar(data, options);
	    console.log("OK");
}