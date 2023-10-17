export class ControlBase {
    deepClone(value: any) {
      return JSON.parse(JSON.stringify(value));
    }
  }
  