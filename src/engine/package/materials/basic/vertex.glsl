precision mediump float;

attribute vec3 a_position;
attribute vec3 a_normal;
attribute vec4 a_color;
attribute mat4 a_model;

uniform mat4 u_projection;

varying vec4 v_color;
varying vec3 v_normal;

void main() {
    gl_Position = u_projection * a_model * vec4(a_position, 1.0);

    v_color = a_color;
    v_normal = a_normal;
}
