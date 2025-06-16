// -- CONSTANTS

const NullDate = {
    Year : 1000,
    Month : 1,
    Day : 1
    };
const NullTime = {
    Hour : 0,
    Minute : 0,
    Second : 0.0
    };
const NullDateTime = {
    Year : 1000,
    Month : 1,
    Day : 1,
    Hour : 0,
    Minute : 0,
    Second : 0.0
    };

// -- TYPES

class VISTA_CLOCK
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.Time = 0.0;
        this.TimeStep = 0.0;
    }

    // -- OPERATIONS

    Set(
        time
        )
    {
        if ( this.Time !== 0.0 )
        {
            this.TimeStep = time - this.Time;
        }

        this.Time = time;
    }
}

// -- FUNCTIONS

function GetMillisecondTimestamp(
    )
{
    return window.performance.timing.navigationStart + window.performance.now();
}

// ~~

function GetLocalDate(
    system_date
    )
{
    if ( system_date === undefined )
    {
        system_date = new Date();
    }

    return {
        Year : system_date.getFullYear(),
        Month : system_date.getMonth(),
        Day : system_date.getDay()
        };
}

// ~~

function GetLocalTime(
    system_date
    )
{
    if ( system_date === undefined )
    {
        system_date = new Date();
    }

    return {
        Hour : system_date.getHours(),
        Minute : system_date.getMinutes(),
        Second : system_date.getSeconds()
        };
}

// ~~

function GetLocalDateTime(
    system_date
    )
{
    if ( system_date === undefined )
    {
        system_date = new Date();
    }

    return {
        Year : system_date.getFullYear(),
        Month : system_date.getMonth(),
        Day : system_date.getDay(),
        Hour : system_date.getHours(),
        Minute : system_date.getMinutes(),
        Second : system_date.getSeconds()
        };
}

// ~~

function GetUniversalDate(
    system_date
    )
{
    if ( system_date === undefined )
    {
        system_date = new Date();
    }

    return {
        Year : system_date.getUTCFullYear(),
        Month : system_date.getUTCMonth(),
        Day : system_date.getUTCDay()
        };
}

// ~~

function GetUniversalTime(
    system_date
    )
{
    if ( system_date === undefined )
    {
        system_date = new Date();
    }

    return {
        Hour : system_date.getUTCHours(),
        Minute : system_date.getUTCMinutes(),
        Second : system_date.getUTCSeconds()
        };
}

// ~~

function GetUniversalDateTime(
    system_date
    )
{
    if ( system_date === undefined )
    {
        system_date = new Date();
    }

    return {
        Year : system_date.getUTCFullYear(),
        Month : system_date.getUTCMonth(),
        Day : system_date.getUTCDay(),
        Hour : system_date.getUTCHours(),
        Minute : system_date.getUTCMinutes(),
        Second : system_date.getUTCSeconds()
        };
}

// ~~

function GetDateText(
    date,
    suffix = ""
    )
{
    return (
        date.Year.toString().GetLeftPaddedText( 4, "0" )
        + ":"
        + date.Month.toString().GetLeftPaddedText( 2, "0" )
        + ":"
        + date.Day.toString().GetLeftPaddedText( 2, "0" )
        + suffix
        );
}

// ~~

function GetTimeText(
    time,
    suffix = ""
    )
{
    return (
        time.Hour.toString().GetLeftPaddedText( 2, "0" )
        + "-"
        + time.Minute.toString().GetLeftPaddedText( 2, "0" )
        + "-"
        + time.Second.toString().GetLeftPaddedText( 2, "0" )
        + suffix
        );
}

// ~~

function GetDateTimeText(
    date_time,
    infix = " ",
    suffix = ""
    )
{
    return (
        date_time.Year.toString().GetLeftPaddedText( 4, "0" )
        + "-"
        + date_time.Month.toString().GetLeftPaddedText( 2, "0" )
        + "-"
        + date_time.Day.toString().GetLeftPaddedText( 2, "0" )
        + infix
        + date_time.Hour.toString().GetLeftPaddedText( 2, "0" )
        + ":"
        + date_time.Minute.toString().GetLeftPaddedText( 2, "0" )
        + ":"
        + date_time.Second.toString().GetLeftPaddedText( 2, "0" )
        + suffix
        );
}
