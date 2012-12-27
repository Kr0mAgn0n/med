<?php
  /*--- start config ---*/
  $outputPath = "";
  $outputUrl = "http://localhost/devsummit09/printing/output/";
  /*--- end config ---*/

  //get JSON input
  $post = file_get_contents("php://input");
  $json = json_decode($post);

  //response JSON format
  // {
  //   href: <String>,
  //   width: <Number>,
  //   height: <Number>,
  //   extent: <Object, { xmin, ymin, xmax, ymax, spatialReference }>
  // }

  //create array to hold output
  $output = array("width" => $json->width, "height" => $json->height, "extent" => $json->extent);
  
  //get extent & layers
  $extent = json_decode($json->extent);
  $layers = $json->layers;

  //create GD image for output
  $image = @imagecreatetruecolor($json->width, $json->height) or die("Cannot Initialize new GD image stream");
  
  //fill background (white) color
  $backgroundColor = imagecolorallocate($image, 255, 255, 255);
  imagefilledrectangle($image, 0, 0, $json->width, $json->height, $backgroundColor);
  
  //create multiple CURL requests
  $charray = array();
  $mh = curl_multi_init();

  //for each layer, call exportMapImage and pass appropriate params
  foreach ($layers as $layer) {
    $layerJson = json_decode($layer);
    $query = array(
      "f" => "image",
      "bbox" => $extent->xmin . "," . $extent->ymin . "," . $extent->xmax . "," . $extent->ymax,
      "size" => $json->width . "," . $json->height,
      "transparent" => "true",
      "layers" => $layerJson->layers,
      "layerDefs" => $layerJson->layerDefs,
      "format" => $layerJson->format
    );
    $url = $layerJson->url . "/export?" . http_build_query($query);
    
    //set CURL options
    $ch = curl_init();
    array_push($charray, $ch);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    
    curl_multi_add_handle($mh, $ch);
  }
  
  //execute request and check till completed
  $running = null;
  do {
    curl_multi_exec($mh, $running);
  }
  while ($running > 0);
  
  //for each request, get image (as string) and merge with output image
  //close each CURL request
  for ($i=0; $i<count($charray); $i++) {
    $layerJson = json_decode($layers[$i]);
    $ch = $charray[$i];
    
    $imageString = curl_multi_getcontent($ch);
    $layerImage = imagecreatefromstring($imageString);
    
    imagecopymerge($image, $layerImage, 0, 0, 0, 0, $json->width, $json->height, (int) ($layerJson->opacity * 100));

    curl_multi_remove_handle($mh, $ch);
  }
  //close multiple request handler
  curl_multi_close($mh);
  
  //save output image to file system then destroy
  $filename = "export_" . uniqid() . ".jpg";

  imagejpeg($image, $outputPath . $filename);
  imagedestroy($image);
  
  //add output image url serialize JSON and return response
  $output["href"] = $outputUrl . $filename;
  echo json_encode($output);
?>