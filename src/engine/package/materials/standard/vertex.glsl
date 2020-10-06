precision mediump float;

attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec4 a_color;
attribute mat4 a_model;

uniform mat4 u_projection;

varying vec4 v_color;
varying vec3 v_light;

void main() {
    gl_Position = u_projection * a_model * vec4(a_position, 1.0);

    vec3 light = vec3(0.);

//    // ambient light
    vec3 ambientLight = vec3(0.3, 0.3, 0.3);
    light += ambientLight;
//
    // directional light
    vec3 directionalLightColor = vec3(1, 1, 1);
    vec3 directionalLightDirection = normalize(vec3(1., 1., 2.));
    light += dot(mat3(a_model) * a_normal, directionalLightDirection) * directionalLightColor;

//    // point light
//    vec3 surfaceWorldPosition = (a_model * vec4(a_position, 1.0)).xyz;
//    vec3 pointLightColor = vec3(1, 1, 1);
//    vec3 pointLightWorldPosition = vec3(11., 12., 19.);
//    vec3 surfaceToLight = pointLightWorldPosition - surfaceWorldPosition;
//    light += dot(mat3(a_model) * a_normal, surfaceToLight) * pointLightColor;

//    v_texcoord = a_texcoord;
//    v_position = a_position;
    v_color = a_color;
    v_light = light;
}
