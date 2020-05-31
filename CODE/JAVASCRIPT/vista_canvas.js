// -- CONSTANTS

const
    GL_DepthBufferBit = 0x00000100,
    GL_StencilBufferBit = 0x00000400,
    GL_ColorBufferBit = 0x00004000,
    GL_Points = 0x0000,
    GL_Lines = 0x0001,
    GL_LineLoop = 0x0002,
    GL_LineStrip = 0x0003,
    GL_Triangles = 0x0004,
    GL_TriangleStrip = 0x0005,
    GL_TriangleFan = 0x0006,
    GL_Zero = 0x0,
    GL_One = 0x1,
    GL_SrcColor = 0x0300,
    GL_OneMinusSrcColor = 0x0301,
    GL_SrcAlpha = 0x0302,
    GL_OneMinusSrcAlpha = 0x0303,
    GL_DstAlpha = 0x0304,
    GL_OneMinusDstAlpha = 0x0305,
    GL_DstColor = 0x0306,
    GL_OneMinusDstColor = 0x0307,
    GL_SrcAlphaSaturate = 0x0308,
    GL_ConstantColor = 0x8001,
    GL_OneMinusConstantColor = 0x8002,
    GL_ConstantAlpha = 0x8003,
    GL_OneMinusConstantAlpha = 0x8004,
    GL_FuncAdd = 0x8006,
    GL_FuncSubtract = 0x800A,
    GL_FuncReverseSubtract = 0x800B,
    GL_BlendEquation = 0x8009,
    GL_BlendEquationRgb = 0x8009,
    GL_BlendEquationAlpha = 0x883D,
    GL_BlendDstRgb = 0x80C8,
    GL_BlendSrcRgb = 0x80C9,
    GL_BlendDstAlpha = 0x80CA,
    GL_BlendSrcAlpha = 0x80CB,
    GL_BlendColor = 0x8005,
    GL_ArrayBufferBinding = 0x8894,
    GL_ElementArrayBufferBinding = 0x8895,
    GL_LineWidth = 0x0B21,
    GL_AliasedPointSizeRange = 0x846D,
    GL_AliasedLineWidthRange = 0x846E,
    GL_CullFaceMode = 0x0B45,
    GL_FrontFace = 0x0B46,
    GL_DepthRange = 0x0B70,
    GL_DepthWritemask = 0x0B72,
    GL_DepthClearValue = 0x0B73,
    GL_DepthFunc = 0x0B74,
    GL_StencilClearValue = 0x0B91,
    GL_StencilFunc = 0x0B92,
    GL_StencilFail = 0x0B94,
    GL_StencilPassDepthFail = 0x0B95,
    GL_StencilPassDepthPass = 0x0B96,
    GL_StencilRef = 0x0B97,
    GL_StencilValueMask = 0x0B93,
    GL_StencilWritemask = 0x0B98,
    GL_StencilBackFunc = 0x8800,
    GL_StencilBackFail = 0x8801,
    GL_StencilBackPassDepthFail = 0x8802,
    GL_StencilBackPassDepthPass = 0x8803,
    GL_StencilBackRef = 0x8CA3,
    GL_StencilBackValueMask = 0x8CA4,
    GL_StencilBackWritemask = 0x8CA5,
    GL_Viewport = 0x0BA2,
    GL_ScissorBox = 0x0C10,
    GL_ColorClearValue = 0x0C22,
    GL_ColorWritemask = 0x0C23,
    GL_UnpackAlignment = 0x0CF5,
    GL_PackAlignment = 0x0D05,
    GL_MaxTextureSize = 0x0D33,
    GL_MaxViewportDims = 0x0D3A,
    GL_SubpixelBits = 0x0D50,
    GL_RedBits = 0x0D52,
    GL_GreenBits = 0x0D53,
    GL_BlueBits = 0x0D54,
    GL_AlphaBits = 0x0D55,
    GL_DepthBits = 0x0D56,
    GL_StencilBits = 0x0D57,
    GL_PolygonOffsetUnits = 0x2A00,
    GL_PolygonOffsetFactor = 0x8038,
    GL_TextureBinding2D = 0x8069,
    GL_SampleBuffers = 0x80A8,
    GL_Samples = 0x80A9,
    GL_SampleCoverageValue = 0x80AA,
    GL_SampleCoverageInvert = 0x80AB,
    GL_CompressedTextureFormats = 0x86A3,
    GL_Vendor = 0x1F00,
    GL_Renderer = 0x1F01,
    GL_Version = 0x1F02,
    GL_ImplementationColorReadType = 0x8B9A,
    GL_ImplementationColorReadFormat = 0x8B9B,
    GL_BrowserDefaultWebgl = 0x9244,
    GL_StaticDraw = 0x88E4,
    GL_StreamDraw = 0x88E0,
    GL_DynamicDraw = 0x88E8,
    GL_ArrayBuffer = 0x8892,
    GL_ElementArrayBuffer = 0x8893,
    GL_BufferSize = 0x8764,
    GL_BufferUsage = 0x8765,
    GL_CurrentVertexAttrib = 0x8626,
    GL_VertexAttribArrayEnabled = 0x8622,
    GL_VertexAttribArraySize = 0x8623,
    GL_VertexAttribArrayStride = 0x8624,
    GL_VertexAttribArrayType = 0x8625,
    GL_VertexAttribArrayNormalized = 0x886A,
    GL_VertexAttribArrayPointer = 0x8645,
    GL_VertexAttribArrayBufferBinding = 0x889F,
    GL_CullFace = 0x0B44,
    GL_Front = 0x0404,
    GL_Back = 0x0405,
    GL_FrontAndBack = 0x0408,
    GL_Blend = 0x0BE2,
    GL_DepthTest = 0x0B71,
    GL_Dither = 0x0BD0,
    GL_PolygonOffsetFill = 0x8037,
    GL_SampleAlphaToCoverage = 0x809E,
    GL_SampleCoverage = 0x80A0,
    GL_ScissorTest = 0x0C11,
    GL_StencilTest = 0x0B90,
    GL_NoError = 0,
    GL_InvalidEnum = 0x0500,
    GL_InvalidValue = 0x0501,
    GL_InvalidOperation = 0x0502,
    GL_OutOfMemory = 0x0505,
    GL_ContextLostWebgl = 0x9242,
    GL_Cw = 0x0900,
    GL_Ccw = 0x0901,
    GL_DontCare = 0x1100,
    GL_Fastest = 0x1101,
    GL_Nicest = 0x1102,
    GL_GenerateMipmapHint = 0x8192,
    GL_Byte = 0x1400,
    GL_UnsignedByte = 0x1401,
    GL_Short = 0x1402,
    GL_UnsignedShort = 0x1403,
    GL_Int = 0x1404,
    GL_UnsignedInt = 0x1405,
    GL_Float = 0x1406,
    GL_DepthComponent = 0x1902,
    GL_Alpha = 0x1906,
    GL_Rgb = 0x1907,
    GL_Rgba = 0x1908,
    GL_Luminance = 0x1909,
    GL_LuminanceAlpha = 0x190A,
    GL_UnsignedShort4444 = 0x8033,
    GL_UnsignedShort5551 = 0x8034,
    GL_UnsignedShort565 = 0x8363,
    GL_FragmentShader = 0x8B30,
    GL_VertexShader = 0x8B31,
    GL_CompileStatus = 0x8B81,
    GL_DeleteStatus = 0x8B80,
    GL_LinkStatus = 0x8B82,
    GL_ValidateStatus = 0x8B83,
    GL_AttachedShaders = 0x8B85,
    GL_ActiveAttributes = 0x8B89,
    GL_ActiveUniforms = 0x8B86,
    GL_MaxVertexAttribs = 0x8869,
    GL_MaxVertexUniformVectors = 0x8DFB,
    GL_MaxVaryingVectors = 0x8DFC,
    GL_MaxCombinedTextureImageUnits = 0x8B4D,
    GL_MaxVertexTextureImageUnits = 0x8B4C,
    GL_MaxTextureImageUnits = 0x8872,
    GL_MaxFragmentUniformVectors = 0x8DFD,
    GL_ShaderType = 0x8B4F,
    GL_ShadingLanguageVersion = 0x8B8C,
    GL_CurrentProgram = 0x8B8D,
    GL_Never = 0x0200,
    GL_Less = 0x0201,
    GL_Equal = 0x0202,
    GL_Lequal = 0x0203,
    GL_Greater = 0x0204,
    GL_Notequal = 0x0205,
    GL_Gequal = 0x0206,
    GL_Always = 0x0207,
    GL_Keep = 0x1E00,
    GL_Replace = 0x1E01,
    GL_Incr = 0x1E02,
    GL_Decr = 0x1E03,
    GL_Invert = 0x150A,
    GL_IncrWrap = 0x8507,
    GL_DecrWrap = 0x8508,
    GL_Nearest = 0x2600,
    GL_Linear = 0x2601,
    GL_NearestMipmapNearest = 0x2700,
    GL_LinearMipmapNearest = 0x2701,
    GL_NearestMipmapLinear = 0x2702,
    GL_LinearMipmapLinear = 0x2703,
    GL_TextureMagFilter = 0x2800,
    GL_TextureMinFilter = 0x2801,
    GL_TextureWrapS = 0x2802,
    GL_TextureWrapT = 0x2803,
    GL_Texture2D = 0x0DE1,
    GL_Texture = 0x1702,
    GL_TextureCubeMap = 0x8513,
    GL_TextureBindingCubeMap = 0x8514,
    GL_TextureCubeMapPositiveX = 0x8515,
    GL_TextureCubeMapNegativeX = 0x8516,
    GL_TextureCubeMapPositiveY = 0x8517,
    GL_TextureCubeMapNegativeY = 0x8518,
    GL_TextureCubeMapPositiveZ = 0x8519,
    GL_TextureCubeMapNegativeZ = 0x851A,
    GL_MaxCubeMapTextureSize = 0x851C,
    GL_Texture0 = 0x84C0,
    GL_Texture1 = 0x84C1,
    GL_Texture2 = 0x84C2,
    GL_Texture3 = 0x84C3,
    GL_Texture4 = 0x84C4,
    GL_Texture5 = 0x84C5,
    GL_Texture6 = 0x84C6,
    GL_Texture7 = 0x84C7,
    GL_Texture8 = 0x84C8,
    GL_Texture9 = 0x84C9,
    GL_Texture10 = 0x84CA,
    GL_Texture11 = 0x84CB,
    GL_Texture12 = 0x84CC,
    GL_Texture13 = 0x84CD,
    GL_Texture14 = 0x84CE,
    GL_Texture15 = 0x84CF,
    GL_Texture16 = 0x84D0,
    GL_Texture17 = 0x84D1,
    GL_Texture18 = 0x84D2,
    GL_Texture19 = 0x84D3,
    GL_Texture20 = 0x84D4,
    GL_Texture21 = 0x84D5,
    GL_Texture22 = 0x84D6,
    GL_Texture23 = 0x84D7,
    GL_Texture24 = 0x84D8,
    GL_Texture25 = 0x84D9,
    GL_Texture26 = 0x84DA,
    GL_Texture27 = 0x84DB,
    GL_Texture28 = 0x84DC,
    GL_Texture29 = 0x84DD,
    GL_Texture30 = 0x84DE,
    GL_Texture31 = 0x84DF,
    GL_ActiveTexture = 0x84E0,
    GL_Repeat = 0x2901,
    GL_ClampToEdge = 0x812F,
    GL_MirroredRepeat = 0x8370,
    GL_FloatVec2 = 0x8B50,
    GL_FloatVec3 = 0x8B51,
    GL_FloatVec4 = 0x8B52,
    GL_IntVec2 = 0x8B53,
    GL_IntVec3 = 0x8B54,
    GL_IntVec4 = 0x8B55,
    GL_Bool = 0x8B56,
    GL_BoolVec2 = 0x8B57,
    GL_BoolVec3 = 0x8B58,
    GL_BoolVec4 = 0x8B59,
    GL_FloatMat2 = 0x8B5A,
    GL_FloatMat3 = 0x8B5B,
    GL_FloatMat4 = 0x8B5C,
    GL_Sampler2D = 0x8B5E,
    GL_SamplerCube = 0x8B60,
    GL_LowFloat = 0x8DF0,
    GL_MediumFloat = 0x8DF1,
    GL_HighFloat = 0x8DF2,
    GL_LowInt = 0x8DF3,
    GL_MediumInt = 0x8DF4,
    GL_HighInt = 0x8DF5,
    GL_Framebuffer = 0x8D40,
    GL_Renderbuffer = 0x8D41,
    GL_Rgba4 = 0x8056,
    GL_Rgb5A1 = 0x8057,
    GL_Rgb565 = 0x8D62,
    GL_DepthComponent16 = 0x81A5,
    GL_StencilIndex8 = 0x8D48,
    GL_DepthStencil = 0x84F9,
    GL_RenderbufferWidth = 0x8D42,
    GL_RenderbufferHeight = 0x8D43,
    GL_RenderbufferInternalFormat = 0x8D44,
    GL_RenderbufferRedSize = 0x8D50,
    GL_RenderbufferGreenSize = 0x8D51,
    GL_RenderbufferBlueSize = 0x8D52,
    GL_RenderbufferAlphaSize = 0x8D53,
    GL_RenderbufferDepthSize = 0x8D54,
    GL_RenderbufferStencilSize = 0x8D55,
    GL_FramebufferAttachmentObjectType = 0x8CD0,
    GL_FramebufferAttachmentObjectName = 0x8CD1,
    GL_FramebufferAttachmentTextureLevel = 0x8CD2,
    GL_FramebufferAttachmentTextureCubeMapFace = 0x8CD3,
    GL_ColorAttachment0 = 0x8CE0,
    GL_DepthAttachment = 0x8D00,
    GL_StencilAttachment = 0x8D20,
    GL_DepthStencilAttachment = 0x821A,
    GL_None = 0x0,
    GL_FramebufferComplete = 0x8CD5,
    GL_FramebufferIncompleteAttachment = 0x8CD6,
    GL_FramebufferIncompleteMissingAttachment = 0x8CD7,
    GL_FramebufferIncompleteDimensions = 0x8CD9,
    GL_FramebufferUnsupported = 0x8CDD,
    GL_FramebufferBinding = 0x8CA6,
    GL_RenderbufferBinding = 0x8CA7,
    GL_MaxRenderbufferSize = 0x84E8,
    GL_InvalidFramebufferOperation = 0x0506,
    GL_UnpackFlipYWebgl = 0x9240,
    GL_UnpackPremultiplyAlphaWebgl = 0x9241,
    GL_UnpackColorspaceConversionWebgl = 0x9243,
    GL_ReadBuffer = 0x0C02,
    GL_UnpackRowLength = 0x0CF2,
    GL_UnpackSkipRows = 0x0CF3,
    GL_UnpackSkipPixels = 0x0CF4,
    GL_PackRowLength = 0x0D02,
    GL_PackSkipRows = 0x0D03,
    GL_PackSkipPixels = 0x0D04,
    GL_TextureBinding3D = 0x806A,
    GL_UnpackSkipImages = 0x806D,
    GL_UnpackImageHeight = 0x806E,
    GL_Max3DTextureSize = 0x8073,
    GL_MaxElementsVertices = 0x80E8,
    GL_MaxElementsIndices = 0x80E9,
    GL_MaxTextureLodBias = 0x84FD,
    GL_MaxFragmentUniformComponents = 0x8B49,
    GL_MaxVertexUniformComponents = 0x8B4A,
    GL_MaxArrayTextureLayers = 0x88FF,
    GL_MinProgramTexelOffset = 0x8904,
    GL_MaxProgramTexelOffset = 0x8905,
    GL_MaxVaryingComponents = 0x8B4B,
    GL_FragmentShaderDerivativeHint = 0x8B8B,
    GL_RasterizerDiscard = 0x8C89,
    GL_VertexArrayBinding = 0x85B5,
    GL_MaxVertexOutputComponents = 0x9122,
    GL_MaxFragmentInputComponents = 0x9125,
    GL_MaxServerWaitTimeout = 0x9111,
    GL_MaxElementIndex = 0x8D6B,
    GL_Red = 0x1903,
    GL_Rgb8 = 0x8051,
    GL_Rgba8 = 0x8058,
    GL_Rgb10A2 = 0x8059,
    GL_Texture3D = 0x806F,
    GL_TextureWrapR = 0x8072,
    GL_TextureMinLod = 0x813A,
    GL_TextureMaxLod = 0x813B,
    GL_TextureBaseLevel = 0x813C,
    GL_TextureMaxLevel = 0x813D,
    GL_TextureCompareMode = 0x884C,
    GL_TextureCompareFunc = 0x884D,
    GL_Srgb = 0x8C40,
    GL_Srgb8 = 0x8C41,
    GL_Srgb8Alpha8 = 0x8C43,
    GL_CompareRefToTexture = 0x884E,
    GL_Rgba32F = 0x8814,
    GL_Rgb32F = 0x8815,
    GL_Rgba16F = 0x881A,
    GL_Rgb16F = 0x881B,
    GL_Texture2DArray = 0x8C1A,
    GL_TextureBinding2DArray = 0x8C1D,
    GL_R11FG11FB10F = 0x8C3A,
    GL_Rgb9E5 = 0x8C3D,
    GL_Rgba32Ui = 0x8D70,
    GL_Rgb32Ui = 0x8D71,
    GL_Rgba16Ui = 0x8D76,
    GL_Rgb16Ui = 0x8D77,
    GL_Rgba8Ui = 0x8D7C,
    GL_Rgb8Ui = 0x8D7D,
    GL_Rgba32I = 0x8D82,
    GL_Rgb32I = 0x8D83,
    GL_Rgba16I = 0x8D88,
    GL_Rgb16I = 0x8D89,
    GL_Rgba8I = 0x8D8E,
    GL_Rgb8I = 0x8D8F,
    GL_RedInteger = 0x8D94,
    GL_RgbInteger = 0x8D98,
    GL_RgbaInteger = 0x8D99,
    GL_R8 = 0x8229,
    GL_Rg8 = 0x822B,
    GL_R16F = 0x822D,
    GL_R32F = 0x822E,
    GL_Rg16F = 0x822F,
    GL_Rg32F = 0x8230,
    GL_R8I = 0x8231,
    GL_R8Ui = 0x8232,
    GL_R16I = 0x8233,
    GL_R16Ui = 0x8234,
    GL_R32I = 0x8235,
    GL_R32Ui = 0x8236,
    GL_Rg8I = 0x8237,
    GL_Rg8Ui = 0x8238,
    GL_Rg16I = 0x8239,
    GL_Rg16Ui = 0x823A,
    GL_Rg32I = 0x823B,
    GL_Rg32Ui = 0x823C,
    GL_R8Snorm = 0x8F94,
    GL_Rg8Snorm = 0x8F95,
    GL_Rgb8Snorm = 0x8F96,
    GL_Rgba8Snorm = 0x8F97,
    GL_Rgb10A2Ui = 0x906F,
    GL_TextureImmutableFormat = 0x912F,
    GL_TextureImmutableLevels = 0x82DF,
    GL_UnsignedInt2101010Rev = 0x8368,
    GL_UnsignedInt10F11F11FRev = 0x8C3B,
    GL_UnsignedInt5999Rev = 0x8C3E,
    GL_Float32UnsignedInt248Rev = 0x8DAD,
    GL_UnsignedInt248 = 0x84FA,
    GL_HalfFloat = 0x140B,
    GL_Rg = 0x8227,
    GL_RgInteger = 0x8228,
    GL_Int2101010Rev = 0x8D9F,
    GL_CurrentQuery = 0x8865,
    GL_QueryResult = 0x8866,
    GL_QueryResultAvailable = 0x8867,
    GL_AnySamplesPassed = 0x8C2F,
    GL_AnySamplesPassedConservative = 0x8D6A,
    GL_MaxDrawBuffers = 0x8824,
    GL_DrawBuffer0 = 0x8825,
    GL_DrawBuffer1 = 0x8826,
    GL_DrawBuffer2 = 0x8827,
    GL_DrawBuffer3 = 0x8828,
    GL_DrawBuffer4 = 0x8829,
    GL_DrawBuffer5 = 0x882A,
    GL_DrawBuffer6 = 0x882B,
    GL_DrawBuffer7 = 0x882C,
    GL_DrawBuffer8 = 0x882D,
    GL_DrawBuffer9 = 0x882E,
    GL_DrawBuffer10 = 0x882F,
    GL_DrawBuffer11 = 0x8830,
    GL_DrawBuffer12 = 0x8831,
    GL_DrawBuffer13 = 0x8832,
    GL_DrawBuffer14 = 0x8833,
    GL_DrawBuffer15 = 0x8834,
    GL_MaxColorAttachments = 0x8CDF,
    GL_ColorAttachment1 = 0x8CE1,
    GL_ColorAttachment2 = 0x8CE2,
    GL_ColorAttachment3 = 0x8CE3,
    GL_ColorAttachment4 = 0x8CE4,
    GL_ColorAttachment5 = 0x8CE5,
    GL_ColorAttachment6 = 0x8CE6,
    GL_ColorAttachment7 = 0x8CE7,
    GL_ColorAttachment8 = 0x8CE8,
    GL_ColorAttachment9 = 0x8CE9,
    GL_ColorAttachment10 = 0x8CEA,
    GL_ColorAttachment11 = 0x8CEB,
    GL_ColorAttachment12 = 0x8CEC,
    GL_ColorAttachment13 = 0x8CED,
    GL_ColorAttachment14 = 0x8CEE,
    GL_ColorAttachment15 = 0x8CEF,
    GL_Sampler3D = 0x8B5F,
    GL_Sampler2DShadow = 0x8B62,
    GL_Sampler2DArray = 0x8DC1,
    GL_Sampler2DArrayShadow = 0x8DC4,
    GL_SamplerCubeShadow = 0x8DC5,
    GL_IntSampler2D = 0x8DCA,
    GL_IntSampler3D = 0x8DCB,
    GL_IntSamplerCube = 0x8DCC,
    GL_IntSampler2DArray = 0x8DCF,
    GL_UnsignedIntSampler2D = 0x8DD2,
    GL_UnsignedIntSampler3D = 0x8DD3,
    GL_UnsignedIntSamplerCube = 0x8DD4,
    GL_UnsignedIntSampler2DArray = 0x8DD7,
    GL_MaxSamples = 0x8D57,
    GL_SamplerBinding = 0x8919,
    GL_PixelPackBuffer = 0x88EB,
    GL_PixelUnpackBuffer = 0x88EC,
    GL_PixelPackBufferBinding = 0x88ED,
    GL_PixelUnpackBufferBinding = 0x88EF,
    GL_CopyReadBuffer = 0x8F36,
    GL_CopyWriteBuffer = 0x8F37,
    GL_CopyReadBufferBinding = 0x8F36,
    GL_CopyWriteBufferBinding = 0x8F37,
    GL_FloatMat2x3 = 0x8B65,
    GL_FloatMat2x4 = 0x8B66,
    GL_FloatMat3x2 = 0x8B67,
    GL_FloatMat3x4 = 0x8B68,
    GL_FloatMat4x2 = 0x8B69,
    GL_FloatMat4x3 = 0x8B6A,
    GL_UnsignedIntVec2 = 0x8DC6,
    GL_UnsignedIntVec3 = 0x8DC7,
    GL_UnsignedIntVec4 = 0x8DC8,
    GL_UnsignedNormalized = 0x8C17,
    GL_SignedNormalized = 0x8F9C,
    GL_VertexAttribArrayInteger = 0x88FD,
    GL_VertexAttribArrayDivisor = 0x88FE,
    GL_TransformFeedbackBufferMode = 0x8C7F,
    GL_MaxTransformFeedbackSeparateComponents = 0x8C80,
    GL_TransformFeedbackVaryings = 0x8C83,
    GL_TransformFeedbackBufferStart = 0x8C84,
    GL_TransformFeedbackBufferSize = 0x8C85,
    GL_TransformFeedbackPrimitivesWritten = 0x8C88,
    GL_MaxTransformFeedbackInterleavedComponents = 0x8C8A,
    GL_MaxTransformFeedbackSeparateAttribs = 0x8C8B,
    GL_InterleavedAttribs = 0x8C8C,
    GL_SeparateAttribs = 0x8C8D,
    GL_TransformFeedbackBuffer = 0x8C8E,
    GL_TransformFeedbackBufferBinding = 0x8C8F,
    GL_TransformFeedback = 0x8E22,
    GL_TransformFeedbackPaused = 0x8E23,
    GL_TransformFeedbackActive = 0x8E24,
    GL_TransformFeedbackBinding = 0x8E25,
    GL_FramebufferAttachmentColorEncoding = 0x8210,
    GL_FramebufferAttachmentComponentType = 0x8211,
    GL_FramebufferAttachmentRedSize = 0x8212,
    GL_FramebufferAttachmentGreenSize = 0x8213,
    GL_FramebufferAttachmentBlueSize = 0x8214,
    GL_FramebufferAttachmentAlphaSize = 0x8215,
    GL_FramebufferAttachmentDepthSize = 0x8216,
    GL_FramebufferAttachmentStencilSize = 0x8217,
    GL_FramebufferDefault = 0x8218,
    GL_Depth24Stencil8 = 0x88F0,
    GL_DrawFramebufferBinding = 0x8CA6,
    GL_ReadFramebuffer = 0x8CA8,
    GL_DrawFramebuffer = 0x8CA9,
    GL_ReadFramebufferBinding = 0x8CAA,
    GL_RenderbufferSamples = 0x8CAB,
    GL_FramebufferAttachmentTextureLayer = 0x8CD4,
    GL_FramebufferIncompleteMultisample = 0x8D56,
    GL_UniformBuffer = 0x8A11,
    GL_UniformBufferBinding = 0x8A28,
    GL_UniformBufferStart = 0x8A29,
    GL_UniformBufferSize = 0x8A2A,
    GL_MaxVertexUniformBlocks = 0x8A2B,
    GL_MaxFragmentUniformBlocks = 0x8A2D,
    GL_MaxCombinedUniformBlocks = 0x8A2E,
    GL_MaxUniformBufferBindings = 0x8A2F,
    GL_MaxUniformBlockSize = 0x8A30,
    GL_MaxCombinedVertexUniformComponents = 0x8A31,
    GL_MaxCombinedFragmentUniformComponents = 0x8A33,
    GL_UniformBufferOffsetAlignment = 0x8A34,
    GL_ActiveUniformBlocks = 0x8A36,
    GL_UniformType = 0x8A37,
    GL_UniformSize = 0x8A38,
    GL_UniformBlockIndex = 0x8A3A,
    GL_UniformOffset = 0x8A3B,
    GL_UniformArrayStride = 0x8A3C,
    GL_UniformMatrixStride = 0x8A3D,
    GL_UniformIsRowMajor = 0x8A3E,
    GL_UniformBlockBinding = 0x8A3F,
    GL_UniformBlockDataSize = 0x8A40,
    GL_UniformBlockActiveUniforms = 0x8A42,
    GL_UniformBlockActiveUniformIndices = 0x8A43,
    GL_UniformBlockReferencedByVertexShader = 0x8A44,
    GL_UniformBlockReferencedByFragmentShader = 0x8A46,
    GL_ObjectType = 0x9112,
    GL_SyncCondition = 0x9113,
    GL_SyncStatus = 0x9114,
    GL_SyncFlags = 0x9115,
    GL_SyncFence = 0x9116,
    GL_SyncGpuCommandsComplete = 0x9117,
    GL_Unsignaled = 0x9118,
    GL_Signaled = 0x9119,
    GL_AlreadySignaled = 0x911A,
    GL_TimeoutExpired = 0x911B,
    GL_ConditionSatisfied = 0x911C,
    GL_WaitFailed = 0x911D,
    GL_SyncFlushCommandsBit = 0x00000001,
    GL_Color = 0x1800,
    GL_Depth = 0x1801,
    GL_Stencil = 0x1802,
    GL_Min = 0x8007,
    GL_Max = 0x8008,
    GL_DepthComponent24 = 0x81A6,
    GL_StreamRead = 0x88E1,
    GL_StreamCopy = 0x88E2,
    GL_StaticRead = 0x88E5,
    GL_StaticCopy = 0x88E6,
    GL_DynamicRead = 0x88E9,
    GL_DynamicCopy = 0x88EA,
    GL_DepthComponent32F = 0x8CAC,
    GL_Depth32FStencil8 = 0x8CAD,
    GL_InvalidIndex = 0xFFFFFFFF,
    GL_TimeoutIgnored = -1,
    GL_MaxClientWaitTimeoutWebgl = 0x9247,
    GL_VertexAttribArrayDivisorAngle = 0x88FE,
    GL_UnmaskedVendorWebgl = 0x9245,
    GL_UnmaskedRendererWebgl = 0x9246,
    GL_MaxTextureMaxAnisotropyExt = 0x84FF,
    GL_TextureMaxAnisotropyExt = 0x84FE,
    GL_CompressedRgbS3TcDxt1Ext = 0x83F0,
    GL_CompressedRgbaS3TcDxt1Ext = 0x83F1,
    GL_CompressedRgbaS3TcDxt3Ext = 0x83F2,
    GL_CompressedRgbaS3TcDxt5Ext = 0x83F3,
    GL_CompressedR11Eac = 0x9270,
    GL_CompressedSignedR11Eac = 0x9271,
    GL_CompressedRg11Eac = 0x9272,
    GL_CompressedSignedRg11Eac = 0x9273,
    GL_CompressedRgb8Etc2 = 0x9274,
    GL_CompressedRgba8Etc2Eac = 0x9275,
    GL_CompressedSrgb8Etc2 = 0x9276,
    GL_CompressedSrgb8Alpha8Etc2Eac = 0x9277,
    GL_CompressedRgb8PunchthroughAlpha1Etc2 = 0x9278,
    GL_CompressedSrgb8PunchthroughAlpha1Etc2 = 0x9279,
    GL_CompressedRgbPvrtc4Bppv1Img = 0x8C00,
    GL_CompressedRgbaPvrtc4Bppv1Img = 0x8C02,
    GL_CompressedRgbPvrtc2Bppv1Img = 0x8C01,
    GL_CompressedRgbaPvrtc2Bppv1Img = 0x8C03,
    GL_CompressedRgbEtc1Webgl = 0x8D64,
    GL_CompressedRgbAtcWebgl = 0x8C92,
    GL_CompressedRgbaAtcExplicitAlphaWebgl = 0x8C92,
    GL_CompressedRgbaAtcInterpolatedAlphaWebgl = 0x87EE,
    GL_UnsignedInt248Webgl = 0x84FA,
    GL_HalfFloatOes = 0x8D61,
    GL_Rgba32FExt = 0x8814,
    GL_Rgb32FExt = 0x8815,
    GL_FramebufferAttachmentComponentTypeExt = 0x8211,
    GL_UnsignedNormalizedExt = 0x8C17,
    GL_MinExt = 0x8007,
    GL_MaxExt = 0x8008,
    GL_SrgbExt = 0x8C40,
    GL_SrgbAlphaExt = 0x8C42,
    GL_Srgb8Alpha8Ext = 0x8C43,
    GL_FramebufferAttachmentColorEncodingExt = 0x8210,
    GL_FragmentShaderDerivativeHintOes = 0x8B8B,
    GL_ColorAttachment0Webgl = 0x8CE0,
    GL_ColorAttachment1Webgl = 0x8CE1,
    GL_ColorAttachment2Webgl = 0x8CE2,
    GL_ColorAttachment3Webgl = 0x8CE3,
    GL_ColorAttachment4Webgl = 0x8CE4,
    GL_ColorAttachment5Webgl = 0x8CE5,
    GL_ColorAttachment6Webgl = 0x8CE6,
    GL_ColorAttachment7Webgl = 0x8CE7,
    GL_ColorAttachment8Webgl = 0x8CE8,
    GL_ColorAttachment9Webgl = 0x8CE9,
    GL_ColorAttachment10Webgl = 0x8CEA,
    GL_ColorAttachment11Webgl = 0x8CEB,
    GL_ColorAttachment12Webgl = 0x8CEC,
    GL_ColorAttachment13Webgl = 0x8CED,
    GL_ColorAttachment14Webgl = 0x8CEE,
    GL_ColorAttachment15Webgl = 0x8CEF,
    GL_DrawBuffer0Webgl = 0x8825,
    GL_DrawBuffer1Webgl = 0x8826,
    GL_DrawBuffer2Webgl = 0x8827,
    GL_DrawBuffer3Webgl = 0x8828,
    GL_DrawBuffer4Webgl = 0x8829,
    GL_DrawBuffer5Webgl = 0x882A,
    GL_DrawBuffer6Webgl = 0x882B,
    GL_DrawBuffer7Webgl = 0x882C,
    GL_DrawBuffer8Webgl = 0x882D,
    GL_DrawBuffer9Webgl = 0x882E,
    GL_DrawBuffer10Webgl = 0x882F,
    GL_DrawBuffer11Webgl = 0x8830,
    GL_DrawBuffer12Webgl = 0x8831,
    GL_DrawBuffer13Webgl = 0x8832,
    GL_DrawBuffer14Webgl = 0x8833,
    GL_DrawBuffer15Webgl = 0x8834,
    GL_MaxColorAttachmentsWebgl = 0x8CDF,
    GL_MaxDrawBuffersWebgl = 0x8824,
    GL_VertexArrayBindingOes = 0x85B5,
    GL_QueryCounterBitsExt = 0x8864,
    GL_CurrentQueryExt = 0x8865,
    GL_QueryResultExt = 0x8866,
    GL_QueryResultAvailableExt = 0x8867,
    GL_TimeElapsedExt = 0x88BF,
    GL_TimestampExt = 0x8E28,
    GL_GpuDisjointExt = 0x8FBB;

// -- VARIABLES

var
    ArrayBufferIdentifier = -1,
    ElementArrayBufferIdentifier = -1,
    TextureIdentifier = -1,
    ShaderIdentifier = -1,
    ProgramUniformIdentifier = -1,
    ProgramAttributeIdentifier = -1,
    ProgramIdentifier = -1,
    CanvasIdentifier = -1;

// -- TYPES

class VISTA_REAL_32_ARRAY_BUFFER
{
    constructor(
        real_array
        )
    {
        this.Identifier = ++ArrayBufferIdentifier;
        this.Name = "";
        this.Float32Array = new Float32Array( real_array );
        this.GraphicBuffer = null;
        this.PositionRealCount = 0;
        this.MappingRealCount = 0;
        this.NormalRealCount = 0;
        this.VertexRealCount = 0;
    }

    // ~~

    Bind(
        graphic_context
        )
    {
        this.GraphicBuffer = graphic_context.createBuffer();

        graphic_context.bindBuffer( GL_ArrayBuffer, this.GraphicBuffer );
        graphic_context.bufferData( GL_ArrayBuffer, this.Float32Array, GL_StaticDraw );
    }
}

// ~~

class VISTA_NATURAL_16_ELEMENT_ARRAY_BUFFER
{
    constructor(
        natural_array
        )
    {
        this.Identifier = ++ElementArrayBufferIdentifier;
        this.Name = "";
        this.Uint16Array = new Uint16Array( natural_array );
        this.GraphicBuffer = null;
    }

    // ~~

    Bind(
        graphic_context
        )
    {
        this.GraphicBuffer = graphic_context.createBuffer();

        graphic_context.bindBuffer( GL_ElementArrayBuffer, this.GraphicBuffer );
        graphic_context.bufferData( GL_ElementArrayBuffer, this.Uint16Array, GL_StaticDraw );
    }
}

// ~~

class VISTA_TEXTURE
{
    // -- CONSTRUCTORS

    constructor(
        image_url,
        callback_function = null,
        is_repeated = false,
        has_mipmap = true
        )
    {
        this.Identifier = ++TextureIdentifier;
        this.Name = "";
        this.InternalFormat = GL_Rgba;
        this.Format = GL_Rgba;
        this.Type = GL_UnsignedByte;
        this.Target = GL_Texture2D;
        this.MinificationFilter = GL_Linear;
        this.MagnificationFilter = GL_Linear;
        this.HorizontalWrap = is_repeated ? GL_Repeat : GL_ClampToEdge;
        this.VerticalWrap = is_repeated ? GL_Repeat : GL_ClampToEdge;
        this.HasMipmap = has_mipmap;
        this.GraphicTexture = null;
    }

    // -- OPERATIONS

    Bind(
        graphic_context
        )
    {
        var
            texture;

        texture = graphic_context.createTexture();

        this.GraphicTexture = texture;

        graphic_context.bindTexture( this.Target, texture );
        graphic_context.texParameteri( this.Target, GL_TextureMinFilter, this.MinificationFilter );
        graphic_context.texParameteri( this.Target, GL_TextureMagFilter, this.MagnificationFilter );
        graphic_context.texParameteri( this.Target, GL_TextureWrapS, this.HorizontalWrap );
        graphic_context.texParameteri( this.Target, GL_TextureWrapT, this.VerticalWrap );
        graphic_context.bindTexture( this.Target, null );
    }

    // ~~

    BindImage(
        graphic_context
        )
    {
        graphic_context.bindTexture( this.Target, this.GraphicTexture );
        graphic_context.texImage2D( this.Target, this.Level, this.InternalFormat, this.Format, this.Type, this.Image );

        if ( this.HasMipmap
             && IsPowerOfTwo( this.Image.width )
             && IsPowerOfTwo( this.Image.height ) )
        {
            graphic_context.generateMipmap( this.Target );
        }

        graphic_context.bindTexture( this.Target, null);
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
                        resolve_function( image_file_path );
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

    Unbind(
        graphic_context
        )
    {
        graphic_context.deleteTexture( this.Texture );
    }

    // ~~

    BindUnit(
        graphic_context,
        unit_index
        )
    {
        graphic_context.activeTexture( GL_Texture0 + unit_index );
        graphic_context.bindTexture( this.Target, this.GraphicTexture );
    }

    // ~~

    UnbindUnit(
        graphic_context
        )
    {
        graphic_context.bindTexture( this.Target, null );
    }
}

// ~~

class VISTA_SHADER
{
    // -- CONSTRUCTORS

    constructor(
        code,
        type
        )
    {
        this.Identifier = ++ShaderIdentifier;
        this.Name = "";
        this.Code = code;
        this.Type = type;
        this.GraphicShader = null;
    }

    // -- OPERATIONS

    SetCode(
        code
        )
    {
        this.Code = code;
    }

    // ~~

    Bind(
        graphic_context
        )
    {
        var
            shader;

        shader = graphic_context.createShader( this.Type );

        this.GraphicShader = shader;

        graphic_context.shaderSource( shader, this.Code );
        graphic_context.compileShader( shader );

        if ( !graphic_context.getShaderParameter( shader, GL_CompileStatus ) )
        {
            PrintError( graphic_context.getShaderInfoPrint( shader ) );
        }
    }

    // ~~

    Unbind(
        graphic_context
        )
    {
        graphic_context.deleteShader( this.GraphicShader );

        this.Shader = null;
    }
}

// ~~

class VISTA_VERTEX_SHADER extends VISTA_SHADER
{
    // -- CONSTRUCTORS

    constructor(
        code = ""
        )
    {
        super( code, GL_VertexShader );
    }
}

// ~~

class VISTA_FRAGMENT_SHADER extends VISTA_SHADER
{
    // -- CONSTRUCTORS

    constructor(
        code = ""
        )
    {
        super( code, GL_FragmentShader );
    }
}

// ~~

class VISTA_PROGRAM_UNIFORM
{
    // -- CONSTRUCTORS

    constructor(
        program,
        name = ""
        )
    {
        this.Identifier = ++ProgramUniformIdentifier;
        this.Program = program;
        this.Name = name;
        this.GraphicUniformLocation = null;
    }

    // -- OPERATIONS

    Bind(
        graphic_context
        )
    {
        this.GraphicUniformLocation = graphic_context.getUniformLocation( this.Program.GraphicProgram, this.Name );

        if ( this.GraphicUniformLocation === -1 )
        {
            PrintError( this.Name );
        }
    }

    // ~~

    SetInteger(
        graphic_context,
        integer
        )
    {
        graphic_context.uniform1i( this.GraphicUniformLocation, integer );
    }

    // ~~

    SetIntegerVector2(
        graphic_context,
        vector
        )
    {
        graphic_context.uniform2iv( this.GraphicUniformLocation, vector );
    }

    // ~~

    SetIntegerVector3(
        graphic_context,
        vector
        )
    {
        graphic_context.uniform3iv( this.GraphicUniformLocation, vector );
    }

    // ~~

    SetIntegerVector4(
        graphic_context,
        vector
        )
    {
        graphic_context.uniform4iv( this.GraphicUniformLocation, vector );
    }

    // ~~

    BindReal(
        graphic_context,
        real
        )
    {
        graphic_context.uniform1f( this.GraphicUniformLocation, real );
    }

    // ~~

    BindRealVector2(
        graphic_context,
        vector
        )
    {
        graphic_context.uniform2fv( this.GraphicUniformLocation, vector );
    }

    // ~~

    BindRealVector3(
        graphic_context,
        vector
        )
    {
        graphic_context.uniform3fv( this.GraphicUniformLocation, vector );
    }

    // ~~

    BindRealVector4(
        graphic_context,
        vector
        )
    {
        graphic_context.uniform4fv( this.GraphicUniformLocation, vector );
    }

    // ~~

    BindRealMatrix4(
        graphic_context,
        matrix,
        matrix_is_transposed = false
        )
    {
        graphic_context.uniformMatrix4fv( this.GraphicUniformLocation, matrix_is_transposed, matrix );
    }

    // ~~

    BindTextureUnit(
        graphic_context,
        texture,
        unit_index
        )
    {
        texture.BindUnit( graphic_context, unit_index );

        graphic_context.uniform1i( this.GraphicUniformLocation, unit_index );
    }
}

// ~~

class VISTA_PROGRAM_ATTRIBUTE
{
    // -- CONSTRUCTORS

    constructor(
        program,
        name = ""
        )
    {
        this.Identifier = ++ProgramAttributeIdentifier;
        this.Name = name;
        this.Program = program;
        this.GraphicAttributeLocation = null;
    }

    // -- OPERATIONS

    Bind(
        graphic_context
        )
    {
        this.GraphicAttributeLocation = graphic_context.getAttribLocation( this.Program.GraphicProgram, this.Name );

        if ( this.GraphicAttributeLocation === -1 )
        {
            PrintError( this.Name );
        }
    }

    // ~~

    BindReal32ArrayBuffer(
        graphic_context,
        array_buffer,
        real_count,
        stride_real_count = 0,
        offset_real_count = 0,
        it_is_normalized = false
        )
    {
        graphic_context.bindBuffer( GL_ArrayBuffer, array_buffer.GraphicBuffer );

        graphic_context.vertexAttribPointer(
            this.GraphicAttributeLocation,
            real_count,
            GL_Float,
            it_is_normalized,
            stride_real_count * 4,
            offset_real_count * 4
            );

        graphic_context.enableVertexAttribArray( this.GraphicAttributeLocation );
    }

    // ~~

    BindNatural16ElementArrayBuffer(
        graphic_context,
        element_array_buffer
        )
    {
        graphic_context.bindBuffer( GL_ElementArrayBuffer, element_array_buffer.GraphicBuffer );
    }
}

// ~~

class VISTA_PROGRAM
{
    // -- CONSTRUCTORS

    constructor(
        vertex_shader,
        fragment_shader
        )
    {
        this.Identifier = ++ProgramIdentifier;
        this.Name = "";
        this.VertexShader = vertex_shader;
        this.FragmentShader = fragment_shader;
        this.GraphicProgram = null;
    }

    // -- INQUIRIES

    GetUniform(
        uniform_name
        )
    {
        return new VISTA_PROGRAM_UNIFORM( this, uniform_name );
    }

    // ~~

    GetAttribute(
        attribute_name
        )
    {
        return new VISTA_PROGRAM_ATTRIBUTE( this, attribute_name );
    }

    // -- OPERATIONS

    Bind(
        graphic_context
        )
    {
        var
            program;

        program = graphic_context.createProgram();

        this.GraphicProgram = program;

        graphic_context.attachShader( program, this.VertexShader.GraphicShader );
        graphic_context.attachShader( program, this.FragmentShader.GraphicShader );
        graphic_context.linkProgram( program );

        if ( !graphic_context.getProgramParameter( program, GL_LinkStatus ) )
        {
            PrintError( graphic_context.getProgramInfoPrint( program ) );
        }
    }

    // ~~

    Unbind(
        graphic_context
        )
    {
        graphic_context.deleteProgram( this.GraphicProgram );
    }

    // ~~

    Use(
        graphic_context
        )
    {
        graphic_context.useProgram( this.GraphicProgram );
    }
}

// ~~

class VISTA_CANVAS
{
    // -- CONSTRUCTORS

    constructor(
        canvas_element,
        context_name = "webgl"
        )
    {
        this.Identifier = ++CanvasIdentifier;
        this.Name = "";
        this.CanvasElement = canvas_element;

        try
        {
            this.GraphicContext = canvas_element.getContext( context_name, { preserveDrawingBuffer : false } );
            this.GraphicContext.Identifier = this.Identifier;
        }
        catch ( error )
        {
            this.GraphicContext = undefined;
        }
    }

    // -- INQUIRIES

    GetWidth(
        )
    {
        return this.CanvasElement.clientWidth;
    }

    // ~~

    GetHeight(
        )
    {
        return this.CanvasElement.clientHeight;
    }

    // -- OPERATIONS

    Clear(
        color = [ 0.0, 0.0, 0.0, 1.0 ],
        depth = 1.0
        )
    {
        this.GraphicContext.clearColor( color[ 0 ], color[ 1 ], color[ 2 ], color[ 3 ] );
        this.GraphicContext.clearDepth( depth );
        this.GraphicContext.enable( GL_DepthTest );
        this.GraphicContext.depthFunc( GL_Lequal );
        this.GraphicContext.clear( GL_ColorBufferBit | GL_DepthBufferBit );
    }

    // ~~

    DrawTriangles(
        vertex_count,
        first_vertex_index = 0
        )
    {
        this.GraphicContext.drawArrays(
            GL_Triangles,
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
        this.GraphicContext.drawElements(
            GL_Triangles,
            vertex_count,
            GL_UnsignedShort,
            first_vertex_index
            );
    }
}
