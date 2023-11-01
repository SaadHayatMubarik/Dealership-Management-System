import { Injectable, TemplateRef } from '@angular/core';
// import { Subject } from 'rxjs';

export interface DialogSetting {
  content?: TemplateRef<any> | any;
  title?: string;
  actions?: any; //Array<DialogAction>;
  height?: number | string;
  width?: number | string;
}

@Injectable({
  providedIn: 'root',
})
export class DialogControlService {
  defaultSetting: DialogSetting = {
    width: 500,
  };

  // private destroyed$ = new Subject();

  dialogInstance: any;
  private dialogService: any;

  show(setting: DialogSetting): void {
    const updatedSettings = { ...this.defaultSetting, ...setting };
    this.dialogInstance = this.dialogService.open(updatedSettings);
  }

  async confirm(
    title: string,
    content: string | TemplateRef<any> | VoidFunction
  ): Promise<boolean> {
    const confirmAction = { text: 'Yes', primary: true };

    const result = await this.dialogService
      .open({
        title,
        content,
        actions: [confirmAction, { text: 'No' }],
      })
      .result.toPromise();

    return result === confirmAction;
  }

  async alert(
    title: string,
    content: string | TemplateRef<any> | VoidFunction
  ): Promise<void> {
    await this.dialogService
      .open({
        title,
        content,
        actions: [{ text: 'OK' }],
      })
      .result.toPromise();
  }

  async open(): Promise<void> {
    await this.open();
  }
}
