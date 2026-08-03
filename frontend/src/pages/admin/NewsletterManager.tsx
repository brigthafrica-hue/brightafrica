import { useState } from 'react';
import { useAdminData } from '../../context/adminData';

export default function NewsletterManager() {
  const { subscribers, removeSubscriber, addSubscriber, broadcastNewsletter, newsletterLogs } = useAdminData();
  const [newEmail, setNewEmail] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [customBody, setCustomBody] = useState('');
  const [broadcasting, setBroadcasting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    const res = addSubscriber(newEmail.trim());
    if (res.success) {
      setFeedback({ type: 'success', text: `Abonné ${newEmail} ajouté avec succès !` });
      setNewEmail('');
    } else {
      setFeedback({ type: 'error', text: res.message || 'Cet e-mail est déjà inscrit.' });
    }
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleSendCustomBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSubject.trim() || !customBody.trim()) {
      setFeedback({ type: 'error', text: 'Veuillez remplir le sujet et le message de la newsletter.' });
      return;
    }

    if (subscribers.length === 0) {
      setFeedback({ type: 'error', text: 'Aucun abonné enregistré dans la base de données.' });
      return;
    }

    setBroadcasting(true);
    setTimeout(() => {
      broadcastNewsletter({
        subject: customSubject,
        content: customBody,
        type: 'DIRECT',
      });
      setBroadcasting(false);
      setCustomSubject('');
      setCustomBody('');
      setFeedback({
        type: 'success',
        text: `Newsletter diffusée avec succès à ${subscribers.length} abonné(s) !`,
      });
      setTimeout(() => setFeedback(null), 5000);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-white mb-2">Gestion de la Newsletter & Abonnés</h1>
        <p className="text-gray-300 text-sm">
          Gérez la liste des abonnés, envoyez des newsletters ciblées et consultez l'historique des notifications automatiques envoyées lors de la publication de projets ou d'actualités.
        </p>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between ${
            feedback.type === 'success'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-red-500/20 text-red-300 border border-red-500/40'
          }`}
        >
          <span>{feedback.text}</span>
          <button onClick={() => setFeedback(null)} className="text-xs opacity-75 hover:opacity-100">
            ✕
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="admin-stat-card">
          <div className="admin-stat-icon bg-ba-red/20 text-ba-red">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <div className="admin-stat-value">{subscribers.length}</div>
            <div className="admin-stat-label">Abonnés Actifs</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon bg-ba-green/20 text-ba-green">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <div className="admin-stat-value">{newsletterLogs.length}</div>
            <div className="admin-stat-label">Diffusions Envoyées</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon bg-blue-500/20 text-blue-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="admin-stat-value">Automatique</div>
            <div className="admin-stat-label">Notifications Projets & News</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Subscribers Table & Add (Left - 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Add Subscriber Form */}
          <div className="admin-card space-y-4">
            <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-ba-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Ajouter Manuellement un Abonné
            </h2>
            <form onSubmit={handleManualAdd} className="flex gap-3">
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Ex: abonne@gmail.com"
                className="admin-input flex-1"
              />
              <button type="submit" className="admin-btn admin-btn-green shrink-0">
                + Ajouter
              </button>
            </form>
          </div>

          {/* Subscribers List */}
          <div className="admin-card space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-white">Liste des Abonnés ({subscribers.length})</h2>
            </div>

            {subscribers.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                Aucun abonné pour le moment. Les utilisateurs s'inscrivant via le formulaire du bas de page apparaîtront ici.
              </div>
            ) : (
              <div className="admin-table-wrapper overflow-x-auto">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Date d'inscription</th>
                      <th>Statut</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub) => (
                      <tr key={sub.id || sub.email}>
                        <td className="font-medium text-white">{sub.email}</td>
                        <td className="text-gray-300 text-xs">{sub.subscribedAt || 'Récemment'}</td>
                        <td>
                          <span className="admin-badge admin-badge-green">Abonné</span>
                        </td>
                        <td className="text-right">
                          <button
                            onClick={() => removeSubscriber(sub.email)}
                            className="admin-btn admin-btn-danger admin-btn-sm"
                            title="Supprimer l'abonné"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Custom Broadcast & Logs (Right - 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Custom Broadcast Form */}
          <div className="admin-card space-y-4">
            <h2 className="font-heading text-lg font-bold text-white flex items-center gap-2">
              <svg className="w-5 h-5 text-ba-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Diffuser une Newsletter Personnalisée
            </h2>
            <form onSubmit={handleSendCustomBroadcast} className="space-y-4">
              <div>
                <label className="admin-label">Sujet de l'Email *</label>
                <input
                  type="text"
                  required
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="Ex: Nouvelles de nos projets humanitaires..."
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label">Contenu du Message *</label>
                <textarea
                  required
                  rows={5}
                  value={customBody}
                  onChange={(e) => setCustomBody(e.target.value)}
                  placeholder="Rédigez ici votre message à l'attention des abonnés de l'ONG Bright African..."
                  className="admin-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={broadcasting || subscribers.length === 0}
                className={`admin-btn admin-btn-red w-full ${broadcasting ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {broadcasting ? 'Envoi en cours...' : `Envoyer à tous les ${subscribers.length} abonnés`}
              </button>
            </form>
          </div>

          {/* Logs of Sent Emails */}
          <div className="admin-card space-y-4">
            <h2 className="font-heading text-lg font-bold text-white">Historique des Diffusions ({newsletterLogs.length})</h2>
            {newsletterLogs.length === 0 ? (
              <p className="text-gray-400 text-xs">Aucune diffusion enregistrée. Lors de la publication d'un projet ou d'une actualité, le journal d'envoi apparaîtra ici.</p>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {newsletterLogs.slice().reverse().map((log) => (
                  <div key={log.id} className="p-3 bg-gray-800/80 rounded-lg border border-gray-700 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-bold ${log.type === 'PROJECT' ? 'text-blue-400' : log.type === 'NEWS' ? 'text-ba-green' : 'text-ba-red'}`}>
                        {log.type === 'PROJECT' ? '📢 NOUVEAU PROJET' : log.type === 'NEWS' ? '📰 NOUVELLE ACTUALITÉ' : '✉️ NEWSLETTER'}
                      </span>
                      <span className="text-gray-400">{log.sentAt}</span>
                    </div>
                    <div className="font-semibold text-sm text-white">{log.subject}</div>
                    <div className="text-xs text-gray-300 line-clamp-2">{log.content}</div>
                    <div className="text-[11px] text-emerald-400 font-mono">Envoyé à {log.recipientCount} abonné(s)</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
