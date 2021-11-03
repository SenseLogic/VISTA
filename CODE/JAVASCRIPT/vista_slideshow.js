// -- TYPES

class SLIDESHOW
{
    // -- CONSTRUCTORS

    constructor(
        slide_element_array,
        slide_index = 0.0,
        pause_duration = 3.0,
        transition_duration = 0.5,
        slideshow_is_perpetual = true,
        slide_width = 0,
        gap_width = 0,
        width_unit = ""
        )
    {
        this.UpdateAnimation = this.UpdateAnimation.bind( this );
        this.UpdateAutomaticAnimation = this.UpdateAutomaticAnimation.bind( this );

        this.AnimationTimeout = null;
        this.AnimationFrame = null,
        this.AnimationTimestamp = null,
        this.SlideElementArray = slide_element_array;
        this.InitialSlideIndex = slide_index;
        this.FinalSlideIndex = slide_index;
        this.FinalSlideRatio = 1.0;
        this.SlideCount = slide_element_array.length;
        this.PauseDuration = pause_duration;
        this.TransitionDuration = transition_duration;
        this.TransitionSpeed = 1.0 / transition_duration;
        this.IsPerpetual = slideshow_is_perpetual;
        this.IsTransitioned = false;
        this.IsAutomatic = false;

        this.SetSlideIndex();
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
            this.IsTransitioned = false;
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
        if ( !this.IsTransitioned )
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
                this.IsTransitioned = true;

                this.StopAnimation();
                this.SetSlideIndex();
                this.StartAnimation();
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

    StartAutomaticAnimation(
        )
    {
        this.StopAutomaticAnimation();
        this.IsAutomatic = true;
        this.AutomaticAnimationTimeout = setTimeout( this.UpdateAutomaticAnimation, this.PauseDuration * 1000.0 );
    }

    // ~~

    UpdateAutomaticAnimation(
        )
    {
        if ( this.IsAutomatic )
        {
            this.ShowNextSlide();
            this.AutomaticAnimationTimeout = setTimeout( this.UpdateAutomaticAnimation, ( this.TransitionDuration + this.PauseDuration ) * 1000.0 );
        }
        else
        {
            this.StopAutomaticAnimation();
        }
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
}
