// -- TYPES

class VISTA_WAVEFRONT_FACE
{
    // -- CONSTRUCTORS

    constructor(
        object_index,
        group_index,
        material_index,
        position_index_array,
        mapping_index_array,
        normal_index_array,
        vertex_count
        )
    {
        this.ObjectIndex = object_index;
        this.GroupIndex = group_index;
        this.MaterialIndex = material_index;
        this.PositionIndexArray = position_index_array;
        this.MappingIndexArray = mapping_index_array;
        this.NormalIndexArray = normal_index_array;
        this.VertexCount = vertex_count;
    }
}

// ~~

class VISTA_WAVEFRONT_MODEL
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.ObjectArray = [];
        this.GroupArray = [];
        this.MaterialArray = [];
        this.PositionVectorArray = [];
        this.MappingVectorArray = [];
        this.NormalVectorArray = [];
        this.FaceArray = [];

        this.ObjectIndex = -1;
        this.GroupIndex = -1;
        this.MaterialIndex = -1;
    }

    // -- OPERATIONS

    GetReal(
        line
        )
    {
        var
            part_array;

        part_array = line.split( " " );

        return GetReal( part_array[ 1 ] );
    }

    // ~~

    GetVector2(
        line
        )
    {
        var
            part_array;

        part_array = line.split( " " );

        return [
            GetReal( part_array[ 1 ] ),
            GetReal( part_array[ 2 ] )
            ];
    }

    // ~~

    GetVector3(
        line
        )
    {
        var
            part_array;

        part_array = line.split( " " );

        return [
            GetReal( part_array[ 1 ] ),
            GetReal( part_array[ 2 ] ),
            GetReal( part_array[ 3 ] )
            ];
    }

    // ~~

    GetFace(
        line
        )
    {
        var
            index_array,
            mapping_index,
            mapping_index_array,
            normal_index,
            normal_index_array,
            part_index,
            part_array,
            position_index,
            position_index_array,
            vertex_count;

        if ( this.MaterialIndex < 0 )
        {
            this.MaterialIndex = 0;
            this.MaterialArray.push( new VISTA_MATERIAL( "default" ) );
        }

        material = this.MaterialArray[ this.MaterialIndex ];

        position_index_array = [];
        mapping_index_array = [];
        normal_index_array = [];
        vertex_count = 0;

        part_array = line.split( " " );

        for ( part_index = 1;
              part_index < part_array.length;
              ++part_index )
        {
            index_array = part_array[ part_index ].split( "/" );

            if ( index_array.length > 0
                 && index_array[ 0 ].length > 0 )
            {
                position_index = GetReal( index_array[ 0 ] );

                if ( position_index < 0 )
                {
                    position_index += this.PositionVectorArray.length;
                }
                else
                {
                    --position_index;
                }

                material.PositionRealCount = 3;
            }
            else
            {
                position_index = -1;
            }

            if ( index_array.length > 1
                 && index_array[ 1 ].length > 0 )
            {
                mapping_index = GetReal( index_array[ 1 ] );

                if ( mapping_index < 0 )
                {
                    mapping_index += this.MappingVectorArray.length;
                }
                else
                {
                    --mapping_index;
                }

                material.MappingRealCount = 2;
            }
            else
            {
                mapping_index = -1;
            }

            if ( index_array.length > 2
                 && index_array[ 2 ].length > 0 )
            {
                normal_index = GetReal( index_array[ 2 ] );

                if ( normal_index < 0 )
                {
                    normal_index += this.NormalVectorArray.length;
                }
                else
                {
                    --normal_index;
                }

                material.NormalRealCount = 3;
            }
            else
            {
                normal_index = -1;
            }

            position_index_array.push( position_index );
            normal_index_array.push( normal_index );
            mapping_index_array.push( mapping_index );
            ++vertex_count
        }

        return new VISTA_WAVEFRONT_FACE(
            this.ObjectIndex,
            this.GroupIndex,
            this.MaterialIndex,
            position_index_array,
            mapping_index_array,
            normal_index_array,
            vertex_count
            );
    }

    // ~~

    ParseMaterialFileText(
        material_file_text
        )
    {
        var
            line,
            line_array;

        line_array = material_file_text.split( "\r" ).join( "" ).split( "  " ).join( " " ).split( "\n" );

        for ( line of line_array )
        {
            line = line.trim();

            if ( line.startsWith( "newmtl " ) )
            {
                this.MaterialIndex = this.MaterialArray.length;
                this.MaterialArray.push( new VISTA_MATERIAL( line.substring( 7 ) ) );
            }
            else if ( line.startsWith( "Ka " ) )
            {
                this.MaterialArray[ this.MaterialIndex ].AmbientColor = this.GetVector3( line );
            }
            else if ( line.startsWith( "Kd " ) )
            {
                this.MaterialArray[ this.MaterialIndex ].DiffuseColor = this.GetVector3( line );
            }
            else if ( line.startsWith( "Ks " ) )
            {
                this.MaterialArray[ this.MaterialIndex ].SpecularColor = this.GetVector3( line );
            }
            else if ( line.startsWith( "Ns " ) )
            {
                this.MaterialArray[ this.MaterialIndex ].SpecularExponent = this.GetReal( line );
            }
            else if ( line.startsWith( "Ke " ) )
            {
                this.MaterialArray[ this.MaterialIndex ].EmissiveColor = this.GetVector3( line );
            }
            else if ( line.startsWith( "Ni " ) )
            {
                this.MaterialArray[ this.MaterialIndex ].Density = this.GetReal( line );
            }
            else if ( line.startsWith( "d " ) )
            {
                this.MaterialArray[ this.MaterialIndex ].Opacity = this.GetReal( line );
            }
        }
    }

    // ~~

    ParseModelFileText(
        model_file_text
        )
    {
        var
            line,
            line_array;

        line_array = model_file_text.split( "\r" ).join( "" ).split( "  " ).join( " " ).split( "\n" );

        for ( line of line_array )
        {
            line = line.trim();

            if ( line.startsWith( "v " ) )
            {
                this.PositionVectorArray.push( this.GetVector3( line ) );
            }
            else if ( line.startsWith( "vn " ) )
            {
                this.NormalVectorArray.push( this.GetVector3( line ) );
            }
            else if ( line.startsWith( "vt " ) )
            {
                this.MappingVectorArray.push( this.GetVector2( line ) );
            }
            else if ( line.startsWith( "f " ) )
            {
                this.FaceArray.push( this.GetFace( line ) );
            }
            else if ( line.startsWith( "o " ) )
            {
                this.ObjectIndex = this.ObjectArray.length;
                this.ObjectArray.push( line.substring( 2 ) );
            }
            else if ( line.startsWith( "g " ) )
            {
                this.GroupIndex = this.GroupArray.length;
                this.GroupArray.push( line.substring( 2 ) );
            }
            else if ( line.startsWith( "usemtl " ) )
            {
                this.MaterialIndex = this.MaterialArray.indexOf( line.substring( 7 ) );
            }
        }
    }

    // ~~

    MakeScene(
        )
    {
        var
            face,
            material,
            material_index,
            scene,
            vertex_index;

        scene = new VISTA_SCENE();

        for ( material_index = 0;
              material_index < this.MaterialArray.length;
              ++material_index )
        {
            material = this.MaterialArray[ material_index ];
            material.RealCount = material.PositionRealCount + material.MappingRealCount + material.NormalRealCount;

            real_array = [];
            vertex_index_array = [];
            vertex_count = 0;

            for ( face of this.FaceArray )
            {
                if ( face.MaterialIndex === material_index )
                {
                    for ( face_vertex_index = 0;
                          face_vertex_index < face.VertexCount;
                          ++face_vertex_index )
                    {
                        if ( material.PositionRealCount > 0 )
                        {
                            position_index = face.PositionIndexArray[ face_vertex_index ];
                            position_vector = this.PositionVectorArray[ position_index ];

                            real_array.push( ...position_vector );
                        }

                        if ( material.MappingRealCount > 0 )
                        {
                            mapping_index = face.MappingIndexArray[ face_vertex_index ];
                            mapping_vector = this.MappingVectorArray[ mapping_index ];

                            real_array.push( ...mapping_vector );
                        }

                        if ( material.NormalRealCount > 0 )
                        {
                            normal_index = face.NormalIndexArray[ face_vertex_index ];
                            normal_vector = this.NormalVectorArray[ normal_index ];

                            real_array.push( ...normal_vector );
                        }
                    }

                    for ( face_vertex_index = 1;
                          face_vertex_index < face.VertexCount - 1;
                          ++face_vertex_index )
                    {
                        vertex_index_array.push( vertex_count + 0 );
                        vertex_index_array.push( vertex_count + face_vertex_index );
                        vertex_index_array.push( vertex_count + face_vertex_index + 1 );
                    }

                    vertex_count += face.VertexCount;
                }
            }

            geometry = new VISTA_GEOMETRY( real_array, vertex_index_array, vertex_count );
            mesh = new VISTA_MESH( material, geometry );
        }
    }
}
