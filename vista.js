// -- TYPES

class PROPERTY_ANIMATION
{
    // -- CONSTRUCTORS

    constructor(
        node,
        property_name,
        property_value,
        animation_duration,
        animation_configuration
        )
    {
        this.Identifier = GetPropertyAnimationIdentifier();
        this.Node = node;
        this.FirstValue = node.style[ property_name ];
        this.Value = this.FirstValue;
        this.LastValue = property_value;
        this.Time = 0.0;
        this.Duration = animation_duration;
        this.Delay = animation_configuration.Delay;
        this.StartFunction = animation_configuration.StartFunction;
        this.PauseFunction = animation_configuration.PauseFunction;
        this.StopFunction = animation_configuration.StopFunction;
        this.EndFunction = animation_configuration.EndFunction;
        this.TimeFunction = animation_configuration.TimeFunction;
        this.ValueFunction = animation_configuration.ValueFunction;
        this.UpdateFunction = animation_configuration.UpdateFunction;
        this.State = 0;
    }

    // -- OPERATIONS

    Start(
        )
    {
        this.State = 0;

        if ( this.StartFunction !== undefined )
        {
            this.StartFunction( this );
        }

        PropertyAnimationMap.set( this.id, this );

        if ( PropertyAnimationMap.size === 1 )
        {
            StartAnimation();
        }
    }

    // ~~

    Update(
        )
    {
        if ( this.UpdateFunction !== undefined )
        {
            this.UpdateFunction( this );
        }
    }

    // ~~

    Pause(
        )
    {
        this.State = 1;

        if ( this.PauseFunction !== undefined )
        {
            this.PauseFunction( this );
        }

        PropertyAnimationMap.delete( this.id );
    }

    // ~~

    Stop(
        )
    {
        this.State = 2;

        if ( this.StopFunction !== undefined )
        {
            this.StopFunction( this );
        }

        PropertyAnimationMap.delete( this.id );

        if ( PropertyAnimationMap.size === 0 )
        {
            StopAnimation();
        }
    }

    // ~~

    End(
        )
    {
        if ( this.EndFunction !== undefined )
        {
            this.EndFunction( this );
        }

        PropertyAnimationMap.delete( this.id );

        if ( PropertyAnimationMap.size === 0 )
        {
            StopAnimation();
        }
    }
}

// -- VARIABLES

var
    PropertyAnimationIdentifier = 0,
    PropertyAnimationInterval = null,
    PropertyAnimationMap = new Map();

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

function GetPropertyAnimationIdentifier(
    )
{
    return ++PropertyAnimationIdentifier;
}

// ~~

function StartAnimation(
    )
{
    if ( PropertyAnimationInterval === null )
    {
        PropertyAnimationInterval = setInterval( UpdateAnimation, 50 );
    }
}

// ~~

function UpdateAnimation(
    )
{
    for ( property_animation of PropertyAnimationMap.values() )
    {
        property_animation.Update();
    }
}

// ~~

function StopAnimation(
    )
{
    if ( PropertyAnimationInterval !== null )
    {
        clearInterval( PropertyAnimationInterval );

        PropertyAnimationInterval = null;
    }
}

// ~~

function AnimateProperty(
    node,
    property_name,
    property_value,
    animation_duration,
    animation_configuration
    )
{
    if ( node.PropertyAnimationMap === undefined )
    {
        node.PropertyAnimationMap = new Map();
    }

    if ( node.PropertyAnimationMap.has( property_name ) )
    {
        node.PropertyAnimationMap.get( property_name ).Stop();
    }

    property_animation
        = new PROPERTY_ANIMATION(
              node,
              property_name,
              property_value,
              animation_duration,
              animation_configuration
              );

    node.PropertyAnimationMap.set( property_name, property_animation );

    property_animation.Start();
}

// ~~

function AnimateProperties(
    node,
    property_map,
    animation_duration,
    animation_configuration
    )
{
    var
        property_name;

    for ( property_name in property_map )
    {
        AnimateProperty(
            property_name,
            property_map[ property_name ],
            animation_duration,
            animation_configuration
            );
    }
}

// ~~

function PauseProperty(
    node,
    property_name
    )
{
    if ( node.PropertyAnimationMap !== undefined
         && node.PropertyAnimationMap.has( property_name ) )
    {
        node.PropertyAnimationMap.get( property_name ).Pause();
    }
}

// ~~

function PauseProperties(
    node,
    property_name_array
    )
{
    var
        property_name;

    if ( property_name_array === undefined )
    {
        if ( node.PropertyAnimationMap !== undefined )
        {
            for ( property_animation of  PropertyAnimationMap.values() )
            {
                property_animation.Pause();
            }
        }
    }
    else
    {
        for ( property_name of property_name_array )
        {
            PauseProperty( node, property_name );
        }
    }
}

// ~~

function StopProperty(
    node,
    property_name
    )
{
    if ( node.PropertyAnimationMap !== undefined
         && node.PropertyAnimationMap.has( property_name ) )
    {
        node.PropertyAnimationMap.get( property_name ).Stop();
    }
}

// ~~

function StopProperties(
    node,
    property_name_array
    )
{
    var
        property_animation,
        property_name;

    if ( property_name_array === undefined )
    {
        if ( node.PropertyAnimationMap !== undefined )
        {
            for ( property_animation of  PropertyAnimationMap.values() )
            {
                property_animation.Stop();
            }
        }
    }
    else
    {
        for ( property_name of property_name_array )
        {
            StopProperty( node, property_name );
        }
    }
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

Array.prototype.AddClass = function(
    class_name
    )
{
    var
        node;

    for ( node of this )
    {
        node.classList.add( class_name );
    }

    return this;
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

Array.prototype.RemoveClass = function(
    class_name
    )
{
    var
        node;

    for ( node of this )
    {
        node.classList.remove( class_name );
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

Array.prototype.SetProperty = function(
    property_name,
    property_value
    )
{
    var
        node;

    for ( node of this )
    {
        node.style[ property_name ] = property_value;
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
        for ( property_name in property_map )
        {
            node.style[ property_name ] = property_map[ property_name ];
        }
    }

    return this;
}

// ~~

Array.prototype.AnimateProperty = function(
    property_name,
    property_value,
    animation_duration,
    animation_configuration
    )
{
    var
        node;

    for ( node of this )
    {
        AnimateProperty(
            node,
            property_name,
            property_value,
            animation_duration,
            animation_configuration
            );
    }

    return this;
}

// ~~

Array.prototype.AnimateProperties = function(
    property_map,
    animation_duration,
    animation_configuration
    )
{
    var
        node;

    for ( node of this )
    {
        AnimateProperties(
            node,
            property_map,
            animation_duration,
            animation_configuration
            );
    }

    return this;
}


// ~~

Array.prototype.PauseProperty = function(
    property_name
    )
{
    var
        node;

    for ( node of this )
    {
        PauseProperty( node, property_name );
    }

    return this;
}

// ~~

Array.prototype.PauseProperties = function(
    property_name_array
    )
{
    var
        node;

    for ( node of this )
    {
        PauseProperties( node, property_name_array );
    }

    return this;
}

// ~~

Array.prototype.StopProperty = function(
    property_name
    )
{
    var
        node;

    for ( node of this )
    {
        StopProperty( node, property_name );
    }

    return this;
}

// ~~

Array.prototype.StopProperties = function(
    property_name_array
    )
{
    var
        node;

    for ( node of this )
    {
        StopProperties( node, property_name_array );
    }

    return this;
}
