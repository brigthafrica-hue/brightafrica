import { useI18n } from '../i18n';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
  const { t } = useI18n();
  const { ref: headerRef, isVisible: isHeaderVisible } = useScrollReveal();
  const { ref: historyRef, isVisible: isHistoryVisible } = useScrollReveal();
  const { ref: govRef, isVisible: isGovVisible } = useScrollReveal();

  return (
    <div style={{ paddingTop: '150px' }} className="pb-20">
      {/* Header */}
      <div 
        ref={headerRef} 
        className={`container-ba text-center mb-16 transition-all duration-700 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{t.about.title}</h1>
        <p className="text-ba-text-secondary text-lg text-justify">{t.about.subtitle}</p>
      </div>

      {/* History & Context */}
      <div className="bg-ba-surface-elevated dark:bg-ba-dark-light py-16">
        <div 
          ref={historyRef} 
          className={`container-ba transition-all duration-700 ${isHistoryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-3xl font-bold mb-4 text-ba-red">{t.about.history_title}</h2>
                <p className="text-ba-text-secondary text-base md:text-lg leading-loose text-justify">
                  {t.about.history_text}
                </p>
              </div>
              
              <div>
                <h3 className="font-heading text-2xl font-bold mb-3 text-ba-green">{t.about.vision_title}</h3>
                <p className="text-ba-text-secondary text-base md:text-lg leading-loose text-justify">
                  {t.about.vision_text}
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold mb-3 text-ba-green">{t.about.mission_title}</h3>
                <p className="text-ba-text-secondary text-base md:text-lg leading-loose text-justify">
                  {t.about.mission_text}
                </p>
              </div>

              {/* Statuts Summary Grid */}
              <div className="pt-4 border-t border-ba-gray dark:border-ba-dark-lighter">
                 <h4 className="font-heading font-bold text-lg mb-4 text-ba-text-primary">Fiche d'Identité Statutaire</h4>
                 <div className="grid grid-cols-2 gap-4 text-sm">
                   <div className="bg-white/50 dark:bg-ba-dark/50 p-3 rounded-lg border border-ba-gray/50 dark:border-ba-dark-lighter/50">
                     <span className="font-semibold block text-ba-red">Forme Juridique :</span>
                     <span className="text-ba-text-secondary">ONG & ASBL (Loi n° 004/2001)</span>
                   </div>
                   <div className="bg-white/50 dark:bg-ba-dark/50 p-3 rounded-lg border border-ba-gray/50 dark:border-ba-dark-lighter/50">
                     <span className="font-semibold block text-ba-red">Date de Création :</span>
                     <span className="text-ba-text-secondary">1er Janvier 2026 (Durée illimitée)</span>
                   </div>
                   <div className="bg-white/50 dark:bg-ba-dark/50 p-3 rounded-lg border border-ba-gray/50 dark:border-ba-dark-lighter/50">
                     <span className="font-semibold block text-ba-red">Siège Social :</span>
                     <span className="text-ba-text-secondary">Av. de la Paix, Q. Himbi, Goma (Nord-Kivu)</span>
                   </div>
                   <div className="bg-white/50 dark:bg-ba-dark/50 p-3 rounded-lg border border-ba-gray/50 dark:border-ba-dark-lighter/50">
                     <span className="font-semibold block text-ba-red">Rayon d'Action :</span>
                     <span className="text-ba-text-secondary">Afrique</span>
                   </div>
                 </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-ba-red/20 to-ba-green/20 rounded-3xl transform translate-x-4 translate-y-4"></div>
              <div className="glass-card p-6 relative rounded-3xl border-2 border-white/10 shadow-xl overflow-hidden aspect-square flex items-center justify-center bg-white/80 dark:bg-ba-dark-light/80 backdrop-blur-md">
                <img 
                  src="/logo.png" 
                  alt="Bright Africa Logo" 
                  className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Governance & Documents */}
      <div className="py-20">
        <div 
          ref={govRef} 
          className={`container-ba transition-all duration-700 ${isGovVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">{t.about.governance_title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {/* Governance Cards */}
             <div className="glass-card p-8 text-center border-t-4 border-ba-red shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
                <h4 className="font-heading font-bold text-xl mb-4 text-ba-text-primary">{t.about.ag}</h4>
                <p className="text-ba-text-secondary text-sm leading-relaxed">{t.about.ag_desc}</p>
             </div>
             <div className="glass-card p-8 text-center border-t-4 border-ba-green shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
                <h4 className="font-heading font-bold text-xl mb-4 text-ba-text-primary">{t.about.ca}</h4>
                <p className="text-ba-text-secondary text-sm leading-relaxed">{t.about.ca_desc}</p>
             </div>
             <div className="glass-card p-8 text-center border-t-4 border-ba-red shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
                <h4 className="font-heading font-bold text-xl mb-4 text-ba-text-primary">{t.about.bureau}</h4>
                <p className="text-ba-text-secondary text-sm leading-relaxed">{t.about.bureau_desc}</p>
             </div>
             <div className="glass-card p-8 text-center border-t-4 border-ba-green shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
                <h4 className="font-heading font-bold text-xl mb-4 text-ba-text-primary">{t.about.direction}</h4>
                <p className="text-ba-text-secondary text-sm leading-relaxed">{t.about.direction_desc}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
