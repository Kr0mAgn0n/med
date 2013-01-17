<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("charset=utf-8");
header("Content-type: application/json");

function sql_nivmod($nivmod){
	$cadena = "";
	foreach ($nivmod as $nivel) {
		if ($nivel !== $nivmod[count($nivmod)-1])
			$cadena .= "NIV_MOD like '".$nivel."%' or ";
		else
			$cadena .= "NIV_MOD like '".$nivel."%'";
				
	}	
	return $cadena;
}

$servername = "MEDESTADISTICA\GIS";
$username = "sa";
$password = "sasa";
$bd = "BDGEOREF";

$connectionInfo = array("Database"=>$bd, "UID"=>$username, "PWD"=>$password);

$connect = sqlsrv_connect($servername, $connectionInfo);

$cod_ubigeo = $_GET['codgeo'];
$cod_ugel = $_GET['codugel'];
$CodModular = $_GET['codmod'];
$anexo = $_GET['anexo'];
$NombreIIEE = $_GET['nombreie'];
$CodLocal = $_GET['codlocal'];
$Direccion = $_GET['direccion'];
$nomccpp = $_GET['cenpob'];
$localidad = $_GET['localidad'];
$nivel = $_GET['nivmod'];
$gesdep = $_GET['gesdep'];
$codccpp = $_GET['codcp'];

		
// En el caso que la variable nivmod sea compuesto como en el caso de que sea A1|A2|A3 se va a desmembrar en un array
$nivmod = explode("|", $nivel);

$sql = "SELECT rtrim(CODGEO) as UBIGEO, 
        qry_listadepartamentos.DEPARTAMENTO as DEPARTAMENTO, 
        qry_listaprovincias.PROVINCIA as PROVINCIA, 
        qry_listadistritos.NOMBRE as DISTRITO, 
        CEN_POB as NOMBRECP, 
        CODCPSIG_OFICIAL as CODIGOCP, 
        NOMLUGAR as LOCALIDAD, 
        rtrim(CODLOCAL) as CODLOCAL, 
        rtrim(COD_MOD) as COD_MOD, 
        rtrim(ANEXO) as ANEXO, 
        CEN_EDU, 
        rtrim(NIV_MOD) AS NIVEL, 
        Z AS ALTITUD, 
        FUENTE_G , 
        (case when POINT_Y is null or POINT_Y='' then CCPP.YGD else POINT_Y end) as LATITUD, 
        (case when POINT_X is null or POINT_X='' then CCPP.XGD else POINT_X end) as LONGITUD 
from 
PADRON INNER JOIN CCPP ON PADRON.CODCPSIG_OFICIAL = CCPP.CODCP 
LEFT JOIN dbo.qry_listadepartamentos ON LEFT(PADRON.CODGEO,2) = qry_listadepartamentos.codubigeo 
LEFT JOIN dbo.qry_listaprovincias ON LEFT(PADRON.CODGEO,4) = qry_listaprovincias.codubigeo 
LEFT JOIN dbo.qry_listadistritos ON PADRON.CODGEO = qry_listadistritos.codubigeo 
WHERE (CCPP.BORRADO <> 1 OR CCPP.BORRADO IS NULL) AND 
        (CODGEO like '".$cod_ubigeo."%') and 
        (CODOOII like '".$cod_ugel."%') and 
        CEN_EDU like '%".$NombreIIEE."%' and 
        PADRON.COD_MOD like '".$CodModular."%' and 
        CODLOCAL like '".$CodLocal."%' and 
        DIR_CEN like '%".$Direccion."%' and 
        CEN_POB like '%".$nomccpp."%' and 
        (isnull(NOMLUGAR,'') like '%".$codccpp."%' ) and 
        (GES_DEP like '%".$gesdep."%') and 
        ESTADO = 1 and
		(".sql_nivmod($nivmod).")
ORDER BY DEPARTAMENTO,PROVINCIA,DISTRITO, [NOMBRECP],[CODLOCAL],COD_MOD";

$result = sqlsrv_query($connect, $sql);

if ($result === false) {
	die(print_r(sqlsrv_errors(), true));
}

$result_array = array();

while ($obj = sqlsrv_fetch_object($result)) {	
	switch ($obj->NIVEL) {
		case "A1" :
			$obj->NIVEL = "Inicial";
			break;
			
		case "A2":
			$obj->NIVEL = "Inicial";
			break;
			
		case "A3":
			$obj->NIVEL = "Inicial";
			break;
			
		case "A5":
			$obj->NIVEL = "Programa";
			break;
			
		case "B0":
			$obj->NIVEL = "Primaria EBR";
			break;
			
		case "F0":
			$obj->NIVEL = "Secundaria EBR";
			break;
			
		case "C0":
			$obj->NIVEL = "Primaria EDA";
			break;
			
		case "G0";
			$obj->NIVEL = "Secundaria EDA";
			break;
			
		case "D0":
			$obj->NIVEL = "Básica alternativa";
			break;
			
		case "K0":
			$obj->NIVEL = "Superior no universitaria";
			break;
			
		case "T0":
			$obj->NIVEL = "Superior no universitaria";
			break;
			
		case "M0":
			$obj->NIVEL = "Superior no universitaria";
			break;
			
		case "E0":
			$obj->NIVEL = "Especial";
			break;
			
		case "L0":
			$obj->NIVEL = "CETPRO";
			break;
	}
	
	$result_array[] = $obj;
}


echo json_encode($result_array);


sqlsrv_close($connect);
?>
