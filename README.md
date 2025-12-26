# Sistem Informasi Perpustakaan Berbasis Web pada SDN Pabelan 2 Kartasura

This project was built by:

**Royan Saifur Robbi - L200190196**

as part of the graduation requirements.

This project was built using:

- [Laravel 10](https://laravel.com/)
- [Laravel Brezee](https://github.com/laravel/breeze)
- [InertiaJS](https://inertiajs.com/)
- [ReactJS](https://react.dev/)
- [Html5-QRCode](https://github.com/mebjas/html5-qrcode) for the barcode scanner
- [React-pdf](https://react-pdf.org/) for creating PDFs

## Requirements

|       Req        | Version |
| :--------------: | :-----: |
|       PHP        |  8.1+   |
|     Composer     |  2.4+   |
|      NodeJS      |   18+   |
|       NPM        |   8+    |
| MySQL or MariaDB |         |

## Installation

Execute the following commands in the terminal in the root directory of this project:

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

`php artisan serve` or `php artisan ser`

For development, execute this command in a separated terminal:

`npm run dev`

To build the FE:

`npm run build`

To populate dummy data execute the command below before `php artisan serve` or `php artisan ser`:

`php artisan db:seed`

Sorry for the boilerplatey code. Good luck!
