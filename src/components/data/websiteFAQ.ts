export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const websiteFAQ: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Berapa lama waktu pembuatan website?',
    answer: 'Tergantung paket yang dipilih. Landing Page Simple bisa selesai dalam 3–5 hari kerja, sedangkan Website Villa Pro membutuhkan 14–21 hari kerja. Timeline dimulai setelah brief dan konten diterima lengkap.',
  },
  {
    id: 'faq-2',
    question: 'Apakah saya perlu menyiapkan konten sendiri?',
    answer: 'Idealnya Anda menyediakan foto, deskripsi bisnis, dan informasi dasar. Tapi jika butuh bantuan, kami juga menyediakan layanan copywriting dan bisa membantu menyusun konten yang menarik untuk website Anda.',
  },
  {
    id: 'faq-3',
    question: 'Apakah website-nya mobile responsive?',
    answer: 'Ya, 100%! Semua website yang kami buat sudah responsif di semua perangkat — smartphone, tablet, dan desktop. Ini penting karena mayoritas pengunjung website di Indonesia mengakses lewat HP.',
  },
  {
    id: 'faq-4',
    question: 'Apakah termasuk domain dan hosting?',
    answer: 'Secara default, domain dan hosting belum termasuk dalam paket. Tapi kami menyediakan add-on "Domain + Hosting setup 1 tahun" seharga Rp 600.000. Kami juga bisa bantu setup di hosting yang sudah Anda miliki.',
  },
  {
    id: 'faq-5',
    question: 'Bagaimana proses revisi?',
    answer: 'Setiap paket sudah termasuk 2–3 kali revisi. Kami akan kirim preview website untuk Anda review, dan revisi dilakukan berdasarkan feedback Anda. Revisi tambahan bisa diatur sesuai kebutuhan.',
  },
  {
    id: 'faq-6',
    question: 'Apakah website bisa muncul di Google?',
    answer: 'Ya! Semua paket sudah termasuk optimasi dasar supaya website Anda bisa ditemukan di Google. Untuk hasil lebih optimal, paket Premium dan Villa Pro sudah termasuk setup SEO lanjutan dengan Schema markup, GA4, dan Google Search Console.',
  },
  {
    id: 'faq-7',
    question: 'Bagaimana cara pembayaran?',
    answer: 'Pembayaran dilakukan dalam 2 tahap: 50% di awal sebagai DP untuk memulai pengerjaan, dan 50% sisanya setelah website selesai dan Anda puas dengan hasilnya. Transfer via bank atau e-wallet.',
  },
  {
    id: 'faq-8',
    question: 'Apakah ada garansi setelah website jadi?',
    answer: 'Ya! Semua paket termasuk support teknis selama 14 hari setelah launch. Paket Villa Pro mendapat prioritas support selama 30 hari. Jika ada bug atau masalah teknis, kami perbaiki tanpa biaya tambahan.',
  },
];
