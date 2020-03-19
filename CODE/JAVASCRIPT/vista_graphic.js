// -- TYPES

class GRAPHIC_REAL_32_ARRAY_BUFFER
{
    constructor(
        context,
        real_array
        )
    {
        this.Context = context;
        this.Float32Array = new Float32Array( real_array );
        this.Initialize();
    }

    // ~~

    Initialize(
        )
    {
        this.Buffer = this.Context.createBuffer();

        this.Context.bindBuffer( this.Context.ARRAY_BUFFER, this.Buffer );
        this.Context.bufferData( this.Context.ARRAY_BUFFER, this.Float32Array, this.Context.STATIC_DRAW );
    }
}

// ~~

class GRAPHIC_NATURAL_16_ELEMENT_ARRAY_BUFFER
{
    constructor(
        context,
        natural_array
        )
    {
        this.Context = context;
        this.Uint16Array = new Uint16Array( natural_array );
        this.Initialize();
    }

    // ~~

    Initialize(
        )
    {
        this.Buffer = this.Context.createBuffer();

        this.Context.bindBuffer( this.Context.ELEMENT_ARRAY_BUFFER, this.Buffer );
        this.Context.bufferData( this.Context.ELEMENT_ARRAY_BUFFER, this.Uint16Array, this.Context.STATIC_DRAW );
    }
}

// ~~

class GRAPHIC_TEXTURE
{
    // -- CONSTRUCTORS

    constructor(
        context,
        image_url,
        callback_function = null,
        is_repeated = false,
        has_mipmap = true
        )
    {
        var
            texture;

        texture = this;

        this.Context = context;
        this.InternalFormat = this.Context.RGBA;
        this.Format = this.Context.RGBA;
        this.Type = this.Context.UNSIGNED_BYTE;
        this.Target = this.Context.TEXTURE_2D;
        this.MinificationFilter = this.Context.LINEAR;
        this.MagnificationFilter = this.Context.LINEAR;
        this.HorizontalWrap = is_repeated ? this.Context.REPEAT : this.Context.CLAMP_TO_EDGE;
        this.VerticalWrap = is_repeated ? this.Context.REPEAT : this.Context.CLAMP_TO_EDGE;
        this.HasMipmap = has_mipmap;
        this.Initialize();
    }

    // -- OPERATIONS

    Initialize(
        )
    {
        this.Texture = this.Context.createTexture();

        this.Context.bindTexture( this.Target, this.Texture );
        this.Context.texParameteri( this.Target, this.Context.TEXTURE_MIN_FILTER, this.MinificationFilter );
        this.Context.texParameteri( this.Target, this.Context.TEXTURE_MAG_FILTER, this.MagnificationFilter );
        this.Context.texParameteri( this.Target, this.Context.TEXTURE_WRAP_S, this.HorizontalWrap );
        this.Context.texParameteri( this.Target, this.Context.TEXTURE_WRAP_T, this.VerticalWrap );
        this.Context.bindTexture( this.Target, null );
    }

    // ~~

    SetImage(
        )
    {
        this.Context.bindTexture( this.Target, this.Texture );
        this.Context.texImage2D( this.Target, this.Level, this.InternalFormat, this.Format, this.Type, this.Image );

        if ( this.HasMipmap
             && IsPowerOfTwo( this.Image.width )
             && IsPowerOfTwo( this.Image.height ) )
        {
            this.Context.generateMipmap( this.Target );
        }

        this.Context.bindTexture( this.Target, null);
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
                        event
                        )
                    {
                        texture.SetImage();

                        resolve_function( texture );
                    }
                    );

                texture.Image.addEventListener(
                    "error",
                    function (
                        event
                        )
                    {
                        reject_function( image_file_path );
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
        this.Context.deleteTexture( this.Texture );
    }

    // ~~

    Bind(
        unit_index
        )
    {
        this.Context.activeTexture( this.Context.TEXTURE0 + unit_index );
        this.Context.bindTexture( this.Target, this.Texture );
    }

    // ~~

    Unbind(
        )
    {
        this.Context.bindTexture( this.Target, null );
    }
}

// ~~

class GRAPHIC_SHADER
{
    // -- CONSTRUCTORS

    constructor(
        context,
        name,
        code,
        type
        )
    {
        this.Context = context;
        this.Name = name;
        this.Code = code;
        this.Type = type;
        this.Initialize();
    }

    // -- OPERATIONS

    Initialize(
        )
    {
        this.Shader = this.Context.createShader( this.Type );
        this.Context.shaderSource( this.Shader, this.Code );
        this.Context.compileShader( this.Shader );

        if ( !this.Context.getShaderParameter( this.Shader, this.Context.COMPILE_STATUS ) )
        {
            LogError( this.Context.getShaderInfoLog( this.Shader ) );
        }
    }

    // ~~

    Finalize(
        )
    {
        this.Context.deleteShader( this.Shader );
        this.Shader = null;
    }
}

// ~~

class GRAPHIC_PROGRAM_UNIFORM
{
    // -- CONSTRUCTORS

    constructor(
        context,
        program,
        uniform_name
        )
    {
        this.Context = context;
        this.Program = program;
        this.Name = uniform_name;
        this.UniformLocation = this.Context.getUniformLocation( program, uniform_name );

        if ( this.AttributeLocation === -1 )
        {
            LogError( attribute_name );
        }
    }

    // -- OPERATIONS

    SetInteger(
        integer
        )
    {
        this.Context.uniform1i( this.UniformLocation, integer );
    }

    // ~~

    SetIntegerVector2(
        vector
        )
    {
        this.Context.uniform2iv( this.UniformLocation, vector );
    }

    // ~~

    SetIntegerVector3(
        vector
        )
    {
        this.Context.uniform3iv( this.UniformLocation, vector );
    }

    // ~~

    SetIntegerVector4(
        vector
        )
    {
        this.Context.uniform4iv( this.UniformLocation, vector );
    }

    // ~~

    SetReal(
        real
        )
    {
        this.Context.uniform1f( this.UniformLocation, real );
    }

    // ~~

    SetRealVector2(
        vector
        )
    {
        this.Context.uniform2fv( this.UniformLocation, vector );
    }

    // ~~

    SetRealVector3(
        vector
        )
    {
        this.Context.uniform3fv( this.UniformLocation, vector );
    }

    // ~~

    SetRealVector4(
        vector
        )
    {
        this.Context.uniform4fv( this.UniformLocation, vector );
    }

    // ~~

    SetRealMatrix4(
        matrix,
        matrix_is_transposed = false
        )
    {
        this.Context.uniformMatrix4fv( this.UniformLocation, matrix_is_transposed, matrix );
    }

    // ~~

    BindTexture(
        texture,
        unit_index
        )
    {
        texture.Bind( unit_index );

        this.Context.uniform1i( this.UniformLocation, unit_index );
    }
}

// ~~

class GRAPHIC_PROGRAM_ATTRIBUTE
{
    // -- CONSTRUCTORS

    constructor(
        context,
        program,
        attribute_name
        )
    {
        this.Context = context;
        this.Program = program;
        this.Name = attribute_name;
        this.AttributeLocation = this.Context.getAttribLocation( program, attribute_name );

        if ( this.AttributeLocation === -1 )
        {
            LogError( attribute_name );
        }
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
        this.Context.bindBuffer( this.Context.ARRAY_BUFFER, array_buffer.Buffer );

        this.Context.vertexAttribPointer(
            this.AttributeLocation,
            real_count,
            this.Context.FLOAT,
            it_is_normalized,
            stride_real_count * 4,
            offset_real_count * 4
            );

        this.Context.enableVertexAttribArray( this.AttributeLocation );
    }

    // ~~

    SetNatural16ElementArrayBuffer(
        element_array_buffer
        )
    {
        this.Context.bindBuffer( this.Context.ELEMENT_ARRAY_BUFFER, array_buffer.Buffer );
    }
}

// ~~

class GRAPHIC_PROGRAM
{
    // -- CONSTRUCTORS

    constructor(
        context,
        vertex_shader,
        fragment_shader
        )
    {
        this.Context = context;
        this.VertexShader = vertex_shader;
        this.FragmentShader = fragment_shader;
        this.Initialize();
    }

    // -- INQUIRIES

    GetAttribute(
        attribute_name
        )
    {
        return new GRAPHIC_PROGRAM_ATTRIBUTE( this.Context, this.Program, attribute_name );
    }

    // ~~

    GetUniform(
        uniform_name
        )
    {
        return new GRAPHIC_PROGRAM_UNIFORM( this.Context, this.Program, uniform_name );
    }

    // -- OPERATIONS

    Initialize(
        )
    {
        this.Program = this.Context.createProgram();

        this.Context.attachShader( this.Program, this.VertexShader.Shader );
        this.Context.attachShader( this.Program, this.FragmentShader.Shader );
        this.Context.linkProgram( this.Program );

        if ( !this.Context.getProgramParameter( this.Program, this.Context.LINK_STATUS ) )
        {
            LogError( this.Context.getProgramInfoLog( this.Program ) );
        }
    }

    // ~~

    Finalize(
        )
    {
        this.Context.deleteProgram( this.Program );
    }

    // ~~

    Use(
        )
    {
        this.Context.useProgram( this.Program );
    }
}

// ~~

class GRAPHIC_CANVAS
{
    // -- CONSTRUCTORS

    constructor(
        canvas
        )
    {
        this.Canvas = canvas;

        try
        {
            this.Context = canvas.getContext( "webgl", { preserveDrawingBuffer : false } );
        }
        catch ( error )
        {
            this.Context = undefined;
        }

        this.Context = this.Context;
    }

    // -- INQUIRIES

    GetWidth(
        )
    {
        return this.Canvas.clientWidth;
    }

    // ~~

    GetHeight(
        )
    {
        return this.Canvas.clientHeight;
    }

    // -- OPERATIONS

    SetContext(
        )
    {
        this.Context = this.Context;
    }

    // ~~

    CreateTexture(
        is_repeated = false,
        has_mipmap = true
        )
    {
        return new GRAPHIC_TEXTURE( this.Context, is_repeated, has_mipmap );
    }

    // ~~

    CreateReal32ArrayBuffer(
        real_array
        )
    {
        return new GRAPHIC_REAL_32_ARRAY_BUFFER( this.Context, real_array );
    }

    // ~~

    CreateNatural16ElementArrayBuffer(
        natural_array
        )
    {
        return new GRAPHIC_NATURAL_16_ELEMENT_ARRAY_BUFFER( this.Context, natural_array );
    }

    // ~~

    CreateVertexShader(
        shader_name,
        shader_code
        )
    {
        return new GRAPHIC_SHADER( this.Context, shader_name, shader_code, this.Context.VERTEX_SHADER );
    }

    // ~~

    CreateFragmentShader(
        shader_name,
        shader_code
        )
    {
        return new GRAPHIC_SHADER( this.Context, shader_name, shader_code, this.Context.FRAGMENT_SHADER );
    }

    // ~~

    CreateProgram(
        vertex_shader,
        fragment_shader
        )
    {
        return new GRAPHIC_PROGRAM( this.Context, vertex_shader, fragment_shader );
    }

    // ~~

    Clear(
        color = [ 0.0, 0.0, 0.0, 1.0 ],
        depth = 1.0
        )
    {
        this.Context.clearColor( color[ 0 ], color[ 1 ], color[ 2 ], color[ 3 ] );
        this.Context.clearDepth( 1.0 );
        this.Context.enable( this.Context.DEPTH_TEST );
        this.Context.depthFunc( this.Context.LEQUAL );

        this.Context.clear(
            this.Context.COLOR_BUFFER_BIT
            | this.Context.DEPTH_BUFFER_BIT
            );
    }

    // ~~

    DrawTriangles(
        vertex_count,
        first_vertex_index = 0
        )
    {
        this.Context.drawArrays(
            this.Context.TRIANGLES,
            first_vertex_index,
            vertex_count
            );
    }

    // ~~

    DrawIndexedTriangles(
        vertex_count,
        first_vertex_index = 0
        )
    {
        this.Context.drawElements(
            this.Context.TRIANGLES,
            vertex_count,
            this.Context.UNSIGNED_SHORT,
            first_vertex_index
            );
    }
}

// ~~

class GRAPHIC_MATERIAL
{
    // -- CONSTRUCTORS

    constructor(
        context
        )
    {
        this.Context = context;
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
        context
        )
    {
        this.Context = context;
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
        context
        )
    {
        this.Context = context;
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
