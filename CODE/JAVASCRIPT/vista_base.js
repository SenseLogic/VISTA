// -- VARIABLES

var
    UnitArray = [ "%", "px", "em", "rem", "vw", "vh", "vmin", "vmax" ];

// -- FUNCTIONS

function Assert(
    condition
    )
{
    if ( !condition )
    {
        console.trace();
        console.error( ...arguments );
    }
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

function IsPowerOf2(
    integer
    )
{
    return ( integer & ( integer - 1 ) ) == 0;
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

function GetJsonText(
    value
    )
{
    return JSON.stringify( value );
}

// ~~

function GetJsonValue(
    text
    )
{
    return JSON.parse( text );
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
