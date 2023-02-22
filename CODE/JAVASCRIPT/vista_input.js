// -- TYPES

class VISTA_INPUT_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    HandleResultInputEvent(
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
        this.BindMethod( "HandleResultInputEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleResultInputEvent;
    }
}

// ~~

class VISTA_TEXTAREA_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    HandleResultInputEvent(
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
        this.BindMethod( "HandleResultInputEvent" );

        this.ResultValue = this.innerHTML;
        this.innerHTML = "";

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <slot></slot>
                <textarea id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>></textarea>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.SetContentHeight();
        this.ResultElement.oninput = this.HandleResultInputEvent;
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
            this.TranslationElementArray[ language_code_index ].value = this.TranslationArray[ language_code_index ];
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
            this.TranslationArray[ language_code_index ] = this.TranslationElementArray[ language_code_index ].value;
        }

        this.ResultValue = this.TranslationArray.GetMultilingualText( this.LanguageCodeArray );
        this.ResultElement.value = this.ResultValue;
    }

    // ~~

    HandleTranslationInputEvent(
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
        this.BindMethod( "HandleTranslationInputEvent" );

        this.LanguageCodeArray = this.LanguageCodes.split( "," );
        this.LanguageResultNameArray = this.LanguageResultNames.split( "," );
        this.TranslationArray = this.ResultValue.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :> hidden/>
                <: for ( let language_name of this.LanguageResultNameArray ) { :>
                    <input class="<:# this.ResultClass :> is-translation-element" value="" placeholder="<:# language_name :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
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

        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.TranslationElementArray = this.GetElements( ".is-translation-element" );
        this.UpdateTranslationArray();

        for ( translation_element of this.TranslationElementArray )
        {
            translation_element.oninput = this.HandleTranslationInputEvent;
        }
    }
}

// ~~

class VISTA_MULTILINGUAL_TEXTAREA_COMPONENT extends VISTA_COMPONENT
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        super();

        this.IsAfterUpdated = true;
    }

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
            this.TranslationElementArray[ language_code_index ].value = this.TranslationArray[ language_code_index ];
            this.TranslationElementArray[ language_code_index ].SetContentHeight();
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
            this.TranslationArray[ language_code_index ] = this.TranslationElementArray[ language_code_index ].value;
            this.TranslationElementArray[ language_code_index ].SetContentHeight();
        }

        this.ResultValue = this.TranslationArray.GetMultilingualText( this.LanguageCodeArray );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.SetContentHeight();
    }

    // ~~

    HandleTranslationInputEvent(
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
        this.BindMethod( "HandleTranslationInputEvent" );

        this.ResultValue = this.innerHTML;
        this.innerHTML = "";

        this.LanguageCodeArray = this.LanguageCodes.split( "," );
        this.LanguageResultNameArray = this.LanguageResultNames.split( "," );
        this.TranslationArray = this.ResultValue.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate( "" );
    }

    // ~~

    AfterUpdateComponent(
        )
    {
        var
            translation_element;

        if ( this.ResultValue === ""
             && this.innerHTML !== "" )
        {
            this.ResultValue = this.innerHTML;
            this.innerHTML = "";
        }

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <textarea id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :> hidden/></textarea>
                <: for ( let language_name of this.LanguageResultNameArray ) { :>
                    <textarea class="<:# this.ResultClass :> is-translation-element" value="" placeholder="<:# language_name :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>></textarea>
                <: } :>
            </div>
            `
            );

        this.UpdateComponent();
        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.SetContentHeight();
        this.TranslationElementArray = this.GetElements( ".is-translation-element" );
        this.UpdateTranslationArray();

        for ( translation_element of this.TranslationElementArray )
        {
            translation_element.oninput = this.HandleTranslationInputEvent;
        }
    }
}

// ~~

class VISTA_IMAGE_PATH_INPUT_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    HandleResultInputEvent(
        event
        )
    {
        this.ResultValue = this.ResultElement.value;
        this.ImageElement.src = this.ResultValue;
    }

    // ~~

    HandleImageErrorEvent(
        )
    {
        this.ImageElement.src = this.ErrorImagePath;
    }

    // ~~

    async HandleFileInputChangeEvent(
        )
    {
        var
            request,
            form_data;

        if ( this.FileInputElement.files.length > 0 )
        {
            form_data = new FormData();
            form_data.append( "File", this.FileInputElement.files[ 0 ] );
            request = await SendRequest( this.UploadApiUrl, "POST", form_data );

            if ( request.status === 201 )
            {
                this.ResultValue = GetJsonObject( request.response );
                this.ResultElement.value = this.ResultValue;
                this.ImageElement.src = this.ResultValue;
            }
        }
    }

    async HandleDeleteButtonClickEvent(
        )
    {
        var
            file_path,
            file_path_input_element,
            file_element,
            request,
            form_data;

        form_data = new FormData();
        form_data.append( "FilePath", this.ResultElement.value );
        request = await SendRequest( this.DeleteApiUrl, "POST", form_data );

        if ( request.status === 201 )
        {
            this.ResultElement.value = "";
            this.ImageElement.src = "";
        }
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
        this.BindProperty( "ImageClass", "image-class", "" );
        this.BindProperty( "ErrorImagePath", "error-image-path", "" );
        this.BindProperty( "UploadButtonClass", "upload-button-class", "" );
        this.BindProperty( "UploadButtonImageClass", "upload-button-image-class", "" );
        this.BindProperty( "UploadButtonImagePath", "upload-button-image-path", "" );
        this.BindProperty( "UploadButtonInputClass", "upload-button-input-class", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteButtonClass", "delete-button-class", "" );
        this.BindProperty( "DeleteButtonImageClass", "delete-button-image-class", "" );
        this.BindProperty( "DeleteButtonImagePath", "delete-button-image-path", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );
        this.BindMethod( "HandleResultInputEvent" );
        this.BindMethod( "HandleImageErrorEvent" );
        this.BindMethod( "HandleFileInputChangeEvent" );
        this.BindMethod( "HandleDeleteButtonClickEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
                <img class="<:# this.ImageClass :> is-image-element"/>
                <: if ( this.ResultReadonly === null ) { :>
                    <label class="<:# this.UploadButtonClass :>">
                        <img class="<:# this.UploadButtonImageClass :>" src="<:% this.UploadButtonImagePath :>"/><input class="<:# this.UploadButtonInputClass :> is-file-input-element" type="file" accept="image/jpeg, image/png, image/webp, image/gif, image/svg" hidden/>
                    </label>
                    <label class="<:# this.DeleteButtonClass :>">
                        <img class="<:# this.DeleteButtonImageClass :> is-delete-button-element" src="<:% this.DeleteButtonImagePath :>"/>
                    </label>
                <: } :>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleResultInputEvent;

        this.ImageElement = this.GetElement( ".is-image-element" );
        this.ImageElement.src = this.ResultValue;
        this.ImageElement.onerror = this.HandleImageErrorEvent;

        if ( this.ResultReadonly === null )
        {
            this.FileInputElement = this.GetElement( ".is-file-input-element" );
            this.FileInputElement.src = this.ResultValue;
            this.FileInputElement.onchange = this.HandleFileInputChangeEvent;

            this.DeleteButtonElement = this.GetElement( ".is-delete-button-element" );
            this.DeleteButtonElement.onclick = this.HandleDeleteButtonClickEvent;
        }
    }
}

// ~~

class VISTA_VIDEO_PATH_INPUT_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    HandleResultInputEvent(
        event
        )
    {
        this.ResultValue = this.ResultElement.value;
        this.VideoElement.src = this.ResultValue;
    }

    // ~~

    HandleVideoErrorEvent(
        )
    {
        this.VideoElement.src = this.ErrorVideoPath;
    }

    // ~~

    async HandleFileInputChangeEvent(
        )
    {
        var
            request,
            form_data;

        if ( this.FileInputElement.files.length > 0 )
        {
            form_data = new FormData();
            form_data.append( "File", this.FileInputElement.files[ 0 ] );
            request = await SendRequest( this.UploadApiUrl, "POST", form_data );

            if ( request.status === 201 )
            {
                this.ResultValue = GetJsonObject( request.response );
                this.ResultElement.value = this.ResultValue;
                this.VideoElement.src = this.ResultValue;
            }
        }
    }

    async HandleDeleteButtonClickEvent(
        )
    {
        var
            file_path,
            file_path_input_element,
            file_element,
            request,
            form_data;

        form_data = new FormData();
        form_data.append( "FilePath", this.ResultElement.value );
        request = await SendRequest( this.DeleteApiUrl, "POST", form_data );

        if ( request.status === 201 )
        {
            this.ResultElement.value = "";
            this.VideoElement.src = "";
        }
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
        this.BindProperty( "VideoClass", "video-class", "" );
        this.BindProperty( "ErrorVideoPath", "error-video-path", "" );
        this.BindProperty( "UploadButtonClass", "upload-button-class", "" );
        this.BindProperty( "UploadButtonImageClass", "upload-button-image-class", "" );
        this.BindProperty( "UploadButtonImagePath", "upload-button-image-path", "" );
        this.BindProperty( "UploadButtonInputClass", "upload-button-input-class", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteButtonClass", "delete-button-class", "" );
        this.BindProperty( "DeleteButtonImageClass", "delete-button-image-class", "" );
        this.BindProperty( "DeleteButtonImagePath", "delete-button-image-path", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );
        this.BindMethod( "HandleResultInputEvent" );
        this.BindMethod( "HandleVideoErrorEvent" );
        this.BindMethod( "HandleFileInputChangeEvent" );
        this.BindMethod( "HandleDeleteButtonClickEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
                <video class="<:# this.VideoClass :> is-video-element" type="video/mp4"/></video>
                <: if ( this.ResultReadonly === null ) { :>
                    <label class="<:# this.UploadButtonClass :>">
                        <img class="<:# this.UploadButtonImageClass :>" src="<:% this.UploadButtonImagePath :>"/><input class="<:# this.UploadButtonInputClass :> is-file-input-element" type="file" accept="video/mp4" hidden/>
                    </label>
                    <label class="<:# this.DeleteButtonClass :>">
                        <img class="<:# this.DeleteButtonImageClass :> is-delete-button-element" src="<:% this.DeleteButtonImagePath :>"/>
                    </label>
                <: } :>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleResultInputEvent;

        this.VideoElement = this.GetElement( ".is-video-element" );
        this.VideoElement.src = this.ResultValue;
        this.VideoElement.onerror = this.HandleVideoErrorEvent;

        if ( this.ResultReadonly === null )
        {
            this.FileInputElement = this.GetElement( ".is-file-input-element" );
            this.FileInputElement.src = this.ResultValue;
            this.FileInputElement.onchange = this.HandleFileInputChangeEvent;

            this.DeleteButtonElement = this.GetElement( ".is-delete-button-element" );
            this.DeleteButtonElement.onclick = this.HandleDeleteButtonClickEvent;
        }
    }
}

// ~~

class VISTA_DOCUMENT_PATH_INPUT_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    HandleResultInputEvent(
        event
        )
    {
        this.ResultValue = this.ResultElement.value;
    }

    // ~~

    async HandleFileInputChangeEvent(
        )
    {
        var
            request,
            form_data;

        if ( this.FileInputElement.files.length > 0 )
        {
            form_data = new FormData();
            form_data.append( "File", this.FileInputElement.files[ 0 ] );
            request = await SendRequest( this.UploadApiUrl, "POST", form_data );

            if ( request.status === 201 )
            {
                this.ResultValue = GetJsonObject( request.response );
                this.ResultElement.value = this.ResultValue;
            }
        }
    }

    async HandleDeleteButtonClickEvent(
        )
    {
        var
            file_path,
            file_path_input_element,
            file_element,
            request,
            form_data;

        form_data = new FormData();
        form_data.append( "FilePath", this.ResultElement.value );
        request = await SendRequest( this.DeleteApiUrl, "POST", form_data );

        if ( request.status === 201 )
        {
            this.ResultElement.value = "";
        }
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
        this.BindProperty( "UploadButtonClass", "upload-button-class", "" );
        this.BindProperty( "UploadButtonImageClass", "upload-button-image-class", "" );
        this.BindProperty( "UploadButtonImagePath", "upload-button-image-path", "" );
        this.BindProperty( "UploadButtonInputClass", "upload-button-input-class", "" );
        this.BindProperty( "UploadButtonUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteButtonClass", "delete-button-class", "" );
        this.BindProperty( "DeleteButtonImageClass", "delete-button-image-class", "" );
        this.BindProperty( "DeleteButtonImagePath", "delete-button-image-path", "" );
        this.BindProperty( "DeleteButtonUrl", "delete-api-url", "" );
        this.BindMethod( "HandleResultInputEvent" );
        this.BindMethod( "HandleDocumentErrorEvent" );
        this.BindMethod( "HandleFileInputChangeEvent" );
        this.BindMethod( "HandleDeleteButtonClickEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
                <: if ( this.ResultReadonly === null ) { :>
                    <label class="<:# this.UploadButtonClass :>">
                        <img class="<:# this.UploadButtonImageClass :>" src="<:% this.UploadButtonImagePath :>"/><input class="<:# this.UploadButtonInputClass :> is-file-input-element" type="file" accept="document/mp4" hidden/>
                    </label>
                    <label class="<:# this.DeleteButtonClass :>">
                        <img class="<:# this.DeleteButtonImageClass :> is-delete-button-element" src="<:% this.DeleteButtonImagePath :>"/>
                    </label>
                <: } :>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleResultInputEvent;

        if ( this.ResultReadonly === null )
        {
            this.FileInputElement = this.GetElement( ".is-file-input-element" );
            this.FileInputElement.src = this.ResultValue;
            this.FileInputElement.onchange = this.HandleFileInputChangeEvent;

            this.DeleteButtonElement = this.GetElement( ".is-delete-button-element" );
            this.DeleteButtonElement.onclick = this.HandleDeleteButtonClickEvent;
        }
    }
}

// ~~

class VISTA_LIST_COMPONENT extends VISTA_COMPONENT
{
}

// ~~

class VISTA_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    UpdateValueArray(
        )
    {
        var
            value_index;

        this.ResultValue = this.ResultElement.value;
        this.ValueArray = GetJsonObject( this.ResultValue );

        for ( value_index = 0;
              value_index < this.ValueArray.length;
              ++value_index )
        {
            this.ValueElementArray[ value_index ].value
                = this.ValueArray[ value_index ];
        }
    }

    // ~~

    UpdateResultValue(
        )
    {
        var
            value_index;

        for ( value_index = 0;
              value_index < this.ValueArray.length;
              ++value_index )
        {
            this.ValueArray[ value_index ]
                = this.ValueElementArray[ value_index ].value;
        }

        this.ResultValue = GetJsonText( this.ValueArray );
        this.ResultElement.value = this.ResultValue;
    }

    // ~~

    HandleValueInputEvent(
        event
        )
    {
        this.UpdateResultValue();
    }

    // ~~

    HandleAddButtonClickEvent(
        event
        )
    {
        this.ValueArray.splice( event.target.dataset.valueIndex, 0, "" );
        this.ResultValue = GetJsonText( this.ValueArray );
        this.SetChanged();
    }

    // ~~

    HandleRemoveButtonClickEvent(
        event
        )
    {
        this.ValueArray.splice( event.target.dataset.valueIndex, 1 );
        this.ResultValue = GetJsonText( this.ValueArray );
        this.SetChanged();
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
        this.BindProperty( "ValueContainerClass", "value-container-class", "" );
        this.BindProperty( "ValueClass", "value-class", "" );
        this.BindProperty( "ValueAddButtonClass", "value-add-button-class", "" );
        this.BindProperty( "ValueAddButtonImageClass", "value-add-button-image-class", "" );
        this.BindProperty( "ValueAddButtonImagePath", "value-add-button-image-path", "" );
        this.BindProperty( "ValueRemoveButtonClass", "value-remove-button-class", "" );
        this.BindProperty( "ValueRemoveButtonImageClass", "value-remove-button-image-class", "" );
        this.BindProperty( "ValueRemoveButtonImagePath", "value-remove-button-image-path", "" );
        this.BindMethod( "HandleValueInputEvent" );
        this.BindMethod( "HandleAddButtonClickEvent" );
        this.BindMethod( "HandleRemoveButtonClickEvent" );

        this.ValueArray = GetJsonObject( this.ResultValue );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :> hidden/>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="<:# this.ValueContainerClass :> is-value-container-element" draggable="true">
                        <input class="<:# this.ValueClass :> is-value-element" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
                        <: if ( this.ResultReadonly === null ) { :>
                            <div class="<:# this.ValueAddButtonClass :> is-add-button-element" data-value-index="<:# value_index :>">
                                <img class="<:# this.ValueAddButtonImageClass :>" src="<:% this.ValueAddButtonImagePath :>"/>
                            </div>
                            <div class="<:# this.ValueRemoveButtonClass :> is-remove-button-element" data-value-index="<:# value_index :>">
                                <img class="<:# this.ValueRemoveButtonImageClass :>" src="<:% this.ValueRemoveButtonImagePath :>"/>
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( this.ResultReadonly === null ) { :>
                    <div class="is-add-button-element" data-value-index="<:# value_index :>">
                        <img class="<:# this.ValueAddButtonImageClass :>" src="<:% this.ValueAddButtonImagePath :>"/>
                    </div>
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
            value_index;

        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleResultInputEvent;

        this.ValueElementArray = this.GetElements( ".is-value-element" );
        this.AddButtonElementArray = this.GetElements( ".is-add-button-element" );
        this.RemoveButtonElementArray = this.GetElements( ".is-remove-button-element" );

        this.UpdateValueArray();

        if ( this.ResultReadonly === null )
        {
            for ( value_index = 0;
                  value_index < this.ValueArray;
                  ++value_index )
            {
                this.ValueElementArray[ value_index ].oninput = this.HandleValueInputEvent;
                this.AddButtonElementArray[ value_index ].onclick = this.HandleAddButtonClickEvent;
                this.RemoveButtonElementArray[ value_index ].onclick = this.HandleRemoveButtonClickEvent;
            }

            this.AddButtonElementArray[ value_index ].onclick = this.HandleRemoveButtonClickEvent;
        }
    }
}

// ~~

class VISTA_TEXTAREA_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    HandleResultInputEvent(
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
        this.BindMethod( "HandleResultInputEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleResultInputEvent;
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
            this.TranslationElementArray[ language_code_index ].value = this.TranslationArray[ language_code_index ];
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
            this.TranslationArray[ language_code_index ] = this.TranslationElementArray[ language_code_index ].value;
        }

        this.ResultValue = this.TranslationArray.GetMultilingualText( this.LanguageCodeArray );
        this.ResultElement.value = this.ResultValue;
    }

    // ~~

    HandleResultInputEvent(
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
        this.BindMethod( "HandleResultInputEvent" );

        this.LanguageCodeArray = this.LanguageCodes.split( "," );
        this.LanguageResultNameArray = this.LanguageResultNames.split( "," );
        this.TranslationArray = this.ResultValue.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :> hidden/>
                <: for ( let language_name of this.LanguageResultNameArray ) { :>
                    <input class="<:# this.ResultClass :> is-translation-element" value="" placeholder="<:# language_name :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
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

        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.TranslationElementArray = this.GetElements( ".is-translation-element" );
        this.UpdateTranslationArray();

        for ( translation_element of this.TranslationElementArray )
        {
            translation_element.oninput = this.HandleResultInputEvent;
        }
    }
}

// ~~

class VISTA_MULTILINGUAL_TEXTAREA_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        super();

        this.IsAfterUpdated = true;
    }

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
            this.TranslationElementArray[ language_code_index ].value = this.TranslationArray[ language_code_index ];
            this.TranslationElementArray[ language_code_index ].SetContentHeight();
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
            this.TranslationArray[ language_code_index ] = this.TranslationElementArray[ language_code_index ].value;
            this.TranslationElementArray[ language_code_index ].SetContentHeight();
        }

        this.ResultValue = this.TranslationArray.GetMultilingualText( this.LanguageCodeArray );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.SetContentHeight();
    }

    // ~~

    HandleTranslationInputEvent(
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
        this.BindMethod( "HandleTranslationInputEvent" );

        this.ResultValue = this.innerHTML;
        this.innerHTML = "";

        this.LanguageCodeArray = this.LanguageCodes.split( "," );
        this.LanguageResultNameArray = this.LanguageResultNames.split( "," );
        this.TranslationArray = this.ResultValue.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate( "" );
    }

    // ~~

    AfterUpdateComponent(
        )
    {
        var
            translation_element;

        if ( this.ResultValue === ""
             && this.innerHTML !== "" )
        {
            this.ResultValue = this.innerHTML;
            this.innerHTML = "";
        }

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <textarea id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :> hidden/></textarea>
                <: for ( let language_name of this.LanguageResultNameArray ) { :>
                    <textarea class="<:# this.ResultClass :> is-translation-element" value="" placeholder="<:# language_name :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>></textarea>
                <: } :>
            </div>
            `
            );

        this.UpdateComponent();
        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.SetContentHeight();
        this.TranslationElementArray = this.GetElements( ".is-translation-element" );
        this.UpdateTranslationArray();

        for ( translation_element of this.TranslationElementArray )
        {
            translation_element.oninput = this.HandleTranslationInputEvent;
        }
    }
}

// ~~

class VISTA_IMAGE_PATH_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    HandleResultInputEvent(
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
        this.BindMethod( "HandleResultInputEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleResultInputEvent;
    }
}

// ~~

class VISTA_VIDEO_PATH_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    HandleResultInputEvent(
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
        this.BindMethod( "HandleResultInputEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleResultInputEvent;
    }
}

// ~~

class VISTA_DOCUMENT_PATH_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    HandleResultInputEvent(
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
        this.BindMethod( "HandleResultInputEvent" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.ResultReadonly !== null ? "readonly" : "" :>/>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleResultInputEvent;
    }
}

// -- STATEMENTS

DefineComponent( VISTA_INPUT_COMPONENT, "input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly" ] );
DefineComponent( VISTA_TEXTAREA_COMPONENT, "textarea-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly" ] );
DefineComponent( VISTA_MULTILINGUAL_INPUT_COMPONENT, "multilingual-input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "language-codes", "language-names" ] );
DefineComponent( VISTA_MULTILINGUAL_TEXTAREA_COMPONENT, "multilingual-textarea-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "language-codes", "language-names" ] );
DefineComponent( VISTA_IMAGE_PATH_INPUT_COMPONENT, "image-path-input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "image-class", "error-image-path", "upload-button-class", "upload-button-image-class", "upload-button-image-path", "upload-button-input-class", "upload-api-url", "delete-button-class", "delete-button-image-class", "delete-button-image-path", "delete-api-url" ] );
DefineComponent( VISTA_VIDEO_PATH_INPUT_COMPONENT, "video-path-input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "video-class", "error-video-path", "upload-button-class", "upload-button-image-class", "upload-button-image-path", "upload-button-input-class", "upload-api-url", "delete-button-class", "delete-button-image-class", "delete-button-image-path", "delete-api-url" ] );
DefineComponent( VISTA_DOCUMENT_PATH_INPUT_COMPONENT, "document-path-input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "upload-button-class", "upload-button-image-class", "upload-button-image-path", "upload-button-input-class", "upload-api-url", "delete-button-class", "delete-button-image-class", "delete-button-image-path", "delete-api-url" ] );

DefineComponent( VISTA_INPUT_LIST_COMPONENT, "input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "value-container-class", "value-class", "value-add-button-class", "value-add-button-image-class", "value-add-button-image-path", "value-remove-button-class", "value-remove-button-image-class", "value-remove-image-path" ] );
DefineComponent( VISTA_TEXTAREA_LIST_COMPONENT, "textarea-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "value-container-class", "value-class", "value-add-button-class", "value-add-button-image-class", "value-add-button-image-path", "value-remove-button-class", "value-remove-button-image-class", "value-remove-image-path" ] );
DefineComponent( VISTA_MULTILINGUAL_INPUT_LIST_COMPONENT, "multilingual-input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "value-container-class", "value-class", "value-add-button-class", "value-add-button-image-class", "value-add-button-image-path", "value-remove-button-class", "value-remove-button-image-class", "value-remove-image-path", "language-codes", "language-names" ] );
DefineComponent( VISTA_MULTILINGUAL_TEXTAREA_LIST_COMPONENT, "multilingual-textarea-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "value-container-class", "value-class", "value-add-button-class", "value-add-button-image-class", "value-add-button-image-path", "value-remove-button-class", "value-remove-button-image-class", "value-remove-image-path", "language-codes", "language-names" ] );
DefineComponent( VISTA_IMAGE_PATH_INPUT_LIST_COMPONENT, "image-path-input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "value-container-class", "value-class", "value-add-button-class", "value-add-button-image-class", "value-add-button-image-path", "value-remove-button-class", "value-remove-button-image-class", "value-remove-image-path", "image-class", "error-image-path", "upload-button-class", "upload-button-image-class", "upload-button-image-path", "upload-button-input-class", "upload-api-url", "delete-button-class", "delete-button-image-class", "delete-button-image-path", "delete-api-url" ] );
DefineComponent( VISTA_VIDEO_PATH_INPUT_LIST_COMPONENT, "video-path-input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "value-container-class", "value-class", "value-add-button-class", "value-add-button-image-class", "value-add-button-image-path", "value-remove-button-class", "value-remove-button-image-class", "value-remove-image-path", "video-class", "error-video-path", "upload-button-class", "upload-button-image-class", "upload-button-image-path", "upload-button-input-class", "upload-api-url", "delete-button-class", "delete-button-image-class", "delete-button-image-path", "delete-api-url" ] );
DefineComponent( VISTA_DOCUMENT_PATH_INPUT_LIST_COMPONENT, "document-path-input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "result-readonly", "value-container-class", "value-class", "value-add-button-class", "value-add-button-image-class", "value-add-button-image-path", "value-remove-button-class", "value-remove-button-image-class", "value-remove-image-path", "upload-button-class", "upload-button-image-class", "upload-button-image-path", "upload-button-input-class", "upload-api-url", "delete-button-class", "delete-button-image-class", "delete-button-image-path", "delete-api-url" ] );
