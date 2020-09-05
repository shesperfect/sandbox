import React, { createRef } from 'react';

interface CanvasProps {
  onLoad: (canvas: HTMLCanvasElement | null) => void,
  onRender: () => void,
  onResize: (width: number, height: number) => void,
}

export class Canvas extends React.Component<CanvasProps, any> {
  private canvasRef = createRef<HTMLCanvasElement>();

  static defaultProps: CanvasProps = {
    onLoad: () => {},
    onRender: () => {},
    onResize: () => {},
  };

  componentDidMount() {
    this.props.onLoad(this.canvasRef.current);

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

      this.props.onResize(width, height);
    }
  }

  private animate() {
    this.props.onRender();

    requestAnimationFrame(this.animate.bind(this));
  }
}
