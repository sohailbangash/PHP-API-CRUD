<?php 

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');

    include("db.php");
  
   $data = json_decode(file_get_contents("php://input"), true);

   $student_id = $data['sid'];

  
     $select_query = "SELECT * FROM std WHERE id = '{$student_id}' ";
     $result = mysqli_query($conn, $select_query) or die('query error'.mysqli_error($conn));

   if(mysqli_num_rows($result) > 0 ){

      $output = mysqli_fetch_all($result , MYSQLI_ASSOC);
        echo json_encode($output , JSON_PRETTY_PRINT);

   }else{

      echo json_encode(array('message' => 'No record found' , 'status' => false));
   }

 








?>