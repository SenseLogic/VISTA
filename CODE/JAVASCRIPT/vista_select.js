// -- FUNCTIONS

function UpdateSelectButton(
    button_element
    )
{
    var
        option_element;

    for ( option_element of button_element.OptionElementArray )
    {
        if ( option_element.dataset.value === button_element.InputElement.value )
        {
            option_element.AddClass( "is-selected" );
            button_element.ValueElement.innerHTML = option_element.innerHTML;
            button_element.ListElement.scrollTop = option_element.offsetTop;
        }
        else
        {
            option_element.RemoveClass( "is-selected" );
        }
    }

    button_element.ListElement.AddClass( "is-hidden" );
}

// ~~

function HandleSelectValueClickEvent(
    event
    )
{
    var
        value_element;

    value_element = event.currentTarget;
    value_element.ButtonElement.ListElement.RemoveClass( "is-hidden" );
}

// ~~

function HandleSelectOptionClickEvent(
    event
    )
{
    var
        option_element;

    option_element = event.currentTarget;
    option_element.ButtonElement.InputElement.value = option_element.dataset.value;

    UpdateSelectButton( option_element.ButtonElement );
}

// ~~

function InitializeSelectButtons(
    )
{
    var
        button_element,
        option_element;

    for ( button_element of GetElements( ".select-button" ) )
    {
        button_element.InputElement = button_element.GetElement( ".select-input" );
        button_element.InputElement.ButtonElement = button_element;

        button_element.ValueElement = button_element.GetElement( ".select-value" );
        button_element.ValueElement.ButtonElement = button_element;
        button_element.ValueElement.AddEventListener( "click", HandleSelectValueClickEvent );

        button_element.ListElement = button_element.GetElement( ".select-list" );
        button_element.ListElement.ButtonElement = button_element;

        button_element.OptionElementArray = button_element.GetElements( ".select-option" );
        button_element.OptionElementArray.AddEventListener( "click", HandleSelectOptionClickEvent );

        for ( option_element of button_element.OptionElementArray )
        {
            option_element.ButtonElement = button_element;
        }

        UpdateSelectButton( button_element );
    }
}

// ~~

function FinalizeSelectButtons(
    )
{
    var
        button_element;

    for ( button_element of GetElements( ".select-button" ) )
    {
        button_element.ValueElement.RemoveEventListener( "click", HandleSelectValueClickEvent );
        button_element.OptionElementArray.RemoveEventListener( "click", HandleSelectOptionClickEvent );
    }
}
