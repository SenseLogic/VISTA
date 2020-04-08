// -- TYPES

class VISTA_ELEMENT extends HTMLElement
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        super();

        this.Data = {};
        this.RootElement = this;

        this.TemplateFunction = null;
        this.HasChanged = true;
    }

    // -- INQUIRIES

    HasShadow(
        )
    {
        return this.RootElement !== this;
    }

    // -- OPERATIONS

    AttachShadow(
        )
    {
        this.RootElement = this.attachShadow( { "mode", "open" } );
    }

    // ~~

    SetTemplate(
        template_text
        )
    {
        this.TemplateFunction = GetTemplateFunction( template_text );
    }

    // ~~

    Initialize(
        )
    {
    }

    // ~~

    connectedCallback(
        )
    {
        Initialize();
    }

    // ~~

    Finalize(
        )
    {
    }

    // ~~

    disconnectedCallback()
    {
        Finalize();
    }

    // ~~

    Invalidate(
        )
    {
        this.HasChanged = true;
    }

    // ~~

    ManageChangedAttribute(
        attribute,
        old_value,
        new_value
        )
    {
        this.HasChanged = true;
    }

    // ~~

    attributeChangedCallback(
        attribute_name,
        old_value,
        new_value
        )
    {
        ManageChangedAttribute(
            attribute,
            old_value,
            new_value
            );
    }

    // ~~

    MakeContent(
        )
    {
        return "";
    }

    // ~~

    SetContent(
        content
        )
    {
        this.ContentElement.innerHTML = content;
    }

    // ~~

    UpdateContent(
        )
    {
        SetContent( MakeContent() );

        this.HasChanged = false;
    }
}

// -- FUNCTIONS

function RegisterComponent(
    component_tag,
    component_class
    )
{
    window.customElements.define( component_tag, component_class );
}
