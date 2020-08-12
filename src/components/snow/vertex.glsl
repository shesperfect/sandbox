precision mediump float;

attribute vec2 a_position;
attribute mat4 a_model;
//attribute vec4 color;

uniform mat4 u_projection;

varying vec4 v_color;

const mat4 identity = mat4(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1);

void main() {
    gl_Position = u_projection * a_model * vec4(a_position, 0., 1.0);
//    gl_Position = u_projection * vec4(a_position, 0., 1.0);
//    v_color = vec4(a_model[3].a, 0., 0., 1.);
    v_color = vec4(1., 1., 1., 1.);
}
