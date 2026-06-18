import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { Signup } from './pages/signup/signup';
import { Login } from './pages/login/login';
import { TripForm } from './pages/trip-form/trip-form';
import { MyTripsPageComponent } from './pages/my-trips-page/my-trips-page.component';
import { TravelPlanPage } from './pages/travel-plan-page/travel-plan-page';
import { AboutPage } from './pages/about/about';
import { MyTripsLayout } from './pages/my-trips-page/my-trips-layout';
import { ChatPage } from './pages/chat/chat';
import { PortfolioPage } from './pages/portfolio-page/portfolio-page';
import { SettingsPage } from './pages/settings-page/settings-page';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password';
import { TermsPage } from './pages/terms/terms';
import { PrivacyPage } from './pages/privacy/privacy';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signup', component: Signup },
  { path: 'login', component: Login },
  { path: 'plan', component: TripForm },
  { path: 'about', component: AboutPage },
  { path: 'chat', component: ChatPage },
  { path: 'portfolio', component: PortfolioPage },
  { path: 'forgot-password', component: ForgotPasswordPage },
  { path: 'terms', component: TermsPage },
  { path: 'privacy', component: PrivacyPage },
  { path: 'settings', component: SettingsPage },
  { path: 'profile', redirectTo: 'portfolio', pathMatch: 'full' },
  {
    path: 'my-trips',
    component: MyTripsLayout,
    children: [
      { path: '', component: MyTripsPageComponent },
      { path: 'plan/:id', component: TravelPlanPage }
    ]
  },
  { path: '**', redirectTo: '' }
];