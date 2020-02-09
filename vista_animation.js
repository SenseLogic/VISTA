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
            this.ValueArray = property_value_array;
        }
        else
        {
            this.ValueArray = [ property_value_array ];
        }

        if ( property_time_array instanceof Array )
        {
            this.TimeArray = property_time_array;
        }
        else
        {
            this.TimeArray = [ property_time_array ];
        }

        this.Time = animation_configuration.Time;
        this.Speed = animation_configuration.Speed;
        this.IsLooping = animation_configuration.StartFunction;
        this.StartFunction = animation_configuration.StartFunction;
        this.PauseFunction = animation_configuration.PauseFunction;
        this.ResumeFunction = animation_configuration.ResumeFunction;
        this.StopFunction = animation_configuration.StopFunction;
        this.FinishFunction = animation_configuration.FinishFunction;
        this.UpdateFunction = animation_configuration.UpdateFunction;
        this.TimeFunction = animation_configuration.TimeFunction;
        this.ValueFunction = animation_configuration.ValueFunction;
        this.Unit = animation_configuration.Unit;

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

        if ( this.TimeFunction === undefined )
        {
            this.TimeFunction = GetLinearTime;
        }

        if ( this.ValueFunction === undefined )
        {
            this.ValueFunction = GetLinearValue;
        }

        if ( this.Unit === undefined )
        {
            this.Unit = "";
        }

        if ( this.TimeArray.length == 0
             || this.TimeArray[ 0 ] > 0.0 )
        {
            this.ValueArray.unshift( parseFloat( element.style[ property_name ] ) );
            this.TimeArray.unshift( 0.0 );
        }
        else
        {
            element.style[ property_name ] = this.ValueArray[ 0 ] + Unit;
        }

        this.Duration = this.TimeArray[ this.TimeArray.length - 1 ];
        this.ValueIndex = 0;
    }

    // -- OPERATIONS

    Start(
        )
    {
        this.State = 0;

        if ( this.StartFunction !== undefined )
        {
            this.StartFunction( this );
        }

        PropertyAnimationMap.set( this.id, this );

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

        PropertyAnimationMap.delete( this.id );

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

        PropertyAnimationMap.set( this.id, this );

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

        PropertyAnimationMap.delete( this.id );

        if ( PropertyAnimationMap.size === 0 )
        {
            StopAnimation();
        }
    }

    // ~~

    Finish(
        )
    {
        if ( this.FinishFunction !== undefined )
        {
            this.FinishFunction( this );
        }

        PropertyAnimationMap.delete( this.id );

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
            prior_value,
            prior_value_index,
            next_time,
            next_value,
            next_value_index,
            value,
            value_count,
            value_duration,
            value_time;

        this.Time += step_time;

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

        value_count = this.ValueArray.length;

        prior_value_index = this.PriorValueIndex;

        while ( prior_value_index - 1 >= 0
                && this.TimeArray[ prior_value_index - 1 ] > this.Time )
        {
            --prior_value_index;
        }

        while ( prior_value_index + 1 < value_count
                && this.TimeArray[ prior_value_index + 1 ] <= this.Time )
        {
            ++prior_value_index;
        }

        this.PriorValueIndex = prior_value_index;

        next_value_index = prior_value_index + 1;

        if ( next_value_index >= this.ValueCount )
        {
            if ( this.IsLooping )
            {
                next_value_index = 0;
            }
            else
            {
                next_value_index = ValueCount;
            }
        }

        prior_time = this.TimeArray[ prior_value_index ];
        prior_value = this.ValueArray[ prior_value_index ];

        next_time = this.TimeArray[ next_value_index ];
        next_value = this.ValueArray[ next_value_index ];

        value_time = Time - prior_time;
        value_duration = next_time - prior_value;

        if ( value_duration === 0.0 )
        {
            value = next_value;
        }
        else
        {
            value
                = this.ValueFunction(
                      prior_value,
                      next_value,
                      this.TimeFunction( value_time / value_duration )
                      );
        }

        element.style[ property_name ] = value + Unit;

        if ( this.UpdateFunction !== undefined )
        {
            this.UpdateFunction( this );
        }

        if ( this.Time === this.Duration
             && !this.IsLooping )
        {
            Stop();
        }
    }
}

// -- VARIABLES

var
    PropertyAnimationIdentifier = 0,
    PropertyAnimationInterval = null,
    PropertyAnimationMap = new Map();

// -- FUNCTIONS

function GetLinearTime(
    time
    )
{
    return time;
}

// ~~

function GetEaseInOutTime(
    time
    )
{
    return ( 3.0 - 2.0 * time ) * time * time;
}

// ~~

function GetQuadraticEaseInTime(
    time
    )
{
    return time * time;
}

// ~~

function GetQuadraticEaseOutTime(
    time
    )
{
    return time * ( 2.0 - time );
}

// ~~

function GetQuadraticEaseInOutTime(
    time
    )
{
    if ( time < 0.5 )
    {
        return 2.0 * time * time;
    }
    else
    {
        return ( 4.0 - 2.0 * time ) * time - 1.0;
    }
}

// ~~

function GetCubicEaseInTime(
    time
    )
{
    return time * time * time;
}

// ~~

function GetCubicEaseOutTime(
    time
    )
{
    time -= 1.0;

    return time * time * time + 1.0;
}

// ~~

function GetCubicEaseInOutTime(
    time
    )
{
    if ( time < 0.5 )
    {
        return 4.0 * time * time * time ;
    }
    else
    {
        return ( time - 1.0 ) * ( 2.0 * time - 2.0 ) * ( 2.0 * time - 2.0 ) + 1.0;
    }
}

// ~~

function GetQuarticEaseInTime(
    time
    )
{
    return time * time * time * time;
}

// ~~

function GetQuarticEaseOutTime(
    time
    )
{
    time -= 1.0;

    return 1.0 - time * time * time * time;
}

// ~~

function GetQuarticEaseInOutTime(
    time
    )
{
    if ( time < 0.5 )
    {
        return 8.0 * time * time * time * time;
    }
    else
    {
        time -= 1.0;

        return 1.0 - 8.0 * time * time * time * time;
    }
}

// ~~

function GetQuinticEaseInTime(
    time
    )
{
    return time * time * time * time * time;
}

// ~~

function GetQuinticEaseOutTime(
    time
    )
{
    time -= 1.0;

    return time * time * time * time * time + 1;
}

// ~~

function GetQuinticEaseInOutTime(
    time
    )
{
    if ( time < 0.5 )
    {
        return 16.0 * time * time * time * time * time;
    }
    else
    {
        time -= 1.0;

        return 16.0 * time * time * time * time * time + 1;
    }
}

// ~~

function GetLinearValue(
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
    AnimationPriorTime = new Date();
    AnimationStepTime = 0;

    if ( PropertyAnimationInterval === null )
    {
        PropertyAnimationInterval = setInterval( UpdateAnimation, 50 );
    }
}

// ~~

function UpdateAnimation(
    )
{
    var
        animation_time;

    animation_time = new Date();

    AnimationStepTime = animation_time - AnimationPriorTime;
    AnimationPriorTime = animation_time;

    for ( property_animation of PropertyAnimationMap.values() )
    {
        property_animation.Update( AnimationStepTime );
    }
}

// ~~

function StopAnimation(
    )
{
    if ( PropertyAnimationInterval !== null )
    {
        clearInterval( PropertyAnimationInterval );

        PropertyAnimationInterval = null;
    }
}

// ~~

function StartProperty(
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

function StartProperties(
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
        StartProperty(
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

Array.prototype.StartProperty = function(
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
        StartProperty(
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

Array.prototype.StartProperties = function(
    property_value_array_map,
    property_time_array,
    animation_configuration = {}
    )
{
    var
        element;

    for ( element of this )
    {
        StartProperties(
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
