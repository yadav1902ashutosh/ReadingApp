import react from 'react'

export default function Footer()
{
    const categories = [
    {
      title: "The Stacks",
      links: ["Grand Archives", "Literary Genres", "Serial Serials", "Illustrated Manuscripts"]
    },
    {
      title: "Scriptorium",
      links: ["Personal Study", "Journal Entry", "Margin Notes", "Publishing Guild"]
    },
    {
      title: "Community",
      links: ["Reading Saloon", "Collector's Den", "Florins Exchange", "Discord Guild"]
    }
  ];

  return (
    <footer className="bg-surface-container-low border-t border-[#E2D8B8] text-on-surface mt-20">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin py-space-xl">
            {/* Top Grid: Brand Identity & Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          
          {/* Brand Info (Spans 5 cols on desktop) */}
          <div className="md:col-span-5 flex flex-col gap-space-sm pr-0 md:pr-space-lg">
            <div className="flex items-center gap-3">
              <span className="font-headline font-bold text-headline-md text-primary">
                Deckle
              </span>
              <span className="font-label text-label-sm text-on-surface-variant uppercase tracking-widest text-[10px] border-l border-[#E2D8B8] pl-3">
                Serial Library &amp; Scriptorium
              </span>
            </div>
            
            <p className="font-body text-body-md text-on-surface-variant leading-relaxed max-w-md">
              A digital sanctuary for web novels, serial fiction, and illuminated manuscripts. Designed for deep reading, study, and scribal expression.
            </p>
          </div>

          {/* Links Columns (Spans 7 cols on desktop) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-gutter mt-6 md:mt-0">
            {categories.map((col, idx) => (
              <div key={idx} className="flex flex-col gap-space-xs">
                <h4 className="font-label font-bold text-label-md text-primary uppercase tracking-wider">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-1.5 mt-1">
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a 
                        href="#" 
                        className="font-body text-body-sm text-on-surface-variant hover:text-primary transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-[#E2D8B8] my-space-lg" />

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md font-label text-label-sm text-on-surface-variant">
          <p>© {new Date().getFullYear()} Deckle Scriptorium. All rights preserved.</p>

          <div className="flex items-center gap-space-md">
            <a href="#" className="hover:text-on-surface transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-on-surface transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-on-surface transition-colors">Colophon</a>
          </div>
          </div>
        </div>
    </footer>
  )
}