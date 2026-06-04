# TerlikSpor Dashboard

Legends Cup Bursa 1. Ligi için Next.js tabanlı takip paneli.

## Özellikler

- ⚡ **Real-time Veri**: legendscupofficial.com.tr'den Puppeteer & Cheerio ile çekilen güncel veriler
- 📊 **Puan Durumu**: 18 takımın detaylı puan tablosu
- 👥 **Oyuncular**: TERLİK SPOR kadrosunun istatistikleri
- ⚽ **Maçlar**: Oynanan ve yaklaşan maçlar
- 🏆 **Gol Krallığı**: Lig içi en iyi gol atanlar
- 🎯 **Son 16 Eleme**: Turnuva eşleşmeleri
- 🎨 **Modern UI**: Glassmorphism tasarım, duyarlı layout
- ⚙️ **2 dakikalık Cache**: Otomatik yenileme + manuel "Yenile" butonu

## Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Geliştirme sunucusunu başlat
npm run dev

# 3. Tarayıcıda aç
# http://localhost:3000
```

## Mimari

### Data Flow
```
legendscupofficial.com.tr (Web Scraping)
            ↓
src/lib/scraper.ts (Puppeteer + Cheerio)
            ↓
src/app/api/* (Next.js API Routes)
            ↓
src/components/* (React Components - Client/Server)
            ↓
Dashboard UI
```

### Caching Strategy
- **API Routes**: 2 dakika (`revalidate = 120`)
- **Dashboard**: 2 dakika (`revalidate = 120`)
- Hata durumunda: Fallback veri yok - boş state gösterilir

## Dosya Yapısı

```
src/
├── app/
│   ├── api/
│   │   ├── standings/route.ts   → Puan durumu API
│   │   ├── matches/route.ts     → Maç verileri API
│   │   ├── scorers/route.ts     → Gol krallığı API
│   │   └── team/route.ts        → Takım bilgisi API
│   ├── dashboard/page.tsx       → Ana dashboard (server component)
│   └── layout.tsx               → Root layout
├── components/
│   ├── HeroCard.tsx             → TerlikSpor özet kartı
│   ├── StandingsTable.tsx       → Puan durumu tablosu
│   ├── MatchList.tsx            → Maç listesi
│   ├── ScorersList.tsx          → Gol krallığı listesi
│   ├── PlayersList.tsx          → Oyuncu istatistikleri
│   ├── TabPanel.tsx             → Tab kontrol sistemi (client)
│   ├── RefreshButton.tsx        → Manuel yenile (client)
│   ├── LiveMatchesCard.tsx      → Canlı maç kartı
│   ├── RecentMatchesCard.tsx    → Son maçlar kartı
│   ├── Son16Bracket.tsx         → Son 16 turu
│   └── TournamentBracket.tsx    → Turnuva şeması
├── lib/
│   └── scraper.ts               → Tüm scraping fonksiyonları
└── types/
    └── index.ts                 → TypeScript tipleri
```

## Scraper Detayları

### scrapeStandings()
- Kaynak: `/team/38` sayfası
- Parse: HTML table → StandingRow array
- Hata: Boş array döndürür, UI'da "Puan durumu yüklenemedi" gösterilir

### scrapeTeamInfo()
- Kaynak: `/team/38` sayfası
- Çekilen veriler: Sıra, oynanan maç, galibiyet, puan, logo
- Fallback: Puan durumundan al

### scrapeMatches()
- Kaynak: `/team/38` + `/leagues/bursa?leagueId=9`
- Parse: Maç linklerinden takımlar, tarih, saat, skor
- Filtre: Sadece TERLİK SPOR'un maçları

### scrapeScorers()
- Kaynak: `/leagues/bursa?leagueId=9`
- Parse: Oyuncu linklerinden isim, takım, gol sayısı
- Sırala: Gol sayısına göre

### scrapeTeamPlayers()
- Kaynak: Hardcoded oyuncu verileri
- Kullanım: Dashboard'da TERLİK SPOR kadrosu

## Önemli Sabitler

```ts
// src/lib/scraper.ts
const TEAM_URL = 'https://www.legendscupofficial.com.tr/team/38'    // TERLİK SPOR
const TERLIK_ID = '38'
const TERLIK_NAME = 'TERLİK SPOR'
```

Takım değişirse bu sabitleri güncelle.

## Sorun Giderme

**Veri gelmiyor / boş görünüyor:**
- Sitenin HTML yapısı değişmiş olabilir
- `src/lib/scraper.ts` içindeki cheerio seçicilerini güncelle
- Browser DevTools'tan site yapısını kontrol et

**Build hatası:**
```bash
npm run build 2>&1 | head -50
npm run lint
```

**Cache temizle:**
```bash
rm -rf .next
npm run dev
```

**Puppeteer başlamıyor:**
```bash
npm install puppeteer --force
```

## Development

```bash
# Geliştirme modu
npm run dev

# Build
npm run build

# Production modu
npm start

# Linting
npm run lint
```

## Teknolojiler

- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Puppeteer**: Headless browser
- **Cheerio**: HTML parsing
- **Tailwind CSS**: Styling
- **Lucide React**: Icons

## Lisans

MIT
