precision mediump float;

attribute vec3 a_position;
attribute vec4 color;

varying vec4 v_color;

void main() {
    gl_Position = vec4(a_position, 1.0);
    v_color = color;
}
