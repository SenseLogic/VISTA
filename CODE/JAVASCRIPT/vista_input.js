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

class VISTA_TEXTAREA_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    HandleInputEvent(
        event
        )
    {
        this.Value = this.TextareaElement.value;
        this.TextareaElement.SetContentHeight();
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "Id", "id_", "" );
        this.BindProperty( "Class", "class_", "" );
        this.BindProperty( "Name", "name_", "" );
        this.BindProperty( "Placeholder", "placeholder_", "" );
        this.BindProperty( "Readonly", "readonly_", null );
        this.BindMethod( "HandleInputEvent" );

        this.Value = this.textContent;
        this.textContent = "";

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
        this.TextareaElement = this.GetElement( "textarea" );
        this.TextareaElement.value = this.Value;
        this.TextareaElement.SetContentHeight();
        this.TextareaElement.oninput = this.HandleInputEvent;
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
        this.BindProperty( "LanguageCodes", "language-codes", "en" );
        this.BindProperty( "LanguageNames", "language-names", "English" );
        this.BindProperty( "Readonly", "readonly_", null );
        this.BindMethod( "HandleInputEvent" );

        this.LanguageCodeArray = this.LanguageCodes.split( "," );
        this.LanguageNameArray = this.LanguageNames.split( "," );
        this.TranslationArray = this.Value.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate(
            Text`
            <div>
                <input id="<:# this.Id :>" class="<:# this.Class :>" name="<:# this.Name :>" placeholder="<:% this.Placeholder :>" <:# this.Readonly !== null ? "readonly" : "" :> hidden/>
                <: for ( let language_name of this.LanguageNameArray ) { :>
                    <input class="<:# this.Class :> is-translation" value="" placeholder="<:# language_name :>" <:# this.Readonly !== null ? "readonly" : "" :>/>
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

class VISTA_MULTILINGUAL_TEXTAREA_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    UpdateTranslationArray(
        )
    {
        var
            language_code_index;

        this.Value = this.TextareaElement.value;
        this.TranslationArray = this.Value.GetTranslatedTextArray( this.LanguageCodeArray );

        for ( language_code_index = 0;
              language_code_index < this.TranslationArray.length;
              ++language_code_index )
        {
            this.TranslationTextareaElementArray[ language_code_index ].value
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
            this.TranslationTextareaElementArray[ language_code_index ].SetContentHeight();

            this.TranslationArray[ language_code_index ]
                = this.TranslationTextareaElementArray[ language_code_index ].value;
        }

        this.Value = this.TranslationArray.GetMultilingualText( this.LanguageCodeArray );
        this.TextareaElement.value = this.Value;
        this.TextareaElement.SetContentHeight();
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
        this.BindProperty( "Placeholder", "placeholder_", "" );
        this.BindProperty( "LanguageCodes", "language-codes", "en" );
        this.BindProperty( "LanguageNames", "language-names", "English" );
        this.BindProperty( "Readonly", "readonly_", null );
        this.BindMethod( "HandleInputEvent" );

        this.Value = this.textContent;
        this.textContent = "";

        this.LanguageCodeArray = this.LanguageCodes.split( "," );
        this.LanguageNameArray = this.LanguageNames.split( "," );
        this.TranslationArray = this.Value.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate(
            Text`
            <div>
                <textarea id="<:# this.Id :>" class="<:# this.Class :>" name="<:# this.Name :>" placeholder="<:% this.Placeholder :>" <:# this.Readonly !== null ? "readonly" : "" :> hidden/><:% this.Value :></textarea>
                <: for ( let language_name of this.LanguageNameArray ) { :>
                    <textarea class="<:# this.Class :> is-translation" value="" placeholder="<:# language_name :>" <:# this.Readonly !== null ? "readonly" : "" :>></textarea>
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

        this.TextareaElement = this.GetElement( "textarea" );
        this.TextareaElement.value = this.Value;
        this.TextareaElement.SetContentHeight();
        this.TranslationTextareaElementArray = this.GetElements( ".is-translation" );
        this.UpdateTranslationArray();

        for ( translation_input_element of this.TranslationTextareaElementArray )
        {
            translation_input_element.oninput = this.HandleInputEvent;
        }
    }
}

// ~~

class VISTA_IMAGE_PATH_INPUT_COMPONENT extends VISTA_COMPONENT
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

class VISTA_VIDEO_PATH_INPUT_COMPONENT extends VISTA_COMPONENT
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

class VISTA_LIST_COMPONENT extends VISTA_COMPONENT
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

class VISTA_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
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

class VISTA_TEXTAREA_LIST_COMPONENT extends VISTA_LIST_COMPONENT
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

class VISTA_MULTILINGUAL_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
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
        this.BindProperty( "LanguageCodes", "language-codes", "en" );
        this.BindProperty( "LanguageNames", "language-names", "English" );
        this.BindProperty( "Readonly", "readonly_", null );
        this.BindMethod( "HandleInputEvent" );

        this.LanguageCodeArray = this.LanguageCodes.split( "," );
        this.LanguageNameArray = this.LanguageNames.split( "," );
        this.TranslationArray = this.Value.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate(
            Text`
            <div>
                <input id="<:# this.Id :>" class="<:# this.Class :>" name="<:# this.Name :>" placeholder="<:% this.Placeholder :>" <:# this.Readonly !== null ? "readonly" : "" :> hidden/>
                <: for ( let language_name of this.LanguageNameArray ) { :>
                    <input class="<:# this.Class :> is-translation" value="" placeholder="<:# language_name :>" <:# this.Readonly !== null ? "readonly" : "" :>/>
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

class VISTA_MULTILINGUAL_TEXTAREA_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    UpdateTranslationArray(
        )
    {
        var
            language_code_index;

        this.Value = this.TextareaElement.value;
        this.TranslationArray = this.Value.GetTranslatedTextArray( this.LanguageCodeArray );

        for ( language_code_index = 0;
              language_code_index < this.TranslationArray.length;
              ++language_code_index )
        {
            this.TranslationTextareaElementArray[ language_code_index ].value
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
            this.TranslationTextareaElementArray[ language_code_index ].SetContentHeight();

            this.TranslationArray[ language_code_index ]
                = this.TranslationTextareaElementArray[ language_code_index ].value;
        }

        this.Value = this.TranslationArray.GetMultilingualText( this.LanguageCodeArray );
        this.TextareaElement.value = this.Value;
        this.TextareaElement.SetContentHeight();
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
        this.BindProperty( "Placeholder", "placeholder_", "" );
        this.BindProperty( "LanguageCodes", "language-codes", "en" );
        this.BindProperty( "LanguageNames", "language-names", "English" );
        this.BindProperty( "Readonly", "readonly_", null );
        this.BindMethod( "HandleInputEvent" );

        this.Value = this.textContent;
        this.textContent = "";

        this.LanguageCodeArray = this.LanguageCodes.split( "," );
        this.LanguageNameArray = this.LanguageNames.split( "," );
        this.TranslationArray = this.Value.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate(
            Text`
            <div>
                <textarea id="<:# this.Id :>" class="<:# this.Class :>" name="<:# this.Name :>" placeholder="<:% this.Placeholder :>" <:# this.Readonly !== null ? "readonly" : "" :> hidden/><:% this.Value :></textarea>
                <: for ( let language_name of this.LanguageNameArray ) { :>
                    <textarea class="<:# this.Class :> is-translation" value="" placeholder="<:# language_name :>" <:# this.Readonly !== null ? "readonly" : "" :>></textarea>
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

        this.TextareaElement = this.GetElement( "textarea" );
        this.TextareaElement.value = this.Value;
        this.TextareaElement.SetContentHeight();
        this.TranslationTextareaElementArray = this.GetElements( ".is-translation" );
        this.UpdateTranslationArray();

        for ( translation_input_element of this.TranslationTextareaElementArray )
        {
            translation_input_element.oninput = this.HandleInputEvent;
        }
    }
}

// ~~

class VISTA_IMAGE_PATH_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
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

class VISTA_VIDEO_PATH_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
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

// -- STATEMENTS

DefineComponent( VISTA_INPUT_COMPONENT, "input-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );
DefineComponent( VISTA_TEXTAREA_COMPONENT, "textarea-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );
DefineComponent( VISTA_MULTILINGUAL_INPUT_COMPONENT, "multilingual-input-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_", "language-codes", "language-names" ] );
DefineComponent( VISTA_MULTILINGUAL_TEXTAREA_COMPONENT, "multilingual-textarea-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_", "language-codes", "language-names" ] );
DefineComponent( VISTA_IMAGE_PATH_INPUT_COMPONENT, "image-path-input-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );
DefineComponent( VISTA_VIDEO_PATH_INPUT_COMPONENT, "video-path-input-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );

DefineComponent( VISTA_INPUT_LIST_COMPONENT, "input-list-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );
DefineComponent( VISTA_TEXTAREA_LIST_COMPONENT, "textarea-list-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );
DefineComponent( VISTA_MULTILINGUAL_INPUT_LIST_COMPONENT, "multilingual-input-list-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_", "language-codes", "language-names" ] );
DefineComponent( VISTA_MULTILINGUAL_TEXTAREA_LIST_COMPONENT, "multilingual-textarea-list-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_", "language-codes", "language-names" ] );
DefineComponent( VISTA_IMAGE_PATH_INPUT_LIST_COMPONENT, "image-path-input-list-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );
DefineComponent( VISTA_VIDEO_PATH_INPUT_LIST_COMPONENT, "video-path-input-list-component", [ "id_", "class_", "name_", "value_", "placeholder_", "readonly_" ] );
