"use strict";

// -- FUNCTIONS

function GetJsonValue(
    json_text
    )
{
    return JSON.parse( json_text );
}

// ~~

function GetJsonText(
    value
    )
{
    return JSON.stringify( value );
}

// ~~

function Dump(
    value
    )
{
    console.log( JSON.stringify( value ) );
}

// ~~

function DumpNode(
    node
    )
{
    console.dir( node );
}

// ~~

function Print(
    value
    )
{
    console.log( value );
}

// ~~

function Postpone(
    start_function
    )
{
    if ( document.readyState === "complete"
         || document.readyState === "interactive" )
    {
        setTimeout( start_function, 1 );
    }
    else
    {
        document.addEventListener( "DOMContentLoaded", start_function );
    }
}

// ~~

function IsVisibleNode(
    node,
    bottom_offset = 0,
    top_offset = 0,
    left_offset = 0,
    right_offset = 0
    )
{
    var
        bounding_client_rectangle;

    bounding_client_rectangle = node.getBoundingClientRect();

    return (
        ( bounding_client_rectangle.height > 0
          || bounding_client_rectangle.width > 0 )
        && bounding_client_rectangle.bottom >= bottom_offset
        && bounding_client_rectangle.right >= right_offset
        && bounding_client_rectangle.top + top_offset <= ( window.innerHeight || document.documentElement.clientHeight )
        && bounding_client_rectangle.left + left_offset <= ( window.innerWidth || document.documentElement.clientWidth )
        );
}

// ~~

function GetNodes(
    node_selector
    )
{
    return Array.from( document.QuerySelectorAll( node_selector ) );
}
