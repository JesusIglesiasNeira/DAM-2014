<?php 
 
// Make sure search terms were sent 
if (!empty($_GET['q'])) { 
    // Strip any dangerous text out of the search
    $search_terms = htmlspecialchars($_GET['q']); 
     
    // Create an OAuth connection 
    require 'app_tokens.php'; 
    require 'libs/tmhOAuth.php'; 
    $connection = new tmhOAuth(array( 
        'consumer_key' => $consumer_key, 
        'consumer_secret' => $consumer_secret, 
        'user_token' => $user_token, 
        'user_secret' => $user_secret 
    )); 
     
    // Run the search with the Twitter API 
    $http_code = $connection->request('GET',
        $connection->url('1.1/search/tweets'), 
        array('q' => $search_terms, 
            'count' => 100, 
            'lang' => 'en', 
            'type' => 'recent'
        )
    ); 

    // Search was successful 
    if ($http_code == 200) {
        echo $connection->response['response']; exit;
        // Handle errors from API request 
    } else {
        echo json_encode(array('code' => $http_code, 'Error'));
    } 
 
} else { 
    print 'No search terms found'; 
}
?>