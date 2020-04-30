// -- VARIABLES

var
    MinimumInteger = -9007199254740991,
    MaximumInteger = 9007199254740991,
    UnitArray = [ "%", "px", "em", "rem", "vw", "vh", "vmin", "vmax" ],
    ErrorsAreShown = true;

// -- FUNCTIONS

var
    Html = String.raw,
    Alert = alert,
    Write = document.write,
    Print = console.log,
    Dump = console.dir,
    PrintTable = console.table,
    PrintStack = console.trace,
    GetReal = parseFloat,
    GetInteger = parseInt,
    GetNumber = Number,
    GetText = String,
    GetEscapedText = escape,
    GetUnescapedText = unescape,
    GetEncodedUri = encodeURI,
    GetDecodedUri = decodeURI,
    GetJsonText = JSON.stringify,
    GetJsonObject = JSON.parse;

// ~~

function ShowError(
    )
{
    var
        argument,
        error_console_element,
        error_message_element;

    if ( ErrorsAreShown )
    {
        error_console_element = document.getElementById( "error-console" );

        if ( error_console_element === null )
        {
            error_console_element = document.createElement( "div" );
            error_console_element.id = "error-console";
            error_console_element.style = "position:fixed;z-index:999999;left:0;top:0;width:100%;height:100%;font-size:1rem;overflow:auto;background-color:rgba(0,0,0,0.5);color:white";
            error_console_element.innerHTML = "<h1>ERROR</h1>";
            error_console_element.onclick = function(
                )
            {
                error_console_element.style.display = "none";
            }

            document.body.appendChild( error_console_element );
        }
        else
        {
            error_console_element.style.display = "block";
        }

        for ( argument of arguments )
        {
            if ( argument instanceof Error )
            {
                error_message_element = document.createElement( "pre" );

                if ( argument.stack === undefined )
                {
                    error_message_element.innerHTML = GetEncodedHtml( argument.toString() )
                }
                else
                {
                    error_message_element.innerHTML
                        = GetEncodedHtml( argument.toString() )
                          + "\n"
                          + GetEncodedHtml( argument.stack );
                }
            }
            else if ( argument instanceof XMLHttpRequest )
            {
                error_message_element = document.createElement( "pre" );

                error_message_element.innerHTML
                    = GetEncodedHtml( argument.responseURL )
                      + "\n"
                      + GetEncodedHtml( argument.status )
                      + " "
                      + GetEncodedHtml( argument.statusText )
                      + "\n"
                      + GetEncodedHtml( argument.responseText );
            }
            else
            {
                error_message_element = document.createElement( "div" );

                if ( typeof argument !== "string" )
                {
                    error_message_element.textContent = GetJsonText( argument );
                }
                else if ( argument.startsWith( '<' ) )
                {
                    error_message_element.innerHTML = argument;
                }
                else
                {
                    error_message_element.textContent = argument;
                }
            }

            error_console_element.appendChild( error_message_element );

            Print( error_message_element.textContent );
        }
    }
}

// ~~

function PrintText(
    )
{
    var
        argument;

    for ( argument of arguments )
    {
        Print( GetJsonText( argument ) );
    }
}

// ~~

function PrintWarning(
    )
{
    PrintStack();
    console.warn( ...arguments );
}

// ~~

function PrintError(
    )
{
    ShowError( ...arguments );
    PrintStack();
    console.error( ...arguments );
}

// ~~

function IsMobileBrowser()
{
    var
        user_agent;

    user_agent = navigator.userAgent.toLowerCase();

    return (
        user_agent.indexOf( 'android' ) >= 0
        || user_agent.indexOf( 'iphone' ) >= 0
        || user_agent.indexOf( 'ipad' ) >= 0
        || user_agent.indexOf( 'ipod' ) >= 0
        || user_agent.indexOf( 'blackberry' ) >= 0
        || user_agent.indexOf( 'phone' ) >= 0
        );
}

// ~~

function GetLeftPaddedText(
    text,
    minimum_character_count,
    padding_character
    )
{
    if ( text.length < minimum_character_count )
    {
        return padding_character.repeat( minimum_character_count - text.length ) + text;
    }
    else
    {
        return text;
    }
}

// ~~

function GetRightPaddedText(
    text,
    minimum_character_count,
    padding_character
    )
{
    if ( text.length < minimum_character_count )
    {
        return text + padding_character.repeat( minimum_character_count - text.length );
    }
    else
    {
        return text;
    }
}

// ~~

function GetNaturalHexadecimalText(
    natural,
    minimum_digit_count = 0
    )
{
    return GetLeftPaddedText( natural.toString( 16 ), minimum_digit_count, '0' );
}

// ~~

function GetByteArrayHexadecimalText(
    byte_array
    )
{
    var
        byte_index,
        hexadecimal_text;

    hexadecimal_text = "";

    for ( byte_index = 0;
          byte_index < byte_array.length;
          ++byte_index )
    {
        hexadecimal_text += GetNaturalHexadecimalText( byte_array[ byte_index ], 2 );
    }

    return hexadecimal_text;
}

// ~~

function GetRandomByteArray(
    byte_count
    )
{
    var
        byte_array;

    byte_array = new Uint8Array( byte_count );
    window.crypto.getRandomValues( byte_array );

    return byte_array;
}

// ~~

function RemoveStart(
    text,
    start
    )
{
    if ( start !== ""
         && text.startsWith( start ) )
    {
        return text.substring( start.length );
    }
    else
    {
        return text;
    }
}

// ~~

function RemoveEnd(
    text,
    end
    )
{
    if ( end !== ""
         && text.endsWith( end ) )
    {
        return text.substring( 0, text.length - end.length );
    }
    else
    {
        return text;
    }
}

// ~~

function GetUnit(
    value
    )
{
    if ( typeof value === "string" )
    {
        for ( unit of UnitArray )
        {
            if ( value.endsWith( unit ) )
            {
                return unit;
            }
        }
    }

    return "";
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

function AwaitCall(
    called_function,
    ...argument_array
    )
{
    var
        result;

    ( async () => { result = await called_function( ...argument_array ); } )();

    return result;
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
        return setTimeout( called_function, delay_time * 1000.0 );
    }
}

// ~~

function RepeatCall(
    called_function,
    delay_time
    )
{
    return setInterval( called_function, delay_time * 1000.0 );
}

// ~~

Array.prototype.Print = function(
    )
{
    Print( this );

    return this;
}

// ~~

Array.prototype.Iterate = function(
    element_function,
    ...argument_array
    )
{
    var
        element_index;

    for ( element_index = 0;
          element_index < this.length;
          ++element_index )
    {
        element_function( this[ element_index ], element_index, ...argument_array );
    }

    return this;
}

// ~~

Array.prototype.Process = function(
    array_function,
    ...argument_array
    )
{
    array_function( this, ...argument_array );

    return this;
}
