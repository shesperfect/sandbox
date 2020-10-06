export class ExtensionSystem {
  private extensions = new Map<string, any>();

  constructor(private gl: any) {}

  get(extName: string) {
    if (this.extensions.has(extName)) return this.extensions.get(extName);

    const ext = this.gl.getExtension(extName);

    if (!ext) throw new Error(`Cannot get an extension: ${extName}`);

    this.extensions.set(extName, ext);

    return ext;
  }
}
