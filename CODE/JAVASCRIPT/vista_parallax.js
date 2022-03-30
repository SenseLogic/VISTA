function UpdateBackgroundParallax(
    element,
    offset_ratio = 1.5,
    offset_distance = 100,
    offset_unit = "px"
    )
{
    var
        element_background_position,
        element_bottom,
        element_offset,
        element_ratio

    element_bottom  = element.offsetTop + element.offsetHeight;

    if ( element.IsVisible() )
    {
        element_offset = window.scrollY - element.offsetTop;
        element_ratio = ( element_offset / element.offsetHeight ) * offset_distance;
        element_background_position = "center " + ( -element_ratio * offset_ratio ) + offset_unit;

        element.style[ "background-position" ] = element_background_position;
    }
}

// ~~

function SetBackgroundParallax(
    element,
    offset_ratio = 1.5,
    offset_distance = 100,
    offset_unit = "px"
    )
{
    UpdateBackgroundParallax(
        element,
        offset_ratio,
        offset_distance,
        offset_unit
        );

    window.addEventListener(
        "scroll",
        function (
            event
            )
        {
            UpdateBackgroundParallax(
                element,
                offset_ratio,
                offset_distance,
                offset_unit
                );
        }
        );
}

// ~~

Array.prototype.SetBackgroundParallax = function (
    offset_ratio = 1.5,
    offset_distance = 100,
    offset_unit = "px"
    )
{
    var
        element;

    for ( element of this )
    {
        SetBackgroundParallax(
            element,
            offset_ratio,
            offset_distance,
            offset_unit
            );
    }

    return this;
}
