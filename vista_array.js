"use strict";

// -- FUNCTIONS

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
    node_selector,
    node_type = 1
    )
{
    var
        node,
        ancestor_node,
        ancestor_node_array;

    ancestor_node_array = [];

    for ( node of this )
    {
        for ( ancestor_node = node.parent;
              ancestor_node != null;
              ancestor_node = ancestor_node.parent )
        {
            if ( ancestor_node.nodeType === node_type
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
    node_selector,
    node_type = 1
    )
{
    var
        node,
        parent_node_array;

    parent_node_array = [];

    for ( node of this )
    {
        if ( node.parent != null
             && node.parent.nodeType == node_type
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
    node_selector,
    node_type = 1
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
            if ( preceding_node.nodeType === node_type
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
    node_selector,
    node_type = 1
    )
{
    var
        node,
        prior_node_array;

    prior_node_array = [];

    for ( node of this )
    {
        if ( node.previousSibling != null
             && node.previousSibling.nodeType == node_type
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
    node_selector,
    node_type = 1
    )
{
    var
        node,
        next_node_array;

    next_node_array = [];

    for ( node of this )
    {
        if ( node.nextSibling != null
             && node.nextSibling.nodeType == node_type
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
    node_selector,
    node_type = 1
    )
{
    var
        node,
        following_node,
        following_node_array;

    following_node_array = [];

    for ( node of this )
    {
        for ( following_node = node.nextSibling;
              following_node != null;
              following_node = following_node.nextSibling )
        {
            if ( following_node.nodeType === node_type
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
    node_selector,
    node_type = 1
    )
{
    var
        node,
        child_node,
        child_node_array;

    child_node_array = [];

    for ( node of this )
    {
        for ( child_node of node.children )
        {
            if ( child_node.nodeType == node_type
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
    node_selector,
    node_type = 1
    )
{
    var
        node,
        descendant_node,
        descendant_node_array,
        descendant_node_list,
        child_node;

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
                if ( descendant_node.nodeType == node_type )
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
    node_selector,
    node_type = 1
    )
{
    var
        matching_node_array,
        node;

    matching_node_array = [];

    for ( node of this )
    {
        if ( node.nodeType == node_type
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
    node_selector,
    node_type = 1
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
            if ( found_node.nodeType == node_type )
            {
                found_node_array.push( found_node );
            }
        }
    }

    return found_node_array;
}
