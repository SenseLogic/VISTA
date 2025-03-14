function InitializeScrollableContainers(
    root_element = undefined,
    container_element_selector = ".scrollable-container",
    default_animation_speed = 100,
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
                duplicate_class,
                duplicate_strip_element,
                duplication_factor,
                duplication_index,
                first_strip_position,
                first_touch_position,
                old_touch_timestamp,
                old_touch_position,
                old_update_timestamp,
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
                animation_speed = parseFloat( scrollable_container.dataset.animationSpeed );
            }

            if ( scrollable_container.dataset.hasOwnProperty( "pauseDuration" ) )
            {
                pause_duration = parseFloat( scrollable_container.dataset.pauseDuration );
            }

            if ( scrollable_container.dataset.hasOwnProperty( "duplicationFactor" ) )
            {
                duplication_factor = parseInt( scrollable_container.dataset.duplicationFactor );
            }

            if ( scrollable_container.dataset.hasOwnProperty( "duplicateClass" ) )
            {
                duplicate_class = scrollable_container.dataset.duplicateClass;
            }

            strip_is_dragged = false;
            strip_has_moved = false;
            strip_speed = 0;
            first_touch_position = 0;
            first_strip_position = 0;
            old_touch_position = 0;
            old_touch_timestamp = 0;
            old_update_timestamp = undefined;
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
                        duplicate_strip_element.classList.add( duplicate_class );
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

                    if ( old_update_timestamp !== undefined )
                    {
                        time_step = update_timestamp - old_update_timestamp;
                    }

                    if ( pause_time === 0
                         && time_step >= pause_duration )
                    {
                        old_update_timestamp = update_timestamp;
                        time_step = 0;
                    }

                    old_update_timestamp = update_timestamp;

                    strip_position = GetStripPosition( scrollable_container );

                    if ( strip_is_dragged )
                    {
                        pause_time = pause_duration;
                    }
                    else
                    {
                        if ( Math.abs( strip_speed ) > 0.1 )
                        {
                            strip_position -= strip_speed * time_step;
                            strip_speed *= 0.95;
                        }
                        else
                        {
                            strip_speed = 0;
                        }

                        pause_time -= time_step;

                        if ( pause_time < 0 )
                        {
                            pause_time = 0;
                        }

                        if ( pause_time === 0 )
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
                            
                            first_touch_position = event.pageX - scrollable_container.offsetLeft;
                            first_strip_position = GetStripPosition( scrollable_container );

                            old_touch_position = event.pageX;
                            old_touch_timestamp = performance.now();

                            event.preventDefault();
                        }
                    } 
                    );

                // ~~

                scrollable_container.addEventListener( 
                    "mouseleave", 
                    function ()
                    {
                        strip_is_dragged = false;
                        strip_has_moved = false;
                    } 
                    );

                // ~~

                scrollable_container.addEventListener( 
                    "mouseup", 
                    function ( event )
                    {
                        if ( event.button === 0 )
                        {
                            strip_is_dragged = false;
                        }
                    }, 
                    true 
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
                    }, 
                    true 
                    );

                // ~~

                scrollable_container.addEventListener( 
                    "mousemove", 
                    function ( event )
                    {
                        var 
                            current_timestamp,
                            time_offset,
                            touch_position,
                            touch_position_offset;
                            
                        if ( strip_is_dragged )
                        {
                            event.preventDefault();

                            strip_has_moved = true;
                            touch_position = event.pageX - scrollable_container.offsetLeft;
                            touch_position_offset = touch_position - first_touch_position;
                            SetStripPosition( scrollable_container, strip_element, first_strip_position - touch_position_offset );

                            current_timestamp = performance.now();
                            time_offset = current_timestamp - old_touch_timestamp;
                            
                            if ( time_offset > 0 )
                            {
                                strip_speed = ( touch_position - old_touch_position ) / time_offset;
                            }
                            
                            old_touch_position = touch_position;
                            old_touch_timestamp = current_timestamp;
                        }
                    } 
                    );

                // ~~

                scrollable_container.addEventListener( 
                    "touchstart", 
                    function ( event )
                    {
                        strip_is_dragged = true;
                        strip_has_moved = false;
                        strip_speed = 0;
                        
                        first_touch_position = event.touches[ 0 ].pageX - scrollable_container.offsetLeft;
                        first_strip_position = GetStripPosition( scrollable_container );
                        
                        old_touch_position = event.touches[ 0 ].pageX;
                        old_touch_timestamp = performance.now();
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
                        strip_is_dragged = false;
                    } 
                    );

                // ~~

                scrollable_container.addEventListener( 
                    "touchcancel", 
                    function ()
                    {
                        strip_is_dragged = false;
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
                            touch_position,
                            touch_position_offset;

                        if ( strip_is_dragged )
                        {
                            strip_has_moved = true;
                            touch_position = event.touches[ 0 ].pageX - scrollable_container.offsetLeft;
                            touch_position_offset = ( touch_position - first_touch_position );
                            
                            SetStripPosition( scrollable_container, strip_element, first_strip_position - touch_position_offset );

                            current_timestamp = performance.now();
                            time_offset = current_timestamp - old_touch_timestamp;

                            if ( time_offset > 0 )
                            {
                                strip_speed = ( touch_position - old_touch_position ) / time_offset;
                            }
                            
                            old_touch_position = touch_position;
                            old_touch_timestamp = current_timestamp;
                        }
                    }, 
                    { 
                        passive: true 
                    } 
                    );

                animation_frame_id = requestAnimationFrame( UpdateStripPosition );
            }
        }
        );
}
