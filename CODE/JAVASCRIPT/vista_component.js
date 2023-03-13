// -- TYPES

class VISTA_COMPONENT extends HTMLElement
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        super();

        this.WatcherArray = [];
        this.HasChanged = false;
        this.IsChangingWatchers = false;
        this.Identifier = ++ComponentIdentifier;
        this.Scope = "component-" + this.Identifier + "-scope";
        this.Host = "";
        this.PropertyMap = new Map();
        this.AttributeMap = new Map();
        this.EventArray = [];
        this.RootElement = this;
        this.TemplateConstantMap = new Map();
        this.TemplateConstantMap.SetValue( "scope", this.Scope );
        this.TemplateFunction = undefined;
        this.IsLateUpdated = false;
        this.MaintainsState = false;

        VISTA_COMPONENT.prototype.GetWatcherIndex = VISTA_DATA.prototype.GetWatcherIndex;
        VISTA_COMPONENT.prototype.AddWatcher = VISTA_DATA.prototype.AddWatcher;
        VISTA_COMPONENT.prototype.RemoveWatcher = VISTA_DATA.prototype.RemoveWatcher;
        VISTA_COMPONENT.prototype.WatchData = VISTA_DATA.prototype.WatchData;
        VISTA_COMPONENT.prototype.UnwatchData = VISTA_DATA.prototype.UnwatchData;
        VISTA_COMPONENT.prototype.ChangeWatchers = VISTA_DATA.prototype.ChangeWatchers;
        VISTA_COMPONENT.prototype.SetUpdated = VISTA_DATA.prototype.SetUpdated;
        VISTA_COMPONENT.prototype.GetTemplateFunction = VISTA_DATA.prototype.GetTemplateFunction;
    }

    // -- INQUIRIES

    static get observedAttributes(
        )
    {
        return ComponentAttributeNameArray;
    }

    // ~~

    GetAttribute(
        attribute_name,
        default_value = "",
        decoding_function = undefined
        )
    {
        if ( typeof default_value === "number"
             && decoding_function === undefined )
        {
            decoding_function = GetNumber;
        }

        if ( this.hasAttribute( attribute_name ) )
        {
            if ( decoding_function === undefined )
            {
                return this.getAttribute( attribute_name );
            }
            else
            {
                return decoding_function( this.getAttribute( attribute_name ) );
            }
        }
        else
        {
            return default_value;
        }
    }

    // ~~

    GetContent(
        )
    {
        return this.TemplateFunction();
    }

    // ~~

    GetSelector(
        element_selector
        )
    {
        return (
            element_selector
                .ReplaceText( "{:scope:}", this.Scope )
                .ReplaceText( "{:host:}", this.Host )
            );
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
            return element_array.AddFirstValue( this );
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

    SetChanged(
        )
    {
        var
            it_has_changed;

        it_has_changed = this.HasChanged;

        this.HasChanged = true;
        this.ChangeWatchers();

        if ( !it_has_changed
             && ComponentUpdateCall === null )
        {
            ComponentUpdateCall = DelayCall( UpdateComponents, ComponentUpdateDelay );
        }
    }

    // ~~

    BindShadow(
        )
    {
        this.RootElement = this.attachShadow( { mode : "open" } );
        this.Host = ":host";
        this.TemplateConstantMap.SetValue( "host", ":host" );
    }

    // ~~

    BindStyle(
        )
    {
        this.classList.add( this.Scope );
        this.Host = "." + this.Scope;
        this.TemplateConstantMap.SetValue( "host", this.Host );
    }

    // ~~

    SetProperty(
        property_name,
        value
        )
    {
        var
            attribute;

        attribute = this.AttributeMap.GetValue( property_name );

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
        if ( typeof default_value === "boolean"
             && decoding_function === undefined
             && encoding_function === undefined )
        {
            decoding_function = GetBooleanProperty;
            encoding_function = GetBooleanText;
        }
        else if ( typeof default_value === "number"
             && decoding_function === undefined
             && encoding_function === undefined )
        {
            decoding_function = GetNumber;
            encoding_function = GetText;
        }

        this.PropertyMap.SetValue(
            attribute_name,
            {
                Name : property_name,
                Owner : this,
                DecodingFunction : decoding_function
            }
            );

        this.AttributeMap.SetValue(
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

        property = this.PropertyMap.GetValue( attribute_name );

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
            this.EventArray.AddLastValue(
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
                this.EventArray.AddLastValue(
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
                event_array.AddLastValue( event );
            }
            else
            {
                event.Element.RemoveEventListener( event.Name, event.CalledFunction );
            }
        }

        this.EventArray = event_array;
    }

    // ~~

    DefineTemplateConstant(
        template_constant_name,
        template_constant
        )
    {
        this.TemplateConstantMap.SetValue( template_constant_name, template_constant );
    }

    // ~~

    ProcessTemplateProcessors(
        text
        )
    {
        var
            template_processor,
            template_processor_name;

        for ( template_processor_name of TemplateProcessorMap.keys() )
        {
            if ( text.endsWith( template_processor_name ) )
            {
                template_processor = TemplateProcessorMap.GetValue( template_processor_name );

                text = text.slice( 0, text.length - template_processor_name.length ).Trim();
                return template_processor( this.ProcessTemplateProcessors( text ) );
            }
        }

        return eval( text );
    }

    // ~~

    ProcessTemplateExpressions(
        template_text
        )
    {
        var
            iteration_index,
            section_array,
            section_code,
            section_code_is_escaped,
            section_index,
            section_part_array,
            section_text;

        iteration_index = 0;

        while ( template_text.indexOf( "{:" ) >= 0 )
        {
            section_array = template_text.Split( "{:" );

            for ( section_index = 1;
                  section_index < section_array.length;
                  ++section_index )
            {
                section_part_array = section_array[ section_index ].Split( ":}" );

                if ( section_part_array.length >= 2 )
                {
                    section_code = section_part_array.RemoveFirstValue();
                    section_code_is_escaped = section_code.startsWith( "%" );

                    if ( section_code_is_escaped )
                    {
                        section_code = section_code.substring( 2 );
                    }

                    section_code = section_code.Trim();
                    section_text = section_part_array.Join( ":}" );

                    if ( this.TemplateConstantMap.HasKey( section_code ) )
                    {
                        section_code = this.TemplateConstantMap.GetValue( section_code );
                    }
                    else if ( TemplateConstantMap.HasKey( section_code ) )
                    {
                        section_code = TemplateConstantMap.GetValue( section_code );
                    }
                    else
                    {
                        section_code = this.ProcessTemplateProcessors( section_code );
                    }

                    if ( section_code_is_escaped )
                    {
                        section_code = GetEscapedHtml( section_code );
                    }

                    section_array[ section_index ] = section_code + section_text;
                }
                else
                {
                    section_array[ section_index ] = "{:" + section_array[ section_index ];
                }
            }

            template_text = section_array.Join( "" );
            ++iteration_index;

            if ( iteration_index === 100 )
            {
                PrintError( "Invalid template expression:", template_text.substring( template_text.indexOf( "{:" ) ) );

                break;
            }
        }

        return (
            template_text
                .ReplaceText( "{\\:", "{:" )
                .ReplaceText( ":\\}", ":}" )
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
            section_array = template_text.Split( "<style>\n" );

            for ( section_index = 1;
                  section_index < section_array.length;
                  ++section_index )
            {
                section_part_array = section_array[ section_index ].Split( "</style>\n" );
                line_array = section_part_array[ 0 ].Split( "\n" );
                brace_level = 0;
                selector_text = "";

                for ( line_index = 0;
                      line_index < line_array.length;
                      ++line_index )
                {
                    line = line_array[ line_index ];
                    trimmed_line = line.Trim();

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

                section_part_array[ 0 ] = line_array.Join( "\n" );
                section_array[ section_index ] = section_part_array.Join( "</style>\n" );
            }

            template_text = section_array.Join( "<style>\n" );
        }

        return template_text;
    }

    // ~~

    SetTemplate(
        template_text
        )
    {
        if ( template_text instanceof HTMLElement )
        {
            template_text = GetDecodedHtml( template_text.innerHTML );
        }

        template_text
            = this.ProcessTemplateStyle(
                  this.ProcessTemplateExpressions(
                      template_text.ReplaceText( "\r", "" )
                      )
                  );

        this.TemplateFunction = this.GetTemplateFunction( template_text );
    }

    // ~~

    InitializeComponent(
        )
    {
    }

    // ~~

    StoreInputState(
        new_element,
        old_element
        )
    {
        var
            child_element_index;

        if ( new_element.tagName === old_element.tagName )
        {
            if ( old_element === document.activeElement )
            {
                new_element.HasFocus = true;
            }

            if ( new_element.children.length === old_element.children.length )
            {
                for ( child_element_index = 0;
                      child_element_index < new_element.children.length;
                      ++child_element_index )
                {
                    this.StoreInputState(
                        new_element.children[ child_element_index ],
                        old_element.children[ child_element_index ]
                        );
                }
            }
        }
    }

    // ~~

    CopyInputState(
        new_element,
        old_element
        )
    {
        var
            child_element_index;

        if ( new_element.tagName === old_element.tagName )
        {
            if ( old_element.HasFocus === true )
            {
                new_element.focus();
                new_element.HasFocus = false;
                old_element.HasFocus = false;
            }

            if ( new_element.tagName === 'input'
                 || new_element.tagName === 'textarea'
                 || new_element.tagName === 'select' )
            {
                new_element.value = old_element.value;
            }

            if ( new_element.children.length === old_element.children.length )
            {
                for ( child_element_index = 0;
                      child_element_index < new_element.children.length;
                      ++child_element_index )
                {
                    this.CopyInputState(
                        new_element.children[ child_element_index ],
                        old_element.children[ child_element_index ]
                        );
                }
            }
        }
    }

    // ~~

    UpdateContent(
        content = undefined
        )
    {
        var
            root_element;

        if ( content === undefined )
        {
             content = this.GetContent();
        }

        if ( this.MaintainsState )
        {
            root_element = this.RootElement.cloneNode( true );
            this.StoreInputState( root_element, this.RootElement );
            this.RootElement.innerHTML = content;
            this.CopyInputState( this.RootElement, root_element );
        }
        else
        {
            this.RootElement.innerHTML = content;
        }

        this.SetUpdated();
    }

    // ~~

    PreUpdateComponent(
        )
    {
    }

    // ~~

    UpdateComponent(
        )
    {
        this.UnbindEvents( this );
        this.UpdateContent();
    }

    // ~~

    PostUpdateComponent(
        )
    {
    }

    // ~~

    LateUpdateComponent(
        )
    {
    }

    // ~~

    connectedCallback(
        )
    {
        this.InitializeComponent();
        this.PreUpdateComponent();
        this.UpdateComponent();
        this.PostUpdateComponent();

        if ( this.IsLateUpdated )
        {
            setTimeout(
                () => this.LateUpdateComponent()
                );
        }
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
    ComponentIdentifier = -1,
    ComponentAttributeNameArray = [],
    ComponentUpdateDelay = 0.05,
    ComponentUpdateCall = null,
    TemplateConstantMap = new Map(),
    TemplateProcessorMap = new Map();

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
        element.PreUpdateComponent();
        element.UpdateComponent();
        element.PostUpdateComponent();
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
    ComponentUpdateCall = null;

    UpdateComponent( document.body );
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
    TemplateConstantMap.SetValue( template_constant_name, template_constant );
}

// ~~

function DefineTemplateProcessor(
    template_processor_name,
    template_processor
    )
{
    TemplateProcessorMap.SetValue( template_processor_name, template_processor );
}
