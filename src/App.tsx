/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Maximize2,
  Eye,
  EyeOff,
  Check,
  Copy,
  X,
  ZoomIn,
  ZoomOut,
  Grid,
  BookOpen,
  FileText,
  ArrowUpRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  MAIN_PORTRAIT_SVG,
  PORTRAIT_ANNOTATIONS,
  PORTRAIT_ACCESSION_RECORD,
  TIMELINE_ENTRIES,
  ARCHIVAL_PLATES,
  SPEECH_ANNOTATIONS,
  type PrintTone,
  type ArchivalPlate,
  type PortraitAnnotation
} from './data/nehruArchive';

export default function App() {
  // Portrait Interactive Controls
  const [printTone, setPrintTone] = useState<PrintTone>('silver');
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [activeAnnotation, setActiveAnnotation] = useState<PortraitAnnotation>(PORTRAIT_ANNOTATIONS[2]); // Default to Red Rosebud
  const [useWikimediaSource, setUseWikimediaSource] = useState<boolean>(false);
  const [wikimediaFailed, setWikimediaFailed] = useState<boolean>(false);

  // Speech Section Controls
  const [activeSpeechNoteId, setActiveSpeechNoteId] = useState<string>('note-2');
  const [speechViewMode, setSpeechViewMode] = useState<'full' | 'excerpts'>('full');
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);

  // Timeline Controls
  const [eraFilter, setEraFilter] = useState<'all' | 'freedom' | 'statecraft' | 'literary'>('all');
  const [expandedTimelineYear, setExpandedTimelineYear] = useState<string | null>('1947');

  // Lightbox / Accession Modal Controls
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [selectedPlate, setSelectedPlate] = useState<ArchivalPlate | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);
  const [showOpticalGrid, setShowOpticalGrid] = useState<boolean>(false);
  const [failedGalleryUrls, setFailedGalleryUrls] = useState<Record<string, boolean>>({});

  const getToneFilterClasses = (tone: PrintTone): string => {
    switch (tone) {
      case 'silver':
        return 'grayscale contrast-110 brightness-98';
      case 'sepia':
        return 'sepia-[.48] contrast-105 brightness-95';
      case 'selenium':
        return 'grayscale contrast-125 brightness-95 hue-rotate-180 saturate-50';
      case 'litho':
        return 'grayscale contrast-150 brightness-105';
    }
  };

  const getToneLabel = (tone: PrintTone): string => {
    switch (tone) {
      case 'silver':
        return 'Gelatin Silver B&W';
      case 'sepia':
        return 'Warm Archival Sepia';
      case 'selenium':
        return 'Selenium Split-Tone';
      case 'litho':
        return 'High-Contrast Gravure';
    }
  };

  const filteredTimeline = TIMELINE_ENTRIES.filter((item) =>
    eraFilter === 'all' ? true : item.era === eraFilter
  );

  const handleCopyCitation = () => {
    const citation =
      'Nehru, Jawaharlal. "Tryst with Destiny." Address to the Constituent Assembly of India, Council House, New Delhi, 14 August 1947. Constituent Assembly Debates, Vol. V, pp. 4–5.';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(citation).catch(() => {});
    }
    setCopiedCitation(true);
    window.setTimeout(() => setCopiedCitation(false), 2200);
  };

  const openMainPortraitDossier = () => {
    setSelectedPlate(null);
    setLightboxZoom(1);
    setIsDossierOpen(true);
  };

  const openGalleryPlateModal = (plate: ArchivalPlate) => {
    setSelectedPlate(plate);
    setLightboxZoom(1);
    setIsDossierOpen(true);
  };

  const activePortraitSrc =
    useWikimediaSource && !wikimediaFailed
      ? PORTRAIT_ACCESSION_RECORD.wikimediaUrl
      : MAIN_PORTRAIT_SVG;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col">
      {/* Top Bar Contract: Strictly 1 row, 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200 px-6 lg:px-12 py-4">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#portrait"
            className="font-serif text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-900"
          >
            Jawaharlal Nehru Archive
          </a>

          {/* Zone 2: 4 concise single-line text navigation links */}
          <nav
            aria-label="Exhibition Sections"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600"
          >
            <a
              href="#portrait"
              className="hover:text-stone-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Portrait Study
            </a>
            <a
              href="#speech"
              className="hover:text-stone-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Tryst with Destiny
            </a>
            <a
              href="#chronology"
              className="hover:text-stone-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Chronology
            </a>
            <a
              href="#archives"
              className="hover:text-stone-900 hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              Archival Plates
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={openMainPortraitDossier}
              className="px-4 py-2 text-xs font-semibold tracking-wide text-[#FBF9F5] bg-[#1C1917] hover:bg-stone-800 transition-colors rounded-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-900"
            >
              Inspect Accession Record
            </button>
          </div>
        </div>
      </header>

      {/* Operational Utility Ribbon (Museum Pattern A) */}
      <div className="bg-[#F3EFE6] border-b border-stone-200 px-6 lg:px-12 py-2.5 text-xs text-stone-600">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-stone-600">
            <span>EXHIBITION MONOGRAPH VOL. IV</span>
            <span aria-hidden="true">·</span>
            <span>ACCESSION: {PORTRAIT_ACCESSION_RECORD.accessionNumber}</span>
            <span aria-hidden="true">·</span>
            <span>NEW DELHI SITTING, MARCH 1956</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-stone-600">
            <span>Permanent Digital Study Collection</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => {
                setUseWikimediaSource((prev) => !prev);
                setWikimediaFailed(false);
              }}
              className="underline underline-offset-4 hover:text-stone-900 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Source: {useWikimediaSource && !wikimediaFailed ? 'Wikimedia Commons Scan' : 'Archival Gravure Plate'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Exhibition Hero featuring the 1956 Portrait Study */}
      <main id="portrait" className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Editorial Monograph Introduction & Curatorial Dossier */}
          <div className="lg:col-span-6 flex flex-col justify-between order-2 lg:order-1">
            <div className="space-y-6">
              {/* Unboxed Metadata Kicker (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-semibold">
                <span>Architect of Modern India</span>
                <span aria-hidden="true">·</span>
                <span>First Prime Minister (1947–1964)</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">1889–1964</span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif font-bold text-stone-900 leading-[1.08] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Jawaharlal Nehru
              </h1>

              <p className="text-lg sm:text-xl font-serif italic text-stone-600">
                14 November 1889, Allahabad — 27 May 1964, New Delhi
              </p>

              <div className="border-t border-stone-300 pt-6 space-y-4 text-stone-700 leading-relaxed text-[16px] max-w-[68ch]">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900">
                  Statesman, constitutional humanist, natural scientist by training, and chronicler of subcontinental history, Jawaharlal Nehru stood at the fulcrum of twentieth-century decolonization. Serving seventeen consecutive years as the first Prime Minister of independent India, he forged a secular parliamentary republic anchored in universal adult suffrage, scientific inquiry, and diplomatic non-alignment.
                </p>
                <p>
                  Photographed in New Delhi in March 1956 by portraitist Yousuf Karsh on an 8 × 10 inch view camera, this famous study captures Nehru in a moment of quiet reflection following a marathon parliamentary session—attired in his hand-spun khadi cap and buttoned achkan coat with a fresh red rosebud tucked into the third buttonhole.
                </p>
              </div>

              {/* Editorial Pull Quote (Top/Bottom Hairline Dividers - Zero Thick Left Border) */}
              <blockquote className="border-y border-stone-300 py-6 my-6">
                <p className="font-serif italic text-xl sm:text-2xl text-stone-900 leading-snug mb-3">
                  “Long years ago we made a tryst with destiny, and now the time comes when we shall redeem our pledge, not wholly or in full measure, but very substantially. At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom.”
                </p>
                <footer className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium">
                  <span>Constituent Assembly of India</span>
                  <span aria-hidden="true">·</span>
                  <span>New Delhi</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">14 August 1947, 23:55 IST</span>
                </footer>
              </blockquote>
            </div>

            {/* Active Curatorial Hotspot Inspector Panel */}
            <div className="mt-6 p-6 bg-[#F3EFE6] border border-stone-200/90 rounded-sm">
              <div className="flex items-center justify-between gap-4 pb-3 mb-3 border-b border-stone-300/80">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-semibold">
                  <span className="font-mono text-[#9A3412]">DETAIL {activeAnnotation.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeAnnotation.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  {PORTRAIT_ANNOTATIONS.map((ann) => (
                    <button
                      key={ann.id}
                      type="button"
                      onClick={() => {
                        setActiveAnnotation(ann);
                        setShowAnnotations(true);
                      }}
                      className={`px-2.5 py-1 text-xs font-mono transition-colors rounded-sm cursor-pointer whitespace-nowrap shrink-0 ${
                        activeAnnotation.id === ann.id
                          ? 'bg-[#1C1917] text-[#FBF9F5] font-medium'
                          : 'text-stone-600 hover:bg-stone-200/70'
                      }`}
                    >
                      {ann.index}
                    </button>
                  ))}
                </div>
              </div>
              <h2 className="text-lg font-serif font-bold text-stone-900 mb-1.5">
                {activeAnnotation.title}
              </h2>
              <p className="text-sm text-stone-700 leading-relaxed mb-3">
                {activeAnnotation.summary}
              </p>
              <p className="text-xs font-mono text-stone-500">
                OPTICAL NOTE: {activeAnnotation.technicalNote}
              </p>
            </div>
          </div>

          {/* Right Column: Featured 1956 Portrait Study Viewer */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-between">
            <div className="bg-white p-5 sm:p-7 border border-stone-200 shadow-sm flex flex-col h-full justify-between">
              {/* Top Plate Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-200">
                <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                  <span>PLATE I</span>
                  <span aria-hidden="true">·</span>
                  <span>YOUSUF KARSH (1956)</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAnnotations(!showAnnotations)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors rounded-sm cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {showAnnotations ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showAnnotations ? 'Hide Callouts' : 'Show Callouts'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={openMainPortraitDossier}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors rounded-sm cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Enlarge Plate</span>
                  </button>
                </div>
              </div>

              {/* Archival Frame & Image Container */}
              <div className="relative bg-[#141210] overflow-hidden border border-stone-300 aspect-[3/4] w-full max-w-[520px] mx-auto">
                <img
                  src={activePortraitSrc}
                  alt="1956 Portrait of Jawaharlal Nehru by Yousuf Karsh showing the Prime Minister in a khadi cap and buttoned achkan with a red rosebud"
                  referrerPolicy="no-referrer"
                  onError={() => setWikimediaFailed(true)}
                  className={`w-full h-full object-cover transition-all duration-300 ${getToneFilterClasses(
                    printTone
                  )}`}
                />

                {/* Interactive Curatorial Callout Pins */}
                {showAnnotations &&
                  PORTRAIT_ANNOTATIONS.map((ann) => {
                    const isSelected = activeAnnotation.id === ann.id;
                    return (
                      <button
                        key={ann.id}
                        type="button"
                        aria-label={`Inspect curatorial detail ${ann.index}: ${ann.title}`}
                        onClick={() => setActiveAnnotation(ann)}
                        style={{ left: `${ann.xPercent}%`, top: `${ann.yPercent}%` }}
                        className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center font-mono text-xs font-semibold transition-transform duration-150 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#9A3412] text-white border-white scale-110 shadow-md'
                            : 'bg-[#1C1917]/85 text-[#FBF9F5] border-stone-400 hover:scale-105'
                        }`}
                      >
                        {ann.index}
                      </button>
                    );
                  })}
              </div>

              {/* Darkroom Toning Controls & Figure Caption */}
              <div className="pt-5 mt-5 border-t border-stone-200 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
                    Darkroom Emulsion Tone:
                  </span>
                  {/* Functional Segmented Filter Bar */}
                  <div
                    role="group"
                    aria-label="Darkroom Print Tone"
                    className="flex flex-wrap items-center gap-1 p-1 bg-stone-100 rounded-sm"
                  >
                    {(['silver', 'sepia', 'selenium', 'litho'] as PrintTone[]).map((tone) => (
                      <button
                        key={tone}
                        type="button"
                        onClick={() => setPrintTone(tone)}
                        className={`px-2.5 py-1 text-xs font-medium transition-colors rounded-sm cursor-pointer whitespace-nowrap shrink-0 ${
                          printTone === tone
                            ? 'bg-white text-stone-900 shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {tone === 'silver'
                          ? 'Gelatin Silver'
                          : tone === 'sepia'
                          ? 'Warm Sepia'
                          : tone === 'selenium'
                          ? 'Selenium'
                          : 'Gravure'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-serif italic text-stone-500">
                  <span>
                    Fig. 00 — Portrait of Jawaharlal Nehru, New Delhi, March 1956. Mode: {getToneLabel(printTone)}.
                  </span>
                  <span className="font-mono not-italic text-[11px] text-stone-400 tabular-nums">
                    50.8 × 40.6 cm
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Archival Provenance & Key Metrics Strip Below Hero Split */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 bg-[#F3EFE6]/70 border border-stone-200/80">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
              Tenure as First Prime Minister
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900 font-mono tabular-nums">
              16 Years, 286 Days
            </div>
            <div className="text-xs text-stone-600 mt-1">
              15 August 1947 – 27 May 1964 · 3 General Elections Won
            </div>
          </div>

          <div className="p-5 bg-[#F3EFE6]/70 border border-stone-200/80">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
              Portrait Sitting & Camera
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900">
              8 × 10 in. Calumet
            </div>
            <div className="text-xs text-stone-600 mt-1">
              Photographed by Yousuf Karsh · Teen Murti Bhavan, 1956
            </div>
          </div>

          <div className="p-5 bg-[#F3EFE6]/70 border border-stone-200/80">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
              Years in Colonial Detainment
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900 font-mono tabular-nums">
              3,259 Days (9 Terms)
            </div>
            <div className="text-xs text-stone-600 mt-1">
              1921 – 1945 · Authored 3 Major Books in Prison
            </div>
          </div>

          <div className="p-5 bg-[#F3EFE6]/70 border border-stone-200/80">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
              Inaugural Democratic Mandate
            </div>
            <div className="text-2xl font-serif font-bold text-stone-900 font-mono tabular-nums">
              173,212,343 Voters
            </div>
            <div className="text-xs text-stone-600 mt-1">
              1951–52 First Universal Franchise General Election
            </div>
          </div>
        </div>
      </main>

      {/* Section 2: Asymmetric Reading Canvas — "Tryst with Destiny" Address (Museum Pattern D) */}
      <section id="speech" className="border-t border-stone-200 bg-[#F5F2EB] py-20 px-6 lg:px-12">
        <div className="max-w-[1280px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-stone-300">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2">
                <span>01. Primary Document Transcription</span>
                <span aria-hidden="true">·</span>
                <span>Constituent Assembly Debates, Vol. V</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-serif font-bold text-stone-900"
                style={{ textWrap: 'balance' }}
              >
                “A Tryst with Destiny” — Midnight, 14 August 1947
              </h2>
            </div>

            {/* Interactive Controls for Transcript */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-sm">
                <button
                  type="button"
                  onClick={() => setSpeechViewMode('full')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    speechViewMode === 'full'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Full Reading Canvas</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSpeechViewMode('excerpts')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    speechViewMode === 'excerpts'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Core Constitutional Pledge</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyCitation}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-800 bg-white border border-stone-300 hover:bg-stone-100 transition-colors rounded-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Citation Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Archival Citation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Two-Column Asymmetric Reading Grid (70% Main Prose / 30% Margin Notes) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 8 Columns: Manuscript Text */}
            <div className="lg:col-span-8 bg-[#FBF9F5] p-8 sm:p-12 border border-stone-200">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-6 mb-8 border-b border-stone-200 text-xs font-mono text-stone-500">
                <span>COUNCIL HOUSE, NEW DELHI · FIFTH SESSION</span>
                <span>READING TIME: 4 MIN</span>
              </div>

              <div className="max-w-2xl space-y-6 text-stone-800 text-[17px] leading-[1.8] font-serif">
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900">
                  Long years ago we made a tryst with destiny, and now the time comes when we shall redeem our pledge, not wholly or in full measure, but very substantially.{' '}
                  <button
                    type="button"
                    onClick={() => setActiveSpeechNoteId('note-1')}
                    className={`font-mono text-xs px-1.5 py-0.5 align-baseline transition-colors cursor-pointer ${
                      activeSpeechNoteId === 'note-1'
                        ? 'bg-[#9A3412] text-white'
                        : 'text-[#9A3412] hover:underline'
                    }`}
                  >
                    [1]
                  </button>{' '}
                  At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom. A moment comes, which comes but rarely in history, when we step out from the old to the new, when an age ends, and when the soul of a nation, long suppressed, finds utterance.
                </p>

                <p>
                  It is fitting that at this solemn moment we take the pledge of dedication to the service of India and her people and to the still larger cause of humanity.{' '}
                  <button
                    type="button"
                    onClick={() => setActiveSpeechNoteId('note-2')}
                    className={`font-mono text-xs px-1.5 py-0.5 align-baseline transition-colors cursor-pointer ${
                      activeSpeechNoteId === 'note-2'
                        ? 'bg-[#9A3412] text-white'
                        : 'text-[#9A3412] hover:underline'
                    }`}
                  >
                    [2]
                  </button>{' '}
                  At the dawn of history India started on her unending quest, and trackless centuries are filled with her striving and the grandeur of her success and her failures. Through good and ill fortune alike she has never lost sight of that quest or forgotten the ideals which gave her strength. We end today a period of ill fortune and India discovers herself again.
                </p>

                {speechViewMode === 'full' && (
                  <>
                    <p>
                      The achievement we celebrate today is but a step, an opening of opportunity, to the greater triumphs and achievements that await us. Are we brave enough and wise enough to grasp this opportunity and accept the challenge of the future?
                    </p>

                    <p>
                      Freedom and power bring responsibility. The responsibility rests upon this Assembly, a sovereign body representing the sovereign people of India. Before the birth of freedom we have endured all the pains of labour and our hearts are heavy with the memory of this sorrow. Some of those pains continue even now. Nevertheless, the past is over and it is the future that beckons to us now.
                    </p>
                  </>
                )}

                <p>
                  That future is not one of ease or resting but of incessant striving so that we may fulfil the pledges we have so often taken and the one we shall take today. The service of India means the service of the millions who suffer. It means the ending of poverty and ignorance and disease and inequality of opportunity. Our ambition of the greatest man of our generation has been to wipe every tear from every eye.{' '}
                  <button
                    type="button"
                    onClick={() => setActiveSpeechNoteId('note-3')}
                    className={`font-mono text-xs px-1.5 py-0.5 align-baseline transition-colors cursor-pointer ${
                      activeSpeechNoteId === 'note-3'
                        ? 'bg-[#9A3412] text-white'
                        : 'text-[#9A3412] hover:underline'
                    }`}
                  >
                    [3]
                  </button>{' '}
                  That may be beyond us, but as long as there are tears and suffering, so long our work will not be over.
                </p>

                {speechViewMode === 'full' && (
                  <p>
                    And so we have to labour and to work, and work hard, to give reality to our dreams. Those dreams are for India, but they are also for the world, for all the nations and peoples are too closely knit together today for any one of them to imagine that it can live apart. Peace has been said to be indivisible; so is freedom, so is prosperity now, and so also is disaster in this One World that can no longer be split into isolated fragments.
                  </p>
                )}
              </div>
            </div>

            {/* Right 4 Columns: Margin Annotations & Session Context Rail */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="text-xs uppercase tracking-widest text-stone-500 font-semibold pb-3 border-b border-stone-300">
                Curatorial Margin Notes (Click [1]–[3])
              </div>

              <div className="space-y-4">
                {SPEECH_ANNOTATIONS.map((item) => {
                  const isSelected = activeSpeechNoteId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveSpeechNoteId(item.id)}
                      className={`p-5 border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#FBF9F5] border-stone-900'
                          : 'bg-[#FBF9F5]/60 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-xs font-semibold text-[#9A3412]">
                          ANNOTATION {item.marker}
                        </span>
                        <span className="text-[11px] font-mono text-stone-400">
                          {isSelected ? 'ACTIVE' : 'SELECT'}
                        </span>
                      </div>
                      <h3 className="text-base font-serif font-bold text-stone-900 mb-1.5">
                        {item.heading}
                      </h3>
                      <p className="text-sm text-stone-700 leading-relaxed mb-2.5">
                        {item.note}
                      </p>
                      <p className="text-xs text-stone-500 italic font-serif">
                        {item.historicalContext}
                      </p>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Section 3: Historical Timeline & Statecraft Archive */}
      <section id="chronology" className="bg-[#1C1917] text-[#F5F2EB] py-20 px-6 lg:px-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-400 font-semibold mb-2">
                <span>02. Biographical & Constitutional Chronology</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">1889 – 1964</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl font-serif font-bold text-[#FBF9F5]"
                style={{ textWrap: 'balance' }}
              >
                Milestones of Freedom & Institution Building
              </h2>
            </div>

            {/* Interactive Era Filter Segmented Control */}
            <div
              role="group"
              aria-label="Filter Chronology by Era"
              className="flex flex-wrap items-center gap-1 p-1 bg-stone-900 border border-stone-800 rounded-sm"
            >
              {(
                [
                  { id: 'all', label: `All Milestones (${TIMELINE_ENTRIES.length})` },
                  { id: 'freedom', label: 'Freedom Movement' },
                  { id: 'statecraft', label: 'Nation Building' },
                  { id: 'literary', label: 'Literary Works' }
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setEraFilter(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors rounded-sm cursor-pointer whitespace-nowrap shrink-0 ${
                    eraFilter === tab.id
                      ? 'bg-[#FBF9F5] text-stone-900'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chronological Grid List (Zero decorative pulsing dots; clean tabular year indices) */}
          <div className="divide-y divide-stone-800 border-y border-stone-800">
            {filteredTimeline.map((item, idx) => {
              const isExpanded = expandedTimelineYear === item.year;
              return (
                <article
                  key={item.year}
                  className="py-8 transition-colors"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Year & Archival Index Column */}
                    <div className="lg:col-span-3 flex lg:flex-col justify-between gap-2">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-stone-500 tabular-nums">
                          {String(idx + 1).padStart(2, '0')}.
                        </span>
                        <span className="font-serif text-3xl sm:text-4xl font-bold text-[#D6CEBE] tabular-nums">
                          {item.year}
                        </span>
                      </div>
                      <div className="text-xs text-stone-400 font-mono tabular-nums">
                        {item.dateLabel} · {item.archiveRef}
                      </div>
                    </div>

                    {/* Main Event Narrative Column */}
                    <div className="lg:col-span-7 space-y-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-stone-400">
                        <span>{item.eraLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.location}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-serif font-semibold text-white tracking-wide">
                        {item.title}
                      </h3>

                      <p className="text-stone-300 leading-relaxed text-[15px] max-w-[68ch]">
                        {item.event}
                      </p>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-stone-800/90 space-y-2">
                          <p className="font-serif italic text-base text-[#E5E0D8]">
                            “{item.primarySourceQuote}”
                          </p>
                          <p className="text-xs font-mono text-stone-400">
                            SOURCE: {item.sourceCitation}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Action Column: Expand Primary Source */}
                    <div className="lg:col-span-2 flex lg:justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedTimelineYear(isExpanded ? null : item.year)
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 border border-stone-700 hover:border-stone-500 hover:text-white transition-colors rounded-sm cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>{isExpanded ? 'Hide Excerpt' : 'Primary Source'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Archival Photographic Plates Gallery */}
      <section id="archives" className="max-w-[1280px] w-full mx-auto px-6 lg:px-12 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-12 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2">
              <span>03. Curated Contact Sheets & Plates</span>
              <span aria-hidden="true">·</span>
              <span>1946 – 1950</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-serif font-bold text-stone-900"
              style={{ textWrap: 'balance' }}
            >
              Archival Moments & Diplomatic Encounters
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md">
            Select any plate to inspect its curatorial essay, darkroom medium specifications, and historical provenance record.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {ARCHIVAL_PLATES.map((plate) => {
            const plateSrc =
              useWikimediaSource && !failedGalleryUrls[plate.id]
                ? plate.wikimediaUrl
                : plate.svgDataUri;

            return (
              <figure
                key={plate.id}
                className="group bg-white p-6 border border-stone-200 flex flex-col justify-between transition-colors hover:border-stone-400"
              >
                <div>
                  {/* Metadata Header (Unboxed text with · separators) */}
                  <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-stone-200 text-xs font-mono text-stone-500">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-800">{plate.figureNumber}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{plate.year}</span>
                      <span aria-hidden="true">·</span>
                      <span>{plate.location}</span>
                    </div>
                    <span className="tabular-nums">{plate.accessionNumber}</span>
                  </div>

                  {/* Plate Image Container */}
                  <div
                    onClick={() => openGalleryPlateModal(plate)}
                    className="relative overflow-hidden bg-[#141210] aspect-[4/3] border border-stone-200 cursor-pointer"
                  >
                    <img
                      src={plateSrc}
                      alt={plate.caption}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedGalleryUrls((prev) => ({ ...prev, [plate.id]: true }))
                      }
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02] ${getToneFilterClasses(
                        printTone
                      )}`}
                    />
                  </div>

                  {/* Figure Caption directly beneath image */}
                  <figcaption className="mt-3 text-xs font-serif italic text-stone-500">
                    {plate.figureNumber} — {plate.caption}
                  </figcaption>

                  <h3 className="mt-4 text-xl font-serif font-bold text-stone-900">
                    {plate.title}
                  </h3>

                  <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                    {plate.curatorialEssay}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
                  <span className="font-mono text-stone-500">{plate.dimensions}</span>
                  <button
                    type="button"
                    onClick={() => openGalleryPlateModal(plate)}
                    className="inline-flex items-center gap-1 font-semibold text-stone-900 hover:text-[#9A3412] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Inspect Plate & Provenance</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </figure>
            );
          })}
        </div>
      </section>

      {/* Museum Accession Detail View & Plate Lightbox Modal (Museum Pattern B) */}
      {isDossierOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-accession-title"
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div className="bg-[#FBF9F5] border border-stone-300 max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-xl">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-stone-300">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                <span>MUSEUM ACCESSION DETAIL VIEW</span>
                <span aria-hidden="true">·</span>
                <span>
                  {selectedPlate
                    ? selectedPlate.accessionNumber
                    : PORTRAIT_ACCESSION_RECORD.accessionNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsDossierOpen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-200/80 hover:bg-stone-300 transition-colors rounded-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                <X className="w-4 h-4" />
                <span>Close Dossier</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 6 Columns: Interactive Zoomable Plate Viewer */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center justify-between gap-2 bg-stone-100 p-2 border border-stone-200">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setLightboxZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
                      className="px-2.5 py-1 text-xs font-medium bg-white border border-stone-200 hover:bg-stone-50 cursor-pointer inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                      <span>Zoom Out</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLightboxZoom((z) => Math.min(2, +(z + 0.25).toFixed(2)))}
                      className="px-2.5 py-1 text-xs font-medium bg-white border border-stone-200 hover:bg-stone-50 cursor-pointer inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Zoom In</span>
                    </button>
                    <span className="px-2 text-xs font-mono text-stone-600 tabular-nums">
                      {Math.round(lightboxZoom * 100)}%
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowOpticalGrid(!showOpticalGrid)}
                    className={`px-2.5 py-1 text-xs font-medium border cursor-pointer inline-flex items-center gap-1 whitespace-nowrap shrink-0 ${
                      showOpticalGrid
                        ? 'bg-[#1C1917] text-white border-[#1C1917]'
                        : 'bg-white text-stone-700 border-stone-200'
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                    <span>Rule-of-Thirds Grid</span>
                  </button>
                </div>

                <div className="relative overflow-hidden bg-[#141210] border border-stone-300 aspect-[4/5] flex items-center justify-center">
                  <img
                    src={
                      selectedPlate
                        ? useWikimediaSource && !failedGalleryUrls[selectedPlate.id]
                          ? selectedPlate.wikimediaUrl
                          : selectedPlate.svgDataUri
                        : activePortraitSrc
                    }
                    alt={
                      selectedPlate
                        ? selectedPlate.title
                        : PORTRAIT_ACCESSION_RECORD.title
                    }
                    referrerPolicy="no-referrer"
                    style={{ transform: `scale(${lightboxZoom})` }}
                    className={`w-full h-full object-contain transition-transform duration-150 ${getToneFilterClasses(
                      printTone
                    )}`}
                  />

                  {showOpticalGrid && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3"
                    >
                      <div className="border-r border-b border-amber-400/35" />
                      <div className="border-r border-b border-amber-400/35" />
                      <div className="border-b border-amber-400/35" />
                      <div className="border-r border-b border-amber-400/35" />
                      <div className="border-r border-b border-amber-400/35" />
                      <div className="border-b border-amber-400/35" />
                      <div className="border-r border-amber-400/35" />
                      <div className="border-r border-amber-400/35" />
                      <div />
                    </div>
                  )}
                </div>
              </div>

              {/* Right 6 Columns: Museum Accession Definition List (<dl>) */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h2
                    id="modal-accession-title"
                    className="text-2xl sm:text-3xl font-serif font-bold text-stone-900"
                  >
                    {selectedPlate
                      ? selectedPlate.title
                      : PORTRAIT_ACCESSION_RECORD.title}
                  </h2>
                  <p className="text-sm text-stone-600 mt-1">
                    {selectedPlate
                      ? selectedPlate.caption
                      : 'Iconic three-quarter studio study captured during Yousuf Karsh’s 1956 sitting in New Delhi.'}
                  </p>
                </div>

                <dl className="divide-y divide-stone-200 border-y border-stone-200 text-sm">
                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                      Accession No.
                    </dt>
                    <dd className="col-span-2 font-mono text-stone-900">
                      {selectedPlate
                        ? selectedPlate.accessionNumber
                        : PORTRAIT_ACCESSION_RECORD.accessionNumber}
                    </dd>
                  </div>

                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                      Artist / Maker
                    </dt>
                    <dd className="col-span-2 text-stone-900">
                      {selectedPlate
                        ? selectedPlate.photographer
                        : PORTRAIT_ACCESSION_RECORD.artist}
                    </dd>
                  </div>

                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                      Date & Sitting
                    </dt>
                    <dd className="col-span-2 text-stone-900 font-mono tabular-nums">
                      {selectedPlate
                        ? `${selectedPlate.year} · ${selectedPlate.location}`
                        : PORTRAIT_ACCESSION_RECORD.dateOfSitting}
                    </dd>
                  </div>

                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                      Medium & Technique
                    </dt>
                    <dd className="col-span-2 text-stone-900">
                      {selectedPlate
                        ? selectedPlate.medium
                        : PORTRAIT_ACCESSION_RECORD.medium}
                    </dd>
                  </div>

                  <div className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                      Dimensions
                    </dt>
                    <dd className="col-span-2 font-mono text-stone-900 tabular-nums">
                      {selectedPlate
                        ? selectedPlate.dimensions
                        : PORTRAIT_ACCESSION_RECORD.dimensions}
                    </dd>
                  </div>
                </dl>

                <div>
                  <h3 className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-2">
                    Provenance & Curatorial Record
                  </h3>
                  {selectedPlate ? (
                    <p className="text-sm text-stone-700 leading-relaxed">
                      {selectedPlate.curatorialEssay}
                    </p>
                  ) : (
                    <ul className="space-y-2 text-xs text-stone-700 font-mono">
                      {PORTRAIT_ACCESSION_RECORD.provenance.map((line, i) => (
                        <li key={i} className="leading-relaxed">
                          {line}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiet Institutional Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-[#F3EFE6] px-6 lg:px-12 py-10 text-xs text-stone-600">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-serif font-bold text-stone-900 text-sm">
              Jawaharlal Nehru Archival Monograph
            </div>
            <p>
              Curatorial portrait exhibition and constitutional document reader. Historical transcripts and public-domain archival plates preserved for educational study.
            </p>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px] text-stone-500 shrink-0">
            <a href="#portrait" className="hover:text-stone-900 transition-colors">
              Portrait
            </a>
            <a href="#speech" className="hover:text-stone-900 transition-colors">
              Speech
            </a>
            <a href="#chronology" className="hover:text-stone-900 transition-colors">
              Chronology
            </a>
            <a href="#archives" className="hover:text-stone-900 transition-colors">
              Plates
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
