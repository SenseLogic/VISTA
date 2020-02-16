// -- TYPES

class TEXTURE
{
    // -- CONSTRUCTORS

    constructor(
        context,
        image_url
        )
    {
        this.Context = context;
        this.Level = 0;
        this.InternalFormat = context.RGBA;
        this.Format = context.RGBA;
        this.Type = context.UNSIGNED_BYTE;
        this.Target = context.TEXTURE_2D;
        this.MinificationFilter = context.LINEAR;
        this.MagnificationFilter = context.LINEAR;
        this.HorizontalWrap = context.CLAMP_TO_EDGE;
        this.VerticalWrap = context.CLAMP_TO_EDGE;
        this.Initialize();
        this.Image = LoadImage( image_url, this.SetImage );
    }

    // -- OPERATIONS

    Initialize(
        )
    {
        var
            context;

        context = this.Context;

        this.Texture = context.createTexture();

        context.bindTexture( this.Target, this.Texture );
        context.texParameteri( this.Target, context.TEXTURE_MIN_FILTER, this.MinificationFilter );
        context.texParameteri( this.Target, context.TEXTURE_MAG_FILTER, this.MagnificationFilter );
        context.texParameteri( this.Target, context.TEXTURE_WRAP_S, this.HorizontalWrap );
        context.texParameteri( this.Target, context.TEXTURE_WRAP_T, this.VerticalWrap );
        context.bindTexture( this.Target, null );
    }

    // ~~

    SetImage(
        )
    {
        var
            context;

        context = this.Context;

        context.bindTexture( this.Target, this.Texture );
        context.texImage2D( this.Target, this.Level, this.InternalFormat, this.Format, this.Type, this.Image.Image );
        context.bindTexture( this.Target, null);
    }

    // ~~

    Finalize(
        )
    {
        this.Context.deleteTexture( this.Texture );
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

class SHADER
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
        var
            context;

        context = this.Context;

        this.Shader = context.createShader( this.Type );
        context.shaderSource( this.Shader, this.Code );
        context.compileShader( this.Shader );

        if ( !context.getShaderParameter( this.Shader, context.COMPILE_STATUS ) )
        {
            console.log( context.getShaderInfoLog( this.Shader ) );
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

class PROGRAM_UNIFORM
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
        this.Location = context.getUniformLocation( program.Program, name );
    }
}

// ~~

class PROGRAM_ATTRIBUTE
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
        this.Location = context.getAttribLocation( program.Program, name );
    }
}

// ~~

class PROGRAM
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

    GetUniform(
        uniform_name
        )
    {
        return new PROGRAM_UNIFORM( this.Context, this, uniform_name );
    }

    // ~~

    GetAttribute(
        attribute_name
        )
    {
        return new PROGRAM_ATTRIBUTE( this.Context, this, attribute_name );
    }

    // -- OPERATIONS

    Initialize(
        )
    {
        var
            context;

        context = this.Context;

        this.Program = context.createProgram();

        context.attachShader( this.Program, this.VertexShader );
        context.attachShader( this.Program, this.FragmentShader );
        context.linkProgram( this.Program );

        if ( !context.getProgramParameter( this.Program, context.LINK_STATUS ) )
        {
            console.log( context.getProgramInfoLog( this.Program ) );
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
    }

    // -- OPERATIONS

    CreateTexture(
        image_url
        )
    {
        return new TEXTURE( this.Context, image_url );
    }

    // ~~

    CreateVertexShader(
        shader_name,
        shader_code
        )
    {
        return new SHADER( this.Context, shader_name, shader_code, this.Context.VERTEX_SHADER );
    }

    // ~~

    CreateFragmentShader(
        shader_name,
        shader_code
        )
    {
        return new SHADER( this.Context, shader_name, shader_code, this.Context.FRAGMENT_SHADER );
    }

    // ~~

    CreateProgram(
        vertex_shader,
        fragment_shader
        )
    {
        return new PROGRAM( this.Context, vertex_shader, fragment_shader );
    }
}
