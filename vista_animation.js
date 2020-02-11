// -- TYPES

class PROPERTY_ANIMATION
{
    // -- CONSTRUCTORS

    constructor(
        element,
        property_name,
        property_value_array,
        property_time_array,
        animation_configuration
        )
    {
        this.Identifier = GetPropertyAnimationIdentifier();
        this.Element = element;
        this.Name = property_name;
        this.State = 0;

        if ( property_value_array instanceof Array )
        {
            this.ValueArray = property_value_array.slice();
        }
        else
        {
            this.ValueArray = [ property_value_array ];
        }

        if ( property_time_array instanceof Array )
        {
            this.TimeArray = property_time_array.slice();
        }
        else
        {
            this.TimeArray = [ property_time_array ];
        }

        this.Time = animation_configuration.Time;
        this.Speed = animation_configuration.Speed;
        this.IsLooping = animation_configuration.IsLooping;
        this.StartFunction = animation_configuration.StartFunction;
        this.PauseFunction = animation_configuration.PauseFunction;
        this.ResumeFunction = animation_configuration.ResumeFunction;
        this.StopFunction = animation_configuration.StopFunction;
        this.UpdateFunction = animation_configuration.UpdateFunction;
        this.RatioFunction = animation_configuration.RatioFunction;
        this.InterpolationFunction = animation_configuration.InterpolationFunction;
        this.SetValueFunction = animation_configuration.GetValueFunction;
        this.GetValueFunction = animation_configuration.GetValueFunction;

        if ( this.Time === undefined )
        {
            this.Time = 0.0;
        }

        if ( this.Speed === undefined )
        {
            this.Speed = 1.0;
        }

        if ( this.IsLooping === undefined )
        {
            this.IsLooping = false;
        }

        if ( this.RatioFunction === undefined )
        {
            this.RatioFunction = GetLinearRatio;
        }

        if ( this.InterpolationFunction === undefined )
        {
            this.InterpolationFunction = GetLinearInterpolation;
        }

        if ( this.TimeArray.length == 0
             || this.TimeArray[ 0 ] > 0.0 )
        {
            this.ValueArray.unshift( element.style[ property_name ] );
            this.TimeArray.unshift( 0.0 );
        }
        else
        {
            element.style[ property_name ] = this.ValueArray[ 0 ];
        }

        this.Duration = this.TimeArray[ this.TimeArray.length - 1 ];
        this.PriorValueIndex = 0;
        this.NextValueIndex = 0;

        this.ExtractUnits();
    }

    // -- OPERATIONS

    ExtractUnits(
        )
    {
        var
            unit,
            value,
            value_index;

        this.UnitArray = [];

        for ( value_index = 0;
              value_index < this.ValueArray.length;
              ++value_index )
        {
            value = this.ValueArray[ value_index ];
            unit = GetUnit( value );

            this.UnitArray.push( unit );

            if ( unit === "" )
            {
                this.ValueArray[ value_index ] = value * 1.0;
            }
            else
            {
                this.ValueArray[ value_index ] = RemoveEnd( value, unit ) * 1.0;
            }
        }
    }

    // ~~

    Start(
        )
    {
        this.State = 0;

        if ( this.StartFunction !== undefined )
        {
            this.StartFunction( this );
        }

        PropertyAnimationMap.set( this.Identifier, this );

        if ( PropertyAnimationMap.size === 1 )
        {
            StartAnimation();
        }
    }

    // ~~

    Pause(
        )
    {
        this.State = 1;

        if ( this.PauseFunction !== undefined )
        {
            this.PauseFunction( this );
        }

        PropertyAnimationMap.delete( this.Identifier );

        if ( PropertyAnimationMap.size === 0 )
        {
            StopAnimation();
        }
    }

    // ~~

    Resume(
        )
    {
        this.State = 0;

        if ( this.ResumeFunction !== undefined )
        {
            this.ResumeFunction( this );
        }

        PropertyAnimationMap.set( this.Identifier, this );

        if ( PropertyAnimationMap.size === 1 )
        {
            StartAnimation();
        }
    }

    // ~~

    Stop(
        )
    {
        this.State = 2;

        if ( this.StopFunction !== undefined )
        {
            this.StopFunction( this );
        }

        PropertyAnimationMap.delete( this.Identifier );

        if ( PropertyAnimationMap.size === 0 )
        {
            StopAnimation();
        }
    }

    // ~~

    Update(
        step_time
        )
    {
        var
            prior_time,
            prior_unit,
            prior_value,
            prior_value_index,
            next_time,
            next_unit,
            next_value,
            next_value_index,
            next_value_ratio,
            value,
            value_count,
            value_duration,
            value_time;

        this.Time += step_time * this.Speed;

        if ( this.Time >= this.Duration )
        {
            if ( this.IsLooping )
            {
                while ( this.Time >= this.Duration )
                {
                    this.Time -= this.Duration;
                }
            }
            else
            {
                this.Time = this.Duration;
            }
        }

        if ( this.SetValueFunction !== undefined )
        {
            this.SetValueFunction( this );
        }
        else if ( this.GetValueFunction !== undefined )
        {
            this.Element.style[ this.Name ] = this.GetValueFunction( this );
        }
        else
        {
            value_count = this.ValueArray.length;

            prior_value_index = this.PriorValueIndex;

            while ( prior_value_index >= 1
                    && this.Time < this.TimeArray[ prior_value_index ] )
            {
                --prior_value_index;
            }

            while ( prior_value_index + 1 < value_count
                    && this.Time > this.TimeArray[ prior_value_index + 1 ] )
            {
                ++prior_value_index;
            }

            this.PriorValueIndex = prior_value_index;

            next_value_index = prior_value_index + 1;

            if ( next_value_index >= value_count )
            {
                next_value_index = prior_value_index;
            }

            this.NextValueIndex = next_value_index;

            prior_time = this.TimeArray[ prior_value_index ];
            prior_value = this.ValueArray[ prior_value_index ];
            prior_unit = this.UnitArray[ prior_value_index ];

            next_time = this.TimeArray[ next_value_index ];
            next_value = this.ValueArray[ next_value_index ];
            next_unit= this.UnitArray[ next_value_index ];

            value_time = this.Time - prior_time;
            value_duration = next_time - prior_time;

            if ( value_duration === 0.0 )
            {
                value = next_value;
            }
            else
            {
                next_value_ratio = value_time / value_duration;

                if ( next_value_ratio <= 0.0 )
                {
                    value = prior_value;
                }
                else if ( next_value_ratio >= 1.0 )
                {
                    value = next_value;
                }
                else
                {
                    value
                        = this.InterpolationFunction(
                              prior_value,
                              next_value,
                              this.RatioFunction( next_value_ratio )
                              );
                }
            }

            this.Element.style[ this.Name ] = value + next_unit;
        }

        if ( this.UpdateFunction !== undefined )
        {
            this.UpdateFunction( this );
        }

        if ( this.Time === this.Duration
             && !this.IsLooping )
        {
            this.Stop();
        }
    }
}

// -- VARIABLES

var
    PropertyAnimationFrame = null,
    PropertyAnimationIdentifier = 0,
    PropertyAnimationMap = new Map(),
    PropertyAnimationTimestamp = null;

// -- FUNCTIONS

function GetLinearRatio(
    ratio
    )
{
    return ratio;
}

// ~~

function GetEaseInOutRatio(
    ratio
    )
{
    return ( 3.0 - 2.0 * ratio ) * ratio * ratio;
}

// ~~

function GetQuadraticEaseInRatio(
    ratio
    )
{
    return ratio * ratio;
}

// ~~

function GetQuadraticEaseOutRatio(
    ratio
    )
{
    return ratio * ( 2.0 - ratio );
}

// ~~

function GetQuadraticEaseInOutRatio(
    ratio
    )
{
    if ( ratio < 0.5 )
    {
        return 2.0 * ratio * ratio;
    }
    else
    {
        return ( 4.0 - 2.0 * ratio ) * ratio - 1.0;
    }
}

// ~~

function GetCubicEaseInRatio(
    ratio
    )
{
    return ratio * ratio * ratio;
}

// ~~

function GetCubicEaseOutRatio(
    ratio
    )
{
    ratio -= 1.0;

    return ratio * ratio * ratio + 1.0;
}

// ~~

function GetCubicEaseInOutRatio(
    ratio
    )
{
    if ( ratio < 0.5 )
    {
        return 4.0 * ratio * ratio * ratio ;
    }
    else
    {
        return ( ratio - 1.0 ) * ( 2.0 * ratio - 2.0 ) * ( 2.0 * ratio - 2.0 ) + 1.0;
    }
}

// ~~

function GetQuarticEaseInRatio(
    ratio
    )
{
    return ratio * ratio * ratio * ratio;
}

// ~~

function GetQuarticEaseOutRatio(
    ratio
    )
{
    ratio -= 1.0;

    return 1.0 - ratio * ratio * ratio * ratio;
}

// ~~

function GetQuarticEaseInOutRatio(
    ratio
    )
{
    if ( ratio < 0.5 )
    {
        return 8.0 * ratio * ratio * ratio * ratio;
    }
    else
    {
        ratio -= 1.0;

        return 1.0 - 8.0 * ratio * ratio * ratio * ratio;
    }
}

// ~~

function GetQuinticEaseInRatio(
    ratio
    )
{
    return ratio * ratio * ratio * ratio * ratio;
}

// ~~

function GetQuinticEaseOutRatio(
    ratio
    )
{
    ratio -= 1.0;

    return ratio * ratio * ratio * ratio * ratio + 1;
}

// ~~

function GetQuinticEaseInOutRatio(
    ratio
    )
{
    if ( ratio < 0.5 )
    {
        return 16.0 * ratio * ratio * ratio * ratio * ratio;
    }
    else
    {
        ratio -= 1.0;

        return 16.0 * ratio * ratio * ratio * ratio * ratio + 1;
    }
}

// ~~

function GetLinearInterpolation(
    initial_value,
    final_value,
    final_value_ratio
    )
{
    return initial_value + ( final_value - initial_value ) * final_value_ratio;
}

// ~~

function GetPropertyAnimationIdentifier(
    )
{
    return ++PropertyAnimationIdentifier;
}

// ~~

function StartAnimation(
    )
{
    if ( PropertyAnimationFrame === null )
    {
        PropertyAnimationFrame = window.requestAnimationFrame( UpdateAnimation );
    }
}

// ~~

function UpdateAnimation(
    timestamp
    )
{
    var
        step_time;

    if ( PropertyAnimationTimestamp === null )
    {
        step_time = 0.0;
    }
    else
    {
        step_time = ( timestamp - PropertyAnimationTimestamp ) * 0.001;
    }

    PropertyAnimationTimestamp = timestamp;

    for ( property_animation of PropertyAnimationMap.values() )
    {
        property_animation.Update( step_time );
    }

    PropertyAnimationFrame = window.requestAnimationFrame( UpdateAnimation );
}

// ~~

function StopAnimation(
    )
{
    if ( PropertyAnimationFrame !== null )
    {
        window.cancelAnimationFrame( PropertyAnimationFrame );

        PropertyAnimationFrame = null;
    }
}

// ~~

function AnimateProperty(
    element,
    property_name,
    property_value_array,
    property_time_array,
    animation_configuration = {}
    )
{
    if ( element.PropertyAnimationMap === undefined )
    {
        element.PropertyAnimationMap = new Map();
    }

    if ( element.PropertyAnimationMap.has( property_name ) )
    {
        element.PropertyAnimationMap.get( property_name ).Stop();
    }

    property_animation
        = new PROPERTY_ANIMATION(
              element,
              property_name,
              property_value_array,
              property_time_array,
              animation_configuration
              );

    element.PropertyAnimationMap.set( property_name, property_animation );

    property_animation.Start();
}

// ~~

function AnimateProperties(
    element,
    property_value_array_map,
    property_time_array,
    animation_configuration = {}
    )
{
    var
        property_name;

    for ( property_name in property_value_array_map )
    {
        AnimateProperty(
            element,
            property_name,
            property_value_array_map[ property_name ],
            property_time_array,
            animation_configuration
            );
    }
}

// ~~

function PauseProperty(
    element,
    property_name
    )
{
    if ( element.PropertyAnimationMap !== undefined
         && element.PropertyAnimationMap.has( property_name ) )
    {
        element.PropertyAnimationMap.get( property_name ).Pause();
    }
}

// ~~

function PauseProperties(
    element,
    property_name_array
    )
{
    var
        property_name;

    if ( property_name_array === undefined )
    {
        if ( element.PropertyAnimationMap !== undefined )
        {
            for ( property_animation of element.PropertyAnimationMap.values() )
            {
                property_animation.Pause();
            }
        }
    }
    else
    {
        for ( property_name of property_name_array )
        {
            PauseProperty( element, property_name );
        }
    }
}

// ~~

function ResumeProperty(
    element,
    property_name
    )
{
    if ( element.PropertyAnimationMap !== undefined
         && element.PropertyAnimationMap.has( property_name ) )
    {
        element.PropertyAnimationMap.get( property_name ).Resume();
    }
}

// ~~

function ResumeProperties(
    element,
    property_name_array
    )
{
    var
        property_name;

    if ( property_name_array === undefined )
    {
        if ( element.PropertyAnimationMap !== undefined )
        {
            for ( property_animation of element.PropertyAnimationMap.values() )
            {
                property_animation.Resume();
            }
        }
    }
    else
    {
        for ( property_name of property_name_array )
        {
            ResumeProperty( element, property_name );
        }
    }
}

// ~~

function StopProperty(
    element,
    property_name
    )
{
    if ( element.PropertyAnimationMap !== undefined
         && element.PropertyAnimationMap.has( property_name ) )
    {
        element.PropertyAnimationMap.get( property_name ).Stop();
    }
}

// ~~

function StopProperties(
    element,
    property_name_array
    )
{
    var
        property_animation,
        property_name;

    if ( property_name_array === undefined )
    {
        if ( element.PropertyAnimationMap !== undefined )
        {
            for ( property_animation of element.PropertyAnimationMap.values() )
            {
                property_animation.Stop();
            }
        }
    }
    else
    {
        for ( property_name of property_name_array )
        {
            StopProperty( element, property_name );
        }
    }
}

// ~~

Array.prototype.AnimateProperty = function(
    property_name,
    property_value_array,
    property_time_array,
    animation_configuration = {}
    )
{
    var
        element;

    for ( element of this )
    {
        AnimateProperty(
            element,
            property_name,
            property_value_array,
            property_time_array,
            animation_configuration
            );
    }

    return this;
}

// ~~

Array.prototype.AnimateProperties = function(
    property_value_array_map,
    property_time_array,
    animation_configuration = {}
    )
{
    var
        element;

    for ( element of this )
    {
        AnimateProperties(
            element,
            property_value_array_map,
            property_time_array,
            animation_configuration
            );
    }

    return this;
}

// ~~

Array.prototype.PauseProperty = function(
    property_name
    )
{
    var
        element;

    for ( element of this )
    {
        PauseProperty( element, property_name );
    }

    return this;
}

// ~~

Array.prototype.PauseProperties = function(
    property_name_array
    )
{
    var
        element;

    for ( element of this )
    {
        PauseProperties( element, property_name_array );
    }

    return this;
}

// ~~

Array.prototype.ResumeProperty = function(
    property_name
    )
{
    var
        element;

    for ( element of this )
    {
        ResumeProperty( element, property_name );
    }

    return this;
}

// ~~

Array.prototype.ResumeProperties = function(
    property_name_array
    )
{
    var
        element;

    for ( element of this )
    {
        ResumeProperties( element, property_name_array );
    }

    return this;
}

// ~~

Array.prototype.StopProperty = function(
    property_name
    )
{
    var
        element;

    for ( element of this )
    {
        StopProperty( element, property_name );
    }

    return this;
}

// ~~

Array.prototype.StopProperties = function(
    property_name_array
    )
{
    var
        element;

    for ( element of this )
    {
        StopProperties( element, property_name_array );
    }

    return this;
}
