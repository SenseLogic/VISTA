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

            request.send( request_body );
        }
        );
}

// ~~

function SendJsonRequest(
    request_url,
    request_method,
    request_object = null
    )
{
    var
        request,
        response_object;

    request = new XMLHttpRequest();

    return new Promise(
        function ( resolve, reject )
        {
            request.onreadystatechange
                = function()
                  {
                      if ( request.readyState == 4 )
                      {
                          try
                          {
                              response_object = GetJsonObject( request.responseText );
                          }
                          catch ( error )
                          {
                              Print( request.responseText );
                              PrintError( error );
                          }

                          if ( request.status >= 300 )
                          {
                              reject( response_object );
                          }
                          else
                          {
                              resolve( response_object );
                          }
                      }
                  };

            request.open( request_method, request_url, true );
            request.setRequestHeader( "Content-type", "application/json; charset=UTF-8" );

            if ( request_object === null )
            {
                request.send( null );
            }
            else
            {
                request.send( GetJsonText( request_object ) );
            }
        }
        );
}

