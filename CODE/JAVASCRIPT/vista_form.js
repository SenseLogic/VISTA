// -- TYPES

class VISTA_INPUT_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    ResizeElement(
        element
        )
    {
    }

    // ~~

    UpdateView(
        )
    {
        this.ResultElement.value = this.ResultValue;
        this.ResizeElement( this.ResultElement );
    }

    // ~~

    SetValue(
        value
        )
    {
        this.ResultValue = value;
        this.value = value;
        this.UpdateView();
    }

    // ~~

    UpdateValue(
        )
    {
        this.ResultValue = this.ResultElement.value.GetFormText();
        this.value = this.ResultValue;
    }

    // ~~

    HandleResultInputEvent(
        event
        )
    {
        this.ResizeElement( event.currentTarget );
        this.UpdateValue();

        this.EmitEvent( "value-changed" );
        this.EmitEvent( "sub-value-changed" );
        event.Cancel();

        return false;
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindMethod( "HandleResultInputEvent" );

        this.SetTemplate(
            Text`
            <div class="form-component <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-input form-result" name="<:# this.ResultName :>" value="<:% this.ResultValue :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :>/>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".form-result" );

        this.SetValue( this.ResultValue );
        this.ResultElement.oninput = this.HandleResultInputEvent;

        setTimeout(
            () =>
            {
                this.ResizeElement( this.ResultElement );
            }
            );
    }
}

// ~~

class VISTA_TEXT_INPUT_COMPONENT extends VISTA_INPUT_COMPONENT
{
    // -- OPERATIONS

    ResizeElement(
        element
        )
    {
        element.SetContentHeight();
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindMethod( "HandleResultInputEvent" );

        this.SetTemplate(
            Text`
            <div class="form-component <:# this.IsReadonly ? "is-readonly" : "" :>">
                <textarea id="<:# this.ResultId :>" class="form-textarea form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :>><:% this.ResultValue :></textarea>
            </div>
            `
            );
    }
}

// ~~

class VISTA_COLOR_INPUT_COMPONENT extends VISTA_INPUT_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindMethod( "HandleResultInputEvent" );

        this.SetTemplate(
            Text`
            <div class="form-component <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-input form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" type="color" <:# this.IsReadonly ? "readonly" : "" :>/>
            </div>
            `
            );
    }
}

// ~~

class VISTA_PATH_INPUT_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    ShowUploadAnimation(
        )
    {
    }

    // ~~

    HideUploadAnimation(
        )
    {
    }

    // ~~

    SetValue(
        value
        )
    {
        this.ResultValue = value;
        this.value = value;
        this.UpdateView();
    }

    // ~~

    HandleResultInputEvent(
        event
        )
    {
        this.SetValue( this.ResultElement.value );

        event.Cancel();
        this.EmitEvent( "value-changed" );
        this.EmitEvent( "sub-value-changed" );

        return false;
    }

    // ~~

    async HandleFileInputChangeEvent(
        event
        )
    {
        var
            request,
            form_data;

        if ( this.FileInputElement.files.length > 0 )
        {
            this.ShowUploadAnimation();
            form_data = new FormData();
            form_data.append( "File", this.FileInputElement.files[ 0 ] );
            request = await SendRequest( this.UploadApiUrl, "POST", form_data );

            if ( request.status === 201 )
            {
                this.HideUploadAnimation();
                this.SetValue( GetJsonObject( request.response ) );
                this.EmitEvent( "value-changed" );
                this.EmitEvent( "sub-value-changed" );
            }
        }

        event.Cancel();

        return false;
    }

    // ~~

    async HandleDeleteButtonClickEvent(
        event
        )
    {
        var
            file_path,
            file_path_input_element,
            file_element,
            request,
            form_data;

        if ( this.ResultElement.value !== "" )
        {
            form_data = new FormData();
            form_data.append( "FilePath", this.ResultElement.value );
            request = await SendRequest( this.DeleteApiUrl, "POST", form_data );

            if ( request.status === 201 )
            {
                this.SetValue( "" );
                this.EmitEvent( "value-changed" );
                this.EmitEvent( "sub-value-changed" );
            }
        }

        event.Cancel();

        return false;
    }
}

// ~~

class VISTA_IMAGE_PATH_INPUT_COMPONENT extends VISTA_PATH_INPUT_COMPONENT
{
    // -- OPERATIONS

    ShowUploadAnimation(
        )
    {
        this.ImageElement.AddClass( "has-upload-animation" );
    }

    // ~~

    HideUploadAnimation(
        )
    {
        this.ImageElement.RemoveClass( "has-upload-animation" );
    }

    // ~~

    UpdateView(
        )
    {
        this.ResultElement.value = this.ResultValue;

        if ( this.ResultValue !== '' )
        {
            this.ImageElement.src = this.ResultValue;
        }
        else
        {
            this.ImageElement.src = this.ErrorImagePath;
        }
    }

    // ~~

    HandleImageErrorEvent(
        )
    {
        this.ImageElement.src = this.ErrorImagePath;
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindProperty( "ErrorImagePath", "error-image-path", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );
        this.BindMethod( "HandleResultInputEvent" );
        this.BindMethod( "HandleImageErrorEvent" );
        this.BindMethod( "HandleFileInputChangeEvent" );
        this.BindMethod( "HandleDeleteButtonClickEvent" );

        this.value = this.ResultValue;

        this.SetTemplate(
            Text`
            <div class="form-component form-upload-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-input form-upload-input form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :>/>
                <img class="form-image form-upload-image"/>
                <: if ( !this.IsReadonly ) { :>
                    <label class="form-button form-upload-button">
                        <input class="form-file-input" type="file" accept="image/avif, image/gif, image/jpeg, image/png, image/webp, image/svg" hidden/>
                    </label>
                    <label class="form-button form-delete-button">
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
        this.ResultElement = this.GetElement( ".form-result" );
        this.ImageElement = this.GetElement( ".form-image" );

        this.SetValue( this.ResultValue );

        this.ImageElement.onerror = this.HandleImageErrorEvent;
        this.ResultElement.oninput = this.HandleResultInputEvent;

        if ( !this.IsReadonly )
        {
            this.FileInputElement = this.GetElement( ".form-file-input" );
            this.FileInputElement.src = this.ResultValue;
            this.FileInputElement.onchange = this.HandleFileInputChangeEvent;

            this.DeleteButtonElement = this.GetElement( ".form-delete-button" );
            this.DeleteButtonElement.onclick = this.HandleDeleteButtonClickEvent;
        }
    }
}

// ~~

class VISTA_VIDEO_PATH_INPUT_COMPONENT extends VISTA_PATH_INPUT_COMPONENT
{
    // -- OPERATIONS

    ShowUploadAnimation(
        )
    {
        this.VideoElement.AddClass( "has-upload-animation" );
    }

    // ~~

    HideUploadAnimation(
        )
    {
        this.VideoElement.RemoveClass( "has-upload-animation" );
    }

    // ~~

    UpdateView(
        )
    {
        this.ResultElement.value = this.ResultValue;

        if ( this.ResultValue !== '' )
        {
            this.VideoElement.src = this.ResultValue;
        }
        else
        {
            this.VideoElement.src = this.ErrorVideoPath;
        }
    }

    // ~~

    HandleVideoErrorEvent(
        )
    {
        this.VideoElement.src = this.ErrorVideoPath;
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindProperty( "ErrorVideoPath", "error-video-path", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );
        this.BindMethod( "HandleResultInputEvent" );
        this.BindMethod( "HandleVideoErrorEvent" );
        this.BindMethod( "HandleFileInputChangeEvent" );
        this.BindMethod( "HandleDeleteButtonClickEvent" );

        this.value = this.ResultValue;

        this.SetTemplate(
            Text`
            <div class="form-component form-upload-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-input form-upload-input form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :>/>
                <video class="form-video form-upload-video" type="video/mp4"></video>
                <: if ( !this.IsReadonly ) { :>
                    <label class="form-button form-upload-button">
                        <input class="form-file-input" type="file" accept="video/mp4" hidden/>
                    </label>
                    <div class="form-button form-delete-button">
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
        this.ResultElement = this.GetElement( ".form-result" );
        this.VideoElement = this.GetElement( ".form-video" );

        this.SetValue( this.ResultValue );

        this.VideoElement.onerror = this.HandleVideoErrorEvent;
        this.ResultElement.oninput = this.HandleResultInputEvent;

        if ( !this.IsReadonly )
        {
            this.FileInputElement = this.GetElement( ".form-file-input" );
            this.FileInputElement.src = this.ResultValue;
            this.FileInputElement.onchange = this.HandleFileInputChangeEvent;

            this.DeleteButtonElement = this.GetElement( ".form-delete-button" );
            this.DeleteButtonElement.onclick = this.HandleDeleteButtonClickEvent;
        }
    }
}

// ~~

class VISTA_DOCUMENT_PATH_INPUT_COMPONENT extends VISTA_PATH_INPUT_COMPONENT
{
    // -- OPERATIONS

    ShowUploadAnimation(
        )
    {
        this.ImageElement.AddClass( "has-upload-animation" );
    }

    // ~~

    HideUploadAnimation(
        )
    {
        this.ImageElement.RemoveClass( "has-upload-animation" );
    }

    // ~~

    UpdateView(
        )
    {
        this.ResultElement.value = this.ResultValue;

        if ( this.ResultValue !== '' )
        {
            this.ImageElement.src = this.DocumentImagePath;
        }
        else
        {
            this.ImageElement.src = this.ErrorImagePath;
        }
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindProperty( "DocumentImagePath", "document-image-path", "" );
        this.BindProperty( "ErrorImagePath", "error-image-path", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );
        this.BindMethod( "HandleResultInputEvent" );
        this.BindMethod( "HandleFileInputChangeEvent" );
        this.BindMethod( "HandleDeleteButtonClickEvent" );

        this.value = this.ResultValue;

        this.SetTemplate(
            Text`
            <div class="form-component form-upload-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-input form-upload-input form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :>/>
                <img class="form-image form-upload-image"/>
                <: if ( !this.IsReadonly ) { :>
                    <label class="form-button form-upload-button">
                        <input class="form-file-input" type="file" accept="application/pdf" hidden/>
                    </label>
                    <label class="form-button form-delete-button">
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
        this.ResultElement = this.GetElement( ".form-result" );
        this.ImageElement = this.GetElement( ".form-image" );

        this.SetValue( this.ResultValue );

        this.ResultElement.oninput = this.HandleResultInputEvent;

        if ( !this.IsReadonly )
        {
            this.FileInputElement = this.GetElement( ".form-file-input" );
            this.FileInputElement.src = this.ResultValue;
            this.FileInputElement.onchange = this.HandleFileInputChangeEvent;

            this.DeleteButtonElement = this.GetElement( ".form-delete-button" );
            this.DeleteButtonElement.onclick = this.HandleDeleteButtonClickEvent;
        }
    }
}

// ~~

class VISTA_DROPDOWN_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    UpdateView(
        )
    {
        this.ResultElement.value = this.ResultValue;
    }

    // ~~

    SetValue(
        value
        )
    {
        if ( !( this.IsOptional
                && value === this.NullValue )
             && this.OptionValueArray.indexOf( value ) < 0
             && this.OptionValueArray.length > 0 )
        {
            value = this.OptionValueArray[ 0 ];
        }

        this.ResultValue = value;
        this.value = value;
        this.UpdateView();
    }

    // ~~

    UpdateValue(
        )
    {
        this.ResultValue = this.ResultElement.value;
        this.value = this.ResultValue;
    }

    // ~~

    HandleResultInputEvent(
        event
        )
    {
        this.UpdateValue();
        this.EmitEvent( "value-changed" );
        this.EmitEvent( "sub-value-changed" );

        event.Cancel();

        return false;
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindProperty( "IsOptional", "is-optional", false );
        this.BindProperty( "NullName", "null-name", "None" );
        this.BindProperty( "NullValue", "null-value", "" );
        this.BindProperty( "OptionNames", "option-names", "[]" );
        this.BindProperty( "OptionValues", "option-values", "[]" );
        this.BindMethod( "HandleResultInputEvent" );

        this.OptionValueArray = GetJsonObject( this.OptionValues );
        this.OptionNameArray = GetJsonObject( this.OptionNames );
        this.SetTemplate(
            Text`
            <div class="form-component form-dropdown-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <select id="<:# this.ResultId :>" class="form-select form-result" name="<:# this.ResultName :>" <:# this.IsReadonly ? "readonly" : "" :>/>
                    <: if ( this.IsOptional ) { :>
                        <option class="form-option form-dropdown-option" value="<:% this.NullValue :>" <:# ( this.ResultValue === this.NullValue ) ? "selected" : "" :>><:% this.NullName :></option>
                    <: } :>
                    <: for ( let option_index = 0; option_index < this.OptionValueArray.length; ++option_index ) { :>
                        <option class="form-option form-dropdown-option" value="<:% this.OptionValueArray[ option_index ] :>"><:% this.OptionNameArray[ option_index ] :></option>
                    <: } :>
                </select>
            </div>
            `
            );
    }

    // ~~

    PostUpdateComponent(
        )
    {
        this.ResultElement = this.GetElement( ".form-result" );

        this.SetValue( this.ResultValue );
        this.ResultElement.oninput = this.HandleResultInputEvent;
    }
}

// ~~

class VISTA_LIST_COMPONENT extends VISTA_COMPONENT
{
    // -- INQUIRIES

    GetAddedValue(
        )
    {
        return this.AddedValue;
    }

    // -- OPERATIONS

    SetDraggable(
        draggable
        )
    {
        var
           value_container_element,
            value_container_input_element;

        for ( value_container_element of this.GetElements( ".form-value-container" ) )
        {
            value_container_element.setAttribute( "draggable", draggable );

            for ( value_container_input_element of value_container_element.GetElements( "input, textarea" ) )
            {
                value_container_input_element.setAttribute( "draggable", false );
                value_container_input_element.ondragstart = CancelEvent;
            }
        }
    }

    // ~~

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
            this.ValueElementArray[ value_index ].SetValue( this.ValueArray[ value_index ] );
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

        this.ResultValue = GetJsonText( this.ValueArray );
        this.value = this.ResultValue;
        this.ResultElement.value = this.ResultValue;
    }

    // ~~

    UpdateView(
        )
    {
        this.ResultElement.value = this.ResultValue;
        this.UpdateValueArray();
    }

    // ~~

    SetValue(
        value
        )
    {
        this.ResultValue = value;
        this.value = value;
        this.UpdateView();
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

                this.ResultValue = GetJsonText( this.ValueArray );
                this.value = this.ResultValue;
                this.ResultElement.value = this.ResultValue;

                this.UpdateValueArray();

                this.DragValueIndex = -1;
            }
        }

        event.preventDefault();
    }

    // ~~

    HandleSubValueChangedEvent(
        event
        )
    {
        this.UpdateResultValue();
    }

    // ~~

    HandleDragButtonMouseEnterEvent(
        event
        )
    {
        this.SetDraggable( true );
    }

    // ~~

    HandleDragButtonMouseLeaveEvent(
        event
        )
    {
        this.SetDraggable( false );
    }

    // ~~

    HandleAddButtonClickEvent(
        event
        )
    {
        this.ValueArray.splice( GetInteger( event.currentTarget.dataset.valueIndex ), 0, this.GetAddedValue() );

        this.value = GetJsonText( this.ValueArray );
        this.ResultValue = this.value;

        this.SetChanged();
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
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindProperty( "AddedValue", "added-value", "" );
        this.BindMethod( "HandleValueContainerDragStartEvent" );
        this.BindMethod( "HandleValueContainerDragEndEvent" );
        this.BindMethod( "HandleValueContainerDragEnterEvent" );
        this.BindMethod( "HandleValueContainerDragOverEvent" );
        this.BindMethod( "HandleValueContainerDragLeaveEvent" );
        this.BindMethod( "HandleValueContainerDropEvent" );
        this.BindMethod( "HandleSubValueChangedEvent" );
        this.BindMethod( "HandleDragButtonMouseEnterEvent" );
        this.BindMethod( "HandleDragButtonMouseLeaveEvent" );
        this.BindMethod( "HandleAddButtonClickEvent" );
        this.BindMethod( "HandleRemoveButtonClickEvent" );
        this.BindEvent( this, "sub-value-changed", this.HandleSubValueChangedEvent );

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

        this.ResultElement = this.GetElement( ".form-result" );

        this.ValueContainerElementArray = this.GetElements( ".form-value-container" );
        this.ValueElementArray = this.GetElements( ".form-value" );
        this.DragButtonElementArray = this.GetElements( ".form-drag-button" );
        this.AddButtonElementArray = this.GetElements( ".form-add-button" );
        this.RemoveButtonElementArray = this.GetElements( ".form-remove-button" );

        this.SetValue( this.ResultValue );
        this.ResultElement.oninput = this.HandleResultInputEvent;

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
                this.DragButtonElementArray[ value_index ].onmouseenter = this.HandleDragButtonMouseEnterEvent;
                this.DragButtonElementArray[ value_index ].onmouseleave = this.HandleDragButtonMouseLeaveEvent;
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
            <div class="form-component form-list-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="form-value-container" data-value-index="<:# value_index :>">
                        <input-component class="form-value" <:# this.IsReadonly ? "is-readonly" : "" :>></input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="form-button form-drag-button data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-add-button" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-remove-button" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="form-button form-add-button" data-value-index="<:# this.ValueArray.length :>">
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
            <div class="form-component form-list-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <textarea id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden></textarea>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="form-value-container" data-value-index="<:# value_index :>">
                        <text-input-component class="form-value" <:# this.IsReadonly ? "is-readonly" : "" :>></text-input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="form-button form-drag-button data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-add-button" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-remove-button" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="form-button form-add-button" data-value-index="<:# this.ValueArray.length :>">
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

        this.BindProperty( "ErrorImagePath", "error-image-path", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );

        this.SetTemplate(
            Text`
            <div class="form-component form-list-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="form-value-container" data-value-index="<:# value_index :>">
                        <image-path-input-component class="form-value" <:# this.IsReadonly ? "is-readonly" : "" :> error-image-path="<:% this.ErrorImagePath :>" upload-api-url="<:% this.UploadApiUrl :>" delete-api-url="<:% this.DeleteApiUrl :>" ></image-path-input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="form-button form-drag-button data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-add-button" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-remove-button" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="form-button form-add-button" data-value-index="<:# this.ValueArray.length :>">
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

        this.BindProperty( "ErrorVideoPath", "error-video-path", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );

        this.SetTemplate(
            Text`
            <div class="form-component form-list-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="form-value-container" data-value-index="<:# value_index :>">
                        <video-path-input-component class="form-value" <:# this.IsReadonly ? "is-readonly" : "" :> error-video-path="<:% this.ErrorVideoPath :>" upload-api-url="<:% this.UploadApiUrl :>" delete-api-url="<:% this.DeleteApiUrl :>" ></video-path-input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="form-button form-drag-button data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-add-button" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-remove-button" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="form-button form-add-button" data-value-index="<:# this.ValueArray.length :>">
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

        this.BindProperty( "DocumentImagePath", "document-image-path", "" );
        this.BindProperty( "ErrorImagePath", "error-image-path", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );

        this.SetTemplate(
            Text`
            <div class="form-component form-list-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="form-value-container" data-value-index="<:# value_index :>">
                        <document-path-input-component class="form-value" <:# this.IsReadonly ? "is-readonly" : "" :> document-image-path="<:% this.DocumentImagePath :>" error-image-path="<:% this.ErrorImagePath :>" upload-api-url="<:% this.UploadApiUrl :>" delete-api-url="<:% this.DeleteApiUrl :>" ></document-path-input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="form-button form-drag-button data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-add-button" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-remove-button" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="form-button form-add-button" data-value-index="<:# this.ValueArray.length :>">
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// ~~

class VISTA_DROPDOWN_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- INQUIRIES

    GetAddedValue(
        )
    {
        if ( this.OptionValueArray.indexOf( this.AddedValue ) >= 0 )
        {
            return this.AddedValue;
        }
        else if ( this.OptionValueArray.length > 0 )
        {
            return this.OptionValueArray[ 0 ];
        }
        else
        {
            return this.AddedValue;
        }
    }

    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.BindProperty( "IsOptional", "is-optional", false );
        this.BindProperty( "OptionValues", "option-values", "[]" );
        this.BindProperty( "OptionNames", "option-names", "[]" );

        this.OptionValueArray = GetJsonObject( this.OptionValues );
        this.OptionNameArray = GetJsonObject( this.OptionNames );
        this.SetTemplate(
            Text`
            <div class="form-component form-list-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="form-value-container" data-value-index="<:# value_index :>">
                        <dropdown-component class="form-value" result-placeholder="<:# this.ResultPlaceholder :>" <:# this.IsReadonly ? "is-readonly" : "" :> <:# this.IsOptional ? "is-optional" : "" :> option-values="<:% this.OptionValues :>" option-names="<:% this.OptionNames :>"></dropdown-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="form-button form-drag-button data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-add-button" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-remove-button" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="form-button form-add-button" data-value-index="<:# this.ValueArray.length :>">
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// ~~

class VISTA_MULTILINGUAL_COMPONENT extends VISTA_COMPONENT
{
    // -- OPERATIONS

    GetNextLanguageTag(
        )
    {
        var
            language_tag,
            language_tag_index,
            translation,
            translation_index;

        for ( language_tag_index = 1;
              language_tag_index < this.LanguageTagArray.length;
              ++language_tag_index )
        {
            language_tag = this.LanguageTagArray[ language_tag_index ];

            for ( translation_index = 0;
                  translation_index < this.TranslationArray.length;
                  ++translation_index )
            {
                translation = this.TranslationArray[ translation_index ];

                if ( translation.Specifier.indexOf( language_tag ) >= 0 )
                {
                    language_tag = "";

                    break;
                }
            }

            if ( language_tag !== "" )
            {
                return language_tag;
            }
        }

        return "";
    }

    // ~~

    SetValue(
        value
        )
    {
        var
            old_value;

        old_value = this.value;

        this.ResultValue = value;
        this.value = value;
        this.UpdateView();

        if ( value != old_value )
        {
            this.SetChanged();
        }
    }

    // ~~

    UpdateView(
        )
    {
        var
            translation_index;

        this.ResultElement.value = this.ResultValue;
        this.TranslationArray = this.ResultValue.GetTranslationArray();

        for ( translation_index = 0;
              translation_index < this.TranslationArray.length;
              ++translation_index )
        {
            if ( translation_index < this.TranslationInputElementArray.length )
            {
                this.TranslationInputElementArray[ translation_index ].value = this.TranslationArray[ translation_index ].Data;
            }

            if ( translation_index < this.TranslationSpecifierElementArray.length )
            {
                this.TranslationSpecifierElementArray[ translation_index ].value = this.TranslationArray[ translation_index ].Specifier;
            }
        }
    }

    // ~~

    UpdateValue(
        )
    {
        var
            translation_index;

        for ( translation_index = 0;
              translation_index < this.TranslationArray.length;
              ++translation_index )
        {
            if ( translation_index < this.TranslationInputElementArray.length )
            {
                this.TranslationArray[ translation_index ].Data = this.TranslationInputElementArray[ translation_index ].value.GetFormText();
            }

            if ( translation_index < this.TranslationSpecifierElementArray.length )
            {
                this.TranslationArray[ translation_index ].Specifier = this.TranslationSpecifierElementArray[ translation_index ].value.GetFormText();
            }
        }

        this.ResultValue = this.TranslationArray.GetMultilingualText();
        this.value = this.ResultValue;
        this.ResultElement.value = this.ResultValue;
    }

    // ~~

    HandleSubValueChangedEvent(
        event
        )
    {
        this.UpdateValue();
    }

    // ~~

    HandleTranslationDataInputEvent(
        event
        )
    {
        this.UpdateValue();

        this.EmitEvent( "value-changed" );
        this.EmitEvent( "sub-value-changed" );
        event.Cancel();

        return false;
    }

    // ~~

    HandleTranslationSpecifierInputEvent(
        event
        )
    {
        this.UpdateValue();

        this.EmitEvent( "value-changed" );
        this.EmitEvent( "sub-value-changed" );
        event.Cancel();

        return false;
    }

    // ~~

    HandleTranslationAddButtonClickEvent(
        event
        )
    {
        this.TranslationArray.splice( GetInteger( event.currentTarget.dataset.translationIndex ), 0, { Specifier : this.GetNextLanguageTag(), Data : "" } );
        this.SetValue( this.TranslationArray.GetMultilingualText() );
    }

    // ~~

    HandleTranslationRemoveButtonClickEvent(
        event
        )
    {
        this.TranslationArray.splice( GetInteger( event.currentTarget.dataset.translationIndex ), 1 );
        this.SetValue( this.TranslationArray.GetMultilingualText() );
    }

    // ~~

    InitializeComponent(
        )
    {
        this.BindStyle();
        this.BindProperty( "ResultId", "result-id", "" );
        this.BindProperty( "ResultName", "result-name", "" );
        this.BindProperty( "ResultValue", "result-value", "" );
        this.BindProperty( "ResultPlaceholder", "result-placeholder", "" );
        this.BindProperty( "IsReadonly", "is-readonly", false );
        this.BindProperty( "LanguageTags", "language-tags", "[\"en\"]" );
        this.BindMethod( "HandleTranslationDataInputEvent" );
        this.BindMethod( "HandleTranslationSpecifierInputEvent" );
        this.BindMethod( "HandleTranslationAddButtonClickEvent" );
        this.BindMethod( "HandleTranslationRemoveButtonClickEvent" );
        this.BindEvent( this, "sub-value-changed", this.HandleSubValueChangedEvent );

        this.LanguageTagArray = GetJsonObject( this.LanguageTags );
        this.TranslationArray = this.ResultValue.GetTranslationArray();
    }

    // ~~

    PostUpdateComponent(
        )
    {
        var
            translation_add_button_element,
            translation_index,
            translation_remove_button_element;

        this.ResultElement = this.GetElement( ".form-result" );
        this.TranslationInputElementArray = this.GetElements( ".form-translation-data" );
        this.TranslationSpecifierElementArray = this.GetElements( ".form-translation-specifier" );
        this.TranslationAddButtonElementArray = this.GetElements( ".form-translation-add-button" );
        this.TranslationRemoveButtonElementArray = this.GetElements( ".form-translation-remove-button" );
        this.SetValue( this.ResultValue );

        for ( translation_index = 0;
              translation_index < this.TranslationArray.length;
              ++translation_index )
        {
            if ( translation_index < this.TranslationInputElementArray.length )
            {
                this.TranslationInputElementArray[ translation_index ].oninput = this.HandleTranslationDataInputEvent;
            }

            if ( translation_index < this.TranslationSpecifierElementArray.length )
            {
                this.TranslationSpecifierElementArray[ translation_index ].oninput = this.HandleTranslationSpecifierInputEvent;
            }
        }

        for ( translation_add_button_element of this.TranslationAddButtonElementArray )
        {
            translation_add_button_element.onclick = this.HandleTranslationAddButtonClickEvent;
        }

        for ( translation_remove_button_element of this.TranslationRemoveButtonElementArray )
        {
            translation_remove_button_element.onclick = this.HandleTranslationRemoveButtonClickEvent;
        }
    }
}

// ~~

class VISTA_MULTILINGUAL_INPUT_COMPONENT extends VISTA_MULTILINGUAL_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.SetTemplate(
            Text`
            <div class="form-component form-translation-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( let translation_index = 0; translation_index < this.TranslationArray.length; ++translation_index ) { :>
                    <div class="form-translation <:# this.IsReadonly ? "is-readonly" : "" :>">
                        <input-component class="form-translation-data" result-value="<:% this.TranslationArray[ translation_index ].Data :>" <:# this.IsReadonly ? "is-readonly" : "" :>></input-component>
                        <input class="form-input form-translation-specifier" placeholder="<:# translation_index === 0 ? this.LanguageTagArray[ 0 ] : "" :>" value="<:% this.TranslationArray[ translation_index ].Specifier :>" <:# ( this.IsReadonly || translation_index === 0 )  ? "readonly" : "" :>/>
                        <div class="form-translation-button-container">
                            <: if ( !this.IsReadonly ) { :>
                                <div class="form-button form-translation-add-button" data-translation-index="<:# translation_index + 1 :>">
                                </div>
                                <: if ( translation_index > 0 ) { :>
                                    <div class="form-button form-translation-remove-button" data-translation-index="<:# translation_index :>">
                                    </div>
                                <: } :>
                            <: } :>
                        </div>
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// ~~

class VISTA_MULTILINGUAL_TEXT_INPUT_COMPONENT extends VISTA_MULTILINGUAL_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.SetTemplate(
            Text`
            <div class="form-component form-translation-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <textarea id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden></textarea>
                <: for ( let translation_index = 0; translation_index < this.TranslationArray.length; ++translation_index ) { :>
                    <div class="form-translation <:# this.IsReadonly ? "is-readonly" : "" :>">
                        <text-input-component class="form-translation-data" result-value="<:% this.TranslationArray[ translation_index ].Data :>" <:# this.IsReadonly ? "is-readonly" : "" :>></text-input-component>
                        <input class="form-input form-translation-specifier" placeholder="<:# translation_index === 0 ? this.LanguageTagArray[ 0 ] : "" :>" value="<:% this.TranslationArray[ translation_index ].Specifier :>" <:# ( this.IsReadonly || translation_index === 0 ) ? "readonly" : "" :>/>
                        <div>
                            <: if ( !this.IsReadonly ) { :>
                                <div class="form-button form-translation-add-button" data-translation-index="<:# translation_index + 1 :>">
                                </div>
                                <: if ( translation_index > 0 ) { :>
                                    <div class="form-button form-translation-remove-button" data-translation-index="<:# translation_index :>">
                                    </div>
                                <: } :>
                            <: } :>
                        </div>
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// ~~

class VISTA_MULTILINGUAL_IMAGE_PATH_INPUT_COMPONENT extends VISTA_MULTILINGUAL_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.BindProperty( "ErrorImagePath", "error-image-path", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );

        this.SetTemplate(
            Text`
            <div class="form-component form-translation-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( let translation_index = 0; translation_index < this.TranslationArray.length; ++translation_index ) { :>
                    <div class="form-translation <:# this.IsReadonly ? "is-readonly" : "" :>">
                        <image-path-input-component class="form-path form-input form-translation-data" result-value="<:% this.TranslationArray[ translation_index ].Data :>" <:# this.IsReadonly ? "is-readonly" : "" :> error-image-path="<:% this.ErrorImagePath :>" upload-api-url="<:% this.UploadApiUrl :>" delete-api-url="<:% this.DeleteApiUrl :>" ></image-path-input-component>
                        <input class="form-input form-translation-specifier" placeholder="<:# translation_index === 0 ? this.LanguageTagArray[ 0 ] : "" :>" value="<:% this.TranslationArray[ translation_index ].Specifier :>" <:# ( this.IsReadonly || translation_index === 0 )  ? "readonly" : "" :>/>
                        <div class="form-translation-button-container">
                            <: if ( !this.IsReadonly ) { :>
                                <div class="form-button form-translation-add-button" data-translation-index="<:# translation_index + 1 :>">
                                </div>
                                <: if ( translation_index > 0 ) { :>
                                    <div class="form-button form-translation-remove-button" data-translation-index="<:# translation_index :>">
                                    </div>
                                <: } :>
                            <: } :>
                        </div>
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// ~~

class VISTA_MULTILINGUAL_VIDEO_PATH_INPUT_COMPONENT extends VISTA_MULTILINGUAL_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.BindProperty( "ErrorVideoPath", "error-video-path", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );

        this.SetTemplate(
            Text`
            <div class="form-component form-translation-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( let translation_index = 0; translation_index < this.TranslationArray.length; ++translation_index ) { :>
                    <div class="form-translation <:# this.IsReadonly ? "is-readonly" : "" :>">
                        <video-path-input-component class="form-path form-input form-translation-data" result-value="<:% this.TranslationArray[ translation_index ].Data :>" <:# this.IsReadonly ? "is-readonly" : "" :> error-video-path="<:% this.ErrorVideoPath :>" upload-api-url="<:% this.UploadApiUrl :>" delete-api-url="<:% this.DeleteApiUrl :>" ></video-path-input-component>
                        <input class="form-input form-translation-specifier" placeholder="<:# translation_index === 0 ? this.LanguageTagArray[ 0 ] : "" :>" value="<:% this.TranslationArray[ translation_index ].Specifier :>" <:# ( this.IsReadonly || translation_index === 0 )  ? "readonly" : "" :>/>
                        <div class="form-translation-button-container">
                            <: if ( !this.IsReadonly ) { :>
                                <div class="form-button form-translation-add-button" data-translation-index="<:# translation_index + 1 :>">
                                </div>
                                <: if ( translation_index > 0 ) { :>
                                    <div class="form-button form-translation-remove-button" data-translation-index="<:# translation_index :>">
                                    </div>
                                <: } :>
                            <: } :>
                        </div>
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// ~~

class VISTA_MULTILINGUAL_DOCUMENT_PATH_INPUT_COMPONENT extends VISTA_MULTILINGUAL_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.BindProperty( "DocumentImagePath", "document-image-path", "" );
        this.BindProperty( "ErrorImagePath", "error-image-path", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );

        this.SetTemplate(
            Text`
            <div class="form-component form-translation-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( let translation_index = 0; translation_index < this.TranslationArray.length; ++translation_index ) { :>
                    <div class="form-translation <:# this.IsReadonly ? "is-readonly" : "" :>">
                        <document-path-input-component class="form-path form-input form-translation-data" result-value="<:% this.TranslationArray[ translation_index ].Data :>" <:# this.IsReadonly ? "is-readonly" : "" :> document-image-path="<:% this.DocumentImagePath :>" error-image-path="<:% this.ErrorImagePath :>" upload-api-url="<:% this.UploadApiUrl :>" delete-api-url="<:% this.DeleteApiUrl :>" ></document-path-input-component>
                        <input class="form-input form-translation-specifier" placeholder="<:# translation_index === 0 ? this.LanguageTagArray[ 0 ] : "" :>" value="<:% this.TranslationArray[ translation_index ].Specifier :>" <:# ( this.IsReadonly || translation_index === 0 )  ? "readonly" : "" :>/>
                        <div class="form-translation-button-container">
                            <: if ( !this.IsReadonly ) { :>
                                <div class="form-button form-translation-add-button" data-translation-index="<:# translation_index + 1 :>">
                                </div>
                                <: if ( translation_index > 0 ) { :>
                                    <div class="form-button form-translation-remove-button" data-translation-index="<:# translation_index :>">
                                    </div>
                                <: } :>
                            <: } :>
                        </div>
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

        this.BindProperty( "LanguageTags", "language-tags", "[\"en\"]" );

        this.SetTemplate(
            Text`
            <div class="form-component form-list-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="form-value-container" data-value-index="<:# value_index :>">
                        <multilingual-input-component class="form-value" <:# this.IsReadonly ? "is-readonly" : "" :> language-tags="<:% this.LanguageTags :>"></multilingual-input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="form-button form-drag-button data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-add-button" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-remove-button" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="form-button form-add-button" data-value-index="<:# this.ValueArray.length :>">
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

        this.BindProperty( "LanguageTags", "language-tags", "[\"en\"]" );

        this.SetTemplate(
            Text`
            <div class="form-component form-list-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <textarea id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden></textarea>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="form-value-container" data-value-index="<:# value_index :>">
                        <multilingual-text-input-component class="form-value" <:# this.IsReadonly ? "is-readonly" : "" :> language-tags="<:% this.LanguageTags :>"></multilingual-text-input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="form-button form-drag-button data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-add-button" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-remove-button" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="form-button form-add-button" data-value-index="<:# this.ValueArray.length :>">
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// ~~

class VISTA_MULTILINGUAL_IMAGE_PATH_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.BindProperty( "ErrorImagePath", "error-image-path", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );
        this.BindProperty( "LanguageTags", "language-tags", "[\"en\"]" );

        this.SetTemplate(
            Text`
            <div class="form-component form-list-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="form-value-container" data-value-index="<:# value_index :>">
                        <multilingual-image-path-input-component class="form-value" <:# this.IsReadonly ? "is-readonly" : "" :> error-image-path="<:% this.ErrorImagePath :>" upload-api-url="<:% this.UploadApiUrl :>" delete-api-url="<:% this.DeleteApiUrl :>" language-tags="<:% this.LanguageTags :>"></multilingual-image-path-input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="form-button form-drag-button data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-add-button" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-remove-button" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="form-button form-add-button" data-value-index="<:# this.ValueArray.length :>">
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// ~~

class VISTA_MULTILINGUAL_VIDEO_PATH_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.BindProperty( "ErrorVideoPath", "error-video-path", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );
        this.BindProperty( "LanguageTags", "language-tags", "[\"en\"]" );

        this.SetTemplate(
            Text`
            <div class="form-component form-list-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="form-value-container" data-value-index="<:# value_index :>">
                        <multilingual-video-path-input-component class="form-value" <:# this.IsReadonly ? "is-readonly" : "" :> error-video-path="<:% this.ErrorVideoPath :>" upload-api-url="<:% this.UploadApiUrl :>" delete-api-url="<:% this.DeleteApiUrl :>" language-tags="<:% this.LanguageTags :>"></multilingual-video-path-input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="form-button form-drag-button data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-add-button" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-remove-button" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="form-button form-add-button" data-value-index="<:# this.ValueArray.length :>">
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// ~~

class VISTA_MULTILINGUAL_DOCUMENT_PATH_INPUT_LIST_COMPONENT extends VISTA_LIST_COMPONENT
{
    // -- OPERATIONS

    InitializeComponent(
        )
    {
        super.InitializeComponent();

        this.BindProperty( "DocumentImagePath", "document-image-path", "" );
        this.BindProperty( "ErrorImagePath", "error-image-path", "" );
        this.BindProperty( "UploadApiUrl", "upload-api-url", "" );
        this.BindProperty( "DeleteApiUrl", "delete-api-url", "" );
        this.BindProperty( "LanguageTags", "language-tags", "[\"en\"]" );

        this.SetTemplate(
            Text`
            <div class="form-component form-list-container <:# this.IsReadonly ? "is-readonly" : "" :>">
                <input id="<:# this.ResultId :>" class="form-result" name="<:# this.ResultName :>" placeholder="<:% this.ResultPlaceholder :>" <:# this.IsReadonly ? "readonly" : "" :> hidden/>
                <: for ( var value_index = 0; value_index < this.ValueArray.length; ++value_index ) { :>
                    <div class="form-value-container" data-value-index="<:# value_index :>">
                        <multilingual-document-path-input-component class="form-value" <:# this.IsReadonly ? "is-readonly" : "" :> document-image-path="<:% this.DocumentImagePath :>" error-image-path="<:% this.ErrorImagePath :>" upload-api-url="<:% this.UploadApiUrl :>" delete-api-url="<:% this.DeleteApiUrl :>" language-tags="<:% this.LanguageTags :>"></multilingual-document-path-input-component>
                        <: if ( !this.IsReadonly ) { :>
                            <div class="form-button form-drag-button data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-add-button" data-value-index="<:# value_index + 1 :>">
                            </div>
                            <div class="form-button form-remove-button" data-value-index="<:# value_index :>">
                            </div>
                        <: } :>
                    </div>
                <: } :>
                <: if ( !this.IsReadonly ) { :>
                    <div class="form-button form-add-button" data-value-index="<:# this.ValueArray.length :>">
                    </div>
                <: } :>
            </div>
            `
            );
    }
}

// -- FUNCTIONS

function InitializeInputs(
    root_element = undefined
    )
{
    var
        readonly_select_element;

    for ( readonly_select_element of GetRootElement( root_element ).GetElements( "select[readonly]" ) )
    {
        readonly_select_element.onmousedown = CancelEvent;
    }
}

// -- STATEMENTS

DefineComponent( VISTA_INPUT_COMPONENT, "input-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly" ] );
DefineComponent( VISTA_TEXT_INPUT_COMPONENT, "text-input-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly" ] );
DefineComponent( VISTA_COLOR_INPUT_COMPONENT, "color-input-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly" ] );
DefineComponent( VISTA_IMAGE_PATH_INPUT_COMPONENT, "image-path-input-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "error-image-path", "upload-api-url", "delete-api-url" ] );
DefineComponent( VISTA_VIDEO_PATH_INPUT_COMPONENT, "video-path-input-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "error-video-path", "upload-api-url", "delete-api-url" ] );
DefineComponent( VISTA_DOCUMENT_PATH_INPUT_COMPONENT, "document-path-input-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "document-image-path", "error-image-path", "upload-api-url", "delete-api-url" ] );
DefineComponent( VISTA_DROPDOWN_COMPONENT, "dropdown-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "is-optional", "null-name", "null-value", "option-names", "option-values" ] );
DefineComponent( VISTA_INPUT_LIST_COMPONENT, "input-list-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "added-value" ] );
DefineComponent( VISTA_TEXT_INPUT_LIST_COMPONENT, "text-input-list-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "added-value" ] );
DefineComponent( VISTA_IMAGE_PATH_INPUT_LIST_COMPONENT, "image-path-input-list-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "added-value", "error-image-path", "upload-api-url", "delete-api-url" ] );
DefineComponent( VISTA_VIDEO_PATH_INPUT_LIST_COMPONENT, "video-path-input-list-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "added-value", "error-video-path", "upload-api-url", "delete-api-url" ] );
DefineComponent( VISTA_DOCUMENT_PATH_INPUT_LIST_COMPONENT, "document-path-input-list-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "added-value", "document-image-path", "error-image-path", "upload-api-url", "delete-api-url" ] );
DefineComponent( VISTA_DROPDOWN_LIST_COMPONENT, "dropdown-list-component", [ "result-id", "result-name", "result-value", "is-readonly", "is-optional", "null-name", "null-value", "option-names", "option-values", "added-value" ] );
DefineComponent( VISTA_MULTILINGUAL_INPUT_COMPONENT, "multilingual-input-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "language-tags" ] );
DefineComponent( VISTA_MULTILINGUAL_TEXT_INPUT_COMPONENT, "multilingual-text-input-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "language-tags" ] );
DefineComponent( VISTA_MULTILINGUAL_IMAGE_PATH_INPUT_COMPONENT, "multilingual-image-path-input-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "error-image-path", "upload-api-url", "delete-api-url", "language-tags" ] );
DefineComponent( VISTA_MULTILINGUAL_VIDEO_PATH_INPUT_COMPONENT, "multilingual-video-path-input-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "error-video-path", "upload-api-url", "delete-api-url", "language-tags" ] );
DefineComponent( VISTA_MULTILINGUAL_DOCUMENT_PATH_INPUT_COMPONENT, "multilingual-document-path-input-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "document-image-path", "error-image-path", "upload-api-url", "delete-api-url", "language-tags" ] );
DefineComponent( VISTA_MULTILINGUAL_INPUT_LIST_COMPONENT, "multilingual-input-list-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "added-value", "language-tags" ] );
DefineComponent( VISTA_MULTILINGUAL_TEXT_INPUT_LIST_COMPONENT, "multilingual-text-input-list-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "added-value", "language-tags" ] );
DefineComponent( VISTA_MULTILINGUAL_IMAGE_PATH_INPUT_LIST_COMPONENT, "multilingual-image-path-input-list-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "added-value", "error-image-path", "upload-api-url", "delete-api-url", "language-tags" ] );
DefineComponent( VISTA_MULTILINGUAL_VIDEO_PATH_INPUT_LIST_COMPONENT, "multilingual-video-path-input-list-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "added-value", "error-video-path", "upload-api-url", "delete-api-url", "language-tags" ] );
DefineComponent( VISTA_MULTILINGUAL_DOCUMENT_PATH_INPUT_LIST_COMPONENT, "multilingual-document-path-input-list-component", [ "result-id", "result-name", "result-value", "result-placeholder", "is-readonly", "added-value", "document-image-path", "error-image-path", "upload-api-url", "delete-api-url", "language-tags" ] );

DelayCall( InitializeInputs );
