<?php 
  
   header('Content-Type: application/json');
   header('Access-Control-Allow-Origin: *');
   header('Access-Control-Allow-Method: PUT');
   header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Method, Authorization, X-Requested-With');
  
    include('db.php');

    $data_decode = json_decode(file_get_contents('php://input'), true);

    $std_id = $data_decode['sid'];
    $std_name = $data_decode['sname'];
    $std_age = $data_decode['sage'];
    $std_city = $data_decode['scity'];
 
    $update_query = "UPDATE std SET name ='{$std_name}', age ='{$std_age}', city ='{$std_city}'
                     WHERE id = '{$std_id}' ";

     $result = mysqli_query($conn, $update_query) or die('query error'.mysqli_error($conn));

     if($result == true){
         echo json_encode(array(
             'message' => 'Record updated Successfully',
             'status'  => true
         ));
     }else{
        echo json_encode(array(
            'message' => 'Record not updated Unsuccessfully',
            'status'  => false
        ));
     }


?>