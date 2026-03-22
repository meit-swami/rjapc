import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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
      body: JSON.stringify({
        phones: ["+91-XXXXXXXXXX", "+91-YYYYYYYYYY"],
        addressLine: "192/96, सेक्टर-19, प्रताप नगर, जयपुर",
      }),
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
      nameHi: "रमेश बोहरा",
      designation: "संस्थापक",
      description:
        "संस्थान के विजन और मार्गदर्शन में अग्रणी; राजनीतिक शिक्षा व सार्वजनिक सेवा के प्रति प्रतिबद्ध।",
      sortOrder: 1,
      isFounder: true,
    },
    {
      nameHi: "डॉ. अरुण चौधरी",
      designation: "विशेषज्ञ सलाहकार / शिक्षण बोर्ड",
      description:
        "शैक्षणिक अनुभव के साथ पाठ्यक्रम डिज़ाइन और अनुसंधान दिशा में सहयोग।",
      sortOrder: 2,
      isFounder: false,
    },
    {
      nameHi: "शिव कुमार शर्मा",
      designation: "कार्यक्रम प्रमुख",
      description:
        "प्रशिक्षण सत्र, मैदानी गतिविधियों और प्रतिभागी विकास का समन्वय।",
      sortOrder: 3,
      isFounder: false,
    },
    {
      nameHi: "लोकेश कुमार शर्मा",
      designation: "संचालन एवं बाहरी समन्वय",
      description:
        "संस्थागत संचालन, साझेदारी और सामुदायिक जुड़ाव में सक्रिय भूमिका।",
      sortOrder: 4,
      isFounder: false,
    },
    {
      nameHi: "अन्य सदस्य",
      designation: "कोर टीम",
      description:
        "शिक्षण, प्रशासन और क्षेत्रीय आउटरीच में योगदान देने वाले समर्पित सदस्य।",
      sortOrder: 5,
      isFounder: false,
    },
  ];

  const teamCount = await prisma.teamMember.count();
  if (teamCount === 0) {
    for (const m of team) {
      await prisma.teamMember.create({
        data: {
          ...m,
          photoUrl: null,
          published: true,
        },
      });
    }
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
