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

// ~~

Array.prototype.Apply = function(
    node_function
    )
{
    this.forEach( element_function );

    return this;
}

// ~~

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

Array.prototype.GetAncestorNodes = function(
    node_selector
    )
{
    var
        ancestor_node,
        ancestor_node_array,
        node;

    ancestor_node_array = [];

    for ( node of this )
    {
        for ( ancestor_node = node.parent;
              ancestor_node != null;
              ancestor_node = ancestor_node.parent )
        {
            if ( ancestor_node.nodeType === 1
                 && ( node_selector === undefined
                      || ancestor_node.matches( node_selector ) ) )
            {
                ancestor_node_array.push( ancestor_node );
            }
        }
    }

    return ancestor_node_array;
}

// ~~

Array.prototype.GetParentNodes = function(
    node_selector
    )
{
    var
        node,
        parent_node_array;

    parent_node_array = [];

    for ( node of this )
    {
        if ( node.parent != null
             && node.parent.nodeType == 1
             && ( node_selector === undefined
                  || node.parent.matches( node_selector ) ) )
        {
            parent_node_array.push( node.parent );
        }
    }

    return parent_node_array;
}

// ~~

Array.prototype.GetPrecedingNodes = function(
    node_selector
    )
{
    var
        node,
        preceding_node,
        preceding_node_array;

    preceding_node_array = [];

    for ( node of this )
    {
        for ( preceding_node = node.previousSibling;
              preceding_node != null;
              preceding_node = preceding_node.previousSibling )
        {
            if ( preceding_node.nodeType === 1
                 && ( node_selector === undefined
                      || preceding_node.matches( node_selector ) ) )
            {
                preceding_node_array.push( preceding_node );
            }
        }
    }

    return preceding_node_array;
}

// ~~

Array.prototype.GetPriorNodes = function(
    node_selector
    )
{
    var
        node,
        prior_node_array;

    prior_node_array = [];

    for ( node of this )
    {
        if ( node.previousSibling != null
             && node.previousSibling.nodeType == 1
             && ( node_selector === undefined
                  || node.previousSibling.matches( node_selector ) ) )
        {
            prior_node_array.push( node.previousSibling );
        }
    }

    return prior_node_array;
}

// ~~

Array.prototype.GetNextNodes = function(
    node_selector
    )
{
    var
        next_node_array,
        node;

    next_node_array = [];

    for ( node of this )
    {
        if ( node.nextSibling != null
             && node.nextSibling.nodeType == 1
             && ( node_selector === undefined
                  || node.nextSibling.matches( node_selector ) ) )
        {
            next_node_array.push( node.nextSibling );
        }
    }

    return next_node_array;
}

// ~~

Array.prototype.GetFollowingNodes = function(
    node_selector
    )
{
    var
        following_node,
        following_node_array,
        node;

    following_node_array = [];

    for ( node of this )
    {
        for ( following_node = node.nextSibling;
              following_node != null;
              following_node = following_node.nextSibling )
        {
            if ( following_node.nodeType === 1
                 && ( node_selector === undefined
                      || following_node.matches( node_selector ) ) )
            {
                following_node_array.push( following_node );
            }
        }
    }

    return following_node_array;
}

// ~~

Array.prototype.GetChildNodes = function(
    node_selector
    )
{
    var
        child_node,
        child_node_array,
        node;

    child_node_array = [];

    for ( node of this )
    {
        for ( child_node of node.children )
        {
            if ( child_node.nodeType == 1
                 && ( node_selector === undefined
                      || child_node.matches( node_selector ) ) )
            {
                child_node_array.push( child_node );
            }
        }
    }

    return child_node_array;
}

// ~~

Array.prototype.GetDescendantNodes = function(
    node_selector
    )
{
    var
        child_node,
        descendant_node,
        descendant_node_array,
        descendant_node_list,
        node;

    descendant_node_array = [];

    if ( node_selector === undefined )
    {
        node_selector = "*";
    }

    for ( node of this )
    {
        for ( child_node of node.children )
        {
            descendant_node_list = child_node.querySelectorAll( node_selector );

            for ( descendant_node of descendant_node_list )
            {
                if ( descendant_node.nodeType == 1 )
                {
                    descendant_node_array.push( descendant_node );
                }
            }
        }
    }

    return descendant_node_array;
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
        if ( node.nodeType == 1
             && ( node_selector === undefined
                  || node.matches( node_selector ) ) )
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
            if ( found_node.nodeType == 1 )
            {
                found_node_array.push( found_node );
            }
        }
    }

    return found_node_array;
}

// ~~

Array.prototype.AddClasses = function(
    class_name_array
    )
{
    var
        class_name,
        node;

    for ( node of this )
    {
        for ( class_name of class_name_array )
        {
            node.classList.add( class_name );
        }
    }

    return this;
}

// ~~

Array.prototype.RemoveClasses = function(
    class_name_array
    )
{
    var
        class_name,
        node;

    for ( node of this )
    {
        for ( class_name of class_name_array )
        {
            node.classList.remove( class_name );
        }
    }

    return this;
}

// ~~

Array.prototype.SetProperties = function(
    property_map
    )
{
    var
        node,
        property_name;

    for ( node of this )
    {
        for ( property_name in property_array )
        {
            node.style[ property_name ] = property_map[ property_name ];
        }
    }

    return this;
}
