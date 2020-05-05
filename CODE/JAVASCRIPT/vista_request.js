// -- FUNCTIONS

function SendRequest(
    request_url,
    request_method,
    request_body = null,
    request_header_map = {}
    )
{
    var
        request_header_name,
        request;

    request = new XMLHttpRequest();

    return new Promise(
        function (
            resolve,
            reject
            )
        {
            request.onreadystatechange
                = function (
                      )
                  {
                      if ( request.readyState == 4 )
                      {
                          if ( request.status >= 300 )
                          {
                              PrintError( request_method + " " + request_url, request );

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
    request_object = null,
    request_header_map = {}
    )
{
    var
        request,
        response_object;

    request = new XMLHttpRequest();

    return new Promise(
        function (
            resolve,
            reject
            )
        {
            request.onreadystatechange
                = function (
                      )
                  {
                      if ( request.readyState == 4 )
                      {
                          if ( request.response === null
                               || request.response === "" )
                          {
                              response_object = {};
                          }
                          else
                          {
                              try
                              {
                                  response_object = GetJsonObject( request.response );
                              }
                              catch ( error )
                              {
                                  PrintError( error, request_method + " " + request_url, request );
                              }
                          }

                          if ( request.status >= 300 )
                          {
                              PrintError( request_method + " " + request_url, request );

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

            if ( request_header_map !== undefined )
            {
                for ( request_header_name in request_header_map )
                {
                    request.setRequestHeader( request_header_name, request_header_map[ request_header_name ] );
                }
            }

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

