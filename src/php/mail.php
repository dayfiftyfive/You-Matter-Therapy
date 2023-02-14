<?php

    // data sent in header are in JSON format
    header('Content-Type: application/json');

    // takes the value from variables and Post the data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $postmessage = $_POST['message'];  
    $to = "numra.yaqub@gmail.com";
    $subject = "New Client Message";


    // Email Template
    $message = "<b>Name : </b>". $name ."<br>";
    $message .= "<b>Phone Number : </b>".$phone."<br>";
    $message .= "<b>Email Address : </b>".$email."<br>";
    $message .= "<b>Message : </b>".$postmessage."<br>";


    // Headers
    $header = "From:"+$email+" \r\n";
    $header .= "MIME-Version: 1.0\r\n";
    $header .= "Content-type: text/html\r\n";

    // Send Email
    $retval = mail($to,$subject,$message,$header);


    // JavaScript Message Results
    if( $retval == true ) {
        echo json_encode(array(
            'success'=> true,
            'message' => 'Message sent successfully'
        ));
    }
    
    else {
        echo json_encode(array(
            'error'=> true,
            'message' => 'Error sending message'
        ));
    }
