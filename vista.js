// -- FUNCTIONS

function GetValue(
    text
    )
{
    return JSON.parse( json_text );
}

// ~~

function GetText(
    value
    )
{
    return JSON.stringify( value );
}

// ~~

function GetEncodedHtml(
    text
    )
{
    var
        div_element;

    div_element = document.createElement( "div" );
    div_element.appendChild( document.createTextNode( text ) );

    return div_element.innerHTML;
}

// ~~

function GetDecodedHtml(
    text
    )
{
    var
        text_area_element;

    text_area_element = document.createElement( "textarea" );
    text_area_element.innerHTML = text;

    return text_area_element.value;
}

// ~~

function Print(
    value
    )
{
    console.log( value );
}

// ~~

function Log(
    value
    )
{
    console.log( JSON.stringify( value ) );
}

// ~~

function DelayCall(
    called_function,
    delay_time
    )
{
    if ( delay_time === undefined )
    {
        if ( document.readyState === "complete"
             || document.readyState === "interactive" )
        {
            return setTimeout( called_function, 1 );
        }
        else
        {
            document.addEventListener( "DOMContentLoaded", called_function );

            return null;
        }
    }
    else
    {
        return setTimeout( called_function, delay_time * 1000 );
    }
}

// ~~

function RepeatCall(
    called_function,
    delay_time
    )
{
    return setInterval( called_function, delay_time * 1000 );
}

// ~~

function SendRequest(
    url,
    method,
    header_map,
    body,
    callback_function
    )
{
    var
        header_name,
        request;

    request = new XMLHttpRequest();
    request.open( method, url, true );
    request.onreadystatechange
        = function()
          {
              if ( this.readyState == 4
                   && callback_function !== undefined )
              {
                  callback_function( request );
              }
          };

    if ( header_map !== undefined )
    {
        for ( header_name in header_map )
        {
            request.setRequestHeader( header_name, header_map[ header_name ] );
        }
    }
    else if ( method == "POST" )
    {
        request.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
    }

    request.send( body );
}

// ~~

function GetTemplateFunction(
    template_text,
    parameter_list
    )
{
    var
        code,
        part_array,
        section_array,
        section_count,
        template_text,
        text;

    if ( template_text instanceof HTMLElement )
    {
        template_text = GetDecodedHtml( template_text.innerHTML );
    }

    section_array = template_text.split( "\r" ).join( "" ).split( "<%" );
    section_count = section_array.length;

    template_function_code = "(";

    if ( parameter_list !== undefined )
    {
        template_function_code += parameter_list;
    }

    template_function_code += ") => {\nvar result = " + JSON.stringify( section_array[ 0 ] ) + ";\n";

    for ( section_index = 1;
          section_index < section_count;
          ++section_index )
    {
        section_part_array = section_array[ section_index ].split( "%>" );
        section_code = section_part_array.shift();
        section_text = section_part_array.join( "%>" );

        if ( section_code.startsWith( "=" ) )
        {
            template_function_code += "result += GetEncodedHtml( " +  section_code.substring( 1 ).trim() + " );\n";
        }
        else if ( section_code.startsWith( "#" ) )
        {
            template_function_code += "result += " + section_code.substring( 1 ).trim() + ";\n";
        }
        else
        {
            template_function_code += section_code;
        }

        if ( section_text.length > 0 )
        {
            template_function_code += "result += " + JSON.stringify( section_text ) + ";\n";
        }
    }

    template_function_code += "return result;\n}";

    return eval(
        template_function_code
              .split( "<\\%" ).join( "<%" )
              .split( "%\\>" ).join( "%>" )
              .split( "<\\\\%" ).join( "<%" )
              .split( "%\\\\>" ).join( "%>" )
        );
}

// ~~

Array.prototype.Log = function(
    )
{
    Log( this );

    return this;
}

// ~~

Array.prototype.Apply = function(
    element_function
    )
{
    this.forEach( element_function );

    return this;
}
