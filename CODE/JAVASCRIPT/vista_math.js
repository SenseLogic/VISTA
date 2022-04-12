// -- FUNCTIONS

var
    DefaultPrecision = 0.00001,
    HalfPi = Math.PI * 0.5,
    Pi = Math.PI,
    TwoPi = Math.PI * 2.0,
    DegreesToRadians = Math.PI / 180.0,
    RadiansToDegrees = 180.0 / Math.PI,
    GetMinimum = Math.min,
    GetMaximum = Math.max,
    GetPositive = Math.abs,
    GetSign = Math.sign,
    GetFloor = Math.floor,
    GetCeil = Math.ceil,
    GetRound = Math.round,
    GetSquareRoot = Math.sqrt,
    GetCosinus = Math.cos,
    GetSinus = Math.sin,
    GetTangent = Math.tan,
    GetArcCosinus = Math.acos,
    GetArcSinus = Math.asin,
    GetArcTangent = Math.atan,
    GetRandom = Math.random;

// ~~

function IsPowerOfTwo(
    integer
    )
{
    return ( integer & ( integer - 1 ) ) == 0;
}

// ~~

function IsRoughlyZero(
    value,
    precision = DefaultPrecision
    )
{
    return (
        value >= -precision
        && value <= precision
        );
}

// ~~

function IsRoughlyOne(
    value,
    precision = DefaultPrecision
    )
{
    return (
        value >= 1.0 - precision
        && value <= 1.0 + precision
        );
}

// ~~

function IsRoughlyMinusOne(
    value,
    precision = DefaultPrecision
    )
{
    return (
        value >= -1.0 - precision
        && value <= -1.0 + precision
        );
}

// ~~

function IsRoughlySame(
    first_value,
    second_value,
    precision = DefaultPrecision
    )
{
    var
        value = first_value - second_value;

    return (
        value >= -precision
        && value <= precision
        );
}

// ~~

function GetClamp(
    value,
    minimum_value,
    maximum_value
    )
{
    if ( value < minimum_value )
    {
        return minimum_value;
    }
    else if ( value > maximum_value )
    {
        return maximum_value;
    }
    else
    {
        return value;
    }
}

// ~~

function GetRadianAngle(
    degree_angle
    )
{
    return degree_angle * DegreesToRadians;
}

// ~~

function GetDegreeAngle(
    radian_angle
    )
{
    return radian_angle * RadiansToDegrees;
}

// ~~

function GetVectorAngle(
    x,
    y
    )
{
    var
        angle,
        cosinus,
        length,
        one_over_length,
        sinus;

    length = GetSquareRoot( x * x + y * y );

    if ( IsRoughlyZero( length ) )
    {
        return 0.0;
    }
    else
    {
        one_over_length = 1.0 / length;

        cosinus = x * one_over_length;
        sinus = y * one_over_length;

        if ( IsRoughlyOne( cosinus ) )
        {
            return 0.0;
        }
        else if ( IsRoughlyOne( sinus ) )
        {
            return HalfPi;
        }
        else if ( IsRoughlyMinusOne( sinus ) )
        {
            return -HalfPi;
        }
        else if ( IsRoughlyMinusOne( cosinus ) )
        {
            if ( sinus >= 0.0 )
            {
                return Pi;
            }
            else
            {
                return -Pi;
            }
        }
        else
        {
            if ( IsRoughlyZero( sinus ) )
            {
                cosinus = GetClamp( cosinus, -1.0, 1.0 );

                angle = GetArcCosinus( GetPositive( cosinus ) );
            }
            else
            {
                sinus = GetClamp( sinus, -1.0, 1.0 );

                angle = GetArcSinus( GetPositive( sinus ) );
            }

            if ( cosinus >= 0.0 )
            {
                if ( sinus < 0.0 )
                {
                    angle = -angle ;
                }
            }
            else
            {
                if ( sinus >= 0.0 )
                {
                    angle = Pi - angle;
                }
                else
                {
                    angle = -Pi + angle;
                }
            }

            return angle;
        }
    }
}

// ~~

function GetRandomReal(
    minimum_real,
    excluded_maximum_real
    )
{
    return minimum_real + GetRandom() * ( excluded_maximum_real - minimum_real );
}

// ~~

function GetRandomInteger(
    minimum_integer,
    maximum_integer
    )
{
    return GetFloor( minimum_integer + GetRandom() * ( maximum_integer - minimum_integer + 1 ) );
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

function GetEaseInRatio(
    ratio
    )
{
    return 1.0 - GetCosinus( ratio * HalfPi );
}

// ~~

function GetEaseOutRatio(
    ratio
    )
{
    return GetSinus( ratio * HalfPi );
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
        return 4.0 * ratio * ratio * ratio;
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

    return ratio * ratio * ratio * ratio * ratio + 1.0;
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

        return 16.0 * ratio * ratio * ratio * ratio * ratio + 1.0;
    }
}
