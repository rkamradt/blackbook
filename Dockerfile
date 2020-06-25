FROM nginx:1.18-alpine
COPY build/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
