import React, { useState } from "react";
import { type Language, translations } from "../../data/translations";
import type { CitizenSuggestion } from "../../data/suggestions";
import { villagesData } from "../../data/villages";

interface SuggestionFormProps {
  language: Language;
  onAddSuggestion: (suggestion: CitizenSuggestion) => void;
}

export const SuggestionForm: React.FC<SuggestionFormProps> = ({
  language,
  onAddSuggestion,
}) => {
  const t = translations[language];

  // Form states
  const [category, setCategory] = useState<"Infrastructure" | "Water" | "Education" | "Health/Other">("Infrastructure");
  const [village, setVillage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submittedBy, setSubmittedBy] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  // Success state
  const [successId, setSuccessId] = useState<string | null>(null);

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!village || !title || !description || !submittedBy) {
      alert(language === "en" ? "Please fill in all required fields." : "దయచేసి అన్ని అవసరమైన ఫీల్డ్‌లను పూరించండి.");
      return;
    }

    // Generate unique Tracking ID
    const trackingNum = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `NR-2026-${trackingNum}`;

    const newSuggestion: CitizenSuggestion = {
      id: trackingId,
      title,
      category,
      village,
      description,
      upvotes: 0,
      status: "Under Review",
      date: new Date().toISOString().split("T")[0],
      submittedBy,
    };

    onAddSuggestion(newSuggestion);
    setSuccessId(trackingId);

    // Reset Form
    setVillage("");
    setTitle("");
    setDescription("");
    setSubmittedBy("");
    setPhoto(null);
  };

  if (successId) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 border border-outline-variant/30 dark:border-zinc-800 text-center max-w-xl mx-auto space-y-6 animate-fade-in transition-colors duration-300">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-950/40 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mx-auto border-2 border-green-500/20">
          <span className="material-symbols-outlined text-3xl font-bold">check_circle</span>
        </div>
        <div className="space-y-2">
          <h3 className="font-headline-md text-2xl font-bold text-on-surface dark:text-zinc-100">
            {t.successHeading}
          </h3>
          <p className="text-sm text-on-surface-variant dark:text-zinc-400">
            {t.successText}
          </p>
        </div>

        <div className="bg-primary-container/10 dark:bg-zinc-850 p-4 rounded-xl border border-primary/20">
          <span className="text-xs text-on-surface-variant dark:text-zinc-400 font-semibold block uppercase tracking-wider">
            {t.successTrackingId}
          </span>
          <span className="text-2xl font-black text-primary dark:text-primary-container tracking-widest font-mono">
            {successId}
          </span>
        </div>

        <button
          onClick={() => setSuccessId(null)}
          className="w-full premium-gradient text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-primary/25 active:scale-95 transition-all text-sm cursor-pointer"
        >
          {t.btnBackToForm}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 md:p-8 border border-outline-variant/30 dark:border-zinc-800 transition-colors duration-300">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {/* Category selector */}
        <div className="col-span-full space-y-2">
          <label className="block text-xs md:text-sm font-semibold text-on-surface dark:text-zinc-300">
            {t.formCategory}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Category: Infrastructure */}
            <button
              type="button"
              onClick={() => setCategory("Infrastructure")}
              className={`flex flex-col items-center gap-2 p-3.5 border rounded-xl transition-all cursor-pointer ${
                category === "Infrastructure"
                  ? "border-primary-container bg-primary-container/15 text-primary dark:text-primary-container font-bold"
                  : "border-outline-variant dark:border-zinc-800 hover:border-primary-container text-on-surface-variant dark:text-zinc-400"
              }`}
            >
              <span className="material-symbols-outlined font-bold text-xl">road</span>
              <span className="text-[10px] md:text-xs">{t.formCategoryInfra}</span>
            </button>

            {/* Category: Water */}
            <button
              type="button"
              onClick={() => setCategory("Water")}
              className={`flex flex-col items-center gap-2 p-3.5 border rounded-xl transition-all cursor-pointer ${
                category === "Water"
                  ? "border-primary-container bg-primary-container/15 text-primary dark:text-primary-container font-bold"
                  : "border-outline-variant dark:border-zinc-800 hover:border-primary-container text-on-surface-variant dark:text-zinc-400"
              }`}
            >
              <span className="material-symbols-outlined font-bold text-xl">water_drop</span>
              <span className="text-[10px] md:text-xs">{t.formCategoryWater}</span>
            </button>

            {/* Category: Education */}
            <button
              type="button"
              onClick={() => setCategory("Education")}
              className={`flex flex-col items-center gap-2 p-3.5 border rounded-xl transition-all cursor-pointer ${
                category === "Education"
                  ? "border-primary-container bg-primary-container/15 text-primary dark:text-primary-container font-bold"
                  : "border-outline-variant dark:border-zinc-800 hover:border-primary-container text-on-surface-variant dark:text-zinc-400"
              }`}
            >
              <span className="material-symbols-outlined font-bold text-xl">school</span>
              <span className="text-[10px] md:text-xs">{t.formCategoryEdu}</span>
            </button>

            {/* Category: Health */}
            <button
              type="button"
              onClick={() => setCategory("Health/Other")}
              className={`flex flex-col items-center gap-2 p-3.5 border rounded-xl transition-all cursor-pointer ${
                category === "Health/Other"
                  ? "border-primary-container bg-primary-container/15 text-primary dark:text-primary-container font-bold"
                  : "border-outline-variant dark:border-zinc-800 hover:border-primary-container text-on-surface-variant dark:text-zinc-400"
              }`}
            >
              <span className="material-symbols-outlined font-bold text-xl">psychiatry</span>
              <span className="text-[10px] md:text-xs">{t.formCategoryHealth}</span>
            </button>
          </div>
        </div>

        {/* Submitter Name */}
        <div>
          <label className="block text-xs md:text-sm font-semibold text-on-surface dark:text-zinc-300 mb-2">
            {language === "en" ? "Your Name" : "మీ పేరు"} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={submittedBy}
            onChange={(e) => setSubmittedBy(e.target.value)}
            placeholder={language === "en" ? "e.g. K. Prasad" : "ఉదా: కె. ప్రసాద్"}
            className="w-full bg-surface-container-low dark:bg-zinc-850 text-on-surface dark:text-zinc-200 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-container outline-none"
          />
        </div>

        {/* Village Name Dropdown */}
        <div>
          <label className="block text-xs md:text-sm font-semibold text-on-surface dark:text-zinc-300 mb-2">
            {t.formVillageSelect} <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            className="w-full bg-surface-container-low dark:bg-zinc-850 text-on-surface dark:text-zinc-200 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-container outline-none font-semibold"
          >
            <option value="">{t.formVillagePlaceholder}</option>
            {villagesData.map((v) => (
              <option key={v.id} value={v.name}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        {/* Project Name / Short Title */}
        <div className="col-span-full">
          <label className="block text-xs md:text-sm font-semibold text-on-surface dark:text-zinc-300 mb-2">
            {t.formProjectTitle} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.formProjectPlaceholder}
            className="w-full bg-surface-container-low dark:bg-zinc-850 text-on-surface dark:text-zinc-200 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-container outline-none"
          />
        </div>

        {/* Description & Impact */}
        <div className="col-span-full">
          <label className="block text-xs md:text-sm font-semibold text-on-surface dark:text-zinc-300 mb-2">
            {t.formDescription} <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.formDescPlaceholder}
            className="w-full bg-surface-container-low dark:bg-zinc-850 text-on-surface dark:text-zinc-200 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-container outline-none"
          />
        </div>

        {/* Photo Upload (Mock) */}
        <div className="col-span-full">
          <label className="block text-xs md:text-sm font-semibold text-on-surface dark:text-zinc-300 mb-2">
            {t.formPhoto}
          </label>
          <div className="border-2 border-dashed border-outline-variant dark:border-zinc-800 rounded-xl p-6 text-center hover:border-primary dark:hover:border-primary-container transition-all bg-surface-container-low/30 dark:bg-zinc-900/30 relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setPhoto(e.target.files[0]);
                }
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span className="material-symbols-outlined text-primary-container dark:text-primary-container text-4xl mb-2">
              cloud_upload
            </span>
            <p className="text-sm font-bold text-on-surface-variant dark:text-zinc-300">
              {photo ? photo.name : t.formPhotoDesc}
            </p>
            <p className="text-xs text-on-surface-variant/70 dark:text-zinc-400 mt-1">
              {photo ? `${(photo.size / (1024 * 1024)).toFixed(2)} MB` : t.formPhotoSize}
            </p>
          </div>
        </div>

        {/* Submit button */}
        <div className="col-span-full pt-4">
          <button
            type="submit"
            className="w-full premium-gradient text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-primary/20 active:scale-95 transition-all text-sm md:text-base cursor-pointer"
          >
            {t.btnSubmitProposal}
          </button>
          <p className="text-center text-[10px] text-on-surface-variant dark:text-zinc-400 mt-4 leading-relaxed">
            {t.formGuidelines}
          </p>
        </div>
      </form>
    </div>
  );
};
export default SuggestionForm;
