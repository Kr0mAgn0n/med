<?php
header("Content-Type: application/ms-excel; charset=UTF-16LE");
header("Content-Disposition: attachment; filename=export.xls;");

$csv = $_POST['csv'];
$csv = mb_convert_encoding($csv, 'UTF-16LE', 'UTF-8');
$csvData = str_getcsv($csv, "\n");
$index = 0;

foreach ($csvData as $csv_line) {
	$csvTable[$index] = explode(",", $csv_line);
	$index++;
}

echo "<table>";
foreach ($csvTable as $csv_line) {
	echo "<tr>";	
	foreach ($csv_line as $csv_column) {		
		echo "<td>";
		echo $csv_column;
		echo "</td>";		
	}
	echo "</tr>";
}
echo "</table>";

?>