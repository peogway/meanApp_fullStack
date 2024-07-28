import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export const toastrConfig = [
  importProvidersFrom(BrowserAnimationsModule),
  importProvidersFrom(
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      timeOut: 3000,
      closeButton: false,
      tapToDismiss: true,
      preventDuplicates: true,
      newestOnTop: true,
      iconClasses: {
        error: 'toast-error-custom',
        success: 'toast-success-custom',
      },
    })
  ),
];
