// -- FUNCTIONS

Array.prototype.Log = function(
    )
{
    console.log( this );
}

// ~~

Array.prototype.GetChildrenNodes = function(
    selector
    )
{
    var
        node,
        child_node_array;

    child_node_array = [];

    for ( node of this )
    {
        for ( child_node of node.children )
        {
            child_node_array.push( child_node );
        }
    }

    return child_node_array;
}

// ~~

Array.prototype.GetMatchingChildrenNodes = function(
    selector
    )
{
    var
        node,
        matching_child_node_array;

    matching_child_node_array = [];

    for ( node of this )
    {
        for ( child_node of node.children )
        {
            if ( child_node.matches( selector );
            {
                matching_child_node_array.push( child_node );
            }
        }
    }

    return child_node_array;
}

// ~~

Array.prototype.GetMatchingNodes = function(
    selector
    )
{
    var
        matching_node,
        matching_node_array,
        matching_node_list,
        node;

    matching_node_array = [];

    for ( node of this )
    {
        matching_node_list = node.querySelectorAll( selector );

        for ( matching_node of matching_node_list )
        {
            matching_node_array.push( matching_node );
        }
    }

    return matching_node_array;
}

// ~~

Array.prototype.Each = function(
    node_function
    )
{
    this.forEach( node_function );

    return this;
}

// ~~

function $(
    argument
    )
{
    if ( argument === null )
    {
        return [];
    }
    else if ( typeof argument == "string" )
    {
        return Array.from( document.QuerySelectorAll( argument ) );
    }
    else if ( typeof argument == "function" )
    {
        if ( document.readyState === "complete"
             || document.readyState === "interactive" )
        {
            setTimeout( argument, 1 );
        }
        else
        {
            document.addEventListener( "DOMContentLoaded", argument );
        }
    }
    else
    {
        return [ argument ];
    }
}
