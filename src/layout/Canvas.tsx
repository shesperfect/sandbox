import React, { createRef } from 'react';

interface CanvasProps {
  context: string,
  options: {
    antialias: boolean,
  },
  onLoad: (gl: RenderingContext | null) => void,
  onRender: (gl: RenderingContext) => void,
  onResize: (width: number, height: number) => void,
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
    onResize: () => {},
  };

  componentDidMount() {
    const { context, options } = this.props;

    this.gl = this.canvasRef.current?.getContext(context, options) || null;
    this.props.onLoad(this.gl);

    window.addEventListener('resize', this.setViewport.bind(this));

    this.setViewport();
    this.animate();
  }

  render() {
    return (
      <div className="rounded overflow-hidden">
        <canvas ref={ this.canvasRef } />
      </div>
    );
  }

  private setViewport() {
    if (this.canvasRef.current) {
      const width = this.canvasRef.current.offsetWidth;
      const height = this.canvasRef.current.offsetHeight;

      this.canvasRef.current.width = width;
      this.canvasRef.current.height = height;

      this.gl.viewport(0, 0, width, height);

      this.props.onResize(width, height);
    }
  }

  private animate() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.props.onRender(this.gl);

    requestAnimationFrame(this.animate.bind(this));
  }
}
