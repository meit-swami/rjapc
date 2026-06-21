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
      designation: "राष्ट्रीय अध्यक्ष एवं संस्थापक",
      description: `रमेश बोहरा

(राष्ट्रीय अध्यक्ष एवं संस्थापक)

प्यारे साथियों,
सादर नमस्ते, आज समय का प्रत्येक प्राणी आंतरिक हिंसा, असंतोष, अज्ञानता और भ्रम के बीच अपना जीवन जी रहा है, और इसका कारण है संस्कार विहीन राजनीति, पद लोभिता, धर्मांधता, एक दूसरे की संस्कृति को खत्म करने की होड़।

ऐसे अंधकारमय माहौल और नाजुक दौर में मानवता को बचाना, और उसे सही समय देना बहुत आवश्यक है। देश आज की राजनीति, अर्थव्यवस्था, संस्कृति मूल्यों-मान्यताओं में आपसी घृणा एवं विभाजन से जूझ रहा है।

ऐसा समय है जब देश और दुनिया को सच्ची राजनीति, संस्कारयुक्त राजनीति, शिक्षा, स्वास्थ्य और संस्कार से युक्त नेतृत्व की आवश्यकता है।

हमारा उद्देश्य देश के युवाओं को ऐसा मंच देना है जहाँ वे उच्च स्तरीय राजनीतिक प्रशिक्षण प्राप्त कर सकें।

यह संगठन भारतीय राजनीतिक प्रणाली में सुधार लाने, और एक नई दिशा देने का प्रयास है।`,
      sortOrder: 1,
      isFounder: true,
      photoUrl: "/uploads/Person/1.jpg",
    },
    {
      nameHi: "Lokesh K. Sharma",
      designation: "राष्ट्रीय महासचिव",
      description: `लोकेश कुमार शर्मा 

राष्ट्रीय महासचिव

प्रिय मित्रों एवं साथियों,
सादर अभिनंदन,

राष्ट्रीय जनादेश पॉलिटिकल काउंसिल का उद्देश्य आदर्शवादी, राष्ट्रवादी राजनीति को बढ़ावा देना है, जिससे जनहित में कार्य हो सके।

हमारा लक्ष्य एक ऐसे भारत का निर्माण करना है जहाँ लोकतांत्रिक मूल्यों की स्थापना हो, और हर व्यक्ति अपने कर्तव्यों का निर्वहन करते हुए राष्ट्र के विकास में योगदान दे।

यह संगठन युवाओं को राजनीति में सही दिशा देने और उन्हें प्रशिक्षित करने का कार्य कर रहा है।`,
      sortOrder: 2,
      isFounder: false,
      photoUrl: "/uploads/Person/13.jpg",
    },
    {
      nameHi: "Dr. Inderjeet Rao",
      designation: "राष्ट्रीय संयोजक",
      description: `डॉ. इंद्रजीत राव

(राष्ट्रीय संयोजक)

प्रिय साथियों,
नमस्कार,

राष्ट्रीय जनादेश प्रमोशनल काउंसिल में राष्ट्रीय संयोजक के रूप में मेरा दायित्व संगठन के विभिन्न स्तरों पर समन्वय स्थापित करना, सदस्यों के बीच संवाद बढ़ाना और कार्यक्रमों की योजना में सक्रियता लाना है।

आज जब देश को समावेशी विकास, नीति-अनुसंधान और जिम्मेदार नेतृत्व की आवश्यकता है, हमारा प्रयास है कि प्रशिक्षण, चर्चा और मैदानी जुड़ाव के माध्यम से युवा प्रतिभा को मजबूत किया जाए।

मैं आप सभी से आग्रह करता हूँ कि इस मिशन में अपनी भागीदारी बढ़ाएँ और संस्था के लक्ष्यों को जन-जन तक पहुँचाने में सहयोग करें।`,
      sortOrder: 3,
      isFounder: false,
      photoUrl: "/uploads/Person/11.png",
    },
    {
      nameHi: "Deepesh Bohra",
      designation: "कोषाध्यक्ष",
      description: `दीपेश बोहरा

(कोषाध्यक्ष)

प्रिय साथियों,
सादर प्रणाम,

संस्था के कोषाध्यक्ष के नाते मेरा उत्तरदायित्व वित्तीय अभिलेखों की शुद्धता, बजट का पारदर्शी प्रबंधन और जवाबदेह लेखा-संचालन सुनिश्चित करना है। विश्वास और पारदर्शिता ही किसी भी सार्वजनिक संस्था की नैतिक नींव होती है।

राष्ट्रीय जनादेश प्रमोशनल काउंसिल में हम यह सुनिश्चित करते हैं कि दान, शुल्क व अन्य संसाधनों का उपयोग नियमों के अनुरूप हो और लेखा प्रक्रियाएँ स्पष्ट रहें।

आपके सहयोग से हम इस संस्थान को वित्तीय दृष्टि से मजबूत और भरोसेमंद बनाए रखेंगे।`,
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
    {
      nameHi: "Dr Naresh Vashishtha",
      designation: "राष्ट्रीय मार्गदर्शक",
      description:
        "राष्ट्रीय स्तर पर संस्था के मार्गदर्शन, परामर्श एवं नीति-दिशा निर्धारण में सक्रिय सहयोग।",
      sortOrder: 10,
      isFounder: false,
      photoUrl: "/uploads/Person/Dr-Naresh-bashishtha.jpeg",
    },
  ];

  /** Match seed row to DB by current `nameHi`, or legacy name after rename (नाम बदलने पर भी एक ही रिकॉर्ड अपडेट हो). */
  function seedLookupWhere(nameHi: string) {
    const legacyByNewName: Record<string, string> = {
      "Lokesh K. Sharma": "Lokesh Kumar Sharma",
      "Dr Naresh Vashishtha": "Dr. Naresh Bashishtha",
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
