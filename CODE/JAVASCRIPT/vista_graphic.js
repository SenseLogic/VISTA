// -- TYPES

class GRAPHIC_REAL_32_BUFFER
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
        this.Buffer = GraphicContext.createBuffer();

        GraphicContext.bindBuffer( GraphicContext.ARRAY_BUFFER, this.Buffer );
        GraphicContext.bufferData( GraphicContext.ARRAY_BUFFER, this.VertexFloat32Array, GraphicContext.STATIC_DRAW );
    }
}

// ~~

class GRAPHIC_TEXTURE
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
        this.InternalFormat = GraphicContext.RGBA;
        this.Format = GraphicContext.RGBA;
        this.Type = GraphicContext.UNSIGNED_BYTE;
        this.Target = GraphicContext.TEXTURE_2D;
        this.MinificationFilter = GraphicContext.LINEAR;
        this.MagnificationFilter = GraphicContext.LINEAR;
        this.HorizontalWrap = GraphicContext.CLAMP_TO_EDGE;
        this.VerticalWrap = GraphicContext.CLAMP_TO_EDGE;
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
            console.log( GraphicContext.getShaderInfoLog( this.Shader ) );
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

    EnableReal32Array(
        first_real_index,
        real_count,
        real_step
        )
    {
        GraphicContext.vertexAttribPointer(
            this.Attribute,
            real_count,
            GraphicContext.FLOAT,
            false,
            real_step * 4,
            first_real_index * 4
            );

        GraphicContext.enableVertexAttribArray( this.Attribute );
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
            console.log( GraphicContext.getProgramInfoLog( this.Program ) );
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

    CreateReal32Buffer(
        real_array
        )
    {
        return new GRAPHIC_REAL_32_BUFFER( real_array );
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

    ClearColor(
        color
        )
    {
        GraphicContext.clearColor( color[ 0 ], color[ 1 ], color[ 2 ], color[ 3 ] );
        GraphicContext.clear( GraphicContext.COLOR_BUFFER_BIT );
    }

    // ~~

    DrawTriangles(
        first_triangle_index,
        triangle_count
        )
    {
        GraphicContext.drawArrays( GraphicContext.TRIANGLES, first_triangle_index, triangle_count );
    }
}

// -- VARIABLES

var
    GraphicContext;
