import React, { createRef } from 'react';

interface CanvasProps {
  context: string,
  options: {
    antialias: boolean,
  },
  onLoad: (gl: RenderingContext | null) => void,
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
  };

  componentDidMount() {
    const { context, options } = this.props;

    this.gl = this.canvasRef.current?.getContext(context, options) || null;
    this.props.onLoad(this.gl);
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

    requestAnimationFrame(this.animate.bind(this));
  }
}
