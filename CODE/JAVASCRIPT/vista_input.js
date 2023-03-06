// -- TYPES

class VISTA_INPUT_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    HandleResultInputEvent(
        event
        )
    {
        this.value = this.ResultElement.value;
        this.ResultValue = this.value;

        this.EmitEvent( "result-value-changed" );
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
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindMethod( "HandleResultInputEvent" );

        this.value = this.ResultValue;

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :>/>
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

class VISTA_TEXT_INPUT_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    HandleResultInputEvent(
        event
        )
    {
        this.value = this.ResultElement.value;
        this.ResultValue = this.value;

        this.ResultElement.SetContentHeight();
        this.EmitEvent( "result-value-changed" );
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
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindMethod( "HandleResultInputEvent" );

        this.value = this.ResultValue;

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <slot></slot>
                <textarea id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :>></textarea>
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

        this.value = this.ResultElement.value;
        this.ResultValue = this.value;

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

        this.value = this.TranslationArray.GetMultilingualText( this.LanguageCodeArray );
        this.ResultValue = this.value;

        this.ResultElement.value = this.ResultValue;
    }

    // ~~

    HandleTranslationInputEvent(
        event
        )
    {
        this.UpdateResultValue();
        this.EmitEvent( "result-value-changed" );
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
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindProperty( "LanguageCodes", "language-codes", "en" );
        this.BindProperty( "LanguageNames", "language-names", "English" );
        this.BindMethod( "HandleTranslationInputEvent" );

        this.value = this.ResultValue;
        this.LanguageCodeArray = this.LanguageCodes.split( "," );
        this.LanguageResultNameArray = this.LanguageNames.split( "," );
        this.TranslationArray = this.ResultValue.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( let language_name of this.LanguageResultNameArray ) { :>
                    <input class="<:# this.ResultClass :> is-translation-element" value="" placeholder="<:# language_name :>" <:# this.IsReadonly ? "readonly" : "" :>/>
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

class VISTA_MULTILINGUAL_TEXT_INPUT_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    UpdateTranslationArray(
        )
    {
        var
            language_code_index;

        this.value = this.ResultElement.value;
        this.ResultValue = this.value;

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

        this.value = this.TranslationArray.GetMultilingualText( this.LanguageCodeArray );
        this.ResultValue = this.value;

        this.ResultElement.value = this.ResultValue;
        this.ResultElement.SetContentHeight();
    }

    // ~~

    HandleTranslationInputEvent(
        event
        )
    {
        this.UpdateResultValue();
        this.EmitEvent( "result-value-changed" );
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
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindProperty( "LanguageCodes", "language-codes", "en" );
        this.BindProperty( "LanguageNames", "language-names", "English" );
        this.BindMethod( "HandleTranslationInputEvent" );

        this.value = this.ResultValue;
        this.LanguageCodeArray = this.LanguageCodes.split( "," );
        this.LanguageResultNameArray = this.LanguageNames.split( "," );
        this.TranslationArray = this.ResultValue.GetTranslatedTextArray( this.LanguageCodeArray );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <textarea id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/></textarea>
                <: for ( let language_name of this.LanguageResultNameArray ) { :>
                    <textarea class="<:# this.ResultClass :> is-translation-element" placeholder="<:# language_name :>" <:# this.IsReadonly ? "readonly" : "" :>></textarea>
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
        this.value = this.ResultElement.value;
        this.ResultValue = this.value;

        this.ImageElement.src = this.ResultValue;
        this.EmitEvent( "result-value-changed" );
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
                this.value = GetJsonObject( request.response );
                this.ResultValue = this.value;

                this.ResultElement.value = this.ResultValue;
                this.ImageElement.src = this.ResultValue;
                this.EmitEvent( "result-value-changed" );
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
            this.ResultValue = "";
            this.value = "";

            this.ResultElement.value = "";
            this.ImageElement.src = "";
            this.EmitEvent( "result-value-changed" );
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
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindProperty( "ImageClass", "image-class", "" );
        this.BindProperty( "ErrorImagePath", "error-image-path", "" );
        this.BindProperty( "UploadButtonClass", "upload-button-class", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteButtonClass", "delete-button-class", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );
        this.BindMethod( "HandleResultInputEvent" );
        this.BindMethod( "HandleImageErrorEvent" );
        this.BindMethod( "HandleFileInputChangeEvent" );
        this.BindMethod( "HandleDeleteButtonClickEvent" );

        this.value = this.ResultValue;

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :>/>
                <img class="<:# this.ImageClass :> is-image-element"/>
                <: if ( !this.IsReadonly ) { :>
                    <label class="<:# this.UploadButtonClass :>">
                        <input class="is-file-input-element" type="file" accept="image/jpeg, image/png, image/webp, image/gif, image/svg" hidden/>
                    </label>
                    <label class="<:# this.DeleteButtonClass :> is-delete-button-element">
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

        if ( !this.IsReadonly )
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
        this.value = this.ResultElement.value;
        this.ResultValue = this.value;

        this.VideoElement.src = this.ResultValue;
        this.EmitEvent( "result-value-changed" );
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
                this.value = GetJsonObject( request.response );
                this.ResultValue = this.value;

                this.ResultElement.value = this.ResultValue;
                this.VideoElement.src = this.ResultValue;
                this.EmitEvent( "result-value-changed" );
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
            this.ResultValue = "";
            this.value = "";

            this.ResultElement.value = "";
            this.VideoElement.src = "";
            this.EmitEvent( "result-value-changed" );
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
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindProperty( "VideoClass", "video-class", "" );
        this.BindProperty( "ErrorVideoPath", "error-video-path", "" );
        this.BindProperty( "UploadButtonClass", "upload-button-class", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteButtonClass", "delete-button-class", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );
        this.BindMethod( "HandleResultInputEvent" );
        this.BindMethod( "HandleVideoErrorEvent" );
        this.BindMethod( "HandleFileInputChangeEvent" );
        this.BindMethod( "HandleDeleteButtonClickEvent" );

        this.value = this.ResultValue;

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :>/>
                <video class="<:# this.VideoClass :> is-video-element" type="video/mp4"/></video>
                <: if ( !this.IsReadonly ) { :>
                    <label class="<:# this.UploadButtonClass :>">
                        <input class="is-file-input-element" type="file" accept="video/mp4" hidden/>
                    </label>
                    <div class="<:# this.DeleteButtonClass :> is-delete-button-element">
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
        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleResultInputEvent;

        this.VideoElement = this.GetElement( ".is-video-element" );
        this.VideoElement.src = this.ResultValue;
        this.VideoElement.onerror = this.HandleVideoErrorEvent;

        if ( !this.IsReadonly )
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
        this.value = this.ResultElement.value;
        this.ResultValue = this.value;

        this.EmitEvent( "result-value-changed" );
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
                this.value = GetJsonObject( request.response );
                this.ResultValue = this.value;

                this.ResultElement.value = this.ResultValue;
                this.EmitEvent( "result-value-changed" );
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
            this.ResultValue = "";
            this.value = "";

            this.ResultElement.value = "";
            this.EmitEvent( "result-value-changed" );
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
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindProperty( "UploadButtonClass", "upload-button-class", "" );
        this.BindProperty( "UploadButtonUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteButtonClass", "delete-button-class", "" );
        this.BindProperty( "DeleteButtonUrl", "delete-api-url", "" );
        this.BindMethod( "HandleResultInputEvent" );
        this.BindMethod( "HandleDocumentErrorEvent" );
        this.BindMethod( "HandleFileInputChangeEvent" );
        this.BindMethod( "HandleDeleteButtonClickEvent" );

        this.value = this.ResultValue;

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :>/>
                <: if ( !this.IsReadonly ) { :>
                    <label class="<:# this.UploadButtonClass :>">
                        <input class="is-file-input-element" type="file" accept="application/pdf" hidden/>
                    </label>
                    <div class="<:# this.DeleteButtonClass :> is-delete-button-element">
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
        this.ResultElement = this.GetElement( ".is-result-element" );
        this.ResultElement.value = this.ResultValue;
        this.ResultElement.oninput = this.HandleResultInputEvent;

        if ( !this.IsReadonly )
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
    // -- OPERATIONS

    UpdateValueArray(
        )
    {
        var
            value_index;

        this.ValueArray = GetJsonObject( this.ResultValue );

        for ( value_index = 0;
              value_index < this.ValueArray.length;
              ++value_index )
        {
            this.ValueElementArray[ value_index ].ResultValue = this.ValueArray[ value_index ];
            this.ValueElementArray[ value_index ].SetChanged();
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
            this.ValueArray[ value_index ] = this.ValueElementArray[ value_index ].ResultValue;
        }

        this.value = GetJsonText( this.ValueArray );
        this.ResultValue = this.value;

        this.ResultElement.value = this.ResultValue;
    }

    // ~~

    HandleValueContainerDragStartEvent(
        event
        )
    {
        this.DragValueIndex = GetInteger( event.currentTarget.dataset.valueIndex );
    }

    // ~~

    HandleValueContainerDragEndEvent(
        event
        )
    {
        this.DragValueIndex = -1;
    }

    // ~~

    HandleValueContainerDragEnterEvent(
        event
        )
    {
    }

    // ~~

    HandleValueContainerDragOverEvent(
        event
        )
    {
        event.preventDefault();
    }

    // ~~

    HandleValueContainerDragLeaveEvent(
        event
        )
    {
    }

    // ~~

    HandleValueContainerDropEvent(
        event
        )
    {
        var
            drag_value,
            drag_value_index,
            drop_value,
            drop_value_index;

        if ( this.DragValueIndex >= 0 )
        {
            drag_value_index = this.DragValueIndex;
            drop_value_index = GetInteger( event.currentTarget.dataset.valueIndex );

            if ( drop_value_index !== drag_value_index )
            {
                drag_value = this.ValueArray[ drag_value_index ];
                drop_value = this.ValueArray[ drop_value_index ];

                if ( drop_value_index > drag_value_index )
                {
                    --drop_value_index;
                }

                this.ValueArray.splice( drag_value_index, 1 );
                this.ValueArray.splice( drop_value_index, 0, drag_value );

                this.value = GetJsonText( this.ValueArray );
                this.ResultValue = this.value;

                this.DragValueIndex = -1;
                this.SetChanged();
                this.EmitEvent( "result-value-changed" );
            }
        }

        event.preventDefault();
    }

    // ~~

    HandleValueInputEvent(
        event
        )
    {
        this.UpdateResultValue();
        this.EmitEvent( "result-value-changed" );
    }

    // ~~

    HandleAddButtonClickEvent(
        event
        )
    {
        this.ValueArray.splice( GetInteger( event.currentTarget.dataset.valueIndex ), 0, "" );

        this.value = GetJsonText( this.ValueArray );
        this.ResultValue = this.value;

        this.SetChanged();
        this.EmitEvent( "result-value-changed" );
    }

    // ~~

    HandleRemoveButtonClickEvent(
        event
        )
    {
        this.ValueArray.splice( GetInteger( event.currentTarget.dataset.valueIndex ), 1 );

        this.value = GetJsonText( this.ValueArray );
        this.ResultValue = this.value;

        this.SetChanged();
        this.EmitEvent( "result-value-changed" );
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
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindProperty( "ValueContainerClass", "value-container-class", "" );
        this.BindProperty( "ValueClass", "value-class", "" );
        this.BindProperty( "AddButtonClass", "add-button-class", "" );
        this.BindProperty( "RemoveButtonClass", "remove-button-class", "" );
        this.BindMethod( "HandleValueContainerDragStartEvent" );
        this.BindMethod( "HandleValueContainerDragEndEvent" );
        this.BindMethod( "HandleValueContainerDragEnterEvent" );
        this.BindMethod( "HandleValueContainerDragOverEvent" );
        this.BindMethod( "HandleValueContainerDragLeaveEvent" );
        this.BindMethod( "HandleValueContainerDropEvent" );
        this.BindMethod( "HandleValueInputEvent" );
        this.BindMethod( "HandleAddButtonClickEvent" );
        this.BindMethod( "HandleRemoveButtonClickEvent" );

        this.value = this.ResultValue;
        this.ValueArray = GetJsonObject( this.ResultValue );
        this.DragValueIndex = -1;
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

        this.ValueContainerElementArray = this.GetElements( ".is-value-container-element" );
        this.ValueElementArray = this.GetElements( ".is-value-element" );
        this.AddButtonElementArray = this.GetElements( ".is-add-button-element" );
        this.RemoveButtonElementArray = this.GetElements( ".is-remove-button-element" );

        this.UpdateValueArray();

        if ( !this.IsReadonly )
        {
            for ( value_index = 0;
                  value_index < this.ValueArray.length;
                  ++value_index )
            {
                this.ValueContainerElementArray[ value_index ].ondragstart = this.HandleValueContainerDragStartEvent;
                this.ValueContainerElementArray[ value_index ].ondragend = this.HandleValueContainerDragEndEvent;
                this.ValueContainerElementArray[ value_index ].ondragenter = this.HandleValueContainerDragEnterEvent;
                this.ValueContainerElementArray[ value_index ].ondragover = this.HandleValueContainerDragOverEvent;
                this.ValueContainerElementArray[ value_index ].ondragleave = this.HandleValueContainerDragLeaveEvent;
                this.ValueContainerElementArray[ value_index ].ondrop = this.HandleValueContainerDropEvent;
                this.ValueElementArray[ value_index ].oninput = this.HandleValueInputEvent;
                this.AddButtonElementArray[ value_index ].onclick = this.HandleAddButtonClickEvent;
                this.RemoveButtonElementArray[ value_index ].onclick = this.HandleRemoveButtonClickEvent;
            }

            this.AddButtonElementArray[ value_index ].onclick = this.HandleAddButtonClickEvent;
        }
    }
}

// ~~

class VISTA_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="<:# this.ValueContainerClass :> is-value-container-element" data-value-index="<:# value_index :>" draggable="true">
                        <input-component class="is-value-element" result-class="<:# this.ValueClass :>" <:# this.IsReadonly ? "is-readonly" : "" :>></input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="<:# this.AddButtonClass :> is-add-button-element" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="<:# this.RemoveButtonClass :> is-remove-button-element" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="<:# this.AddButtonClass :> is-add-button-element" data-value-index="<:# this.ValueArray.length :>">
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// ~~

class VISTA_TEXT_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <textarea id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/></textarea>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="<:# this.ValueContainerClass :> is-value-container-element" data-value-index="<:# value_index :>" draggable="true">
                        <text-input-component class="is-value-element" result-class="<:# this.ValueClass :>" <:# this.IsReadonly ? "is-readonly" : "" :>></text-input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="<:# this.AddButtonClass :> is-add-button-element" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="<:# this.RemoveButtonClass :> is-remove-button-element" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="<:# this.AddButtonClass :> is-add-button-element" data-value-index="<:# this.ValueArray.length :>">
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// ~~

class VISTA_MULTILINGUAL_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.BindProperty( "LanguageCodes", "language-codes", "en" );
        this.BindProperty( "LanguageNames", "language-names", "English" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="<:# this.ValueContainerClass :> is-value-container-element" data-value-index="<:# value_index :>" draggable="true">
                        <multilingual-input-component class="is-value-element" result-class="<:# this.ValueClass :>" <:# this.IsReadonly ? "is-readonly" : "" :> language-codes="<:# this.LanguageCodes :>" language-names="<:# this.LanguageNames :>"></multilingual-input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="<:# this.AddButtonClass :> is-add-button-element" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="<:# this.RemoveButtonClass :> is-remove-button-element" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="<:# this.AddButtonClass :> is-add-button-element" data-value-index="<:# this.ValueArray.length :>">
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// ~~

class VISTA_MULTILINGUAL_TEXT_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.BindProperty( "LanguageCodes", "language-codes", "en" );
        this.BindProperty( "LanguageNames", "language-names", "English" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <textarea id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/></textarea>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="<:# this.ValueContainerClass :> is-value-container-element" data-value-index="<:# value_index :>" draggable="true">
                        <multilingual-text-input-component class="is-value-element" result-class="<:# this.ValueClass :>" <:# this.IsReadonly ? "is-readonly" : "" :> language-codes="<:# this.LanguageCodes :>" language-names="<:# this.LanguageNames :>"></multilingual-text-input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="<:# this.AddButtonClass :> is-add-button-element" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="<:# this.RemoveButtonClass :> is-remove-button-element" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="<:# this.AddButtonClass :> is-add-button-element" data-value-index="<:# this.ValueArray.length :>">
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// ~~

class VISTA_IMAGE_PATH_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.BindProperty( "ImageClass", "image-class", "" );
        this.BindProperty( "ErrorImagePath", "error-image-path", "" );
        this.BindProperty( "UploadButtonClass", "upload-button-class", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteButtonClass", "delete-button-class", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="<:# this.ValueContainerClass :> is-value-container-element" data-value-index="<:# value_index :>" draggable="true">
                        <image-path-input-component class="is-value-element" result-class="<:# this.ValueClass :>" <:# this.IsReadonly ? "is-readonly" : "" :> image-class="<:% this.ImageClass :>" error-image-path="<:% this.ErrorImagePath :>" upload-button-class="<:% this.UploadButtonClass :>" upload-api-url="<:% this.UploadApiUrl :>" delete-button-class="<:% this.DeleteButtonClass :>" delete-api-url="<:% this.DeleteApiUrl :>" ></image-path-input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="<:# this.AddButtonClass :> is-add-button-element" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="<:# this.RemoveButtonClass :> is-remove-button-element" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="<:# this.AddButtonClass :> is-add-button-element" data-value-index="<:# this.ValueArray.length :>">
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// ~~

class VISTA_VIDEO_PATH_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.BindProperty( "VideoClass", "video-class", "" );
        this.BindProperty( "ErrorVideoPath", "error-video-path", "" );
        this.BindProperty( "UploadButtonClass", "upload-button-class", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteButtonClass", "delete-button-class", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="<:# this.ValueContainerClass :> is-value-container-element" data-value-index="<:# value_index :>" draggable="true">
                        <video-path-input-component class="is-value-element" result-class="<:# this.ValueClass :>" <:# this.IsReadonly ? "is-readonly" : "" :> video-class="<:% this.VideoClass :>" error-video-path="<:% this.ErrorVideoPath :>" upload-button-class="<:% this.UploadButtonClass :>" upload-api-url="<:% this.UploadApiUrl :>" delete-button-class="<:% this.DeleteButtonClass :>" delete-api-url="<:% this.DeleteApiUrl :>" ></video-path-input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="<:# this.AddButtonClass :> is-add-button-element" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="<:# this.RemoveButtonClass :> is-remove-button-element" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="<:# this.AddButtonClass :> is-add-button-element" data-value-index="<:# this.ValueArray.length :>">
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// ~~

class VISTA_DOCUMENT_PATH_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.BindProperty( "UploadButtonClass", "upload-button-class", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteButtonClass", "delete-button-class", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );

        this.SetTemplate(
            Text`
            <div class="<:# this.ContainerClass :>">
                <input id="<:# this.ResultId :>" class="<:# this.ResultClass :> is-result-element" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="<:# this.ValueContainerClass :> is-value-container-element" data-value-index="<:# value_index :>" draggable="true">
                        <document-path-input-component class="is-value-element" result-class="<:# this.ValueClass :>" <:# this.IsReadonly ? "is-readonly" : "" :> upload-button-class="<:% this.UploadButtonClass :>" upload-api-url="<:% this.UploadApiUrl :>" delete-button-class="<:% this.DeleteButtonClass :>" delete-api-url="<:% this.DeleteApiUrl :>" ></document-path-input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="<:# this.AddButtonClass :> is-add-button-element" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="<:# this.RemoveButtonClass :> is-remove-button-element" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="<:# this.AddButtonClass :> is-add-button-element" data-value-index="<:# this.ValueArray.length :>">
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// -- FUNCTIONS

function InitializeReadonlySelects(
    )
{
    var
        select_element;

    for ( select_element of GetElements( "select[readonly]" ) )
    {
        select_element.onmousedown = CancelEvent;
    }
}

// -- STATEMENTS

DefineComponent( VISTA_INPUT_COMPONENT, "input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "is-readonly" ] );
DefineComponent( VISTA_TEXT_INPUT_COMPONENT, "text-input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "is-readonly" ] );
DefineComponent( VISTA_MULTILINGUAL_INPUT_COMPONENT, "multilingual-input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "is-readonly", "language-codes", "language-names" ] );
DefineComponent( VISTA_MULTILINGUAL_TEXT_INPUT_COMPONENT, "multilingual-text-input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "is-readonly", "language-codes", "language-names" ] );
DefineComponent( VISTA_IMAGE_PATH_INPUT_COMPONENT, "image-path-input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "is-readonly", "image-class", "error-image-path", "upload-button-class", "upload-api-url", "delete-button-class", "delete-api-url" ] );
DefineComponent( VISTA_VIDEO_PATH_INPUT_COMPONENT, "video-path-input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "is-readonly", "video-class", "error-video-path", "upload-button-class", "upload-api-url", "delete-button-class", "delete-api-url" ] );
DefineComponent( VISTA_DOCUMENT_PATH_INPUT_COMPONENT, "document-path-input-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "is-readonly", "upload-button-class", "upload-api-url", "delete-button-class", "delete-api-url" ] );
DefineComponent( VISTA_INPUT_LIST_COMPONENT, "input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "is-readonly", "value-container-class", "value-class", "add-button-class", "remove-button-class" ] );
DefineComponent( VISTA_TEXT_INPUT_LIST_COMPONENT, "text-input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "is-readonly", "value-container-class", "value-class", "add-button-class", "remove-button-class" ] );
DefineComponent( VISTA_MULTILINGUAL_INPUT_LIST_COMPONENT, "multilingual-input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "is-readonly", "value-container-class", "value-class", "add-button-class", "remove-button-class", "language-codes", "language-names" ] );
DefineComponent( VISTA_MULTILINGUAL_TEXT_INPUT_LIST_COMPONENT, "multilingual-text-input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "is-readonly", "value-container-class", "value-class", "add-button-class", "remove-button-class", "language-codes", "language-names" ] );
DefineComponent( VISTA_IMAGE_PATH_INPUT_LIST_COMPONENT, "image-path-input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "is-readonly", "value-container-class", "value-class", "add-button-class", "remove-button-class", "image-class", "error-image-path", "upload-button-class", "upload-api-url", "delete-button-class", "delete-api-url" ] );
DefineComponent( VISTA_VIDEO_PATH_INPUT_LIST_COMPONENT, "video-path-input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "is-readonly", "value-container-class", "value-class", "add-button-class", "remove-button-class", "video-class", "error-video-path", "upload-button-class", "upload-api-url", "delete-button-class", "delete-api-url" ] );
DefineComponent( VISTA_DOCUMENT_PATH_INPUT_LIST_COMPONENT, "document-path-input-list-component", [ "container-class", "result-id", "result-class", "result-name", "result-value", "result-placeholder", "is-readonly", "value-container-class", "value-class", "add-button-class", "remove-button-class", "upload-button-class", "upload-api-url", "delete-button-class", "delete-api-url" ] );
