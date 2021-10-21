// -- FUNCTIONS

function ClearLocalValues(
    )
{
    localStorage.clear();
}

// ~~

function HasLocalValue(
    key
    )
{
    return localStorage.getItem( key ) === null;
}

// ~~

function FindLocalValue(
    key,
    default_value = null
    )
{
    var
        value;

    value = localStorage.getItem( key );

    if ( value === null )
    {
        return default_value;
    }
    else
    {
        return value;
    }
}

// ~~

function GetLocalValue(
    key
    )
{
    return localStorage.getItem( key );
}

// ~~

function SetLocalValue(
    value,
    key
    )
{
    localStorage.setItem( key, value );
}

// ~~

function ClearSessionValues(
    )
{
    sessionStorage.clear();
}

// ~~

function HasSessionValue(
    key
    )
{
    return sessionStorage.getItem( key ) === null;
}

// ~~

function FindSessionValue(
    key,
    default_value = null
    )
{
    var
        value;

    value = sessionStorage.getItem( key );

    if ( value === null )
    {
        return default_value;
    }
    else
    {
        return value;
    }
}

// ~~

function GetSessionValue(
    key
    )
{
    return sessionStorage.getItem( key );
}

// ~~

function SetSessionValue(
    value,
    key
    )
{
    sessionStorage.setItem( key, value );
}
