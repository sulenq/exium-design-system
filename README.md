# Exium Design System

Design system dan template starter frontend berbasis **React 19 + Vite + TypeScript + Chakra UI v3**. Berisi komponen UI siap pakai, token/theme, i18n, dan fitur umum aplikasi (autentikasi) yang bisa dipakai sebagai titik awal proyek baru.

## Isi

- **`src/design-system/`** — komponen (input, overlay, data-display, feedback, navigasi, layout, map, dll.), theme/token Chakra, store, dan hook. Tidak boleh mengimpor dari `src/features/`.
- **`src/features/`** — fitur aplikasi. Saat ini: `auth` (sign in, SSO Keycloak, TOTP, sign up, lupa/atur ulang kata sandi), `settings`, `notification`, `design-system-docs` (halaman dokumentasi/playground komponen).
- **`src/shared/`** — API client, i18n, util, tipe, dan hook lintas fitur.
- **`src/routes/`** — route file-based (TanStack Router). `src/routeTree.gen.ts` dihasilkan otomatis.
- **`.agents/rules/`** — konvensi kode yang wajib diikuti (gaya kode, layering, aksesibilitas, dsb.).

## Memulai

Prasyarat: Node >= 20 dan [pnpm](https://pnpm.io) 11 (lihat `packageManager` di `package.json`).

```bash
pnpm install
cp .env.example .env     # sesuaikan URL backend
pnpm codegen             # generate tipe Chakra + pesan i18n (Paraglide)
pnpm dev                 # http://localhost:5173
```

`pnpm codegen` perlu dijalankan sekali setelah clone. Hasilnya (`src/paraglide`, tipe Chakra di `node_modules`) tidak di-commit. Script `typecheck`, `build`, dan `test` menjalankannya otomatis.

## Script

| Script                | Fungsi                                              |
| --------------------- | --------------------------------------------------- |
| `pnpm dev`            | Dev server                                          |
| `pnpm build`          | Build produksi (compile i18n lalu `vite build`)     |
| `pnpm lint`           | ESLint                                              |
| `pnpm typecheck`      | Codegen + `tsc --noEmit`                            |
| `pnpm test`           | Vitest (unit + test komponen + aksesibilitas `axe`) |
| `pnpm verify`         | `lint` + `typecheck` + `test`                       |
| `pnpm routes`         | Generate ulang `routeTree.gen.ts`                   |

## Environment

Lihat `.env.example`. Variabel penting:

- `VITE_API_BASE_URL` — URL backend.
- `VITE_ENABLE_DUMMY_RESPONSE_FALLBACK` — jika `true`, service auth memakai data dummy saat backend tidak terjangkau (berguna untuk mengembangkan UI tanpa backend). Biarkan `false` di produksi.
- `VITE_ENABLE_DEV_MODE` — menampilkan indikator mode dev pada form sign in.

## Halaman autentikasi

| Route                  | Keterangan                                                                                          |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `/`                    | Sign in (email/kata sandi + SSO). "Lupa kata sandi?" membuka alur OTP/TOTP dalam modal.             |
| `/auth/signup`         | Pendaftaran akun. Memanggil `POST /api/auth/register` (`name`, `email`, `password`).                |
| `/auth/forgot-password`| Minta tautan atur ulang kata sandi lewat email.                                                     |
| `/auth/reset-password` | Atur kata sandi baru dari tautan email: `?email=<email>&token=<resetToken>`.                        |
| `/auth/callback/keycloak` | Callback SSO.                                                                                    |

Layering mengikuti `.agents/rules/separation-of-concerns.md`: `api/` (network) → `services/` (logika, fallback dummy) → `hooks/` (React Query) → `components/` → `pages/` → `routes/`.

Layer `api` + `service` yang sudah siap tetapi belum punya UI (kontrak ada di `docs/api/api-docs.md`):

- `auth.email-verification` — verifikasi email dan kirim ulang (`POST /api/auth/email/verify`, `/resend`).
- `settings.account` — update profil (`PATCH /api/auth/me`) dan ganti kata sandi (`POST /api/auth/change-password`).

> Halaman forgot/reset-password memakai endpoint reset yang sudah ada (`/api/auth/reset-password/request` dan `/confirm`). Backend perlu mengirim email berisi tautan ke `/auth/reset-password?email=...&token=...`.

## Aksesibilitas

Komponen form diuji dengan [`vitest-axe`](https://github.com/chaance/vitest-axe). Saat menambah komponen form baru, tambahkan test yang menjalankan `axe(container)`; contohnya ada di `src/features/auth/components/ui/auth-forms.test.tsx` dan helper render di `src/test/render-with-providers.tsx`.

## Docker

```bash
docker compose up --build
```

Build memakai pnpm yang dipin dan `--frozen-lockfile`. Image disajikan lewat Nginx di port `3002` dengan fallback SPA.
