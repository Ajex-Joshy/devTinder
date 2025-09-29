# Frontend Deployment on AWS

## 1. Setup AWS

1. Setup an AWS account.
2. Go to the AWS console.

## 2. Launch EC2 Instance

1. Launch an EC2 instance.
2. Create a key pair for login.

## 3. Connect via SSH

1. Establish an SSH connection.
2. Get into the machine.

## 4. Install Node.js

1. Install Node.js on the machine using curl.
2. Install the same version of Node.js on your local machine.
3. To logout from the machine, type:
   ```
   exit
   ```

## 5. Clone Project Repositories

1. Clone the code from GitHub.
   ```
   git clone link
   ```
2. Clone both backend and frontend repositories.

## 6. Build Frontend

1. First, navigate to the frontend folder.
2. Install packages.
3. Build the frontend.

## 7. Setup Nginx

1. We need Nginx as the HTTP server.
2. Update package list:
   ```
   sudo apt update
   ```
3. Install Nginx:
   ```
   sudo apt install nginx
   ```
4. Start Nginx:
   ```
   sudo systemctl start nginx
   ```
5. Enable Nginx to start on boot:
   ```
   sudo systemctl enable nginx
   ```

## 8. Deploy Frontend Build

1. Copy code from the `dist` folder to `/var/www/html`.
2. From the frontend folder, run:
   ```
   sudo scp -r dist/* /var/www/html
   ```
3. Now the files have been copied.

## 9. Configure Security Groups

1. By default, Nginx will be on port 80.
2. In the EC2 instance, go to Security Groups.
3. Edit inbound rules.
4. Add a rule to allow traffic on port 80.
