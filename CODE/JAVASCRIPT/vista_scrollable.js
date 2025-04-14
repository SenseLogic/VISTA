// -- FUNCTIONS

function InitializeScrollableContainers(
    root_element = undefined,
    container_element_selector = ".scrollable-container",
    default_animation_speed = "10vw",
    default_pause_duration = 10000,
    default_duplication_factor = 2,
    default_duplicate_class = "is-duplicate"
    )
{
    var scrollable_container_array = GetRootElement( root_element ).GetElements( container_element_selector );

    scrollable_container_array.forEach(
        function (
            scrollable_container
            )
        {
            var
                animation_frame_id,
                animation_speed,
                animation_speed_distance,
                pixel_distance_scale,
                duplicate_class,
                duplicate_strip_element,
                duplication_factor,
                duplication_index,
                first_strip_position,
                first_touch_position_x,
                first_touch_position_y,
                prior_touch_timestamp,
                prior_touch_position_x,
                prior_touch_position_y,
                prior_update_timestamp,
                pause_duration,
                pause_time,
                strip_element,
                strip_has_moved,
                strip_is_dragged,
                strip_speed;

            animation_speed = default_animation_speed;
            pause_duration = default_pause_duration;
            duplication_factor = default_duplication_factor;
            duplicate_class = default_duplicate_class;

            if ( scrollable_container.dataset.hasOwnProperty( "animationSpeed" ) )
            {
                animation_speed = scrollable_container.dataset.animationSpeed;
            }

            if ( scrollable_container.dataset.hasOwnProperty( "pauseDuration" ) )
            {
                pause_duration = GetReal( scrollable_container.dataset.pauseDuration );
            }

            if ( scrollable_container.dataset.hasOwnProperty( "duplicationFactor" ) )
            {
                duplication_factor = parseInt( scrollable_container.dataset.duplicationFactor );
            }

            if ( scrollable_container.dataset.hasOwnProperty( "duplicateClass" ) )
            {
                duplicate_class = scrollable_container.dataset.duplicateClass;
            }

            animation_speed_distance = ParseDistance( animation_speed );
            pixel_distance_scale = GetUnitPixelCount( animation_speed_distance.unit, scrollable_container );
            animation_speed = animation_speed_distance.value * pixel_distance_scale;

            strip_is_dragged = false;
            strip_has_moved = false;
            strip_speed = 0;
            first_touch_position_x = 0;
            first_touch_position_y = 0;
            first_strip_position = 0;
            prior_touch_position_x = 0;
            prior_touch_position_y = 0;
            prior_touch_timestamp = 0;
            prior_update_timestamp = undefined;
            pause_time = 0;

            if ( scrollable_container.children.length > 0 )
            {
                strip_element = scrollable_container.children[ 0 ];

                for ( duplication_index = 1;
                      duplication_index < duplication_factor;
                      ++duplication_index )
                {
                    duplicate_strip_element = strip_element.cloneNode( true );

                    if ( duplicate_class !== "" )
                    {
                        duplicate_strip_element.AddClass( duplicate_class );
                    }

                    scrollable_container.appendChild( duplicate_strip_element );
                }

                // ~~

                function GetStripPosition(
                    scrollable_container
                    )
                {
                    return scrollable_container.scrollLeft;
                }

                // ~~

                function SetStripPosition(
                    scrollable_container,
                    strip_element,
                    strip_position
                    )
                {
                    var
                        container_width,
                        strip_width;

                    strip_width = strip_element.offsetWidth;
                    container_width = scrollable_container.offsetWidth;

                    if ( strip_width <= container_width )
                    {
                        strip_position = 0;
                    }
                    else if ( strip_width > 0 )
                    {
                        while ( strip_position < 0 )
                        {
                            strip_position += strip_width;
                        }

                        while ( strip_position >= strip_width )
                        {
                            strip_position -= strip_width;
                        }
                    }

                    scrollable_container.scrollLeft = strip_position;
                }

                // ~~

                function UpdateStripPosition(
                    update_timestamp
                    )
                {
                    var
                        strip_position,
                        time_step = 0;

                    if ( prior_update_timestamp !== undefined )
                    {
                        time_step = update_timestamp - prior_update_timestamp;
                    }

                    if ( time_step > 100 )
                    {
                        time_step = 16;
                    }

                    prior_update_timestamp = update_timestamp;

                    strip_position = GetStripPosition( scrollable_container );

                    if ( strip_is_dragged )
                    {
                        pause_time = pause_duration;
                    }
                    else
                    {
                        if ( GetPositive( strip_speed ) > 0.05 )
                        {
                            strip_position -= strip_speed * time_step;
                            strip_speed *= 0.95;
                            pause_time = pause_duration;
                        }
                        else
                        {
                            strip_speed = 0;

                            if ( pause_time > 0 )
                            {
                                pause_time -= time_step;
                                if ( pause_time < 0 )
                                {
                                    pause_time = 0;
                                }
                            }
                        }

                        if ( pause_time === 0
                             && animation_speed !== 0 )
                        {
                            strip_position += animation_speed * time_step / 1000;
                        }
                    }

                    SetStripPosition( scrollable_container, strip_element, strip_position );

                    animation_frame_id = requestAnimationFrame( UpdateStripPosition );
                }

                // ~~

                scrollable_container.addEventListener(
                    "mousedown",
                    function ( event )
                    {
                        if ( event.button === 0 )
                        {
                            strip_is_dragged = true;
                            strip_has_moved = false;
                            strip_speed = 0;

                            first_touch_position_x = event.pageX;
                            first_strip_position = GetStripPosition( scrollable_container );

                            prior_touch_position_x = event.pageX;
                            prior_touch_timestamp = performance.now();

                            event.preventDefault();
                            scrollable_container.style.cursor = "grabbing";
                        }
                    }
                    );

                // ~~

                window.addEventListener(
                    "mouseup",
                    function ( event )
                    {
                        if ( event.button === 0
                             && strip_is_dragged )
                        {
                            strip_is_dragged = false;
                            scrollable_container.style.cursor = "grab";
                        }
                    }
                    );

                window.addEventListener(
                    "mouseleave",
                    function ( event )
                    {
                         if ( strip_is_dragged
                              && event.target === document.documentElement
                              && event.relatedTarget === null )
                         {
                            strip_is_dragged = false;
                            scrollable_container.style.cursor = "grab";
                         }
                    }
                );

                // ~~

                scrollable_container.addEventListener(
                    "click",
                    function ( event )
                    {
                        if ( strip_has_moved )
                        {
                            event.preventDefault();
                            event.stopPropagation();
                        }

                        strip_has_moved = false;
                    },
                    true
                    );

                // ~~

                window.addEventListener(
                    "mousemove",
                    function ( event )
                    {
                        var
                            current_timestamp,
                            time_offset,
                            touch_position_x,
                            touch_position_offset;

                        if ( strip_is_dragged )
                        {
                            touch_position_x = event.pageX;
                            touch_position_offset = touch_position_x - first_touch_position_x;

                            if ( GetPositive( touch_position_offset ) > 5 )
                            {
                                strip_has_moved = true;
                                event.preventDefault();
                            }

                            SetStripPosition( scrollable_container, strip_element, first_strip_position - touch_position_offset );

                            current_timestamp = performance.now();
                            time_offset = current_timestamp - prior_touch_timestamp;

                            if ( time_offset > 10 )
                            {
                                strip_speed = ( touch_position_x - prior_touch_position_x ) / time_offset;

                                prior_touch_position_x = touch_position_x;
                                prior_touch_timestamp = current_timestamp;
                            }
                        }
                    }
                    );

                scrollable_container.style.cursor = "grab";

                // ~~

                scrollable_container.addEventListener(
                    "touchstart",
                    function ( event )
                    {
                        strip_is_dragged = true;
                        strip_has_moved = false;
                        strip_speed = 0;

                        first_touch_position_x = event.touches[ 0 ].pageX;
                        first_touch_position_y = event.touches[ 0 ].pageY;
                        first_strip_position = GetStripPosition( scrollable_container );

                        prior_touch_position_x = event.touches[ 0 ].pageX;
                        prior_touch_position_y = event.touches[ 0 ].pageY;
                        prior_touch_timestamp = performance.now();
                    },
                    {
                        passive: true
                    }
                    );

                // ~~

                scrollable_container.addEventListener(
                    "touchend",
                    function ( event )
                    {
                        if ( strip_is_dragged )
                        {
                             strip_is_dragged = false;
                        }
                    }
                    );

                // ~~

                scrollable_container.addEventListener(
                    "touchcancel",
                    function ()
                    {
                        if ( strip_is_dragged )
                        {
                            strip_is_dragged = false;
                        }
                    }
                    );

                // ~~

                scrollable_container.addEventListener(
                    "touchmove",
                    function ( event )
                    {
                        var
                            current_timestamp,
                            time_offset,
                            touch_position_x,
                            touch_position_y,
                            touch_position_offset_x,
                            touch_position_offset_y;

                        if ( strip_is_dragged )
                        {
                            touch_position_x = event.touches[ 0 ].pageX;
                            touch_position_y = event.touches[ 0 ].pageY;
                            touch_position_offset_x = touch_position_x - first_touch_position_x;
                            touch_position_offset_y = touch_position_y - first_touch_position_y;

                            if ( GetPositive( touch_position_offset_x ) > GetPositive( touch_position_offset_y )
                                 && GetPositive( touch_position_offset_x ) > 5 )
                            {
                                strip_has_moved = true;
                                event.preventDefault();
                            }

                            if ( strip_has_moved )
                            {
                                SetStripPosition( scrollable_container, strip_element, first_strip_position - touch_position_offset_x );

                                current_timestamp = performance.now();
                                time_offset = current_timestamp - prior_touch_timestamp;

                                if ( time_offset > 10 )
                                {
                                    strip_speed = ( touch_position_x - prior_touch_position_x ) / time_offset;

                                    prior_touch_position_x = touch_position_x;
                                    prior_touch_position_y = touch_position_y;
                                    prior_touch_timestamp = current_timestamp;
                                }
                            }
                        }
                    },
                    {
                        passive: false
                    }
                    );

                animation_frame_id = requestAnimationFrame( UpdateStripPosition );
            }
        }
        );
}
