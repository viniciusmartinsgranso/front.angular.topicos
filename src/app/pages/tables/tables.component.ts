import { Component, inject, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HelperService } from "../../services/helper/helper.service";
import { TableProxy } from "../../models/proxies/table.proxy";
import { TableService } from "../../services/table/table.service";
import printJS from "print-js";
import { FixMeLater } from "angularx-qrcode";

@Component({
  templateUrl: './tables.html',
  styleUrls: ['./tables.scss'],
  providers: [MessageService]
})
export class TablesComponent implements OnInit {

  constructor() {
    this.formGroup = this.formBuilder.nonNullable.group({
      key: ['', [Validators.required, Validators.minLength(1)]],
      qrCodeUrl: [''],
    });
  }

  //#region Injectable Services

  private readonly tableService: TableService = inject(TableService);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  //#endregion

  //#Public Properties

  public deleteTableDialog: boolean = false;

  public deleteTablesDialog: boolean = false;

  public tables: TableProxy[] = [];

  public table!: TableProxy;

  public selectedTables: TableProxy[] = [];

  public submitted: boolean = false;

  public cols: any[] = [];

  public rowsPerPageOptions: number[] = [5, 10, 20];

  public id: number = 0;

  public isCreating: boolean = false;

  public formGroup: FormGroup;

  public showQRCode: boolean = false;

  //#endregion

  //#region Life Cycle Methods

  public async ngOnInit(): Promise<void> {
    await this.getTables();

    this.cols = [
      { field: 'isActive', header: 'Ativo?' }
    ];
  }

  //#endreegion

  //#region Public Methods

  public async create(): Promise<void> {
    this.submitted = false;
    this.isCreating = true;
  }

  public async saveTable(): Promise<void> {
    const payload = this.formGroup.getRawValue();

    payload.qrCodeUrl = `http://localhost:4200/products?mesa=${payload.key}`;


    const [canCreate, message] = await this.tableService.create(payload);

    if (!canCreate && message)
      return void this.helperService.error('Oops...', message)


    this.submitted = true;
    this.isCreating = false;
    this.formGroup.reset();

    this.helperService.success('Sucesso!', 'Mesa criada com sucesso!');
    await this.getTables();
  }

  public deleteSelectedTable() {
    this.deleteTablesDialog = true;
  }

  public deleteTable(table: TableProxy) {
    this.deleteTableDialog = true;
    this.id = table.id;
    this.table = table;
  }

  public confirmDeleteSelected() {
    this.deleteTablesDialog = false;
    this.tables = this.tables.filter(val => !this.selectedTables.includes(val));
    this.helperService.success('Sucesso!', 'Ingrediente deletado com sucesso!')
    this.selectedTables = [];
  }

  public async confirmDelete(): Promise<void> {
    this.deleteTableDialog = false;

    const [canDelete, message] = await this.tableService.deactivate(this.id);

    if (!canDelete && message)
      return void this.helperService.error('Oops...', message);

    this.helperService.success('Sucesso!', 'Mesa desativada com sucesso!');
    await this.getTables();
  }

  public async activate(table: TableProxy): Promise<void> {
    const canUpdate = await this.tableService.activate(table.id);
    this.submitted = true;

    if (!canUpdate)
      return void this.helperService.error('Oops...', 'Ocorreu um erro, tente novamente');

    this.helperService.success('Sucesso!', 'Mesa ativada com sucesso!');
    window.location.reload();
  }

  public onShowQrCode(table: TableProxy): void {
    this.table = table;
    this.showQRCode = true;
  }

  public printQrCode(parent: FixMeLater): void {
    const parentElement = parent.qrcElement.nativeElement.querySelector("img").src;
    let blobData = this.convertBase64ToBlob(parentElement)
    const blob = new Blob([blobData], { type: "image/png" })
    const url = window.URL.createObjectURL(blob)
    printJS({
      type: 'image',
      printable: url,
      header: `Mesa ${this.table.key}`
    });
  }

  public closeQrCode(): void {
    this.showQRCode = false;
  }

  hideDialog() {
    this.submitted = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  //#endregion

  //#region Private Methods

  private async getTables(): Promise<void> {
    this.tables = [];
    this.tables = await this.tableService.getMany();
  }

  private convertBase64ToBlob(Base64Image: string): Blob {
    const parts = Base64Image.split(";base64,")
    const imageType = parts[0].split(":")[1]
    const decodedData = window.atob(parts[1])
    const uInt8Array = new Uint8Array(decodedData.length)
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    return new Blob([uInt8Array], { type: imageType })
  }

  //#endregion
}
