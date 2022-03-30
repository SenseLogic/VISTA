// -- FUNCTIONS

function HandleScrollEvent(
    minimum_pixel_count,
    element_array_or_selector,
    class_name,
    called_function = null,
    intersection_ratio_property_name = ""
    )
{
    var
        element_array,
        handle_scroll_function,
        html_element;

    html_element = GetElement( "html" );

    if ( IsArray( element_array_or_selector ) )
    {
        element_array = element_array_or_selector;
    }
    else
    {
        element_array = GetElements( element_array_or_selector );
    }

    handle_scroll_function
        = function (
              )
        {
            var
                element,
                html_element_is_scrolled;

            html_element_is_scrolled = ( html_element.scrollTop >= minimum_pixel_count );

            if ( class_name !== "" )
            {
                element_array.ToggleClass( class_name, html_element_is_scrolled );
            }

            if ( intersection_ratio_property_name !== "" )
            {
                for ( element of element_array )
                {
                    element.style.setProperty( intersection_ratio_property_name, element.GetIntersectionRatio() );
                }
            }

            if ( called_function !== null )
            {
                called_function( html_element_is_scrolled, element_array );
            }
        };

    window.addEventListener( "scroll", handle_scroll_function );

    handle_scroll_function();
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
