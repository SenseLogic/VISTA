// -- TYPES

class SCROLLER
{
    // -- CONSTRUCTORS

    constructor(
        scroller_element,
        strip_element,
        strip_position_property = "left",
        strip_animation_duration = 0.0,
        strip_is_horizontal = true,
        strip_is_draggable = true,
        strip_section_count = 0,
        slider_element = null,
        slider_position_property = "left",
        slider_animation_duration = 0.0,
        slider_is_horizontal = true,
        slider_is_draggable = true,
        track_element = null,
        slide_button_element_array = null,
        update_track_function = null,
        hidden_element_class_name = "is-hidden"
        )
    {
        this.HandleResizeEvent = this.HandleResizeEvent.bind( this );
        this.HandleStripTouchStartEvent = this.HandleStripTouchStartEvent.bind( this );
        this.HandleSliderTouchStartEvent = this.HandleSliderTouchStartEvent.bind( this );
        this.HandleTouchMoveEvent = this.HandleTouchMoveEvent.bind( this );
        this.HandleTouchEndEvent = this.HandleTouchEndEvent.bind( this );
        this.HandleWheelEvent = this.HandleWheelEvent.bind( this );

        this.Element = scroller_element;
        this.StripElement = strip_element;
        this.StripElement = strip_element;
        this.StripPositionProperty = strip_position_property;
        this.StripAnimationDuration = strip_animation_duration;
        this.StripIsHorizontal = strip_is_horizontal;
        this.StripIsDraggable = strip_is_draggable;
        this.StripIsDragged = false;
        this.StripWasDragged = false;
        this.StripDragPosition = 0;
        this.StripDragRatio = 0;
        this.StripSectionCount = strip_section_count;
        this.SliderElement = slider_element;
        this.SliderPositionProperty = slider_position_property;
        this.SliderAnimationDuration = slider_animation_duration;
        this.SliderIsHorizontal = slider_is_horizontal;
        this.SliderIsDraggable = slider_is_draggable;
        this.SliderIsDragged = false;
        this.SliderDragPosition = 0;
        this.SliderRatio = 0;
        this.TrackElement = track_element;
        this.SlideButtonElementArray = slide_button_element_array;
        this.HiddenElementClassName = hidden_element_class_name;
        this.UpdateTrackFunction = update_track_function;

        if ( strip_is_draggable )
        {
            this.StripElement.AddEventListener( "touchstart", this.HandleStripTouchStartEvent );
            this.StripElement.AddEventListener( "mousedown", this.HandleStripTouchStartEvent );
        }

        if ( slider_is_draggable )
        {
            this.SliderElement.AddEventListener( "touchstart", this.HandleSliderTouchStartEvent );
            this.SliderElement.AddEventListener( "mousedown", this.HandleSliderTouchStartEvent );
        }

        if ( strip_is_draggable
             || slider_is_draggable )
        {
            this.Element.AddEventListener( "touchmove", this.HandleTouchMoveEvent );
            this.Element.AddEventListener( "mousemove", this.HandleTouchMoveEvent );
            this.Element.AddEventListener( "touchend", this.HandleTouchEndEvent );
            this.Element.AddEventListener( "touchcancel", this.HandleTouchEndEvent );
            this.Element.AddEventListener( "mouseup", this.HandleTouchEndEvent );
            this.Element.AddEventListener( "wheel", this.HandleWheelEvent );

            document.documentElement.AddEventListener( "mouseleave", this.HandleTouchEndEvent );
        }

        window.addEventListener( "resize", this.HandleResizeEvent );

        this.Resize();
    }

    // -- INQUIRIES

    GetPosition(
        event,
        it_is_horizontal
        )
    {
        if ( event.changedTouches !== undefined
             && event.changedTouches.length > 0 )
        {
            if ( it_is_horizontal )
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
            if ( it_is_horizontal )
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
        if ( this.StripIsHorizontal )
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
        if ( this.StripIsHorizontal )
        {
            return this.StripElement.GetWidth();
        }
        else
        {
            return this.StripElement.GetHeight();
        }
    }

    // ~~

    GetStripSectionSize(
        )
    {
        return this.GetStripSize() / this.StripSectionCount;
    }

    // ~~

    GetStripAmplitude(
        )
    {
        if ( this.StripIsHorizontal )
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
        if ( this.SliderIsHorizontal )
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
        if ( this.SliderIsHorizontal )
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

    GetSlideIndex(
        )
    {
        var
            strip_amplitude,
            strip_section_size;

        strip_amplitude = this.GetStripAmplitude();

        if ( strip_amplitude > 0 )
        {
            return GetRound( this.SliderRatio * strip_amplitude / this.GetStripSectionSize() );
        }
        else
        {
            return 0;
        }
    }

    // ~~

    GetTrackSize(
        )
    {
        if ( this.SliderIsHorizontal )
        {
            return this.TrackElement.GetWidth();
        }
        else
        {
            return this.TrackElement.GetHeight();
        }
    }

    // -- OPERATIONS

    UpdateTrackVisibility(
        )
    {
        this.TrackElement.RemoveClass( this.HiddenElementClassName );

        if ( this.GetSize() >= this.GetStripSize() )
        {
            this.TrackElement.AddClass( this.HiddenElementClassName );
        }
    }

    // ~~

    UpdateSliderSize(
        )
    {
        var
            slider_size;

        if ( this.GetStripSize() > 0 )
        {
            slider_size = this.GetTrackSize() * this.GetSize() / this.GetStripSize();

            if ( this.SliderIsHorizontal )
            {
                this.SliderElement.SetStyle( "width", slider_size + "px" );
            }
            else
            {
                this.SliderElement.SetStyle( "height", slider_size + "px" );
            }
        }
    }

    // ~~

    UpdateStrip(
        )
    {
        if ( this.StripAnimationDuration > 0.0 )
        {
            this.StripElement
                .StopStyle( this.StripPositionProperty )
                .AnimateStyle(
                    this.StripPositionProperty,
                    [ ".", this.GetStripPosition() + "px" ],
                    [ 0.0, this.StripAnimationDuration ],
                    {
                        GetRatioFunction : GetQuinticEaseOutRatio
                    }
                    );
        }
        else
        {
            this.StripElement.SetStyle( this.StripPositionProperty, this.GetStripPosition() + "px" );
        }
    }

    // ~~

    UpdateSlider(
        )
    {
        if ( this.SliderAnimationDuration > 0.0 )
        {
            this.SliderElement
                .StopStyle( this.SliderPositionProperty )
                .AnimateStyle(
                    this.SliderPositionProperty,
                    [ ".", this.GetSliderPosition() + "px" ],
                    [ 0.0, this.SliderAnimationDuration ],
                    {
                        GetRatioFunction : GetQuinticEaseOutRatio
                    }
                    );
        }
        else
        {
            this.SliderElement.SetStyle( this.SliderPositionProperty, this.GetSliderPosition() + "px" );
        }
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

    UpdateSlideButtons(
        )
    {
        var
            selected_slide_button_index,
            slide_button_index;

        selected_slide_button_index = GetRound( this.SliderRatio * ( this.SlideButtonElementArray.length - 1 ) );

        if ( selected_slide_button_index >= this.SlideButtonElementArray.length )
        {
            selected_slide_button_index = this.SlideButtonElementArray.length;
        }

        if ( selected_slide_button_index < 0 )
        {
            selected_slide_button_index = 0;
        }

        for ( slide_button_index = 0;
              slide_button_index < this.SlideButtonElementArray.length;
              ++slide_button_index )
        {
            this.SlideButtonElementArray[ slide_button_index ].ToggleClass(
                "is-selected",
                slide_button_index === selected_slide_button_index
                );
        }
    }

    // ~~

    Update(
        )
    {
        this.UpdateStrip();
        this.UpdateSlider();
        this.UpdateTrack();
        this.UpdateSlideButtons();
    }

    // ~~

    SetSliderRatio(
        slider_ratio
        )
    {
        this.SliderRatio = GetClamp( slider_ratio, 0.0, 1.0 );
    }

    // ~~

    ShowSlide(
        slide_index
        )
    {
        var
            slider_ratio,
            strip_amplitude;

        if ( slide_index >= this.StripSectionCount )
        {
            slide_index = this.StripSectionCount - 1;
        }

        if ( slide_index < 0 )
        {
            slide_index = 0;
        }

        strip_amplitude = this.GetStripAmplitude();

        if ( strip_amplitude > 0 )
        {
            slider_ratio = slide_index * this.GetStripSectionSize() / strip_amplitude;
        }
        else
        {
            slider_ratio = 0.0;
        }

        this.SetSliderRatio( slider_ratio );
        this.Update();
    }

    // ~~

    ShowPriorSlide(
        )
    {
        this.ShowSlide( this.GetSlideIndex() - 1 );
    }

    // ~~

    ShowNextSlide(
        )
    {
        this.ShowSlide( this.GetSlideIndex() + 1 );
    }

    // ~~

    SnapSlider(
        )
    {
        if ( this.StripSectionCount > 1
             && this.SliderRatio < 0.99 )
        {
            this.ShowSlide( this.GetSlideIndex() );
        }
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

    Resize(
        )
    {
        this.UpdateTrackVisibility();
        this.UpdateSliderSize();
        this.Update();
    }

    // ~~

    HandleResizeEvent(
        event
        )
    {
        this.Resize();
    }

    // ~~

    HandleStripTouchStartEvent(
        event
        )
    {
        this.StripIsDragged = true;
        this.StripWasDragged = false;
        this.StripDragPosition = this.GetPosition( event, this.StripIsHorizontal );
        this.StripDragRatio = this.SliderRatio;

        event.Cancel();
    }

    // ~~

    HandleSliderTouchStartEvent(
        event
        )
    {
        this.SliderIsDragged = true;
        this.SliderDragPosition = this.GetPosition( event, this.SliderIsHorizontal );

        event.Cancel();
    }

    // ~~

    HandleTouchMoveEvent(
        event
        )
    {
        if ( this.StripIsDragged )
        {
            this.MoveStrip( this.GetPosition( event, this.StripIsHorizontal ) - this.StripDragPosition );
            this.StripDragPosition = this.GetPosition( event, this.StripIsHorizontal );

            event.Cancel();
        }

        if ( this.SliderIsDragged )
        {
            this.MoveSlider( this.GetPosition( event, this.SliderIsHorizontal ) - this.SliderDragPosition );
            this.SliderDragPosition = this.GetPosition( event, this.SliderIsHorizontal );

            event.Cancel();
        }
    }

    // ~~

    HandleTouchEndEvent(
        event
        )
    {
        this.SnapSlider();
        this.StripIsDragged = false;
        this.SliderIsDragged = false;

        event.Cancel();
    }

    // ~~

    HandleWheelEvent(
        event
        )
    {
        this.MoveSlider( event.deltaY * 0.5 );
        event.Cancel();
    }

    // ~~

    HandleSlideButtonsClickEvent(
        )
    {
        var
            scroller,
            slide_button_element,
            slide_index;

        scroller = this;

        for ( slide_index = 0;
              slide_index < this.SlideButtonElementArray.length;
              ++slide_index )
        {
            slide_button_element = this.SlideButtonElementArray[ slide_index ];
            slide_button_element.SlideIndex = slide_index;
            slide_button_element.AddEventListener(
                "click",
                function (
                    event
                    )
                {
                    scroller.SetSliderRatio(
                        event.currentTarget.SlideIndex / ( scroller.SlideButtonElementArray.length - 1 )
                        );
                    scroller.Update();
                }
                );
        }
    }

    // ~~

    HandlePriorSlideButtonClickEvent(
        prior_slide_button_element
        )
    {
        var
            slide_index,
            scroller;

        scroller = this;

        prior_slide_button_element.AddEventListener(
            "click",
            function (
                event
                )
            {
                scroller.ShowPriorSlide();
            }
            );
    }

    // ~~

    HandleNextSlideButtonClickEvent(
        next_slide_button_element
        )
    {
        var
            slide_index,
            scroller;

        scroller = this;

        next_slide_button_element.AddEventListener(
            "click",
            function (
                event
                )
            {
                scroller.ShowNextSlide();
            }
            );
    }
}
