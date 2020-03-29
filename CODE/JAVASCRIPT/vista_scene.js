// -- VARIABLES

var
    MaterialIdentifier = 0,
    GeometryIdentifier = 0,
    MeshIdentifier = 0,
    ComponentIdentifier = 0,
    NodeIdentifier = 0,
    SceneIdentifier = 0;

// -- TYPES

class MATERIAL
{
    // -- CONSTRUCTORS

    constructor(
        canvas,
        name,
        position_real_count,
        mapping_real_count,
        normal_real_count,
        vertex_real_count
        )
    {
        this.Canvas = canvas;
        this.Identifier = MaterialIdentifier++;
        this.Name = name;
        this.PositionRealCount = 0;
        this.MappingRealCount = 0;
        this.NormalRealCount = 0;
        this.VertexRealCount = 0;
        this.VertexShaderCode = "";
        this.VertexShader = null;
        this.FragmentShaderCode = "";
        this.FragmentShader = null;
        this.Program = null;
    }
}

// ~~

class GEOMETRY
{
    // -- CONSTRUCTORS

    constructor(
        canvas,
        real_array,
        vertex_index_array,
        vertex_count
        )
    {
        this.Canvas = canvas;
        this.Identifier = GeometryIdentifier++;
        this.RealArray = real_array;
        this.VertexIndexArray = vertex_index_array;
        this.VertexCount = vertex_count;
    }
}

// ~~

class MESH
{
    // -- CONSTRUCTORS

    constructor(
        canvas,
        geometry,
        material
        )
    {
        this.Canvas = canvas;
        this.Identifier = MeshIdentifier++;
        this.Geometry = geometry;
        this.Material = material;
    }
}

// ~~

class COMPONENT
{
    // -- CONSTRUCTORS

    constructor(
        node
        )
    {
        this.Identifier = ComponentIdentifier++;
        this.Node = node;
        this.IsActive = true;
        this.IsUpdated = false;
        this.IsRendered = false;
    }

    // -- OPERATIONS

    Initialize(
        )
    {
    }

    // ~~

    Update(
        time_step
        )
    {
    }

    // ~~

    Render(
        )
    {
    }

    // ~~

    Finalize(
        )
    {
    }
}

// ~~

class NODE
{
    // -- CONSTRUCTORS

    constructor(
        canvas
        )
    {
        this.Canvas = canvas;
        this.Identifier = NodeIdentifier++;
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
        this.IsActive = true;
        this.IsUpdated = true;
        this.IsRendered = true;
        this.ComponentArray = [];
        this.UpdatedComponentMap = new Map();
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

            if ( this.ParentNode === null )
            {
                this.GlobalTransformMatrix.set( this.LocalTransformMatrix );
                this.GlobalRotationQuaternion.set( this.LocalRotationQuaternion );
                this.GlobalTranslationVector.set( this.LocalTranslationVector );
            }
            else
            {
                this.ParentNode.UpdateTransform();

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
}

// ~~

class CAMERA
{
    // -- CONSTRUCTORS

    constructor(
        context
        )
    {
        this.Context = context;
        this.Node = null;
        this.XAngle = 90.0;
        this.YAngle = 90.0;
        this.GlobalTransformMatrix = GetMatrix4();
    }
}

// ~~

class MODEL
{
    // -- CONSTRUCTORS

    constructor(
        canvas
        )
    {
        this.Canvas = canvas;
        this.Node = new NODE( context );
    }
}

// ~~

class SCENE
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.Identifier = SceneIdentifier++;
        this.Canvas = canvas;
        this.MaterialArray = [];
        this.CameraArray = [];
        this.Node = null;
        this.UpdatedNodeMap = new Map();
    }

    // -- OPERATIONS

    MakeMaterial(
        name,
        position_real_count,
        mapping_real_count,
        normal_real_count,
        vertex_real_count
        )
    {
        return new MATERIAL( this, name, position_real_count, mapping_real_count, normal_real_count, vertex_real_count );
    }

    // ~~

    MakeGeometry(
        real_array,
        vertex_index_array,
        vertex_count
        )
    {
        return new GEOMETRY( this, real_array, vertex_index_array, vertex_count );
    }

    // ~~

    MakeMesh(
        material,
        geometry
        )
    {
        return new MESH( this, material, geometry );
    }

    // ~~

    MakeScene(
        )
    {
        return new SCENE( this );
    }
}
