<?php

$ubigeo = $_POST['ubigeo'];
//codDreUgel:
$codCentroPoblado = $_POST['codCentroPoblado'];
$nomCentroPoblado = $_POST['nomCentroPoblado'];
$codigoModular = $_POST['codigoModular'];
$nombreIE = $_POST['nombreIE'];
$codigoLocal = $_POST['codigoLocal'];
$direccionIE = $_POST['direccionIE'];
//progarti:
//progise:
$gestiones = $_POST['gestiones'];
//areas:

$url = "http://escale.minedu.gob.pe/padron/rest/iiee?ubigeo=" . $ubigeo . "&codCentroPoblado=" . $codCentroPoblado . "&nomCentroPoblado=" . $nomCentroPoblado . "&codigoModular=" . $codigoModular . "&nombreIE=" . $nombreIE . "&codigoLocal=" . $codigoLocal . "&direccionIE=" . $direccionIE . "&gestiones=" . $gestiones;

$xml = simplexml_load_file($url);
echo json_encode($xml);
?>