// -- FUNCTIONS

function LogElement(
    element
    )
{
    console.log(
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

function CreateElement(
    element_type,
    options
    )
{
    return document.createElement( element_type, options );
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

function GetElementProperty(
    element,
    property_name
    )
{
    var
        property;

    property = element.style[ property_name ];

    if ( property.length > 0 )
    {
        return property;
    }
    else
    {
        return window.getComputedStyle( element, null ).getPropertyValue( property_name );
    }
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

Array.prototype.PrependChild = function(
    child_element
    )
{
    var
        element;

    for ( element of this )
    {
        element.prependChild( child_element );
    }
}

// ~~

Array.prototype.PrependChildren = function(
    child_element_array
    )
{
    var
        child_element,
        element;

    for ( element of this )
    {
        for ( child_element of child_element_array )
        {
            element.prependChild( child_element );
        }
    }
}

// ~~

Array.prototype.AppendChild = function(
    child_element
    )
{
    var
        element;

    for ( element of this )
    {
        element.appendChild( child_element );
    }
}

// ~~

Array.prototype.AppendChildren = function(
    child_element_array
    )
{
    var
        child_element,
        element;

    for ( element of this )
    {
        for ( child_element of child_element_array )
        {
            element.appendChild( child_element );
        }
    }
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

Array.prototype.GetTextContent = function(
    )
{
    var
        text,
        element;

    text = "";

    for ( element of this )
    {
        if ( element.textContent !== null )
        {
            text += element.textContent;
        }
    }

    return text;
}

// ~~

Array.prototype.SetTextContent = function(
    text
    )
{
    var
        element;

    for ( element of this )
    {
        element.textContent = text;
    }

    return this;
}

// ~~

Array.prototype.AddEventListener = function(
    event_name,
    event_function
    )
{
    var
        element;

    for ( element of this )
    {
        element.addEventListener( event_name, event_function );
    }

    return this;
}

// ~~

Array.prototype.RemoveEventListener = function(
    event_name,
    event_function
    )
{
    var
        element;

    for ( element of this )
    {
        element.removeEventListener( event_name, event_function );
    }

    return this;
}
