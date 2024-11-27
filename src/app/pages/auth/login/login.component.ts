import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../services/auth/auth.service";
import { HelperService } from "../../../services/helper/helper.service";
import { Router } from "@angular/router";
import { LayoutService } from "../../layout/service/app.layout.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
      transform: scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent {

  public layoutService: LayoutService = inject(LayoutService);

  private readonly formBuilder: FormBuilder = inject(FormBuilder);

  private readonly authService: AuthService = inject(AuthService);

  private readonly helperService: HelperService = inject(HelperService);

  private readonly router: Router = inject(Router);

  constructor() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  valCheck: string[] = ['remember'];

  public formGroup!: FormGroup;

  public isLoading: boolean = false;

  public async onPerformLogin(): Promise<void> {
    this.isLoading = true;

    const payload = this.formGroup.getRawValue();

    const [ canLogin, message ] = await this.authService.login(payload.email, payload.password);

    this.isLoading = false;

    if (!canLogin)
      return void this.helperService.error('Oops...', message);

    this.helperService.success('Sucesso!', 'Sucesso!');
    await this.router.navigateByUrl('/admin/ingredients');
  }

}
