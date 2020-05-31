// -- VARIABLES

var
    MaterialIdentifier = -1,
    GeometryIdentifier = -1,
    MeshIdentifier = -1,
    TransformComponentIdentifier = -1,
    TransformIdentifier = -1,
    CameraIdentifier = -1,
    ModelIdentifier = -1,
    SceneIdentifier = -1;

// -- TYPES

class VISTA_MATERIAL extends VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        super();

        this.HasChanged = true;
        this.Identifier = ++MaterialIdentifier;
        this.Name = "";
        this.VertexShader = new VISTA_VERTEX_SHADER();
        this.VertexShaderCode = "";
        this.VertexShaderTemplateFunction = null;
        this.FragmentShader = new VISTA_FRAGMENT_SHADER();
        this.FragmentShaderCode = "";
        this.FragmentShaderTemplateFunction = null;
        this.Program = null;
        this.LightArray = [];
        this.TextureArray = [];
    }

    // -- OPERATIONS

    SetVertexShaderCode(
        vertex_shader_code
        )
    {
        this.VertexShaderCode = "";
        this.VertexShaderTemplateFunction = null;
    }

    // ~~

    SetFragmentShaderCode(
        vertex_shader_code
        )
    {
        this.FragmentShaderCode = "";
        this.FragmentShaderTemplateFunction = null;
    }

    // ~~

    SetVertexShaderTemplate(
        vertex_shader_template_text
        )
    {
        this.VertexShaderCode = "";
        this.VertexShaderTemplateFunction = this.GetTemplateFunction( vertex_shader_template_text );
    }

    // ~~

    SetFragmentShaderTemplate(
        vertex_shader_template_text
        )
    {
        this.FragmentShaderCode = "";
        this.FragmentShaderTemplateFunction = this.GetTemplateFunction( vertex_shader_template_text );
    }

    // ~~

    Update(
        )
    {
        if ( this.HasChanged )
        {
            if ( this.VertexShaderTemplateFunction !== null )
            {
                this.VertexShaderCode = this.VertexShaderTemplateFunction();
                this.VertexShader.SetCode( this.VertexShaderCode );
            }

            if ( this.FragmentShaderTemplateFunction !== null )
            {
                this.FragmentShaderCode = this.FragmentShaderTemplateFunction();
                this.FragmentShader.SetCode( this.FragmentShaderCode );
            }

            this.SetUpdated();
        }
    }
}

// ~~

class VISTA_GEOMETRY
{
    // -- CONSTRUCTORS

    constructor(
        real_array,
        vertex_index_array,
        vertex_count
        )
    {
        this.Identifier = ++GeometryIdentifier;
        this.RealArray = real_array;
        this.VertexIndexArray = vertex_index_array;
        this.VertexCount = vertex_count;
    }
}

// ~~

class VISTA_MESH
{
    // -- CONSTRUCTORS

    constructor(
        geometry,
        material,
        light_array = []
        )
    {
        this.Identifier = ++MeshIdentifier;
        this.Geometry = geometry;
        this.Material = material;
        this.LightArray = light_array;
        this.ActiveLightArray = [];
    }
}

// ~~

class VISTA_TRANSFORM_COMPONENT
{
    // -- CONSTRUCTORS

    constructor(
        transform
        )
    {
        this.Identifier = ++TransformComponentIdentifier;
        this.Transform = transform;
        this.IsActive = true;
    }

    // -- OPERATIONS

    Update(
        time_step
        )
    {
    }

    // ~~

    Render(
        graphic_context
        )
    {
    }
}

// ~~

class VISTA_LIGHT extends VISTA_TRANSFORM_COMPONENT
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.IsDirectional = true;
    }
}

// ~~

class VISTA_CAMERA extends VISTA_TRANSFORM_COMPONENT
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.Identifier = CameraIdentifier++;
        this.Name = "";
        this.Transform = null;
        this.XAngle = 90.0;
        this.YAngle = 90.0;
        this.GlobalTransformMatrix = GetMatrix4();
    }
}

// ~~

class VISTA_TRANSFORM
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.Identifier = ++TransformIdentifier;
        this.ParentTransform = null;
        this.ComponentArray = [];
        this.ChildTransformArray = [];
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
        this.IsActive = true;
    }

    // -- OPERATIONS

    Invalidate(
        )
    {
        var
            child_transform;

        if ( !this.HasChanged )
        {
            this.HasChanged = true;

            for ( child_transform of this.ChildTransformArray )
            {
                child_transform.Invalidate();
            }
        }
    }

    // ~~

    RemoveChildTransform(
        child_transform
        )
    {
        var
            child_transform_index;

        child_transform_index = this.ParentTransform.ChildTransformArray.indexOf( child_transform );

        if ( child_transform_index >= 0 )
        {
            this.ParentTransform.ChildTransformArray.Splice( child_transform_index, 1 );
        }
    }

    // ~~

    SetParentTransform(
        parent_transform
        )
    {
        if ( this.ParentTransform !== parent_transform )
        {
            if ( this.ParentTransform !== null )
            {
                this.ParentTransform.RemoveChildTransform( this );
            }

            this.ParentTransform = parent_transform;

            if ( parent_transform !== null )
            {
                parent_transform.ChildTransformArray.AddLastValue( this );
            }

            this.Invalidate();
        }
    }

    // ~~

    AddChildTransform(
        child_transform
        )
    {
        child_transform.SetParentTransform( this );
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

    UpdateTransform(
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

            if ( this.ParentTransform === null )
            {
                this.GlobalTransformMatrix.set( this.LocalTransformMatrix );
                this.GlobalRotationQuaternion.set( this.LocalRotationQuaternion );
                this.GlobalTranslationVector.set( this.LocalTranslationVector );
            }
            else
            {
                this.ParentTransform.UpdateTransform();

                this.GlobalTransformMatrix = GetProductMatrix4( this.LocalTransformMatrix, this.ParentTransform.GlobalTransformMatrix );
                this.GlobalRotationQuaternion = GetProductQuaternion( this.LocalRotationQuaternion, this.ParentTransform.GlobalRotationQuaternion );
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
        UpdateTransform();

        return GetMatrix4ScalingVector3( this.GlobalTransformMatrix );
    }

    // ~~

    GetGlobalRotationQuaternion(
        )
    {
        UpdateTransform();

        return this.GlobalRotationQuaternion;
    }

    // ~~

    GetGlobalTranslationVector(
        )
    {
        UpdateTransform();

        return GetMatrix4WVector3( this.GlobalTransformMatrix );
    }

    // ~~

    Update(
        time_step
        )
    {
        var
            child_transform,
            component;

        this.UpdateTransform();

        for ( component of this.ComponentArray )
        {
            component.Update( time_step );
        }

        for ( child_transform of this.ChildTransformArray )
        {
            child_transform.Update( time_step );
        }
    }

    // ~~

    Render(
        graphic_context
        )
    {
        var
            child_transform,
            component;

        for ( component of this.ComponentArray )
        {
            component.Render( graphic_context );
        }

        for ( child_transform of this.ChildTransformArray )
        {
            child_transform.Render( graphic_context );
        }
    }
}

// ~~

class VISTA_SCENE
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.Identifier = ++SceneIdentifier;
        this.Name = "";
        this.Transform = new VISTA_TRANSFORM();
    }

    // -- OPERATIONS

    AddChildTransform(
        child_transform
        )
    {
        child_transform.SetParentTransform( this.Transform );
    }

    // ~~

    Update(
        time_step
        )
    {
        this.Transform.Update( time_step );
    }

    // ~~

    Render(
        graphic_context
        )
    {
        this.Transform.Render( graphic_context );
    }
}
