// -- FUNCTIONS

function StartVideoSlide(
    slide_element
    )
{
    var
        video_element;

    if ( slide_element !== null
         && slide_element.querySelector !== undefined )
    {
        video_element = slide_element.querySelector( "video" );

        if ( video_element !== null )
        {
            video_element.currentTime = 0;
            video_element.muted = ( localStorage.getItem( "video-is-muted" ) === "true" );
            video_element.dataset.muted = video_element.muted ? "true" : "false";
            video_element.play().catch(
                () =>
                {
                    video_element.muted = true;
                    video_element.dataset.muted = "true";
                    video_element.play();
                }
                );
        }
    }
}

// ~~

function StopVideoSlide(
    slide_element
    )
{
    var
        video_element;

    if ( slide_element !== null
         && slide_element.querySelector !== undefined )
    {
        video_element = slide_element.querySelector( "video" );

        if ( video_element !== null )
        {
            video_element.pause();
        }
    }
}

// -- TYPES

class SLIDESHOW
{
    // -- CONSTRUCTORS

    constructor(
        slide_element_array,
        slide_index = 0.0,
        slide_duration_array = 3.0,
        transition_duration = 0.5,
        slideshow_is_perpetual = true,
        slide_button_element_array = null,
        update_function = null,
        hidden_element_class_name = "is-hidden",
        start_slide_function = StartVideoSlide,
        stop_slide_function = StopVideoSlide
        )
    {
        this.UpdateAnimation = this.UpdateAnimation.bind( this );
        this.UpdateAutomaticAnimation = this.UpdateAutomaticAnimation.bind( this );

        this.AnimationTimeout = null;
        this.AnimationFrame = null,
        this.AnimationTimestamp = null;
        this.SlideElementArray = slide_element_array;
        this.PriorSlideIndex = -1;
        this.InitialSlideIndex = slide_index;
        this.FinalSlideIndex = slide_index;
        this.FinalSlideRatio = 1.0;
        this.SlideCount = slide_element_array.length;

        if ( typeof slide_duration_array === "number" )
        {
            this.SlideDurationArray = new Array( slide_element_array.length ).fill( slide_duration_array );
        }
        else
        {
            this.SlideDurationArray = slide_duration_array;
        }

        this.TransitionDuration = transition_duration;
        this.TransitionSpeed = 1.0 / transition_duration;
        this.IsPerpetual = slideshow_is_perpetual;
        this.SlideButtonElementArray = slide_button_element_array;
        this.UpdateFunction = update_function;
        this.HiddenElementClassName = hidden_element_class_name;
        this.StartSlideFunction = start_slide_function;
        this.StopSlideFunction = stop_slide_function;
        this.IsFaded = false;
        this.IsAutomatic = false;

        this.SetSlideIndex();

        if ( this.StartSlideFunction !== null
             && this.SlideCount > 0 )
        {
            this.StartSlideFunction( this.SlideElementArray[ this.GetFinalSlideIndex() ] );
        }
    }

    // -- INQUIRIES

    GetSlideIndex(
        )
    {
        var
            slide_index;

        slide_index = this.FinalSlideIndex - ( 1.0 - this.FinalSlideRatio );

        if ( slide_index < 0 )
        {
            slide_index += this.SlideCount;
        }

        if ( slide_index >= this.SlideCount )
        {
            slide_index -= this.SlideCount;
        }

        return slide_index;
    }

    // ~~

    GetInitialSlideIndex(
        )
    {
        var
            slide_index;

        slide_index = this.InitialSlideIndex;

        if ( slide_index < 0 )
        {
            slide_index += this.SlideCount;
        }

        if ( slide_index >= this.SlideCount )
        {
            slide_index -= this.SlideCount;
        }

        return slide_index;
    }

    // ~~

    GetFinalSlideIndex(
        )
    {
        var
            slide_index;

        slide_index = this.FinalSlideIndex;

        if ( slide_index < 0 )
        {
            slide_index += this.SlideCount;
        }

        if ( slide_index >= this.SlideCount )
        {
            slide_index -= this.SlideCount;
        }

        return slide_index;
    }

    // ~~

    GetSlideRatio(
        slide_index
        )
    {
        if ( this.SlideCount <= 1 )
        {
            return 1.0;
        }
        else if ( slide_index === this.FinalSlideIndex )
        {
            return this.FinalSlideRatio;
        }
        else if ( slide_index === this.InitialSlideIndex )
        {
            return 1.0 - this.FinalSlideRatio;
        }
        else
        {
            return 0.0;
        }
    }

    // -- OPERATIONS

    SetSlideIndex(
        )
    {
        var
            slide_index,
            slide_opacity;

        for ( slide_index = 0;
              slide_index < this.SlideCount;
              ++slide_index )
        {
            slide_opacity = this.GetSlideRatio( slide_index );

            if ( slide_index === this.FinalSlideIndex )
            {
                slide_opacity = this.FinalSlideRatio;
            }
            else if ( slide_index === this.InitialSlideIndex )
            {
                slide_opacity = 1.0 - this.FinalSlideRatio;
            }
            else
            {
                slide_opacity = 0.0;
            }

            this.SlideElementArray[ slide_index ].style[ "opacity" ] = slide_opacity;

            if ( this.HiddenElementClassName !== undefined )
            {
                this.SlideElementArray[ slide_index ].ToggleClass( this.HiddenElementClassName, slide_opacity === 0.0 );
            }
        }

        slide_index = this.GetSlideIndex();

        if ( slide_index !== this.PriorSlideIndex )
        {
            this.PriorSlideIndex = slide_index;

            if ( this.SlideButtonElementArray !== null )
            {
                for ( slide_index = 0;
                      slide_index < this.SlideButtonElementArray.length;
                      ++slide_index )
                {
                    this.SlideButtonElementArray[ slide_index ].ToggleClass(
                        "is-selected",
                        slide_index === this.FinalSlideIndex
                        );
                }
            }

            if ( this.UpdateFunction !== null )
            {
                this.UpdateFunction( this );
            }
        }
    }

    // ~~

    StartAnimation(
        )
    {
        if ( this.AnimationFrame === null )
        {
            this.AnimationTimestamp = null;
            this.AnimationFrame = window.requestAnimationFrame( this.UpdateAnimation );
        }
    }

    // ~~

    UpdateAnimation(
        timestamp
        )
    {
        var
            final_slide_index_ratio,
            step_time;

        if ( this.AnimationTimestamp === null )
        {
            step_time = 0.0;
        }
        else
        {
            step_time = ( timestamp - this.AnimationTimestamp ) * 0.001;
        }

        this.AnimationTimestamp = timestamp;

        this.FinalSlideRatio += Math.min( step_time * this.TransitionSpeed, 1.0 );

        if ( this.FinalSlideRatio < 1.0 )
        {
            this.SetSlideIndex();
            this.AnimationFrame = window.requestAnimationFrame( this.UpdateAnimation );
        }
        else
        {
            if ( this.StopSlideFunction !== null
                 && this.InitialSlideIndex !== this.FinalSlideIndex )
            {
                this.StopSlideFunction( this.SlideElementArray[ this.GetInitialSlideIndex() ] );
            }

            this.IsFaded = false;
            this.InitialSlideIndex = this.FinalSlideIndex;
            this.FinalSlideRatio = 1.0;
            this.SetSlideIndex();
        }
    }

    // ~~

    StopAnimation(
        )
    {
        if ( this.AnimationFrame !== null )
        {
            window.cancelAnimationFrame( this.AnimationFrame );

            this.AnimationFrame = null;
            this.AnimationTimestamp = null;
        }
    }

    // ~~

    ChangeSlide(
        slide_index_offset
        )
    {
        if ( !this.IsFaded )
        {
            if ( this.IsPerpetual )
            {
                if ( slide_index_offset > 0 )
                {
                    if ( this.FinalSlideIndex >= this.SlideCount - 1 )
                    {
                        this.FinalSlideIndex -= this.SlideCount;
                    }
                }
                else if ( slide_index_offset < 0 )
                {
                    if ( this.FinalSlideIndex == 0 )
                    {
                        this.FinalSlideIndex += this.SlideCount;
                    }
                }
            }
            else
            {
                if ( this.FinalSlideIndex + slide_index_offset < 0
                     || this.FinalSlideIndex + slide_index_offset >= this.SlideCount )
                {
                    slide_index_offset = 0;
                }
            }

            if ( slide_index_offset !== 0 )
            {
                this.FinalSlideIndex += slide_index_offset;
                this.FinalSlideRatio = 0.0;
                this.IsFaded = true;

                if ( this.StartSlideFunction !== null )
                {
                    this.StartSlideFunction( this.SlideElementArray[ this.GetFinalSlideIndex() ] );
                }

                this.StopAnimation();
                this.SetSlideIndex();
                this.StartAnimation();

                if ( this.IsAutomatic )
                {
                    this.StopAutomaticAnimation();
                    this.StartAutomaticAnimation();
                }
            }
        }
    }

    // ~~

    ShowPriorSlide(
        )
    {
        this.ChangeSlide( -1 );
    }

    // ~~

    ShowNextSlide(
        )
    {
        this.ChangeSlide( 1 );
    }

    // ~~

    ShowSlide(
        slide_index
        )
    {
        if ( slide_index !== this.FinalSlideIndex )
        {
            this.ChangeSlide( slide_index - this.FinalSlideIndex );
        }
    }

    // ~~

    StartAutomaticAnimation(
        )
    {
        this.StopAutomaticAnimation();
        this.IsAutomatic = true;

        if ( this.AutomaticAnimationTimeout !== null )
        {
            clearTimeout( this.AutomaticAnimationTimeout );
        }

        this.AutomaticAnimationTimeout = setTimeout( this.UpdateAutomaticAnimation, this.SlideDurationArray[ this.GetFinalSlideIndex() ] * 1000.0 );
    }

    // ~~

    UpdateAutomaticAnimation(
        )
    {
        if ( this.IsAutomatic
             && this.SlideCount > 1 )
        {
            this.ShowNextSlide();

            if ( this.AutomaticAnimationTimeout !== null )
            {
                clearTimeout( this.AutomaticAnimationTimeout );
            }

            this.AutomaticAnimationTimeout = setTimeout( this.UpdateAutomaticAnimation, ( this.TransitionDuration + this.SlideDurationArray[ this.GetFinalSlideIndex() ] ) * 1000.0 );
        }
        else
        {
            this.StopAutomaticAnimation();
        }
    }

    // ~~

    DelayAutomaticAnimation(
        delay_duration
        )
    {
        if ( this.AutomaticAnimationTimeout !== null )
        {
            clearTimeout( this.AutomaticAnimationTimeout );
        }

        this.AutomaticAnimationTimeout = setTimeout( this.UpdateAutomaticAnimation, delay_duration * 1000.0 );
    }

    // ~~

    StopAutomaticAnimation(
        )
    {
        this.IsAutomatic = false;

        if ( this.AutomaticAnimationTimeout !== null )
        {
            clearTimeout( this.AutomaticAnimationTimeout );
            this.AutomaticAnimationTimeout = null;
        }
    }

    // ~~

    Reset(
        slide_index = 0
        )
    {
        this.PriorSlideIndex = -1;
        this.InitialSlideIndex = slide_index;
        this.FinalSlideIndex = slide_index;
        this.FinalSlideRatio = 1.0;
        this.IsFaded = false;

        this.StopAnimation();
        this.SetSlideIndex();
        this.StartAnimation();

        if ( this.IsAutomatic )
        {
            this.StartAutomaticAnimation();
        }

        if ( this.StartSlideFunction !== null
             && this.SlideCount > 0 )
        {
            this.StartSlideFunction( this.SlideElementArray[ this.GetFinalSlideIndex() ] );
        }
    }

    // ~~

    HandleSlideButtonsClickEvent(
        automatic_animation_is_stopped = false,
        automatic_animation_delay_duration = undefined
        )
    {
        var
            slide_button_element,
            slide_index,
            slideshow;

        slideshow = this;

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
                    if ( automatic_animation_is_stopped )
                    {
                        slideshow.StopAutomaticAnimation();
                    }
                    else if ( automatic_animation_delay_duration !== undefined )
                    {
                        slideshow.DelayAutomaticAnimation( automatic_animation_delay_duration );
                    }

                    slideshow.ShowSlide( event.currentTarget.SlideIndex );
                }
                );
        }
    }

    // ~~

    HandlePriorSlideButtonClickEvent(
        prior_slide_button_element,
        automatic_animation_is_stopped = false,
        automatic_animation_delay_duration = undefined
        )
    {
        var
            slide_index,
            slideshow;

        slideshow = this;

        prior_slide_button_element.AddEventListener(
            "click",
            function (
                event
                )
            {
                if ( automatic_animation_is_stopped )
                {
                    slideshow.StopAutomaticAnimation();
                }
                else if ( automatic_animation_delay_duration !== undefined )
                {
                    slideshow.DelayAutomaticAnimation( automatic_animation_delay_duration );
                }

                slideshow.ShowPriorSlide();
            }
            );
    }

    // ~~

    HandleNextSlideButtonClickEvent(
        next_slide_button_element,
        automatic_animation_is_stopped = false,
        automatic_animation_delay_duration = undefined
        )
    {
        var
            slide_index,
            slideshow;

        slideshow = this;

        next_slide_button_element.AddEventListener(
            "click",
            function (
                event
                )
            {
                if ( automatic_animation_is_stopped )
                {
                    slideshow.StopAutomaticAnimation();
                }
                else if ( automatic_animation_delay_duration !== undefined )
                {
                    slideshow.DelayAutomaticAnimation( automatic_animation_delay_duration );
                }

                slideshow.ShowNextSlide();
            }
            );
    }
}
