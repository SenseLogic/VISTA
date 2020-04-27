// -- TYPES

class VISTA_TABLE extends VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        data_class,
        key_property_name,
        stored_property_name_array,
        request_url
        )
    {
        super();

        this.DataClass = data_class;
        this.DataMap = new Map();
        this.KeyPropertyName = key_property_name;
        this.StoredPropertyNameArray = stored_property_name_array;
        this.RequestUrl = request_url;
    }

    // -- INQUIRIES

    GetKey(
        data
        )
    {
        return data[ this.KeyPropertyName ];
    }

    // ~~

    GetData(
        data_key
        )
    {
        var
            data;

        data = this.DataMap.get( data_key );

        if ( data === undefined )
        {
            return null;
        }
        else
        {
            return data;
        }
    }

    // -- OPERATIONS

    CreateStoredData(
        data
        )
    {
        var
            stored_data,
            stored_property_name;

        stored_data = {};

        for ( stored_property_name of this.StoredPropertyNameArray )
        {
            stored_data[ stored_property_name ] = data[ stored_property_name ];
        }

        return stored_data;
    }

    // ~~

    CopyStoredData(
        data,
        other_data
        )
    {
        var
            stored_property_name;

        for ( stored_property_name of this.StoredPropertyNameArray )
        {
            data[ stored_property_name ] = other_data[ stored_property_name ];
        }
    }

    // ~~

    ClearDataArray(
        )
    {
        var
            removed_data,
            removed_data_map;

        removed_data_map = this.DataMap;

        for ( removed_data of removed_data_map.values() )
        {
            removed_data.SetChanged();
        }

        this.DataMap = new Map();
        this.SetChanged();
    }

    // ~~

    SetData(
        data
        )
    {
        var
            data_key,
            set_data;

        data_key = data[ this.KeyPropertyName ];
        set_data = this.DataMap.get( data_key );

        if ( set_data === undefined )
        {
            set_data = new this.DataClass();
        }

        if ( set_data !== data )
        {
            this.CopyStoredData( set_data, data );
            this.DataMap.set( data_key, set_data );
        }

        this.SetChanged();
        set_data.SetChanged();

        return set_data;
    }

    // ~~

    SetDataArray(
        data_array
        )
    {
        var
            data,
            set_data_array;

        set_data_array = [];

        for ( data of data_array )
        {
            set_data_array.push( this.SetData( data ) );
        }

        return set_data_array;
    }

    // ~~

    RemoveData(
        data_key
        )
    {
        var
            removed_data;

        removed_data = this.DataMap.get( data_key );
        removed_data.SetChanged();

        this.DataMap.delete( data_key );
        this.SetChanged();
    }

    // ~~

    async GetStoredDataArray(
        )
    {
        var
            data_array;

        data_array = await SendJsonRequest( this.RequestUrl, "GET" );

        this.ClearDataArray();

        return this.SetDataArray( data_array );
    }

    // ~~

    async GetStoredData(
        data_key
        )
    {
        var
            data;

        data = await SendJsonRequest( this.RequestUrl + "/" + data_key, "GET" );

        return this.SetData( data );
    }

    // ~~

    async AddStoredData(
        data
        )
    {
        await SendJsonRequest( this.RequestUrl + "/" + this.GetKey( data ), "POST", this.CreateStoredData( data ) );

        return this.SetData( data );
    }

    // ~~

    async SetStoredData(
        data
        )
    {
        await SendJsonRequest( this.RequestUrl + "/" + this.GetKey( data ), "PUT", this.CreateStoredData( data ) );

        return this.SetData( data );
    }

    // ~~

    async RemoveStoredData(
        data_key
        )
    {
        await SendJsonRequest( this.RequestUrl + "/" + data_key, "DELETE", null );

        this.RemoveData( data_key );
    }
}
