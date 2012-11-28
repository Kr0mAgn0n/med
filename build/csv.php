<?php
header("Cache-Control: public"); 
 
header('Content-Type: text/csv; charset=utf-8');
 
header('Content-Disposition: attachment; filename=datos.csv');

$csv = $_POST['csv'];

echo $csv;

?>