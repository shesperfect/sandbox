precision mediump float;

//uniform sampler2D u_spriteTexture;

//varying vec2 v_texcoord;
//varying vec2 v_position;
varying vec3 v_color;

void main() {
//    gl_FragColor = texture2D(u_spriteTexture, v_texcoord + v_position * (32. / 511.));
    gl_FragColor = vec4(v_color, 1.);
}
