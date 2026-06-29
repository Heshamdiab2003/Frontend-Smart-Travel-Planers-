import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserProfile } from '../../../../core/models';
import { ToastService } from '../../../../core/services/toast.service';

/** Editable personal-information form. Emits the saved profile to its parent. */
@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.css',
})
export class PersonalInfo {
  private readonly toast = inject(ToastService);

  @Input({ required: true }) userProfile!: UserProfile;
  @Output() saveProfile = new EventEmitter<UserProfile>();

  onSubmit(): void {
    if (!this.userProfile.firstName.trim() || !this.userProfile.lastName.trim()) {
      this.toast.danger('First and last name are required.');
      return;
    }
    this.saveProfile.emit({ ...this.userProfile });
    this.toast.success('Personal information updated.');
  }
}
