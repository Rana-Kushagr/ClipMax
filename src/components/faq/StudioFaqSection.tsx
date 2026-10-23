import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, Mail } from 'lucide-react';
import { MarkerUnderline } from '../brand/SharkoBrandLogo';

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'How do clippers actually make money with Sharko?',
    a: 'Clippers monetize in three ways: (1) Creator bounties and brand sponsorships where you get paid per 1,000 views, (2) Charging podcast hosts and YouTubers monthly retainers ($1,000–$3,000/mo) to repurpose their long videos into viral shorts, and (3) Building faceless YouTube Shorts and TikTok affiliate channels.',
  },
  {
    q: 'How do I find clients if I am just starting out?',
    a: 'We teach you the exact DM and email outreach frameworks. You can create 3 free watermark-free sample clips of a creator’s podcast on Sharko, send it to them via Instagram DM or Twitter, and show them the exact value before they pay a dime. 80% of creators reply when you show them finished work upfront.',
  },
  {
    q: 'Do I need prior video editing experience?',
    a: 'Zero. Sharko’s AI automatically finds the most engaging hooks, reframes horizontal footage to vertical 9:16 with multi-speaker detection, adds animated kinetic captions, and exports in 1080p 60fps with one click.',
  },
  {
    q: 'Can I use Sharko for my own content instead of client work?',
    a: 'Absolutely! Thousands of streamers, podcasters, educators, and YouTubers use Sharko to turn their own 2-hour streams and webinars into 30+ shorts every single week without hiring an expensive editing agency.',
  },
  {
    q: 'Are captions generated automatically, and can I customize them?',
    a: 'Yes! Sharko transcribes audio with 99% accuracy in over 40 languages and generates animated word-by-word kinetic captions in MrBeast, Hormozi, Dev, and Clean styles with full font, color, and positioning controls.',
  },
  {
    q: 'Can I cancel my subscription or request data erasure at any time?',
    a: 'Yes. You can cancel with 1 click in your dashboard at any time with no questions asked. Sharko also complies fully with India’s DPDP Act 2023—you can export or permanently purge all your video caches with one click or email founder Kushagr Rana directly at kushagrrana7345@gmail.com.',
  },
];

export const StudioFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-[#060913] relative overflow-hidden select-none scroll-mt-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Image 6 Mirror */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EBF3FF] dark:bg-[#0066FF]/20 border border-[#BFDBFE] dark:border-[#0066FF]/40 text-[#0066FF] dark:text-[#89CFF0] text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-spark" />
            <span>Answers to common questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0B0F19] dark:text-white tracking-tight font-display mb-3">
            Got Questions? We{' '}
            <MarkerUnderline color="pink" showSparks>
              Got Answers.
            </MarkerUnderline>
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-sans">
            Everything you need to know about Sharko and how it can help you start (and scale) your clipping side hustle.
          </p>
        </div>

        {/* 6 White Accordion Cards: Image 6 Mirror */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 bg-white dark:bg-[#0F172A] ${
                  isOpen
                    ? 'border-[#0066FF]/40 shadow-[0_10px_30px_rgba(0,102,255,0.06)] ring-1 ring-[#0066FF]/20'
                    : 'border-slate-200/90 dark:border-slate-800 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-slate-300 dark:hover:border-slate-700'
                } overflow-hidden`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-5 sm:px-7 flex items-center justify-between gap-4 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 pr-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#0066FF] text-white'
                          : 'bg-[#EBF3FF] dark:bg-[#0066FF]/20 text-[#0066FF] dark:text-[#89CFF0]'
                      }`}
                    >
                      ?
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white text-base sm:text-lg leading-snug">
                      {item.q}
                    </span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 text-[#0066FF] dark:text-[#89CFF0] bg-[#EBF3FF] dark:bg-[#0066FF]/20'
                        : 'text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-7 pb-6 pt-1 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 font-sans border-t border-slate-100 dark:border-slate-800/80">
                    <div className="pl-12">{item.a}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <Mail className="w-4 h-4 text-[#0066FF] dark:text-[#89CFF0]" />
            <span>Still have questions?</span>
            <a
              href="mailto:kushagrrana7345@gmail.com"
              className="text-[#0066FF] dark:text-[#89CFF0] font-semibold hover:underline"
            >
              Email founder Kushagr Rana directly →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
