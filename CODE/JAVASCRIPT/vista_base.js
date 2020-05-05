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

function GetTextArrayText(
    text_array,
    separator_text = ", ",
    opening_brace = "[ ",
    closing_brace = " ]",
    empty_braces = "[]"
    )
{
    var
        text_array_text;

    text_array_text = text_array.join( separator_text );

    if ( text_array_text === "" )
    {
        return empty_braces;
    }
    else
    {
        return opening_brace + text_array_text + closing_brace;
    }
}

// ~~

function GetValueText(
    value,
    value_is_unquoted = false
    )
{
    if ( typeof value === "string"
         && value_is_unquoted )
    {
        return value;
    }
    else if ( value instanceof Array
              || value instanceof Uint8Array
              || value instanceof Uint16Array
              || value instanceof Uint32Array
              || value instanceof BigUint64Array
              || value instanceof Int8Array
              || value instanceof Int16Array
              || value instanceof Int32Array
              || value instanceof BigInt64Array
              || value instanceof Float32Array
              || value instanceof Float64Array )
    {
        if ( value.length === 0 )
        {
            return [];
        }
        else
        {
            return GetArrayText( value );
        }
    }
    else if ( value instanceof Function )
    {
        return "()";
    }
    else if ( value instanceof HTMLElement )
    {
        return (
            GetObjectText(
                {
                    tagName : value.tagName,
                    nodeType : value.nodeType,
                    id : value.id,
                    classList : value.classList,
                    style : value.style,
                    dataset : value.dataset,
                    clientWidth : value.clientWidth,
                    clientHeight : value.clientHeight,
                    clientLeft : value.clientLeft,
                    clientTop : value.clientTop,
                    offsetWidth : value.offsetWidth,
                    offsetHeight : value.offsetHeight,
                    offsetLeft : value.offsetLeft,
                    offsetTop : value.offsetTop,
                    scrollWidth : value.scrollWidth,
                    scrollHeight : value.scrollHeight,
                    scrollLeft : value.scrollLeft,
                    scrollTop : value.scrollTop
                }
                )
            );
    }
    else if ( value instanceof Object )
    {
        return GetObjectText( value );
    }
    else
    {
        return GetJsonText( value );
    }
}

// ~~

function GetArrayText(
    value_array,
    separator_text = ", ",
    value_is_unquoted = false,
    opening_brace = "[ ",
    closing_brace = " ]",
    empty_braces = "[]"
    )
{
    var
        array_text,
        text_array,
        value;

    text_array = [];

    for ( value of value_array )
    {
        text_array.push( GetValueText( value, value_is_unquoted ) );
    }

    return GetTextArrayText( text_array, separator_text, opening_brace, closing_brace, empty_braces );
}

// ~~

function GetObjectText(
    object,
    separator_text = ", ",
    opening_brace = "{ ",
    closing_brace = " }",
    empty_braces = "{}"
    )
{
    var
        object_text,
        property,
        text_array;

    text_array = [];

    for ( property in object )
    {
        if ( object.hasOwnProperty( property ) )
        {
            text_array.push( property + " : " + GetValueText( object[ property ] ) );
        }
    }

    return GetTextArrayText( text_array, separator_text, opening_brace, closing_brace, empty_braces );
}

// ~~

function Write(
    ...argument_array
    )
{
    document.body.appendChild( document.createTextNode( GetArrayText( argument_array, "", true, "", "", "" ) ) );
}

// ~~

HTMLElement.prototype.Write = function (
    )
{
    this.appendChild( document.createTextNode( GetArrayText( argument_array, "", true, "", "", "" ) ) );
}

// ~~

function WriteLine(
    ...argument_array
    )
{
    document.body.appendChild( document.createTextNode( GetArrayText( argument_array, "", true, "", "", "" ) ) );
    document.body.appendChild( document.createElement( "br" ) );
}

// ~~

HTMLElement.prototype.WriteLine = function (
    )
{
    this.appendChild( document.createTextNode( GetArrayText( argument_array, "", true, "", "", "" ) ) );
    this.appendChild( document.createElement( "br" ) );
}

// ~~

function WriteRow(
    ...argument_array
    )
{
    document.body.appendChild( document.createTextNode( GetArrayText( argument_array, " ", true, "", "", "" ) ) );
    document.body.appendChild( document.createElement( "br" ) );
}

// ~~

HTMLElement.prototype.WriteRow = function (
    )
{
    this.appendChild( document.createTextNode( GetArrayText( argument_array, " ", true, "", "", "" ) ) );
    this.appendChild( document.createElement( "br" ) );
}

// ~~

function HideErrors(
    )
{
    ErrorsAreShown = false;
}

// ~~

function ShowErrors(
    )
{
    ErrorsAreShown = true;
}

// ~~

function ShowError(
    ...argument_array
    )
{
    var
        argument,
        error_panel_element,
        error_message_element;

    if ( ErrorsAreShown )
    {
        error_panel_element = document.getElementById( "vista-error-panel" );

        if ( error_panel_element === null )
        {
            error_panel_element = document.createElement( "div" );
            error_panel_element.id = "vista-error-panel";
            error_panel_element.style = "position:fixed;z-index:999999;left:0;top:0;width:100%;height:100%;font-size:1rem;overflow:auto;background-color:rgba(0,0,0,0.5);color:white";
            error_panel_element.innerHTML = "<h1>ERROR</h1>";
            error_panel_element.onclick = function (
                )
            {
                error_panel_element.style.display = "none";
            }

            document.body.appendChild( error_panel_element );
        }
        else
        {
            error_panel_element.style.display = "block";
        }

        for ( argument of argument_array )
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
                else if ( argument.HasPrefix( "<" ) )
                {
                    error_message_element.innerHTML = argument;
                }
                else
                {
                    error_message_element.textContent = argument;
                }
            }

            error_panel_element.appendChild( error_message_element );

            Print( error_message_element.textContent );
        }
    }
}

// ~~

function PrintWarning(
    ...argument_array
    )
{
    PrintStack();
    console.warn( ...argument_array );
}

// ~~

function PrintError(
    ...argument_array
    )
{
    ShowError( ...argument_array );
    PrintStack();
    console.error( ...argument_array );
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
            if ( value.HasSuffix( unit ) )
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
            .ReplaceText( "&", "&amp;" )
            .ReplaceText( "<", "&lt;" )
            .ReplaceText( ">", "&gt;" )
            .ReplaceText( "\\", "&#92;" )
            .ReplaceText( "\"", "&#34;" )
            .ReplaceText( "'", "&#39;" )
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

    user_agent = navigator.userAgent.GetLowerCaseText();

    return (
        user_agent.indexOf( "android" ) >= 0
        || user_agent.indexOf( "iphone" ) >= 0
        || user_agent.indexOf( "ipad" ) >= 0
        || user_agent.indexOf( "ipod" ) >= 0
        || user_agent.indexOf( "blackberry" ) >= 0
        || user_agent.indexOf( "phone" ) >= 0
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

function GetRealText(
    real,
    fractional_digit_count = undefined,
    decimal_separator = ".",
    trailing_zeroes_are_removed = false
    )
{
    var
        real_text;

    if ( fractional_digit_count === undefined )
    {
        real_text = real.toString();
    }
    else
    {
        real_text = real.toFixed( fractional_digit_count );
    }

    if ( trailing_zeroes_are_removed
         && real_text.indexOf( "." ) >= 0 )
    {
        real_text = real_text.RemoveSuffixCharacters( "0." );
    }

    if ( decimal_separator === "." )
    {
        return real_text;
    }
    else
    {
        return real_text.ReplaceText( "." ).join( decimal_separator );
    }
}

// ~~

String.prototype.GetLowerCaseText = String.prototype.toLowerCase;

// ~~

String.prototype.GetUpperCaseText = String.prototype.toUpperCase;

// ~~

String.prototype.HasPrefix = String.prototype.startsWith;

// ~~

String.prototype.HasSuffix = String.prototype.endsWith;

// ~~

String.prototype.RemovePrefix = function (
    prefix
    )
{
    if ( prefix !== ""
         && this.HasPrefix( prefix ) )
    {
        return this.substring( prefix.length );
    }
    else
    {
        return this;
    }
}

// ~~

String.prototype.RemoveSuffix = function (
    suffix
    )
{
    if ( suffix !== ""
         && this.HasSuffix( suffix ) )
    {
        return this.substring( 0, this.length - suffix.length );
    }
    else
    {
        return this;
    }
}

// ~~

String.prototype.RemoveSuffixCharacters = function (
    suffix_characters
    )
{
    var
        character_count,
        last_character;

    character_count = this.length;

    while ( character_count > 0 )
    {
        last_character = this.charAt( character_count - 1 );

        if ( suffix_characters.indexOf( last_character ) >= 0 )
        {
            --character_count;
        }
        else
        {
            break;
        }
    }

    if ( character_count < this.length )
    {
        return this.substring( 0, character_count );
    }
    else
    {
        return this;
    }
}

// ~~

String.prototype.GetLeftPaddedText = function (
    minimum_character_count,
    padding_character = " "
    )
{
    if ( this.length < minimum_character_count )
    {
        return padding_character.repeat( minimum_character_count - this.length ) + this;
    }
    else
    {
        return this;
    }
}

// ~~

String.prototype.GetRightPaddedText = function (
    minimum_character_count,
    padding_character = " "
    )
{
    if ( this.length < minimum_character_count )
    {
        return this + padding_character.repeat( minimum_character_count - this.length );
    }
    else
    {
        return this;
    }
}

// ~~

String.prototype.ReplaceText = function (
    old_text,
    new_text
    )
{
    return this.split( old_text ).join( new_text );
}

// ~~

function GetNaturalHexadecimalText(
    natural,
    minimum_digit_count = 0
    )
{
    return natural.toString( 16 ).GetLeftPaddedText( minimum_digit_count, '0' );
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

Array.prototype.Print = function (
    )
{
    Print( this );

    return this;
}

// ~~

Array.prototype.Iterate = function (
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

Array.prototype.Process = function (
    array_function,
    ...argument_array
    )
{
    array_function( this, ...argument_array );

    return this;
}

// ~~

Array.prototype.HasValue = Array.prototype.includes;

// ~~

Array.prototype.GetValueIndex = Array.prototype.indexOf;

// ~~

Array.prototype.FindMatchingValue = Array.prototype.find;

// ~~

Array.prototype.FindMatchingValueIndex = Array.prototype.findIndex;

// ~~

Array.prototype.FilterValues = Array.prototype.filter;

// ~~

Array.prototype.MapValue = Array.prototype.map;
