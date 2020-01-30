"use strict";

// -- FUNCTIONS

function GetDump(
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

function Dump(
    value
    )
{
    console.log( GetDump( value ) );
}

// ~~

Array.prototype.Dump = function(
    )
{
    Dump( this );
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

Array.prototype.GetAscendantNodes = function(
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

Array.prototype.GetParentNodes = function(
    node_selector,
    node_function
    )
{
    var
        node,
        parent_node_array;

    parent_node_array = [];

    if ( node_selector === undefined )
    {
        for ( node of this )
        {
            if ( node.parent != null )
            {
                parent_node_array.push( node.parent );
            }
        }
    }
    else
    {
        for ( node of this )
        {
            if ( node.parent != null
                 && node.parent.matches( node_selector );
            {
                parent_node_array.push( node.parent );
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

Array.prototype.GetDescendantNodes = function(
    node_selector,
    node_function
    )
{
    var
        node,
        child_node,
        descendant_node,
        descendant_node_array,
        descendant_node_list;

    descendant_node_array = [];

    if ( node_selector === undefined )
    {
        node_selector = "*";
    }

    for ( node of this )
    {
        for ( child_node of node.children )
        {
            descendant_node_list = node.querySelectorAll( node_selector );

            for ( descendant_node of descendant_node_list )
            {
                descendant_node_array.push( descendant_node );
            }
        }
    }

    if ( node_function !== undefined )
    {
        descendant_node_array.forEach( node_function );
    }

    return descendant_node_array;
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
        node_selector = "*";
    }

    for ( node of this )
    {
        matching_node_list = node.querySelectorAll( node_selector );

        for ( matching_node of matching_node_list )
        {
            matching_node_array.push( matching_node );
        }
    }

    if ( node_function !== undefined )
    {
        matching_node_array.forEach( node_function );
    }

    return matching_node_array;
}

// ~~

function GetNodes(
    node
    )
{
    if ( node === undefined
         || node === null )
    {
        return [];
    }
    else if ( node.nodeName )
    {
        return [ node ];
    }
    else
    {
        return Array.from( document.QuerySelectorAll( node_or_node_selector ) );
    }
}

// ~~

function CallWhenReady(
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

// ~~

function IsNodeInViewport(
    node,
    bottom_offset,
    top_offset,
    left_offset,
    right_offset
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
