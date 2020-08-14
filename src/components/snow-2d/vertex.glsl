precision mediump float;

attribute vec2 a_position;
attribute vec2 a_texcoord;
attribute mat4 a_model;

uniform mat4 u_projection;

varying vec2 v_texcoord;
varying vec2 v_position;

void main() {
    gl_Position = u_projection * a_model * vec4(a_position, 0., 1.0);

    v_texcoord = a_texcoord;
    v_position = a_position;
}
