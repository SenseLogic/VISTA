// -- VARIABLES

var
    MaterialIdentifier = -1,
    GeometryIdentifier = -1,
    MeshIdentifier = -1,
    EntityComponentIdentifier = -1,
    EntityIdentifier = -1;

// -- TYPES

class VISTA_MATERIAL extends VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        super();

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
        this.SetChanged();
    }

    // ~~

    SetFragmentShaderCode(
        vertex_shader_code
        )
    {
        this.FragmentShaderCode = "";
        this.FragmentShaderTemplateFunction = null;
        this.SetChanged();
    }

    // ~~

    SetVertexShaderTemplate(
        vertex_shader_template_text
        )
    {
        this.VertexShaderCode = "";
        this.VertexShaderTemplateFunction = this.GetTemplateFunction( vertex_shader_template_text );
        this.SetChanged();
    }

    // ~~

    SetFragmentShaderTemplate(
        vertex_shader_template_text
        )
    {
        this.FragmentShaderCode = "";
        this.FragmentShaderTemplateFunction = this.GetTemplateFunction( vertex_shader_template_text );
        this.SetChanged();
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

class VISTA_ENTITY_COMPONENT extends VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        entity
        )
    {
        super();

        this.Identifier = ++EntityComponentIdentifier;
        this.Entity = entity;
        this.IsActive = true;
    }

    // -- OPERATIONS

    Update(
        time_step
        )
    {
        SetUpdated();
    }

    // ~~

    Render(
        graphic_context
        )
    {
    }
}

// ~~

class VISTA_LIGHT extends VISTA_ENTITY_COMPONENT
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        super();

        this.LocalDirectionVector = new VECTOR_3();
        this.GlobalDirectionVector = new VECTOR_3();
        this.IsDirectional = true;
    }
}

// ~~

class VISTA_CAMERA extends VISTA_ENTITY_COMPONENT
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        super();

        this.Identifier = CameraIdentifier++;
        this.Name = "";
        this.Entity = null;
        this.XAngle = 90.0;
        this.YAngle = 90.0;
        this.GlobalEntityMatrix = GetMatrix4();
    }
}

// ~~

class VISTA_ENTITY extends VISTA_DATA
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        super();

        this.Identifier = ++EntityIdentifier;
        this.ParentEntity = null;
        this.ComponentArray = [];
        this.ChildEntityArray = [];
        this.MeshArray = [];
        this.LocalScalingVector = [ 1.0, 1.0, 1.0 ];
        this.LocalRotationVector = [ 0.0, 0.0, 0.0 ];
        this.LocalRotationQuaternion = [ 0.0, 0.0, 0.0, 1.0 ];
        this.LocalTranslationVector = [ 0.0, 0.0, 0.0 ];
        this.LocalEntityMatrix = GetMatrix4();
        this.GlobalEntityMatrix = GetMatrix4();
        this.GlobalRotationQuaternion = [ 0.0, 0.0, 0.0, 1.0 ];
        this.GlobalTranslationVector = [ 0.0, 0.0, 0.0 ];
        this.HasLocalRotationVector = false;
        this.TransformHasChanged = false;
        this.IsActive = true;
    }

    // -- OPERATIONS

    InvalidateTransform(
        )
    {
        var
            child_entity;

        if ( !this.TransformHasChanged )
        {
            this.TransformHasChanged = true;
            this.SetChanged();

            for ( child_entity of this.ChildEntityArray )
            {
                child_entity.InvalidateTransform();
            }
        }
    }

    // ~~

    RemoveChildEntity(
        child_entity
        )
    {
        var
            child_entity_index;

        child_entity_index = this.ParentEntity.ChildEntityArray.indexOf( child_entity );

        if ( child_entity_index >= 0 )
        {
            this.ParentEntity.ChildEntityArray.Splice( child_entity_index, 1 );
        }
    }

    // ~~

    SetParentEntity(
        parent_entity
        )
    {
        if ( this.ParentEntity !== parent_entity )
        {
            if ( this.ParentEntity !== null )
            {
                this.ParentEntity.RemoveChildEntity( this );
            }

            this.ParentEntity = parent_entity;

            if ( parent_entity !== null )
            {
                parent_entity.ChildEntityArray.AddLastValue( this );
            }

            this.InvalidateTransform();
        }
    }

    // ~~

    AddChildEntity(
        child_entity
        )
    {
        child_entity.SetParentEntity( this );
    }

    // ~~

    AddComponent(
        component
        )
    {
        component.Entity = this;
        ComponentArray.AddLastValue( component );
    }

    // ~~

    SetLocalTranslationVector(
        local_translation_vector
        )
    {
        if ( !IsSameVector3( local_translation_vector, this.LocalTranslationVector ) )
        {
            this.LocalTranslationVector = local_translation_vector;
            this.InvalidateTransform();
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
            this.InvalidateTransform();
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
            this.InvalidateTransform();
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
            this.InvalidateTransform();
        }
    }

    // ~~

    UpdateTransform(
        )
    {
        if ( this.TransformHasChanged )
        {
            this.LocalEntityMatrix
                = GetEntityMatrix4(
                      this.LocalScalingVector,
                      this.LocalRotationQuaternion,
                      this.LocalTranslationVector
                      );

            if ( this.ParentEntity === null )
            {
                this.GlobalEntityMatrix.set( this.LocalEntityMatrix );
                this.GlobalRotationQuaternion.set( this.LocalRotationQuaternion );
                this.GlobalTranslationVector.set( this.LocalTranslationVector );
            }
            else
            {
                this.ParentEntity.UpdateTransform();

                this.GlobalEntityMatrix = GetProductMatrix4( this.LocalEntityMatrix, this.ParentEntity.GlobalEntityMatrix );
                this.GlobalRotationQuaternion = GetProductQuaternion( this.LocalRotationQuaternion, this.ParentEntity.GlobalRotationQuaternion );
                this.GlobalTranslationVector = GetMatrix4WVector3( this.GlobalEntityMatrix );
            }

            this.TransformHasChanged = false;
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

        return GetMatrix4ScalingVector3( this.GlobalEntityMatrix );
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

        return GetMatrix4WVector3( this.GlobalEntityMatrix );
    }

    // ~~

    Update(
        time_step
        )
    {
        var
            child_entity,
            component;

        this.UpdateTransform();

        for ( component of this.ComponentArray )
        {
            component.Update( time_step );
        }

        for ( child_entity of this.ChildEntityArray )
        {
            child_entity.Update( time_step );
        }
    }

    // ~~

    Render(
        graphic_context
        )
    {
        var
            child_entity,
            component;

        for ( component of this.ComponentArray )
        {
            component.Render( graphic_context );
        }

        for ( child_entity of this.ChildEntityArray )
        {
            child_entity.Render( graphic_context );
        }
    }
}
