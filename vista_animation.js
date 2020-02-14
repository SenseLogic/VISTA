// -- VARIABLES

var
    PropertyAnimationFrame = null,
    PropertyAnimationIdentifier = 0,
    PropertyAnimationMap = new Map(),
    PropertyAnimationTimestamp = null,
    PropertyTransformNameArray = [
        "translateX",
        "translateY",
        "translateZ",
        "rotateX",
        "rotateY",
        "rotateZ",
        "scaleX",
        "scaleY",
        "scaleZ",
        "perspective"
        ];

// -- FUNCTIONS

function IsNumericText(
    text
    )
{
    if ( text.length > 0 )
    {
        character_code = text.charCodeAt( 0 );

        if ( character_code === 45
             && text.length >= 1 )
        {
            character_code = text.charCodeAt( 1 );
        }

        return (
            character_code >= 48
            && character_code <= 57
            );
    }
    else
    {
        return false;
    }
}

// ~~

function IsColorText(
    text
    )
{
    return (
        text.startsWith( "#" )
        || text.startsWith( "rgb(" )
        || text.startsWith( "rgba(" )
        );
}

// ~~

function ParseNumericText(
    text
    )
{
    var
        amount,
        unit;

    unit = GetUnit( text );

    if ( unit === "" )
    {
        amount = parseFloat( text );
    }
    else
    {
        amount = parseFloat( RemoveEnd( text, unit ) );
    }

    return {
        Amount : amount,
        Unit : unit
        };
}

// ~~

function ParseHexadecimalText(
    text,
    first_character_index = 0,
    last_character_index = -1,
    digits_are_repeated = false
    )
{
    var
        character_code,
        character_index,
        hexadecimal_digit,
        integer;

    if ( last_character_index < 0 )
    {
        last_character_index += text.length;
    }

    integer = 0;

    for ( character_index = first_character_index;
          character_index <= last_character_index;
          ++character_index )
    {
        character_code = text.charCodeAt( character_index );

        if ( character_code >= 97 )
        {
            hexadecimal_digit = character_code - 87;
        }
        else if ( character_code >= 65 )
        {
            hexadecimal_digit = character_code - 55;
        }
        else
        {
            hexadecimal_digit = character_code - 48;
        }

        integer = ( integer * 16 ) + hexadecimal_digit;

        if ( digits_are_repeated )
        {
            integer = ( integer * 16 ) + hexadecimal_digit;
        }
    }

    return integer;
}

// ~~

function ParseColorText(
    text
    )
{
    var
        component_array;

    text = text.split( " " ).join( "" );

    if ( text.startsWith( "#" ) )
    {
        if ( text.length == 4 )
        {
            return {
                Red : ParseHexadecimalText( text, 1, 1, true ),
                Green : ParseHexadecimalText( text, 2, 2, true ),
                Blue : ParseHexadecimalText( text, 3, 3, true ),
                Opacity : 1.0
                };
        }
        else
        {
            return {
                Red : ParseHexadecimalText( text, 1, 2 ),
                Green : ParseHexadecimalText( text, 3, 4 ),
                Blue : ParseHexadecimalText( text, 5, 6 ),
                Opacity : 1.0
                };
        }
    }
    else if ( text.endsWith( ")" ) )
    {
        if ( text.startsWith( "rgb(" ) )
        {
            component_array = text.substring( 4, text.length - 1 ).split( "," );

            return {
                Red : parseFloat( component_array[ 0 ] ),
                Green : parseFloat( component_array[ 1 ] ),
                Blue : parseFloat( component_array[ 2 ] ),
                Opacity : 1.0
                };
        }
        else if ( text.startsWith( "rgba(" ) )
        {
            component_array = text.substring( 5, text.length - 1 ).split( "," );

            return {
                Red : parseFloat( component_array[ 0 ] ),
                Green : parseFloat( component_array[ 1 ] ),
                Blue : parseFloat( component_array[ 2 ] ),
                Opacity : parseFloat( component_array[ 3 ] )
                };
        }
    }

    return {
        Red : 255,
        Green : 255,
        Blue : 255,
        Opacity : 1.0
        };
}

// ~~

function ParseTransformText(
    text
    )
{
    var
        component,
        component_array,
        parenthesis_character_index,
        value;

    transform = new Map();
    component_array = text.split( " " ).join( "" ).split( ")" );

    for ( component of component_array )
    {
        parenthesis_character_index = component.indexOf( "(" );

        if ( parenthesis_character_index > 0 )
        {
            transform.set(
                component.substring( 0, parenthesis_character_index ),
                ParseNumericText( component.substring( parenthesis_character_index + 1 ) )
                );
        }
    }

    return transform;
}

// ~~

function ParseConstantText(
    text
    )
{
    return text;
}

// ~~

function GetNumericProperty(
    element,
    property_name
    )
{
    return ParseNumericText( GetElementProperty( element, property_name ) );
}

// ~~

function GetColorProperty(
    element,
    property_name
    )
{
    return ParseColorText( GetElementProperty( element, property_name ) );
}

// ~~

function GetTransformProperty(
    element,
    property_name
    )
{
    return ParseTransformText( element.style[ property_name ] );
}

// ~~

function GetConstantProperty(
    element,
    property_name
    )
{
    return GetElementProperty( element, property_name );
}

// ~~

function SetNumericProperty(
    element,
    property_name,
    number
    )
{
    element.style[ property_name ] = number.Amount + number.Unit;
}

// ~~

function SetColorProperty(
    element,
    property_name,
    color
    )
{
    element.style[ property_name ]
        = "rgba(" + color.Red + "," + color.Green + "," + color.Blue + "," + color.Opacity + ")";
}

// ~~

function SetTransformProperty(
    element,
    property_name,
    transform
    )
{
    var
        operation,
        style;

    style = "";

    for ( operation_name of transform.keys() )
    {
        operation = transform.get( operation_name );

        style += operation_name + "(" + operation.Amount + operation.Unit + ")";
    }

    element.style[ property_name ] = style;
}

// ~~

function SetConstantProperty(
    element,
    property_name,
    constant
    )
{
    element.style[ property_name ] = constant;
}

// ~~

function GetNumericInterpolation(
    initial_number,
    final_number,
    final_number_ratio
    )
{
    return {
        Amount : initial_number.Amount + ( final_number.Amount - initial_number.Amount ) * final_number_ratio,
        Unit : final_number.Unit
        };
}

// ~~

function GetColorInterpolation(
    initial_color,
    final_color,
    final_color_ratio
    )
{
    return {
        Red : ( initial_color.Red + ( final_color.Red - initial_color.Red ) * final_color_ratio ),
        Green : ( initial_color.Green + ( final_color.Green - initial_color.Green ) * final_color_ratio ),
        Blue : ( initial_color.Blue + ( final_color.Blue - initial_color.Blue ) * final_color_ratio ),
        Opacity : ( initial_color.Opacity + ( final_color.Opacity - initial_color.Opacity ) * final_color_ratio )
        };
}

// ~~

function GetTransformInterpolation(
    initial_transform,
    final_transform,
    final_transform_ratio
    )
{
    if ( final_transform_ratio <= 0.0 )
    {
        return initial_transform;
    }
    else if ( final_transform_ratio >= 1.0 )
    {
        return final_transform;
    }
    else
    {
        interpolated_transform = new Map();

        for ( operation_name of final_transform.keys() )
        {
            if ( initial_transform.has( operation_name ) )
            {
                interpolated_transform.set(
                    operation_name,
                    GetNumericInterpolation(
                        initial_transform.get( operation_name ),
                        final_transform.get( operation_name ),
                        final_transform_ratio
                        )
                    );
            }
        }

        return interpolated_transform;
    }
}

// ~~

function GetConstantInterpolation(
    initial_constant,
    final_constant,
    final_constant_ratio
    )
{
    if ( final_constant_ratio < 1.0 )
    {
        return initial_constant;
    }
    else
    {
        return final_constant;
    }
}

// ~~

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

function PROPERTY_ANIMATION(
    element,
    property_name,
    property_value_array,
    property_time_array,
    animation_configuration
    )
{
    var
        property_value;

    this.Identifier = GetPropertyAnimationIdentifier();
    this.Element = element;
    this.Name = property_name;
    this.IsNumeric = IsNumericText( property_value_array[ 0 ] );
    this.IsColor = IsColorText( property_value_array[ 0 ] );
    this.IsTransform = ( property_name == "transform" );
    this.IsConstant = ( !this.IsNumeric && !this.IsColor && !this.IsTransform );
    this.State = 0;

    this.ParseValueFunction = animation_configuration.ParseValueFunction;
    this.GetRatioFunction = animation_configuration.GetRatioFunction;
    this.GetPropertyFunction = animation_configuration.GetPropertyFunction;
    this.SetPropertyFunction = animation_configuration.SetPropertyFunction;
    this.GetInterpolationFunction = animation_configuration.GetInterpolationFunction;

    if ( this.GetRatioFunction === undefined )
    {
        this.GetRatioFunction = GetLinearRatio;
    }

    if ( this.ParseValueFunction === undefined )
    {
        if ( this.IsNumeric )
        {
            this.ParseValueFunction = ParseNumericText;
        }
        else if ( this.IsColor )
        {
            this.ParseValueFunction = ParseColorText;
        }
        else if ( this.IsTransform )
        {
            this.ParseValueFunction = ParseTransformText;
        }
        else
        {
            this.ParseValueFunction = ParseConstantText;
        }
    }

    if ( this.GetPropertyFunction === undefined )
    {
        if ( this.IsNumeric )
        {
            this.GetPropertyFunction = GetNumericProperty;
        }
        else if ( this.IsColor )
        {
            this.GetPropertyFunction = GetColorProperty;
        }
        else if ( this.IsTransform )
        {
            this.GetPropertyFunction = GetTransformProperty;
        }
        else
        {
            this.GetPropertyFunction = GetConstantProperty;
        }
    }

    if ( this.SetPropertyFunction === undefined )
    {
        if ( this.IsNumeric )
        {
            this.SetPropertyFunction = SetNumericProperty;
        }
        else if ( this.IsColor )
        {
            this.SetPropertyFunction = SetColorProperty;
        }
        else if ( this.IsTransform )
        {
            this.SetPropertyFunction = SetTransformProperty;
        }
        else
        {
            this.SetPropertyFunction = SetConstantProperty;
        }
    }

    if ( this.GetInterpolationFunction === undefined )
    {
        if ( this.IsNumeric )
        {
            this.GetInterpolationFunction = GetNumericInterpolation;
        }
        else if ( this.IsColor )
        {
            this.GetInterpolationFunction = GetColorInterpolation;
        }
        else if ( this.IsTransform )
        {
            this.GetInterpolationFunction = GetTransformInterpolation;
        }
        else
        {
            this.GetInterpolationFunction = GetConstantInterpolation;
        }
    }

    this.ValueArray = [];

    if ( property_value_array instanceof Array )
    {
        for ( property_value of property_value_array )
        {
            this.ValueArray.push( this.ParseValueFunction( property_value ) );
        }
    }
    else
    {
        this.ValueArray = [ this.ParseValueFunction( property_value_array ) ];
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

    if ( this.Time === undefined )
    {
        this.Time = 0.0;
    }

    if ( this.IsLooping === undefined )
    {
        this.IsLooping = false;
    }

    if ( this.TimeArray[ 0 ] > 0.0 )
    {
        this.ValueArray.unshift( this.GetPropertyFunction( element, property_name ) );
        this.TimeArray.unshift( 0.0 );
    }
    else
    {
        this.SetPropertyFunction( element, property_name, this.ValueArray[ 0 ] );
    }

    if ( this.Duration === undefined )
    {
        this.Duration = this.TimeArray[ this.TimeArray.length - 1 ];

        if ( this.Speed === undefined )
        {
            this.Speed = 1.0;
        }
    }
    else
    {
        this.Speed = this.TimeArray[ this.TimeArray.length - 1 ] / this.Duration;
    }

    this.PriorValueIndex = 0;
    this.NextValueIndex = 0;
}

// ~~

PROPERTY_ANIMATION.prototype.Start = function(
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

PROPERTY_ANIMATION.prototype.Pause = function(
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

PROPERTY_ANIMATION.prototype.Resume = function(
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

PROPERTY_ANIMATION.prototype.Stop = function(
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

PROPERTY_ANIMATION.prototype.Update = function(
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

    next_time = this.TimeArray[ next_value_index ];
    next_value = this.ValueArray[ next_value_index ];

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
                = this.GetInterpolationFunction(
                      prior_value,
                      next_value,
                      this.GetRatioFunction( next_value_ratio )
                      );
        }
    }

    this.SetPropertyFunction(
        this.Element,
        this.Name,
        value
        );

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

