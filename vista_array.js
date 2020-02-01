"use strict";

// -- FUNCTIONS

Array.prototype.DumpNodes = function(
    )
{
    var
        node;

    for ( node of this )
    {
        console.dir( node );
    }

    return this;
}

// ~~

Array.prototype.Apply = function(
    node_function
    )
{
    this.forEach( element_function );

    return this;
}

// ~~

Array.prototype.GetUpperNodes = function(
    node_selector
    )
{
    var
        node,
        upper_node,
        upper_node_array;

    upper_node_array = [];

    if ( node_selector === undefined )
    {
        for ( node of this )
        {
            for ( upper_node = node.parent;
                  upper_node != null;
                  upper_node = upper_node.parent )
            {
                upper_node_array.push( upper_node );
            }
        }
    }
    else
    {
        for ( node of this )
        {
            for ( upper_node = node.parent;
                  upper_node != null;
                  upper_node = upper_node.parent )
            {
                if ( upper_node.matches( node_selector );
                {
                    upper_node_array.push( upper_node );
                }
            }
        }
    }

    return upper_node_array;
}

// ~~

Array.prototype.GetSuperNodes = function(
    node_selector
    )
{
    var
        node,
        super_node_array;

    super_node_array = [];

    if ( node_selector === undefined )
    {
        for ( node of this )
        {
            if ( node.parent != null )
            {
                super_node_array.push( node.parent );
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
                super_node_array.push( node.parent );
            }
        }
    }

    return super_node_array;
}

// ~~

Array.prototype.GetAllPriorNodes = function(
    node_selector
    )
{
}

// ~~

Array.prototype.GetPriorNodes = function(
    node_selector
    )
{
}

// ~~

Array.prototype.GetNextNodes = function(
    node_selector
    )
{
}

// ~~

Array.prototype.GetAllNextNodes = function(
    node_selector
    )
{
}

// ~~

Array.prototype.GetSubNodes = function(
    node_selector
    )
{
    var
        node,
        sub_node,
        sub_node_array;

    sub_node_array = [];

    if ( node_selector === undefined )
    {
        for ( node of this )
        {
            for ( sub_node of node.children )
            {
                sub_node_array.push( sub_node );
            }
        }
    }
    else
    {
        for ( node of this )
        {
            for ( sub_node of node.children )
            {
                if ( sub_node.matches( node_selector );
                {
                    sub_node_array.push( sub_node );
                }
            }
        }
    }

    return sub_node_array;
}

// ~~

Array.prototype.GetLowerNodes = function(
    node_selector
    )
{
    var
        node,
        lower_node,
        lower_node_array,
        lower_node_list,
        sub_node;

    lower_node_array = [];

    if ( node_selector === undefined )
    {
        node_selector = "*";
    }

    for ( node of this )
    {
        for ( sub_node of node.children )
        {
            lower_node_list = sub_node.querySelectorAll( node_selector );

            for ( lower_node of lower_node_list )
            {
                lower_node_array.push( lower_node );
            }
        }
    }

    return lower_node_array;
}

// ~~

Array.prototype.GetMatchingNodes = function(
    node_selector
    )
{
    var
        matching_node_array,
        node;

    matching_node_array = [];

    for ( node of this )
    {
        if ( node.matches( node_selector ) )
        {
            matching_node_array.push( node );
        }
    }

    return matching_node_array;
}

// ~~

Array.prototype.GetNodes = function(
    node_selector
    )
{
    var
        found_node,
        found_node_array,
        found_node_list,
        node;

    found_node_array = [];

    if ( node_selector === undefined )
    {
        node_selector = "*";
    }

    for ( node of this )
    {
        found_node_list = node.querySelectorAll( node_selector );

        for ( found_node of found_node_list )
        {
            found_node_array.push( found_node );
        }
    }

    return found_node_array;
}

// ~~

function GetNodes(
    node_selector
    )
{
    return Array.from( document.QuerySelectorAll( node_selector ) );
}
