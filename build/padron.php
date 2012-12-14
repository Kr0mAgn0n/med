<?php
$codgeo = $_GET['codgeo'];
$codugel = $_GET['codugel'];
$codmod = $_GET['codmod'];
$anexo = $_GET['anexo'];
$nombreie = $_GET['nombreie'];
$codlocal = $_GET['codlocal'];
$direccion = $_GET['direccion'];
$cenpob = $_GET['cenpob'];
$localidad = $_GET['localidad'];
$nivmod = $_GET['nivmod'];
$gesdep = $_GET['gesdep'];
$codcp = $_GET['codcp'];

$url = "http://escale.minedu.gob.pe/mapaeducativolenguas/restservicesig/service/restsig.svc/padron?codgeo=" . $codgeo . "&codugel=" . $codugel . "&codmod=" . $codmod . "&anexo=" . $anexo . "&nombreie=" . $nombreie . "&codlocal=" . $codlocal . "&direccion=" . $direccion . "&cenpob=" . $cenpob . "&localidad=" . $localidad . "&nivmod=" . $nivmod . "&gesdep=" . $gesdep . "&codcp=" . $codcp;

echo file_get_contents($url);
?>