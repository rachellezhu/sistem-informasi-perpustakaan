# Sistem Informasi Perpustakaan Berbasis Web pada SDN Pabelan 2 Kartasura

This project is built by:

**Royan Saifur Robbi - L200190196**
as a final project for graduation requirements.

This project is built using:

- [Laravel 10](https://laravel.com/)
- [Laravel Brezee](https://github.com/laravel/breeze)
- [InertiaJS](https://inertiajs.com/)
- [ReactJS](https://react.dev/)
- [Html5-QRCode](https://github.com/mebjas/html5-qrcode) for barcode scanner
- [React-pdf](https://react-pdf.org/) for creating pdf

## Requirements

|       Req        | Version |
| :--------------: | :-----: |
|       PHP        |  8.1+   |
|     Composer     |  2.4+   |
|      NodeJS      |   18+   |
|       NPM        |   8+    |
| MySQL or MariaDB |         |

## Installation

In the root directory of this project, execute these following commands on terminal:

`composer update`

`npm i` or `npm install`

`php artisan optimize:clear`

`php artisan config:clear`

`php artisan cache:clear`

`php artisan route:clear`

`php artisan view:clear`

`php artisan migrate`

`php artisan key:generate`

`php artisan optimize`

`php artisan serve`

Dev process, execute this command on separated terminal:

`npm run dev`

To build the FE:

`npm run build`

Populate dummy data:

`php artisan db:seed`
