<?php

	//var_dump($_POST);

	include_once 'transform_data.php';

	// ====================================================================================

		function search_key_in_array($array, $value){
			$size = sizeof($array);
			for($i = 0; $i < $size; $i++){
				if($array[$i] == $value)
					return $i;
			}
			return -1;
		}
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



	// ====================================================================================

		$categories = ["X", "Iniciante", "Ad-Hoc", "Strings", "Estruturas e Bibliotecas", "Matemática", "Paradigmas", "Grafos", "Geometria Computacional", "SQL", "Total(Y)"];

		$levels = [1,2,3,4,5,6,7,8,9,10, "Total(X)"];

		$qnt_cols = sizeof($categories);
		$qnt_rows = sizeof($levels);

		// --------------------------------------------------------------------------------

		$data_user_one = array();
		$data_user_one[0] = $categories;

		for($i = 1; $i <= $qnt_rows; $i++){
			$data_user_one[$i][0] = $levels[$i-1];
		}
		for($i = 1; $i < $qnt_rows; $i++){
			for($j = 1; $j < $qnt_cols; $j++){
				$data_user_one[$i][$j] = 0;
			}
		}

		$data_user_two = array();
		$data_user_two[0] = $categories;

		for($i = 1; $i <= $qnt_rows; $i++){
			$data_user_two[$i][0] = $levels[$i-1];
		}
		for($i = 1; $i < $qnt_rows; $i++){
			for($j = 1; $j < $qnt_cols; $j++){
				$data_user_two[$i][$j] = 0;
			}
		}

		// --------------------------------------------------------------------------------

		$data_problems = array();
		$data_problems[0] = $categories;
		for($i = 1; $i <= $qnt_rows; $i++){
			$data_problems[$i][0] = $levels[$i-1];
		}
		for($i = 1; $i < $qnt_rows; $i++){
			for($j = 1; $j < $qnt_cols; $j++){
				$data_problems[$i][$j] = 0;
			}
		}
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


	//29546 - lukasavicus
	$user_id_one = $_POST["user_id_one"];
	$user_id_two = $_POST["user_id_two"];

	$user_data_one = join_data($user_id_one);
	$user_data_two = join_data($user_id_two);
	$problems_data = crawl_problems();


	// ====================================================================================
		foreach($user_data_one as $ud){
			$idx_i = $ud["problem_data"]["level"];
			$idx_j = search_key_in_array($categories, $ud["problem_data"]["category"]);

			if($idx_j != -1){
				$data_user_one[$idx_i][$idx_j]++;
			}
		}

		foreach($user_data_two as $ud){
			$idx_i = $ud["problem_data"]["level"];
			$idx_j = search_key_in_array($categories, $ud["problem_data"]["category"]);

			if($idx_j != -1){
				$data_user_two[$idx_i][$idx_j]++;
			}
		}

		// --------------------------------------------------------------------------------

		foreach($problems_data as $pd){
			$idx_i = $pd["level"];
			$idx_j = search_key_in_array($categories, $pd["category"]);

			if($idx_j != -1){
				$data_problems[$idx_i][$idx_j]++;
			}
		}
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


	// ====================================================================================
		for($i = 1; $i < $qnt_cols; $i++){
			for($j = 1, $sum = 0; $j < $qnt_rows-1; $j++){
				$sum += $data_user_one[$i][$j];
			}
			$data_user_one[$i][$qnt_cols-1] = $sum;
		}

		for($i = 1; $i < $qnt_rows; $i++){
			for($j = 1, $sum = 0; $j < $qnt_cols-1; $j++){
				$sum += $data_user_one[$j][$i];
			}
			$data_user_one[$qnt_rows][$i] = $sum;
		}

		// --------------------------------------------------------------------------------

		for($i = 1; $i < $qnt_cols; $i++){
			for($j = 1, $sum = 0; $j < $qnt_rows-1; $j++){
				$sum += $data_user_two[$i][$j];
			}
			$data_user_two[$i][$qnt_cols-1] = $sum;
		}

		for($i = 1; $i < $qnt_rows; $i++){
			for($j = 1, $sum = 0; $j < $qnt_cols-1; $j++){
				$sum += $data_user_two[$j][$i];
			}
			$data_user_two[$qnt_rows][$i] = $sum;
		}

		// --------------------------------------------------------------------------------

		for($i = 1; $i < $qnt_cols; $i++){
			for($j = 1, $sum = 0; $j < $qnt_rows-1; $j++){
				$sum += $data_problems[$i][$j];
			}
			$data_problems[$i][$qnt_cols-1] = $sum;
		}

		for($i = 1; $i < $qnt_rows; $i++){
			for($j = 1, $sum = 0; $j < $qnt_cols-1; $j++){
				$sum += $data_problems[$j][$i];
			}
			$data_problems[$qnt_rows][$i] = $sum;
		}
	// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

?>

<!DOCTYPE html>
<html>
<head>
	<title> Table View </title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>

	<script src="./chart1.js"></script>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<input type="text" name="user_id_one" readonly="true" value="<?= $user_id_one ?>">
	<input type="text" name="user_id_two" readonly="true" value="<?= $user_id_two ?>">
	<hr>
	<div class="container-fluid" style="size:90%">
		<table id="table-info" class="table table-striped">
		</table>
	</div>
	<button id="btn-user" type="button" class="btn btn-primary">Only User numbers</button>
	<button id="btn-relative" type="button" class="btn btn-primary">Relative numbers (%)</button>
	<button id="btn-total" type="button" class="btn btn-primary">Total numbers</button>
	
	<!-- -->
		<table id="table-user-one" class="table" style="display:none">
			<?php foreach($data_user_one as $row): ?>
				<tr >
				<?php foreach($row as $value): ?>
					<td ><?= $value ?></td>
				<?php endforeach; ?>		
				</tr>
			<?php endforeach; ?>
		</table>
		<table id="table-user-two" class="table" style="display:none">
			<?php foreach($data_user_two as $row): ?>
				<tr >
				<?php foreach($row as $value): ?>
					<td ><?= $value ?></td>
				<?php endforeach; ?>		
				</tr>
			<?php endforeach; ?>
		</table>
		<table id="table-prob" class="table" style="display:none">
			<?php foreach($data_problems as $row): ?>
				<tr >
				<?php foreach($row as $value): ?>
					<td ><?= $value ?></td>
				<?php endforeach; ?>		
				</tr>
			<?php endforeach; ?>
		</table>
	<!-- -->




	<!-- -->
		<div class="radar_container">
			<canvas id="radar-chart-compare-category" class="radar_component"></canvas>
		</div>

		<div class="radar_container">
			<canvas id="radar-chart-compare-level" class="radar_component"></canvas>
		</div>
	<!-- -->
	<script type="text/javascript">
		var COLOR1 = "<?= $_POST['user_color_one'] ?>";
		var COLOR2 = "<?= $_POST['user_color_two'] ?>";
	</script>
	<script type="text/javascript" src="table_view_compare_action.js"></script>
</body>
</html>