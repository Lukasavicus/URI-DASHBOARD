window.onload = function(){
	var table_info = document.getElementById("table-info");
	var table_user_one = document.getElementById("table-user-one");
	var table_user_two = document.getElementById("table-user-two");
	var table_prob = document.getElementById("table-prob");

	var qnt_rows = table_prob.rows.length;
	var qnt_cols = table_prob.rows[0].cells.length;

	var color_user_one = COLOR1;
	var color_user_two = COLOR2;

	load_table_info(table_info, table_user_one, table_user_two, table_prob, qnt_rows, qnt_cols, color_user_one, color_user_two);

	// ============================================================================================

		document.getElementById("btn-user").addEventListener('click',
			function (){
				user_view(table_info, table_user_one, table_user_two, table_prob, qnt_rows, qnt_cols, color_user_one, color_user_two);
			}
		);

		document.getElementById("btn-relative").addEventListener('click',
			function (){
				porcentage_view(table_info, table_user_one, table_user_two, table_prob, qnt_rows, qnt_cols, color_user_one, color_user_two);
			}
		);

		document.getElementById("btn-total").addEventListener('click',
			function (){
				total_view(table_info, table_user_one, table_user_two, table_prob, qnt_rows, qnt_cols, color_user_one, color_user_two);
			}
		);
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


	var labelsProb2assign = [];
	for(i = 1; i < qnt_cols-1; i++)
		labelsProb2assign[i-1] = table_info.rows[0].cells[i].innerHTML;

	var labelsLevel2assign = [];
	for(i = 1; i < qnt_rows-1; i++)
		labelsLevel2assign[i-1] = "Level " + table_info.rows[i].cells[0].innerHTML;

	var levelStats2assign = [];
	for(i = 1; i < qnt_rows-1; i++){
		var prob = table_prob.rows[i].cells[qnt_cols-1].innerHTML;
		var user_one = table_user_one.rows[i].cells[qnt_cols-1].innerHTML;
		var user_two = table_user_two.rows[i].cells[qnt_cols-1].innerHTML;

		var calc_one = ((user_one / prob)* 100).toFixed(2);
		var calc_two = ((user_two / prob)* 100).toFixed(2);

		if(prob != 0)
			levelStats2assign[i-1] = "<div class=\"row\"> <p style=\"color:" + color_user_one + "\">" + calc_one + "%</p> " + " / " + " <p style=\"color:" + color_user_two + "\"> " + calc_two + "%</p> </div>";
		else
			levelStats2assign[i-1] = (0).toFixed(0);
	}

	var probStats2assign = [];
	for(i = 1; i < qnt_cols-1; i++){
		var prob = table_prob.rows[qnt_rows-1].cells[i].innerHTML;
		var user_one = table_user_one.rows[qnt_rows-1].cells[i].innerHTML;
		var user_two = table_user_two.rows[qnt_rows-1].cells[i].innerHTML;

		var calc_one = ((user_one/prob)* 100).toFixed(2);
		var calc_two = ((user_two/prob)* 100).toFixed(2);

		if(prob != 0)
			probStats2assign[i-1] = "<div class=\"row\"> <p style=\"color:" + color_user_one + "\">" + calc_one + " % </p> " + " / " + " <p style=\"color:" + color_user_two + "\"> " + calc_two + " % </p> </div>";
		else
			probStats2assign[i-1] = (0).toFixed(0);
	}

	// console.log(labelsProb2assign);
	// console.log(levelStats2assign);
	// console.log(probStats2assign);

	// loadProbRadar(labelsProb2assign, probStats2assign);

	// loadLevelRadar(labelsLevel2assign, levelStats2assign);

}

function load_table_info(table_info, table_user_one, table_user_two, table_prob, qnt_rows, qnt_cols, color_user_one, color_user_two){

	var row = table_info.insertRow(0);
	for(var i = 0; i < qnt_cols; i++){
		var cell = row.insertCell(i);
		cell.innerHTML = table_prob.rows[0].cells[i].innerHTML;
	}

	for(var i = 1; i <= qnt_cols; i++){
		var row = table_info.insertRow(i);
		var cell = row.insertCell(0);
		cell.innerHTML = table_prob.rows[i].cells[0].innerHTML;
		for(var j = 1; j < (qnt_rows-1); j++) {
			
			var cell = row.insertCell(j);
			var user_one = table_user_one.rows[i].cells[j].innerHTML;
			var user_two = table_user_two.rows[i].cells[j].innerHTML;
			var prob = table_prob.rows[i].cells[j].innerHTML;

			var calc_one = ((user_one / prob) * 100).toFixed(2);
			var calc_two = ((user_two / prob) * 100).toFixed(2);

			if(prob == 0)
				cell.innerHTML = "- / -";
			else
				cell.innerHTML = "<div class=\"row\"> <p style=\"color:" + color_user_one + "\">" + calc_one + " % </p> " + " / " + " <p style=\"color:" + color_user_two + "\"> " + calc_two + " % </p> </div>";
		}
	}

	return false;
}

function user_view(table_info, table_user_one, table_user_two, table_prob, qnt_rows, qnt_cols, color_user_one, color_user_two){
	for(var i = 1; i <= qnt_cols; i++){
		for(var j = 1; j < (qnt_rows-1); j++) {
			
			var cell_elem = table_info.rows[i].cells[j];
			var user_one = table_user_one.rows[i].cells[j].innerHTML;
			var user_two = table_user_two.rows[i].cells[j].innerHTML;

			cell_elem.innerHTML = "<div class=\"row\"> <p style=\"color:" + color_user_one + "\">" + user_one + " </p> " + "/" + " <p style=\"color:" + color_user_two + "\"> " + user_two + " </p> </div>";
		}
	}
	return false;
}

function porcentage_view(table_info, table_user_one, table_user_two, table_prob, qnt_rows, qnt_cols, color_user_one, color_user_two){
	for(var i = 1; i <= qnt_cols; i++){
		for(var j = 1; j < (qnt_rows-1); j++) {
			
			var cell_elem = table_info.rows[i].cells[j];

			var user_one = table_user_one.rows[i].cells[j].innerHTML;
			var user_two = table_user_two.rows[i].cells[j].innerHTML;
			var prob = table_prob.rows[i].cells[j].innerHTML;

			var calc_one = ((user_one / prob) * 100).toFixed(2);
			var calc_two = ((user_two / prob) * 100).toFixed(2);

			if(prob == 0)
				cell_elem.innerHTML = "- / -";
			else
				cell_elem.innerHTML = "<div class=\"row\"> <p style=\"color:" + color_user_one + "\">" + calc_one + "% </p> " + "/" + " <p style=\"color:" + color_user_two + "\"> " + calc_two + "%</p> </div>";
		}
	}
	return false;
}

function total_view(table_info, table_user_one, table_user_two, table_prob, qnt_rows, qnt_cols, color_user_one, color_user_two){
	for(var i = 1; i <= qnt_cols; i++){
		for(var j = 1; j < (qnt_rows-1); j++) {
			
			var cell_elem = table_info.rows[i].cells[j];

			var user_one = table_user_one.rows[i].cells[j].innerHTML;
			var user_two = table_user_two.rows[i].cells[j].innerHTML;
			var prob = table_prob.rows[i].cells[j].innerHTML;

			cell_elem.innerHTML = "<div class=\"row\"> <p style=\"color:" + color_user_one + "\">" + user_one + " </p> " + "/" + " <p style=\"color:" + color_user_two + "\"> " + user_two + " </p>" + "/" + prob + "</div>";
		}
	}
	return false;
}

function loadProbRadar(labels2assign, dataOne2assign, dataTwo2assign){
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
	                data: dataOne2assign
	            },
	            {
	                label: "",
	                fillColor: "rgba(66, 139, 202, 0.2)",
	                strokeColor: "rgba(66, 139, 202, 0.7)",
	                pointColor: "rgba(66, 139, 202, 1.0)",
	                pointStrokeColor: "#fff",
	                pointHighlightFill: "#fff",
	                pointHighlightStroke: "rgba(66, 139, 202, 1.0)",
	                data: dataTwo2assign
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

function loadLevelRadar(labels2assign, dataOne2assign){
		var context, data, options, chart;

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
	                data: dataOne2assign
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