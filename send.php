<?php
$phone = $_POST['phone'];

$to = "Risaev25@gmail.com";
$subject = "Заявка на обратный звонок";
$message = '
	Пользователь оставил свои данные <br>
 <b>Телефон:</b> ' . $phone  . '';
$headers = "From: Risaev25@gmail.com" . "\r\n" .
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
mail($to,$subject,$message,$headers);






