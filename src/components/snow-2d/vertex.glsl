precision mediump float;

attribute vec3 a_position;
attribute vec3 a_color;
//attribute vec2 a_texcoord;
attribute mat4 a_model;

uniform mat4 u_projection;

//varying vec2 v_texcoord;
//varying vec2 v_position;
varying vec3 v_color;

void main() {
    float width = 100.;
    float height = 100.;
    float depth = 1.;
    float left = 300.;
    float top = 300.;
//    mat4 a_model = mat4(
//        width, 0, 0, 0,
//        0, height, 0, 0,
//        0, 0, depth, 0,
//        left, top, 0, 1
//    );

    float xAngle = 0.;
    float cX = cos(xAngle);
    float sX = sin(xAngle);
    mat4 rotateX = mat4(
        1, 0, 0, 0,
        0, cX, sX, 0,
        0, -sX, cX, 0,
        0, 0, 0, 1
    );

    float yAngle = 20.;
    float cY = cos(yAngle);
    float sY = sin(yAngle);
    mat4 rotateY = mat4(
        cY, 0, -sY, 0,
        0, 1, 0, 0,
        sY, 0, cY, 0,
        0, 0, 0, 1
    );

    float zAngle = 20.;
    float cZ = cos(zAngle);
    float sZ = sin(zAngle);
    mat4 rotateZ = mat4(
        cZ, sZ, 0, 0,
        -sZ, cZ, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    );

//    a_model = a_model * rotateX * rotateY * rotateZ;

    gl_Position = u_projection * a_model * vec4(a_position, 1.0);

//    v_texcoord = a_texcoord;
//    v_position = a_position;
    v_color = a_color;
}
