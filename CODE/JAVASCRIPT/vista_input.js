// -- TYPES

class VISTA_INPUT_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    HandleInputEvent(
        event
        )
    {
        this.Value = this.InputElement.value;
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
        this.BindProperty( "Readonly", "readonly_", null );
        this.BindMethod( "HandleInputEvent" );
console.log( this.Readonly );
        this.SetTemplate(
            Text`
            <div>
                <input id="<:# this.Id :>" class="<:# this.Class :>" name="<:# this.Name :>" placeholder="<:% this.Placeholder :>" <:# this.Readonly !== null ? "readonly" : "" :>/>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.InputElement = this.GetElement( "input" );
        this.InputElement.value = this.Value;
        this.InputElement.oninput = this.HandleInputEvent;
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
        this.Value = this.InputElement.value;
        this.InputElement.SetContentHeight();
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
        this.BindProperty( "Readonly", "readonly_", null );
        this.BindMethod( "HandleInputEvent" );

        this.SetTemplate(
            Text`
            <div>
                <textarea id="<:# this.Id :>" class="<:# this.Class :>" name="<:# this.Name :>" placeholder="<:% this.Placeholder :>" <:# this.Readonly !== null ? "readonly" : "" :>></textarea>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.InputElement = this.GetElement( "textarea" );
        this.InputElement.value = this.Value;
        this.InputElement.SetContentHeight();
        this.InputElement.oninput = this.HandleInputEvent;
    }
}

// ~~

class VISTA_MULTILINGUAL_INPUT_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    UpdateTranslationArray(
        )
    {
        var
            language_code_index;

        this.Value = this.InputElement.value;
        this.TranslationArray = this.Value.GetTranslatedTextArray( this.LanguageCodeArray );

        for ( language_code_index = 0;
              language_code_index < this.TranslationArray.length;
              ++language_code_index )
        {
            this.TranslationInputElementArray[ language_code_index ].value
                = this.TranslationArray[ language_code_index ];
        }
    }

    // ~~

    UpdateValue(
        )
    {
        var
            language_code_index;

        for ( language_code_index = 0;
              language_code_index < this.TranslationArray.length;
              ++language_code_index )
        {
            this.TranslationArray[ language_code_index ]
                = this.TranslationInputElementArray[ language_code_index ].value;
        }

        this.Value = this.TranslationArray.GetMultilingualText( this.LanguageCodeArray );
        this.InputElement.value = this.Value;
    }

    // ~~

    HandleInputEvent(
        event
        )
    {
        this.UpdateValue();
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
        this.BindProperty( "Languages", "languages", "en" );
        this.BindProperty( "Readonly", "readonly_", null );
        this.BindMethod( "HandleInputEvent" );

        this.LanguageCodeArray = this.Languages.split( "," );
        this.TranslationArray = this.Value.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate(
            Text`
            <div>
                <input id="<:# this.Id :>" class="<:# this.Class :>" name="<:# this.Name :>" placeholder="<:% this.Placeholder :>" <:# this.Readonly !== null ? "readonly" : "" :> hidden/>
                <: for ( let language_code of this.LanguageCodeArray ) { :>
                    <input class="<:# this.Class :> is-translation" value="" placeholder="<:# language_code :>" <:# this.Readonly !== null ? "readonly" : "" :>/>
                <: } :>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        var
            translation_input_element;

        this.InputElement = this.GetElement( "input" );
        this.InputElement.value = this.Value;
        this.TranslationInputElementArray = this.GetElements( ".is-translation" );
        this.UpdateTranslationArray();

        for ( translation_input_element of this.TranslationInputElementArray )
        {
            translation_input_element.oninput = this.HandleInputEvent;
        }
    }
}

// ~~

class VISTA_MULTILINGUAL_TEXT_INPUT_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    UpdateTranslationArray(
        )
    {
        var
            language_code_index;

        this.Value = this.InputElement.value;
        this.TranslationArray = this.Value.GetTranslatedTextArray( this.LanguageCodeArray );

        for ( language_code_index = 0;
              language_code_index < this.TranslationArray.length;
              ++language_code_index )
        {
            this.TranslationInputElementArray[ language_code_index ].value
                = this.TranslationArray[ language_code_index ];
        }
    }

    // ~~

    UpdateValue(
        )
    {
        var
            language_code_index;

        for ( language_code_index = 0;
              language_code_index < this.TranslationArray.length;
              ++language_code_index )
        {
            this.TranslationInputElementArray[ language_code_index ].SetContentHeight();

            this.TranslationArray[ language_code_index ]
                = this.TranslationInputElementArray[ language_code_index ].value;
        }

        this.Value = this.TranslationArray.GetMultilingualText( this.LanguageCodeArray );
        this.InputElement.value = this.Value;
        this.InputElement.SetContentHeight();
    }

    // ~~

    HandleInputEvent(
        event
        )
    {
        this.UpdateValue();
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
        this.BindProperty( "Languages", "languages", "en" );
        this.BindProperty( "Readonly", "readonly_", null );
        this.BindMethod( "HandleInputEvent" );

        this.LanguageCodeArray = this.Languages.split( "," );
        this.TranslationArray = this.Value.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate(
            Text`
            <div>
                <textarea id="<:# this.Id :>" class="<:# this.Class :>" name="<:# this.Name :>" placeholder="<:% this.Placeholder :>" <:# this.Readonly !== null ? "readonly" : "" :> hidden/><:% this.Value :></textarea>
                <: for ( let language_code of this.LanguageCodeArray ) { :>
                    <textarea class="<:# this.Class :> is-translation" value="" placeholder="<:# language_code :>" <:# this.Readonly !== null ? "readonly" : "" :>></textarea>
                <: } :>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        var
            translation_input_element;

        this.InputElement = this.GetElement( "textarea" );
        this.InputElement.value = this.Value;
        this.InputElement.SetContentHeight();
        this.TranslationInputElementArray = this.GetElements( ".is-translation" );
        this.UpdateTranslationArray();

        for ( translation_input_element of this.TranslationInputElementArray )
        {
            translation_input_element.oninput = this.HandleInputEvent;
        }
    }
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

DefineComponent( VISTA_INPUT_COMPONENT, "input-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );
DefineComponent( VISTA_TEXT_INPUT_COMPONENT, "text-input-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );
DefineComponent( VISTA_MULTILINGUAL_INPUT_COMPONENT, "multilingual-input-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_", "languages" ] );
DefineComponent( VISTA_MULTILINGUAL_TEXT_INPUT_COMPONENT, "multilingual-text-input-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_", "languages" ] );
DefineComponent( VISTA_IMAGE_PATH_INPUT_COMPONENT, "image-path-input-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );
DefineComponent( VISTA_VIDEO_PATH_INPUT_COMPONENT, "video-path-input-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );

DefineComponent( VISTA_INPUT_LIST_COMPONENT, "input-list-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );
DefineComponent( VISTA_TEXT_INPUT_LIST_COMPONENT, "text-input-list-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );
DefineComponent( VISTA_MULTILINGUAL_INPUT_LIST_COMPONENT, "multilingual-input-list-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_", "languages" ] );
DefineComponent( VISTA_MULTILINGUAL_TEXT_INPUT_LIST_COMPONENT, "multilingual-text-input-list-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_", "languages" ] );
DefineComponent( VISTA_IMAGE_PATH_INPUT_LIST_COMPONENT, "image-path-input-list-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );
DefineComponent( VISTA_VIDEO_PATH_INPUT_LIST_COMPONENT, "video-path-input-list-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );
