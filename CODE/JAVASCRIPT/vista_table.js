// -- TYPES

class VISTA_TABLE extends VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        data_class,
        key_property_name,
        property_name_array,
        request_url
        )
    {
        super();

        this.DataClass = data_class;
        this.DataMap = new Map();
        this.KeyPropertyName = key_property_name;
        this.PropertyNameArray = property_name_array;
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

    GetLocalData(
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

    CreateRemoteData(
        data
        )
    {
        var
            remote_data,
            remote_property_name;

        remote_data = {};

        for ( remote_property_name of this.PropertyNameArray )
        {
            remote_data[ remote_property_name ] = data[ remote_property_name ];
        }

        return remote_data;
    }

    // ~~

    CopyData(
        data,
        other_data
        )
    {
        var
            property_name;

        for ( property_name of this.PropertyNameArray )
        {
            data[ property_name ] = other_data[ property_name ];
        }
    }

    // ~~

    ClearLocalDataArray(
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

    SetLocalData(
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
            this.CopyData( set_data, data );
            this.DataMap.set( data_key, set_data );
        }

        this.SetChanged();
        set_data.SetChanged();

        return set_data;
    }

    // ~~

    SetLocalDataArray(
        data_array
        )
    {
        var
            data,
            set_data_array;

        set_data_array = [];

        for ( data of data_array )
        {
            set_data_array.push( this.SetLocalData( data ) );
        }

        return set_data_array;
    }

    // ~~

    RemoveLocalData(
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

    async GetDataArray(
        )
    {
        var
            data_array;

        data_array = await SendJsonRequest( this.RequestUrl, "GET" );

        this.ClearLocalDataArray();

        return this.SetLocalDataArray( data_array );
    }

    // ~~

    async GetData(
        data_key
        )
    {
        var
            data;

        data = await SendJsonRequest( this.RequestUrl + "/" + data_key, "GET" );

        return this.SetLocalData( data );
    }

    // ~~

    async AddData(
        data
        )
    {
        await SendJsonRequest( this.RequestUrl + "/" + this.GetKey( data ), "POST", this.CreateRemoteData( data ) );

        return this.SetLocalData( data );
    }

    // ~~

    async SetData(
        data
        )
    {
        await SendJsonRequest( this.RequestUrl + "/" + this.GetKey( data ), "PUT", this.CreateRemoteData( data ) );

        return this.SetLocalData( data );
    }

    // ~~

    async RemoveData(
        data_key
        )
    {
        await SendJsonRequest( this.RequestUrl + "/" + data_key, "DELETE", null );

        this.RemoveLocalData( data_key );
    }
}
