FROM php:8.3-fpm

WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && \
    apt-get install -y \
        git \
        unzip \
        libzip-dev \
        zip \
        default-mysql-client

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql zip

# Install composer globally
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# 1. Copy the entire application first
COPY . .

# 2. Now run composer install
RUN composer install --no-interaction --optimize-autoloader

# Expose the PHP-FPM standard port (9000) for NGINX to connect
EXPOSE 9000

# Start the PHP-FPM server
CMD ["php-fpm"]



# FROM php:8.3-fpm

# WORKDIR /var/www/html

# RUN apt-get update && \
#     apt-get install -y \
#         git \
#         unzip \
#         libzip-dev \
#         zip \
#         default-mysql-client

# RUN docker-php-ext-install pdo_mysql zip

# RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
#     && php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# COPY . .

# RUN composer install --no-interaction --optimize-autoloader

# EXPOSE 8000

# CMD ["php-fpm"]



# FROM php:8.3-fpm

# WORKDIR /var/www/html

# RUN apt-get update && apt-get install -y \
#     git \
#     unzip \
#     libzip-dev \
#     zip \
#     && docker-php-ext-install pdo_mysql zip

# RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
#     && php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# COPY . .

# RUN composer install --no-interaction --optimize-autoloader

# EXPOSE 8000

# CMD ["php-fpm"]

