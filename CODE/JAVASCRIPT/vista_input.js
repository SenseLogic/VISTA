// -- TYPES

class VISTA_INPUT_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    HandleInputEvent(
        event
        )
    {
        this.Value = this.Element.value;
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "Id", "id_", "" );
        this.BindProperty( "Class", "class_", "" );
        this.BindProperty( "Name", "name_", "" );
        this.BindProperty( "Value", "value_", "" );
        this.BindProperty( "Placeholder", "placeholder_", "" );
        this.BindMethod( "HandleInputEvent" );

        this.SetTemplate(
            Text`
            <div>
                <input id="{: this.Id :}" class="{: this.Class :}" name="{: this.Name :}" value="{:% this.Value :}" placeholder="{:% this.Placeholder :}"/>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.Element = this.GetElement( "input" );
        this.Element.oninput = this.HandleInputEvent;
    }
}

// ~~

class VISTA_TEXT_INPUT_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    HandleInputEvent(
        event
        )
    {
        this.Value = this.Element.value;
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "Id", "id_", "" );
        this.BindProperty( "Class", "class_", "" );
        this.BindProperty( "Name", "name_", "" );
        this.BindProperty( "Value", "value_", "" );
        this.BindProperty( "Placeholder", "placeholder_", "" );
        this.BindMethod( "HandleInputEvent" );

        this.SetTemplate(
            Text`
            <div>
                <textarea id="{: this.Id :}" class="{: this.Class :}" name="{: this.Name :}" placeholder="{:% this.Placeholder :}">{:% this.Value :}</textarea>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.Element = this.GetElement( "textarea" );
        this.Element.oninput = this.HandleInputEvent;
    }
}

// ~~

class VISTA_MULTILINGUAL_INPUT_COMPONENT extends VISTA_COMPONENT
{
}

// ~~

class VISTA_MULTILINGUAL_TEXT_INPUT_COMPONENT extends VISTA_COMPONENT
{
}

// ~~

class VISTA_IMAGE_PATH_INPUT_COMPONENT extends VISTA_COMPONENT
{
}

// ~~

class VISTA_VIDEO_PATH_INPUT_COMPONENT extends VISTA_COMPONENT
{
}

// ~~

class VISTA_LIST_COMPONENT extends VISTA_COMPONENT
{
}

// ~~

class VISTA_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
}

// ~~

class VISTA_TEXT_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
}

// ~~

class VISTA_MULTILINGUAL_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
}

// ~~

class VISTA_MULTILINGUAL_TEXT_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
}

// ~~

class VISTA_IMAGE_PATH_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
}

// ~~

class VISTA_VIDEO_PATH_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
}

// -- STATEMENTS

DefineComponent( VISTA_INPUT_COMPONENT, "input-component", [ "value", "placeholder" ] );
DefineComponent( VISTA_TEXT_INPUT_COMPONENT, "text-input-component", [ "value", "placeholder" ] );
DefineComponent( VISTA_MULTILINGUAL_INPUT_COMPONENT, "multilingual-input-component", [ "value", "placeholder" ] );
DefineComponent( VISTA_MULTILINGUAL_TEXT_INPUT_COMPONENT, "multilingual-text-input-component", [ "value", "placeholder" ] );
DefineComponent( VISTA_IMAGE_PATH_INPUT_COMPONENT, "image-path-input-component", [ "value", "placeholder" ] );
DefineComponent( VISTA_VIDEO_PATH_INPUT_COMPONENT, "video-path-input-component", [ "value", "placeholder" ] );

DefineComponent( VISTA_INPUT_LIST_COMPONENT, "input-list-component", [ "value", "placeholder" ] );
DefineComponent( VISTA_TEXT_INPUT_LIST_COMPONENT, "text-input-list-component", [ "value", "placeholder" ] );
DefineComponent( VISTA_MULTILINGUAL_INPUT_LIST_COMPONENT, "multilingual-input-list-component", [ "value", "placeholder" ] );
DefineComponent( VISTA_MULTILINGUAL_TEXT_INPUT_LIST_COMPONENT, "multilingual-text-input-list-component", [ "value", "placeholder" ] );
DefineComponent( VISTA_IMAGE_PATH_INPUT_LIST_COMPONENT, "image-path-input-list-component", [ "value", "placeholder" ] );
DefineComponent( VISTA_VIDEO_PATH_INPUT_LIST_COMPONENT, "video-path-input-list-component", [ "value", "placeholder" ] );