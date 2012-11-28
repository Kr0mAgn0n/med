<?php

$ubigeo = $_GET['ubigeo'];
//codDreUgel:
$codCentroPoblado = $_GET['codCentroPoblado'];
$nomCentroPoblado = $_GET['nomCentroPoblado'];
$codigoModular = $_GET['codigoModular'];
$nombreIE = $_GET['nombreIE'];
$codigoLocal = $_GET['codigoLocal'];
$direccionIE = $_GET['direccionIE'];
$gestiones = $_POST['gestiones'];

$url = "http://escale.minedu.gob.pe/padron/rest/iiee?ubigeo=" . $ubigeo . "&codCentroPoblado=" . $codCentroPoblado . "&nomCentroPoblado=" . $nomCentroPoblado . "&codigoModular=" . $codigoModular . "&nombreIE=" . $nombreIE . "&codigoLocal=" . $codigoLocal . "&direccionIE=" . $direccionIE . "&gestiones=" . $gestiones;

$xml = simplexml_load_file($url);
echo json_encode($xml);
?>