import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'shoppingcart', loadChildren: './shoppingcart/shoppingcart.module#ShoppingcartPageModule' },
  { path: 'photo/viewPhotoDetails/:photoId', loadChildren: './photo/view-photo-details/view-photo-details.module#ViewPhotoDetailsPageModule' },
  { path: 'friends/:userId', loadChildren: './friends/friends.module#FriendsPageModule' },
  { path: 'photo/userPhotos/:userId', loadChildren: './photo/user-photos/user-photos.module#UserPhotosPageModule' },





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
