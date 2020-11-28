precision mediump float;

attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec4 a_color;
attribute mat4 a_model;

uniform mat4 u_projection;

varying vec4 v_color;

void main() {
    gl_Position = u_projection * a_model * vec4(a_position, 1.0);

    // ambient light
    vec3 ambientLight = vec3(0.3, 0.3, 0.3);

    // directional light
    vec3 directionalLightColor = vec3(1, 1, 1);
    vec3 directionalLightDirection = normalize(vec3(0., 0., 1.));
    vec3 directionalLight = dot(directionalLightDirection, mat3(a_model) * a_normal) * directionalLightColor;

    // point light
    vec3 surfaceWorldPosition = (a_model * vec4(a_position, 1.0)).xyz;
    vec3 pointLightColor = vec3(1, 1, 1);
    vec3 pointLightWorldPosition = vec3(0., 0., 1.3);
    vec3 surfaceToLight = normalize(pointLightWorldPosition - surfaceWorldPosition);
    vec3 pointLight = dot(surfaceToLight, mat3(a_model) * a_normal) * pointLightColor;

    v_color = vec4(ambientLight + directionalLight + pointLight, 1.) * a_color;
}
