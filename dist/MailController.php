<?php

require __DIR__ . '/vendor/autoload.php';


$mail = new PHPMailer;

$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$phone = $_POST['phone'];

$mail->setFrom($email, $first_name . ' ' . $last_name);
$mail->addAddress('josh@darkroast.co', 'Josh Stobbs');
$mail->addReplyTo('josh@darkroast.co', 'Josh Stobbs');
$mail->ReutrnPath='josh@darkroast.co';

if (isset($_FILES['file']) &&
    $_FILES['file']['error'] == UPLOAD_ERR_OK) {
    $mail->AddAttachment($_FILES['file']['tmp_name'],
                         $_FILES['file']['name']);
}

$mail->isHTML(true);

$body = 'Name: ' . $first_name . $last_name . "\n" .
        'Email: ' . $email . "\n" .
        'Phone: ' . $phone . "\n" .

$mail->Subject = 'A new resume from ' . $first_name . ' ' . $last_name;
$mail->Body    = $body;
$mail->AltBody = $body;

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}