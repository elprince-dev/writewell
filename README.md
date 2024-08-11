<p align="center">
  <img src="./public/logo.png" width="300" />
</p>

<p align="center">
	<img src="https://img.shields.io/github/license/mohamedmhussein/writewell?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/mohamedmhussein/writewell?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/mohamedmhussein/writewell?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/mohamedmhussein/writewell?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/Next.js-000000.svg?style=flat&logo=Next.js&logoColor=white" alt="Next.js">
	<img src="https://img.shields.io/badge/MySQL-4479A1.svg?style=flat&logo=MySQL&logoColor=white" alt="MySQL">
	<img src="https://img.shields.io/badge/SCSS-CC6699.svg?style=flat&logo=Sass&logoColor=white" alt="SCSS">
</p>

<p align="center">
	<em>Live on</em> <a href="https://writewell.vercel.app">writewell.vercel.app</a>
</p>

<hr>

## Overview

**WriteWell** is a full-stack web application designed for bloggers to create, share, edit, and delete their blogs seamlessly. The platform is built with modern technologies, ensuring a smooth and responsive user experience. WriteWell leverages the power of Next.js for both the frontend and backend, providing a unified and efficient development environment.

## Features

- **User Authentication**: Secure user login and registration functionality.
- **Create & Share Blogs**: Users can write and publish their blogs with ease.
- **Edit & Delete Blogs**: Bloggers have full control over their content, allowing them to update or remove posts as needed.
- **Image Uploads**: Upload and store images directly to AWS S3 for efficient storage and retrieval.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technology Stack

### Frontend

- **Framework**: Next.js
  - Utilizes server-side rendering for optimal performance.
  - File-based routing for efficient page and API management.

### Backend

- **Framework**: Next.js
  - Built-in API routes for backend logic.

### Database

- **Database**: MySQL
  - Deployed on AWS RDS for reliable and scalable storage.

### Cloud Storage

- **Storage**: AWS S3
  - Stores all user-uploaded images, ensuring secure and scalable media management.

## Project Structure

```sh
└── writewell/
    ├── README.md # Project documentation
    ├── jsconfig.json
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── public/ # Static assets (images, icons, etc.)
    └── src
        ├── app
        │   ├── (root)/ # Authintication pages and root layout
        │   ├── api/ # backend api routes
        │   │   ├── auth
        │   │   │   ├── editProfile
        │   │   │   ├── register
        │   │   │   ├── signin
        │   │   │   └── signout
        │   │   ├── posts
        │   │   │   ├── [id]
        │   │   │   ├── me
        │   │   │   └── route.js
        │   │   └── upload
        │   │       └── route.js
        │   ├── favicon.ico
        │   ├── register
        │   │   ├── layout.js
        │   │   └── page.js
        │   └── signin
        │       ├── layout.js
        │       └── page.js
        ├── brand/ #brand images and files
        │   ├── pdf
        │   │   ├── logo-black.pdf
        │   │   ├── logo-color.pdf
        │   │   ├── logo-no-background.pdf
        │   │   └── logo-white.pdf
        │   ├── png
        │   │   ├── logo-black.png
        │   │   ├── logo-color.png
        │   │   ├── logo-no-background.png
        │   │   └── logo-white.png
        │   └── svg
        │       ├── logo-black.svg
        │       ├── logo-color.svg
        │       ├── logo-no-background.svg
        │       └── logo-white.svg
        ├── components/ # Reusable React components
        │   ├── EditProfile.jsx
        │   ├── Footer.jsx
        │   ├── Home.jsx
        │   ├── Menu.jsx
        │   ├── MyBlogs.jsx
        │   ├── Navbar.jsx
        │   ├── Register.jsx
        │   ├── Signin.jsx
        │   ├── Single.jsx
        │   └── Write.jsx
        ├── config/ # database configuration
        │   └── db.js
        ├── styles/ # scss styles
        │   ├── _variables.scss
        │   ├── editProfile.scss
        │   ├── footer.scss
        │   ├── home.scss
        │   ├── menu.scss
        │   ├── myBlogs.scss
        │   ├── navbar.scss
        │   ├── register.scss
        │   ├── signin.scss
        │   ├── single.scss
        │   └── write.scss
        └── utilities/ # Utility functions and context
            └── UserContext.js
```

## Installation

To get a local copy up and running, follow these steps:

### Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** database

### Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/WriteWell.git
   cd WriteWell
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create an .env file in the root directory with the following keys:

   ```bash
   JWT_SECRET=a-generate-key
   DB_PASSWORD_PROD=database-password
   DB_NAME_PROD=database-name
   DB_PORT_PROD=database-port
   DB_HOST_PROD=database-host
   DB_USER_PROD=database-username
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   AWS_REGION=aws-region
   AWS_BUCKET_NAME=your-s3-bucket-name
   ```

4. **Start the development server**:

   ```bash
   npm run dev

   ```

## Deployment

### AWS Configuration

1.  **Deploy MySQL Database**:

    - Set up an Amazon RDS instance with MySQL.
    - Update the relevent environment variables in the `.env` file.

2.  **AWS S3 Bucket**:

    - Create an S3 bucket and configure it to allow uploads.
    - Update the relevent environment variables in the `.env` file.

3.  **Deploy on Vercel** (or another hosting provider):

    - Connect your GitHub repository to Vercel.
    - Configure environment variables on Vercel as done locally.
    - Deploy the app directly from your Git repository.

## Usage

- **Homepage**: View a list of all blogs.
- **Write Blog**: Log in and use the editor to create and publish new blog posts.
- **Edit/Delete Blog**: Navigate to your blog post and use the provided options to edit or delete it.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
