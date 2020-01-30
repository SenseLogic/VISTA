"use strict";

// -- FUNCTIONS

function GetEscapedText(
    value
    )
{
    return (
        value
            .split( "\"" ).join( "\\\"" )
            .split( "\b" ).join( "\\b" )
            .split( "\n" ).join( "\\n" )
            .split( "\r" ).join( "\\r" )
            .split( "\t" ).join( "\\t" )
        );
}

// ~~

function GetText(
    value
    )
{
    var
        text;

    if ( value === undefined )
    {
        return "undefined";
    }
    else if ( value === null )
    {
        return "null";
    }
    else if ( typeof value === "boolean"
              || typeof value === "number" )
    {
        return "" + value;
    }
    else
    {
        return JSON.stringify( value );
    }
}

// ~~

Array.prototype.Dump = function(
    )
{
    console.log( GetText( this ) );
}

// ~~

Array.prototype.GetParentNodes = function(
    node_selector,
    node_function
    )
{
    var
        node,
        parent_node,
        parent_node_array;

    parent_node_array = [];

    if ( node_selector === undefined )
    {
        for ( node of this )
        {
            for ( parent_node = node.parent;
                  parent_node != null;
                  parent_node = parent_node.parent )
            {
                parent_node_array.push( parent_node );
            }
        }
    }
    else
    {
        for ( node of this )
        {
            for ( parent_node = node.parent;
                  parent_node != null;
                  parent_node = parent_node.parent )
            {
                if ( parent_node.matches( node_selector );
                {
                    parent_node_array.push( parent_node );
                }
            }
        }
    }

    if ( node_function !== undefined )
    {
        parent_node_array.forEach( node_function );
    }

    return parent_node_array;
}

// ~~

Array.prototype.GetChildNodes = function(
    node_selector,
    node_function
    )
{
    var
        node,
        child_node,
        child_node_array;

    child_node_array = [];

    if ( node_selector === undefined )
    {
        for ( node of this )
        {
            for ( child_node of node.children )
            {
                child_node_array.push( child_node );
            }
        }
    }
    else
    {
        for ( node of this )
        {
            for ( child_node of node.children )
            {
                if ( child_node.matches( node_selector );
                {
                    child_node_array.push( child_node );
                }
            }
        }
    }

    if ( node_function !== undefined )
    {
        child_node_array.forEach( node_function );
    }

    return child_node_array;
}

// ~~

Array.prototype.GetNodes = function(
    node_selector,
    node_function
    )
{
    var
        matching_node,
        matching_node_array,
        matching_node_list,
        node;

    matching_node_array = [];

    if ( node_selector === undefined )
    {
        matching_node_array = this.GetNodes( "*" );
    }
    else
    {
        for ( node of this )
        {
            matching_node_list = node.querySelectorAll( node_selector );

            for ( matching_node of matching_node_list )
            {
                matching_node_array.push( matching_node );
            }
        }
    }

    if ( node_function !== undefined )
    {
        matching_node_array.forEach( node_function );
    }

    return matching_node_array;
}

// ~~

Array.prototype.Call = function(
    node_function
    )
{
    this.forEach( node_function );

    return this;
}

// ~~

function GetNodes(
    node
    )
{
    if ( node === null )
    {
        return [];
    }
    else if ( typeof node == "string" )
    {
        return Array.from( document.QuerySelectorAll( node_or_node_selector ) );
    }
    else if ( node.nodeName )
    {
        return [ node ];
    }
    else
    {
        return null;
    }
}

// ~~

function AddInitializationFunction(
    initialization_function
    )
{
    if ( document.readyState === "complete"
         || document.readyState === "interactive" )
    {
        setTimeout( initialization_function, 1 );
    }
    else
    {
        document.addEventListener( "DOMContentLoaded", initialization_function );
    }
}
