// -- CLASSES

class SCROLLLABLE_ROW
{
    // -- ATTRIBUTES

    AnimationFrameId;
    AnimationSpeed;
    DuplicateClass;
    DuplicateStripElement;
    DuplicationFactor;
    DuplicationIndex;
    FirstStripPosition;
    FirstTouchPositionX;
    FirstTouchPositionY;
    PriorTouchTimestamp;
    PriorTouchPositionX;
    PriorTouchPositionY;
    PriorUpdateTimestamp;
    PauseDuration;
    PauseTime;
    StripElement;
    StripPosition;
    StripHasMoved;
    StripIsDragged;
    StripSpeed;

    // -- CONSTRUCTORS

    constructor(
        row_element,
        default_animation_speed,
        default_pause_duration,
        default_duplication_factor,
        default_duplicate_class
        )
    {
        this.ContainerElement = row_element;
        this.AnimationSpeed = default_animation_speed;
        this.PauseDuration = default_pause_duration;
        this.DuplicationFactor = default_duplication_factor;
        this.DuplicateClass = default_duplicate_class;

        if ( row_element.dataset.hasOwnProperty( "animationSpeed" ) )
        {
            this.AnimationSpeed = row_element.dataset.animationSpeed;
        }

        if ( row_element.dataset.hasOwnProperty( "pauseDuration" ) )
        {
            this.PauseDuration = GetReal( row_element.dataset.pauseDuration );
        }

        if ( row_element.dataset.hasOwnProperty( "duplicationFactor" ) )
        {
            this.DuplicationFactor = parseInt( row_element.dataset.duplicationFactor );
        }

        if ( row_element.dataset.hasOwnProperty( "duplicateClass" ) )
        {
            this.DuplicateClass = row_element.dataset.duplicateClass;
        }

        this.AnimationSpeed = GetDimension( this.AnimationSpeed );

        this.StripIsDragged = false;
        this.StripHasMoved = false;
        this.StripSpeed = 0;
        this.FirstTouchPositionX = 0;
        this.FirstTouchPositionY = 0;
        this.FirstStripPosition = 0;
        this.PriorTouchPositionX = 0;
        this.PriorTouchPositionY = 0;
        this.PriorTouchTimestamp = 0;
        this.PriorUpdateTimestamp = undefined;
        this.PauseTime = 0;

        if ( row_element.children.length > 0 )
        {
            this.StripElement = row_element.children[ 0 ];
            this.StripPosition = row_element.scrollLeft;

            for ( this.DuplicationIndex = 1;
                  this.DuplicationIndex < this.DuplicationFactor;
                  ++this.DuplicationIndex )
            {
                this.DuplicateStripElement = this.StripElement.cloneNode( true );

                if ( this.DuplicateClass !== "" )
                {
                    this.DuplicateStripElement.AddClass( this.DuplicateClass );
                }

                row_element.appendChild( this.DuplicateStripElement );
            }

            row_element.style.cursor = "grab";

            this.InitializeEventListeners( row_element );
            this.AnimationFrameId = requestAnimationFrame( ( timestamp ) => this.UpdateStripPosition( timestamp ) );
        }
    }

    // -- METHODS

    SetStripPosition(
        strip_position
        )
    {
        var
            container_width,
            strip_width;

        strip_width = this.StripElement.offsetWidth;
        container_width = this.ContainerElement.offsetWidth;
        var old_strip_position = strip_position;
        if ( strip_width > 0 )
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
//console.log( this.ContainerElement.classList, old_strip_position, strip_position, container_width, strip_width );
        this.ContainerElement.scrollLeft = strip_position;
        this.StripPosition = strip_position;
    }

    // ~~

    UpdateStripPosition(
        update_timestamp
        )
    {
        var
            strip_position,
            time_step;

        if ( this.PriorUpdateTimestamp !== undefined )
        {
            time_step = ( update_timestamp - this.PriorUpdateTimestamp ) * 0.001;
        }
        else
        {
            time_step = 0;
        }

        this.PriorUpdateTimestamp = update_timestamp;

        strip_position = this.StripPosition;

        if ( this.StripIsDragged )
        {
            this.PauseTime = this.PauseDuration;
        }
        else
        {
            if ( GetPositive( this.StripSpeed ) > 0.05 )
            {
                strip_position -= this.StripSpeed * time_step;
                this.StripSpeed *= 0.95;
                this.PauseTime = this.PauseDuration;
            }
            else
            {
                this.StripSpeed = 0;

                if ( this.PauseTime > 0 )
                {
                    this.PauseTime -= time_step;

                    if ( this.PauseTime < 0 )
                    {
                        this.PauseTime = 0;
                    }
                }
            }

            if ( this.PauseTime === 0
                 && this.AnimationSpeed.value !== 0 )
            {
                strip_position += GetDimensionPixelCount( this.AnimationSpeed, this.ContainerElement ) * time_step;
            }
        }

//console.log( this.ContainerElement.classList, time_step, strip_position, this.AnimationSpeed, GetDimensionPixelCount( this.AnimationSpeed, this.ContainerElement ), this.StripIsDragged, this.PauseTime, this.PauseDuration );
        this.SetStripPosition( strip_position );
        this.AnimationFrameId = requestAnimationFrame( ( timestamp ) => this.UpdateStripPosition( timestamp ) );
    }

    // ~~

    InitializeEventListeners(
        )
    {
        this.ContainerElement.addEventListener(
            "mousedown",
            ( event ) =>
            {
                if ( event.button === 0 )
                {
                    this.StripIsDragged = true;
                    this.StripHasMoved = false;
                    this.StripSpeed = 0;

                    this.FirstTouchPositionX = event.pageX;
                    this.FirstStripPosition = this.StripPosition;

                    this.PriorTouchPositionX = event.pageX;
                    this.PriorTouchTimestamp = performance.now();

                    event.preventDefault();
                    this.ContainerElement.style.cursor = "grabbing";
                }
            }
            );

        // ~~

        window.addEventListener(
            "mouseup",
            ( event ) =>
            {
                if ( event.button === 0
                     && this.StripIsDragged )
                {
                    this.StripIsDragged = false;
                    this.ContainerElement.style.cursor = "grab";
                }
            }
            );

        window.addEventListener(
            "mouseleave",
            ( event ) =>
            {
                 if ( this.StripIsDragged
                      && event.target === document.documentElement
                      && event.relatedTarget === null )
                 {
                    this.StripIsDragged = false;
                    this.ContainerElement.style.cursor = "grab";
                 }
            }
        );

        // ~~

        this.ContainerElement.addEventListener(
            "click",
            ( event ) =>
            {
                if ( this.StripHasMoved )
                {
                    event.preventDefault();
                    event.stopPropagation();
                }

                this.StripHasMoved = false;
            },
            true
            );

        // ~~

        window.addEventListener(
            "mousemove",
            ( event ) =>
            {
                var
                    current_timestamp,
                    time_offset,
                    touch_position_x,
                    touch_position_offset;

                if ( this.StripIsDragged )
                {
                    touch_position_x = event.pageX;
                    touch_position_offset = touch_position_x - this.FirstTouchPositionX;

                    if ( GetPositive( touch_position_offset ) > 5 )
                    {
                        this.StripHasMoved = true;
                        event.preventDefault();
                    }

                    this.SetStripPosition( this.FirstStripPosition - touch_position_offset );

                    current_timestamp = performance.now();
                    time_offset = current_timestamp - this.PriorTouchTimestamp;

                    if ( time_offset > 10 )
                    {
                        this.StripSpeed = ( touch_position_x - this.PriorTouchPositionX ) / ( time_offset * 0.001 );

                        this.PriorTouchPositionX = touch_position_x;
                        this.PriorTouchTimestamp = current_timestamp;
                    }
                }
            }
            );

        // ~~

        this.ContainerElement.addEventListener(
            "touchstart",
            ( event ) =>
            {
                this.StripIsDragged = true;
                this.StripHasMoved = false;
                this.StripSpeed = 0;

                this.FirstTouchPositionX = event.touches[ 0 ].pageX;
                this.FirstTouchPositionY = event.touches[ 0 ].pageY;
                this.FirstStripPosition = this.StripPosition;

                this.PriorTouchPositionX = event.touches[ 0 ].pageX;
                this.PriorTouchPositionY = event.touches[ 0 ].pageY;
                this.PriorTouchTimestamp = performance.now();
            },
            {
                passive: true
            }
            );

        // ~~

        this.ContainerElement.addEventListener(
            "touchend",
            ( event ) =>
            {
                if ( this.StripIsDragged )
                {
                     this.StripIsDragged = false;
                }
            }
            );

        // ~~

        this.ContainerElement.addEventListener(
            "touchcancel",
            ( event ) =>
            {
                if ( this.StripIsDragged )
                {
                    this.StripIsDragged = false;
                }
            }
            );

        // ~~

        this.ContainerElement.addEventListener(
            "touchmove",
            ( event ) =>
            {
                var
                    current_timestamp,
                    time_offset,
                    touch_position_x,
                    touch_position_y,
                    touch_position_offset_x,
                    touch_position_offset_y;

                if ( this.StripIsDragged )
                {
                    touch_position_x = event.touches[ 0 ].pageX;
                    touch_position_y = event.touches[ 0 ].pageY;
                    touch_position_offset_x = touch_position_x - this.FirstTouchPositionX;
                    touch_position_offset_y = touch_position_y - this.FirstTouchPositionY;

                    if ( GetPositive( touch_position_offset_x ) > GetPositive( touch_position_offset_y )
                         && GetPositive( touch_position_offset_x ) > 5 )
                    {
                        this.StripHasMoved = true;
                        event.preventDefault();
                    }

                    if ( this.StripHasMoved )
                    {
                        this.SetStripPosition( this.FirstStripPosition - touch_position_offset_x );

                        current_timestamp = performance.now();
                        time_offset = current_timestamp - this.PriorTouchTimestamp;

                        if ( time_offset > 10 )
                        {
                            this.StripSpeed = ( touch_position_x - this.PriorTouchPositionX ) / ( time_offset * 0.001 );

                            this.PriorTouchPositionX = touch_position_x;
                            this.PriorTouchPositionY = touch_position_y;
                            this.PriorTouchTimestamp = current_timestamp;
                        }
                    }
                }
            },
            {
                passive: false
            }
            );
    }
}

// -- FUNCTIONS

function InitializeScrollableRows(
    root_element = undefined,
    row_element_selector = ".scrollable-row",
    default_animation_speed = "5%",
    default_pause_duration = 1,
    default_duplication_factor = 2,
    default_duplicate_class = "is-duplicate"
    )
{
    var row_element_array = GetRootElement( root_element ).GetElements( row_element_selector );

    row_element_array.forEach(
        ( row_element ) =>
        {
            new SCROLLLABLE_ROW(
                row_element,
                default_animation_speed,
                default_pause_duration,
                default_duplication_factor,
                default_duplicate_class
                );
        }
        );
}
