import { useMemo, useState } from "react";
import { Globe, MapPin, ShieldCheck, HeartPulse } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const languages = [
  "English",
  "Spanish",
  "French",
  "Mandarin",
  "Arabic",
  "Portuguese",
  "Japanese",
  "German",
  "Russian",
  "Hindi",
];

const phrases: Record<string, string[]> = {
  English: [
    "Hello! How are you?",
    "Where is the nearest metro station?",
    "Could you recommend a local restaurant?",
    "Thank you very much.",
    "Do you speak English?",
  ],
  Spanish: [
    "¡Hola! ¿Cómo estás?",
    "¿Dónde está la estación de metro más cercana?",
    "¿Podrías recomendarme un restaurante local?",
    "Muchas gracias.",
    "¿Habla inglés?",
  ],
  French: [
    "Bonjour ! Comment ça va ?",
    "Où est la station de métro la plus proche ?",
    "Pouvez-vous recommander un restaurant local ?",
    "Merci beaucoup.",
    "Parlez-vous anglais ?",
  ],
  Mandarin: [
    "你好！你好吗？",
    "最近的地铁站在哪里？",
    "你能推荐一个当地的餐厅吗？",
    "非常感谢。",
    "你会说英语吗？",
  ],
  Arabic: [
    "مرحباً! كيف حالك؟",
    "أين أقرب محطة مترو؟",
    "هل يمكنك أن توصي بمطعم محلي؟",
    "شكراً جزيلاً.",
    "هل تتحدث الإنجليزية؟",
  ],
  Portuguese: [
    "Olá! Como vai?",
    "Onde fica a estação de metrô mais próxima?",
    "Você pode recomendar um restaurante local?",
    "Muito obrigado(a).",
    "Você fala inglês?",
  ],
  Japanese: [
    "こんにちは！お元気ですか？",
    "最寄りの駅はどこですか？",
    "地元のお勧めのレストランはありますか？",
    "ありがとうございます。",
    "英語を話せますか？",
  ],
  German: [
    "Hallo! Wie geht's?",
    "Wo ist die nächste U-Bahn-Station?",
    "Können Sie ein lokales Restaurant empfehlen?",
    "Vielen Dank.",
    "Sprechen Sie Englisch?",
  ],
  Russian: [
    "Привет! Как дела?",
    "Где ближайшая станция метро?",
    "Не могли бы вы порекомендовать местный ресторан?",
    "Большое спасибо.",
    "Вы говорите по-английски?",
  ],
  Hindi: [
    "नमस्ते! आप कैसे हैं?",
    "सबसे नजदीकी मेट्रो स्टेशन कहाँ है?",
    "क्या आप कोई स्थानीय रेस्तरां सुझा सकते हैं?",
    "बहुत बहुत धन्यवाद।",
    "क्या आप अंग्रेज़ी बोलते हैं?",
  ],
};

const cityServices: Record<
  string,
  { label: string; description: string; icon: typeof Globe | typeof MapPin | typeof ShieldCheck | typeof HeartPulse }[]
> = {
  Berlin: [
    { label: "Charité Hospital", description: "Emergency care and traveler support", icon: HeartPulse },
    { label: "Mitte Police Station", description: "Local police and safety assistance", icon: ShieldCheck },
    { label: "Brandenburg Gate", description: "Tourist landmark and central meeting point", icon: MapPin },
  ],
  Dubai: [
    { label: "Dubai Hospital", description: "24/7 emergency services", icon: HeartPulse },
    { label: "Jumeirah Police Station", description: "Tourist police and safety help", icon: ShieldCheck },
    { label: "Dubai Marina", description: "Popular waterfront destination", icon: MapPin },
  ],
  Tokyo: [
    { label: "St. Luke's International Hospital", description: "International traveler support", icon: HeartPulse },
    { label: "Shibuya Police Station", description: "Police assistance near Shibuya crossing", icon: ShieldCheck },
    { label: "Shibuya Crossing", description: "Iconic city landmark", icon: MapPin },
  ],
  Lisbon: [
    { label: "Hospital de Santa Maria", description: "Major regional hospital", icon: HeartPulse },
    { label: "Lisbon Police Department", description: "Police support for visitors", icon: ShieldCheck },
    { label: "Alfama Quarter", description: "Historic neighborhood to explore", icon: MapPin },
  ],
  London: [
    { label: "St Thomas' Hospital", description: "Emergency medical care", icon: HeartPulse },
    { label: "City of London Police", description: "Visitor safety and reporting", icon: ShieldCheck },
    { label: "Shoreditch Market", description: "Cultural shopping and food hub", icon: MapPin },
  ],
  "NYC": [
    { label: "NewYork-Presbyterian", description: "Major emergency hospital", icon: HeartPulse },
    { label: "NYPD Midtown South", description: "Police support and local safety", icon: ShieldCheck },
    { label: "High Line", description: "Popular city attraction", icon: MapPin },
  ],
};

const getServicesForCity = (city: string) => cityServices[city] ?? [
  { label: "Local Hospital", description: "Find the nearest hospital by asking at your hotel", icon: HeartPulse },
  { label: "City Police Station", description: "Local police for emergencies", icon: ShieldCheck },
  { label: "Tourist Center", description: "Ask for local recommendations", icon: MapPin },
];

const CityLanguageAssistant = ({ city }: { city: string }) => {
  const [language, setLanguage] = useState(languages[0]);

  const selectedPhrases = useMemo(() => phrases[language] || phrases.English, [language]);
  const services = useMemo(() => getServicesForCity(city), [city]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Traveler Language Assistant</p>
        <p className="text-body text-muted-foreground text-sm">
          Choose the language you want and get quick phrases plus essential city services while you explore.
        </p>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">City</label>
          <div className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground">{city}</div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Language</label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-secondary/50 p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-foreground">Conversation Starters</p>
            <p className="text-xs text-muted-foreground">Use these phrases to connect with locals.</p>
          </div>
          <Globe className="h-4 w-4 text-primary" />
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {selectedPhrases.map((phrase) => (
            <li key={phrase} className="rounded-md bg-background/80 px-3 py-2">
              {phrase}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border bg-secondary/50 p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-foreground">Essential Services</p>
            <p className="text-xs text-muted-foreground">Nearby hospitals, police, and safety resources.</p>
          </div>
          <ShieldCheck className="h-4 w-4 text-primary" />
        </div>
        <div className="space-y-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.label} className="flex items-start gap-3 rounded-lg bg-background/90 p-3">
                <Icon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">{service.label}</p>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CityLanguageAssistant;
