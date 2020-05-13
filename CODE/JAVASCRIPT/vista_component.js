// -- TYPES

class VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.WatcherArray = [];
        this.HasChanged = true;
        this.IsChangingWatchers = false;
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

        if ( !this.IsChangingWatchers )
        {
            this.IsChangingWatchers = true;

            for ( watcher of this.WatcherArray )
            {
                watcher.SetChanged();
            }

            this.IsChangingWatchers = false;
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
        this.IsChangingWatchers = false;
    }

    // ~~

    static ConstructObject(
        object,
        object_class
        )
    {
        object.WatcherArray = [];
        object.HasChanged = true;
        object.IsChangingWatchers = false;

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
        display_style = "block"
        )
    {
        var
            property;

        super();
        this.style[ "display" ] = display_style;

        VISTA_DATA.ConstructObject( this, VISTA_COMPONENT );

        this.PropertyMap = new Map();
        this.AttributeMap = new Map();
        this.EventArray = [];
        this.RootElement = this;
        this.TemplateFunction = null;
    }

    // -- INQUIRIES

    static get observedAttributes(
        )
    {
        return ComponentAttributeNameArray;
    }

    // ~~

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

    GetDescendantElement(
        element_selector
        )
    {
        return this.RootElement.querySelector( element_selector );
    }

    // ~~

    GetDescendantElements(
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
        attribute.Owner.SetChanged();
    }

    // ~~

    BindProperty(
        property_name,
        attribute_name,
        default_value = "",
        decoding_function = undefined,
        encoding_function = undefined
        )
    {
        if ( typeof default_value === "number"
             && decoding_function === undefined
             && encoding_function === undefined )
        {
            decoding_function = GetNumber;
            encoding_function = GetText;
        }

        this.PropertyMap.set(
            attribute_name,
            {
                Name : property_name,
                Owner : this,
                DecodingFunction : decoding_function
            }
            );

        this.AttributeMap.set(
            property_name,
            {
                Name : attribute_name,
                Owner : this,
                EncodingFunction : encoding_function
            }
            );

        if ( this.hasAttribute( attribute_name ) )
        {
            if ( decoding_function === undefined )
            {
                this[ property_name ] = this.getAttribute( attribute_name );
            }
            else
            {
                this[ property_name ] = decoding_function( this.getAttribute( attribute_name ) );
            }

            this.SetChanged();
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

            property.Owner.SetChanged();
        }
    }

    // ~~

    BindMethod(
        method_name
        )
    {
        this[ method_name ] = this[ method_name ].bind( this );
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
        excluded_element = undefined
        )
    {
        var
            event,
            event_array;

        event_array = [];

        for ( event of this.EventArray )
        {
            if ( event.Element === excluded_element )
            {
                event_array.push( event );
            }
            else
            {
                event.Element.RemoveEventListener( event.Name, event.CalledFunction );
            }
        }

        this.EventArray = event_array;
    }

    // ~~

    AttachShadow(
        )
    {
        this.RootElement = this.attachShadow( { mode : "open" } );
    }

    // ~~

    ProcessTemplateFilters(
        text
        )
    {
        var
            template_filter,
            template_filter_name;

        for ( template_filter_name of TemplateFilterMap.keys() )
        {
            if ( text.endsWith( template_filter_name ) )
            {
                template_filter = TemplateFilterMap.get( template_filter_name );

                text = text.slice( 0, text.length - template_filter_name.length ).trim();
                return template_filter( this.ProcessTemplateFilters( text ) );
            }
        }

        return eval( text );
    }

    // ~~

    ProcessTemplateConstants(
        template_text
        )
    {
        var
            old_template_text,
            section_array,
            section_code,
            section_index,
            section_part_array,
            section_text,
            template_constant_name;

        old_template_text = "";

        while ( template_text.indexOf( "(:" ) >= 0
                && template_text !== old_template_text )
        {
            old_template_text = template_text;
            section_array = template_text.split( "(:" );

            for ( section_index = 1;
                  section_index < section_array.length;
                  ++section_index )
            {
                section_part_array = section_array[ section_index ].split( ":)" );

                if ( section_part_array.length >= 2 )
                {
                    section_code = section_part_array.shift().trim();
                    section_text = section_part_array.join( ":)" );

                    if ( TemplateConstantMap.has( section_code ) )
                    {
                        section_code = TemplateConstantMap.get( section_code );
                    }
                    else
                    {
                        section_code = this.ProcessTemplateFilters( section_code );
                    }

                    section_array[ section_index ] = section_code + section_text;
                }
                else
                {
                    section_array[ section_index ] = "(:" + section_array[ section_index ];
                }
            }

            template_text = section_array.join( "" );
        }

        return (
            template_text
                .ReplaceText( "(\\:", "(:" )
                .ReplaceText( ":\\)", ":)" )
            );
    }

    // ~~

    ProcessTemplateStyle(
        template_text
        )
    {
        var
            brace_level,
            line,
            line_array,
            line_index,
            section_array,
            section_index,
            section_part_array,
            selector_text,
            trimmed_line;

        if ( template_text.indexOf( "@media " ) >= 0 )
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

    ProcessTemplate(
        template_text
        )
    {
        return (
            this.ProcessTemplateStyle(
                this.ProcessTemplateConstants(
                    template_text.ReplaceText( "\r", "" )
                    )
                )
            );
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
                  .ReplaceText( "<\\:", "<:" )
                  .ReplaceText( ":\\>", ":>" )
                  .ReplaceText( "<\\\\:", "<:" )
                  .ReplaceText( ":\\\\>", ":>" );

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
             content = this.GetContent();
        }

        this.RootElement.innerHTML = content;
        this.SetUpdated();
    }

    // ~~

    UpdateComponent(
        )
    {
        this.UnbindEvents( this );
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
    ComponentAttributeNameArray = [],
    ComponentHasChanged = false,
    ComponentUpdateDelay = 0.05,
    TemplateConstantMap = new Map(),
    TemplateFilterMap = new Map();

// -- FUNCTIONS

function SetComponentUpdateDelay(
    component_update_delay
    )
{
    ComponentUpdateDelay = component_update_delay;
}

// ~~

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
    component_attribute_name_array = [],
    base_tag = undefined
    )
{
    ComponentAttributeNameArray = component_attribute_name_array;

    if ( base_tag === undefined )
    {
        window.customElements.define( component_tag, component_class );
    }
    else
    {
        window.customElements.define( component_tag, component_class, { extends: base_tag } );
    }

    ComponentAttributeNameArray = [];
}

// ~~

function DefineTemplateConstant(
    template_constant_name,
    template_constant
    )
{
    TemplateConstantMap.set( template_constant_name, template_constant );
}

// ~~

function DefineTemplateFilter(
    template_filter_name,
    template_filter
    )
{
    TemplateFilterMap.set( template_filter_name, template_filter );
}
