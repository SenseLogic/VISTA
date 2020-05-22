// -- TYPES

class VISTA_STORE extends VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        value_class,
        key_property_name,
        property_name_array,
        request_url,
        value_name = undefined
        )
    {
        super();

        this.ValueClass = value_class;
        this.ValueMap = new Map();
        this.KeyPropertyName = key_property_name;
        this.PropertyNameArray = property_name_array;
        this.GetValueArrayUrl = request_url;
        this.GetValueUrl = request_url + "/";
        this.AddValueUrl = request_url;
        this.SetValueUrl = request_url + "/";
        this.FixValueUrl = request_url + "/";
        this.RemoveValueUrl = request_url + "/";
        this.GetValueArrayMethod = "GET";
        this.GetValueMethod = "GET";
        this.AddValueMethod = "POST";
        this.SetValueMethod = "PUT";
        this.FixValueMethod = "PATCH";
        this.RemoveValueMethod = "DELETE";
        this.GetValueArrayPropertyName = undefined;
        this.GetValuePropertyName = undefined;
        this.AddValuePropertyName = undefined;
        this.SetValuePropertyName = undefined;
        this.FixValuePropertyName = undefined;

        if ( value_name !== undefined
             && value_name !== "Value" )
        {
            this[ "HasLocal" + value_name ] = this.HasLocalValue;
            this[ "GetLocal" + value_name ] = this.GetLocalValue;
            this[ "GetLocal" + value_name + "Array" ] = this.GetLocalValueArray;
            this[ "Fetch" + value_name ] = this.FetchValue;
            this[ "Fetch" + value_name + "Array" ] = this.FetchValueArray;
            this[ "Get" + value_name ] = this.GetValue;
            this[ "Get" + value_name + "Array" ] = this.GetValueArray;
            this[ "Add" + value_name ] = this.AddValue;
            this[ "Add" + value_name + "Array" ] = this.AddValueArray;
            this[ "Set" + value_name ] = this.SetValue;
            this[ "Set" + value_name + "Array" ] = this.SetValueArray;
            this[ "Fix" + value_name ] = this.FixValue;
            this[ "Fix" + value_name + "Array" ] = this.FixValueArray;
            this[ "Remove" + value_name ] = this.RemoveValue;
            this[ "Remove" + value_name + "Array" ] = this.RemoveValueArray;
        }
    }

    // -- INQUIRIES

    GetKey(
        value
        )
    {
        return value[ this.KeyPropertyName ];
    }

    // ~~

    HasLocalValue(
        value_key
        )
    {
        return this.ValueMap.has( value_key );
    }

    // ~~

    GetLocalValue(
        value_key
        )
    {
        var
            value;

        value = this.ValueMap.get( value_key );

        if ( value === undefined )
        {
            return null;
        }
        else
        {
            return value;
        }
    }

    // ~~

    GetLocalValueArray(
        value_key_array = undefined
        )
    {
        var
            value,
            value_array,
            value_key;

        if ( value_key_array === undefined )
        {
            return Array.from( this.ValueMap.values() );
        }
        else
        {
            value_array = [];

            if ( value_key_array instanceof Function )
            {
                for ( value of this.ValueMap.values() )
                {
                    if ( value_key_array( value ) )
                    {
                        value_array.AddLastValue( value );
                    }
                }
            }
            else
            {
                for ( value_key of value_key_array )
                {
                    if ( this.ValueMap.has( value_key ) )
                    {
                        value_array.AddLastValue( this.ValueMap.get( value_key ) );
                    }
                }
            }

            return value_array;
        }
    }

    // -- OPERATIONS

    CreateRemoteValue(
        value
        )
    {
        var
            remote_value,
            remote_property_name;

        remote_value = {};

        for ( remote_property_name of this.PropertyNameArray )
        {
            remote_value[ remote_property_name ] = value[ remote_property_name ];
        }

        return remote_value;
    }

    // ~~

    CopyValue(
        value,
        other_value
        )
    {
        var
            property_name;

        for ( property_name of this.PropertyNameArray )
        {
            if ( property_name in other_value )
            {
                value[ property_name ] = other_value[ property_name ];
            }
        }
    }

    // ~~

    ClearLocalValueArray(
        )
    {
        var
            removed_value,
            removed_value_map;

        removed_value_map = this.ValueMap;

        for ( removed_value of removed_value_map.values() )
        {
            removed_value.SetChanged();
        }

        this.ValueMap = new Map();
        this.SetChanged();
    }

    // ~~

    SetLocalValue(
        value
        )
    {
        var
            value_key,
            set_value;

        value_key = value[ this.KeyPropertyName ];
        set_value = this.ValueMap.get( value_key );

        if ( set_value === undefined )
        {
            set_value = new this.ValueClass();
        }

        if ( set_value !== value )
        {
            this.CopyValue( set_value, value );
            this.ValueMap.set( value_key, set_value );
        }

        set_value.SetChanged();
        this.SetChanged();

        return set_value;
    }

    // ~~

    SetLocalValueArray(
        value_array
        )
    {
        var
            value,
            set_value_array;

        set_value_array = [];

        for ( value of value_array )
        {
            set_value_array.AddLastValue( this.SetLocalValue( value ) );
        }

        return set_value_array;
    }

    // ~~

    FixLocalValue(
        value
        )
    {
        return this.SetLocalValue( value );
    }

    // ~~

    RemoveLocalValue(
        value_key
        )
    {
        var
            removed_value;

        removed_value = this.ValueMap.get( value_key );
        removed_value.SetChanged();

        this.ValueMap.delete( value_key );
        this.SetChanged();

        return removed_value;
    }

    // ~~

    async FetchValue(
        value_key,
        query_prefix = "",
        query_suffix = ""
        )
    {
        var
            value;

        value = await SendJsonRequest( this.GetValueUrl + query_prefix + value_key + query_suffix, this.GetValueMethod );

        if ( this.GetValuePropertyName !== undefined )
        {
            value = value[ this.GetValuePropertyName ];
        }

        return this.SetLocalValue( value );
    }

    // ~~

    async FetchValueArray(
        query_suffix = ""
        )
    {
        var
            value_array;

        value_array = await SendJsonRequest( this.GetValueArrayUrl + query_suffix, this.GetValueArrayMethod );

        if ( this.GetValueArrayPropertyName !== undefined )
        {
            value_array = value_array[ this.GetValueArrayPropertyName ];
        }

        this.ClearLocalValueArray();

        return this.SetLocalValueArray( value_array );
    }

    // ~~

    async GetValue(
        value_key,
        query_prefix = "",
        query_suffix = ""
        )
    {
        var
            value;

        value = this.ValueMap.get( value_key );

        if ( value === undefined )
        {
            value = await SendJsonRequest( this.GetValueUrl + query_prefix + value_key + query_suffix, this.GetValueMethod );

            if ( this.GetValuePropertyName !== undefined )
            {
                value = value[ this.GetValuePropertyName ];
            }

            return this.SetLocalValue( value );
        }
        else
        {
            return value;
        }
    }

    // ~~

    async GetValueArray(
        value_key_array,
        query_prefix = "",
        query_suffix = ""
        )
    {
        var
            value_array,
            value_key;

        value_array = [];

        for ( value_key of value_key_array )
        {
            value_array.AddLastValue( await this.GetValue( value_key, query_prefix, query_suffix ) );
        }

        return value_array;
    }

    // ~~

    async AddValue(
        value,
        query_suffix = ""
        )
    {
        var
            added_value;

        added_value = await SendJsonRequest( this.AddValueUrl + query_suffix, this.AddValueMethod, this.CreateRemoteValue( value ) );

        if ( this.AddValuePropertyName !== undefined )
        {
            added_value = added_value[ this.AddValuePropertyName ];
        }

        if ( added_value.hasOwnProperty( this.KeyPropertyName ) )
        {
            return this.SetLocalValue( added_value );
        }
        else
        {
            return this.SetLocalValue( value );
        }
    }

    // ~~

    async AddValueArray(
        value_array,
        query_prefix = "",
        query_suffix = ""
        )
    {
        var
            value;

        for ( value of value_array )
        {
            await this.AddValue( value, query_prefix, query_suffix );
        }
    }

    // ~~

    async SetValue(
        value,
        query_prefix = "",
        query_suffix = ""
        )
    {
        var
            set_value;

        set_value = await SendJsonRequest( this.SetValueUrl + query_prefix + this.GetKey( value ) + query_suffix, this.SetValueMethod, this.CreateRemoteValue( value ) );

        if ( this.SetValuePropertyName !== undefined )
        {
            set_value = set_value[ this.SetValuePropertyName ];
        }

        if ( set_value.hasOwnProperty( this.KeyPropertyName ) )
        {
            return this.SetLocalValue( set_value );
        }
        else
        {
            return this.SetLocalValue( value );
        }
    }

    // ~~

    async SetValueArray(
        value_array,
        query_prefix = "",
        query_suffix = ""
        )
    {
        var
            value;

        for ( value of value_array )
        {
            await this.SetValue( value, query_prefix, query_suffix );
        }
    }

    // ~~

    async FixValue(
        value,
        query_prefix = "",
        query_suffix = ""
        )
    {
        var
            fixed_value;

        fixed_value = await SendJsonRequest( this.FixValueUrl + query_prefix + this.GetKey( value ) + query_suffix, this.FixValueMethod, value );

        if ( this.FixValuePropertyName !== undefined )
        {
            fixed_value = fixed_value[ this.FixValuePropertyName ];
        }

        if ( fixed_value.hasOwnProperty( this.KeyPropertyName ) )
        {
            return this.SetLocalValue( fixed_value );
        }
        else
        {
            return this.SetLocalValue( value );
        }
    }

    // ~~

    async FixValueArray(
        value_array,
        query_prefix = "",
        query_suffix = ""
        )
    {
        var
            value;

        for ( value of value_array )
        {
            await this.FixValue( value, query_prefix, query_suffix );
        }
    }

    // ~~

    async RemoveValue(
        value_key,
        query_prefix = "",
        query_suffix = ""
        )
    {
        await SendJsonRequest( this.RemoveValueUrl + query_prefix + value_key + query_suffix, this.RemoveValueMethod, null );

        return this.RemoveLocalValue( value_key );
    }

    // ~~

    async RemoveValueArray(
        value_key_array,
        query_prefix = "",
        query_suffix = ""
        )
    {
        var
            value_key;

        for ( value_key of value_key_array )
        {
            await this.RemoveValue( value_key, query_prefix, query_suffix );
        }
    }
}
