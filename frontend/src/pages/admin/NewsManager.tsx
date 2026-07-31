import { useState } from 'react';
import { useAdminData } from '../../context/adminData';
import type { NewsArticle } from '../../types';

const emptyArticle: Omit<NewsArticle, 'id'> = {
  title: '',
  excerpt: '',
  date: '',
  category: '',
  color: 'ba-red',
};

export default function NewsManager() {
  const { data, addNews, updateNews, deleteNews } = useAdminData();
  const [editing, setEditing] = useState<NewsArticle | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState(emptyArticle);

  const openAdd = () => {
    const now = new Date();
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    setForm({ ...emptyArticle, date: dateStr });
    setIsAdding(true);
    setEditing(null);
  };

  const openEdit = (item: NewsArticle) => {
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      date: item.date,
      category: item.category,
      color: item.color,
    });
    setEditing(item);
    setIsAdding(false);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editing) {
      updateNews(editing.id, form);
    } else {
      addNews(form);
    }
    closeModal();
  };

  const closeModal = () => {
    setEditing(null);
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    deleteNews(id);
    setDeleteConfirm(null);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <p style={{ color: '#E5E7EB', fontSize: '0.875rem' }}>
          Gérez les articles d'actualité et communiqués de presse.
        </p>
        <button className="admin-btn admin-btn-red" onClick={openAdd}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Ajouter
        </button>
      </div>

      {/* Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrapper">
          <table className="admin-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.news.map((article) => (
              <tr key={article.id}>
                <td>
                  <div>
                    <div style={{ fontWeight: 600, color: '#FFFFFF', marginBottom: '0.25rem' }}>{article.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#E5E7EB', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {article.excerpt}
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem', color: '#E5E7EB', fontWeight: 600 }}>
                    {article.category}
                  </span>
                </td>
                <td style={{ whiteSpace: 'nowrap', color: '#FFFFFF', fontSize: '0.85rem' }}>
                  {article.date}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button onClick={() => openEdit(article)} style={{ background: 'none', border: 'none', color: '#E5E7EB', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.8rem', padding: '0.375rem 0' }}>
                      Modifier
                    </button>
                    <button onClick={() => setDeleteConfirm(article.id)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.375rem', display: 'flex', alignItems: 'center' }}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {data.news.length === 0 && (
          <div className="admin-empty">
            <div className="admin-empty-icon">
              <svg width="28" height="28" fill="none" stroke="#475569" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25" />
              </svg>
            </div>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Aucune actualité. Cliquez sur "Ajouter" pour en publier une.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {(isAdding || editing) && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2 className="admin-modal-title">
                {editing ? 'Modifier l\'article' : 'Nouvelle actualité'}
              </h2>
              <button className="admin-modal-close" onClick={closeModal}>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label className="admin-label">Titre</label>
                  <input type="text" className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Titre de l'article" />
                </div>
                <div>
                  <label className="admin-label">Extrait / Résumé</label>
                  <textarea className="admin-textarea" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Résumé court de l'article..." />
                </div>
                <div className="admin-grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label className="admin-label">Date</label>
                    <input type="text" className="admin-input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="Ex: 15 Juil 2026" />
                  </div>
                  <div>
                    <label className="admin-label">Catégorie</label>
                    <select className="admin-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      <option value="">— Choisir —</option>
                      <option value="Protection">Protection</option>
                      <option value="Santé">Santé</option>
                      <option value="Éducation">Éducation</option>
                      <option value="Environnement">Environnement</option>
                      <option value="Général">Général</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="admin-label">Couleur</label>
                  <select className="admin-select" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value as 'ba-red' | 'ba-green' })}>
                    <option value="ba-red">Rouge</option>
                    <option value="ba-green">Vert</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-ghost" onClick={closeModal}>Annuler</button>
              <button className="admin-btn admin-btn-green" onClick={handleSave}>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {editing ? 'Sauvegarder' : 'Publier'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="admin-confirm-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-confirm-dialog" onClick={(e) => e.stopPropagation()}>
            <div style={{ width: 56, height: 56, borderRadius: '1rem', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <svg width="28" height="28" fill="none" stroke="#EF4444" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.125rem', color: '#F1F5F9', marginBottom: '0.5rem' }}>
              Supprimer cet article ?
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              Cette action est irréversible.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button className="admin-btn admin-btn-ghost" onClick={() => setDeleteConfirm(null)}>Annuler</button>
              <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(deleteConfirm)}>Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
