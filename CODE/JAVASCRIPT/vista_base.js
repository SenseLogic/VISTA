// -- CONSTANTS

const
    MinimumInteger = -9007199254740991,
    MaximumInteger = 9007199254740991,
    NaturalExpression = /^[0-9][0-9]*$/,
    IntegerExpression = /^-?[0-9][0-9]*$/,
    RealExpression = /^-?[0-9][0-9]*\.[0-9]*$/,
    NumericExpression = /^-?[0-9][0-9]*\.?[0-9]*$/,
    SlugExpression = /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    SnakeExpression = /^[a-z0-9]+(?:_[a-z0-9]+)*$/,
    UnitArray = [ "%", "px", "em", "rem", "vw", "vh", "vmin", "vmax" ];

// -- VARIABLES

var
    ErrorsAreShown = ( window.location.hostname === "localhost" );

// -- FUNCTIONS

var
    Text = String.raw,
    Alert = alert,
    Print = console.log,
    Dump = console.dir,
    PrintTable = console.table,
    PrintStack = console.trace,
    IsNaN = Number.isNaN,
    IsInteger = Number.isInteger,
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

function IsBooleanText(
    text
    )
{
    return text === "false" || text === "true";
}

// ~~

function IsBinaryText(
    text
    )
{
    return text === "0" || text === "1";
}

// ~~

function IsNaturalText(
    text
    )
{
    return text.match( NaturalExpression );
}

// ~~

function IsIntegerText(
    text
    )
{
    return text.match( IntegerExpression );
}

// ~~

function IsRealText(
    text
    )
{
    return text.match( RealExpression );
}

// ~~

function IsNumericText(
    text
    )
{
    return text.match( NumericExpression );
}

// ~~

function IsSlugText(
    text
    )
{
    return text.match( SlugExpression );
}

// ~~

function IsSnakeText(
    text
    )
{
    return text.match( SnakeExpression );
}

// ~~

function IsBoolean(
    value
    )
{
    return typeof value === "boolean";
}

// ~~

function IsNatural(
    value
    )
{
    return IsInteger( value ) && GetInteger( value ) >= 0;
}

// ~~

function IsNumber(
    value
    )
{
    return typeof value === "number";
}

// ~~

function IsString(
    value
    )
{
    return typeof value === "string";
}

// ~~

function IsObject(
    value
    )
{
    return (
        value !== null
        && typeof value === "object"
        && !Array.isArray( value )
        );
}

// ~~

function IsArray(
    value
    )
{
    return value instanceof Array;
}

// ~~

function IsFunction(
    value
    )
{
    return value instanceof Function;
}

// ~~

function IsElement(
    value
    )
{
    return value instanceof HTMLElement;
}

// ~~

function IsHtmlText(
    value
    )
{
    return (
        typeof value === "string"
        && value.HasPrefix( "<" )
        && value.Trim().HasSuffix( ">" )
        );
}

// ~~

function GetBoolean(
    text
    )
{
    return (
        text === true
        || text === 1
        || text === "true"
        );
}

// ~~

function GetBooleanProperty(
    text
    )
{
    return (
        text === true
        || text === 1
        || text === "true"
        || text === ""
        );
}

// ~~

function GetBooleanText(
    boolean
    )
{
    if ( boolean )
    {
        return "true";
    }
    else
    {
        return "false";
    }
}

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
    if ( value === undefined )
    {
        return "undefined";
    }
    else if ( value === null )
    {
        return "null";
    }
    else if ( typeof value === "string"
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
            return "[]";
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
                    clientHeight : value.clientHeight,
                    clientWidth : value.clientWidth,
                    clientTop : value.clientTop,
                    clientLeft : value.clientLeft,
                    offsetHeight : value.offsetHeight,
                    offsetWidth : value.offsetWidth,
                    offsetTop : value.offsetTop,
                    offsetLeft : value.offsetLeft,
                    scrollHeight : value.scrollHeight,
                    scrollWidth : value.scrollWidth,
                    scrollTop : value.scrollTop,
                    scrollLeft : value.scrollLeft,
                    value : value.value
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
        text_array,
        value;

    text_array = [];

    for ( value of value_array )
    {
        text_array.AddLastValue( GetValueText( value, value_is_unquoted ) );
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
        property,
        text_array;

    text_array = [];

    for ( property in object )
    {
        if ( object.hasOwnProperty( property ) )
        {
            text_array.AddLastValue( property + " : " + GetValueText( object[ property ] ) );
        }
    }

    return GetTextArrayText( text_array, separator_text, opening_brace, closing_brace, empty_braces );
}

// ~~

function PrintValue(
    ...argument_array
    )
{
    Print( GetArrayText( argument_array, "", true, "", "", "" ) );
}

// ~~

function Write(
    ...argument_array
    )
{
    document.body.appendChild( document.createTextNode( GetArrayText( argument_array, "", true, "", "", "" ) ) );
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

function WriteRow(
    ...argument_array
    )
{
    document.body.appendChild( document.createTextNode( GetArrayText( argument_array, " ", true, "", "", "" ) ) );
    document.body.appendChild( document.createElement( "br" ) );
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
            error_panel_element.ondblclick = function (
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
                      + ( IsHtmlText( argument.responseText )
                          ? argument.responseText
                          : GetEscapedHtml( argument.responseText ) );
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
    var
        unit;

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

function GetDimension(
    length,
    default_unit = "px"
    )
{
    var
        match,
        dimension;

    dimension =
        {
            unit: "",
            value: 0
        };

    if ( typeof length === "number" )
    {
        dimension.unit = default_unit;
        dimension.value = length;
    }
    else if ( typeof length === "string" )
    {
        match = length.match(/^([-+]?\d*\.?\d+)([%/a-z]*)$/i);

        if ( match )
        {
            dimension.unit = match[ 2 ] || default_unit;
            dimension.value = GetReal( match[ 1 ] );
        }
    }

    return dimension;
}

// ~~

function GetUnitPixelCount(
    unit,
    element
    )
{
    switch ( unit )
    {
        case "px":
        {
            return 1;
        }

        case "rem":
        {
            return GetReal( getComputedStyle( document.documentElement ).fontSize ) || 16;
        }

        case "em":
        {
            return GetReal( getComputedStyle( element ).fontSize ) || 16;
        }

        case "vw":
        {
            return window.innerWidth / 100;
        }

        case "vh":
        {
            return window.innerHeight / 100;
        }

        case "%":
        {
            return element.offsetWidth / 100;
        }

        default:
        {
            return 1;
        }
    }
}

// ~~

function GetDimensionPixelCount(
    dimension,
    element
    )
{
    return dimension.value * GetUnitPixelCount( dimension.unit, element );
}

// ~~

function GetEscapedHtml(
    text
    )
{
    if ( text === undefined )
    {
        return "undefined";
    }
    else if ( text === null )
    {
        return "null";
    }
    else if ( typeof text === "string" )
    {
        return (
            text
                .replaceAll( "&", "&amp;" )
                .replaceAll( "<", "&lt;" )
                .replaceAll( ">", "&gt;" )
                .replaceAll( "{", "&#40;" )
                .replaceAll( "}", "&#41;" )
                .replaceAll( "(", "&#40;" )
                .replaceAll( ")", "&#41;" )
                .replaceAll( "\\", "&#92;" )
                .replaceAll( "\"", "&#34;" )
                .replaceAll( "'", "&#39;" )
            );
    }
    else
    {
        return GetEscapedHtml( GetValueText( text ) );
    }
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
        if ( document.readyState === "complete" )
        {
            return setTimeout( called_function, 1 );
        }
        else
        {
            window.addEventListener( "load", () => called_function() );

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
        while ( real_text.endsWith( "0" ) )
        {
            real_text = real_text.slice( 0, real_text.length - 1 );
        }

        if ( real_text.endsWith( "." ) )
        {
            real_text = real_text.slice( 0, real_text.length - 1 );
        }
    }

    if ( decimal_separator === "." )
    {
        return real_text;
    }
    else
    {
        return real_text.replaceAll( ".", decimal_separator );
    }
}

// ~~

function GetIntegerText(
    integer
    )
{
    return integer.toString();
}

// ~~

String.prototype.Split = String.prototype.split;

// ~~

String.prototype.Trim = String.prototype.trim;

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
        return this.slice( prefix.length );
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
        return this.slice( 0, this.length - suffix.length );
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
        return this.slice( 0, character_count );
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

String.prototype.ReplaceText = String.prototype.replaceAll;

// ~~

String.prototype.ReplaceTexts = function (
    old_text,
    new_text
    )
{
    var
        old_replaced_text,
        replaced_text;

    replaced_text = this;

    do
    {
        old_replaced_text = replaced_text;

        replaced_text = replaced_text.replaceAll( old_text, new_text );
    }
    while ( replaced_text !== old_replaced_text );

    return old_replaced_text;
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

Array.prototype.SetType = function(
    class_
    )
{
    var
        element;

    for ( element of this )
    {
        Object.setPrototypeOf( element, class_.prototype );
    }
}

// ~~

Array.prototype.Join = Array.prototype.join;

// ~~

Array.prototype.Splice = Array.prototype.splice;

// ~~

Array.prototype.AddFirstValue = Array.prototype.unshift;

// ~~

Array.prototype.RemoveFirstValue = Array.prototype.shift;

// ~~

Array.prototype.AddLastValue = Array.prototype.push;

// ~~

Array.prototype.RemoveLastValue = Array.prototype.pop;

// ~~

Array.prototype.HasValue = Array.prototype.includes;

// ~~

Array.prototype.GetValueIndex = Array.prototype.indexOf;

// ~~

Array.prototype.GetMatchingValue = Array.prototype.find;

// ~~

Array.prototype.GetMatchingValueIndex = Array.prototype.findIndex;

// ~~

Array.prototype.FilterValues = Array.prototype.filter;

// ~~

Array.prototype.MapValue = Array.prototype.map;

// ~~

Array.prototype.Sort = Array.prototype.sort;

// ~~

Array.prototype.IsEmpty = function (
    )
{
    return this.length === 0;
}

// ~~

Array.prototype.PrintValue = function (
    )
{
    PrintValue( this );

    return this;
}

// ~~

Array.prototype.Print = function (
    )
{
    Print( this );

    return this;
}

// ~~

Array.prototype.Dump = function (
    )
{
    Dump( this );

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

Array.prototype.RemoveValue = function (
    value
    )
{
    var
        value_index;

    value_index = this.GetValueIndex( value );

    if ( value_index >= 0 )
    {
        this.Splice( value_index, 1 );
    }
}

// ~~

Array.prototype.RegressValue = function (
    value
    )
{
    var
        prior_value,
        prior_value_index,
        value_index;

    value_index = this.GetValueIndex( value );

    if ( value_index > 0 )
    {
        prior_value_index = value_index - 1;
        prior_value = this[ prior_value_index ];
        this[ prior_value_index ] = value;
        this[ value_index ] = prior_value;
    }
}

// ~~

Array.prototype.AdvanceValue = function (
    value
    )
{
    var
        next_value,
        next_value_index,
        value_index;

    value_index = this.GetValueIndex( value );

    if ( value_index < this.length - 1 )
    {
        next_value_index = value_index + 1;
        next_value = this[ next_value_index ];
        this[ next_value_index ] = value;
        this[ value_index ] = next_value;
    }
}

// ~~

Map.prototype.HasKey = Map.prototype.has;

// ~~

Map.prototype.SetValue = Map.prototype.set;

// ~~

Map.prototype.GetValue = Map.prototype.get;

// ~~

Map.prototype.IsEmpty = function (
    )
{
    return this.size === 0;
}
