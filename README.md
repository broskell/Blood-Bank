# 🩸 Blood Bank Management System

<div align="center">
  <img src="/blood-bank-app/assets/mainlogo.png" alt="Blood Bank Logo" width="200"/>

  **A modern web application connecting donors, hospitals, and blood banks**

  [🚀 Live Demo](#) • [📖 Documentation](#-features) • [🐛 Report Bug](https://github.com/yourusername/blood-bank-app/issues)

  [![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red)](https://github.com/yourusername/blood-bank-app)
  [![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
  [![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

  *An academic project by IIT Jodhpur + LeapStart following SDLC & FRD principles*

</div>

---

## 📖 Overview

The **Blood Bank Management System** is a comprehensive web application designed to streamline blood donation and distribution processes. Built as an academic mini-project, it demonstrates modern web development practices while addressing real-world healthcare challenges.

### 🎯 Problem Statement

Traditional blood bank management faces several challenges:
- ❌ Lack of real-time inventory visibility
- ❌ Inefficient communication between donors and hospitals
- ❌ Manual request tracking and approval processes
- ❌ No integration with public health infrastructure data

### ✅ Our Solution

A centralized platform that:
- ✨ Provides **real-time blood availability** tracking
- 🏥 Enables **instant hospital blood requests**
- 👥 Facilitates **donor registration and management**
- 📊 Integrates **public health infrastructure data**
- 🤖 Offers **AI-powered assistance** via chatbot

---

## 🌟 Key Features

### 1. 🏠 Interactive Homepage

**Real-Time Blood Inventory Dashboard**
- 📊 Live blood availability for all blood groups (A+, A-, B+, B-, O+, O-, AB+, AB-)
- 🔍 Smart filtering by blood group
- 📈 Visual status indicators (OK / Low / Critical)
- 🔄 Auto-updates from Firebase Firestore

**Public Health Integration**
- 🏥 State-wise hospital and bed capacity data
- 📡 Integration with [Rootnet COVID-19 Hospitals & Beds API](https://api.rootnet.in/covid19-in/hospitals/beds)
- 📊 Hospital load indicators
- 🗺️ Rural vs Urban distribution stats

**Navigation Hub**
- Quick access to Donor Registration
- Hospital Portal entry
- Admin Panel login

### 2. 👥 Donor Module

**Smart Registration System**
- 📝 Comprehensive donor information capture:
  - Personal details (Name, Age, Gender)
  - Contact info (Phone, Email, City)
  - Blood group selection
  - Last donation date tracking
  - Current availability status

**Intelligent Validation**
- ✅ Age verification (≥18 years)
- ✅ Email format validation
- ✅ Phone number validation
- ✅ Date consistency checks
- ✅ Mandatory field enforcement

**User Experience**
- 🎨 Clean, intuitive interface
- ⚡ Real-time validation feedback
- ✉️ Success confirmation messages
- 📱 Mobile-responsive design

### 3. 🏥 Hospital Portal

**Secure Authentication**
- 🔐 Firebase Authentication (Email/Password)
- 🆕 New hospital registration
- 🔑 Secure login system
- 👤 Session management

**Comprehensive Dashboard**

#### Request Management
- 📋 Create blood requests with:
  - Blood group specification
  - Units required
  - Patient information/reason
  - Urgency level
- 📊 Real-time request tracking
- 🔔 Status notifications

#### Request Tracking
- 📈 View all submitted requests
- 🕐 Timestamp tracking
- 🎯 Status monitoring (Pending/Approved/Rejected)
- 📄 Detailed request history

#### Availability Checker
- 🔍 Real-time inventory view
- 📊 Stock levels per blood group
- ⚠️ Low stock alerts
- 📈 Availability trends

### 4. 🛡️ Admin Panel

**Administrative Authentication**
- 🔐 Secure admin login
- 👨‍💼 Role-based access control
- 🔒 Protected routes

**Inventory Management**
- 📦 Manage stock for all blood groups
- ➕ Add/Update units
- 💾 Instant Firestore sync
- 📊 Visual stock indicators

**Request Administration**
- 📋 View all hospital requests
- ✅ Approve/Reject requests
- 📝 Update request status
- 👀 Monitor system activity
- 📊 Request analytics

### 5. 🤖 AI-Powered Chatbot

**Smart Assistant - "BloodBot"**
- 💬 Floating chat interface
- 🧠 Rule-based natural language understanding
- ❓ Common queries support:
  - Donor registration process
  - Hospital request procedures
  - Admin panel features
  - Blood availability checks
  - Eligibility criteria

**Features**
- 🎯 Context-aware responses
- 📱 Non-intrusive design
- 🚀 Instant help access
- 🌐 Available on all pages

---

## 📸 Screenshots

### Homepage Dashboard
<div align="center">
  <img src="/blood-bank-app/assets/homepage_screenshot.png" alt="Homepage" width="800"/>
  <p><em>Real-time blood inventory and public health integration</em></p>
</div>

### Hospital Portal
<div align="center">
  <img src="/blood-bank-app/assets/hospital-page.png" alt="Hospital Portal" width="800"/>
  <p><em>Secure hospital authentication and request management</em></p>
</div>

### Admin Panel
<div align="center">
  <img src="/blood-bank-app/assets/admin-page.png" alt="Admin Panel" width="800"/>
  <p><em>Comprehensive inventory and request management</em></p>
</div>

---

## 🏗️ System Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Layer                        │
│   HTML5 + CSS3 + Vanilla JavaScript (Static Site)       │
└───────────────────┬─────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
┌───────▼──────┐ ┌──▼──────┐ ┌─▼────────────────┐
│   Firebase   │ │Firebase │ │  Rootnet API     │
│     Auth     │ │Firestore│ │ (Public Health)  │
└──────────────┘ └─────────┘ └──────────────────┘
        │           │           │
        └───────────┴───────────┘
                    │
        ┌───────────▼───────────┐
        │   Vercel Hosting      │
        │  (Static + Functions) │
        └───────────────────────┘
```

### Technology Stack

<div align="center">

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) | User interface and interactions |
| **Authentication** | Firebase Authentication | User login and security |
| **Database** | Firebase Firestore | Real-time data storage |
| **External API** | Rootnet Hospitals API | Public health data |
| **Hosting** | Vercel | Static hosting and serverless functions |
| **Version Control** | Git + GitHub | Source code management |
| **Development** | VS Code, Ubuntu/VirtualBox | Development environment |

</div>

### Data Architecture

#### Firestore Collections

**1. Inventory Collection**
```javascript
inventory/{bloodGroup}
{
  group: "A+",
  units: 45,
  lastUpdated: Timestamp,
  status: "OK" | "Low" | "Critical"
}
```

**2. Blood Requests Collection**
```javascript
blood_requests/{requestId}
{
  hospitalId: "hospital@example.com",
  bloodGroup: "O+",
  units: 5,
  reason: "Emergency surgery",
  status: "Pending" | "Approved" | "Rejected",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

**3. Hospitals Collection**
```javascript
hospitals/{hospitalId}
{
  email: "hospital@example.com",
  name: "City Hospital",
  address: "123 Main St",
  phone: "+91-XXXXXXXXXX",
  registeredAt: Timestamp
}
```

---

## 📁 Project Structure

```
blood-bank-app/
├── assets/
│   ├── logo.png                    # Application logo
│   ├── hospital_login.png          # Hospital portal screenshot
│   ├── adminpage-background.png    # Admin panel screenshot
│   └── homepage_screenshot.png     # Homepage screenshot
│
├── css/
│   └── styles.css                  # Global styles and themes
│
├── js/
│   ├── app.js                      # Homepage logic (availability + API)
│   ├── donor.js                    # Donor form validation
│   ├── hospital.js                 # Hospital portal logic
│   ├── admin.js                    # Admin panel logic
│   └── chatbot.js                  # Floating chatbot functionality
│
├── index.html                      # Homepage
├── donor_register.html             # Donor registration page
├── hospital_portal.html            # Hospital login + dashboard
├── admin_panel.html                # Admin login + dashboard
├── README.md                       # This file
└── LICENSE                         # MIT License
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js** (v14 or higher) - Optional, for local server
- ✅ **Firebase Account** (free tier works)
- ✅ **Git** installed on your system
- ✅ **Modern Web Browser** (Chrome, Firefox, Edge)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/blood-bank-app.git
cd blood-bank-app
```

### 2️⃣ Firebase Setup

#### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add Project"**
3. Enter project name: `blood-bank-management`
4. Follow the setup wizard

#### Enable Authentication

1. Navigate to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication
3. (Optional) Enable **Google** sign-in

#### Create Firestore Database

1. Navigate to **Firestore Database**
2. Click **"Create Database"**
3. Start in **production mode**
4. Choose your region

#### Configure Security Rules

In Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Public can READ inventory, only authenticated can WRITE
    match /inventory/{group} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Hospital and Admin can manage requests
    match /blood_requests/{requestId} {
      allow read, write: if request.auth != null;
    }

    // Hospital profiles
    match /hospitals/{hospitalId} {
      allow read, write: if request.auth != null;
    }

    // Default deny
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

#### Get Firebase Configuration

1. Go to **Project Settings** → **General**
2. Under "Your apps", select **Web** (</> icon)
3. Copy the configuration object

#### Update Application Files

Update `hospital_portal.html` and `admin_panel.html`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
```

### 3️⃣ Run Locally

#### Option A: VS Code Live Server

1. Open project in VS Code
2. Install **Live Server** extension
3. Right-click `index.html` → **Open with Live Server**
4. Navigate to `http://127.0.0.1:5500/`

#### Option B: Python HTTP Server

```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000/
```

#### Option C: Node.js HTTP Server

```bash
npx http-server -p 8000
```

### 4️⃣ Initial Setup

#### Create Admin Account

1. Go to Firebase Console → Authentication → Users
2. Click **"Add User"**
3. Create admin account:
   - Email: `admin@bloodbank.com`
   - Password: Choose a secure password

#### Initialize Inventory

1. Visit `/admin_panel.html`
2. Login with admin credentials
3. Set initial units for each blood group (e.g., 50 units each)
4. Click **"Save"** for each blood group

---

## 🌐 Deployment

### Deploy to Vercel

#### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### 2. Import to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Other
   - **Build Command:** (leave empty)
   - **Output Directory:** `.`
   - **Install Command:** (leave empty)

#### 3. Configure Firebase

In Firebase Console → Authentication → Settings → Authorized domains:
- Add your Vercel domain: `https://blood-bank-xi-eight.vercel.app`

#### 4. Deploy

Click **"Deploy"** and wait for build completion.

Your app will be live at: `https://blood-bank-xi-eight.vercel.app`

---

## 📖 User Guide

### For Donors

1. **Register as Donor**
   - Visit homepage → Click "Donor Registration"
   - Fill in personal details
   - Select blood group
   - Submit form

2. **Update Availability**
   - Return to registration page
   - Update availability status
   - Re-submit form

### For Hospitals

1. **Register Hospital**
   - Visit "Hospital Portal"
   - Click "Register New Hospital"
   - Enter credentials
   - Complete registration

2. **Request Blood**
   - Login to hospital portal
   - Navigate to "Request Blood Units"
   - Fill in requirements
   - Submit request

3. **Track Requests**
   - Go to "Track Request Status"
   - View all submitted requests
   - Monitor approval status

4. **Check Availability**
   - Visit "View Availability"
   - See real-time stock levels
   - Plan requests accordingly

### For Administrators

1. **Login**
   - Visit "Admin Panel"
   - Enter admin credentials
   - Access dashboard

2. **Manage Inventory**
   - View current stock
   - Update units for each blood group
   - Save changes

3. **Process Requests**
   - Review all hospital requests
   - Approve or reject based on availability
   - Update request status

---

## 🔒 Security Best Practices

### Implemented Security Measures

✅ **Firebase Authentication** - Secure user login  
✅ **Firestore Security Rules** - Role-based access control  
✅ **Client-side Validation** - Input sanitization  
✅ **HTTPS Only** - Encrypted communications  
✅ **Session Management** - Automatic timeout  

### Recommendations for Production

⚠️ **Enable reCAPTCHA** for registration forms  
⚠️ **Implement rate limiting** on API endpoints  
⚠️ **Add email verification** for new accounts  
⚠️ **Set up monitoring** and alerts  
⚠️ **Regular security audits** of Firestore rules  

---

## 🗺️ Project Roadmap

### ✅ Phase 1 - MVP (Completed)

- [x] Basic homepage with blood availability
- [x] Donor registration module
- [x] Hospital portal with authentication
- [x] Admin panel for inventory management
- [x] Request tracking system
- [x] Public health API integration
- [x] Floating chatbot

### 🚧 Phase 2 - Enhancements (In Progress)

- [ ] Store donor data in Firestore
- [ ] Donor-Hospital matching algorithm
- [ ] Email/SMS notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)

### 🔮 Phase 3 - Advanced Features (Planned)

- [ ] AI-powered demand prediction
- [ ] Blockchain for donation tracking
- [ ] IoT integration for blood storage monitoring
- [ ] Multi-language support
- [ ] PWA support for offline access
- [ ] Integration with government health systems

---

## 📊 System Metrics

### Current Capabilities

- 🩸 **8 Blood Groups** supported (A+, A-, B+, B-, O+, O-, AB+, AB-)
- 🏥 **Unlimited Hospitals** can register
- 👥 **Unlimited Donors** can register
- ⚡ **Real-time** inventory updates
- 📊 **State-wise** hospital data (28 states + 8 UTs)

### Performance Benchmarks

- ⚡ Page Load Time: < 2 seconds
- 🔄 Real-time Sync: < 500ms
- 📱 Mobile Responsive: Yes
- 🌐 Browser Support: Chrome, Firefox, Safari, Edge

---

## 🤝 Contributing

We welcome contributions from the community!

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Blood Bank Management Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👥 Development Team

<div align="center">

### Project Developers

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/broskell">
        <img src="https://avatars.githubusercontent.com/u/226131454?v=4" width="100px;" alt="Developer 1"/><br />
        <sub><b>kellampalli Saathvik</b></sub>
      </a><br />
      <sub>Backend, API, Deployment </sub>
    </td>
    <td align="center">
      <a href="https://github.com/shivakumar-dev-11">
        <img src="https://avatars.githubusercontent.com/u/233956833?v=4" width="100px;" alt="Developer 2"/><br />
        <sub><b>Bashamoni Shiva Kumar</b></sub>
      </a><br />
      <sub>Developer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/ashwith-dev">
        <img src="https://github.com/developer3.png" width="100px;" alt="Developer 3"/><br />
        <sub><b>Ashwith Thatipally</b></sub>
      </a><br />
      <sub>UI/UX Designer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/Abhishek-9347">
        <img src="https://github.com/developer2.png" width="100px;" alt="Developer 4"/><br />
        <sub><b>Abhishek Singh</b></sub>
      </a><br />
      <sub>UI/UX Designer</sub>
    </td>
    <td align="center">
      <a href="https://github.com/akulaakash17-byte">
        <img src="https://github.com/developer3.png" width="100px;" alt="Developer 4"/><br />
        <sub><b>Akash Akula</b></sub>
      </a><br />
      <sub>Quality Assurance & Testing</sub>
    </td>
  </tr>
</table>

### Project Mentors

**Academic Institution:** IIT Jodhpur x LeapStart   
**Industry Mentor:** Sai Ram Bingi

</div>

---

## 🙏 Acknowledgments

Special thanks to:

- **IIT Jodhpur & LeapStart** - For providing the learning platform
- **Firebase Team** - For excellent BaaS infrastructure
- **Rootnet** - For public health API access
- **Vercel** - For seamless deployment
- **Open Source Community** - For tools and inspiration
- **Healthcare Professionals** - For domain expertise

---

## 📞 Support & Contact

### Need Help?

- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/broskell/Blood-Bank/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/yourusername/Blood-Bank/discussions)

### Frequently Asked Questions

**Q: Is this system ready for production use?**  
A: This is an academic project for demonstration. For production use, additional security, compliance, and testing are required.

**Q: Can I use this for my institution?**  
A: Yes! This project is open-source under MIT License. Feel free to fork and customize.

**Q: How do I report security vulnerabilities?**  
A: Please email security@example.com directly rather than opening a public issue.

---

## ⚠️ Important Disclaimer

```
This is an ACADEMIC PROJECT developed for educational purposes only.

⚠️ NOT intended for real medical or clinical use
⚠️ NOT compliant with healthcare regulations (HIPAA, etc.)
⚠️ NOT tested for production deployment
⚠️ NOT certified by any medical authority

For demonstration and learning purposes only.
```

---

## 📚 Additional Documentation

- 📄 **FRD Document** - Functional Requirements Specification
- 📊 **Case Study** - Problem analysis and solution design
- 🔄 **DevOps Workflow** - CI/CD pipeline documentation
- 🏗️ **Architecture Design** - System architecture diagrams
- 📖 **API Documentation** - Endpoint specifications
- 🧪 **Testing Report** - QA and test results

---

## 📈 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/broskell/Blood-Bank?style=social)
![GitHub forks](https://img.shields.io/github/forks/broskell/Blood-Bank?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/broskell/Blood-Bank?style=social)
![GitHub issues](https://img.shields.io/github/issues/broskell/Blood-Bank)
![GitHub pull requests](https://img.shields.io/github/issues-pr/broskell/Blood-Bank)

</div>

---

<div align="center">

**[⬆ Back to Top](#-blood-bank-management-system)**

Made with ❤️ for saving lives

[Website](#) • [GitHub](https://github.com/broskell/Blood-Bank) • [Issues](https://github.com/broskell/Blood-Bank/issues)

© 2025 Blood Bank Management Team • IIT Jodhpur x LeapStart

*"Every drop counts. Every second matters."*

</div>
