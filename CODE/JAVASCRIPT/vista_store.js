// -- TYPES

class VISTA_TABLE
{
    // -- CONSTRUCTORS

    constructor(
        name,
        key_name,
        request_url
        )
    {
        this.Name = name;
        this.KeyName = key_name;
        this.RequestUrl = request_url;
        this.ElementMap = new Map();
    }

    // -- OPERATIONS

    ClearLocalElementArray(
        )
    {
        this.ElementMap.clear();
    }

    // ~~

    GetLocalElement(
        element_key
        )
    {
        return this.ElementMap.get( element_key );
    }

    // ~~

    SetLocalElement(
        element,
        element_is_cloned = false
        )
    {
        var
            element_key;

        element_key = element[ this.KeyName ];

        if ( element_is_cloned )
        {
            this.ElementMap.set( element_key, { ...element } );
        }
        else
        {
            this.ElementMap.set( element_key, element );
        }
    }

    // ~~

    SetLocalElementArray(
        element_array,
        element_is_cloned = false
        )
    {
        var
            element;

        for ( element of element_array )
        {
            SetLocalElement( element, element_is_cloned );
        }
    }

    // ~~

    AddLocalElement(
        element,
        element_is_cloned = false
        )
    {
        SetLocalElement( element, element_is_cloned );
    }

    // ~~

    RemoveLocalElement(
        element_key
        )
    {
        this.ElementMap.delete( element_key );
    }

    // ~~

    async GetRemoteElementArray(
        )
    {
        var
            element_array;

        await element_array = SendJsonRequest( request_url, "GET" );

        ClearLocalElementArray();
        SetLocalElementArray( element_array );

        return element_array;
    }

    // ~~

    async GetRemoteElement(
        element_key
        )
    {
        var
            element;

        await element = SendJsonRequest( request_url + "/" + element_key, "GET" );

        SetLocalElement( element );

        return element;
    }

    // ~~

    async AddRemoteElement(
        element
        )
    {
        await SendJsonRequest( request_url + "/" + element_key, "POST", element );

        SetLocalElement( element );
    }

    // ~~

    async SetRemoteElement(
        element
        )
    {
        await SendJsonRequest( request_url + "/" + element_key, "PUT", element );

        SetLocalElement( element );
    }

    // ~~

    async RemoveRemoteElement(
        element_key
        )
    {
        await SendJsonRequest( request_url + "/" + element_key, "DELETE", element );

        RemoveLocalElement( element );
    }
}

// ~~

class VISTA_STORE
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.TableMap = new Map();
    }

    // -- INQUIRIES

    HasTable(
        table_name
        )
    {
        return this.TableMap.has( table_name );
    }

    // ~~

    GetTable(
        table_name
        )
    {
        return this.TableMap.get( table_name );
    }

    // -- OPERATIONS

    AddTable(
        table
        )
    {
        this.TableMap.set( table.Name, table );
    }

    // ~~

    RemoveTable(
        table_name
        )
    {
        this.TableMap.delete( table_name );
    }
}
