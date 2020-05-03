// -- TYPES

class VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.WatcherArray = [];
        this.HasChanged = true;
        this.HasChangedWatchers = false;
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

    WatchData(
        data
        )
    {
        data.AddWatcher( this );
    }

    // ~~

    UnwatchData(
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
            update_is_required;

        update_is_required = ( ComponentHasChanged === false );
        ComponentHasChanged = true;
        this.HasChanged = true;

        if ( !this.HasChangedWatchers )
        {
            this.HasChangedWatchers = true;

            for ( watcher of this.WatcherArray )
            {
                watcher.SetChanged();
            }
        }

        if ( update_is_required )
        {
            DelayCall( UpdateComponents, ComponentUpdateDelay );
        }

    }

    // ~~

    SetUpdated(
        )
    {
        this.HasChanged = false;
        this.HasChangedWatchers = false;
    }

    // ~~

    static ConstructObject(
        object,
        object_class
        )
    {
        object.WatcherArray = [];
        object.HasChanged = true;
        object.HasChangedWatchers = false;

        object_class.prototype.FindWatcherIndex = VISTA_DATA.prototype.FindWatcherIndex;
        object_class.prototype.AddWatcher = VISTA_DATA.prototype.AddWatcher;
        object_class.prototype.RemoveWatcher = VISTA_DATA.prototype.RemoveWatcher;
        object_class.prototype.WatchData = VISTA_DATA.prototype.WatchData;
        object_class.prototype.UnwatchData = VISTA_DATA.prototype.UnwatchData;
        object_class.prototype.SetChanged = VISTA_DATA.prototype.SetChanged;
        object_class.prototype.SetUpdated = VISTA_DATA.prototype.SetUpdated;
    }
}

// ~~

class VISTA_COMPONENT extends HTMLElement
{
    // -- CONSTRUCTORS

    constructor(
        template_text = "",
        )
    {
        var
            property;

        super();

        VISTA_DATA.ConstructObject( this, VISTA_COMPONENT );

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

    // ~~

    GetElement(
        element_selector
        )
    {
        if ( this.matches( element_selector ) )
        {
            return this;
        }
        else
        {
            return this.RootElement.querySelector( element_selector );
        }
    }

    // ~~

    GetElements(
        element_selector
        )
    {
        var
            element_array;

        element_array = Array.from( this.RootElement.querySelectorAll( element_selector ) );

        if ( this.matches( element_selector ) )
        {
            return element_array.unshift( this );
        }

        return element_array;
    }

    // ~~

    GetSubElement(
        element_selector
        )
    {
        return this.RootElement.querySelector( element_selector );
    }

    // ~~

    GetSubElements(
        element_selector
        )
    {
        return Array.from( this.RootElement.querySelectorAll( element_selector ) );
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
             && ( property_owner instanceof VISTA_DATA
                  || property_owner instanceof VISTA_COMPONENT ) )
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
        element_array,
        event_name,
        called_function
        )
    {
        var
            element;

        if ( element_array instanceof HTMLElement )
        {
            this.EventArray.push(
                {
                    Element : element_array,
                    Name : event_name,
                    CalledFunction : called_function
                }
                );

            element_array.AddEventListener( event_name, called_function );
        }
        else
        {
            for ( element of element_array )
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
        }
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

    ProcessTemplate(
        template_text
        )
    {
        var
            brace_level,
            line,
            line_array,
            line_index,
            media_query_name,
            section_array,
            section_index,
            section_part_array,
            selector_text,
            trimmed_line;

        template_text = template_text.split( "\r" ).join( "" );

        if ( MediaQueryMap.size > 0
             && template_text.indexOf( "@media " ) >= 0 )
        {
            section_array = template_text.split( "<style>\n" );

            for ( section_index = 1;
                  section_index < section_array.length;
                  ++section_index )
            {
                section_part_array = section_array[ section_index ].split( "</style>\n" );
                line_array = section_part_array[ 0 ].split( "\n" );
                brace_level = 0;
                selector_text = "";

                for ( line_index = 0;
                      line_index < line_array.length;
                      ++line_index )
                {
                    line = line_array[ line_index ];
                    trimmed_line = line.trim();

                    if ( trimmed_line.HasSuffix( "{" ) )
                    {
                        ++brace_level;
                    }
                    else if ( trimmed_line.HasPrefix( "}" ) )
                    {
                        --brace_level;

                        if ( brace_level === 0 )
                        {
                            selector_text = "";
                        }
                    }
                    else if ( trimmed_line.HasPrefix( "@media " ) )
                    {
                        trimmed_line = trimmed_line.slice( 6 );

                        for ( media_query_name of MediaQueryMap.keys() )
                        {
                            trimmed_line = trimmed_line.split( media_query_name ).join( MediaQueryMap.get( media_query_name ) );
                        }

                        if ( brace_level === 0 )
                        {
                            line_array[ line_index ] = "@media" + trimmed_line;
                        }
                        else
                        {
                            line_array[ line_index ] = "}\n\n@media" + trimmed_line + "\n{\n    " + selector_text;
                        }
                    }
                    else if ( brace_level === 0 )
                    {
                        if ( trimmed_line === ""
                             || trimmed_line.HasSuffix( "*/" ) )
                        {
                            selector_text = "";
                        }
                        else if ( selector_text === "" )
                        {
                            selector_text = trimmed_line;
                        }
                        else
                        {
                            selector_text += "\n" + trimmed_line;
                        }
                    }
                }

                section_part_array[ 0 ] = line_array.join( "\n" );
                section_array[ section_index ] = section_part_array.join( "</style>\n" );
            }

            template_text = section_array.join( "<style>\n" );
        }

        return template_text;
    }

    // ~~

    SetTemplate(
        template_text
        )
    {
        var
            section_array,
            section_code,
            section_index,
            section_part_array,
            section_text,
            function_code;

        if ( template_text instanceof HTMLElement )
        {
            template_text = GetDecodedHtml( template_text.innerHTML );
        }

        template_text = this.ProcessTemplate( template_text );

        section_array = template_text.split( "<:" );

        function_code = "() => {\nvar result = " + GetJsonText( section_array[ 0 ] ) + ";\n";

        for ( section_index = 1;
              section_index < section_array.length;
              ++section_index )
        {
            section_part_array = section_array[ section_index ].split( ":>" );
            section_code = section_part_array.shift();
            section_text = section_part_array.join( ":>" );

            if ( section_code.HasPrefix( "#" ) )
            {
                function_code += "result += " + section_code.substring( 1 ).trim() + ";\n";
            }
            else if ( section_code.HasPrefix( "%" ) )
            {
                function_code += "result += GetEscapedHtml( " +  section_code.substring( 1 ).trim() + " );\n";
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
            PrintError( error, function_code );
        }
    }

    // ~~

    InitializeComponent(
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
        this.SetUpdated();
    }

    // ~~

    UpdateComponent(
        )
    {
        this.UnbindEvents();
        this.UpdateContent();
    }

    // ~~

    connectedCallback(
        )
    {
        this.InitializeComponent();
        this.UpdateComponent();
    }

    // ~~

    FinalizeComponent(
        )
    {
        this.UnbindEvents();
    }

    // ~~

    disconnectedCallback(
        )
    {
        this.FinalizeComponent();
    }
}

// -- VARIABLES

var
    ComponentHasChanged = false,
    ComponentUpdateDelay = 0.05,
    MediaQueryMap = new Map();

// -- FUNCTIONS

function UpdateComponent(
    element
    )
{
    var
        child_element_count,
        child_element_index;

    if ( element.HasChanged === true )
    {
        element.UpdateComponent();
    }
    else
    {
        child_element_count = element.children.length;

        for ( child_element_index = 0;
              child_element_index < child_element_count;
              ++child_element_index )
        {
            UpdateComponent( element.children[ child_element_index ] );
        }
    }
}

// ~~

function UpdateComponents(
    )
{
    if ( ComponentHasChanged )
    {
        UpdateComponent( document.body );

        ComponentHasChanged = false;
    }
}

// ~~

function DefineComponent(
    component_class,
    component_tag,
    base_tag = undefined
    )
{
    if ( base_tag === undefined )
    {
        window.customElements.define( component_tag, component_class );
    }
    else
    {
        window.customElements.define( component_tag, component_class, { extends: base_tag } );
    }
}

// ~~

function DefineMediaQueries(
    media_query_map
    )
{
    for ( media_query_name in media_query_map )
    {
        MediaQueryMap.set( media_query_name, media_query_map[ media_query_name ] );
    }
}

// -- STATEMENTS

DefineMediaQueries(
    {
        "below-20em" : "(max-width: 19.98em)",
        "below-30em" : "(max-width: 29.98em)",
        "below-40em" : "(max-width: 39.98em)",
        "below-50em" : "(max-width: 49.98em)",
        "below-60em" : "(max-width: 59.98em)",
        "below-70em" : "(max-width: 69.98em)",
        "below-80em" : "(max-width: 79.98em)",
        "below-90em" : "(max-width: 89.98em)",
        "below-100em" : "(max-width: 99.98em)",
        "below-110em" : "(max-width: 109.98em)",
        "below-120em" : "(max-width: 119.98em)",
        "above-20em" : "(min-width: 20em)",
        "above-30em" : "(min-width: 30em)",
        "above-40em" : "(min-width: 40em)",
        "above-50em" : "(min-width: 50em)",
        "above-60em" : "(min-width: 60em)",
        "above-70em" : "(min-width: 70em)",
        "above-80em" : "(min-width: 80em)",
        "above-90em" : "(min-width: 90em)",
        "above-100em" : "(min-width: 100em)",
        "above-110em" : "(min-width: 110em)",
        "above-120em" : "(min-width: 120em)"
    }
    );
