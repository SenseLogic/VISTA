// -- TYPES

class PROPERTY_ANIMATION
{
    // -- CONSTRUCTORS

    constructor(
        element,
        property_name,
        property_value_array,
        property_time_array,
        animation_configuration
        )
    {
        this.Identifier = GetPropertyAnimationIdentifier();
        this.Element = element;
        this.Name = property_name;
        this.State = 0;

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

        this.IsLooping = animation_configuration.StartFunction;

        if ( this.IsLooping === undefined )
        {
            this.IsLooping = false;
        }

        this.StartFunction = animation_configuration.StartFunction;
        this.PauseFunction = animation_configuration.PauseFunction;
        this.ResumeFunction = animation_configuration.ResumeFunction;
        this.StopFunction = animation_configuration.StopFunction;
        this.FinishFunction = animation_configuration.FinishFunction;
        this.UpdateFunction = animation_configuration.UpdateFunction;
        this.InterpolationFunction = animation_configuration.InterpolationFunction;

        if ( this.InterpolationFunction === undefined )
        {
            this.InterpolationFunction = GetLinearInterpolation;
        }

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

        this.Unit = animation_configuration.Unit;

        if ( this.Unit === undefined )
        {
            this.Unit = "";
        }

        if ( this.TimeArray.length == 0
             || this.TimeArray[ 0 ] > 0.0 )
        {
            this.ValueArray.unshift( parseFloat( element.style[ property_name ] ) );
            this.TimeArray.unshift( 0.0 );
        }
        else
        {
            element.style[ property_name ] = this.ValueArray[ 0 ] + Unit;
        }

        this.Duration = this.TimeArray[ this.TimeArray.length - 1 ];
        this.ValueIndex = 0;
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
        step_time
        )
    {
        var
            prior_time,
            prior_value,
            prior_value_index,
            next_time,
            next_value,
            next_value_index,
            value,
            value_count,
            value_duration,
            value_time;

        this.Time += step_time;

        if ( this.Time >= this.Duration )
        {
            if ( this.IsLooping )
            {
                while ( this.Time >= this.Duration )
                {
                    this.Time -= this.Duration;
                }
            }
            else
            {
                this.Time = this.Duration;
            }
        }

        value_count = this.ValueArray.length;

        prior_value_index = this.PriorValueIndex;

        while ( prior_value_index - 1 >= 0
                && this.TimeArray[ prior_value_index - 1 ] > this.Time )
        {
            --prior_value_index;
        }

        while ( prior_value_index + 1 < value_count
                && this.TimeArray[ prior_value_index + 1 ] <= this.Time )
        {
            ++prior_value_index;
        }

        this.PriorValueIndex = prior_value_index;

        next_value_index = prior_value_index + 1;

        if ( next_value_index >= this.ValueCount )
        {
            if ( this.IsLooping )
            {
                next_value_index = 0;
            }
            else
            {
                next_value_index = ValueCount;
            }
        }

        prior_time = this.TimeArray[ prior_value_index ];
        prior_value = this.ValueArray[ prior_value_index ];

        next_time = this.TimeArray[ next_value_index ];
        next_value = this.ValueArray[ next_value_index ];

        value_time = Time - prior_time;
        value_duration = next_time - prior_value;

        if ( value_time === 0.0
             || value_duration === 0.0 )
        {
            value = prior_value;
        }
        else
        {
            value
                = this.InterpolationFunction(
                    prior_value,
                    next_value,
                    value_time / value_duration
                    );
        }

        element.style[ property_name ] = value + Unit;

        if ( this.UpdateFunction !== undefined )
        {
            this.UpdateFunction( this );
        }

        if ( this.Time === this.Duration
             && !this.IsLooping )
        {
            Stop();
        }
    }
}

// -- VARIABLES

var
    PropertyAnimationIdentifier = 0,
    PropertyAnimationInterval = null,
    PropertyAnimationMap = new Map();

// -- FUNCTIONS

function GetLinearInterpolation(
    prior_value,
    next_value,
    next_value_ratio
    )
{
    return prior_value + ( next_value - prior_value ) * next_value_ratio;
}

// ~~

function GetValue(
    text
    )
{
    return JSON.parse( json_text );
}

// ~~

function GetText(
    value
    )
{
    return JSON.stringify( value );
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

function LogElement(
    element
    )
{
    Log(
        {
            tagName : element.tagName,
            elementType : element.elementType,
            id : element.id,
            classList : element.classList,
            style : element.style,
            dataset : element.dataset,
            clientWidth : element.clientWidth,
            clientHeight : element.clientHeight,
            clientLeft : element.clientLeft,
            clientTop : element.clientTop,
            offsetWidth : element.offsetWidth,
            offsetHeight : element.offsetHeight,
            offsetLeft : element.offsetLeft,
            offsetTop : element.offsetTop,
            scrollWidth : element.scrollWidth,
            scrollHeight : element.scrollHeight,
            scrollLeft : element.scrollLeft,
            scrollTop : element.scrollTop
        }
        );
}

// ~~

function DumpElement(
    element
    )
{
    console.dir( element );
}

// ~~

function IsVisibleElement(
    element,
    bottom_offset = 0,
    top_offset = 0,
    left_offset = 0,
    right_offset = 0
    )
{
    var
        bounding_client_rectangle;

    bounding_client_rectangle = element.getBoundingClientRect();

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

function GetElementById(
    element_id
    )
{
    return document.getElementById( element_id );
}

// ~~

function GetElementsByClasses(
    element_classes
    )
{
    return document.getElementsByClassName( element_classes );
}

// ~~

function GetElementsByName(
    element_name
    )
{
    return document.getElementsByName( element_name );
}

// ~~

function GetElement(
    element_selector
    )
{
    return document.querySelector( element_selector );
}

// ~~

function GetElements(
    element_selector
    )
{
    return Array.from( document.querySelectorAll( element_selector ) );
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

function SendRequest(
    url,
    method,
    header_map,
    body,
    callback_function
    )
{
    var
        header_name,
        request;

    request = new XMLHttpRequest();
    request.open( method, url, true );
    request.onreadystatechange
        = function()
          {
              if ( this.readyState == 4
                   && callback_function !== undefined )
              {
                  callback_function( request );
              }
          };

    if ( header_map !== undefined )
    {
        for ( header_name in header_map )
        {
            request.setRequestHeader( header_name, header_map[ header_name ] );
        }
    }
    else if ( method == "POST" )
    {
        request.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );
    }

    request.send( body );
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
    AnimationPriorTime = new Date();
    AnimationStepTime = 0;

    if ( PropertyAnimationInterval === null )
    {
        PropertyAnimationInterval = setInterval( UpdateAnimation, 50 );
    }
}

// ~~

function UpdateAnimation(
    )
{
    var
        animation_time;

    animation_time = new Date();

    AnimationStepTime = animation_time - AnimationPriorTime;
    AnimationPriorTime = animation_time;

    for ( property_animation of PropertyAnimationMap.values() )
    {
        property_animation.Update( AnimationStepTime );
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
    element,
    property_name,
    property_value_array,
    property_time_array,
    animation_configuration = {}
    )
{
    if ( element.PropertyAnimationMap === undefined )
    {
        element.PropertyAnimationMap = new Map();
    }

    if ( element.PropertyAnimationMap.has( property_name ) )
    {
        element.PropertyAnimationMap.get( property_name ).Stop();
    }

    property_animation
        = new PROPERTY_ANIMATION(
              element,
              property_name,
              property_value_array,
              property_time_array,
              animation_configuration
              );

    element.PropertyAnimationMap.set( property_name, property_animation );

    property_animation.Start();
}

// ~~

function StartProperties(
    element,
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
    element,
    property_name
    )
{
    if ( element.PropertyAnimationMap !== undefined
         && element.PropertyAnimationMap.has( property_name ) )
    {
        element.PropertyAnimationMap.get( property_name ).Pause();
    }
}

// ~~

function PauseProperties(
    element,
    property_name_array
    )
{
    var
        property_name;

    if ( property_name_array === undefined )
    {
        if ( element.PropertyAnimationMap !== undefined )
        {
            for ( property_animation of element.PropertyAnimationMap.values() )
            {
                property_animation.Pause();
            }
        }
    }
    else
    {
        for ( property_name of property_name_array )
        {
            PauseProperty( element, property_name );
        }
    }
}

// ~~

function ResumeProperty(
    element,
    property_name
    )
{
    if ( element.PropertyAnimationMap !== undefined
         && element.PropertyAnimationMap.has( property_name ) )
    {
        element.PropertyAnimationMap.get( property_name ).Resume();
    }
}

// ~~

function ResumeProperties(
    element,
    property_name_array
    )
{
    var
        property_name;

    if ( property_name_array === undefined )
    {
        if ( element.PropertyAnimationMap !== undefined )
        {
            for ( property_animation of element.PropertyAnimationMap.values() )
            {
                property_animation.Resume();
            }
        }
    }
    else
    {
        for ( property_name of property_name_array )
        {
            ResumeProperty( element, property_name );
        }
    }
}

// ~~

function StopProperty(
    element,
    property_name
    )
{
    if ( element.PropertyAnimationMap !== undefined
         && element.PropertyAnimationMap.has( property_name ) )
    {
        element.PropertyAnimationMap.get( property_name ).Stop();
    }
}

// ~~

function StopProperties(
    element,
    property_name_array
    )
{
    var
        property_animation,
        property_name;

    if ( property_name_array === undefined )
    {
        if ( element.PropertyAnimationMap !== undefined )
        {
            for ( property_animation of element.PropertyAnimationMap.values() )
            {
                property_animation.Stop();
            }
        }
    }
    else
    {
        for ( property_name of property_name_array )
        {
            StopProperty( element, property_name );
        }
    }
}

// ~~

function GetTemplateFunction(
    template_text,
    parameter_list
    )
{
    var
        code,
        part_array,
        section_array,
        section_count,
        template_text,
        text;

    if ( template_text instanceof HTMLElement )
    {
        template_text = GetDecodedHtml( template_text.innerHTML );
    }

    section_array = template_text.split( "\r" ).join( "" ).split( "<%" );
    section_count = section_array.length;

    template_function_code = "(";

    if ( parameter_list !== undefined )
    {
        template_function_code += parameter_list;
    }

    template_function_code += ") => {\nvar result = " + JSON.stringify( section_array[ 0 ] ) + ";\n";

    for ( section_index = 1;
          section_index < section_count;
          ++section_index )
    {
        section_part_array = section_array[ section_index ].split( "%>" );
        section_code = section_part_array.shift();
        section_text = section_part_array.join( "%>" );

        if ( section_code.startsWith( "=" ) )
        {
            template_function_code += "result += GetEncodedHtml( " +  section_code.substring( 1 ).trim() + " );\n";
        }
        else if ( section_code.startsWith( "#" ) )
        {
            template_function_code += "result += " + section_code.substring( 1 ).trim() + ";\n";
        }
        else
        {
            template_function_code += section_code;
        }

        if ( section_text.length > 0 )
        {
            template_function_code += "result += " + JSON.stringify( section_text ) + ";\n";
        }
    }

    template_function_code += "return result;\n}";

    return eval(
        template_function_code
              .split( "<\\%" ).join( "<%" )
              .split( "%\\>" ).join( "%>" )
              .split( "<\\\\%" ).join( "<%" )
              .split( "%\\\\>" ).join( "%>" )
        );
}

// ~~

Array.prototype.Apply = function(
    element_function
    )
{
    this.forEach( element_function );

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

Array.prototype.LogElements = function(
    )
{
    var
        element;

    for ( element of this )
    {
        LogElement( element );
    }

    return this;
}

// ~~

Array.prototype.DumpElements = function(
    )
{
    var
        element;

    for ( element of this )
    {
        DumpElement( element );
    }

    return this;
}

// ~~

Array.prototype.GetAncestorElements = function(
    element_selector
    )
{
    var
        ancestor_element,
        ancestor_element_array,
        element;

    ancestor_element_array = [];

    for ( element of this )
    {
        for ( ancestor_element = element.parent;
              ancestor_element != null;
              ancestor_element = ancestor_element.parent )
        {
            if ( ancestor_element.elementType === 1
                 && ( element_selector === undefined
                      || ancestor_element.matches( element_selector ) ) )
            {
                ancestor_element_array.push( ancestor_element );
            }
        }
    }

    return ancestor_element_array;
}

// ~~

Array.prototype.GetParentElements = function(
    element_selector
    )
{
    var
        element,
        parent_element_array;

    parent_element_array = [];

    for ( element of this )
    {
        if ( element.parent != null
             && element.parent.elementType == 1
             && ( element_selector === undefined
                  || element.parent.matches( element_selector ) ) )
        {
            parent_element_array.push( element.parent );
        }
    }

    return parent_element_array;
}

// ~~

Array.prototype.GetPrecedingElements = function(
    element_selector
    )
{
    var
        element,
        preceding_element,
        preceding_element_array;

    preceding_element_array = [];

    for ( element of this )
    {
        for ( preceding_element = element.previousSibling;
              preceding_element != null;
              preceding_element = preceding_element.previousSibling )
        {
            if ( preceding_element.elementType === 1
                 && ( element_selector === undefined
                      || preceding_element.matches( element_selector ) ) )
            {
                preceding_element_array.push( preceding_element );
            }
        }
    }

    return preceding_element_array;
}

// ~~

Array.prototype.GetPriorElements = function(
    element_selector
    )
{
    var
        element,
        prior_element_array;

    prior_element_array = [];

    for ( element of this )
    {
        if ( element.previousSibling != null
             && element.previousSibling.elementType == 1
             && ( element_selector === undefined
                  || element.previousSibling.matches( element_selector ) ) )
        {
            prior_element_array.push( element.previousSibling );
        }
    }

    return prior_element_array;
}

// ~~

Array.prototype.GetNextElements = function(
    element_selector
    )
{
    var
        next_element_array,
        element;

    next_element_array = [];

    for ( element of this )
    {
        if ( element.nextSibling != null
             && element.nextSibling.elementType == 1
             && ( element_selector === undefined
                  || element.nextSibling.matches( element_selector ) ) )
        {
            next_element_array.push( element.nextSibling );
        }
    }

    return next_element_array;
}

// ~~

Array.prototype.GetFollowingElements = function(
    element_selector
    )
{
    var
        following_element,
        following_element_array,
        element;

    following_element_array = [];

    for ( element of this )
    {
        for ( following_element = element.nextSibling;
              following_element != null;
              following_element = following_element.nextSibling )
        {
            if ( following_element.elementType === 1
                 && ( element_selector === undefined
                      || following_element.matches( element_selector ) ) )
            {
                following_element_array.push( following_element );
            }
        }
    }

    return following_element_array;
}

// ~~

Array.prototype.GetChildElements = function(
    element_selector
    )
{
    var
        child_element,
        child_element_array,
        element;

    child_element_array = [];

    for ( element of this )
    {
        for ( child_element of element.children )
        {
            if ( child_element.elementType == 1
                 && ( element_selector === undefined
                      || child_element.matches( element_selector ) ) )
            {
                child_element_array.push( child_element );
            }
        }
    }

    return child_element_array;
}

// ~~

Array.prototype.GetDescendantElements = function(
    element_selector
    )
{
    var
        child_element,
        descendant_element,
        descendant_element_array,
        descendant_element_list,
        element;

    descendant_element_array = [];

    if ( element_selector === undefined )
    {
        element_selector = "*";
    }

    for ( element of this )
    {
        for ( child_element of element.children )
        {
            descendant_element_list = child_element.querySelectorAll( element_selector );

            for ( descendant_element of descendant_element_list )
            {
                if ( descendant_element.elementType == 1 )
                {
                    descendant_element_array.push( descendant_element );
                }
            }
        }
    }

    return descendant_element_array;
}

// ~~

Array.prototype.GetMatchingElements = function(
    element_selector
    )
{
    var
        matching_element_array,
        element;

    matching_element_array = [];

    for ( element of this )
    {
        if ( element.elementType == 1
             && ( element_selector === undefined
                  || element.matches( element_selector ) ) )
        {
            matching_element_array.push( element );
        }
    }

    return matching_element_array;
}

// ~~

Array.prototype.GetElements = function(
    element_selector
    )
{
    var
        found_element,
        found_element_array,
        found_element_list,
        element;

    found_element_array = [];

    if ( element_selector === undefined )
    {
        element_selector = "*";
    }

    for ( element of this )
    {
        found_element_list = element.querySelectorAll( element_selector );

        for ( found_element of found_element_list )
        {
            if ( found_element.elementType == 1 )
            {
                found_element_array.push( found_element );
            }
        }
    }

    return found_element_array;
}

// ~~

Array.prototype.AddClass = function(
    class_name
    )
{
    var
        element;

    for ( element of this )
    {
        element.classList.add( class_name );
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
        element;

    for ( element of this )
    {
        for ( class_name of class_name_array )
        {
            element.classList.add( class_name );
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
        element;

    for ( element of this )
    {
        element.classList.remove( class_name );
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
        element;

    for ( element of this )
    {
        for ( class_name of class_name_array )
        {
            element.classList.remove( class_name );
        }
    }

    return this;
}

// ~~

Array.prototype.GetAttribute = function(
    attribute_name
    )
{
    var
        attribute_value_array,
        element;

    attribute_value_array = [];

    for ( element of this )
    {
        attribute_value_array.push( element[ attribute_name ] );
    }

    return attribute_value_array;
}

// ~~

Array.prototype.GetAttributes = function(
    attribute_name_array
    )
{
    var
        attribute_value_array,
        attribute_value_array_array,
        element;

    attribute_value_array_array = [];

    for ( element of this )
    {
        attribute_value_array = [];

        for ( attribute_name of attribute_name_array )
        {
            attribute_value_array.push( element[ attribute_name ] );
        }

        attribute_value_array_array.push( attribute_value_array );
    }

    return attribute_value_array_array;
}

// ~~

Array.prototype.SetAttribute = function(
    attribute_name,
    attribute_value_array
    )
{
    var
        attribute_value_index,
        element;

    if ( attribute_value_array instanceof Array )
    {
        attribute_value_index = 0;

        for ( element of this )
        {
            element[ attribute_name ] = attribute_value_array[ attribute_value_index ];

            ++attribute_value_index;
        }
    }
    else
    {
        for ( element of this )
        {
            element[ attribute_name ] = attribute_value_array;
        }
    }

    return this;
}

// ~~

Array.prototype.SetAttributes = function(
    attribute_value_map
    )
{
    var
        element,
        attribute_name,
        attribute_value_array,
        attribute_value_index;

    for ( attribute_name in attribute_value_map )
    {
        attribute_value_array = attribute_value_map[ attribute_name ];

        if ( attribute_value_array instanceof Array )
        {
            attribute_value_index = 0;

            for ( element of this )
            {
                element.style[ attribute_name ] = attribute_value_array[ attribute_value_index ];

                ++attribute_value_index;
            }
        }
        else
        {
            for ( element of this )
            {
                element.style[ attribute_name ] = attribute_value_array;
            }
        }
    }

    return this;
}

// ~~

Array.prototype.GetProperty = function(
    property_name
    )
{
    var
        property_value_array,
        element;

    property_value_array = [];

    for ( element of this )
    {
        property_value_array.push( element.style[ property_name ] );
    }

    return property_value_array;
}

// ~~

Array.prototype.GetProperties = function(
    property_name_array
    )
{
    var
        property_value_array,
        property_value_array_array,
        element;

    property_value_array_array = [];

    for ( element of this )
    {
        property_value_array = [];

        for ( property_name of property_name_array )
        {
            property_value_array.push( element.style[ property_name ] );
        }

        property_value_array_array.push( property_value_array );
    }

    return property_value_array_array;
}

// ~~

Array.prototype.SetProperty = function(
    property_name,
    property_value_array
    )
{
    var
        property_value_index,
        element;

    if ( property_value_array instanceof Array )
    {
        property_value_index = 0;

        for ( element of this )
        {
            element[ property_name ] = property_value_array[ property_value_index ];

            ++property_value_index;
        }
    }
    else
    {
        for ( element of this )
        {
            element[ property_name ] = property_value_array;
        }
    }

    return this;
}

// ~~

Array.prototype.SetProperties = function(
    property_value_map
    )
{
    var
        element,
        property_name,
        property_value_array,
        property_value_index;

    for ( property_name in property_value_map )
    {
        property_value_array = property_value_map[ property_name ];

        if ( property_value_array instanceof Array )
        {
            property_value_index = 0;

            for ( element of this )
            {
                element.style[ property_name ] = property_value_array[ property_value_index ];

                ++property_value_index;
            }
        }
        else
        {
            for ( element of this )
            {
                element.style[ property_name ] = property_value_array;
            }
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
        element;

    for ( element of this )
    {
        StartProperty(
            element,
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
        element;

    for ( element of this )
    {
        StartProperties(
            element,
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
        element;

    for ( element of this )
    {
        PauseProperty( element, property_name );
    }

    return this;
}

// ~~

Array.prototype.PauseProperties = function(
    property_name_array
    )
{
    var
        element;

    for ( element of this )
    {
        PauseProperties( element, property_name_array );
    }

    return this;
}

// ~~

Array.prototype.ResumeProperty = function(
    property_name
    )
{
    var
        element;

    for ( element of this )
    {
        ResumeProperty( element, property_name );
    }

    return this;
}

// ~~

Array.prototype.ResumeProperties = function(
    property_name_array
    )
{
    var
        element;

    for ( element of this )
    {
        ResumeProperties( element, property_name_array );
    }

    return this;
}

// ~~

Array.prototype.StopProperty = function(
    property_name
    )
{
    var
        element;

    for ( element of this )
    {
        StopProperty( element, property_name );
    }

    return this;
}

// ~~

Array.prototype.StopProperties = function(
    property_name_array
    )
{
    var
        element;

    for ( element of this )
    {
        StopProperties( element, property_name_array );
    }

    return this;
}
