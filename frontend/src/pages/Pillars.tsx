import { useI18n } from '../i18n';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useAdminData } from '../context/adminData';

export default function Pillars() {
  const { t } = useI18n();
  const { ref: headerRef, isVisible: isHeaderVisible } = useScrollReveal();
  const { data } = useAdminData();

  return (
    <div style={{ paddingTop: '150px' }} className="pb-20">
      <div 
        ref={headerRef} 
        className={`container-ba text-center mb-16 transition-all duration-700 ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{t.pillars.title}</h1>
        <p className="text-ba-text-secondary text-lg text-justify">{t.pillars.subtitle}</p>
      </div>

      <div className="container-ba space-y-24">
        {data.pillars.map((pillar, index) => {
          const isEven = index % 2 === 0;
          const titleColorClass = pillar.color === 'ba-red' ? 'text-ba-red' : 'text-ba-green';

          return (
            <div key={pillar.id || index} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className={isEven ? 'order-2 md:order-1' : ''}>
                <h2 className={`font-heading text-3xl font-bold mb-4 ${titleColorClass}`}>{pillar.title}</h2>
                <p className="text-ba-text-secondary leading-relaxed mb-6">
                  {pillar.description}
                </p>
                {pillar.bulletPoints && pillar.bulletPoints.length > 0 && (
                  <ul className="space-y-3 mb-6 text-sm text-ba-text-secondary">
                    {pillar.bulletPoints.map((bp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`${titleColorClass} mt-1`}>●</span> {bp}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className={`overflow-hidden rounded-2xl shadow-xl h-72 ${isEven ? 'order-1 md:order-2' : ''}`}>
                {pillar.image ? (
                  <img src={pillar.image} alt={pillar.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-ba-dark-light flex items-center justify-center text-ba-text-muted">
                    Pas d'image
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
