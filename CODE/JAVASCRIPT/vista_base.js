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
                    error_message_element.innerHTML = GetEscapedHtml( argument.toString() )
                }
                else
                {
                    error_message_element.innerHTML
                        = GetEscapedHtml( argument.toString() )
                          + "\n"
                          + GetEscapedHtml( argument.stack );
                }
            }
            else if ( argument instanceof XMLHttpRequest )
            {
                error_message_element = document.createElement( "pre" );

                error_message_element.innerHTML
                    = GetEscapedHtml( argument.responseURL )
                      + "\n"
                      + GetEscapedHtml( argument.status )
                      + " "
                      + GetEscapedHtml( argument.statusText )
                      + "\n"
                      + GetEscapedHtml( argument.responseText );
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

function WriteText(
    text
    )
{
    document.write( GetEscapedHtml( text ) );
}

// ~~

function WriteLine(
    line
    )
{
    document.write( GetEscapedHtml( line ) + "<br/>" );
}

// ~~

function WriteText(
    text
    )
{
    document.body.appendChild( document.createTextNode( text ) );
}

// ~~

function WriteLine(
    line
    )
{
    document.body.appendChild( document.createTextNode( line ) );
    document.body.appendChild( document.createElement( "br" ) );
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

function GetEscapedHtml(
    text
    )
{
    return (
        text
            .split( "&" ).join( "&amp;" )
            .split( "<" ).join( "&lt;" )
            .split( ">" ).join( "&gt;" )
            .split( "\\" ).join( "&#92;" )
            .split( "\"" ).join( "&#34;" )
            .split( "'" ).join( "&#39;" )
        );
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

String.prototype.GetLowerCaseText = String.prototype.toLowerCase;

// ~~

String.prototype.GetUpperCaseText = String.prototype.toUpperCase;

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
