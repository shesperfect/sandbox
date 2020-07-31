import React, { createRef } from 'react';

interface CanvasProps {
  context: string,
  options: {
    antialias: boolean,
  },
  onLoad: (gl: RenderingContext | null) => void,
  onRender: (gl: RenderingContext) => void,
}

export class Canvas extends React.Component<CanvasProps, any> {
  private canvasRef = createRef<HTMLCanvasElement>();
  private gl: any;

  static defaultProps: CanvasProps = {
    context: "webgl",
    options: {
      antialias: true,
    },
    onLoad: () => {},
    onRender: () => {},
  };

  componentDidMount() {
    const { context, options } = this.props;

    this.gl = this.canvasRef.current?.getContext(context, options) || null;
    this.props.onLoad(this.gl);

    window.addEventListener('resize', () =>
      this.gl.viewport(0, 0,
        this.canvasRef.current?.offsetWidth,
        this.canvasRef.current?.offsetHeight));

    this.animate();
  }

  render() {
    return (
      <div className="rounded overflow-hidden">
        <canvas ref={ this.canvasRef } />
      </div>
    );
  }

  private animate() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.props.onRender(this.gl);

    requestAnimationFrame(this.animate.bind(this));
  }
}
