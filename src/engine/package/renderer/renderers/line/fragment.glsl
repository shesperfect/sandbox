precision mediump float;

varying vec4 v_color;

void main() {
    vec2 position = gl_FragCoord;
    vec2 ab = v_b.xy - v_a.xy;
    vec2 ap = position - v_a.xy;
    float lengthSoFar = dot(ap, ab) / length(ab) + v_a.z;

    gl_FragColor = texture2D(
        u_pattern,
        vec2(mod(lengthSoFar, u_period) / u_period, 0.)
    ) * v_color;
}
