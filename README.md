# Building a Modern Docs Platform with Django, Next.js, CKEditor, and Google OAuth

⭐️ Thanks to [CKEditor](https://ckeditor.com/) parterning with us on this course!

## Course Resources
- 🎥 **YouTube video**: [Watch the course](https://youtu.be/OGCE3OUO4G8)
- 💽 **GitHub code**: [Project repository](https://github.com/codingforentrepreneurs/google-docs-with-django-nextjs)
- 🐍 **Boilerplate code** [Django x Next.js](https://djangonextjs.com)

## Course Topics

### Full-Stack Integration
- ✅ Full-stack web development with Django and Next.js
- ✅ Setting up Django backend with production-ready configuration
- ✅ Configuring Next.js frontend for modern user experience
- ✅ PostgreSQL database setup via Docker Compose

### Authentication & User Management
- ✅ Complete Google OAuth implementation from scratch
- ✅ OAuth state and PKCE token generation and management
- ✅ Django caching for secure OAuth token handling
- ✅ Custom Django user model with email-first authentication
- ✅ User registration flows for both email and Google login
- ✅ Token verification and refresh mechanisms

### Document Editor & Collaboration
- ✅ CKEditor integration for rich document editing
- ✅ Real-time collaboration with Django-based users via CKEditor
- ✅ TailwindCSS configuration with CKEditor
- ✅ AI assistance integration with custom adapters
- ✅ Multi-user real-time document collaboration

### Security & API Development
- ✅ JWT token signatures for secure user authentication
- ✅ API endpoints for user tokens and document management

## Prerequisites

### Python
- Knowledge of classes, functions, async/await, and working with HTTP requests
- Understanding of virtual environments and package management

### Django Basics
- Familiarity with views, URL routing, models, and the Django ORM
- Understanding Django's authentication system and middleware

### JavaScript and React
- ES6+ features, async/await, and working with APIs
- React hooks, context, and component lifecycle

### Authentication Knowledge
- Basic understanding of OAuth authentication flows
- Knowledge of JWT tokens and authentication mechanisms

---

This comprehensive course provides everything you need to build a production-ready Google-docs-like collaboration platform with modern authentication and real-time editing & collaboration features.



## Video Chapters

### Google Docs with Next.js, Django & CKEditor

- [Google Docs with Next.js, Django & CKEditor](https://youtu.be/OGCE3OUO4G8?t=9)
- [Getting started - Tech Stack](https://youtu.be/OGCE3OUO4G8?t=252)

### Django x Next.js
- [Starting Django x Nextjs Integration](https://youtu.be/OGCE3OUO4G8?t=655)
- [Django Backend Baseline Setup](https://youtu.be/OGCE3OUO4G8?t=728)
- [Nextjs Frontend Setup](https://youtu.be/OGCE3OUO4G8?t=1009)
- [Postgres Database via Docker Compose](https://youtu.be/OGCE3OUO4G8?t=1139)
- [Register Users with Django & Next.js](https://youtu.be/OGCE3OUO4G8?t=1443)
- [We Need Google Auth](https://youtu.be/OGCE3OUO4G8?t=1765)

### Google Login from Scratch with Django and OAuth
- [Mini Django Project for Google Login](https://youtu.be/OGCE3OUO4G8?t=1960)
- [Minimal Django Project Setup](https://youtu.be/OGCE3OUO4G8?t=2142)
- [Google Cloud and the Google Auth Platform](https://youtu.be/OGCE3OUO4G8?t=2363)
- [OAuth Flow + Django Views](https://youtu.be/OGCE3OUO4G8?t=2982)
- [Generate OAuth State and PKCE Tokes](https://youtu.be/OGCE3OUO4G8?t=3231)
- [OAuth Callback URL](https://youtu.be/OGCE3OUO4G8?t=3382)
- [Generate the Google OAuth Login URL](https://youtu.be/OGCE3OUO4G8?t=3598)
- [Django Caching for OAuth State & PKCE](https://youtu.be/OGCE3OUO4G8?t=4083)
- [Finalize Login URL with Google Auth Client](https://youtu.be/OGCE3OUO4G8?t=4352)
- [Handle the Google OAuth Callback](https://youtu.be/OGCE3OUO4G8?t=4751)
- [Verify Callback Token](https://youtu.be/OGCE3OUO4G8?t=5258)
- [Create Django User from Google User](https://youtu.be/OGCE3OUO4G8?t=5638)
- [Scopes for Google OAuth](https://youtu.be/OGCE3OUO4G8?t=6190)
- [Finalize Django Login for Google User](https://youtu.be/OGCE3OUO4G8?t=6477)
- [Unlocking Django App Portability](https://youtu.be/OGCE3OUO4G8?t=6746)

### Customize Django User Model with Google Login
- [Email-based User Model in Django](https://youtu.be/OGCE3OUO4G8?t=7090)
- [Before you replace the User model](https://youtu.be/OGCE3OUO4G8?t=7200)
- [Replace the Default User Model](https://youtu.be/OGCE3OUO4G8?t=7742)
- [Customizing the Custom User Model](https://youtu.be/OGCE3OUO4G8?t=8170)
- [Modify Next.js Login Form](https://youtu.be/OGCE3OUO4G8?t=8517)
- [Improved Login Flow from Django API](https://youtu.be/OGCE3OUO4G8?t=8811)
- [Sign Up Flow for Email-based Users](https://youtu.be/OGCE3OUO4G8?t=9343)
- [User Display Name](https://youtu.be/OGCE3OUO4G8?t=9563)
- [Google Login API Endpoints](https://youtu.be/OGCE3OUO4G8?t=9739)
- [Google Auth Client and Django Config](https://youtu.be/OGCE3OUO4G8?t=10199)
- [Next.js Google Login Button & Redirect](https://youtu.be/OGCE3OUO4G8?t=10630)
- [Handle the Google Callback in Next.js](https://youtu.be/OGCE3OUO4G8?t=10946)
- [Active vs Inactive Accounts](https://youtu.be/OGCE3OUO4G8?t=11352)
- [Verify User in Next.js with TokenFetcher](https://youtu.be/OGCE3OUO4G8?t=11533)
- [Perform Token Refresh](https://youtu.be/OGCE3OUO4G8?t=12032)

### Basic Docs
- [Documents App and Basic Model](https://youtu.be/OGCE3OUO4G8?t=12625)
- [Doc Model Schema with Django Ninja](https://youtu.be/OGCE3OUO4G8?t=12943)
- [API List View for User Documents](https://youtu.be/OGCE3OUO4G8?t=13092)
- [Caching to Speed Up Django QuerySets](https://youtu.be/OGCE3OUO4G8?t=13439)
- [List View for Docs in Next.js](https://youtu.be/OGCE3OUO4G8?t=13799)
- [Client Side Login Required with useSWR](https://youtu.be/OGCE3OUO4G8?t=14203)
- [Client-Side Docs Detail View](https://youtu.be/OGCE3OUO4G8?t=14472)
- [Dynamic URL Routing in Django Ninja](https://youtu.be/OGCE3OUO4G8?t=14778)
- [Get Document Detail Service](https://youtu.be/OGCE3OUO4G8?t=14907)
- [Exception Handling for Permissions and Not Found](https://youtu.be/OGCE3OUO4G8?t=15045)
- [API Endpoints for Updating Documents](https://youtu.be/OGCE3OUO4G8?t=15538)
- [Frontend Form to Update Document](https://youtu.be/OGCE3OUO4G8?t=15849)
- [Create Documents in Backend API & Frontend](https://youtu.be/OGCE3OUO4G8?t=16568)
- [Challenge: Create a Delete View](https://youtu.be/OGCE3OUO4G8?t=16901)

### CKEditor as Docs Editor
- [Intro to CKEditor](https://youtu.be/OGCE3OUO4G8?t=17017)
- [Install CKEditor in NextJS](https://youtu.be/OGCE3OUO4G8?t=17417)
- [Swap Textarea with CKEditor](https://youtu.be/OGCE3OUO4G8?t=17862)
- [Save CKEditor Contents to Database](https://youtu.be/OGCE3OUO4G8?t=18086)
- [Adding new features & the CKEditor Builder](https://youtu.be/OGCE3OUO4G8?t=18442)
- [Using TailwindCSS with CKEditor](https://youtu.be/OGCE3OUO4G8?t=18684)
- [Autosave with CKEditor](https://youtu.be/OGCE3OUO4G8?t=18940)
- [Adding Any Standard Plugin](https://youtu.be/OGCE3OUO4G8?t=19133)
- [Managing the CKEditor License Key](https://youtu.be/OGCE3OUO4G8?t=19290)
- [Using AI Assistant Plugin with a Custom Adapter](https://youtu.be/OGCE3OUO4G8?t=19545)
- [Proxied AI Responses with Django](https://youtu.be/OGCE3OUO4G8?t=19937)

### Multi-User Collaboration
- [Collaboration Basics with CKEditor](https://youtu.be/OGCE3OUO4G8?t=20726)
- [Multiple Users for the Django Documents Model](https://youtu.be/OGCE3OUO4G8?t=20712)
- [Creating the CKEditor User Token Payload](https://youtu.be/OGCE3OUO4G8?t=21571)
- [JWT Token Signature for CKEditor](https://youtu.be/OGCE3OUO4G8?t=21909)
- [Django Ninja API Endpoint for CKEditor User Tokens](https://youtu.be/OGCE3OUO4G8?t=22152)
- [CKEditor Loading our Custom JWT User Tokens](https://youtu.be/OGCE3OUO4G8?t=22413)
- [A final challenge](https://youtu.be/OGCE3OUO4G8?t=22467)


