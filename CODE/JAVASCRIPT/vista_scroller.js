// -- TYPES

class SCROLLER
{
    // -- CONSTRUCTORS

    constructor(
        scroller_element,
        scroller_is_horizontal = false,
        strip_element,
        strip_position_property = "left",
        slider_element = null,
        slider_position_property = "left",
        track_element = null,
        update_track_function = null
        )
    {
        this.HandleResizeEvent = this.HandleResizeEvent.bind( this );
        this.HandleStripTouchStartEvent = this.HandleStripTouchStartEvent.bind( this );
        this.HandleSliderTouchStartEvent = this.HandleSliderTouchStartEvent.bind( this );
        this.HandleTouchMoveEvent = this.HandleTouchMoveEvent.bind( this );
        this.HandleTouchEndEvent = this.HandleTouchEndEvent.bind( this );

        this.Element = scroller_element;
        this.IsHorizontal = scroller_is_horizontal;
        this.StripElement = strip_element;
        this.StripPositionProperty = strip_position_property;
        this.StripIsDragged = false;
        this.StripWasDragged = false;
        this.StripDragPosition = 0;
        this.StripDragRatio = 0;
        this.SliderElement = slider_element;
        this.SliderPositionProperty = slider_position_property,
        this.SliderIsDragged = false;
        this.SliderDragPosition = 0;
        this.SliderRatio = 0;
        this.TrackElement = track_element;
        this.UpdateTrackFunction = update_track_function;

        this.StripElement.AddEventListener( "touchstart", this.HandleStripTouchStartEvent );
        this.StripElement.AddEventListener( "mousedown", this.HandleStripTouchStartEvent );
        this.SliderElement.AddEventListener( "touchstart", this.HandleSliderTouchStartEvent );
        this.SliderElement.AddEventListener( "mousedown", this.HandleSliderTouchStartEvent );

        window.addEventListener( "resize", this.HandleResizeEvent );
        AddEventListener( "touchmove", this.HandleTouchMoveEvent );
        AddEventListener( "mousemove", this.HandleTouchMoveEvent );
        AddEventListener( "touchend", this.HandleTouchEndEvent );
        AddEventListener( "touchcancel", this.HandleTouchEndEvent );
        AddEventListener( "mouseup", this.HandleTouchEndEvent );
    }

    // -- INQUIRIES

    GetPosition(
        event
        )
    {
        if ( event.changedTouches !== undefined
             && event.changedTouches.length > 0 )
        {
            if ( this.IsHorizontal )
            {
                return event.changedTouches[ 0 ].pageX;
            }
            else
            {
                return event.changedTouches[ 0 ].pageY;
            }
        }
        else
        {
            if ( this.IsHorizontal )
            {
                return event.pageX;
            }
            else
            {
                return event.pageY;
            }
        }
    }

    // ~~

    GetSize(
        )
    {
        if ( this.IsHorizontal )
        {
            return this.Element.GetWidth();
        }
        else
        {
            return this.Element.GetHeight();
        }
    }

    // ~~

    GetStripSize(
        )
    {
        if ( this.IsHorizontal )
        {
            return this.StripElement.GetWidth();
        }
        else
        {
            return this.StripElement.GetHeight();
        }
    }

    // ~~

    GetStripAmplitude(
        )
    {
        if ( this.IsHorizontal )
        {
            return this.StripElement.GetWidth() - this.Element.GetWidth();
        }
        else
        {
            return this.StripElement.GetHeight() - this.Element.GetHeight();
        }
    }

    // ~~

    GetStripPosition(
        )
    {
        return -this.SliderRatio * ( this.GetStripSize() - this.GetSize() );
    }

    // ~~

    GetSliderSize(
        )
    {
        if ( this.IsHorizontal )
        {
            return this.SliderElement.GetWidth();
        }
        else
        {
            return this.SliderElement.GetHeight();
        }
    }

    // ~~

    GetSliderAmplitude(
        )
    {
        if ( this.IsHorizontal )
        {
            return this.TrackElement.GetWidth() - this.SliderElement.GetWidth();
        }
        else
        {
            return this.TrackElement.GetHeight() - this.SliderElement.GetHeight();
        }
    }

    // ~~

    GetSliderPosition(
        )
    {
        return this.SliderRatio * this.GetSliderAmplitude();
    }

    // ~~

    GetTrackSize(
        )
    {
        if ( this.IsHorizontal )
        {
            return this.TrackElement.GetWidth();
        }
        else
        {
            return this.TrackElement.GetHeight();
        }
    }

    // -- OPERATIONS

    UpdateStrip(
        )
    {
        this.StripElement.SetStyle( this.StripPositionProperty, this.GetStripPosition() + "px" );
    }

    // ~~

    UpdateSlider(
        )
    {
        this.SliderElement.SetStyle( this.SliderPositionProperty, this.GetSliderPosition() + "px" );
    }

    // ~~

    UpdateTrack(
        )
    {
        if ( this.UpdateTrackFunction !== null )
        {
            this.UpdateTrackFunction( this );
        }
    }

    // ~~

    Update(
        )
    {
        this.UpdateStrip();
        this.UpdateSlider();
        this.UpdateTrack();
    }

    // ~~

    SetSliderRatio(
        slider_ratio
        )
    {
        this.SliderRatio = GetClamp( slider_ratio, 0.0, 1.0 );
    }

    // ~~

    MoveSlider(
        pixel_offset
        )
    {
        this.SetSliderRatio( this.SliderRatio + pixel_offset / this.GetSliderAmplitude() );
        this.Update();
    }

    // ~~

    MoveStrip(
        pixel_offset
        )
    {
        this.MoveSlider( -pixel_offset * this.GetSliderAmplitude() / this.GetStripAmplitude() );

        if ( GetPositive( this.SliderRatio - this.StripDragRatio ) >= 0.002 )
        {
            this.StripWasDragged = true;
        }
    }

    // ~~

    HandleResizeEvent(
        event
        )
    {
        this.Update();
    }

    // ~~

    HandleStripTouchStartEvent(
        event
        )
    {
        this.StripIsDragged = true;
        this.StripWasDragged = false;
        this.StripDragPosition = this.GetPosition( event );
        this.StripDragRatio = this.SliderRatio;

        event.Cancel();
    }

    // ~~

    HandleSliderTouchStartEvent(
        event
        )
    {
        this.SliderIsDragged = true;
        this.SliderDragPosition = this.GetPosition( event );

        event.Cancel();
    }

    // ~~

    HandleTouchMoveEvent(
        event
        )
    {
        if ( this.StripIsDragged )
        {
            this.MoveStrip( this.GetPosition( event ) - this.StripDragPosition );
            this.StripDragPosition = this.GetPosition( event );

            event.Cancel();
        }

        if ( this.SliderIsDragged )
        {
            this.MoveSlider( this.GetPosition( event ) - this.SliderDragPosition );
            this.SliderDragPosition = this.GetPosition( event );

            event.Cancel();
        }
    }

    // ~~

    HandleTouchEndEvent(
        event
        )
    {
        this.StripIsDragged = false;
        this.SliderIsDragged = false;
    }
}
