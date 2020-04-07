// -- TYPES

class COMPONENT extends HTMLElement
{
    // -- CONSTRUCTORS

    constructor(
        template_element = null
        )
    {
        super();

        this.Data = {};
        this.RootElement = this.attachShadow( { "mode", "open" } );
        this.ContentElement = null;
        this.HasChanged = true;

        if ( template_element !== null )
        {
            this.ContentElement = template_element.content.cloneNode( true );
            this.RootElement.appendChild( this.ContentElement );
        }
    }

    // -- OPERATIONS

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

    ManageChangedAttribute(
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

    RequestUpdate(
        )
    {
        this.HasChanged = true;
    }

    // ~~

    Update(
        )
    {
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
