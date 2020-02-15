// -- TYPES

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

        Initialize();
    }

    // -- OPERATIONS

    Initialize(
        )
    {
        this.Shader = context.createShader( this.Type );
        this.Context.shaderSource( this.Shader, this.Code );
        this.Context.compileShader( this.Shader );

        if ( !this.Context.getShaderParameter( this.Shader, this.Context.COMPILE_STATUS ) )
        {
            console.log( context.getShaderInfoLog( this.Shader ) );
        }
    }

    // ~~

    Finalize(
        )
    {
        this.Canvas.Context.deleteShader( this.Shader );
        this.Shader = null;
    }
}

// ~~

class PROGRAM_UNIFORM
{
    // -- CONSTRUCTORS

    constructor(
        program,
        context,
        uniform_name
        )
    {
        this.Program = program;
        this.Context = context;
        this.Name = uniform_name;
        this.Location = context.getUniformLocation( program.Program, name );
    }
}

// ~~

class PROGRAM_ATTRIBUTE
{
    // -- CONSTRUCTORS

    constructor(
        program,
        context,
        attribute_name
        )
    {
        this.Program = program;
        this.Context = context;
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

        Initialize();
    }

    // -- INQUIRIES

    GetUniform(
        uniform_name
        )
    {
        return new PROGRAM_UNIFORM( this, this.Context, uniform_name );
    }

    // ~~

    GetAttribute(
        attribute_name
        )
    {
        return new PROGRAM_ATTRIBUTE( this, this.Context, attribute_name );
    }

    // -- OPERATIONS

    Initialize(
        )
    {
        this.Program = this.Context.createProgram();

        this.Context.attachShader( this.Program, this.VertexShader );
        this.Context.attachShader( this.Program, this.FragmentShader );
        this.Context.linkProgram( this.Program );

        if ( !this.Context.getProgramParameter( this.Program, context.LINK_STATUS ) )
        {
            console.log( this.Context.getProgramInfoLog( this.Program ) );
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

    CreateVertexShader(
        shader_name,
        shader_code
        )
    {
        return new SHADER( this, shader_name, shader_code, this.Context.VERTEX_SHADER );
    }

    // ~~

    CreateFragmentShader(
        shader_name,
        shader_code
        )
    {
        return new SHADER( this, shader_name, shader_code, this.Context.FRAGMENT_SHADER );
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
