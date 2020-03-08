// -- TYPES

class GRAPHIC_REAL_32_ARRAY_BUFFER
{
    constructor(
        real_array
        )
    {
        this.Float32Array = new Float32Array( real_array );
        this.ElementByteCount = this.Float32Array.BYTES_PER_ELEMENT;
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
        this.ElementByteCount = this.Uint16Array.BYTES_PER_ELEMENT;
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
        is_repeated = false,
        has_mipmap = false
        )
    {
        var
            texture;

        texture = this;

        this.Level = 0;
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
        this.Image = new Image();
        this.Image.crossOrigin = "anonymous";
        this.Image.addEventListener(
            "load",
            function ()
            {
                texture.SetImage();
            }
            );
        this.Image.src = image_url;
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

    Finalize(
        )
    {
        GraphicContext.deleteTexture( this.Texture );
    }

    // ~~

    LoadImage(
        image_file_path
        )
    {
        this.Image = LoadImage( image_file_path, Initialize );
    }

    // ~~

    Bind(
        )
    {
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
        this.Location = GraphicContext.getUniformLocation( program.Program, name );
    }

    // -- OPERATIONS

    SetInteger(
        integer
        )
    {
        GraphicContext.uniform1i( this.Location, integer );
    }

    // ~~

    SetIntegerVector2(
        integer_vector
        )
    {
        GraphicContext.uniform2i( this.Location, integer_vector );
    }

    // ~~

    SetIntegerVector3(
        integer_vector
        )
    {
        GraphicContext.uniform3i( this.Location, integer_vector );
    }

    // ~~

    SetIntegerVector4(
        integer_vector
        )
    {
        GraphicContext.uniform4i( this.Location, integer_vector );
    }

    // ~~

    SetReal(
        real_vector
        )
    {
        GraphicContext.uniform1f( this.Location, real_vector );
    }

    // ~~

    SetRealVector2(
        real_vector
        )
    {
        GraphicContext.uniform2f( this.Location, real_vector );
    }

    // ~~

    SetRealVector3(
        real_vector
        )
    {
        GraphicContext.uniform3f( this.Location, real_vector );
    }

    // ~~

    SetRealVector4(
        real_vector
        )
    {
        GraphicContext.uniform4f( this.Location, real_vector );
    }

    // ~~

    SetRealMatrix4(
        real_matrix
        )
    {
        GraphicContext.uniformMatrix4f( this.Location, false, real_matrix );
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
        this.Attribute = GraphicContext.getAttribLocation( program.Program, attribute_name );
    }

    // -- OPERATIONS

    SetReal32ArrayBuffer(
        array_buffer,
        first_real_index = 0,
        real_count = 0,
        real_step = 0
        )
    {
        GraphicContext.bindBuffer( GraphicContext.ARRAY_BUFFER, array_buffer.Buffer );

        GraphicContext.vertexAttribPointer(
            this.Attribute,
            real_count,
            GraphicContext.FLOAT,
            false,
            real_step * array_buffer.ElementByteCount,
            first_real_index * array_buffer.ElementByteCount
            );

        GraphicContext.enableVertexAttribArray( this.Attribute );
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

    GetUniform(
        uniform_name
        )
    {
        return new GRAPHIC_PROGRAM_UNIFORM( this, uniform_name );
    }

    // ~~

    GetAttribute(
        attribute_name
        )
    {
        return new GRAPHIC_PROGRAM_ATTRIBUTE( this, attribute_name );
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
        image_url
        )
    {
        return new GRAPHIC_TEXTURE( image_url );
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
