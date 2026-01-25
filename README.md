# TalentCove

A modern full-stack job portal platform connecting talented professionals with employers. TalentCove provides a seamless experience for job seekers to find opportunities and for employers to discover top talent.

## 🚀 Features

### For Job Seekers
- **Job Search & Discovery**: Browse and search through thousands of job listings
- **Advanced Filtering**: Filter jobs by title, location, experience level, employment type, and salary range
- **Job Applications**: One-click application system with status tracking
- **Application Management**: View and track all your job applications in one place
- **Profile Management**: Create and manage your professional profile
- **Experience & Certifications**: Add and manage your work experience and certifications
- **Skills Showcase**: Highlight your technical and professional skills

### For Employers
- **Talent Discovery**: Search and browse through talented professionals
- **Advanced Search**: Filter talents by skills, location, and salary expectations
- **Profile Viewing**: View detailed talent profiles with experience and certifications

### Platform Features
- **User Authentication**: Secure JWT-based authentication system
- **Role-Based Access**: Support for different user roles (User, Employer, Admin)
- **Real-time Search**: Fast and responsive search functionality
- **Responsive Design**: Modern, mobile-friendly UI built with React and Tailwind CSS
- **Dark Mode**: Beautiful dark theme optimized for extended use

## 🛠️ Tech Stack

### Backend
- **Java 17**: Core programming language
- **Spring Boot 3.4.2**: Application framework
- **Spring Data JPA**: Database abstraction layer
- **Spring Security**: Authentication and authorization
- **JWT (JSON Web Tokens)**: Stateless authentication
- **H2 Database**: In-memory database for development
- **PostgreSQL**: Production-ready database support
- **Maven**: Dependency management

### Frontend
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and dev server
- **Mantine UI 7**: Component library
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios/Fetch API**: HTTP client for API calls

## 📁 Project Structure

```
talent-cove/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/talentcove/
│   │   │   │   ├── config/          # Configuration classes
│   │   │   │   ├── controller/      # REST controllers
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── model/           # Entity models
│   │   │   │   ├── repository/      # Data access layer
│   │   │   │   ├── security/        # Security configuration
│   │   │   │   ├── service/         # Business logic
│   │   │   │   └── util/            # Utility classes
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                    # Test files
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── components/              # Reusable components
    │   ├── context/                 # React context providers
    │   ├── Pages/                   # Page components
    │   ├── services/                # API service layer
    │   ├── Data/                    # Static data
    │   └── main.tsx                 # Entry point
    ├── public/                      # Static assets
    └── package.json
```

## 🚦 Getting Started

### Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **npm** or **yarn**
- **Maven** (included via Maven Wrapper)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Run the Spring Boot application**:
   ```bash
   ./mvnw spring-boot:run
   ```
   
   Or on Windows:
   ```bash
   mvnw.cmd spring-boot:run
   ```

3. **Backend will start on**: `http://localhost:8080`

4. **Access H2 Console** (for development):
   - URL: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:talentcove`
   - Username: `sa`
   - Password: (leave empty)

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Frontend will start on**: `http://localhost:5173` (or similar Vite port)

5. **Build for production**:
   ```bash
   npm run build
   ```

## 🔐 Authentication

### Register a New Account

1. Navigate to `/register`
2. Fill in:
   - Full Name
   - Email
   - Password (minimum 6 characters)
   - Account Type (Job Seeker or Employer)
3. Click "Create Account"

### Login

1. Navigate to `/login`
2. Enter your email and password
3. Click "Sign In"

### Protected Routes

The following routes require authentication:
- `/my-profile` - Profile management
- `/my-applications` - View applications
- Job application functionality

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "USER"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "email": "john@example.com",
  "name": "John Doe",
  "role": "USER"
}
```

### Job Endpoints

#### Get All Jobs
```http
GET /api/jobs
```

#### Search Jobs
```http
GET /api/jobs/search?jobTitle=Developer&location=New York&minSalary=70000&maxSalary=150000&sortBy=salary_asc
```

#### Get Job by ID
```http
GET /api/jobs/{id}
```

### Talent Endpoints

#### Get All Talents
```http
GET /api/talents
```

#### Get Talent Profile
```http
GET /api/talents/{id}/profile
```

#### Get My Profile (Authenticated)
```http
GET /api/talents/my-profile
Authorization: Bearer {token}
```

#### Update My Profile
```http
PUT /api/talents/my-profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Doe",
  "role": "Software Engineer",
  "company": "Google",
  "location": "New York, USA",
  "about": "Experienced developer...",
  "skills": ["React", "Node.js", "TypeScript"]
}
```

### Application Endpoints

#### Apply for Job (Authenticated)
```http
POST /api/applications?jobId={jobId}
Authorization: Bearer {token}
```

#### Get My Applications
```http
GET /api/applications/my-applications
Authorization: Bearer {token}
```

#### Check if Applied
```http
GET /api/applications/check/{jobId}
Authorization: Bearer {token}
```

### Experience Management

#### Add Experience
```http
POST /api/talents/my-profile/experiences
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Software Engineer",
  "company": "Google",
  "location": "New York, USA",
  "startDate": "2022-01-01",
  "endDate": null,
  "description": "Worked on...",
  "isCurrent": true
}
```

#### Update Experience
```http
PUT /api/talents/my-profile/experiences/{id}
Authorization: Bearer {token}
```

#### Delete Experience
```http
DELETE /api/talents/my-profile/experiences/{id}
Authorization: Bearer {token}
```

### Certification Management

#### Add Certification
```http
POST /api/talents/my-profile/certifications
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "AWS Certified Solutions Architect",
  "issuer": "Amazon Web Services",
  "issueDate": "2022-03-01",
  "credentialId": "AWS-12345"
}
```

#### Update Certification
```http
PUT /api/talents/my-profile/certifications/{id}
Authorization: Bearer {token}
```

#### Delete Certification
```http
DELETE /api/talents/my-profile/certifications/{id}
Authorization: Bearer {token}
```

## 🎯 Usage Guide

### For Job Seekers

1. **Create Account**: Register with your email and password
2. **Complete Profile**: 
   - Go to "My Profile" from the header menu
   - Add your professional information
   - Add work experience and certifications
   - List your skills
3. **Search Jobs**: 
   - Navigate to "Find Jobs"
   - Use filters to narrow down opportunities
   - Sort by relevance, salary, or date
4. **Apply for Jobs**: 
   - Click "Apply Now" on any job card
   - Track your applications in "My Applications"
5. **Manage Applications**: 
   - View all your applications and their status
   - See application history and details

### For Employers

1. **Register as Employer**: Select "Employer" account type during registration
2. **Search Talent**: 
   - Navigate to "Find Talent"
   - Use filters to find candidates
   - View detailed talent profiles
3. **Review Applications**: 
   - View applications for your posted jobs
   - Manage application status

## 🔧 Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:h2:mem:talentcove
spring.datasource.username=sa
spring.datasource.password=

# JWT Configuration
jwt.secret=your-secret-key-here
jwt.expiration=86400000
```

### Frontend Configuration

Edit `frontend/src/services/api.ts` to change API base URL:

```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Building for Production

### Backend
```bash
cd backend
./mvnw clean package
java -jar target/TalentCove-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend
npm run build
# Output will be in frontend/dist/
```

## 🗄️ Database Schema

### Entities
- **User**: User accounts with authentication
- **Talent**: Professional profiles
- **Job**: Job postings
- **Application**: Job applications
- **Experience**: Work experience entries
- **Certification**: Professional certifications

### Relationships
- User ↔ Talent (One-to-One)
- Talent ↔ Experience (One-to-Many)
- Talent ↔ Certification (One-to-Many)
- Job ↔ Application (One-to-Many)
- Talent ↔ Application (One-to-Many)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: BCrypt password hashing
- **CORS Configuration**: Configured for frontend integration
- **Protected Endpoints**: Role-based access control
- **Input Validation**: Server-side validation for all inputs

## 🚧 Future Enhancements

- [ ] Email notifications for application status
- [ ] Resume upload functionality
- [ ] Profile picture upload
- [ ] Job posting for employers
- [ ] Advanced search with saved searches
- [ ] Job alerts and notifications
- [ ] Messaging system between users and employers
- [ ] Analytics dashboard
- [ ] Social media integration
- [ ] Multi-language support
- [ ] Mobile app (React Native)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

**Built with ❤️ using Spring Boot and React**
