<?php 
  
   header("Content-Type: application/json");
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Method: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Method, Authorization, X-Requested-With');

   include('db.php');

 $data_decode = json_decode(file_get_contents("php://input"),true);

  $std_name = $data_decode['sname'];
  $std_age = $data_decode['sage'];
  $std_city = $data_decode['scity'];



 $insert_query = "INSERT INTO std (name, age, city) VALUES ('{$std_name}','{$std_age}','{$std_city}')";
 $result = mysqli_query($conn, $insert_query) or die('query error'.mysqli_error($conn));

 if($result == true){

   echo json_encode(array('message' =>'New Record Successfully Added', 'status' =>true ));

 }else{
    echo json_encode(array('message' =>'New Record Unsuccessfully Added', 'status' =>true ));
 }





?>