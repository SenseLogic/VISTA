// -- TYPES

class PROPERTY_ANIMATION
{
    // -- CONSTRUCTORS

    constructor(
        node,
        property_name,
        property_value_array,
        property_time_array,
        animation_configuration
        )
    {
        this.Identifier = GetPropertyAnimationIdentifier();
        this.Node = node;
        this.Name = property_name;

        if ( property_value_array instanceof Array )
        {
            this.ValueArray = property_value_array;
        }
        else
        {
            this.ValueArray = [ property_value_array ];
        }

        if ( property_time_array instanceof Array )
        {
            this.TimeArray = property_time_array;
        }
        else
        {
            this.TimeArray = [ property_time_array ];
        }

        this.Time = animation_configuration.Time;

        if ( this.Time === undefined )
        {
            this.Time = 0.0;
        }

        this.Speed = animation_configuration.Speed;

        if ( this.Speed === undefined )
        {
            this.Speed = 1.0;
        }

        this.StartFunction = animation_configuration.StartFunction;
        this.PauseFunction = animation_configuration.PauseFunction;
        this.ResumeFunction = animation_configuration.ResumeFunction;
        this.StopFunction = animation_configuration.StopFunction;
        this.FinishFunction = animation_configuration.FinishFunction;
        this.TimeInterpolationFunction = animation_configuration.TimeInterpolationFunction;
        this.ValueInterpolationFunction = animation_configuration.ValueInterpolationFunction;
        this.UpdateFunction = animation_configuration.UpdateFunction;

        this.Value = node.style[ property_name ];
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

    Pause(
        )
    {
        this.State = 1;

        if ( this.PauseFunction !== undefined )
        {
            this.PauseFunction( this );
        }

        PropertyAnimationMap.delete( this.id );

        if ( PropertyAnimationMap.size === 0 )
        {
            StopAnimation();
        }
    }

    // ~~

    Resume(
        )
    {
        this.State = 0;

        if ( this.ResumeFunction !== undefined )
        {
            this.ResumeFunction( this );
        }

        PropertyAnimationMap.set( this.id, this );

        if ( PropertyAnimationMap.size === 1 )
        {
            StartAnimation();
        }
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

    Finish(
        )
    {
        if ( this.FinishFunction !== undefined )
        {
            this.FinishFunction( this );
        }

        PropertyAnimationMap.delete( this.id );

        if ( PropertyAnimationMap.size === 0 )
        {
            StopAnimation();
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

function LogNode(
    node
    )
{
    Log(
        {
            tagName : node.tagName,
            nodeType : node.nodeType,
            id : node.id,
            classList : node.classList,
            style : node.style,
            dataset : node.dataset,
            clientWidth : node.clientWidth,
            clientHeight : node.clientHeight,
            clientLeft : node.clientLeft,
            clientTop : node.clientTop,
            offsetWidth : node.offsetWidth,
            offsetHeight : node.offsetHeight,
            offsetLeft : node.offsetLeft,
            offsetTop : node.offsetTop,
            scrollWidth : node.scrollWidth,
            scrollHeight : node.scrollHeight,
            scrollLeft : node.scrollLeft,
            scrollTop : node.scrollTop
        }
        );
}

// ~~

function DumpNode(
    node
    )
{
    console.dir( node );
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
        return setTimeout( called_function, delay_time * 1000 );
    }
}

// ~~

function RepeatCall(
    called_function,
    delay_time
    )
{
    return setInterval( called_function, delay_time * 1000 );
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
    return Array.from( document.querySelectorAll( node_selector ) );
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

function StartProperty(
    node,
    property_name,
    property_value_array,
    property_time_array,
    animation_configuration = {}
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
              property_value_array,
              property_time_array,
              animation_configuration
              );

    node.PropertyAnimationMap.set( property_name, property_animation );

    property_animation.Start();
}

// ~~

function StartProperties(
    node,
    property_value_array_map,
    property_time_array,
    animation_configuration = {}
    )
{
    var
        property_name;

    for ( property_name in property_value_array_map )
    {
        StartProperty(
            property_name,
            property_value_array_map[ property_name ],
            property_time_array,
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
            for ( property_animation of node.PropertyAnimationMap.values() )
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

function ResumeProperty(
    node,
    property_name
    )
{
    if ( node.PropertyAnimationMap !== undefined
         && node.PropertyAnimationMap.has( property_name ) )
    {
        node.PropertyAnimationMap.get( property_name ).Resume();
    }
}

// ~~

function ResumeProperties(
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
            for ( property_animation of node.PropertyAnimationMap.values() )
            {
                property_animation.Resume();
            }
        }
    }
    else
    {
        for ( property_name of property_name_array )
        {
            ResumeProperty( node, property_name );
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
            for ( property_animation of node.PropertyAnimationMap.values() )
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
    this.forEach( node_function );

    return this;
}

// ~~

Array.prototype.Log = function(
    )
{
    Log( this );

    return this;
}

// ~~

Array.prototype.LogNodes = function(
    )
{
    var
        node;

    for ( node of this )
    {
        LogNode( node );
    }

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
        DumpNode( node );
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
    property_value_map
    )
{
    var
        node,
        property_name;

    for ( node of this )
    {
        for ( property_name in property_value_map )
        {
            node.style[ property_name ] = property_value_map[ property_name ];
        }
    }

    return this;
}

// ~~

Array.prototype.StartProperty = function(
    property_name,
    property_value_array,
    property_time_array,
    animation_configuration = {}
    )
{
    var
        node;

    for ( node of this )
    {
        StartProperty(
            node,
            property_name,
            property_value_array,
            property_time_array,
            animation_configuration
            );
    }

    return this;
}

// ~~

Array.prototype.StartProperties = function(
    property_value_array_map,
    property_time_array,
    animation_configuration = {}
    )
{
    var
        node;

    for ( node of this )
    {
        StartProperties(
            node,
            property_value_array_map,
            property_time_array,
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

Array.prototype.ResumeProperty = function(
    property_name
    )
{
    var
        node;

    for ( node of this )
    {
        ResumeProperty( node, property_name );
    }

    return this;
}

// ~~

Array.prototype.ResumeProperties = function(
    property_name_array
    )
{
    var
        node;

    for ( node of this )
    {
        ResumeProperties( node, property_name_array );
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
