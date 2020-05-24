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

        part_array = line.Split( " " );

        return GetReal( part_array[ 1 ] );
    }

    // ~~

    GetVector2(
        line
        )
    {
        var
            part_array;

        part_array = line.Split( " " );

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

        part_array = line.Split( " " );

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
            material,
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
            this.MaterialArray.AddLastValue( new VISTA_MATERIAL( "default" ) );
        }

        material = this.MaterialArray[ this.MaterialIndex ];

        position_index_array = [];
        mapping_index_array = [];
        normal_index_array = [];
        vertex_count = 0;

        part_array = line.Split( " " );

        for ( part_index = 1;
              part_index < part_array.length;
              ++part_index )
        {
            index_array = part_array[ part_index ].Split( "/" );

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

            position_index_array.AddLastValue( position_index );
            normal_index_array.AddLastValue( normal_index );
            mapping_index_array.AddLastValue( mapping_index );
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

    AddMaterials(
        material_file_text
        )
    {
        var
            line,
            line_array;

        line_array = material_file_text.ReplaceText( "\r", "" ).ReplaceText( "  ", " " ).Split( "\n" );

        for ( line of line_array )
        {
            line = line.Trim();

            if ( line.HasPrefix( "newmtl " ) )
            {
                this.MaterialIndex = this.MaterialArray.length;
                this.MaterialArray.AddLastValue( new VISTA_MATERIAL( line.substring( 7 ) ) );
            }
            else if ( line.HasPrefix( "Ka " ) )
            {
                this.MaterialArray[ this.MaterialIndex ].AmbientColor = this.GetVector3( line );
            }
            else if ( line.HasPrefix( "Kd " ) )
            {
                this.MaterialArray[ this.MaterialIndex ].DiffuseColor = this.GetVector3( line );
            }
            else if ( line.HasPrefix( "Ks " ) )
            {
                this.MaterialArray[ this.MaterialIndex ].SpecularColor = this.GetVector3( line );
            }
            else if ( line.HasPrefix( "Ns " ) )
            {
                this.MaterialArray[ this.MaterialIndex ].SpecularExponent = this.GetReal( line );
            }
            else if ( line.HasPrefix( "Ke " ) )
            {
                this.MaterialArray[ this.MaterialIndex ].EmissiveColor = this.GetVector3( line );
            }
            else if ( line.HasPrefix( "Ni " ) )
            {
                this.MaterialArray[ this.MaterialIndex ].Density = this.GetReal( line );
            }
            else if ( line.HasPrefix( "d " ) )
            {
                this.MaterialArray[ this.MaterialIndex ].Opacity = this.GetReal( line );
            }
        }
    }

    // ~~

    AddMeshes(
        model_file_text
        )
    {
        var
            line,
            line_array;

        line_array = model_file_text.ReplaceText( "\r", "" ).ReplaceText( "  ", " " ).Split( "\n" );

        for ( line of line_array )
        {
            line = line.Trim();

            if ( line.HasPrefix( "v " ) )
            {
                this.PositionVectorArray.AddLastValue( this.GetVector3( line ) );
            }
            else if ( line.HasPrefix( "vn " ) )
            {
                this.NormalVectorArray.AddLastValue( this.GetVector3( line ) );
            }
            else if ( line.HasPrefix( "vt " ) )
            {
                this.MappingVectorArray.AddLastValue( this.GetVector2( line ) );
            }
            else if ( line.HasPrefix( "f " ) )
            {
                this.FaceArray.AddLastValue( this.GetFace( line ) );
            }
            else if ( line.HasPrefix( "o " ) )
            {
                this.ObjectIndex = this.ObjectArray.length;
                this.ObjectArray.AddLastValue( line.substring( 2 ) );
            }
            else if ( line.HasPrefix( "g " ) )
            {
                this.GroupIndex = this.GroupArray.length;
                this.GroupArray.AddLastValue( line.substring( 2 ) );
            }
            else if ( line.HasPrefix( "usemtl " ) )
            {
                this.MaterialIndex = this.MaterialArray.indexOf( line.substring( 7 ) );
            }
        }
    }

    // ~~

    CreateTransform(
        scene
        )
    {
        var
            face,
            face_vertex_index,
            geometry,
            mapping_index,
            mapping_vector,
            material,
            material_index,
            mesh,
            normal_index,
            normal_vector,
            position_index,
            position_vector,
            real_array,
            scene,
            vertex_count,
            vertex_index_array;

        node = new VISTA_TRANSFORM();

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

                            real_array.AddLastValue( ...position_vector );
                        }

                        if ( material.MappingRealCount > 0 )
                        {
                            mapping_index = face.MappingIndexArray[ face_vertex_index ];
                            mapping_vector = this.MappingVectorArray[ mapping_index ];

                            real_array.AddLastValue( ...mapping_vector );
                        }

                        if ( material.NormalRealCount > 0 )
                        {
                            normal_index = face.NormalIndexArray[ face_vertex_index ];
                            normal_vector = this.NormalVectorArray[ normal_index ];

                            real_array.AddLastValue( ...normal_vector );
                        }
                    }

                    for ( face_vertex_index = 1;
                          face_vertex_index < face.VertexCount - 1;
                          ++face_vertex_index )
                    {
                        vertex_index_array.AddLastValue( vertex_count + 0 );
                        vertex_index_array.AddLastValue( vertex_count + face_vertex_index );
                        vertex_index_array.AddLastValue( vertex_count + face_vertex_index + 1 );
                    }

                    vertex_count += face.VertexCount;
                }
            }

            geometry = new VISTA_GEOMETRY( real_array, vertex_index_array, vertex_count );
            mesh = new VISTA_MESH( material, geometry );
            transform.MeshArray.AddLastValue( mesh );
        }
    }
}
