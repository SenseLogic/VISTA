// -- FUNCTIONS

Event.prototype.Stop = Event.prototype.stopPropagation;

// ~~

HTMLElement.prototype.Write = function (
    ...argument_array
    )
{
    this.appendChild( document.createTextNode( GetArrayText( argument_array, "", true, "", "", "" ) ) );
}

// ~~

HTMLElement.prototype.WriteLine = function (
    ...argument_array
    )
{
    this.appendChild( document.createTextNode( GetArrayText( argument_array, "", true, "", "", "" ) ) );
    this.appendChild( document.createElement( "br" ) );
}

// ~~

HTMLElement.prototype.WriteRow = function (
    ...argument_array
    )
{
    this.appendChild( document.createTextNode( GetArrayText( argument_array, " ", true, "", "", "" ) ) );
    this.appendChild( document.createElement( "br" ) );
}

// ~~

HTMLElement.prototype.Print = function (
    )
{
    if ( this )
    {
        Print( GetObjectText( this ) );
    }
    else
    {
        Print( this );
    }
}

// ~~

HTMLElement.prototype.DumpElement = function (
    )
{
    Dump( this );
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

HTMLElement.prototype.GetElementById = HTMLElement.prototype.getElementById;

// ~~

ShadowRoot.prototype.GetElementById = ShadowRoot.prototype.getElementById;

// ~~

function GetElementsByClasses(
    element_classes
    )
{
    return Array.from( document.getElementsByClassName( element_classes ) );
}

// ~~

HTMLElement.prototype.GetElementsByClasses = function (
    element_classes
    )
{
    return Array.from( this.getElementsByClassName( element_classes ) );
}

// ~~

function GetElementsByName(
    element_name
    )
{
    return Array.from( document.getElementsByName( element_name ) );
}

// ~~

HTMLElement.prototype.GetElementsByName = function (
    element_name
    )
{
    return Array.from( this.getElementsByName( element_name ) );
}

// ~~

function GetElement(
    element_selector
    )
{
    return document.querySelector( element_selector );
}

// ~~

HTMLElement.prototype.GetElement = function (
    element_selector
    )
{
    if ( this.matches( element_selector ) )
    {
        return this;
    }
    else
    {
        return this.querySelector( element_selector );
    }
}

// ~~

function GetElements(
    element_selector
    )
{
    return Array.from( document.querySelectorAll( element_selector ) );
}

// ~~

HTMLElement.prototype.GetElements = function (
    element_selector
    )
{
    var
        element_array;

    element_array = Array.from( this.querySelectorAll( element_selector ) );

    if ( this.matches( element_selector ) )
    {
        return element_array.AddFirstValue( this );
    }

    return element_array;
}

// ~~

HTMLElement.prototype.GetDescendantElement = HTMLElement.prototype.querySelector;

// ~~

ShadowRoot.prototype.GetDescendantElement = ShadowRoot.prototype.querySelector;

// ~~

HTMLElement.prototype.GetDescendantElements = function (
    element_selector
    )
{
    return Array.from( this.querySelectorAll( element_selector ) );
}

// ~~

ShadowRoot.prototype.GetDescendantElements = function (
    element_selector
    )
{
    return Array.from( this.querySelectorAll( element_selector ) );
}

// ~~

HTMLElement.prototype.GetAncestorElement = function (
    element_selector
    )
{
    var
        ancestor_element;

    for ( ancestor_element = this.parentElement;
          ancestor_element;
          ancestor_element = ancestor_element.parentElement )
    {
        if ( ancestor_element.nodeType === 1
             && ancestor_element.matches( element_selector ) )
        {
            return ancestor_element;
        }
    }

    return null;
}

// ~~

HTMLElement.prototype.GetAncestorProperty = function (
    property_name,
    element_class
    )
{
    var
        ancestor_element;

    for ( ancestor_element = this.parentElement;
          ancestor_element;
          ancestor_element = ancestor_element.parentElement )
    {
        if ( ancestor_element.nodeType === 1
             && ancestor_element[ property_name ] !== undefined
             && ( element_class === undefined
                  || ancestor_element instanceof element_class ) )
        {
            return ancestor_element[ property_name ];
        }
    }

    return null;
}

// ~~

HTMLElement.prototype.AddClass = function (
    class_name
    )
{
    this.classList.add( class_name );

    return this;
}

// ~~

HTMLElement.prototype.RemoveClass = function (
    class_name
    )
{
    this.classList.remove( class_name );

    return this;
}

// ~~

HTMLElement.prototype.ToggleClass = function (
    class_name
    )
{
    if ( this.classList.contains( class_name ) )
    {
        this.classList.remove( class_name );
    }
    else
    {
        this.classList.add( class_name );
    }

    return this;
}

// ~~

HTMLElement.prototype.SetContentHeight = function (
    )
{
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
}

// ~~

HTMLElement.prototype.GetTextContent = function (
    )
{
    return this.textContent;
}

// ~~

HTMLElement.prototype.SetTextContent = function (
    text
    )
{
    this.textContent = text;
}

// ~~

HTMLElement.prototype.AddEventListener = HTMLElement.prototype.addEventListener;

// ~~

HTMLElement.prototype.RemoveEventListener = HTMLElement.prototype.removeEventListener;

// ~~

HTMLElement.prototype.EmitEvent = function (
    event_name,
    event_data = null,
    event_is_bubbled = true,
    event_is_cancelable = true,
    event_is_composed = true
    )
{
    return (
        this.dispatchEvent(
            new CustomEvent(
                event_name,
                {
                    detail : event_data,
                    bubbles : event_is_bubbled,
                    cancelable : event_is_cancelable,
                    composed : event_is_composed
                }
                )
            )
        );
}

// ~~

HTMLElement.prototype.HasAttribute = HTMLElement.prototype.hasAttribute;

// ~~

HTMLElement.prototype.GetAttribute = function (
    attribute_name,
    default_value = ""
    )
{
    if ( this.hasAttribute( attribute_name ) )
    {
        return this.getAttribute( attribute_name );
    }
    else
    {
        return default_value;
    }
}

// ~~

HTMLElement.prototype.SetAttribute = HTMLElement.prototype.setAttribute;

// ~~

HTMLElement.prototype.IsVisible = function (
    bottom_offset = 0,
    top_offset = 0,
    left_offset = 0,
    right_offset = 0
    )
{
    var
        bounding_client_rectangle;

    bounding_client_rectangle = this.getBoundingClientRect();

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

HTMLElement.prototype.SetScrollTop = function (
    position
    )
{
    if ( position === undefined )
    {
        this.scrollTop = this.scrollHeight;
    }
    else if ( position < 0 )
    {
        this.scrollTop = this.scrollHeight + position;
    }
    else
    {
        this.scrollTop = position;
    }
}

// ~~

HTMLElement.prototype.SetScrollLeft = function (
    position
    )
{
    if ( position === undefined )
    {
        this.scrollLeft = this.scrollWidth;
    }
    else if ( position < 0 )
    {
        this.scrollLeft = this.scrollWidth + position;
    }
    else
    {
        this.scrollLeft = position;
    }
}

// ~~

HTMLElement.prototype.GetTopPosition = function (
    )
{
    return window.pageYOffset + this.getBoundingClientRect().top;
}

// ~~

HTMLElement.prototype.GetLeftPosition = function (
    )
{
    return window.pageXOffset + this.getBoundingClientRect().left;
}

// ~~

function SetScrollTop(
    position
    )
{
    if ( position instanceof HTMLElement )
    {
        position = position.GetTopPosition();
    }

    window.scroll(
        {
            top : position,
            behavior : "smooth"
        }
        );
}

// ~~

function SetScrollLeft(
    position
    )
{
    if ( position instanceof HTMLElement )
    {
        position = position.GetLeftPosition();
    }

    window.scroll(
        {
            left : position,
            behavior : "smooth"
        }
        );
}


// ~~

HTMLElement.prototype.GetStyle = function(
    style_name
    )
{
    var
        style;

    style = this.style[ style_name ];

    if ( style.length > 0 )
    {
        return style;
    }
    else
    {
        return window.getComputedStyle( this, null ).getPropertyValue( style_name );
    }
}

// ~~

HTMLElement.prototype.SetStyle = function (
    style_name,
    style_value
    )
{
    this.style[ style_name ] = style_value;
}

// ~~

Array.prototype.PrintElements = function (
    )
{
    var
        element;

    for ( element of this )
    {
        PrintElement( element );
    }

    return this;
}

// ~~

Array.prototype.DumpElements = function (
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

Array.prototype.PrependChildElement = function (
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

Array.prototype.PrependChildElements = function (
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

Array.prototype.AppendChildElement = function (
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

Array.prototype.AppendChildElements = function (
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

Array.prototype.GetAncestorElements = function (
    element_selector = undefined
    )
{
    var
        ancestor_element,
        ancestor_element_array,
        element;

    ancestor_element_array = [];

    for ( element of this )
    {
        for ( ancestor_element = element.parentElement;
              ancestor_element;
              ancestor_element = ancestor_element.parentElement )
        {
            if ( ancestor_element.nodeType === 1
                 && ( element_selector === undefined
                      || ancestor_element.matches( element_selector ) ) )
            {
                ancestor_element_array.AddLastValue( ancestor_element );
            }
        }
    }

    return ancestor_element_array;
}

// ~~

Array.prototype.GetParentElements = function (
    element_selector = undefined
    )
{
    var
        element,
        parent_element_array;

    parent_element_array = [];

    for ( element of this )
    {
        if ( element.parentElement
             && element.parentElement.nodeType == 1
             && ( element_selector === undefined
                  || element.parentElement.matches( element_selector ) ) )
        {
            parent_element_array.AddLastValue( element.parentElement );
        }
    }

    return parent_element_array;
}

// ~~

Array.prototype.GetPrecedingElements = function (
    element_selector = undefined
    )
{
    var
        element,
        preceding_element,
        preceding_element_array;

    preceding_element_array = [];

    for ( element of this )
    {
        for ( preceding_element = element.previousElementSibling;
              preceding_element;
              preceding_element = preceding_element.previousElementSibling )
        {
            if ( preceding_element.nodeType === 1
                 && ( element_selector === undefined
                      || preceding_element.matches( element_selector ) ) )
            {
                preceding_element_array.AddLastValue( preceding_element );
            }
        }
    }

    return preceding_element_array;
}

// ~~

Array.prototype.GetPriorElements = function (
    element_selector = undefined
    )
{
    var
        element,
        prior_element_array;

    prior_element_array = [];

    for ( element of this )
    {
        if ( element.previousElementSibling
             && element.previousElementSibling.nodeType == 1
             && ( element_selector === undefined
                  || element.previousElementSibling.matches( element_selector ) ) )
        {
            prior_element_array.AddLastValue( element.previousElementSibling );
        }
    }

    return prior_element_array;
}

// ~~

Array.prototype.GetNextElements = function (
    element_selector = undefined
    )
{
    var
        next_element_array,
        element;

    next_element_array = [];

    for ( element of this )
    {
        if ( element.nextElementSibling
             && element.nextElementSibling.nodeType == 1
             && ( element_selector === undefined
                  || element.nextElementSibling.matches( element_selector ) ) )
        {
            next_element_array.AddLastValue( element.nextElementSibling );
        }
    }

    return next_element_array;
}

// ~~

Array.prototype.GetFollowingElements = function (
    element_selector = undefined
    )
{
    var
        following_element,
        following_element_array,
        element;

    following_element_array = [];

    for ( element of this )
    {
        for ( following_element = element.nextElementSibling;
              following_element;
              following_element = following_element.nextElementSibling )
        {
            if ( following_element.nodeType === 1
                 && ( element_selector === undefined
                      || following_element.matches( element_selector ) ) )
            {
                following_element_array.AddLastValue( following_element );
            }
        }
    }

    return following_element_array;
}

// ~~

Array.prototype.GetChildElements = function (
    element_selector = undefined
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
            if ( child_element.nodeType == 1
                 && ( element_selector === undefined
                      || child_element.matches( element_selector ) ) )
            {
                child_element_array.AddLastValue( child_element );
            }
        }
    }

    return child_element_array;
}

// ~~

Array.prototype.GetDescendantElements = function (
    element_selector = undefined
    )
{
    var
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
        descendant_element_list = element.querySelectorAll( element_selector );

        for ( descendant_element of descendant_element_list )
        {
            if ( descendant_element.nodeType == 1 )
            {
                descendant_element_array.AddLastValue( descendant_element );
            }
        }
    }

    return descendant_element_array;
}

// ~~

Array.prototype.GetMatchingElements = function (
    element_selector = undefined
    )
{
    var
        matching_element_array,
        element;

    matching_element_array = [];

    for ( element of this )
    {
        if ( element.nodeType == 1
             && ( element_selector === undefined
                  || element.matches( element_selector ) ) )
        {
            matching_element_array.AddLastValue( element );
        }
    }

    return matching_element_array;
}

// ~~

Array.prototype.GetElements = function (
    element_selector = undefined
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
        if ( element.matches( element_selector ) )
        {
            found_element_array.AddLastValue( element );
        }

        found_element_list = element.querySelectorAll( element_selector );

        for ( found_element of found_element_list )
        {
            if ( found_element.nodeType == 1 )
            {
                found_element_array.AddLastValue( found_element );
            }
        }
    }

    return found_element_array;
}

// ~~

Array.prototype.AddClass = function (
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

Array.prototype.AddClasses = function (
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

Array.prototype.RemoveClass = function (
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

Array.prototype.RemoveClasses = function (
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

Array.prototype.GetAttribute = function (
    attribute_name
    )
{
    var
        attribute_value_array,
        element;

    attribute_value_array = [];

    for ( element of this )
    {
        attribute_value_array.AddLastValue( element[ attribute_name ] );
    }

    return attribute_value_array;
}

// ~~

Array.prototype.GetAttributes = function (
    attribute_name_array
    )
{
    var
        attribute_name,
        attribute_value_array,
        attribute_value_array_array,
        element;

    attribute_value_array_array = [];

    for ( element of this )
    {
        attribute_value_array = [];

        for ( attribute_name of attribute_name_array )
        {
            attribute_value_array.AddLastValue( element[ attribute_name ] );
        }

        attribute_value_array_array.AddLastValue( attribute_value_array );
    }

    return attribute_value_array_array;
}

// ~~

Array.prototype.SetAttribute = function (
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

Array.prototype.SetAttributes = function (
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
        if ( attribute_value_map.hasOwnProperty( attribute_name ) )
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
    }

    return this;
}

// ~~

Array.prototype.GetStyle = function (
    style_name
    )
{
    var
        style_value_array,
        element;

    style_value_array = [];

    for ( element of this )
    {
        style_value_array.AddLastValue( element.style[ style_name ] );
    }

    return style_value_array;
}

// ~~

Array.prototype.GetStyles = function (
    style_name_array
    )
{
    var
        style_name,
        style_value_array,
        style_value_array_array,
        element;

    style_value_array_array = [];

    for ( element of this )
    {
        style_value_array = [];

        for ( style_name of style_name_array )
        {
            style_value_array.AddLastValue( element.style[ style_name ] );
        }

        style_value_array_array.AddLastValue( style_value_array );
    }

    return style_value_array_array;
}

// ~~

Array.prototype.SetStyle = function (
    style_name,
    style_value_array
    )
{
    var
        style_value_index,
        element;

    if ( style_value_array instanceof Array )
    {
        style_value_index = 0;

        for ( element of this )
        {
            element.style[ style_name ] = style_value_array[ style_value_index ];

            ++style_value_index;
        }
    }
    else
    {
        for ( element of this )
        {
            element.style[ style_name ] = style_value_array;
        }
    }

    return this;
}

// ~~

Array.prototype.SetStyles = function (
    style_value_map
    )
{
    var
        element,
        style_name,
        style_value_array,
        style_value_index;

    for ( style_name in style_value_map )
    {
        if ( style_value_map.hasOwnProperty( style_name ) )
        {
            style_value_array = style_value_map[ style_name ];

            if ( style_value_array instanceof Array )
            {
                style_value_index = 0;

                for ( element of this )
                {
                    element.style[ style_name ] = style_value_array[ style_value_index ];

                    ++style_value_index;
                }
            }
            else
            {
                for ( element of this )
                {
                    element.style[ style_name ] = style_value_array;
                }
            }
        }
    }

    return this;
}

// ~~

Array.prototype.SetContentHeight = function (
    )
{
    var
        element;

    for ( element of this )
    {
        element.SetContentHeight();
    }

    return this;
}

// ~~

Array.prototype.GetTextContent = function (
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

Array.prototype.SetTextContent = function (
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

Array.prototype.AddEventListener = function (
    event_name,
    event_function,
    options
    )
{
    var
        element;

    for ( element of this )
    {
        element.addEventListener( event_name, event_function, options );
    }

    return this;
}

// ~~

Array.prototype.RemoveEventListener = function (
    event_name,
    event_function,
    options
    )
{
    var
        element;

    for ( element of this )
    {
        element.removeEventListener( event_name, event_function, options );
    }

    return this;
}
