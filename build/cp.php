<?php
header("Access-Control-Allow-Methods: GET");
header("charset=utf-8");
header("Content-type: application/json");

$servername = "MEDESTADISTICA\GIS";
$username = "sa";
$password = "sasa";
$bd = "BDGEOREF";

$connectionInfo = array("Database"=>$bd, "UID"=>$username, "PWD"=>$password);

$connect = sqlsrv_connect($servername, $connectionInfo);

$ubigeo = $_GET["ubigeo"];
$codcp = $_GET["codcp"];
$codugel = $_GET["codugel"];
$nomcp = $_GET["nomcp"];

$sql = "SELECT
        UBIGEO as UBIGEO,
        DEP as DEPARTAMENTO,
        PROV as PROVINCIA,
        DIST as DISTRITO,
        CODCP,
        MNOMCP as NOMCCPP,
        (CASE WHEN CON_IE = 1 THEN 'SI' ELSE 'NO' END) as CONIIEE,
        N_IIEE  as NROIIEE,
        NIVEL as NIVEL,
        CAPITAL as CAPITAL,
        FUENTE_G as FUENTE_CP,
        Z as ALTITUD,
        YGD as LATITUD,
        XGD as LONGITUD
FROM dbo.CCPP
WHERE
        CCPP.BORRADO <> 1 and
        UBIGEO like '".$ubigeo."%' and
        CODUGEL like '".$codugel."%' and
        MNOMCP like '%".$nomcp."%' and
        CODCP like '".$codcp."%'
ORDER BY MNOMCP";

$result = sqlsrv_query($connect, $sql);

if ($result === false) {
	die(print_r(sqlsrv_errors(), true));
}

$result_array = array();

while ($obj = sqlsrv_fetch_object($result)) {
	switch ($obj->CAPITAL) {
		case "0" :
			$obj->CAPITAL = "No es capital";
			break;
			
		case "1":
			$obj->CAPITAL = "Departamental";
			break;
			
		case "2":
			$obj->CAPITAL = "Provincial";
			break;
			
		case "3":
			$obj->CAPITAL = "Distrital";
			break;
	}
	
	$result_array[] = $obj;
}

ob_start("ob_gzhandler");

echo json_encode($result_array);


sqlsrv_close($connect);

?>
