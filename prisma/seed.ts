import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AFFILIATE_BOOKS_BY_COURSE_SLUG } from "../src/lib/affiliate-books";
import { DEFAULT_CONTACT_BODY } from "../src/lib/contact-defaults";
import {
  DEFAULT_DONATIONS_BODY,
  DEFAULT_PROGRAMS_SECTION,
  DEFAULT_SITE_CHROME,
} from "../src/lib/site-defaults";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@rjapc.org";
  const adminPass = process.env.ADMIN_PASSWORD ?? "admin123";
  const hash = await bcrypt.hash(adminPass, 12);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash: hash },
    create: { email: adminEmail, passwordHash: hash },
  });

  const sections = [
    {
      key: "hero",
      title: "राष्ट्रीय जनादेश प्रमोशनल काउंसिल",
      body: JSON.stringify({
        subtitle: "राजनीतिक करियर संस्थान",
        tagline: "राजनीतिक शिक्षा का एकमात्र उच्च शिक्षण संस्थान",
        backgroundImageUrl: null as string | null,
      }),
    },
    {
      key: "about",
      title: "हमारे बारे में",
      body: JSON.stringify({
        paragraphs: [
          "भारत का विकास केवल आर्थिक संकेतकों तक सीमित नहीं है; यह ऐतिहासिक गौरव, सांस्कृतिक समृद्धि और आध्यात्मिक गहराई से जुड़ा एक जीवंत यात्रा है। हमारी सभ्यता ने विश्व को सहिष्णुता, ज्ञान और करुणा के मूल्य सिखाए हैं। आधुनिक भारत इन्हीं मूल्यों पर खड़ा होकर वैश्विक पटल पर अपनी पहचान बना रहा है।",
          "राजनीति केवल सत्ता प्राप्ति का माध्यम नहीं है; यह जनसेवा, समर्पण और जवाबदेही का पवित्र क्षेत्र है। सार्थक राजनीति समाज के अंतिम व्यक्ति तक पहुंच बनाती है, नीति निर्माण में पारदर्शिता लाती है और लोकतंत्र को मजबूत करती है। राष्ट्रीय जनादेश प्रमोशनल काउंसिल इसी दृष्टि के साथ युवाओं को जागरूक, संवेदनशील और कुशल जनप्रतिनिधि बनाने हेतु प्रतिबद्ध है।",
        ],
      }),
    },
    {
      key: "mission",
      title: "हमारा मिशन",
      body: JSON.stringify({
        points: [
          {
            title: "जागरूकता",
            description:
              "राजनीतिक एवं सामाजिक मुद्दों पर व्यवस्थित शिक्षा — नीति, संस्थानों और नागरिक भागीदारी को समझना।",
          },
          {
            title: "प्रशिक्षण",
            description:
              "नेतृत्व, संवाद, टीम निर्माण और सार्वजनिक उपस्थिति सहित व्यावहारिक कौशल विकास।",
          },
          {
            title: "सशक्तिकरण",
            description:
              "युवाओं को राष्ट्र निर्माण की प्रक्रिया से जोड़ना — संवैधानिक मूल्यों और सेवा भावना के साथ।",
          },
        ],
      }),
    },
    {
      key: "curriculum",
      title: "पाठ्यक्रम विषय",
      body: JSON.stringify({
        subjects: [
          "भारतीय राजनीतिक इतिहास",
          "संविधान और लोकतंत्र",
          "अंतरराष्ट्रीय राजनीति",
          "नेतृत्व कौशल",
          "लोकतांत्रिक ढांचा",
        ],
      }),
    },
    {
      key: "activities",
      title: "गतिविधियाँ",
      body: JSON.stringify({
        items: [
          "समूह चर्चा",
          "वाद-विवाद",
          "केस स्टडी",
          "क्षेत्र भ्रमण",
          "डॉक्यूमेंट्री विश्लेषण",
        ],
      }),
    },
    {
      key: "why_join",
      title: "क्यों जुड़ें",
      body: JSON.stringify({
        items: [
          "व्यावहारिक राजनीतिक प्रशिक्षण — सिद्धांत से लेकर मैदान तक",
          "नेतृत्व विकास कार्यक्रम और व्यक्तिगत प्रतिक्रिया",
          "क्षेत्रीय एवं राष्ट्रीय स्तर के विशेषज्ञों से मार्गदर्शन",
        ],
      }),
    },
    {
      key: "contact",
      title: "संपर्क",
      body: JSON.stringify(DEFAULT_CONTACT_BODY),
    },
    {
      key: "seo",
      title: "SEO",
      body: JSON.stringify({
        title: "राष्ट्रीय जनादेश प्रमोशनल काउंसिल | राजनीतिक शिक्षा संस्थान",
        description:
          "राष्ट्रीय जनादेश प्रमोशनल काउंसिल — राजनीतिक शिक्षा, नेतृत्व विकास और लोकतांत्रिक जागरूकता हेतु उच्च शिक्षण संस्थान, जयपुर।",
      }),
    },
    {
      key: "affiliations",
      title: "सहयोगी संस्थाएँ",
      body: JSON.stringify({
        items: [
          { name: "उदाहरण संस्था", logoUrl: null as string | null, href: null as string | null },
          { name: "साझेदार नेटवर्क", logoUrl: null, href: "https://example.org" },
        ],
      }),
    },
    {
      key: "newsletter",
      title: "न्यूज़लेटर",
      body: JSON.stringify({
        subtitle: "कार्यक्रम अपडेट व लेख सीधे आपके इनबॉक्स में।",
      }),
    },
    {
      key: "media",
      title: "Media",
      body: JSON.stringify({
        items: [
          {
            kind: "photo" as const,
            title: "कार्यक्रम — उदाहरण फ़ोटो",
            url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
            date: "2024-03-15",
          },
          {
            kind: "video" as const,
            title: "लोकतंत्र पर चर्चा (उदाहरण)",
            url: "https://www.youtube.com/watch?v=YE7VzlLtp-4",
            date: "2024-03-20",
          },
          {
            kind: "photo" as const,
            title: "शैक्षिक सत्र",
            url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
            date: "2023-11-08",
          },
        ],
      }),
    },
    {
      key: "programs",
      title: "कार्यक्रम खंड (शीर्षक)",
      body: JSON.stringify(DEFAULT_PROGRAMS_SECTION),
    },
    {
      key: "donations",
      title: "दान खंड",
      body: JSON.stringify(DEFAULT_DONATIONS_BODY),
    },
    {
      key: "affiliate_books",
      title: "सहबद्ध पुस्तकें (कोर्स स्लग)",
      body: JSON.stringify(AFFILIATE_BOOKS_BY_COURSE_SLUG),
    },
    {
      key: "site_chrome",
      title: "हेडर, फ़ुटर, नेविगेशन",
      body: JSON.stringify(DEFAULT_SITE_CHROME),
    },
  ];

  for (const s of sections) {
    await prisma.contentSection.upsert({
      where: { key: s.key },
      update: { title: s.title, body: s.body },
      create: s,
    });
  }

  const courses = [
    {
      slug: "foundation-module",
      nameHi: "फाउंडेशन मॉड्यूल",
      duration: "3 माह",
      objective:
        "राजनीतिक मूलभूत संकल्पनाओं, संवैधानिक ढांचे और सार्वजनिक संवाद की नींव तैयार करना।",
      topics: [
        "भारतीय लोकतंत्र की मूल बातें",
        "स्थानीय शासन व जनभागीदारी",
        "मीडिया साक्षरता",
        "नैतिक राजनीति के सिद्धांत",
      ],
      activities: [
        "परिचयात्मक कार्यशालाएँ",
        "मॉडल ग्राम सभा अभ्यास",
        "समाचार विश्लेषण सत्र",
      ],
      sortOrder: 1,
    },
    {
      slug: "core-module",
      nameHi: "कोर मॉड्यूल",
      duration: "6 माह",
      objective:
        "नीति विश्लेषण, अभियान योजना और संस्थागत ज्ञान के साथ मध्यवर्ती स्तर की दक्षता विकसित करना।",
      topics: [
        "नीति अनुसंधान विधियाँ",
        "चुनावी रणनीति व संगठन",
        "समावेशी विकास के मॉडल",
        "अंतरराष्ट्रीय तुलनात्मक अध्ययन",
      ],
      activities: [
        "केस स्टडी प्रस्तुति",
        "मॉक प्रेस कॉन्फ्रेंस",
        "क्षेत्र भ्रमण रिपोर्ट",
      ],
      sortOrder: 2,
    },
    {
      slug: "skill-module",
      nameHi: "स्किल मॉड्यूल",
      duration: "3 माह",
      objective:
        "वक्तृत्व, वार्ता, डिजिटल संचार और टीम नेतृत्व में उन्नति।",
      topics: [
        "सार्वजनिक वक्तृत्व",
        "संकट संचार",
        "डिजिटल अभियान मूल बातें",
        "टीम निर्माण व प्रेरणा",
      ],
      activities: [
        "वाद-विवाद प्रतियोगिता",
        "समूह चर्चा फैसिलिटेशन",
        "वीडियो संदेश अभ्यास",
      ],
      sortOrder: 3,
    },
  ];

  for (const c of courses) {
    await prisma.course.upsert({
      where: { slug: c.slug },
      update: {
        nameHi: c.nameHi,
        duration: c.duration,
        objective: c.objective,
        topics: JSON.stringify(c.topics),
        activities: JSON.stringify(c.activities),
        sortOrder: c.sortOrder,
        published: true,
      },
      create: {
        slug: c.slug,
        nameHi: c.nameHi,
        duration: c.duration,
        objective: c.objective,
        topics: JSON.stringify(c.topics),
        activities: JSON.stringify(c.activities),
        sortOrder: c.sortOrder,
        published: true,
      },
    });
  }

  const team = [
    {
      nameHi: "Ramesh Bohra",
      designation: "संस्थापक एवं अध्यक्ष",
      description:
        "रमेश बोहरा एक समर्पित लेखक और प्रोफेसर हैं। 30 से अधिक वर्षों के अनुभव के साथ, उन्होंने राजनीतिक, सामाजिक, सांस्कृतिक और नैतिक साहित्य को आकार देने में मदद की है, जिससे पूरे भारत में सामाजिक कल्याण और सार्थक संवाद को बढ़ावा मिला है।",
      sortOrder: 1,
      isFounder: true,
      photoUrl: "/uploads/Person/1.jpg",
    },
    {
      nameHi: "Lokesh K. Sharma",
      designation: "राष्ट्रीय महासचिव",
      description:
        "वर्तमान राजनीतिक एवं सामाजिक परिस्थितियों के अनुरूप राष्ट्रीय जनादेश प्रमोशन काउंसिल द्वारा अभिनव पहल की गई है, जिसमें राष्ट्रनिर्माण, संविधान एवं लोकतांत्रिक व्यवस्था की मजबूती हेतु समर्पित एवं समर्पण भाव से कार्य करने वाले व्यक्तियों को सम्मानित करने की योजना है।",
      sortOrder: 2,
      isFounder: false,
      photoUrl: "/uploads/Person/13.jpg",
    },
    {
      nameHi: "Dr. Inderjeet Rao",
      designation: "राष्ट्रीय संयोजक",
      description:
        "राष्ट्रीय स्तर पर संगठनात्मक समन्वय, सदस्य संवाद और कार्यक्रम योजना में सक्रिय भूमिका।",
      sortOrder: 3,
      isFounder: false,
      photoUrl: "/uploads/Person/11.png",
    },
    {
      nameHi: "Deepesh Bohra",
      designation: "कोषाध्यक्ष",
      description:
        "संस्था के वित्तीय अभिलेख, बजट प्रबंधन और पारदर्शी लेखा संचालन का दायित्व संभालते हैं।",
      sortOrder: 4,
      isFounder: false,
      photoUrl: "/uploads/Person/12.png",
    },
    {
      nameHi: "Dr. Arun Choudhary",
      designation: "विशेषज्ञ सलाहकार / शिक्षण बोर्ड",
      description:
        "शैक्षणिक अनुभव के साथ पाठ्यक्रम डिज़ाइन और अनुसंधान दिशा में सहयोग।",
      sortOrder: 5,
      isFounder: false,
      photoUrl: "/uploads/Person/2.jpg",
    },
  ];

  /** Match seed row to DB by current `nameHi`, or legacy name after rename (नाम बदलने पर भी एक ही रिकॉर्ड अपडेट हो). */
  function seedLookupWhere(nameHi: string) {
    const legacyByNewName: Record<string, string> = {
      "Lokesh K. Sharma": "Lokesh Kumar Sharma",
    };
    const legacy = legacyByNewName[nameHi];
    return legacy
      ? { OR: [{ nameHi }, { nameHi: legacy }] }
      : { nameHi };
  }

  for (const m of team) {
    const existing = await prisma.teamMember.findFirst({
      where: seedLookupWhere(m.nameHi),
    });
    if (existing) {
      await prisma.teamMember.update({
        where: { id: existing.id },
        data: { ...m, published: true },
      });
      continue;
    }
    await prisma.teamMember.create({
      data: {
        ...m,
        published: true,
      },
    });
  }

  await prisma.blogPost.upsert({
    where: { slug: "loktantra-aur-yuva" },
    update: {},
    create: {
      slug: "loktantra-aur-yuva",
      title: "लोकतंत्र और युवा: भागीदारी का महत्व",
      excerpt:
        "सक्रिय नागरिकता और संवैधानिक जागरूकता युवाओं के लिए क्यों अनिवार्य है।",
      body:
        "लोकतंत्र की ताकत जागरूक नागरिकों में निहित है। युवा पीढ़ी जब संविधान, संस्थाओं और नीतिगत प्रक्रियाओं को समझकर भागीदारी करती है, तब नीतियाँ अधिक समावेशी और जवाबदेह बनती हैं। शिक्षा संस्थानों को केवल रोजगार नहीं, बल्कि सार्वजनिक नैतिकता और सेवा भावना भी विकसित करनी चाहिए।\n\nराष्ट्रीय जनादेश प्रमोशनल काउंसिल इसी दिशा में संरचित मॉड्यूल, चर्चा और मार्गदर्शन प्रदान करता है।",
      published: true,
      publishedAt: new Date(),
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
