<?php 

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Method: DELETE');
   header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Method, Authorization, X-Requested-With');

    include("db.php");
  
   $data = json_decode(file_get_contents("php://input"), true);

   $student_id = $data['sid'];

  
     $select_query = "DELETE  FROM std WHERE id = '{$student_id}' ";
     $result = mysqli_query($conn, $select_query) or die('query error'.mysqli_error($conn));

   if($result == true){
    echo json_encode(array('message' => 'Record Deleted Successfully' , 'status' => true));
        // echo json_encode($output , JSON_PRETTY_PRINT);

   }else{

      echo json_encode(array('message' => 'No record found' , 'status' => false));
   }

 


?>