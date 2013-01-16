<?php
function sql_nivmod($nivmod){
	$cadena = "";
	foreach ($nivmod as $nivel) {
		if ($nivel !== $nivmod[count($nivmod)-1])
			$cadena .= "(NIV_MOD like '".$nivel."') or ";
		else
			$cadena .= "(NIV_MOD like '".$nivel."')";
				
	}	
	return $cadena;
}


$tipo = $_GET['tipo'];
$cod_ubigeo = $_GET['codgeo'];
$cod_ugel = $_GET['codugel'];
$CodModular = $_GET['codmod'];
$anexo = $_GET['anexo'];
$NombreIIEE = $_GET['nombreie'];
$CodLocal = $_GET['codlocal'];
$Direccion = $_GET['direccion'];
$nomccpp = $_GET['cenpob'];
//$codccpp = $_GET['localidad'];
$nivel = $_GET['nivmod'];
$gesdep = $_GET['gesdep'];
$codccpp = $_GET['codcp'];

//var_dump($_GET);

// En el caso que la variable nivmod sea compuesto como en el caso de que sea A1|A2|A3 se va a desmembrar en un array
$nivmod = explode("|", $nivel);


$servername = "MEDESTADISTICA\GIS";
$username = "sa";
$password = "sasa";
$bd = "BDGEOREF";

$connectionInfo = array("Database"=>$bd, "UID"=>$username, "PWD"=>$password);

$connect = sqlsrv_connect($servername, $connectionInfo);
//$selected = sqlsrv_select_db($bd, $conect);

$sql = "SELECT rtrim(CODGEO) as Ubigeo, 
        qry_listadepartamentos.DEPARTAMENTO as Departamento, 
        qry_listaprovincias.PROVINCIA as Provincia, 
        qry_listadistritos.NOMBRE as Distrito, 
        CEN_POB as NombreCP, 
        CODCPSIG_OFICIAL as CodigoCP, 
        NOMLUGAR as Localidad, 
        rtrim(CODLOCAL) as CODLOCAL, 
        rtrim(COD_MOD) as COD_MOD, 
        rtrim(ANEXO) as ANEXO, 
        CEN_EDU, 
        rtrim(NIV_MOD) AS NIVEL, 
        Z AS ALTITUD, 
        FUENTE_G , 
        (case when POINT_Y is null or POINT_Y='' then CCPP.YGD else POINT_Y end) as Latitud, 
        (case when POINT_X is null or POINT_X='' then CCPP.XGD else POINT_X end) as Longitud 
from 
PADRON INNER JOIN CCPP ON PADRON.CODCPSIG_OFICIAL = CCPP.CODCP 
LEFT JOIN dbo.qry_listadepartamentos ON LEFT(PADRON.CODGEO,2) = qry_listadepartamentos.codubigeo 
LEFT JOIN dbo.qry_listaprovincias ON LEFT(PADRON.CODGEO,4) = qry_listaprovincias.codubigeo 
LEFT JOIN dbo.qry_listadistritos ON PADRON.CODGEO = qry_listadistritos.codubigeo 
WHERE (CCPP.BORRADO <> 1 OR CCPP.BORRADO IS NULL) AND 
        (CODGEO like '".$cod_ubigeo."%') and 
        (CODOOII like '".$cod_ugel."%') AND 
        CEN_EDU like '%'+".$NombreIIEE."+'%' and 
        PADRON.COD_MOD like ".$CodModular."+'%' and 
        CODLOCAL like ".$CodLocal."+'%' and 
        DIR_CEN like '%'+".$Direccion."+'%' and 
        CEN_POB like '%'+".$nomccpp."+'%' and 
        (isnull(NOMLUGAR,'') like '%'+".$codccpp."+'%' ) and 
        (GES_DEP like '%'+".$gesdep."+'%') and 
        ESTADO = 1 and
		(".sql_nivmod($nivmod).")
ORDER BY Departamento,Provincia,Distrito, [NombreCP],[CodLocal],COD_MOD";



/*
(LEFT(UBIGEO,2) = @DEP) AND 
*/



/*$storeProcedure = mssql_init("storeProcedure", $conect);
mssql_bind($storeProcedure, '@tipo',  $tipo,  SQLVARCHAR,  false,  false,  1);
mssql_bind($storeProcedure, '@coddepartamento', $coddepartamento, SQLVARCHAR, false, false, 2);
mssql_bind($storeProcedure, '@codprovincia', $codprovincia, SQLVARCHAR, false, false, 4);
mssql_bind($storeProcedure, '@coddistrito', $coddistrito, SQLVARCHAR, false, false, 6);
mssql_bind($storeProcedure, '@dre', $dre, SQLVARCHAR, false, false, 50);
mssql_bind($storeProcedure, '@codugel', $codugel, SQLVARCHAR, false, false, 6);
mssql_bind($storeProcedure, '@NombreIIEE', $NombreIIEE, SQLVARCHAR, false, false, 80);
mssql_bind($storeProcedure, '@CodModular', $CodModular, SQLVARCHAR, false, false, 10);
mssql_bind($storeProcedure, '@CodLocal', $CodLocal, SQLVARCHAR, false, false, 10);
mssql_bind($storeProcedure, '@Direccion', $Direccion, SQLVARCHAR, false, false, 80);
mssql_bind($storeProcedure, '@nomccpp', $nomccpp, SQLVARCHAR, false, false, 200);
mssql_bind($storeProcedure, '@codccpp', $codccpp, SQLVARCHAR, false, false, 80);
mssql_bind($storeProcedure, '@cod_ubigeo', $cod_ubigeo, SQLVARCHAR, false, false, 6);
mssql_bind($storeProcedure, '@cod_ugel', $cod_ugel, SQLVARCHAR, false, false, 6);
mssql_bind($storeProcedure, '@nivel', $nivel, SQLVARCHAR, false, false, 50);
mssql_bind($storeProcedure, '@gesdep', $gesdep, SQLVARCHAR, false, false, 2);
mssql_bind($storeProcedure, '@tipo_de_programa', $tipo_de_programa, SQLVARCHAR, false, false, 4);
mssql_bind($storeProcedure, '@visitado', $visitado, SQLVARCHAR, false, false, 1);*/

$result = sqlsrv_query($connect, $sql);

if ($result === false) {
	die(print_r(sqlsrv_errors(), true));
}
//var_dump($result);
//var_dump(sqlsrv_fetch_object($result));

$result_array = array();

while ($obj = sqlsrv_fetch_object($result)) {
	//var_dump($obj);
	//echo "<br>";
	//echo "<br>";
	//echo $obj->NIVEL;
	
	/*if ($obj->NIVEL === "F0") {
		$obj->NIVEL = "Secundaria EBR";
	}*/
	
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

//var_dump($result_array);

//var_dump($nivmod);
echo json_encode($result_array);


sqlsrv_close($connect);
?>
