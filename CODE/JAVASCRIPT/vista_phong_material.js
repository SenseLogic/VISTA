// -- TYPES

class VISTA_PHONG_MATERIAL extends VISTA_MATERIAL
{
    // -- CONSTRUCTORS

    constructor(
        )
    {
        super();
        this.AmbientColor = [ 1.0, 1.0, 1.0 ];
        this.DiffuseColor = [ 1.0, 1.0, 1.0 ];
        this.SpecularColor = [ 1.0, 1.0, 1.0 ];
        this.SpecularExponent = 0.0;
        this.EmissiveColor = [ 0.0, 0.0, 0.0 ];
        this.Density = 1.0;
        this.Opacity = 1.0;

        this.SetVertexShaderCode(
            Text`
            precision mediump float;

            varying vec4 ColorVarying;

            void main()
            {
                gl_FragColor = ColorVarying;
            }
            `
            );

        this.SetFragmentShaderCode(
            Text`
            precision mediump float;

            varying vec3 VertexNormalVectorVarying;
            varying vec3 VertexPositionVectorVarying;
            uniform vec3 AmbientColorUniform;
            uniform vec3 DiffuseColorUniform;
            uniform vec3 SpecularColorUniform;
            uniform vec3 LightPositionUniform;
            uniform float AmbientReflectionUniform;
            uniform float DiffuseReflectionUniform;
            uniform float SpecularReflectionUniform;
            uniform float ShininessUniform;

            void main()
            {
                vec3 normal_vector = normalize( VertexNormalVectorVarying );
                vec3 light_position_vector = normalize( LightPositionUniform - VertexPositionVectorVarying );

                float lambertian_coefficient = max( dot( normal_vector, light_position_vector ), 0.0 );
                float specular_coefficient = 0.0;

                if ( lambertian_coefficient > 0.0 )
                {
                    vec3 reflected_light_vector = reflect( -light_position_vector, normal_vector );
                    vec3 viewer_position_vector = normalize( -VertexPositionVectorVarying );

                    float specular_coefficient_term = max( dot( reflected_light_vector, viewer_position_vector ), 0.0 );
                    specular_coefficient = pow( specular_coefficient_term, ShininessUniform );
                }

                gl_FragColor
                    = vec4(
                          AmbientReflectionUniform * AmbientColorUniform
                          + DiffuseReflectionUniform * lambertian_coefficient * DiffuseColorUniform
                          + SpecularReflectionUniform * specular_coefficient * SpecularColorUniform,
                          1.0
                          );
            }
            `
            );
    }
}
