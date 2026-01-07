# Panduan Menambah Tema Baru

Dokumen ini menjelaskan langkah-langkah lengkap untuk menambahkan tema baru ke sistem tema aplikasi.

## Struktur Tema

Setiap tema terdiri dari:
- **Nama tema** (contoh: "mytheme")
- **Light variant** (contoh: "mytheme")
- **Dark variant** (contoh: "mytheme-dark")
- **CSS variables** untuk light dan dark mode

## Langkah-Langkah Menambah Tema

### 1. Update Theme Config (`components/ThemeSwitcher.tsx`)

Tambahkan entry baru ke `themeConfig.styles`:

```typescript
const themeConfig = {
  styles: {
    // ... tema existing
    mytheme: {
      light: "mytheme",
      dark: "mytheme-dark"
    }
  } as const,
  modes: ["light", "dark"] as const
} as const
```

### 2. Update Theme Provider (`components/ThemeProvider.tsx`)

Tambahkan tema baru ke array `themes`:

```typescript
<NextThemesProvider
  themes={["light", "dark", "twitter", "twitter-dark", "modern", "modern-dark", "mytheme", "mytheme-dark"]}
  {...props}
>
```

### 3. Tambah CSS Variables (`app/globals.css`)

Tambahkan selector CSS untuk tema baru di akhir file, sebelum `@theme inline`:

#### Light Mode:
```css
.mytheme {
  --background: oklch(...);
  --foreground: oklch(...);
  /* ... semua variables dari :root */
}
```

#### Dark Mode:
```css
.mytheme-dark {
  --background: oklch(...);
  --foreground: oklch(...);
  /* ... semua variables dari .dark */
}
```

### 4. Update Tailwind Custom Variant (`app/globals.css`)

Tambahkan tema dark baru ke `@custom-variant dark`:

```css
@custom-variant dark (&:is(.dark *, .twitter-dark *, .modern-dark *, .mytheme-dark *));
```

## Contoh Lengkap

Untuk menambah tema "ocean":

### 1. components/ThemeSwitcher.tsx
```typescript
ocean: {
  light: "ocean",
  dark: "ocean-dark"
}
```

### 2. components/ThemeProvider.tsx
```typescript
themes={["light", "dark", "twitter", "twitter-dark", "modern", "modern-dark", "ocean", "ocean-dark"]}
```

### 3. app/globals.css
```css
.ocean {
  --background: oklch(0.95 0.02 200);
  --foreground: oklch(0.2 0.01 200);
  /* ... lengkapi semua variables */
}

.ocean-dark {
  --background: oklch(0.1 0.01 200);
  --foreground: oklch(0.9 0.02 200);
  /* ... lengkapi semua variables */
}

@custom-variant dark (&:is(.dark *, .twitter-dark *, .modern-dark *, .ocean-dark *));
```

## File yang Perlu Diupdate

1. `components/ThemeSwitcher.tsx` - Config object
2. `components/ThemeProvider.tsx` - Themes array
3. `app/globals.css` - CSS variables dan custom variant

## Catatan

- Pastikan semua CSS variables lengkap (background, foreground, primary, dll.)
- UI akan otomatis menampilkan tema baru di dropdown "Style"
- Tema baru akan kompatibel dengan mode Light/Dark
- Restart development server jika diperlukan untuk menerapkan perubahan CSS