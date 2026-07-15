import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // <--- Add this import

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink], // <--- Add RouterLink here
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        console.log('Login successful! JWT stored.');
        
         this.router.navigate(['/watchlist']); 
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password. The bouncer says no.';
      }
    });
  }
}
