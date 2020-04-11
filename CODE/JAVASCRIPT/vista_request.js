// -- FUNCTIONS

function SendRequest(
    request_url,
    request_method,
    request_header_map,
    request_body
    )
{
    var
        request_header_name,
        request;

    request = new XMLHttpRequest();

    return new Promise(
        function ( resolve, reject )
        {
            request.onreadystatechange
                = function()
                  {
                      if ( request.readyState == 4 )
                      {
                          if ( request.status >= 300 )
                          {
                              reject( request );
                          }
                          else
                          {
                              resolve( request );
                          }
                      }
                  };

            request.open( request_method, request_url, true );

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
        );
}

