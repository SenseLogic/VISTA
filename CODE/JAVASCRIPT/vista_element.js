// -- TYPES

class VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.WatcherArray = [];
        this.HasChanged = true;
    }

    // -- INQUIRIES

    FindWatcherIndex(
        watcher
        )
    {
        var
            watcher_index;

        for ( watcher_index = 0;
              watcher_index < this.WatcherArray.length;
              ++watcher_index )
        {
            if ( this.WatcherArray[ watcher_index ] === watcher )
            {
                return watcher_index;
            }
        }

        return -1;
    }

    // -- OPERATIONS

    AddWatcher(
        watcher
        )
    {
        if ( this.FindWatcherIndex( watcher ) < 0 )
        {
            this.WatcherArray.push( watcher );
        }
    }

    // ~~

    RemoveWatcher(
        watcher
        )
    {
        var
            watcher_index;

        watcher_index = this.FindWatcherIndex( watcher );

        if ( watcher_index >= 0 )
        {
            this.WatcherArray.splice( watcher_index, 1 );
        }
    }

    // ~~

    Watch(
        data
        )
    {
        data.AddWatcher( this );
    }

    // ~~

    Unwatch(
        data
        )
    {
        data.RemoveWatcher( this );
    }

    // ~~

    SetChanged(
        )
    {
        var
            watcher,
            document_has_changed;

        document_has_changed = ( DataHasChanged === false );
        DataHasChanged = true;
        this.HasChanged = true;

        for ( watcher of this.WatcherArray )
        {
            watcher.SetChanged();
        }

        if ( document_has_changed )
        {
            setInterval( UpdateChangedDocument, DocumentUpdateDelay * 1000.0 );
        }

    }

    // ~~

    SetUpdated(
        )
    {
        this.HasChanged = false;
    }
}

// ~~

class VISTA_ELEMENT extends HTMLElement
{
    // -- CONSTRUCTORS

    constructor(
        template_text = "",
        )
    {
        super();

        this.Data = new VISTA_DATA();
        this.PropertyMap = new Map();
        this.AttributeMap = new Map();
        this.EventArray = [];
        this.RootElement = this;
        this.TemplateFunction = null;
    }

    // -- INQUIRIES

    GetContent(
        )
    {
        return this.TemplateFunction();
    }

    // -- OPERATIONS

    SetProperty(
        property_name,
        value
        )
    {
        var
            attribute;

        attribute = this.AttributeMap.get( property_name );

        if ( attribute.EncodingFunction === undefined )
        {
            this.SetAttribute( attribute.Name, value );
        }
        else
        {
            this.SetAttribute( attribute.Name, attribute.EncodingFunction( value ) );
        }

        attribute.Owner[ property_name ] = value;

        if ( attribute.Watcher )
        {
            attribute.Watcher.SetChanged();
        }
    }

    // ~~

    BindProperty(
        property_owner,
        property_name,
        attribute_name,
        default_value = "",
        decoding_function = undefined,
        encoding_function = undefined,
        property_watcher = undefined
        )
    {
        if ( typeof default_value === "number"
             && decoding_function === undefined
             && encoding_function === undefined )
        {
            decoding_function = GetNumber;
            encoding_function = GetText;
        }

        if ( property_watcher === undefined
             && property_owner.SetChanged !== undefined )
        {
            property_watcher = property_owner;
        }

        this.PropertyMap.set(
            attribute_name,
            {
                Name : property_name,
                Owner : property_owner,
                Watcher : property_watcher,
                DecodingFunction : decoding_function
            }
            );

        this.AttributeMap.set(
            property_name,
            {
                Name : attribute_name,
                Owner : property_owner,
                Watcher : property_watcher,
                EncodingFunction : encoding_function
            }
            );

        if ( this.hasAttribute( attribute_name ) )
        {
            if ( decoding_function === undefined )
            {
                property_owner[ property_name ] = this.getAttribute( attribute_name );
            }
            else
            {
                property_owner[ property_name ] = decoding_function( this.getAttribute( attribute_name ) );
            }

            if ( property_watcher )
            {
                property_watcher.SetChanged();
            }
        }
        else
        {
            this.SetProperty( property_name, default_value );
        }
    }

    // ~~

    attributeChangedCallback(
        attribute_name,
        old_value,
        new_value
        )
    {
        var
            property;

        property = this.PropertyMap.get( attribute_name );

        if ( property !== undefined )
        {
            if ( property.DecodingFunction === undefined )
            {
                property.Owner[ property.Name ] = new_value;
            }
            else
            {
                property.Owner[ property.Name ] = property.DecodingFunction( new_value );
            }

            if ( property.Watcher )
            {
                property.Watcher.SetChanged();
            }
        }
    }

    // ~~

    BindMethod(
        method_owner,
        method_name
        )
    {
        method_owner[ method_name ] = method_owner[ method_name ].bind( method_owner );
    }

    // ~~

    BindEvent(
        element,
        event_name,
        called_function
        )
    {
        this.EventArray.push(
            {
                Element : element,
                Name : event_name,
                CalledFunction : called_function
            }
            );

        element.AddEventListener( event_name, called_function );
    }

    // ~~

    UnbindEvents(
        )
    {
        var
            event;

        for ( event of this.EventArray )
        {
            event.Element.RemoveEventListener( event.Name, event.CalledFunction );
        }

        this.EventArray = [];
    }

    // ~~

    AttachShadow(
        )
    {
        this.RootElement = this.attachShadow( { mode : "open" } );
    }

    // ~~

    SetTemplate(
        template_text
        )
    {
        var
            section_array,
            section_code,
            section_count,
            section_index,
            section_part_array,
            section_text,
            function_code;

        if ( template_text instanceof HTMLElement )
        {
            template_text = GetDecodedHtml( template_text.innerHTML );
        }

        section_array = template_text.split( "\r" ).join( "" ).split( "<:" );
        section_count = section_array.length;

        function_code = "() => {\nvar result = " + GetJsonText( section_array[ 0 ] ) + ";\n";

        for ( section_index = 1;
              section_index < section_count;
              ++section_index )
        {
            section_part_array = section_array[ section_index ].split( ":>" );
            section_code = section_part_array.shift();
            section_text = section_part_array.join( ":>" );

            if ( section_code.startsWith( "#" ) )
            {
                function_code += "result += " + section_code.substring( 1 ).trim() + ";\n";
            }
            else if ( section_code.startsWith( "%" ) )
            {
                function_code += "result += GetEncodedHtml( " +  section_code.substring( 1 ).trim() + " );\n";
            }
            else
            {
                function_code += section_code;
            }

            if ( section_text.length > 0 )
            {
                function_code += "result += " + GetJsonText( section_text ) + ";\n";
            }
        }

        function_code += "return result;\n}";

        function_code
            = function_code
                  .split( "<\\:" ).join( "<:" )
                  .split( ":\\>" ).join( ":>" )
                  .split( "<\\\\:" ).join( "<:" )
                  .split( ":\\\\>" ).join( ":>" );

        try
        {
            this.TemplateFunction = eval( function_code );
        }
        catch ( error )
        {
            Print( function_code );
            PrintError( error );
        }
    }

    // ~~

    InitializeElement(
        )
    {
    }

    // ~~

    UpdateContent(
        content = undefined
        )
    {
        if ( content === undefined )
        {
             content = this.GetContent()
        }

        this.RootElement.innerHTML = content;
        this.Data.SetUpdated();
    }

    // ~~

    UpdateElement(
        )
    {
        this.UnbindEvents();
        this.UpdateContent();
    }

    // ~~

    connectedCallback(
        )
    {
        this.InitializeElement();
        this.UpdateElement();
    }

    // ~~

    FinalizeElement(
        )
    {
        this.UnbindEvents();
    }

    // ~~

    disconnectedCallback(
        )
    {
        this.FinalizeElement();
    }
}

// -- VARIABLES

var
    DataHasChanged = false,
    DocumentUpdateDelay = 0.05;

// -- FUNCTIONS

function UpdateChangedElements(
    element
    )
{
    var
        child_element_count,
        child_element_index;

    if ( element.Data !== undefined
         && element.Data.HasChanged )
    {
        element.UpdateElement();
    }
    else
    {
        child_element_count = element.children.length;

        for ( child_element_index = 0;
              child_element_index < child_element_count;
              ++child_element_index )
        {
            UpdateChangedElements( element.children[ child_element_index ] );
        }
    }
}

// ~~

function UpdateChangedDocument(
    )
{
    if ( DataHasChanged )
    {
        UpdateChangedElements( document.body );

        DataHasChanged = false;
    }
}

// ~~

function DefineElement(
    element_class,
    element_tag,
    base_tag = undefined
    )
{
    if ( base_tag === undefined )
    {
        window.customElements.define( element_tag, element_class );
    }
    else
    {
        window.customElements.define( element_tag, element_class, { extends: base_tag } );
    }
}

// ~~

function PrintElement(
    element
    )
{
    if ( element )
    {
        Print(
            {
                tagName : element.tagName,
                nodeType : element.nodeType,
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
    else
    {
        Print( element );
    }
}

// ~~

function DumpElement(
    element
    )
{
    Dump( element );
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

HTMLElement.prototype.GetElementsByClasses = function(
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

HTMLElement.prototype.GetElementsByName = function(
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

HTMLElement.prototype.GetElement = HTMLElement.prototype.querySelector;


// ~~

ShadowRoot.prototype.GetElement = ShadowRoot.prototype.querySelector;

// ~~

function GetElements(
    element_selector
    )
{
    return Array.from( document.querySelectorAll( element_selector ) );
}

// ~~

HTMLElement.prototype.GetElements = function(
    element_selector
    )
{
    return Array.from( this.querySelectorAll( element_selector ) );
}

// ~~

ShadowRoot.prototype.GetElements = function(
    element_selector
    )
{
    return Array.from( this.querySelectorAll( element_selector ) );
}

// ~~

HTMLElement.prototype.GetAncestorElement = function(
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

HTMLElement.prototype.AddEventListener = HTMLElement.prototype.addEventListener;

// ~~

HTMLElement.prototype.RemoveEventListener = HTMLElement.prototype.removeEventListener;

// ~~

HTMLElement.prototype.HasAttribute = HTMLElement.prototype.hasAttribute;

// ~~

HTMLElement.prototype.GetAttribute = function(
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

Array.prototype.PrintElements = function(
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
                ancestor_element_array.push( ancestor_element );
            }
        }
    }

    return ancestor_element_array;
}

// ~~

Array.prototype.GetParentElements = function(
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
            parent_element_array.push( element.parentElement );
        }
    }

    return parent_element_array;
}

// ~~

Array.prototype.GetPrecedingElements = function(
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
                preceding_element_array.push( preceding_element );
            }
        }
    }

    return preceding_element_array;
}

// ~~

Array.prototype.GetPriorElements = function(
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
            prior_element_array.push( element.previousElementSibling );
        }
    }

    return prior_element_array;
}

// ~~

Array.prototype.GetNextElements = function(
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
            next_element_array.push( element.nextElementSibling );
        }
    }

    return next_element_array;
}

// ~~

Array.prototype.GetFollowingElements = function(
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
                following_element_array.push( following_element );
            }
        }
    }

    return following_element_array;
}

// ~~

Array.prototype.GetChildElements = function(
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
                child_element_array.push( child_element );
            }
        }
    }

    return child_element_array;
}

// ~~

Array.prototype.GetDescendantElements = function(
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
                descendant_element_array.push( descendant_element );
            }
        }
    }

    return descendant_element_array;
}

// ~~

Array.prototype.GetMatchingElements = function(
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
            matching_element_array.push( element );
        }
    }

    return matching_element_array;
}

// ~~

Array.prototype.GetElements = function(
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
            found_element_array.push( element );
        }

        found_element_list = element.querySelectorAll( element_selector );

        for ( found_element of found_element_list )
        {
            if ( found_element.nodeType == 1 )
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

Array.prototype.RemoveEventListener = function(
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
