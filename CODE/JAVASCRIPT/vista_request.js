// -- FUNCTIONS

function SendRequest(
    request_url,
    request_method,
    request_header_map,
    request_body,
    callback_function
    )
{
    var
        request_header_name,
        request;

    request = new XMLHttpRequest();
    request.open( request_method, request_url, true );
    request.onreadystatechange
        = function()
          {
              if ( this.readyState == 4
                   && callback_function !== undefined )
              {
                  callback_function( request );
              }
          };

    if ( request_header_map !== undefined )
    {
        for ( request_header_name in request_header_map )
        {
            request.setRequestHeader( request_header_name, request_header_map[ request_header_name ] );
        }
    }
    else if ( request_method == "POST" )
    {
        request.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
    }

    request.send( request_body );
}

