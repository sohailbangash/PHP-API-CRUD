<?php 
    header("Content-Type: application/json");
    header("Access-Control-Allow-Origin: *");
  
  
  include("db.php");
  
   $select_query = "SELECT * FROM std";
   $result = mysqli_query($conn, $select_query);

    if(mysqli_num_rows($result) > 0 ){

       $output = mysqli_fetch_all($result , MYSQLI_ASSOC);
         echo json_encode($output , JSON_PRETTY_PRINT);

    }else{

        echo json_encode(array('message' => 'No record found' , 'status' => false));
    }

  





?>