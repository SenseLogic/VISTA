// -- FUNCTIONS

var
    DefaultPrecision = 0.00001,
    HalfPi = Math.PI * 0.5,
    Pi = Math.PI,
    TwoPi = Math.PI * 2.0,
    DegreesToRadians = Math.PI / 180.0,
    RadiansToDegrees = 180.0 / Math.PI,
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
                sinu = GetClamp( sinus, -1.0, 1.0 );

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
    return minimum_integer + GetRandom() * ( excluded_maximum_real - minimum_real );
}
// ~~

function GetRandomInteger(
    minimum_integer,
    maximum_integer
    )
{
    return GetFloor( minimum_integer + GetRandom() * ( maximum_integer - minimum_integer + 1 ) );
}
