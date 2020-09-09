$(document).ready(function(){
 
    // fetch all data show in table
       
  
     function load_table(){
      $("#load-data").html("");
       $.ajax({
          url: "http://localhost/php_api/api_fetch_all.php",
          type: 'GET',
          success: function(data){
            if(data.status == false){
              $("#load-data").append('<tr><td><h2>"+ data.message +"</h2></td></tr>')
            }else{
              $.each(data,function(key,value){
                $("#load-data").append("<tr>"
                                     +"<td>"+ value.id +"</td>"+
                                      "<td>"+ value.name +"</td>"+
                                      "<td>"+ value.age +"</td>"+
                                      "<td>"+ value.city +"</td>"+
                                      "<td><button class='btn btn-outline-primary'  id='edit-btn' data-toggle='modal' data-target='#staticBackdrop' data-eid='"+value.id+"'>Edit</button></td>"+
                                      "<td><button class='btn btn-outline-danger'  id='delete-btn' data-id='"+value.id+"'>X</button></td>"+
                                     "</tr>");
              });
            }
          }
       });
  
     }
  
     load_table();
  
     // fetch single record show in modal
   
     $(document).on('click','#edit-btn',function(){
  
      var student_id = $(this).data("eid");
      var object = {sid : student_id};
      var myJSON = JSON.stringify(object);
  
      $.ajax({
        url: "http://localhost/php_api/api_fetch.php",
        type: 'POST',
        data: myJSON,
        success: function(data){
          $('#sid').val(data[0].id);
         $('#name').val(data[0].name);
         $('#age').val(data[0].age);
         $('#city').val(data[0].city);
  
        }
     });
   
     });
  
  // show success or error message
  
       $('#success-message').hide();
       $('#error-message').hide(); 
  
   function message(message,status){
       
       if(status == true){
          $('#success-message').html(message).slideDown(1000);
          $('#error-message').slideUp();
           setInterval(function(){
            $('#success-message').slideUp();
           },4000);
  
       }else if(status == false){
        $('#error-message').html(message).slideDown(1000);
        $('#success-message').slideUp();
         setInterval(function(){
          $('#error-message').slideUp();
         },4000);
       }
   }
  
  
  //  Insert new record
     
  $('#save-btn').on('click',function(e){
      e.preventDefault();
  
       var jsonObject = JsonData("#addForm"); 
     
        if(jsonObject == false){
           message("All fields are required",false);
        }else{
          $.ajax({
            url: "http://localhost/php_api/api_insert.php",
            type: 'POST',
            data : jsonObject,
            success: function(data){
              message(data.message, data.status);
  
                if(data.status == true){
                  load_table();
                   $("#addForm").trigger('reset');
                }
      }
      });
    }
  });
    
   // Function for covert array Object to Json data
  
       function JsonData(traget_form){
             // convert to array
          var form_arr = $(traget_form).serializeArray();
  
            // convert to Object
          var obj = {};
             for(var a = 0; a < form_arr.length; a++){
               if(form_arr[a].value == ""){
                     return false;
               }
             obj[form_arr[a].name] = form_arr[a].value;
              }
       
           // convert to JSON
         var json_String = JSON.stringify(obj);
              return json_String;
              
       }
  
  
    /*******************************************   updata data *********************/
  
    $('#update_btn').on('click',function(e){
      e.preventDefault();
  
       var jsonObject = JsonData("#update_form"); 
    
          $.ajax({
            url: "http://localhost/php_api/api_update.php",
            type: 'POST',
            data : jsonObject,
            success: function(data){
              message(data.message, data.status);
                if(data.status == true){
                  $('.fade').hide(1000);
                  
                  load_table();
                  
                }
           }
      });
  });
  
  
  /*******************************************   Delete record *********************/
  
  $(document).on('click','#delete-btn',function(){
   
    if(confirm('Do you really want to delete this?')){
  
    var student_id = $(this).data("id");
    var object = {sid : student_id};
    var myJSON = JSON.stringify(object);
    var row = this;
  
    $.ajax({
      url: "http://localhost/php_api/api_delete.php",
      type: 'POST',
      data : myJSON,
      success: function(data){
        message(data.message, data.status);
          if(data.status == true){
           $(row).closest("tr").fadeOut();
          }
        }
      });
    }
  
  });
  
  
  /*******************************************   search record *********************/
  
      $('#search').on('keyup',function(){
  
         var search_data = $(this).val();
         $("#load-data").html("");
         
         $.ajax({
          url: "http://localhost/php_api/api_search.php?search="+ search_data,
          type: 'GET',
          success: function(data){
              if(data.status == false){
                $("#load-data").append("<tr><td><h2 class='alert alert-danger'>"+ data.message +"</h2></td></tr>");
              }else{
                $.each(data,function(key,value){
                  $("#load-data").append("<tr>"
                                       +"<td>"+ value.id +"</td>"+
                                        "<td>"+ value.name +"</td>"+
                                        "<td>"+ value.age +"</td>"+
                                        "<td>"+ value.city +"</td>"+
                                        "<td><button class='btn btn-outline-primary'  id='edit-btn' data-toggle='modal' data-target='#staticBackdrop' data-eid='"+value.id+"'>Edit</button></td>"+
                                        "<td><button class='btn btn-outline-danger'  id='delete-btn' data-id='"+value.id+"'>X</button></td>"+
                                       "</tr>");
                        });
                    }
                }
            
          });
      });
  
  
  
  
  
  
  
   });//end of document
  