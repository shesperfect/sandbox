export { PerspectiveCamera } from './perspective';
export { OrthographicCamera } from './ortho';

// function getProjectionMatrix(fieldOfViewInRadians: number, aspectRatio: number, near: number, far: number) {
//   const f = 1.0 / Math.tan(fieldOfViewInRadians / 2);
//   const rangeInv = 1 / (near - far);
//
//   return [
//     f / aspectRatio, 0,                          0,   0,
//     0,               f,                          0,   0,
//     0,               0,    (near + far) * rangeInv,  -1,
//     0,               0,  near * far * rangeInv * 2,   0
//   ];
//
//   // return [
//   //   1, 0, 0, 0,
//   //   0, 1, 0, 0,
//   //   0, 0, 1, 0,
//   //   0, 0, 0, 1
//   // ];
// }
// function getOrthoMatrix() {
//   return [
//     1, 0, 0, 0,
//     0, 1, 0, 0,
//     0, 0, 1, 0,
//     0, 0, 0, 1
//   ];
// }
// function getModelMatrix() {
//   return [
//     1, 0, 0, 0,
//     0, 1, 0, 0,
//     0, 0, 1, 0,
//     0, 0, 0, 1
//   ];
// }
// function getViewMatrix() {
//   return [
//     1, 0, 0, 0,
//     0, 1, 0, 0,
//     0, 0, 1, 0,
//     0, 0, 0, 1
//   ];
// }

// const proj = gl.getUniformLocation(program, 'u_projection');
// gl.uniformMatrix4fv(proj, false, new Float32Array(getProjectionMatrix(
//   Math.PI * 0.5,
//   window.innerWidth / window.innerHeight,
//   1, 50
//   ))
// );
//
// const model = gl.getUniformLocation(program, 'u_model');
// gl.uniformMatrix4fv(model, false, new Float32Array(getModelMatrix()));
//
// const view = gl.getUniformLocation(program, 'u_view');
// gl.uniformMatrix4fv(view, false, new Float32Array(getViewMatrix()));
