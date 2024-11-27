import { inject, Injectable } from '@angular/core';
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  private readonly messageService: MessageService = inject(MessageService);

  public success(title: string, message: string): void {
    this.messageService.add({ severity: 'success', summary: title, detail: message })
  }

  public info(title: string, message: string): void {
    this.messageService.add({ severity: 'info', summary: title, detail: message });
  }

  public warn(title: string, message: string): void {
    this.messageService.add({ severity: 'warn', summary: title, detail: message });
  }

  public error(title: string, message: string): void {
    this.messageService.add({ severity: 'error', summary: title, detail: message });
  }

}
