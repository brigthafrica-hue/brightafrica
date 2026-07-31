import { useI18n } from '../i18n';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useAdminData } from '../context/adminData';

export default function News() {
  const { t } = useI18n();
  const { ref, isVisible } = useScrollReveal();
  const { data } = useAdminData();

  const articles = data.news;

  return (
    <div style={{ paddingTop: '150px' }} className="pb-20">
      <div 
        ref={ref} 
        className={`container-ba text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{t.news.title}</h1>
        <p className="text-ba-text-secondary text-lg text-justify">
          {t.news.subtitle}
        </p>
      </div>

      <div className="container-ba">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const colorClass = article.color === 'ba-red' ? 'text-ba-red' : 'text-ba-green';
            const badgeBg = article.color === 'ba-red' ? 'bg-ba-red/10 text-ba-red' : 'bg-ba-green/10 text-ba-green';
            const gradientBg = article.color === 'ba-red' ? 'from-ba-red/20 to-ba-red/5' : 'from-ba-green/20 to-ba-green/5';

            return (
              <article key={article.id} className="glass-card group flex flex-col justify-between">
                <div>
                  <div className={`h-48 bg-gradient-to-br ${gradientBg} flex items-center justify-center rounded-t-[1.25rem] overflow-hidden`}>
                    <span className="text-4xl opacity-50">📰</span>
                  </div>
                  <div className="px-6 pt-5 pb-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeBg}`}>
                        {article.category}
                      </span>
                      <span className="text-xs text-ba-text-muted">{article.date}</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-ba-red transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-ba-text-secondary text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <button className={`text-sm font-semibold ${colorClass} flex items-center gap-2 group-hover:gap-3 transition-all`}>
                    {t.news.read_more}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
