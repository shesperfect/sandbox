precision mediump float;

//uniform sampler2D u_spriteTexture;
//uniform vec4 u_light;

//varying vec2 v_texcoord;
//varying vec2 v_position;
varying vec3 v_color;
//varying vec3 v_light;

void main() {
//    gl_FragColor = texture2D(u_spriteTexture, v_texcoord + v_position * (32. / 511.));

    vec3 color = v_color;

//    gl_FragColor = vec4(v_color * v_light, 1.);
    gl_FragColor = vec4(v_color, 1.);
}
