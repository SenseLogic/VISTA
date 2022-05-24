// -- FUNCTIONS

function UpdateDropdown(
    dropdown_element
    )
{
    var
        option_element;

    for ( option_element of dropdown_element.OptionElementArray )
    {
        if ( option_element.dataset.value === dropdown_element.InputElement.value )
        {
            option_element.AddClass( "is-selected" );
            dropdown_element.ValueElement.innerHTML = option_element.innerHTML;
            dropdown_element.ListElement.scrollTop = option_element.offsetTop;
        }
        else
        {
            option_element.RemoveClass( "is-selected" );
        }
    }

    dropdown_element.ListElement.AddClass( "is-hidden" );
}

// ~~

function HandleDropdownValueClickEvent(
    event
    )
{
    var
        list_element;

    list_element = event.currentTarget.DropdownElement.ListElement;
    list_element.ToggleClass( "is-hidden" );

    if ( !list_element.HasClass( "is-hidden" ) )
    {
        list_element.scrollIntoView(
            {
                block : "nearest",
                inline: "nearest"
            }
            );
    }
}

// ~~

function HandleDropdownOptionClickEvent(
    event
    )
{
    var
        option_element;

    option_element = event.currentTarget;
    option_element.DropdownElement.InputElement.value = option_element.dataset.value;

    UpdateDropdown( option_element.DropdownElement );
}

// ~~

function InitializeDropdowns(
    )
{
    var
        dropdown_element,
        option_element;

    for ( dropdown_element of GetElements( ".dropdown" ) )
    {
        dropdown_element.InputElement = dropdown_element.GetElement( ".dropdown-input" );
        dropdown_element.InputElement.DropdownElement = dropdown_element;

        dropdown_element.ValueElement = dropdown_element.GetElement( ".dropdown-value" );
        dropdown_element.ValueElement.DropdownElement = dropdown_element;
        dropdown_element.ValueElement.AddEventListener( "click", HandleDropdownValueClickEvent );

        dropdown_element.ListElement = dropdown_element.GetElement( ".dropdown-list" );
        dropdown_element.ListElement.DropdownElement = dropdown_element;

        dropdown_element.OptionElementArray = dropdown_element.GetElements( ".dropdown-option" );
        dropdown_element.OptionElementArray.AddEventListener( "click", HandleDropdownOptionClickEvent );

        for ( option_element of dropdown_element.OptionElementArray )
        {
            option_element.DropdownElement = dropdown_element;
        }

        UpdateDropdown( dropdown_element );
    }
}

// ~~

function FinalizeDropdowns(
    )
{
    var
        dropdown_element;

    for ( dropdown_element of GetElements( ".dropdown" ) )
    {
        dropdown_element.ValueElement.RemoveEventListener( "click", HandleDropdownValueClickEvent );
        dropdown_element.OptionElementArray.RemoveEventListener( "click", HandleDropdownOptionClickEvent );
    }
}
