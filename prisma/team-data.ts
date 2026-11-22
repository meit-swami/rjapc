import type { PrismaClient } from "@prisma/client";

/**
 * Team members kept in code (photos live in public/uploads/Person/).
 *
 * - `npm run db:sync-team` adds members from this list that are missing in the
 *   database and touches nothing else (content, courses, admin login stay as they are).
 *   Add `-- --update` to also overwrite existing members with the text below.
 * - The full seed (`npm run db:seed`) adds and updates them.
 *
 * Members added in the admin panel are not listed here and are never changed by either.
 */
export type TeamSeedMember = {
  nameHi: string;
  designation: string;
  description: string;
  sortOrder: number;
  isFounder: boolean;
  photoUrl: string;
};

export const TEAM_MEMBERS: TeamSeedMember[] = [
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
  {
    nameHi: "Pradeep Kumar Meena",
    designation: "राष्ट्रीय सलाहकार",
    description:
      "राष्ट्रीय सलाहकार के रूप में संस्था को रणनीतिक परामर्श, संगठनात्मक विस्तार एवं राष्ट्रीय स्तर के कार्यक्रमों की योजना में मार्गदर्शन।",
    sortOrder: 11,
    isFounder: false,
    photoUrl: "/uploads/Person/pradeep-kumar-meena.jpg",
  },
];

/** Old names, so a renamed member still matches its existing row instead of being duplicated. */
const LEGACY_NAME_BY_NEW_NAME: Record<string, string> = {
  "Lokesh K. Sharma": "Lokesh Kumar Sharma",
  "Dr Naresh Vashishtha": "Dr. Naresh Bashishtha",
};

function lookupWhere(nameHi: string) {
  const legacy = LEGACY_NAME_BY_NEW_NAME[nameHi];
  return legacy ? { OR: [{ nameHi }, { nameHi: legacy }] } : { nameHi };
}

export type TeamSyncResult = { created: string[]; updated: string[]; unchanged: string[] };

export async function syncTeamMembers(
  prisma: PrismaClient,
  options: { updateExisting: boolean }
): Promise<TeamSyncResult> {
  const result: TeamSyncResult = { created: [], updated: [], unchanged: [] };
  for (const m of TEAM_MEMBERS) {
    const existing = await prisma.teamMember.findFirst({ where: lookupWhere(m.nameHi) });
    if (existing) {
      if (options.updateExisting) {
        await prisma.teamMember.update({ where: { id: existing.id }, data: { ...m, published: true } });
        result.updated.push(m.nameHi);
      } else {
        result.unchanged.push(m.nameHi);
      }
      continue;
    }
    await prisma.teamMember.create({ data: { ...m, published: true } });
    result.created.push(m.nameHi);
  }
  return result;
}
