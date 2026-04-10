# PWA Icons Setup Guide

Untuk membuat PWA fully functional, kamu perlu menambahkan icon di folder `public/icons/`.

## Required Icons:

1. **icon-192x192.png** - 192x192 pixels
2. **icon-512x512.png** - 512x512 pixels
3. **apple-touch-icon.png** - 180x180 pixels (optional tapi recommended)
4. **favicon.ico** - 32x32 pixels (sudah ada)

## Cara Membuat Icons:

### Option 1: Gunakan Online Generator (Recommended)
1. Buka https://www.pwabuilder.com/imageGenerator
2. Upload logo WELLI (PNG/SVG)
3. Download package
4. Extract dan copy file ke `public/icons/`

### Option 2: Manual dengan Figma/Photoshop
1. Buat logo dengan ukuran 512x512px
2. Export sebagai PNG
3. Resize ke 192x192px
4. Save sebagai `icon-192x192.png` dan `icon-512x512.png`

### Option 3: Gunakan Sharp (Node.js)
Jika punya logo SVG:
```bash
npm install -g sharp-cli
sharp input.svg -o public/icons/icon-192x192.png resize 192 192
sharp input.svg -o public/icons/icon-512x512.png resize 512 512
```

## Icon Guidelines:
- **Format**: PNG dengan background transparan (optional)
- **Style**: Simple, recognizable even in small size
- **Safe Zone**: Keep main content in center 80% area
- **Colors**: Sesuai branding WELLI (primary: #135bec)

## Setelah Icons Ready:
```bash
npm run build
```

Icons akan otomatis di-copy ke `dist/` saat build.

## Testing PWA:
1. Deploy ke Vercel/Netlify
2. Buka di Chrome Mobile
3. Harus muncul "Add to Home Screen" popup
4. Test offline mode (airplane mode)

---

**Note**: Build sudah berhasil generate service worker dan manifest. Tinggal tambahin icons aja!
