// -- FUNCTIONS

function GetVerticalScroll(
    )
{
    return window.scrollY;
}

// ~~

function GetHorizontalScroll(
    )
{
    return window.scrollX;
}

// ~~

function GetViewportHeight(
    )
{
    return document.documentElement.clientHeight;
}

// ~~

function GetViewportWidth(
    )
{
    return document.documentElement.clientWidth;
}

// ~~

function GetViewportMinimumSize(
    )
{
    return Math.min( document.documentElement.clientHeight, document.documentElement.clientWidth );
}

// ~~

function GetViewportMaximumSize(
    )
{
    return Math.max( document.documentElement.clientHeight, document.documentElement.clientWidth );
}

// ~~

function IsLandscapeOrientation(
    )
{
    return document.documentElement.clientWidth > document.documentElement.clientHeight;
}

// ~~

function IsPortraitOrientation(
    )
{
    return document.documentElement.clientWidth <= document.documentElement.clientHeight;
}

// ~~

function GetRemPixelCount(
    )
{
    return GetReal( window.getComputedStyle( document.body ).getPropertyValue( "font-size" ).slice( 0, -2 ) );
}

// ~~

function GetRemRatio(
    )
{
    return GetRemPixelCount() / 16;
}

// ~~

function GetPixelCountFromRemCount(
    rem_count
    )
{
    return rem_count * GetRemPixelCount();
}

// ~~

function GetRemCountFromPixelCount(
    pixel_count
    )
{
    return pixel_count / GetRemPixelCount();
}

// ~~

function GetPixelCountFromVhCount(
    vh_count
    )
{
    return vh_count * ( GetViewportHeight() / 100.0 );
}

// ~~

function GetVhCountFromPixelCount(
    pixel_count
    )
{
    return pixel_count / ( GetViewportHeight() / 100.0 );
}

// ~~

function GetPixelCountFromVwCount(
    vw_count
    )
{
    return vw_count * ( GetViewportWidth() / 100.0 );
}

// ~~

function GetVwCountFromPixelCount(
    pixel_count
    )
{
    return pixel_count / ( GetViewportWidth() / 100.0 );
}

// ~~

function GetPixelCountFromVminCount(
    vmin_count
    )
{
    return vmin_count * ( GetViewportMinimumSize() / 100.0 );
}

// ~~

function GetVminCountFromPixelCount(
    pixel_count
    )
{
    return pixel_count / ( GetViewportMinimumSize() / 100.0 );
}

// ~~

function GetPixelCountFromVmaxCount(
    vmax_count
    )
{
    return vmax_count * ( GetViewportMaximumSize() / 100.0 );
}

// ~~

function GetVmaxCountFromPixelCount(
    pixel_count
    )
{
    return pixel_count / ( GetViewportMaximumSize() / 100.0 );
}

// ~~

function GetClickEventName(
    )
{
    if ( "ontouchstart" in window )
    {
        return "touchstart";
    }
    else
    {
        return "click";
    }
}

// ~~

Event.prototype.Stop = Event.prototype.stopPropagation;

// ~~

Event.prototype.Cancel = function (
    )
{
    this.stopPropagation();
    this.preventDefault();
}

// ~~

function CancelEvent(
    event
    )
{
    event.stopPropagation();
    event.preventDefault();

    return false;
}

// ~~

HTMLElement.prototype.GetHeight = function (
    )
{
    return this.clientHeight;
}

// ~~

HTMLElement.prototype.GetWidth = function (
    )
{
    return this.clientWidth;
}

// ~~

HTMLElement.prototype.Write = function (
    ...argument_array
    )
{
    this.appendChild( document.createTextNode( GetArrayText( argument_array, "", true, "", "", "" ) ) );

    return this;
}

// ~~

HTMLElement.prototype.WriteLine = function (
    ...argument_array
    )
{
    this.appendChild( document.createTextNode( GetArrayText( argument_array, "", true, "", "", "" ) ) );
    this.appendChild( document.createElement( "br" ) );

    return this;
}

// ~~

HTMLElement.prototype.WriteRow = function (
    ...argument_array
    )
{
    this.appendChild( document.createTextNode( GetArrayText( argument_array, " ", true, "", "", "" ) ) );
    this.appendChild( document.createElement( "br" ) );

    return this;
}

// ~~

HTMLElement.prototype.Dump = function (
    )
{
    Dump( this );

    return this;
}

// ~~

HTMLElement.prototype.PrintValue = function (
    )
{
    PrintValue( this );

    return this;
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

HTMLElement.prototype.GetCloneElement = function (
    children_are_cloned = true
    )
{
    return this.content.cloneNode( children_are_cloned );
}

// ~~

function SetDocumentTitleAndDescription(
    title,
    description
    )
{
    var
        meta_description_element;

    document.title = title;
    meta_description_element = GetElement( 'meta[name="description"]' );

    if ( meta_description_element !== null )
    {
        meta_description_element.setAttribute( 'content', description );
    }
}

// ~~

function GetDocumentElement(
    )
{
    return document.documentElement;
}

// ~~

function GetRootElement(
    root_element = undefined
    )
{
    return root_element ?? document.documentElement;
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

function GetElementsByTagName(
    element_tag_name
    )
{
    return Array.from( document.getElementsByTagName( element_tag_name ) );
}

// ~~

HTMLElement.prototype.GetElementsByTagName = function (
    element_tag_name
    )
{
    return Array.from( this.getElementsByTagName( element_tag_name ) );
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

HTMLElement.prototype.GetChildElementIndex = function (
    element_selector
    )
{
    var
        child_element_index,
        preceding_element;

    child_element_index = -1;

    for ( preceding_element = this;
          preceding_element;
          preceding_element = preceding_element.previousElementSibling )
    {
        if ( preceding_element.nodeType === 1
             && ( element_selector === undefined
                  || preceding_element.matches( element_selector ) ) )
        {
            ++child_element_index;
        }
    }

    return child_element_index;
}

// ~~

HTMLElement.prototype.GetChildElementAtIndex = function (
    child_element_index
    )
{
    return this.children.item( child_element_index );
}

// ~~

HTMLElement.prototype.GetChildElements = function (
    element_selector
    )
{
    var
        child_element,
        child_element_array;

    child_element_array = [];

    for ( child_element of this.children )
    {
        if ( child_element.nodeType == 1
             && ( element_selector === undefined
                  || child_element.matches( element_selector ) ) )
        {
            child_element_array.AddLastValue( child_element );
        }
    }

    return child_element_array;
}

// ~~

HTMLElement.prototype.PrependChildElement = function (
    child_element
    )
{
    this.prependChild( child_element );

    return this;
}

// ~~

HTMLElement.prototype.PrependChildElements = function (
    child_element_array
    )
{
    var
        child_element;

    for ( child_element of child_element_array )
    {
        this.prependChild( child_element );
    }

    return this;
}

// ~~

HTMLElement.prototype.AppendChildElement = function (
    child_element
    )
{
    this.appendChild( child_element );

    return this;
}

// ~~

HTMLElement.prototype.AppendChildElements = function (
    child_element_array
    )
{
    var
        child_element;

    for ( child_element of child_element_array )
    {
        this.appendChild( child_element );
    }

    return this;
}

// ~~

HTMLElement.prototype.InsertPriorElement = function (
    prior_element
    )
{
    this.insertAdjacentElement( "beforebegin", prior_element );

    return this;
}

// ~~

HTMLElement.prototype.InsertPriorElements = function (
    prior_element_array
    )
{
    var
        prior_element_index;

    for ( prior_element_index = prior_element_array.length - 1;
          prior_element_index >= 0;
          --prior_element_index )
    {
        this.insertAdjacentElement( "beforebegin", prior_element_array[ prior_element_index ] );
    }

    return this;
}

// ~~

HTMLElement.prototype.InsertNextElement = function (
    next_element
    )
{
    this.insertAdjacentElement( "afterend", next_element );

    return this;
}

// ~~

HTMLElement.prototype.InsertNextElements = function (
    next_element_array
    )
{
    var
        next_element_index;

    for ( next_element_index = next_element_array.length - 1;
          next_element_index >= 0;
          --next_element_index )
    {
        this.insertAdjacentElement( "afterend", next_element_array[ next_element_index ] );
    }

    return this;
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

Array.prototype.GetSucceedingElements = function (
    element_selector = undefined
    )
{
    var
        element,
        succeeding_element,
        succeeding_element_array;

    succeeding_element_array = [];

    for ( element of this )
    {
        for ( succeeding_element = element.nextElementSibling;
              succeeding_element;
              succeeding_element = succeeding_element.nextElementSibling )
        {
            if ( succeeding_element.nodeType === 1
                 && ( element_selector === undefined
                      || succeeding_element.matches( element_selector ) ) )
            {
                succeeding_element_array.AddLastValue( succeeding_element );
            }
        }
    }

    return succeeding_element_array;
}

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

HTMLElement.prototype.GetAncestorElements = function (
    element_selector = undefined
    )
{
    var
        ancestor_element,
        ancestor_element_array;

    ancestor_element_array = [];

    for ( ancestor_element = this.parentElement;
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

    return ancestor_element_array;
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

HTMLElement.prototype.GetParentElement = function (
    element_selector
    )
{
    return this.parentElement;
}

// ~~

HTMLElement.prototype.GetPriorElement = function (
    )
{
    return this.previousElementSibling;
}

// ~~

HTMLElement.prototype.GetNextElement = function (
    )
{
    return this.nextElementSibling;
}

// ~~

HTMLElement.prototype.GetFirstChildElement = function (
    element_selector
    )
{
    return this.firstElementChild;
}

// ~~

HTMLElement.prototype.SubmitForm = function (
    )
{
    this.GetAncestorElement( "form" )
        .dispatchEvent(
            new Event(
                'submit',
                {
                    'bubbles': true,
                    'cancelable': true
                }
                )
            );

    return this;
}

// ~~

HTMLElement.prototype.HasClass = function (
    class_name
    )
{
    return this.classList.contains( class_name );
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
    class_name,
    condition = undefined
    )
{
    if ( condition === undefined )
    {
        if ( this.classList.contains( class_name ) )
        {
            this.classList.remove( class_name );
        }
        else
        {
            this.classList.add( class_name );
        }
    }
    else if ( condition )
    {
        this.classList.add( class_name );
    }
    else
    {
        this.classList.remove( class_name );
    }

    return this;
}

// ~~

HTMLElement.prototype.AddAnimationClass = function (
    class_name
    )
{
    this.classList.remove( class_name );
    void this.offsetWidth;
    this.classList.add( class_name );

    return this;
}

// ~~

HTMLElement.prototype.Toggle = function (
    element_is_shown = undefined,
    hidden_element_class_name = "is-hidden",
    showing_class_name = ""
    )
{
    if ( element_is_shown === undefined )
    {
        element_is_shown = this.HasClass( hidden_element_class_name );
    }

    if ( hidden_element_class_name !== "" )
    {
        if ( element_is_shown )
        {
            this.classList.remove( hidden_element_class_name );
        }
        else
        {
            this.classList.add( hidden_element_class_name );
        }
    }

    if ( showing_class_name !== "" )
    {
        if ( element_is_shown )
        {
            this.classList.add( showing_class_name );
        }
        else
        {
            this.classList.remove( showing_class_name );
        }
    }
}

// ~~

HTMLElement.prototype.SetContentHeight = function (
    )
{
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";

    return this;
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

    return this;
}

// ~~

function AddWindowEventListener(
    event_name_array,
    event_function,
    event_is_captured = false,
    event_is_unique = false,
    event_is_passive = false
    )
{
    var
        event_name;

    if ( event_name_array instanceof Array )
    {
        for ( event_name of event_name_array )
        {
            window.addEventListener(
                event_name,
                event_function,
                {
                    capture: event_is_captured,
                    once: event_is_unique,
                    passive: event_is_passive
                }
                );
        }
    }
    else
    {
        window.addEventListener(
            event_name_array,
            event_function,
            {
                capture: event_is_captured,
                once: event_is_unique,
                passive: event_is_passive
            }
            );
    }
}

// ~~

function AddEventListener(
    event_name_array,
    event_function,
    event_is_captured = false,
    event_is_unique = false,
    event_is_passive = false
    )
{
    var
        event_name;

    if ( event_name_array instanceof Array )
    {
        for ( event_name of event_name_array )
        {
            document.addEventListener(
                event_name,
                event_function,
                {
                    capture: event_is_captured,
                    once: event_is_unique,
                    passive: event_is_passive
                }
                );
        }
    }
    else
    {
        document.addEventListener(
            event_name_array,
            event_function,
            {
                capture: event_is_captured,
                once: event_is_unique,
                passive: event_is_passive
            }
            );
    }
}

// ~~

HTMLElement.prototype.AddEventListener = function (
    event_name_array,
    event_function,
    event_is_captured = false,
    event_is_unique = false,
    event_is_passive = false
    )
{
    var
        event_name;

    if ( event_name_array instanceof Array )
    {
        for ( event_name of event_name_array )
        {
            this.addEventListener(
                event_name,
                event_function,
                {
                    capture: event_is_captured,
                    once: event_is_unique,
                    passive: event_is_passive
                }
                );
        }
    }
    else
    {
        this.addEventListener(
            event_name_array,
            event_function,
            {
                capture: event_is_captured,
                once: event_is_unique,
                passive: event_is_passive
            }
            );
    }

    return this;
}

// ~~

function RemoveEventListener(
    event_name_array,
    event_function,
    event_is_captured = false,
    event_is_unique = false,
    event_is_passive = false
    )
{
    var
        event_name;

    if ( event_name_array instanceof Array )
    {
        for ( event_name of event_name_array )
        {
            document.removeEventListener(
                event_name,
                event_function,
                {
                    capture: event_is_captured
                }
                );
        }
    }
    else
    {
        document.removeEventListener(
            event_name_array,
            event_function,
            {
                capture: event_is_captured
            }
            );
    }
}

// ~~

HTMLElement.prototype.RemoveEventListener = function (
    event_name_array,
    event_function,
    event_is_captured = false,
    event_is_unique = false,
    event_is_passive = false
    )
{
    var
        event_name;

    if ( event_name_array instanceof Array )
    {
        for ( event_name of event_name_array )
        {
            this.removeEventListener(
                event_name,
                event_function,
                {
                    capture: event_is_captured
                }
                );
        }
    }
    else
    {
        this.removeEventListener(
            event_name_array,
            event_function,
            {
                capture: event_is_captured
            }
            );
    }

    return this;
}

// ~~

function ReplaceEventListener(
    event_name_array,
    event_function,
    event_is_captured = false,
    event_is_unique = false,
    event_is_passive = false
    )
{
    var
        event_name;

    if ( event_name_array instanceof Array )
    {
        for ( event_name of event_name_array )
        {
            document.removeEventListener(
                event_name,
                event_function,
                {
                    capture: event_is_captured
                }
                );

            document.addEventListener(
                event_name,
                event_function,
                {
                    capture: event_is_captured,
                    once: event_is_unique,
                    passive: event_is_passive
                }
                );
        }
    }
    else
    {
        document.removeEventListener(
            event_name_array,
            event_function,
            {
                capture: event_is_captured
            }
            );

        document.addEventListener(
            event_name_array,
            event_function,
            {
                capture: event_is_captured,
                once: event_is_unique,
                passive: event_is_passive
            }
            );
    }
}

// ~~

HTMLElement.prototype.ReplaceEventListener = function (
    event_name_array,
    event_function,
    event_is_captured = false,
    event_is_unique = false,
    event_is_passive = false
    )
{
    var
        event_name;

    if ( event_name_array instanceof Array )
    {
        for ( event_name of event_name_array )
        {
            this.removeEventListener(
                event_name,
                event_function,
                {
                    capture: event_is_captured
                }
                );

            this.addEventListener(
                event_name,
                event_function,
                {
                    capture: event_is_captured,
                    once: event_is_unique,
                    passive: event_is_passive
                }
                );
        }
    }
    else
    {
        this.removeEventListener(
            event_name_array,
            event_function,
            {
                capture: event_is_captured
            }
            );

        this.addEventListener(
            event_name_array,
            event_function,
            {
                capture: event_is_captured,
                once: event_is_unique,
                passive: event_is_passive
            }
            );
    }

    return this;
}

// ~~

function EmitEvent(
    event_name,
    event_data = null,
    event_is_bubbled = true,
    event_is_cancelable = true,
    event_is_composed = true
    )
{
    return (
        document.dispatchEvent(
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

HTMLElement.prototype.SetAttribute = function(
    attribute_name,
    attribute_value
    )
{
    this[ attribute_name ] = attribute_value;

    return this;
}

// ~~

HTMLElement.prototype.RemoveAttribute = function(
    attribute_name
    )
{
    this.removeAttribute( attribute_name );

    return this;
}

// ~~

HTMLElement.prototype.ToggleAttribute = function(
    attribute_name,
    condition = undefined,
    attribute_value = ""
    )
{
    if ( condition === undefined )
    {
        if ( this.hasAttribute( attribute_name ) )
        {
            this.removeAttribute( attribute_name );
        }
        else
        {
            this[ attribute_name ] = attribute_value;
        }
    }
    else if ( condition )
    {
        this[ attribute_name ] = attribute_value;
    }
    else
    {
        this.removeAttribute( attribute_name );
    }

    return this;
}

// ~~

HTMLElement.prototype.GetTopPosition = function (
    )
{
    return window.pageYOffset + this.getBoundingClientRect().top;
}

// ~~

HTMLElement.prototype.GetBottomPosition = function (
    )
{
    return window.pageYOffset + this.getBoundingClientRect().bottom;
}

// ~~

HTMLElement.prototype.GetLeftPosition = function (
    )
{
    return window.pageXOffset + this.getBoundingClientRect().left;
}

// ~~

HTMLElement.prototype.GetRightPosition = function (
    )
{
    return window.pageXOffset + this.getBoundingClientRect().right;
}

// ~~

HTMLElement.prototype.IsVisible = function (
    top_offset = 0,
    bottom_offset = 0,
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
        && bounding_client_rectangle.top + top_offset <= document.documentElement.clientHeight
        && bounding_client_rectangle.left + left_offset <= document.documentElement.clientWidth
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

    return this;
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

    return this;
}

// ~~

function SetScrollPosition(
    top_position = 0,
    left_position = 0
    )
{
    if ( top_position === null )
    {
        top_position = 0;
    }
    else if ( top_position instanceof HTMLElement )
    {
        top_position = top_position.GetTopPosition();
    }

    if ( left_position === null )
    {
        left_position = 0;
    }
    else if ( left_position instanceof HTMLElement )
    {
        left_position = left_position.GetTopPosition();
    }

    window.scroll( left_position, top_position );
}

// ~~

function SetScrollTop(
    position = 0,
    behavior = "smooth",
    offset = 0
    )
{
    if ( position === null )
    {
        position = 0;
    }
    else if ( position instanceof HTMLElement )
    {
        position = position.GetTopPosition();
    }

    window.scroll(
        {
            top : position + offset,
            behavior : behavior
        }
        );
}

// ~~

function SetScrollLeft(
    position = 0,
    behavior = "smooth",
    offset = 0
    )
{
    if ( position === null )
    {
        position = 0;
    }
    else if ( position instanceof HTMLElement )
    {
        position = position.GetLeftPosition();
    }

    window.scroll(
        {
            left : position + offset,
            behavior : behavior
        }
        );
}

// ~~

HTMLElement.prototype.GetStyle = function(
    style_name
    )
{
    return window.getComputedStyle( this, null ).getPropertyValue( style_name );
}

// ~~

HTMLElement.prototype.SetStyle = function (
    style_name,
    style_value
    )
{
    this.style.setProperty( style_name, style_value );

    return this;
}

// ~~

HTMLElement.prototype.SetStyles = function (
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
            this.style.setProperty( style_name, style_value_map[ style_name ] );
        }
    }

    return this;
}

// ~~

HTMLElement.prototype.SetStyleProperty = function (
    style_property_name,
    style_property_value
    )
{
    this.style.setProperty( style_property_name, style_property_value );

    return this;
}

// ~~

HTMLElement.prototype.SetStyleProperties = function (
    style_property_value_map
    )
{
    var
        element,
        style_property_name,
        style_property_value_array,
        style_property_value_index;

    for ( style_property_name in style_property_value_map )
    {
        if ( style_property_value_map.hasOwnProperty( style_property_name ) )
        {
            this.style.setProperty( style_property_name, style_property_value_map[ style_property_name ] );
        }
    }

    return this;
}

// ~~

Array.prototype.PrintValues = function (
    )
{
    var
        element;

    for ( element of this )
    {
        PrintValue( element );
    }

    return this;
}

// ~~

Array.prototype.PrintElements = function (
    )
{
    var
        element;

    for ( element of this )
    {
        Print( element );
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
        Dump( element );
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

Array.prototype.ToggleClass = function (
    class_name,
    condition = undefined
    )
{
    var
        element;

    for ( element of this )
    {
        element.ToggleClass( class_name, condition );
    }

    return this;
}

// ~~

Array.prototype.ToggleClasses = function (
    class_name_array,
    condition = undefined
    )
{
    var
        class_name,
        element;

    for ( element of this )
    {
        for ( class_name of class_name_array )
        {
            element.ToggleClasses( class_name, condition );
        }
    }

    return this;
}

// ~~

Array.prototype.AddVisibilityClass = function (
    class_name,
    top_offset = 0,
    bottom_offset = 0,
    left_offset = 0,
    right_offset = 0
    )
{
    var
        element;

    for ( element of this )
    {
        if ( element.IsVisible( top_offset, bottom_offset, left_offset, right_offset ) )
        {
            element.classList.add( class_name );
        }
    }

    return this;
}

// ~~

Array.prototype.RemoveVisibilityClass = function (
    class_name,
    top_offset = 0,
    bottom_offset = 0,
    left_offset = 0,
    right_offset = 0
    )
{
    var
        element;

    for ( element of this )
    {
        if ( !element.IsVisible( top_offset, bottom_offset, left_offset, right_offset ) )
        {
            element.classList.remove( class_name );
        }
    }

    return this;
}

// ~~

Array.prototype.ToggleVisibilityClass = function (
    class_name,
    top_offset = 0,
    bottom_offset = 0,
    left_offset = 0,
    right_offset = 0
    )
{
    var
        element;

    for ( element of this )
    {
        element.ToggleClass(
            class_name,
            element.IsVisible( top_offset, bottom_offset, left_offset, right_offset )
            );
    }

    return this;
}

// ~~

Array.prototype.AddAnimationClass = function (
    class_name
    )
{
    var
        element;

    for ( element of this )
    {
        element.classList.remove( class_name );
        void element.offsetWidth;
        element.classList.add( class_name );
    }

    return this;
}

// ~~

Array.prototype.AddAnimationClasses = function (
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

        void element.offsetWidth;

        for ( class_name of class_name_array )
        {
            element.classList.add( class_name );
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
            element.SetAttribute( attribute_name, attribute_value_array[ attribute_value_index ] );

            ++attribute_value_index;
        }
    }
    else
    {
        for ( element of this )
        {
            element.SetAttribute( attribute_name, attribute_value_array );
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
                    element.SetAttribute( attribute_name, attribute_value_array[ attribute_value_index ] );

                    ++attribute_value_index;
                }
            }
            else
            {
                for ( element of this )
                {
                    element.SetAttribute( attribute_name, attribute_value_array );
                }
            }
        }
    }

    return this;
}

// ~~

Array.prototype.RemoveAttribute = function (
    attribute_name
    )
{
    var
        element;

    for ( element of this )
    {
        element.RemoveAttribute( attribute_name );
    }

    return this;
}

// ~~

Array.prototype.RemoveAttributes = function (
    attribute_name_array
    )
{
    var
        element,
        attribute_name;

    for ( attribute_name of attribute_name_array )
    {
        for ( element of this )
        {
            element.RemoveAttribute( attribute_name );
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
        style_value_array.AddLastValue( element.style.getPropertyValue( style_name ) );
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
            style_value_array.AddLastValue( element.style.getPropertyValue( style_name ) );
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
            element.style.setProperty( style_name, style_value_array[ style_value_index ] );

            ++style_value_index;
        }
    }
    else
    {
        for ( element of this )
        {
            element.style.setProperty( style_name, style_value_array );
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
                    element.style.setProperty( style_name, style_value_array[ style_value_index ] );

                    ++style_value_index;
                }
            }
            else
            {
                for ( element of this )
                {
                    element.style.setProperty( style_name, style_value_array );
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

// ~~

function CreateIntersectionObserver(
    element_is_intersecting = true,
    intersection_ratio = 0,
    added_class = "",
    removed_class = "",
    called_function = null,
    intersection_margin = "0px",
    root_element = null
    )
{
    return new IntersectionObserver(
        function (
            intersection_observer_entry_array,
            intersection_observer
            )
        {
            var
                intersection_observer_entry;

            for ( intersection_observer_entry of intersection_observer_entry_array )
            {
                if ( element_is_intersecting === null
                     || intersection_observer_entry.isIntersecting === element_is_intersecting )
                {
                    if ( added_class !== "" )
                    {
                        intersection_observer_entry.target.classList.add( added_class );
                    }

                    if ( removed_class !== "" )
                    {
                        intersection_observer_entry.target.classList.remove( removed_class );
                    }

                    if ( called_function !== null )
                    {
                        called_function(
                            intersection_observer_entry.target,
                            intersection_observer_entry,
                            intersection_observer
                            );
                    }
                }
            }
        },
        {
            root: root_element,
            rootMargin: intersection_margin,
            threshold: intersection_ratio
        }
        );
}

// ~~

Array.prototype.AddIntersectionObserver = function(
    ...argument_array
    )
{
    var
        element,
        intersection_observer;

    if ( argument_array.length > 0
         && argument_array[ 0 ] instanceof IntersectionObserver )
    {
        intersection_observer = argument_array[ 0 ];
    }
    else
    {
        intersection_observer = CreateIntersectionObserver( ...argument_array );
    }

    for ( element of this )
    {
        intersection_observer.observe( element );
    }

    return this;
}

// ~~

Array.prototype.RemoveIntersectionObserver = function(
    intersection_observer
    )
{
    var
        element;

    for ( element of this )
    {
        intersection_observer.unobserve( element );
    }

    return this;
}

// ~~

function CreateResizeObserver(
    called_function = null,
    minimum_aspect_ratio = 0,
    maximum_aspect_ratio = 1E9
    )
{
    return new ResizeObserver(
        function (
            resize_observer_entry_array,
            resize_observer
            )
        {
            var
                container_height,
                container_width,
                resize_observer_entry;

            for ( resize_observer_entry of resize_observer_entry_array )
            {
                container_height = resize_observer_entry.contentRect.height;
                container_width = resize_observer_entry.contentRect.width;

                if ( container_width > 0 )
                {
                    container_height_aspect_ratio = Math.min( Math.max( container_height / container_width, minimum_aspect_ratio ), maximum_aspect_ratio );
                }
                else
                {
                    container_height_aspect_ratio = maximum_aspect_ratio;
                }

                if ( container_height > 0 )
                {
                    container_width_aspect_ratio = Math.min( Math.max( container_width / container_height, minimum_aspect_ratio ), maximum_aspect_ratio );
                }
                else
                {
                    container_width_aspect_ratio = maximum_aspect_ratio;
                }

                resize_observer_entry.target.style.setProperty( "--container-height", container_height + "px" );
                resize_observer_entry.target.style.setProperty( "--container-height-aspect-ratio", container_height_aspect_ratio );
                resize_observer_entry.target.style.setProperty( "--container-width", container_width + "px" );
                resize_observer_entry.target.style.setProperty( "--container-width-aspect-ratio", container_width_aspect_ratio );

                if ( called_function !== null )
                {
                    called_function(
                        resize_observer_entry.target,
                        resize_observer_entry,
                        resize_observer
                        );
                }
            }
        }
        );
}

// ~~

Array.prototype.AddResizeObserver = function(
    ...argument_array
    )
{
    var
        element,
        resize_observer;

    if ( argument_array.length > 0
         && argument_array[ 0 ] instanceof ResizeObserver )
    {
        resize_observer = argument_array[ 0 ];
    }
    else
    {
        resize_observer = CreateResizeObserver( ...argument_array );
    }

    for ( element of this )
    {
        resize_observer.observe( element );
    }

    return this;
}

// ~~

Array.prototype.RemoveResizeObserver = function(
    resize_observer
    )
{
    var
        element;

    for ( element of this )
    {
        resize_observer.unobserve( element );
    }

    return this;
}
