import { useState } from "react";
import { Info, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const objects = [
  { icon: "💳", name: "Credit/Debit Card", size: "8.5 x 5.4 cm" },
  { icon: "🥄", name: "Tablespoon", size: "~15 cm" },
  { icon: "🍴", name: "Fork", size: "~20 cm" },
  { icon: "🪙", name: "Coin (e.g. Quarter/500 IDR)", size: "~2.4 to 2.7 cm" },
];

export function ReferenceObjectTip() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-amber-500/10"
        id="reference-object-tip-toggle"
      >
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium text-amber-300">
            {t("ref.title")}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-amber-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-amber-400" />
        )}
      </button>

      {isOpen && (
        <div className="border-t border-amber-500/15 px-4 py-3 animate-in slide-in-from-top-2 duration-200">
          <p className="mb-3 text-xs text-amber-200/70">
            {t("ref.desc")}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {objects.map((obj) => (
              <div
                key={obj.name}
                className="flex flex-col items-center justify-center rounded-lg bg-black/20 p-2 text-center"
              >
                <span className="mb-1 text-xl">{obj.icon}</span>
                <span className="text-[10px] font-medium text-amber-100">
                  {obj.name}
                </span>
                <span className="text-[9px] text-amber-200/50">
                  {obj.size}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
