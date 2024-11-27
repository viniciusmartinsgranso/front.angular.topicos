import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from "../components/navbar/navbar.module";
import { AppLayoutModule } from "./layout/app.layout.module";
import { HttpAsyncModule } from "../modules/http-async/http-async.module";
import { HttpClientModule } from "@angular/common/http";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { QRCodeModule } from "angularx-qrcode";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    AppLayoutModule,
    HttpAsyncModule,
    HttpClientModule,
    ToastModule,
    QRCodeModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
