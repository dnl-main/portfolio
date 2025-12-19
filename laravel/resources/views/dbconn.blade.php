<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>lara db check</title>
</head>
<body>
  <div> 
  <?php
    // Use the DB Facade
    use Illuminate\Support\Facades\DB;

    // Use a try-catch block for robust error handling
    try {
        // Attempt to get the underlying PHP Data Object (PDO) connection
        DB::connection()->getPdo();
        
        // If successful, retrieve the database name
        $databaseName = DB::connection()->getDatabaseName();
        
        echo "<h1>✅ Success!</h1>";
        echo "<h2>Database Connection: goods</h2>";
        echo "Database Name: <strong>{$databaseName}</strong>";

    } catch (\Exception $e) {
        // If connection fails, catch the exception and display the error
        echo "<h1>❌ Connection Failed!</h1>";
        echo "<p>Details:</p>";
        echo "<pre>{$e->getMessage()}</pre>";
        
        // This will often show the specific error (e.g., "Access denied" or "Unknown database")
    } 
  ?>
  </div>
  
</body>
</html>