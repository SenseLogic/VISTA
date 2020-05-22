// -- VARIABLES

var
    MaterialIdentifier = -1,
    GeometryIdentifier = -1,
    MeshIdentifier = -1,
    ComponentIdentifier = -1,
    NodeIdentifier = -1,
    CameraIdentifier = -1,
    ModelIdentifier = -1,
    SceneIdentifier = -1;

// -- TYPES

class VISTA_MATERIAL
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.Identifier = ++MaterialIdentifier;
        this.Name = "";
        this.AmbientColorAttribute = [ 1.0, 1.0, 1.0 ];
        this.DiffuseColorAttribute = [ 1.0, 1.0, 1.0 ];
        this.SpecularColorAttribute = [ 1.0, 1.0, 1.0 ];
        this.SpecularExponentAttribute = 0.0;
        this.EmissiveColorAttribute = [ 0.0, 0.0, 0.0 ];
        this.DensityAttribute = 1.0;
        this.OpacityAttribute = 1.0;
        this.Program = null;
        this.TextureArray = [];
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
        material
        )
    {
        this.Identifier = ++MeshIdentifier;
        this.Geometry = geometry;
        this.Material = material;
    }
}

// ~~

class VISTA_NODE_COMPONENT
{
    // -- CONSTRUCTORS

    constructor(
        node
        )
    {
        this.Identifier = ++ComponentIdentifier;
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

class VISTA_NODE
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.Identifier = ++NodeIdentifier;
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
        var
            child_node;

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
            this.ChildNodeArray.AddLastValue( this );
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

class VISTA_CAMERA
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.Identifier = CameraIdentifier++;
        this.Name = "";
        this.Node = null;
        this.XAngle = 90.0;
        this.YAngle = 90.0;
        this.GlobalTransformMatrix = GetMatrix4();
    }
}

// ~~

class VISTA_MODEL
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        this.Identifier = ModelIdentifier++;
        this.Name = "";
        this.Node = new VISTA_NODE();
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
        this.ProgramMap = new Map();
        this.CameraMap = new Map();
        this.Node = null;
        this.UpdatedNodeMap = new Map();
    }
}
