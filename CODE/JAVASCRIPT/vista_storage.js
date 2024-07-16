// -- FUNCTIONS

function RemoveLocalValues(
    )
{
    localStorage.clear();
}

// ~~

function RemoveSessionValues(
    )
{
    sessionStorage.clear();
}

// ~~

function RemoveLocalValue(
    name
    )
{
    localStorage.removeItem( name );
}

// ~~

function RemoveSessionValue(
    name
    )
{
    sessionStorage.removeItem( name );
}

// ~~

function HasLocalValue(
    name
    )
{
    return localStorage.getItem( name ) !== null;
}

// ~~

function HasSessionValue(
    name
    )
{
    return sessionStorage.getItem( name ) !== null;
}

// ~~

function FindLocalValue(
    name,
    default_value = null
    )
{
    var
        value;

    value = localStorage.getItem( name );

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

function FindSessionValue(
    name,
    default_value = null
    )
{
    var
        value;

    value = sessionStorage.getItem( name );

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
    name
    )
{
    return localStorage.getItem( name );
}

// ~~

function GetSessionValue(
    name
    )
{
    return sessionStorage.getItem( name );
}

// ~~

function SetLocalValue(
    name,
    value
    )
{
    localStorage.setItem( name, value );
}

// ~~

function SetSessionValue(
    name,
    value
    )
{
    sessionStorage.setItem( name, value );
}
