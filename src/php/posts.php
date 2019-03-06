<?php

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "programmer_gains";

try {
    // Try Connect to the DB with new MySqli object - Params {hostname, userid, password, dbname}
    $mysqli = new mysqli("localhost", "root", "root", "programmer_gains");


    $statement = $mysqli->prepare("SELECT * FROM programmer_gains");


    $statement->execute(); // Execute the statement.
    $result = $statement->get_result(); // Binds the last executed statement as a result.

    //echo json_encode(($result->fetch_assoc())); // Parse to JSON and print.

} catch (mysqli_sql_exception $e) { // Failed to connect? Lets see the exception details..
    echo "MySQLi Error Code: " . $e->getCode() . "<br />";
    echo "Exception Msg: " . $e->getMessage();
    exit(); // exit and close connection.
}

$mysqli->close(); // finally, close the connectionCopy
?>
