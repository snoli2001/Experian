/* eslint-disable arrow-parens */
import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'code-validation' },

    // Redirect signed in user to the '/code-validation'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    // { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'example' },

    // Auth routes for authenticated users
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'code-validation',
                loadChildren: () =>
                    import(
                        'app/modules/auth/code-validation/code-validation.module'
                    ).then((m) => m.CodeValidationModule),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sentinel',
                loadChildren: () =>
                    import('app/modules/admin/sentinel/sentinel.module').then(
                        (m) => m.SentinelModule
                    ),
            },
        ],
    },
];
