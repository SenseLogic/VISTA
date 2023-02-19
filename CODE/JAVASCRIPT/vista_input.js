// -- TYPES

class VISTA_INPUT_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    HandleInputEvent(
        event
        )
    {
        this.ResultValue = this.ResultElement.value;
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ContainerClass", "container-class", "" );
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultClass", "result-class", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "ResultReadonly", "result-readonly", null );
        this.BindMethod( "HandleInputEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleInputEvent;
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
        this.ResultValue = this.ResultElement.value;
        this.ResultElement.SetContentHeight();
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ContainerClass", "container-class", "" );
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultClass", "result-class", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "ResultReadonly", "result-readonly", null );
        this.BindMethod( "HandleInputEvent" );

        this.ResultValue = this.textContent;
        this.textContent = "";

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <textarea id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>></textarea>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.SetContentHeight();
        this.ResultElement.oninput = this.HandleInputEvent;
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

        this.ResultValue = this.ResultElement.value;
        this.TranslationArray = this.ResultValue.GetTranslatedTextArray( this.LanguageCodeArray );

        for ( language_code_index = 0;
              language_code_index < this.TranslationArray.length;
              ++language_code_index )
        {
            this.TranslationElementArray[ language_code_index ].value
                = this.TranslationArray[ language_code_index ];
        }
    }

    // ~~

    UpdateResultValue(
        )
    {
        var
            language_code_index;

        for ( language_code_index = 0;
              language_code_index < this.TranslationArray.length;
              ++language_code_index )
        {
            this.TranslationArray[ language_code_index ]
                = this.TranslationElementArray[ language_code_index ].value;
        }

        this.ResultValue = this.TranslationArray.GetMultilingualText( this.LanguageCodeArray );
        this.ResultElement.value = this.ResultValue;
    }

    // ~~

    HandleInputEvent(
        event
        )
    {
        this.UpdateResultValue();
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ContainerClass", "container-class", "" );
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultClass", "result-class", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "ResultReadonly", "result-readonly", null );
        this.BindProperty( "LanguageCodes", "language-codes", "en" );
        this.BindProperty( "LanguageResultNames", "language-names", "English" );
        this.BindMethod( "HandleInputEvent" );

        this.LanguageCodeArray = this.LanguageCodes.split( "," );
        this.LanguageResultNameArray = this.LanguageResultNames.split( "," );
        this.TranslationArray = this.ResultValue.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :> hidden/>
                <: for ( let language_name of this.LanguageResultNameArray ) { :>
                    <input class="<:# this.ResultClass :> is-translation" value="" placeholder="<:# language_name :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
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
            translation_element;

        this.ResultElement = this.GetElement( ".is-result" );
        this.ResultElement.value = this.ResultValue;
        this.TranslationElementArray = this.GetElements( ".is-translation" );
        this.UpdateTranslationArray();

        for ( translation_element of this.TranslationElementArray )
        {
            translation_element.oninput = this.HandleInputEvent;
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

        this.ResultValue = this.ResultElement.value;
        this.TranslationArray = this.ResultValue.GetTranslatedTextArray( this.LanguageCodeArray );

        for ( language_code_index = 0;
              language_code_index < this.TranslationArray.length;
              ++language_code_index )
        {
            this.TranslationElementArray[ language_code_index ].value
                = this.TranslationArray[ language_code_index ];
        }
    }

    // ~~

    UpdateResultValue(
        )
    {
        var
            language_code_index;

        for ( language_code_index = 0;
              language_code_index < this.TranslationArray.length;
              ++language_code_index )
        {
            this.TranslationElementArray[ language_code_index ].SetContentHeight();

            this.TranslationArray[ language_code_index ]
                = this.TranslationElementArray[ language_code_index ].value;
        }

        this.ResultValue = this.TranslationArray.GetMultilingualText( this.LanguageCodeArray );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.SetContentHeight();
    }

    // ~~

    HandleInputEvent(
        event
        )
    {
        this.UpdateResultValue();
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ContainerClass", "container-class", "" );
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultClass", "result-class", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "ResultReadonly", "result-readonly", null );
        this.BindProperty( "LanguageCodes", "language-codes", "en" );
        this.BindProperty( "LanguageResultNames", "language-names", "English" );
        this.BindMethod( "HandleInputEvent" );

        this.ResultValue = this.textContent;
        this.textContent = "";

        this.LanguageCodeArray = this.LanguageCodes.split( "," );
        this.LanguageResultNameArray = this.LanguageResultNames.split( "," );
        this.TranslationArray = this.ResultValue.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <textarea id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :> hidden/></textarea>
                <: for ( let language_name of this.LanguageResultNameArray ) { :>
                    <textarea class="<:# this.ResultClass :> is-translation" value="" placeholder="<:# language_name :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>></textarea>
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
            translation_element;

        this.ResultElement = this.GetElement( ".is-result" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.SetContentHeight();
        this.TranslationElementArray = this.GetElements( ".is-translation" );
        this.UpdateTranslationArray();

        for ( translation_element of this.TranslationElementArray )
        {
            translation_element.oninput = this.HandleInputEvent;
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
        this.ResultValue = this.ResultElement.value;
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ContainerClass", "container-class", "" );
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultClass", "result-class", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "ResultReadonly", "result-readonly", null );
        this.BindProperty( "ImageClass", "image-class", null );
        this.BindProperty( "ImageErrorCode", "image-error-code", null );
        this.BindProperty( "UploadButtonClass", "upload-button-class", null );
        this.BindProperty( "UploadButtonImageClass", "upload-button-image-class", null );
        this.BindProperty( "UploadButtonImagePath", "upload-button-image-path", null );
        this.BindProperty( "UploadButtonInputClass", "upload-button-input-class", null );
        this.BindProperty( "UploadButtonCode", "upload-button-input-class", "upload-button-code", null );
        this.BindProperty( "DeleteButtonImageClass", "delete-button-image-class", null );
        this.BindProperty( "DeleteButtonImagePath", "delete-button-image-path", null );
        this.BindProperty( "DeleteButtonCode", "delete-button-code", null );
        this.BindMethod( "HandleInputEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
                <img class="<:# this.ImageClass :>" src="<:% this.ResultValue :>" onerror="<:# this.ImageErrorCode :>"/>
                <: if ( this.ResultReadonly === null ) { :>
                    <label class="<:# this.UploadButtonClass :>">
                        <img class="<:# this.UploadButtonImageClass :>" src="<:# this.UploadButtonImagePath :>"/><input class="<:# this.UploadButtonInputClass :>" type="file" accept="image/jpeg, image/png, image/webp, image/gif, image/svg" onchange="<:# this.UploadButtonCode :>"/>
                    </label>
                    <img class="<:# this.DeleteButtonImageClass :>" src="<:# this.DeleteButtonImagePath :>" onclick="<:# this.DeleteButtonCode :>"/>
                <: } :>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleInputEvent;
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
        this.ResultValue = this.ResultElement.value;
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ContainerClass", "container-class", "" );
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultClass", "result-class", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "ResultReadonly", "result-readonly", null );
        this.BindProperty( "VideoClass", "video-class", null );
        this.BindProperty( "VideoErrorCode", "video-error-code", null );
        this.BindProperty( "UploadButtonClass", "upload-button-class", null );
        this.BindProperty( "UploadButtonImageClass", "upload-button-image-class", null );
        this.BindProperty( "UploadButtonImagePath", "upload-button-image-path", null );
        this.BindProperty( "UploadButtonInputClass", "upload-button-input-class", null );
        this.BindProperty( "UploadButtonCode", "upload-button-input-class", "upload-button-code", null );
        this.BindProperty( "DeleteButtonImageClass", "delete-button-image-class", null );
        this.BindProperty( "DeleteButtonImagePath", "delete-button-image-path", null );
        this.BindProperty( "DeleteButtonCode", "delete-button-code", null );
        this.BindMethod( "HandleInputEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
                <video class="<:# this.VideoClass :>" src="<:% this.ResultValue :>" type="video/mp4" onerror="<:# this.VideoErrorCode :>"/></video>
                <: if ( this.ResultReadonly === null ) { :>
                    <label class="<:# this.UploadButtonClass :>">
                        <img class="<:# this.UploadButtonImageClass :>" src="<:# this.UploadButtonImagePath :>"/><input class="<:# this.UploadButtonInputClass :>" type="file" accept="video/mp4" onchange="<:# this.UploadButtonCode :>"/>
                    </label>
                    <img class="<:# this.DeleteButtonImageClass :>" src="<:# this.DeleteButtonImagePath :>" onclick="<:# this.DeleteButtonCode :>"/>
                <: } :>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleInputEvent;
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
        this.ResultValue = this.ResultElement.value;
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ContainerClass", "container-class", "" );
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultClass", "result-class", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "ResultReadonly", "result-readonly", null );
        this.BindMethod( "HandleInputEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleInputEvent;
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
        this.ResultValue = this.ResultElement.value;
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ContainerClass", "container-class", "" );
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultClass", "result-class", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "ResultReadonly", "result-readonly", null );
        this.BindMethod( "HandleInputEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleInputEvent;
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
        this.ResultValue = this.ResultElement.value;
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ContainerClass", "container-class", "" );
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultClass", "result-class", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "ResultReadonly", "result-readonly", null );
        this.BindMethod( "HandleInputEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleInputEvent;
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

        this.ResultValue = this.ResultElement.value;
        this.TranslationArray = this.ResultValue.GetTranslatedTextArray( this.LanguageCodeArray );

        for ( language_code_index = 0;
              language_code_index < this.TranslationArray.length;
              ++language_code_index )
        {
            this.TranslationElementArray[ language_code_index ].value
                = this.TranslationArray[ language_code_index ];
        }
    }

    // ~~

    UpdateResultValue(
        )
    {
        var
            language_code_index;

        for ( language_code_index = 0;
              language_code_index < this.TranslationArray.length;
              ++language_code_index )
        {
            this.TranslationArray[ language_code_index ]
                = this.TranslationElementArray[ language_code_index ].value;
        }

        this.ResultValue = this.TranslationArray.GetMultilingualText( this.LanguageCodeArray );
        this.ResultElement.value = this.ResultValue;
    }

    // ~~

    HandleInputEvent(
        event
        )
    {
        this.UpdateResultValue();
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ContainerClass", "container-class", "" );
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultClass", "result-class", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "ResultReadonly", "result-readonly", null );
        this.BindProperty( "LanguageCodes", "language-codes", "en" );
        this.BindProperty( "LanguageResultNames", "language-names", "English" );
        this.BindMethod( "HandleInputEvent" );

        this.LanguageCodeArray = this.LanguageCodes.split( "," );
        this.LanguageResultNameArray = this.LanguageResultNames.split( "," );
        this.TranslationArray = this.ResultValue.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :> hidden/>
                <: for ( let language_name of this.LanguageResultNameArray ) { :>
                    <input class="<:# this.ResultClass :> is-translation" value="" placeholder="<:# language_name :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
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
            translation_element;

        this.ResultElement = this.GetElement( ".is-result" );
        this.ResultElement.value = this.ResultValue;
        this.TranslationElementArray = this.GetElements( ".is-translation" );
        this.UpdateTranslationArray();

        for ( translation_element of this.TranslationElementArray )
        {
            translation_element.oninput = this.HandleInputEvent;
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

        this.ResultValue = this.ResultElement.value;
        this.TranslationArray = this.ResultValue.GetTranslatedTextArray( this.LanguageCodeArray );

        for ( language_code_index = 0;
              language_code_index < this.TranslationArray.length;
              ++language_code_index )
        {
            this.TranslationElementArray[ language_code_index ].value
                = this.TranslationArray[ language_code_index ];
        }
    }

    // ~~

    UpdateResultValue(
        )
    {
        var
            language_code_index;

        for ( language_code_index = 0;
              language_code_index < this.TranslationArray.length;
              ++language_code_index )
        {
            this.TranslationElementArray[ language_code_index ].SetContentHeight();

            this.TranslationArray[ language_code_index ]
                = this.TranslationElementArray[ language_code_index ].value;
        }

        this.ResultValue = this.TranslationArray.GetMultilingualText( this.LanguageCodeArray );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.SetContentHeight();
    }

    // ~~

    HandleInputEvent(
        event
        )
    {
        this.UpdateResultValue();
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ContainerClass", "container-class", "" );
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultClass", "result-class", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "ResultReadonly", "result-readonly", null );
        this.BindProperty( "LanguageCodes", "language-codes", "en" );
        this.BindProperty( "LanguageResultNames", "language-names", "English" );
        this.BindMethod( "HandleInputEvent" );

        this.ResultValue = this.textContent;
        this.textContent = "";

        this.LanguageCodeArray = this.LanguageCodes.split( "," );
        this.LanguageResultNameArray = this.LanguageResultNames.split( "," );
        this.TranslationArray = this.ResultValue.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <textarea id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :> hidden/></textarea>
                <: for ( let language_name of this.LanguageResultNameArray ) { :>
                    <textarea class="<:# this.ResultClass :> is-translation" value="" placeholder="<:# language_name :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>></textarea>
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
            translation_element;

        this.ResultElement = this.GetElement( ".is-result" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.SetContentHeight();
        this.TranslationElementArray = this.GetElements( ".is-translation" );
        this.UpdateTranslationArray();

        for ( translation_element of this.TranslationElementArray )
        {
            translation_element.oninput = this.HandleInputEvent;
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
        this.ResultValue = this.ResultElement.value;
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ContainerClass", "container-class", "" );
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultClass", "result-class", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "ResultReadonly", "result-readonly", null );
        this.BindMethod( "HandleInputEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleInputEvent;
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
        this.ResultValue = this.ResultElement.value;
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ContainerClass", "container-class", "" );
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultClass", "result-class", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "ResultReadonly", "result-readonly", null );
        this.BindMethod( "HandleInputEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleInputEvent;
    }
}

// -- STATEMENTS

DefineComponent( VISTA_INPUT_COMPONENT, "input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly" ] );
DefineComponent( VISTA_TEXTAREA_COMPONENT, "textarea-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly" ] );
DefineComponent( VISTA_MULTILINGUAL_INPUT_COMPONENT, "multilingual-input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "language-codes", "language-names" ] );
DefineComponent( VISTA_MULTILINGUAL_TEXTAREA_COMPONENT, "multilingual-textarea-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "language-codes", "language-names" ] );
DefineComponent( VISTA_IMAGE_PATH_INPUT_COMPONENT, "image-path-input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "image-class", "image-error-code", "upload-button-class", "upload-button-image-class", "upload-button-image-path", "upload-button-input-class", "upload-button-code", "delete-button-image-class", "delete-button-code" ] );
DefineComponent( VISTA_VIDEO_PATH_INPUT_COMPONENT, "video-path-input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "video-class", "video-error-code", "upload-button-class", "upload-button-image-class", "upload-button-image-path", "upload-button-input-class", "upload-button-code", "delete-button-image-class", "delete-button-code" ] );

DefineComponent( VISTA_INPUT_LIST_COMPONENT, "input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly" ] );
DefineComponent( VISTA_TEXTAREA_LIST_COMPONENT, "textarea-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly" ] );
DefineComponent( VISTA_MULTILINGUAL_INPUT_LIST_COMPONENT, "multilingual-input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "language-codes", "language-names" ] );
DefineComponent( VISTA_MULTILINGUAL_TEXTAREA_LIST_COMPONENT, "multilingual-textarea-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "language-codes", "language-names" ] );
DefineComponent( VISTA_IMAGE_PATH_INPUT_LIST_COMPONENT, "image-path-input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "image-class", "image-error-code", "upload-button-class", "upload-button-image-class", "upload-button-image-path", "upload-button-input-class", "upload-button-code", "delete-button-image-class", "delete-button-code" ] );
DefineComponent( VISTA_VIDEO_PATH_INPUT_LIST_COMPONENT, "video-path-input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "video-class", "video-error-code", "upload-button-class", "upload-button-image-class", "upload-button-image-path", "upload-button-input-class", "upload-button-code", "delete-button-image-class", "delete-button-code" ] );
