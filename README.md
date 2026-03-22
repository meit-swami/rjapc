# राष्ट्रीय जनादेश प्रमोशनल काउंसिल — वेबसाइट

Next.js 15, React 19, Tailwind CSS, Prisma, MySQL। सार्वजनिक सामग्री व पाठ्यक्रम डेटाबेस से लोड होती है; प्रशासन पैनल REST API के माध्यम से प्रबंधन।

## आवश्यकताएँ

- Node.js 20+
- MySQL 8+ (या संगत)

## स्थापना

1. `.env.example` को `.env` में कॉपी करें और `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` भरें।

2. निर्भरताएँ व Prisma क्लाइंट:

```bash
npm install
npx prisma db push
npm run db:seed
```

3. विकास सर्वर:

```bash
npm run dev
```

- सार्वजनिक साइट: [http://localhost:3000](http://localhost:3000)
- प्रशासक लॉगिन: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)  
  (डिफ़ॉल्ट सीड: `ADMIN_EMAIL` / `ADMIN_PASSWORD` env या `admin@rjapc.org` / `admin123`)

## पर्यावरण चर

| चर | विवरण |
|-----|--------|
| `DATABASE_URL` | MySQL कनेक्शन स्ट्रिंग |
| `JWT_SECRET` | प्रशासक सत्र हस्ताक्षर (उत्पादन में लंबा यादृच्छिक) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | सीड द्वारा बनाया गया प्रशासक |
| `NEXT_PUBLIC_SITE_URL` | कैनोनिकल URL (SEO, मेटाडेटा) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp फ्लोट बटन (देश कोड सहित, उदा. `9198...`) |

## परियोजना संरचना (संक्षेप)

- `src/app` — पेज व App Router
- `src/app/api/public/*` — सार्वजनिक API (सामग्री, संपर्क, न्यूज़लेटर)
- `src/app/api/admin/*` — प्रशासक API (कुकी + JWT)
- `src/components/sections/*` — मुख्य पृष्ठ खंड
- `src/components/admin/*` — प्रशासन UI
- `prisma/schema.prisma` — MySQL स्कीमा
- `prisma/seed.ts` — प्रारंभिक हिंदी सामग्री व नमूना डेटा
- `public/uploads/` — अपलोड की गई छवियाँ

## उत्पादन बिल्ड

```bash
npm run build
npm start
```

MySQL माइग्रेशन के लिए `prisma migrate` उपयोग करें; विकास हेतु `db push` पर्याप्त है।

## सुरक्षा नोट्स

- उत्पादन में `JWT_SECRET` व प्रशासक पासवर्ड बदलें।
- HTTPS के पीछे होस्ट करें ताकि `httpOnly` कुकी सुरक्षित रहे।
