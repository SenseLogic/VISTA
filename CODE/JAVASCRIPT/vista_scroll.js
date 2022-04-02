// -- FUNCTIONS

HTMLElement.prototype.GetIntersectionRatio = function (
    element_height_offset_factor = 0,
    element_width_offset_factor = 0,
    viewport_top_offset = 0,
    viewport_bottom_offset = 0,
    viewport_left_offset = 0,
    viewport_right_offset = 0
    )
{
    var
        bounding_client_rectangle,
        element_bottom,
        element_height,
        element_left,
        element_right,
        element_top,
        element_width,
        viewport_bottom,
        viewport_left,
        viewport_right,
        viewport_top,
        visible_height,
        visible_width;

    bounding_client_rectangle = this.getBoundingClientRect();

    element_top = bounding_client_rectangle.top;
    element_bottom = bounding_client_rectangle.bottom;
    element_left = bounding_client_rectangle.left;
    element_right = bounding_client_rectangle.right;
    element_height = element_bottom - element_top;
    element_width = element_right - element_left;

    viewport_top = 0 - viewport_top_offset - element_height_offset_factor * element_height;
    viewport_bottom = document.documentElement.clientHeight + viewport_bottom_offset + element_height_offset_factor * element_height;
    viewport_left = 0 - viewport_left_offset - element_width_offset_factor * element_width;
    viewport_right = document.documentElement.clientWidth + viewport_right_offset + element_width_offset_factor * element_width;

    if ( element_bottom <= viewport_top
         || element_top >= viewport_bottom
         || element_right <= viewport_left
         || element_left >= viewport_right )
    {
        return 0;
    }
    else if ( element_top >= viewport_top
              && element_bottom <= viewport_bottom
              && element_left >= viewport_left
              && element_right <= viewport_right )
    {
        return 1;
    }
    else if ( this.offsetHeight === 0
              || this.offsetWidth === 0 )
    {
        return 0;
    }
    else
    {
        if ( element_top < viewport_top )
        {
            element_top = viewport_top;
        }

        if ( element_bottom > viewport_bottom )
        {
            element_bottom = viewport_bottom;
        }

        if ( element_left < viewport_left )
        {
            element_left = viewport_left;
        }

        if ( element_right > viewport_right )
        {
            element_right = viewport_right;
        }

        visible_height = element_bottom - element_top;
        visible_width = element_right - element_left;

        return ( visible_height * visible_width ) / ( this.offsetHeight * this.offsetWidth );
    }
}

// ~~

HTMLElement.prototype.GetVerticalIntersectionRatio = function (
    element_height_offset_factor = 0,
    viewport_top_offset = 0,
    viewport_bottom_offset = 0
    )
{
    var
        bounding_client_rectangle,
        element_bottom,
        element_height,
        element_top,
        viewport_bottom,
        viewport_top,
        visible_height;

    bounding_client_rectangle = this.getBoundingClientRect();

    element_top = bounding_client_rectangle.top;
    element_bottom = bounding_client_rectangle.bottom;
    element_height = element_bottom - element_top;

    viewport_top = 0 - viewport_top_offset - element_height_offset_factor * element_height;
    viewport_bottom = document.documentElement.clientHeight + viewport_bottom_offset + element_height_offset_factor * element_height;

    if ( element_bottom <= viewport_top
         || element_top >= viewport_bottom )
    {
        return 0;
    }
    else if ( element_top >= viewport_top
              && element_bottom <= viewport_bottom )
    {
        return 1;
    }
    else if ( this.offsetHeight === 0 )
    {
        return 0;
    }
    else
    {
        if ( element_top < viewport_top )
        {
            element_top = viewport_top;
        }

        if ( element_bottom > viewport_bottom )
        {
            element_bottom = viewport_bottom;
        }

        visible_height = element_bottom - element_top;

        return visible_height / this.offsetHeight;
    }
}

// ~~

HTMLElement.prototype.GetVerticalScrollingRatio = function (
    element_height_offset_factor = 0,
    viewport_top_offset = 0,
    viewport_bottom_offset = 0
    )
{
    var
        bounding_client_rectangle,
        element_bottom,
        element_height,
        element_top,
        viewport_bottom,
        viewport_top,
        visible_height;

    bounding_client_rectangle = this.getBoundingClientRect();

    element_top = bounding_client_rectangle.top;
    element_bottom = bounding_client_rectangle.bottom;
    element_height = element_bottom - element_top;

    viewport_top = 0 - viewport_top_offset - element_height_offset_factor * element_height;
    viewport_bottom = document.documentElement.clientHeight + viewport_bottom_offset + element_height_offset_factor * element_height;

    if ( element_top >= viewport_bottom )
    {
        return 0;
    }
    else if ( element_top >= viewport_top
              && element_bottom <= viewport_bottom )
    {
        return 1;
    }
    else if ( element_top <= viewport_top )
    {
        return 1;
    }
    else if ( this.offsetHeight === 0 )
    {
        return 1;
    }
    else
    {
        if ( element_top < viewport_top )
        {
            element_top = viewport_top;
        }

        if ( element_bottom > viewport_bottom )
        {
            element_bottom = viewport_bottom;
        }

        visible_height = element_bottom - element_top;

        return visible_height / this.offsetHeight;
    }
}

// ~~

HTMLElement.prototype.GetHorizontalIntersectionRatio = function (
    element_width_offset_factor = 0,
    viewport_left_offset = 0,
    viewport_right_offset = 0
    )
{
    var
        bounding_client_rectangle,
        element_right,
        element_width,
        element_left,
        viewport_right,
        viewport_left,
        visible_width;

    bounding_client_rectangle = this.getBoundingClientRect();

    element_left = bounding_client_rectangle.left;
    element_right = bounding_client_rectangle.right;
    element_width = element_right - element_left;

    viewport_left = 0 - viewport_left_offset - element_width_offset_factor * element_width;
    viewport_right = document.documentElement.clientWidth + viewport_right_offset + element_width_offset_factor * element_width;

    if ( element_right <= viewport_left
         || element_left >= viewport_right )
    {
        return 0;
    }
    else if ( element_left >= viewport_left
              && element_right <= viewport_right )
    {
        return 1;
    }
    else if ( this.offsetWidth === 0 )
    {
        return 0;
    }
    else
    {
        if ( element_left < viewport_left )
        {
            element_left = viewport_left;
        }

        if ( element_right > viewport_right )
        {
            element_right = viewport_right;
        }

        visible_width = element_right - element_left;

        return visible_width / this.offsetWidth;
    }
}

// ~~

HTMLElement.prototype.GetHorizontalScrollingRatio = function (
    element_width_offset_factor = 0,
    viewport_left_offset = 0,
    viewport_right_offset = 0
    )
{
    var
        bounding_client_rectangle,
        element_right,
        element_width,
        element_left,
        viewport_right,
        viewport_left,
        visible_width;

    bounding_client_rectangle = this.getBoundingClientRect();

    element_left = bounding_client_rectangle.left;
    element_right = bounding_client_rectangle.right;
    element_width = element_right - element_left;

    viewport_left = 0 - viewport_left_offset - element_width_offset_factor * element_width;
    viewport_right = document.documentElement.clientWidth + viewport_right_offset + element_width_offset_factor * element_width;

    if ( element_left >= viewport_right )
    {
        return 0;
    }
    else if ( element_left >= viewport_left
              && element_right <= viewport_right )
    {
        return 1;
    }
    else if ( element_left <= viewport_left )
    {
        return 1;
    }
    else if ( this.offsetWidth === 0 )
    {
        return 1;
    }
    else
    {
        if ( element_left < viewport_left )
        {
            element_left = viewport_left;
        }

        if ( element_right > viewport_right )
        {
            element_right = viewport_right;
        }

        visible_width = element_right - element_left;

        return visible_width / this.offsetWidth;
    }
}

// ~~

HTMLElement.prototype.GetMiddleIntersectionRatio = function (
    element_height_offset_factor = 0,
    viewport_top_offset = 0,
    viewport_bottom_offset = 0
    )
{
    var
        bounding_client_rectangle,
        element_bottom,
        element_height,
        element_middle,
        element_top,
        half_viewport_height,
        scrolling_ratio,
        viewport_bottom,
        viewport_middle,
        viewport_top,
        visible_height;

    bounding_client_rectangle = this.getBoundingClientRect();

    element_top = bounding_client_rectangle.top;
    element_bottom = bounding_client_rectangle.bottom;
    element_middle = ( element_top + element_bottom ) * 0.5;
    element_height = element_bottom - element_top;

    viewport_top = 0 - viewport_top_offset - element_height_offset_factor * element_height;
    viewport_bottom = document.documentElement.clientHeight + viewport_bottom_offset + element_height_offset_factor * element_height;
    viewport_middle = ( viewport_top + viewport_bottom ) * 0.5;
    half_viewport_height = ( viewport_bottom - viewport_top ) * 0.5;

    if ( element_middle >= viewport_bottom )
    {
        return 0;
    }
    else if ( element_middle <= viewport_top )
    {
        return 0;
    }
    else if ( element_middle <= viewport_middle )
    {
        return 1 - ( viewport_middle - element_middle ) / half_viewport_height;
    }
    else
    {
        return 1 - ( element_middle - viewport_middle ) / half_viewport_height;
    }
}

// ~~

HTMLElement.prototype.GetMiddleScrollingRatio = function (
    element_height_offset_factor = 0,
    viewport_top_offset = 0,
    viewport_bottom_offset = 0
    )
{
    var
        bounding_client_rectangle,
        element_bottom,
        element_height,
        element_middle,
        element_top,
        half_viewport_height,
        scrolling_ratio,
        viewport_bottom,
        viewport_middle,
        viewport_top,
        visible_height;

    bounding_client_rectangle = this.getBoundingClientRect();

    element_top = bounding_client_rectangle.top;
    element_bottom = bounding_client_rectangle.bottom;
    element_middle = ( element_top + element_bottom ) * 0.5;
    element_height = element_bottom - element_top;

    viewport_top = 0 - viewport_top_offset - element_height_offset_factor * element_height;
    viewport_bottom = document.documentElement.clientHeight + viewport_bottom_offset + element_height_offset_factor * element_height;
    viewport_middle = ( viewport_top + viewport_bottom ) * 0.5;
    half_viewport_height = ( viewport_bottom - viewport_top ) * 0.5;

    if ( element_middle >= viewport_bottom )
    {
        return 0;
    }
    else if ( element_middle <= viewport_middle )
    {
        return 1;
    }
    else
    {
        return 1 - ( element_middle - viewport_middle ) / half_viewport_height;
    }
}

// ~~

function HandleScrollEvent(
    minimum_pixel_count,
    element_array_or_selector,
    class_name,
    scrolled_element_selector = "",
    called_function = null
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
              event
              )
        {
            var
                element,
                element_is_scrolled;

            if ( scrolled_element_selector === ""
                 || event === undefined )
            {
                element = html_element;
            }
            else
            {
                element = event.currentTarget;
            }

            element_is_scrolled = ( element.scrollTop >= minimum_pixel_count );

            if ( class_name !== "" )
            {
                element_array.ToggleClass( class_name, element_is_scrolled );
            }

            if ( called_function !== null )
            {
                for ( element of element_array )
                {
                    called_function( element, element_is_scrolled );
                }
            }
        };

    if ( scrolled_element_selector === "" )
    {
        window.addEventListener( "scroll", handle_scroll_function );
    }
    else
    {
        GetElements( scrolled_element_selector ).AddEventListener( "scroll", handle_scroll_function );
    }

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
