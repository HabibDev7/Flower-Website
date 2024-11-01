<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Contact Us Response</title>
  <style>
    /* Add your CSS styles here */
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-image: url('response.jpg');
      background-size: cover;
      background-repeat: no-repeat;
    }

    .Pcontainer {
      padding: 20px;
      max-width: 600px;
    }

    .response {
      background-color: #466446;
      color: white;
      border-radius: 5px;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .centered {
      text-align: center;
    }

    .error {
      color: red;
    }

    .return-btn {
      display: block;
      margin-top: 20px;
      text-align: center;
    }

    .return-btn a {
      text-decoration: none;
      color: #fff;
      background-color: #96AF96;
      padding: 10px 20px;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }

    .return-btn a:hover {
      background-color: #344e37;
    }
  </style>
</head>
<body class="resp">

<div class="Pcontainer">
  <div class="response">
    <?php
    // MySQL database connection parameters
    $servername = "localhost";
    $username = "root";
    $password = ""; // Assuming you don't have a password
    $database = "form-submission"; // Replace with your database name

    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if the form was submitted
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Sanitize user input
        $firstName = filter_input(INPUT_POST, 'firstName', FILTER_SANITIZE_STRING);
        $lastName = filter_input(INPUT_POST, 'lastName', FILTER_SANITIZE_STRING);
        $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
        $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
        $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
        
        // Prepare an SQL statement to insert the form data into the database
        $sql = "INSERT INTO `clients-data` (Fname, Lname, Email, Subject, Message, Date) 
                VALUES ('$firstName', '$lastName', '$email', '$subject', '$message', NOW())";

        // Execute the SQL statement
        if ($conn->query($sql) === TRUE) {
            echo "<h1 class='centered'>Thank you, $firstName! Your message has been received.</h1>";
        } else {
            echo "<p class='error'>Error: " . $conn->error . "</p>";
        }
    } else {
        echo "<p class='error'>Error: Invalid request</p>";
    }

    // Close the database connection
    $conn->close();
    ?>
  </div>
  <div class="return-btn">
    <a href="index.html">Return to Homepage</a>
  </div>
</div>

</body>
</html>