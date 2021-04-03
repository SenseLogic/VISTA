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
