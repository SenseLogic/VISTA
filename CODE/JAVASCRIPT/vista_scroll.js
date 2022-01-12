// -- FUNCTIONS

function HandleScrollEvent(
    minimum_pixel_count,
    element_selector,
    class_name,
    called_function = null
    )
{
    var
        html_element;

    html_element = GetElement( "html" );

    window.addEventListener(
        "scroll",
        function (
            event
            )
        {
            var
                html_element_is_scrolled;

            html_element_is_scrolled = ( html_element.scrollTop >= minimum_pixel_count );

            if ( element_selector !== ""
                 && class_name !== "" )
            {
                GetElements( element_selector ).ToggleClass( class_name, html_element_is_scrolled );
            }

            if ( called_function !== null )
            {
                called_function( html_element_is_scrolled );
            }
        }
        );
}

// ~~

function InitializeScroll(
    )
{
    var
        html_element,
        scroll_name,
        scroll_top;

    html_element = GetElement( "html" );
    scroll_name = "ScrollTop@" + window.location.pathname;
    scroll_top = sessionStorage.getItem( scroll_name );

    if ( scroll_top !== null )
    {
        html_element.scrollTop = scroll_top;
    }

    sessionStorage.setItem( scroll_name, html_element.scrollTop );

    window.addEventListener(
        'beforeunload',
        function (
            event
            )
            {
                sessionStorage.setItem( scroll_name, html_element.scrollTop );
            }
        );
}

// ~~

function ClearScroll(
    )
{
    sessionStorage.setItem( "ScrollTop@" + window.location.pathname, 0 );
}
