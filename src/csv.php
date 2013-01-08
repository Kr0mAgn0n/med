<?php
/*header("Content-Type: application/ms-excel; charset=UTF-16LE");
header("Content-Disposition: attachment; filename=export.xls;");*/

$csv = $_POST['csv'];
/*$csv = mb_convert_encoding($csv, 'UTF-16LE', 'UTF-8');
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
		echo "<td style='mso-number-format:\\@;'>";
		echo $csv_column;
		echo "</td>";		
	}
	echo "</tr>";
}
echo "</table>";*/

require_once("PHPExcel.php");
require_once("PHPExcel/Reader/CSV.php");
require_once("PHPExcel/IOFactory.php");

$objPHPExcel = new PHPExcel();

$csvData = str_getcsv($csv, "\n");
$index = 0;

foreach ($csvData as $csv_line) {
	$csvTable[$index] = explode(",", $csv_line);
	$index++;
}

for ($i=0; $i<=count($csvTable)-1; $i++){
	for ($j=0; $j<=count($csvTable[$i])-1; $j++){
		$objPHPExcel->getActiveSheet()->getCellByColumnAndRow($j,$i)->setValueExplicit($csvTable[$i][$j], PHPExcel_Cell_DataType::TYPE_STRING);
	}
}

header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="export.xlsx"');
header('Cache-Control: max-age=0');

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
$objWriter->save('php://output');

?>