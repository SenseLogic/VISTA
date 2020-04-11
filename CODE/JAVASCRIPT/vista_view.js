// -- TYPES

class VISTA_ELEMENT extends HTMLElement
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        super();

        this.State = {};
        this.RootElement = this;
        this.ShadowRootElement = null;
        this.TemplateFunction = null;
        this.HasChanged = true;
    }

    // -- INQUIRIES

    HasShadowRootElement(
        )
    {
        return this.ShadowRootElement === null;
    }

    // -- OPERATIONS

    AttachShadowRootElement(
        )
    {
        this.ShadowRootElement = this.attachShadow( { "mode", "open" } );
    }

    // ~~

    SetTemplate(
        template_text
        )
    {
        this.TemplateFunction = GetTemplateFunction( template_text );
    }

    // ~~

    OnMounted(
        )
    {
    }

    // ~~

    connectedCallback(
        )
    {
        OnMounted();
    }

    // ~~

    OnUnmounted(
        )
    {
    }

    // ~~

    disconnectedCallback()
    {
        OnUnmounted();
    }

    // ~~

    Invalidate(
        )
    {
        this.HasChanged = true;
    }

    // ~~

    OnAttributeChanged(
        attribute,
        old_value,
        new_value
        )
    {
    }

    // ~~

    attributeChangedCallback(
        attribute_name,
        old_value,
        new_value
        )
    {
        OnAttributeChanged(
            attribute,
            old_value,
            new_value
            );
    }

    // ~~

    GetContent(
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
        SetContent( GetContent() );

        this.HasChanged = false;
    }
}

// -- FUNCTIONS

function RegisterTag(
    tag,
    element_class
    )
{
    window.customElements.define( tag, element_class );
}
