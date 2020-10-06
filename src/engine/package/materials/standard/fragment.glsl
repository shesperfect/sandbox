precision mediump float;

varying vec4 v_color;
varying vec3 v_light;

void main() {
    gl_FragColor = v_color * vec4(v_light, 1.);
}
