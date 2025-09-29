# Backend Deployment Guide

## Initial Setup

1. Navigate to the backend folder.
2. Install the required packages:
   ```
   npm i
   ```
3. If you have made any changes and pushed them to GitHub, pull the latest changes to your cloud machine:
   ```
   git pull
   ```

## Database Configuration

1. To allow your cloud machine to access the database, configure MongoDB to allow access from your AWS instance's public IP:
   - Go to MongoDB Atlas dashboard.
   - Navigate to **Security > Network Access**.
   - Add your AWS instance public IP address.

## Starting the Server

1. Start the backend server:
   ```
   npm start
   ```
2. Make sure to open the backend port (e.g., `3000`) in your cloud machine’s firewall/security group to allow incoming traffic from anywhere (`0.0.0.0/0`).

3. Verify the backend is running by visiting:
   ```
   http://13.60.205.100:3000/feed
   ```

## Keeping the Backend Running Continuously

When you close your terminal, the app stops running. To keep it online all the time, use **pm2**:

1. Install pm2 globally:
   ```
   npm i pm2 -g
   ```
2. Start the backend using pm2:
   ```
   pm2 start npm -- start
   ```
3. Now your backend process will continue running even if you exit or logout.

### pm2 Commands

- View logs:
  ```
  pm2 logs
  ```
- Flush logs for a specific process (e.g., npm):
  ```
  pm2 flush npm
  ```
- List all running processes:
  ```
  pm2 list
  ```
- Stop a process:
  ```
  pm2 stop <process_name>
  ```
  Example:
  ```
  pm2 stop npm
  ```
- Delete a process:
  ```
  pm2 delete npm
  ```
- Start a process with a custom name:
  ```
  pm2 start --name "devTinder-Backend" -- start
  ```

## Frontend and Backend Deployment

- Frontend URL:
  ```
  http://13.60.205.100/
  ```
- Backend URL:
  ```
  http://13.60.205.100:3000/
  ```

### Using a Domain Name (Optional)

If you map your IP address to a domain name, you might want to configure URLs as:

- Frontend:
  ```
  devTinder.com
  ```
- Backend:
  ```
  devTinder.com/api
  ```

We do **not** want to expose the backend on a separate port. Instead, we will use **nginx** to proxy requests to the backend.

## Configuring Nginx Proxy Pass

1. Edit the nginx configuration file:
   ```
   sudo nano /etc/nginx/sites-available/default
   ```
2. Set the server name to your domain or public IP:
   ```
   server_name 13.60.205.100;
   ```
3. Add the following proxy pass rule inside the `server` block to forward `/api/` requests to the backend port (3000):

   ```
   l location /api/ {
        proxy_pass http://localhost:3000/;  # Pass the request to the Node.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
   ```

   **Note:** Be careful to include the trailing slashes (`/api/` and `http://13.60.205.100:3000/`).

4. Save the file and restart nginx:

   ```
   sudo systemctl restart nginx
   ```

5. Verify the proxy is working by visiting:
   ```
   http://13.60.205.100/api/feed
   ```

## Updating Frontend to Use Proxy

1. Change the `BASE_URL` in your frontend constants from:

   ```
   http://localhost:3000
   ```

   to:

   ```
   /api
   ```

2. Push the updated code to GitHub:

   ```
   git push
   ```

3. On your cloud machine, pull the latest changes:

   ```
   git pull
   ```

4. After pulling, rebuild the frontend:

   ```
   npm run build
   ```

5. Copy the `dist` folder (or build output) to the nginx directory to serve the updated frontend code.

Now nginx will serve the updated frontend and proxy backend requests properly.
