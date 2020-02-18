// -- TYPES

class REAL_32_BUFFER
{
    constructor(
        vertex_real_array
        )
    {
        this.VertexFloat32Array = new Float32Array( vertex_real_array );
        this.ElementByteCount = this.VertexFloat32Array.BYTES_PER_ELEMENT;

        this.Initialize();
    }

    // ~~

    Initialize(
        )
    {
        this.Buffer = CanvasContext.createBuffer();

        CanvasContext.bindBuffer( CanvasContext.ARRAY_BUFFER, this.Buffer );
        CanvasContext.bufferData( CanvasContext.ARRAY_BUFFER, this.VertexFloat32Array, CanvasContext.STATIC_DRAW );
    }
}

// ~~

class TEXTURE
{
    // -- CONSTRUCTORS

    constructor(
        image_url
        )
    {
        var
            texture;

        texture = this;

        this.Level = 0;
        this.InternalFormat = CanvasContext.RGBA;
        this.Format = CanvasContext.RGBA;
        this.Type = CanvasContext.UNSIGNED_BYTE;
        this.Target = CanvasContext.TEXTURE_2D;
        this.MinificationFilter = CanvasContext.LINEAR;
        this.MagnificationFilter = CanvasContext.LINEAR;
        this.HorizontalWrap = CanvasContext.CLAMP_TO_EDGE;
        this.VerticalWrap = CanvasContext.CLAMP_TO_EDGE;
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
        this.Texture = CanvasContext.createTexture();

        CanvasContext.bindTexture( this.Target, this.Texture );
        CanvasContext.texParameteri( this.Target, CanvasContext.TEXTURE_MIN_FILTER, this.MinificationFilter );
        CanvasContext.texParameteri( this.Target, CanvasContext.TEXTURE_MAG_FILTER, this.MagnificationFilter );
        CanvasContext.texParameteri( this.Target, CanvasContext.TEXTURE_WRAP_S, this.HorizontalWrap );
        CanvasContext.texParameteri( this.Target, CanvasContext.TEXTURE_WRAP_T, this.VerticalWrap );
        CanvasContext.bindTexture( this.Target, null );
    }

    // ~~

    SetImage(
        )
    {
        CanvasContext.bindTexture( this.Target, this.Texture );
        CanvasContext.texImage2D( this.Target, this.Level, this.InternalFormat, this.Format, this.Type, this.Image );
        CanvasContext.bindTexture( this.Target, null);
    }

    // ~~

    Finalize(
        )
    {
        CanvasContext.deleteTexture( this.Texture );
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
        CanvasContext.bindTexture( this.Target, this.Texture );
    }

    // ~~

    Unbind(
        )
    {
        CanvasContext.bindTexture( this.Target, null );
    }
}

// ~~

class SHADER
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
        this.Shader = CanvasContext.createShader( this.Type );
        CanvasContext.shaderSource( this.Shader, this.Code );
        CanvasContext.compileShader( this.Shader );

        if ( !CanvasContext.getShaderParameter( this.Shader, CanvasContext.COMPILE_STATUS ) )
        {
            console.log( CanvasContext.getShaderInfoLog( this.Shader ) );
        }
    }

    // ~~

    Finalize(
        )
    {
        CanvasContext.deleteShader( this.Shader );
        this.Shader = null;
    }
}

// ~~

class PROGRAM_UNIFORM
{
    // -- CONSTRUCTORS

    constructor(
        program,
        uniform_name
        )
    {
        this.Program = program;
        this.Name = uniform_name;
        this.Location = CanvasContext.getUniformLocation( program.Program, name );
    }
}

// ~~

class PROGRAM_ATTRIBUTE
{
    // -- CONSTRUCTORS

    constructor(
        program,
        attribute_name
        )
    {
        this.Program = program;
        this.Name = attribute_name;
        this.Attribute = CanvasContext.getAttribLocation( program.Program, attribute_name );
    }

    // -- OPERATIONS

    EnableReal32Array(
        first_real_index,
        real_count,
        real_step
        )
    {
        CanvasContext.vertexAttribPointer(
            this.Attribute,
            first_real_index,
            CanvasContext.FLOAT,
            false,
            4 * real_step,
            4 * real_count
            );

        CanvasContext.enableVertexAttribArray( this.Attribute );
    }
}

// ~~

class PROGRAM
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
        return new PROGRAM_UNIFORM( this, uniform_name );
    }

    // ~~

    GetAttribute(
        attribute_name
        )
    {
        return new PROGRAM_ATTRIBUTE( this, attribute_name );
    }

    // -- OPERATIONS

    Initialize(
        )
    {
        this.Program = CanvasContext.createProgram();

        CanvasContext.attachShader( this.Program, this.VertexShader.Shader );
        CanvasContext.attachShader( this.Program, this.FragmentShader.Shader );
        CanvasContext.linkProgram( this.Program );

        if ( !CanvasContext.getProgramParameter( this.Program, CanvasContext.LINK_STATUS ) )
        {
            console.log( CanvasContext.getProgramInfoLog( this.Program ) );
        }
    }

    // ~~

    Finalize(
        )
    {
        CanvasContext.deleteProgram( this.Program );
    }

    // ~~

    Use(
        )
    {
        CanvasContext.useProgram( this.Program );
    }
}

// ~~

class CANVAS
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

        CanvasContext = this.Context;
    }

    // -- OPERATIONS

    SetContext(
        )
    {
        CanvasContext = this.Context;
    }

    // ~~

    CreateTexture(
        image_url
        )
    {
        return new TEXTURE( image_url );
    }

    // ~~

    CreateReal32Buffer(
        real_array
        )
    {
        return new REAL_32_BUFFER( real_array );
    }

    // ~~

    CreateVertexShader(
        shader_name,
        shader_code
        )
    {
        return new SHADER( shader_name, shader_code, CanvasContext.VERTEX_SHADER );
    }

    // ~~

    CreateFragmentShader(
        shader_name,
        shader_code
        )
    {
        return new SHADER( shader_name, shader_code, CanvasContext.FRAGMENT_SHADER );
    }

    // ~~

    CreateProgram(
        vertex_shader,
        fragment_shader
        )
    {
        return new PROGRAM( vertex_shader, fragment_shader );
    }

    // ~~

    ClearColor(
        color
        )
    {
        CanvasContext.clearColor( color[ 0 ], color[ 1 ], color[ 2 ], color[ 3 ] );
        CanvasContext.clear( CanvasContext.COLOR_BUFFER_BIT );
    }

    // ~~

    DrawTriangles(
        first_triangle_index,
        triangle_count
        )
    {
        CanvasContext.drawArrays( CanvasContext.TRIANGLES, first_triangle_index, triangle_count );
    }
}

// -- VARIABLES

var
    CanvasContext;
