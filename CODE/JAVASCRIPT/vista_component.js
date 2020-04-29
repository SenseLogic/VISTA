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
            document_has_changed;

        document_has_changed = ( DataHasChanged === false );
        DataHasChanged = true;
        this.HasChanged = true;

        if ( !this.HasChangedWatchers )
        {
            this.HasChangedWatchers = true;

            for ( watcher of this.WatcherArray )
            {
                watcher.SetChanged();
            }
        }

        if ( document_has_changed )
        {
            setInterval( UpdateDocument, DocumentUpdateDelay * 1000.0 );
        }

    }

    // ~~

    SetUpdated(
        )
    {
        this.HasChanged = false;
        this.HasChangedWatchers = false;
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
             && property_owner instanceof VISTA_DATA )
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
        this.Data.SetUpdated();
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
    DataHasChanged = false,
    DocumentUpdateDelay = 0.05;

// -- FUNCTIONS

function UpdateComponents(
    element
    )
{
    var
        child_element_count,
        child_element_index;

    if ( element.Data !== undefined
         && element.Data.HasChanged )
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
            UpdateComponents( element.children[ child_element_index ] );
        }
    }
}

// ~~

function UpdateDocument(
    )
{
    if ( DataHasChanged )
    {
        UpdateComponents( document.body );

        DataHasChanged = false;
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

