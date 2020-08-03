precision mediump float;

attribute vec3 a_position;
attribute vec4 color;

uniform mat4 u_projection;
uniform mat4 u_model;
uniform mat4 u_view;

varying vec4 v_color;

void main() {
    gl_Position = u_projection * vec4(a_position, 1.0);
    v_color = vec4(0., 0., 0., 1.);
}
