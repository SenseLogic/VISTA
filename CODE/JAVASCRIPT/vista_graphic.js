// -- TYPES

class GRAPHIC_REAL_32_ARRAY_BUFFER
{
    constructor(
        real_array
        )
    {
        this.Float32Array = new Float32Array( real_array );
        this.Initialize();
    }

    // ~~

    Initialize(
        )
    {
        this.Buffer = GraphicContext.createBuffer();

        GraphicContext.bindBuffer( GraphicContext.ARRAY_BUFFER, this.Buffer );
        GraphicContext.bufferData( GraphicContext.ARRAY_BUFFER, this.Float32Array, GraphicContext.STATIC_DRAW );
    }
}

// ~~

class GRAPHIC_NATURAL_16_ELEMENT_ARRAY_BUFFER
{
    constructor(
        natural_array
        )
    {
        this.Uint16Array = new Uint16Array( natural_array );
        this.Initialize();
    }

    // ~~

    Initialize(
        )
    {
        this.Buffer = GraphicContext.createBuffer();

        GraphicContext.bindBuffer( GraphicContext.ELEMENT_ARRAY_BUFFER, this.Buffer );
        GraphicContext.bufferData( GraphicContext.ELEMENT_ARRAY_BUFFER, this.Uint16Array, GraphicContext.STATIC_DRAW );
    }
}

// ~~

class GRAPHIC_TEXTURE
{
    // -- CONSTRUCTORS

    constructor(
        image_url,
        callback_function = null,
        is_repeated = false,
        has_mipmap = true
        )
    {
        var
            texture;

        texture = this;

        this.InternalFormat = GraphicContext.RGBA;
        this.Format = GraphicContext.RGBA;
        this.Type = GraphicContext.UNSIGNED_BYTE;
        this.Target = GraphicContext.TEXTURE_2D;
        this.MinificationFilter = GraphicContext.LINEAR;
        this.MagnificationFilter = GraphicContext.LINEAR;
        this.HorizontalWrap = is_repeated ? GraphicContext.REPEAT : GraphicContext.CLAMP_TO_EDGE;
        this.VerticalWrap = is_repeated ? GraphicContext.REPEAT : GraphicContext.CLAMP_TO_EDGE;
        this.HasMipmap = has_mipmap;
        this.Initialize();
    }

    // -- OPERATIONS

    Initialize(
        )
    {
        this.Texture = GraphicContext.createTexture();

        GraphicContext.bindTexture( this.Target, this.Texture );
        GraphicContext.texParameteri( this.Target, GraphicContext.TEXTURE_MIN_FILTER, this.MinificationFilter );
        GraphicContext.texParameteri( this.Target, GraphicContext.TEXTURE_MAG_FILTER, this.MagnificationFilter );
        GraphicContext.texParameteri( this.Target, GraphicContext.TEXTURE_WRAP_S, this.HorizontalWrap );
        GraphicContext.texParameteri( this.Target, GraphicContext.TEXTURE_WRAP_T, this.VerticalWrap );
        GraphicContext.bindTexture( this.Target, null );
    }

    // ~~

    SetImage(
        )
    {
        GraphicContext.bindTexture( this.Target, this.Texture );
        GraphicContext.texImage2D( this.Target, this.Level, this.InternalFormat, this.Format, this.Type, this.Image );

        if ( this.HasMipmap
             && IsPowerOfTwo( this.Image.width )
             && IsPowerOfTwo( this.Image.height ) )
        {
            GraphicContext.generateMipmap( this.Target );
        }

        GraphicContext.bindTexture( this.Target, null);
    }

    // ~~

    LoadImage(
        image_file_path
        )
    {
        var
            texture;

        texture = this;

        return new Promise(
            function (
                resolve_function,
                reject_function
                )
            {
                texture.Image = new Image();
                texture.Image.crossOrigin = "anonymous";
                texture.Image.addEventListener(
                    "load",
                    function (
                        )
                    {
                        texture.SetImage();

                        resolve_function( texture );
                    }
                    );

                texture.Image.src = image_file_path;
            }
            );
    }

    // ~~

    Finalize(
        )
    {
        GraphicContext.deleteTexture( this.Texture );
    }

    // ~~

    Bind(
        unit_index
        )
    {
        GraphicContext.activeTexture( GraphicContext.TEXTURE0 + unit_index );
        GraphicContext.bindTexture( this.Target, this.Texture );
    }

    // ~~

    Unbind(
        )
    {
        GraphicContext.bindTexture( this.Target, null );
    }
}

// ~~

class GRAPHIC_SHADER
{
    // -- CONSTRUCTORS

    constructor(
        name,
        code,
        type
        )
    {
        this.Name = name;
        this.Code = code;
        this.Type = type;
        this.Initialize();
    }

    // -- OPERATIONS

    Initialize(
        )
    {
        this.Shader = GraphicContext.createShader( this.Type );
        GraphicContext.shaderSource( this.Shader, this.Code );
        GraphicContext.compileShader( this.Shader );

        if ( !GraphicContext.getShaderParameter( this.Shader, GraphicContext.COMPILE_STATUS ) )
        {
            LogError( GraphicContext.getShaderInfoLog( this.Shader ) );
        }
    }

    // ~~

    Finalize(
        )
    {
        GraphicContext.deleteShader( this.Shader );
        this.Shader = null;
    }
}

// ~~

class GRAPHIC_PROGRAM_ATTRIBUTE
{
    // -- CONSTRUCTORS

    constructor(
        program,
        attribute_name
        )
    {
        this.Program = program;
        this.Name = attribute_name;
        this.AttributeLocation = GraphicContext.getAttribLocation( program, attribute_name );
    }

    // -- OPERATIONS

    SetReal32ArrayBuffer(
        array_buffer,
        real_count,
        stride_real_count = 0,
        offset_real_count = 0,
        it_is_normalized = false
        )
    {
        GraphicContext.bindBuffer( GraphicContext.ARRAY_BUFFER, array_buffer.Buffer );

        GraphicContext.vertexAttribPointer(
            this.AttributeLocation,
            real_count,
            GraphicContext.FLOAT,
            it_is_normalized,
            stride_real_count * 4,
            offset_real_count * 4
            );

        GraphicContext.enableVertexAttribArray( this.AttributeLocation );
    }

    // ~~

    SetNatural16ElementArrayBuffer(
        element_array_buffer
        )
    {
        GraphicContext.bindBuffer( GraphicContext.ELEMENT_ARRAY_BUFFER, array_buffer.Buffer );
    }
}

// ~~

class GRAPHIC_PROGRAM_UNIFORM
{
    // -- CONSTRUCTORS

    constructor(
        program,
        uniform_name
        )
    {
        this.Program = program;
        this.Name = uniform_name;
        this.UniformLocation = GraphicContext.getUniformLocation( program, uniform_name );
    }

    // -- OPERATIONS

    SetInteger(
        integer
        )
    {
        GraphicContext.uniform1i( this.UniformLocation, integer );
    }

    // ~~

    SetIntegerVector2(
        vector
        )
    {
        GraphicContext.uniform2iv( this.UniformLocation, vector );
    }

    // ~~

    SetIntegerVector3(
        vector
        )
    {
        GraphicContext.uniform3iv( this.UniformLocation, vector );
    }

    // ~~

    SetIntegerVector4(
        vector
        )
    {
        GraphicContext.uniform4iv( this.UniformLocation, vector );
    }

    // ~~

    SetReal(
        real
        )
    {
        GraphicContext.uniform1f( this.UniformLocation, real );
    }

    // ~~

    SetRealVector2(
        vector
        )
    {
        GraphicContext.uniform2fv( this.UniformLocation, vector );
    }

    // ~~

    SetRealVector3(
        vector
        )
    {
        GraphicContext.uniform3fv( this.UniformLocation, vector );
    }

    // ~~

    SetRealVector4(
        vector
        )
    {
        GraphicContext.uniform4fv( this.UniformLocation, vector );
    }

    // ~~

    SetRealMatrix4(
        matrix,
        matrix_is_transposed = false
        )
    {
        GraphicContext.uniformMatrix4fv( this.UniformLocation, matrix_is_transposed, matrix );
    }

    // ~~

    BindTexture(
        texture,
        unit_index
        )
    {
        texture.Bind( unit_index );

        GraphicContext.uniform1i( this.UniformLocation, unit_index );
    }
}

// ~~

class GRAPHIC_PROGRAM
{
    // -- CONSTRUCTORS

    constructor(
        vertex_shader,
        fragment_shader
        )
    {
        this.VertexShader = vertex_shader;
        this.FragmentShader = fragment_shader;
        this.Initialize();
    }

    // -- INQUIRIES

    GetAttribute(
        attribute_name
        )
    {
        return new GRAPHIC_PROGRAM_ATTRIBUTE( this.Program, attribute_name );
    }

    // ~~

    GetUniform(
        uniform_name
        )
    {
        return new GRAPHIC_PROGRAM_UNIFORM( this.Program, uniform_name );
    }

    // -- OPERATIONS

    Initialize(
        )
    {
        this.Program = GraphicContext.createProgram();

        GraphicContext.attachShader( this.Program, this.VertexShader.Shader );
        GraphicContext.attachShader( this.Program, this.FragmentShader.Shader );
        GraphicContext.linkProgram( this.Program );

        if ( !GraphicContext.getProgramParameter( this.Program, GraphicContext.LINK_STATUS ) )
        {
            LogError( GraphicContext.getProgramInfoLog( this.Program ) );
        }
    }

    // ~~

    Finalize(
        )
    {
        GraphicContext.deleteProgram( this.Program );
    }

    // ~~

    Use(
        )
    {
        GraphicContext.useProgram( this.Program );
    }
}

// ~~

class GRAPHIC_CANVAS
{
    // -- CONSTRUCTORS

    constructor(
        canvas_element
        )
    {
        this.Element = canvas_element;

        try
        {
            this.Context = canvas_element.getContext( "webgl", { preserveDrawingBuffer : false } );
        }
        catch ( error )
        {
            this.Context = undefined;
        }

        GraphicContext = this.Context;
    }

    // -- OPERATIONS

    SetContext(
        )
    {
        GraphicContext = this.Context;
    }

    // ~~

    CreateTexture(
        is_repeated = false,
        has_mipmap = true
        )
    {
        return new GRAPHIC_TEXTURE( is_repeated, has_mipmap );
    }

    // ~~

    CreateReal32ArrayBuffer(
        real_array
        )
    {
        return new GRAPHIC_REAL_32_ARRAY_BUFFER( real_array );
    }

    // ~~

    CreateNatural16ElementArrayBuffer(
        natural_array
        )
    {
        return new GRAPHIC_NATURAL_16_ELEMENT_ARRAY_BUFFER( natural_array );
    }

    // ~~

    CreateVertexShader(
        shader_name,
        shader_code
        )
    {
        return new GRAPHIC_SHADER( shader_name, shader_code, GraphicContext.VERTEX_SHADER );
    }

    // ~~

    CreateFragmentShader(
        shader_name,
        shader_code
        )
    {
        return new GRAPHIC_SHADER( shader_name, shader_code, GraphicContext.FRAGMENT_SHADER );
    }

    // ~~

    CreateProgram(
        vertex_shader,
        fragment_shader
        )
    {
        return new GRAPHIC_PROGRAM( vertex_shader, fragment_shader );
    }

    // ~~

    Clear(
        color = [ 0.0, 0.0, 0.0, 1.0 ],
        depth = 1.0
        )
    {
        GraphicContext.clearColor( color[ 0 ], color[ 1 ], color[ 2 ], color[ 3 ] );
        GraphicContext.clearDepth( 1.0 );
        GraphicContext.enable( GraphicContext.DEPTH_TEST );
        GraphicContext.depthFunc( GraphicContext.LEQUAL );

        GraphicContext.clear(
            GraphicContext.COLOR_BUFFER_BIT
            | GraphicContext.DEPTH_BUFFER_BIT
            );
    }

    // ~~

    DrawTriangles(
        first_vertex_index,
        vertex_count
        )
    {
        GraphicContext.drawArrays(
            GraphicContext.TRIANGLES,
            first_vertex_index,
            vertex_count
            );
    }

    // ~~

    DrawIndexedTriangles(
        first_vertex_index,
        vertex_count
        )
    {
        GraphicContext.drawElements(
            GraphicContext.TRIANGLES,
            vertex_count,
            GraphicContext.UNSIGNED_SHORT,
            first_vertex_index
            );
    }
}

// ~~

class GRAPHIC_MATERIAL
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.VertexShader = null;
        this.FragmentShader = null;
        this.Program = null;
    }
}

// ~~

class GRAPHIC_MESH
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.UniformArray = [];
        this.AttributeArray = [];
        this.Material = null;
    }
}

// ~~

class GRAPHIC_NODE
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.ParentNode = null;
        this.ChildNodeArray = [];
        this.MeshArray = [];
        this.LocalScalingVector = [ 0.0, 0.0, 0.0 ];
        this.LocalRotationVector = [ 0.0, 0.0, 0.0 ];
        this.LocalRotationQuaternion = [ 0.0, 0.0, 0.0, 1.0 ];
        this.LocalTranslationVector = [ 0.0, 0.0, 0.0 ];
        this.LocalTransformMatrix = GetMatrix4();
        this.GlobalTransformMatrix = GetMatrix4();
        this.GlobalRotationQuaternion = [ 0.0, 0.0, 0.0, 1.0 ];
        this.GlobalTranslationVector = [ 0.0, 0.0, 0.0 ];
        this.HasLocalRotationVector = false;
        this.HasChanged = false;
    }

    // -- OPERATIONS

    Invalidate(
        )
    {
        if ( !this.HasChanged )
        {
            this.HasChanged = true;

            for ( child_node of this.ChildNodeArray )
            {
                child_node.Invalidate();
            }
        }
    }

    // ~~

    SetParentNode(
        parent_node
        )
    {
        var
            child_node_index;

        if ( this.ParentNode !== parent_node )
        {
            if ( this.ParentNode !== null )
            {
                for ( child_node_index = 0;
                      child_node_index < this.ParentNode.ChildNodeArray.length;
                      ++child_node_index )
                {
                    if ( this.ParentNode.ChildNodeArray[ child_node_index ] === this )
                    {
                        this.ParentNode.ChildNodeArray.splice( child_node_index, 1 );

                        break;
                    }
                }
            }

            this.ParentNode = parent_node;
            this.ChildNodeArray.push( this );
            this.Invalidate();
        }
    }

    // ~~

    SetLocalTranslationVector(
        local_translation_vector
        )
    {
        if ( !IsSameVector3( local_translation_vector, this.LocalTranslationVector ) )
        {
            this.LocalTranslationVector = local_translation_vector;
            this.Invalidate();
        }
    }

    // ~~

    SetLocalRotationVector(
        local_rotation_vector
        )
    {
        if ( !IsSameVector3( local_rotation_vector, this.LocalRotationVector ) )
        {
            this.LocalRotationVector = local_rotation_vector;
            this.LocalRotationQuaternion = GetZxyRotationQuaternion( local_rotation_vector );
            this.HasLocalRotationVector = true;
            this.Invalidate();
        }
    }

    // ~~

    SetLocalRotationQuaternion(
        local_rotation_quaternion
        )
    {
        if ( !IsSameQuaternion( local_rotation_quaternion, this.LocalRotationQuaternion ) )
        {
            this.LocalRotationQuaternion = local_rotation_quaternion;
            this.HasLocalRotationVector = false;
            this.Invalidate();
        }
    }

    // ~~

    SetLocalScalingVector(
        local_scaling_vector
        )
    {
        if ( !IsSameVector3( local_scaling_vector, this.LocalScalingVector ) )
        {
            this.LocalScalingVector = local_scaling_vector;
            this.Invalidate();
        }
    }

    // ~~

    Update(
        )
    {
        if ( this.HasChanged )
        {
            this.LocalTransformMatrix
                = GetTransformMatrix4(
                      this.LocalScalingVector,
                      this.LocalRotationQuaternion,
                      this.LocalTranslationVector
                      );

            if ( this.ParentNode === null )
            {
                this.GlobalTransformMatrix.set( this.LocalTransformMatrix );
                this.GlobalRotationQuaternion.set( this.LocalRotationQuaternion );
                this.GlobalTranslationVector.set( this.LocalTranslationVector );
            }
            else
            {
                this.ParentNode.Update();

                this.GlobalTransformMatrix = GetProductMatrix4( this.LocalTransformMatrix, this.ParentNode.GlobalTransformMatrix );
                this.GlobalRotationQuaternion = GetProductQuaternion( this.LocalRotationQuaternion, this.ParentNode.GlobalRotationQuaternion );
                this.GlobalTranslationVector = GetMatrix4WVector3( this.GlobalTransformMatrix );
            }

            this.HasChanged = false;
        }
    }

    // ~~

    GetLocalRotationVector(
        )
    {
        if ( !HasLocalRotationVector )
        {
            this.LocalRotationVector = GetQuaternionZxyRotationVector( this.LocalRotationQuaternion );
            this.HasLocalRotationVector = true;
        }

        return this.LocalRotationQuaternion;
    }

    // ~~

    GetGlobalScalingVector(
        )
    {
        Update();

        return GetMatrix4ScalingVector3( this.GlobalTransformMatrix );
    }

    // ~~

    GetGlobalRotationQuaternion(
        )
    {
        Update();

        return this.GlobalRotationQuaternion;
    }

    // ~~

    GetGlobalTranslationVector(
        )
    {
        Update();

        return GetMatrix4WVector3( this.GlobalTransformMatrix );
    }
}

// ~~

class GRAPHIC_CAMERA
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.Node = null;
        this.XAngle = 90.0;
        this.YAngle = 90.0;
        this.GlobalTransformMatrix = GetMatrix4();
    }
}

// ~~

class GRAPHIC_SCENE
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.MaterialArray = [];
        this.BufferArray = [];
        this.NodeArray = [];
        this.CameraArray = [];
    }
}

// -- VARIABLES

var
    GraphicContext;
