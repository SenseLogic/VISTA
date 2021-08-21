// -- TYPES

class CAROUSEL
{
    // -- CONSTRUCTORS

    constructor(
        carousel_element,
        strip_element,
        strip_position = 0.0,
        slide_count,
        visible_slide_count = 1,
        pause_duration = 3.0,
        translation_duration = 0.5,
        carousel_is_perpetual = true,
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
        this.Element = carousel_element;
        this.StripElement = strip_element;
        this.StripPosition = strip_position;
        this.InitialStripPosition = strip_position;
        this.FinalStripPosition = strip_position;
        this.FinalStripPositionRatio = 1.0;
        this.SlideCount = slide_count;
        this.VisibleSlideCount = visible_slide_count;
        this.PerpetualSlideCount = slide_count - visible_slide_count;
        this.PauseDuration = pause_duration;
        this.TranslationDuration = translation_duration;
        this.TranslationSpeed = 1.0 / translation_duration;
        this.IsPerpetual = carousel_is_perpetual;
        this.SlideWidth = slide_width;
        this.GapWidth = gap_width;
        this.WidthUnit = width_unit;
        this.IsTranslated = false;
        this.IsAutomatic = false;

        this.SetStripPosition();
        this.SetStripWidth();
        this.SetSlideWidth();
    }

    // -- OPERATIONS

    SetStripPosition(
        )
    {
        if ( this.WidthUnit === "" )
        {
            this.StripElement.style[ "left" ] = ( this.StripPosition * -100.0 / this.VisibleSlideCount ) + "%";
        }
        else
        {
            this.StripElement.style[ "left" ] = ( -this.StripPosition * ( this.SlideWidth + this.GapWidth ) ) + this.WidthUnit;
        }
    }

    // ~~

    SetStripWidth(
        )
    {
        if ( this.WidthUnit === "" )
        {
            this.StripElement.style[ "width" ] = ( ( this.SlideCount / this.VisibleSlideCount ) * 100 ) + "%";
        }
        else
        {
            this.StripElement.style[ "width" ] = ( ( this.SlideWidth + this.GapWidth ) * this.SlideCount - this.GapWidth ) + this.WidthUnit;
        }
    }

    // ~~

    SetSlideWidth(
        )
    {
        var
            carousel;

        carousel = this;

        this.StripElement.GetChildElements().Iterate(
            function (
                element
                )
            {
                if ( carousel.WidthUnit === "" )
                {
                    element.style[ "width" ] = ( 100 / carousel.SlideCount ) + "%";
                }
                else
                {
                    element.style[ "width" ] = carousel.SlideWidth + carousel.WidthUnit;
                }
            }
            );
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
            final_strip_position_ratio,
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

        this.FinalStripPositionRatio += Math.min( step_time * this.TranslationSpeed, 1.0 );

        if ( this.FinalStripPositionRatio < 1.0 )
        {
            this.StripPosition
                = this.InitialStripPosition
                  + ( this.FinalStripPosition - this.InitialStripPosition )
                    * GetCubicEaseInOutRatio( this.FinalStripPositionRatio );

            this.SetStripPosition();
            this.AnimationFrame = window.requestAnimationFrame( this.UpdateAnimation );
        }
        else
        {
            this.IsTranslated = false;
            this.StripPosition = Math.round( this.StripPosition );
            this.SetStripPosition();
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

    TranslateSlide(
        strip_position_offset
        )
    {
        if ( !this.IsTranslated )
        {
            if ( this.IsPerpetual )
            {
                if ( strip_position_offset > 0 )
                {
                    if ( this.StripPosition >= this.PerpetualSlideCount )
                    {
                        this.StripPosition -= this.PerpetualSlideCount;
                    }
                }
                else if ( strip_position_offset < 0 )
                {
                    if ( this.StripPosition == 0 )
                    {
                        this.StripPosition += this.PerpetualSlideCount;
                    }
                }
            }
            else
            {
                if ( this.StripPosition + strip_position_offset < 0
                     || this.StripPosition + strip_position_offset > this.PerpetualSlideCount )
                {
                    strip_position_offset = 0;
                }
            }

            if ( strip_position_offset !== 0 )
            {
                this.InitialStripPosition = this.StripPosition;
                this.FinalStripPosition = this.StripPosition + strip_position_offset;
                this.FinalStripPositionRatio = 0.0;
                this.IsTranslated = true;

                this.StopAnimation();
                this.SetStripPosition();
                this.StartAnimation();
            }
        }
    }

    // ~~

    ShowPriorSlide(
        )
    {
        this.TranslateSlide( -1 );
    }

    // ~~

    ShowNextSlide(
        )
    {
        this.TranslateSlide( 1 );
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
            this.AutomaticAnimationTimeout = setTimeout( this.UpdateAutomaticAnimation, ( this.TranslationDuration + this.PauseDuration ) * 1000.0 );
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
