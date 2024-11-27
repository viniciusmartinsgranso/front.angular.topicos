import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDrinksComponent } from "./list-drinks.component";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { FileUploadModule } from "primeng/fileupload";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { RippleModule } from "primeng/ripple";
import { SharedModule } from "primeng/api";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { TooltipModule } from "primeng/tooltip";
import { IngredientsNamePipe } from "../../../pipes/ingredients-name.pipe";


@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    FileUploadModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    RippleModule,
    SharedModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    TooltipModule,
    IngredientsNamePipe
  ],
  declarations: [
    ListDrinksComponent
  ],
  exports: [
    ListDrinksComponent
  ]
})
export class ListDrinksModule {
}
