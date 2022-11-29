class StringBuilder {
  private _value: string = '';

  public prepend(value: string): void;
  public prepend(values: string[]): void;
  public prepend(obj: object): void;
  public prepend(value: string | string[] | object): void {
    this.setValue(value, false);
  }

  public append(value: string): void;
  public append(values: string[]): void;
  public append(obj: object): void;
  public append(value: string | string[] | object): void {
    this.setValue(value, true);
  }

  public prependLine(value: string): void;
  public prependLine(values: string[]): void;
  public prependLine(obj: object): void;
  public prependLine(value: string | string[] | object): void {
    this.setValue('\n', false);
    this.setValue(value, false);
  }

  public appendLine(value: string): void;
  public appendLine(values: string[]): void;
  public appendLine(obj: object): void;
  public appendLine(value: string | string[] | object): void {
    this.setValue('\n', true);
    this.setValue(value, true);
  }

  private setValue(
    value: string | string[] | object,
    append: boolean,
  ): void {
    const insertValue = (value: string) =>
      append
        ? (this._value += value)
        : (this._value = value + this._value);

    if (Array.isArray(value)) insertValue(value.join(' '));
    else if (typeof value === 'string') insertValue(value);
    else if (typeof value === 'object')
      insertValue(JSON.stringify(value));
  }

  public toString(): string {
    return this._value;
  }
}

const sb = new StringBuilder();
sb.append('llo');
sb.prepend('He');
sb.append(' ');
sb.append(['Bobby', 'Smith']);
sb.appendLine('The world is your oyster');
sb.prependLine('Fuzzy Wuzzy was a bear');

console.log(`${sb.toString()}`);
