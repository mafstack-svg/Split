# Split

Do'stlar, sayohat va yig'inlar uchun xarajatlarni adolatli bo'lishish ilovasi. Oddiy HTML, CSS va JavaScript, hech qanday build kerak emas.

## Fayllar va qayerni o'zgartirish

| Fayl | Nima uchun |
|---|---|
| `index.html` | Sahifa tuzilishi, oynalar (modal) |
| `css/style.css` | Barcha ranglar va dizayn. Ranglar `:root` ichida |
| `js/i18n.js` | Barcha matnlar (UZ/RU) va rasm yo'llari |
| `js/core.js` | Holat (LocalStorage), valyuta, hisoblash algoritmi |
| `js/ui.js` | Ekranlar (Guruh, Xarajat, Hisob) va tugmalar |
| `js/receipt.js` | Chek oynasi, matnni nusxalash, rasm (.png) saqlash |
| `js/pwa.js` | "Ilovani o'rnatish" tugmasi |
| `js/main.js` | Ishga tushirish va USD kursini olish |
| `sw.js` | Oflayn ishlash. Fayl o'zgartirsangiz `VERSION` raqamini oshiring |
| `manifest.json` | Ilova nomi, ikonkalari |
| `assets/` | Uchta rasm |
| `icons/` | Ilova ikonkalari |

## GitHub Pages orqali joylash

1. Papka ichidagi fayllarni GitHub repozitoriyga yuklang (`index.html` repozitoriyning ildizida bo'lsin).
2. Repozitoriyda Settings, Pages bo'limiga kiring.
3. Source: Deploy from a branch, branch: `main`, papka: `/ (root)`.
4. Bir necha daqiqadan keyin `https://<login>.github.io/<repo>/` manzilida ochiladi.

GitHub Pages HTTPS beradi, shuning uchun "Ilovani o'rnatish" tugmasi ishlaydi.

## Mahalliy sinash

O'rnatish va oflayn rejim uchun server kerak:

```
python3 -m http.server 8000
```

keyin `http://localhost:8000` ni oching.
