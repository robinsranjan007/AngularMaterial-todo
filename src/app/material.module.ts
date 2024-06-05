import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';


const materials = [
  MatButtonModule,
  CommonModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  TextFieldModule,
  MatSelectModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatExpansionModule
];


@NgModule({
    declarations:[],
    imports:[materials],
    exports:[materials]
})
export class materialModule{

}