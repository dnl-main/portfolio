FROM php:8.3-fpm

WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    zip \
    && docker-php-ext-install pdo_mysql zip

# Install composer globally
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer

# 1. Copy the entire application first (including artisan)
COPY . .

# 2. Now run composer install
# We use --no-interaction to prevent the build from hanging
RUN composer install --no-interaction --optimize-autoloader

# Expose port
EXPOSE 8000

# Start the PHP-FPM server
CMD ["php-fpm"]