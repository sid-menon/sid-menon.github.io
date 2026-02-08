<?php
$recipient = "hr@r3synergy.com";
$name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
$email = isset($_POST["email"]) ? trim($_POST["email"]) : "";
$company = isset($_POST["company"]) ? trim($_POST["company"]) : "";
$message = isset($_POST["message"]) ? trim($_POST["message"]) : "";

if ($name === "" || $email === "" || $message === "") {
  http_response_code(400);
  echo "Missing required fields.";
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo "Invalid email address.";
  exit;
}

$subject = "Website inquiry";
$body = "Name: " . $name . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Company: " . ($company === "" ? "N/A" : $company) . "\n\n";
$body .= "Message:\n" . $message . "\n";

$headers = "From: " . $name . " <" . $email . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

if (mail($recipient, $subject, $body, $headers)) {
  header("Location: contact.html");
  exit;
}

http_response_code(500);
echo "Message could not be sent. Please try again later.";
?>
