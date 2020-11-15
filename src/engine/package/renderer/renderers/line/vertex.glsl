precision mediump float;

attribute vec3 a_position;
attribute vec3 a_a, a_b, a_c;

uniform float u_thickness;

varying vec3 v_a, v_b;

void main() {
    vec2 ab = a_b.xy - a_a.xy;
    vec2 abNormal = normalize(vec2(-ab.y, ab.x));

    vec2 point = a_a.xy + a_position.x * ab + a_position.y * abNormal * u_thickness;

    if (a_position.z >= 0.) { // if joint geometry
        vec2 cb = a_b.xy - a_c.xy;
        vec2 cbNormal = -normalize(vec2(-cb.y, cb.x));

        vec2 tangent = normalize(normalize(a_b.xy - a_a.xy) + normalize(a_c.xy - a_b.xy));
        vec2 miter = vec2(-tangent.y, tangent.x);

        float sigma = sign(dot(ab + cb, miter));

        vec2 p0 = .5 * u_thickness * sigma * (sigma < 0.0 ? abNormal : cbNormal);
        vec2 p1 = .5 * miter * sigma * u_thickness / dot(miter, abNormal);
        vec2 p2 = .5 * u_thickness * sigma * (sigma < 0.0 ? cbNormal : abNormal);

        point = a_b.xy + a_position.x * p0 + a_position.y * p1 + a_position.z * p2;
    }

    gl_Position = u_projection * a_model * vec4(point, 0., 1.0);

    v_a = a_a;
    v_b = a_b;
}
