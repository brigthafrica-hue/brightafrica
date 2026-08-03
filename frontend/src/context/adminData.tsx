import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AdminData, ImpactCounter, Pillar, NewsArticle, Project, ContactInfo, AdminUser } from '../types';
import { apiFetch } from '../services/api';

/* ===== DEFAULT DATA (mirrors existing hardcoded content) ===== */
const DEFAULT_DATA: AdminData = {
  impact: [
    { id: '1', value: 2500, label: 'Enfants accompagnés', label_en: 'Children supported', color: 'ba-red' },
    { id: '2', value: 45, label: 'Écoles soutenues', label_en: 'Schools supported', color: 'ba-green' },
    { id: '3', value: 12000, label: 'Arbres plantés', label_en: 'Trees planted', color: 'ba-green' },
    { id: '4', value: 350, label: 'Sensibilisations', label_en: 'Awareness sessions', color: 'ba-red' },
  ],
  pillars: [
    {
      id: '1',
      title: 'Protection de l\'Enfant',
      title_en: 'Child Protection',
      description: 'Lutte contre les violences, l\'exploitation, le travail des enfants, le mariage forcé/précoce et le recrutement dans les groupes armés. Accompagnement psychosocial, juridique et mécanisme d\'alerte aux autorités.',
      description_en: 'Fighting violence, exploitation, child labor, forced/early marriage and recruitment into armed groups. Psychosocial and legal support, and alert mechanisms to authorities.',
      image: '/pillars/protection.jpg',
      color: 'ba-red',
      gradient: 'from-red-500/10 to-red-600/5',
      bulletPoints: [
        'Lutte contre le travail des enfants et le recrutement armé.',
        'Accompagnement psychosocial pour les enfants victimes de violences.',
      ],
      bulletPoints_en: [
        'Fight against child labor and armed recruitment.',
        'Psychosocial support for children who are victims of violence.',
      ],
    },
    {
      id: '2',
      title: 'Santé Maternelle & Infantile',
      title_en: 'Maternal & Child Health',
      description: 'Sensibilisation à l\'hygiène, prévention sanitaire, assainissement et santé de la mère et de l\'enfant.',
      description_en: 'Hygiene awareness, health prevention, sanitation and maternal and child health.',
      image: '/pillars/sante.jpg',
      color: 'ba-green',
      gradient: 'from-green-500/10 to-green-600/5',
      bulletPoints: [
        'Prévention sanitaire et campagnes de vaccination.',
        'Sensibilisation à l\'hygiène et assainissement (WASH).',
      ],
      bulletPoints_en: [
        'Health prevention and vaccination campaigns.',
        'Hygiene awareness and sanitation (WASH).',
      ],
    },
    {
      id: '3',
      title: 'Éducation & Formation',
      title_en: 'Education & Training',
      description: 'Alphabétisation, formation professionnelle des jeunes, soutien à la scolarisation (notamment la jeune fille).',
      description_en: 'Literacy, youth vocational training, support for schooling (especially for girls).',
      image: '/pillars/formation.jpg',
      color: 'ba-red',
      gradient: 'from-red-500/10 to-orange-500/5',
      bulletPoints: [
        'Soutien matériel et financier à la scolarisation.',
        'Formation professionnelle pour l\'autonomisation des jeunes.',
      ],
      bulletPoints_en: [
        'Material and financial support for schooling.',
        'Vocational training for youth empowerment.',
      ],
    },
    {
      id: '4',
      title: 'Éducation Environnementale',
      title_en: 'Environmental Education',
      description: 'Reforestation, préservation des écosystèmes, lutte contre la déboisement, gestion durable des déchets et sensibilisation au changement climatique.',
      description_en: 'Reforestation, ecosystem preservation, fight against deforestation, sustainable waste management and climate change awareness.',
      image: '/pillars/environnement.jpg',
      color: 'ba-green',
      gradient: 'from-green-500/10 to-emerald-500/5',
      bulletPoints: [
        'Campagnes de reboisement en Afrique.',
        'Sensibilisation communautaire au changement climatique.',
      ],
      bulletPoints_en: [
        'Reforestation campaigns across Africa.',
        'Community awareness on climate change.',
      ],
    },
  ],
  news: [
    {
      id: '1',
      title: 'Campagne de sensibilisation dans les écoles de Goma',
      title_en: 'Awareness campaign in Goma schools',
      excerpt: 'Plus de 500 élèves ont été sensibilisés aux droits de l\'enfant lors de notre dernière campagne dans 12 écoles en Afrique.',
      excerpt_en: 'Over 500 students were made aware of children\'s rights during our latest campaign in 12 schools in Africa.',
      date: '15 Juil 2026',
      category: 'Éducation',
      category_en: 'Education',
      color: 'ba-red',
    },
    {
      id: '2',
      title: 'Distribution de kits scolaires aux enfants vulnérables',
      title_en: 'Distribution of school kits to vulnerable children',
      excerpt: 'L\'ONG Bright African a distribué des fournitures scolaires complètes à 200 enfants vulnérables pour la rentrée.',
      excerpt_en: 'Bright African distributed complete school supplies to 200 vulnerable children for the back-to-school season.',
      date: '02 Juin 2026',
      category: 'Protection',
      category_en: 'Protection',
      color: 'ba-green',
    },
    {
      id: '3',
      title: 'Atelier de formation sur la santé communautaire',
      title_en: 'Community health training workshop',
      excerpt: 'Organisation d\'un atelier de formation de trois jours pour les agents de santé communautaires locaux.',
      excerpt_en: 'Organization of a three-day training workshop for local community health workers.',
      date: '18 Mai 2026',
      category: 'Santé',
      category_en: 'Health',
      color: 'ba-red',
    },
  ],
  projects: [
    {
      id: '1',
      title: 'Écoles Sûres & Protectrices',
      title_en: 'Safe & Protective Schools',
      location: 'Goma, RDC',
      type: 'Protection & Éducation',
      type_en: 'Protection & Education',
      status: 'En cours',
      status_en: 'In progress',
      description: 'Mise en place de comités de protection de l\'enfant dans 15 écoles partenaires, formation des enseignants à la discipline positive, et aménagement d\'espaces d\'écoute pour les élèves vulnérables.',
      description_en: 'Establishment of child protection committees in 15 partner schools, teacher training in positive discipline, and creation of listening spaces for vulnerable students.',
      color: 'ba-red',
      image: '/pillars/protection.jpg',
    },
    {
      id: '2',
      title: 'Reboisement Communautaire',
      title_en: 'Community Reforestation',
      location: 'Territoire de Nyiragongo',
      type: 'Environnement',
      type_en: 'Environment',
      status: 'En cours',
      status_en: 'In progress',
      description: 'Plantation de 12 000 arbres avec la participation active des jeunes et des écoles locales pour lutter contre la déforestation et l\'érosion des sols.',
      description_en: 'Plantation of 12,000 trees with the active participation of youth and local schools to fight deforestation and soil erosion.',
      color: 'ba-green',
      image: '/pillars/environnement.jpg',
    },
    {
      id: '3',
      title: 'Cliniques Mobiles de Santé Maternelle',
      title_en: 'Maternal Health Mobile Clinics',
      location: 'Zones rurales isolées',
      type: 'Santé',
      type_en: 'Health',
      status: 'Achevé',
      status_en: 'Completed',
      description: 'Déploiement d\'une clinique mobile pour fournir des soins prénataux et postnataux dans les zones rurales isolées, réduisant ainsi la mortalité maternelle et infantile.',
      description_en: 'Deployment of a mobile clinic to provide prenatal and postnatal care in isolated rural areas, reducing maternal and child mortality.',
      color: 'ba-red',
      image: '/pillars/sante.jpg',
    },
  ],
  contact: {
    address: 'Avenue de la Paix, Quartier Himbi, Goma — Nord-Kivu, RDC',
    email: 'contact@brightafrica.org',
    phone: '+243 990 000 000 / +243 810 000 000',
  },
  users: [],
};

const STORAGE_KEY = 'ba-admin-data';

function loadData(): AdminData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as AdminData;
      return {
        ...parsed,
        users: parsed.users || [],
      };
    }
  } catch {
    // Ignore parse errors
  }
  return DEFAULT_DATA;
}

function saveData(data: AdminData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('LocalStorage save warning (Quota exceeded or storage disabled):', err);
  }
}

/* ===== Context ===== */
interface AdminDataContextType {
  data: AdminData;
  // Impact
  updateImpact: (id: string, item: Partial<ImpactCounter>) => void;
  addImpact: (item: Omit<ImpactCounter, 'id'>) => void;
  deleteImpact: (id: string) => void;
  // Pillars
  updatePillar: (id: string, item: Partial<Pillar>) => void;
  addPillar: (item: Omit<Pillar, 'id'>) => void;
  deletePillar: (id: string) => void;
  // News
  updateNews: (id: string, item: Partial<NewsArticle>) => void;
  addNews: (item: Omit<NewsArticle, 'id'>) => void;
  deleteNews: (id: string) => void;
  // Projects
  updateProject: (id: string, item: Partial<Project>) => void;
  addProject: (item: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;
  // Contact
  updateContact: (info: Partial<ContactInfo>) => void;
  // Users Management
  addUser: (user: Omit<AdminUser, 'id' | 'createdAt'>) => { success: boolean; error?: string };
  deleteUser: (id: string) => void;
  updateUser: (id: string, updates: Partial<Pick<AdminUser, 'name' | 'email' | 'password'>>) => { success: boolean; error?: string };
  // Auth
  isAuthenticated: boolean;
  currentUser: AdminUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

let nextId = 100;
function generateId(): string {
  return String(++nextId);
}

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AdminData>(loadData);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ba-admin-auth') === 'true';
  });
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    const stored = sessionStorage.getItem('ba-admin-user');
    return stored ? JSON.parse(stored) : null;
  });

  const persist = useCallback((newData: AdminData) => {
    setData(newData);
    saveData(newData);
  }, []);

  // Auth (Async with Backend API check + local fallback)
  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    const trimUser = username.trim().toLowerCase();

    // 1. Tenter l'authentification auprès du serveur Backend
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: trimUser, password }),
      });

      if (res.success && res.data?.user) {
        setIsAuthenticated(true);
        setCurrentUser(res.data.user);
        sessionStorage.setItem('ba-admin-auth', 'true');
        sessionStorage.setItem('ba-admin-user', JSON.stringify(res.data.user));
        if (res.data.token) {
          sessionStorage.setItem('ba-admin-token', res.data.token);
        }
        return true;
      }
    } catch {
      // Ignorer l'erreur réseau et tenter le fallback local
    }

    // 2. Fallback pour Super Admin local
    const adminPassword = localStorage.getItem('ba-admin-password') || 'BrightAfrica2026';
    if ((trimUser === 'admin' || trimUser === 'administrator' || trimUser === 'brightafrica') && password === adminPassword) {
      const user: AdminUser = {
        id: 'super-admin',
        username: 'admin',
        name: 'Administrateur Principal',
        email: 'admin@brightafrica.org',
        role: 'ADMIN',
        createdAt: '2026-01-01',
      };
      setIsAuthenticated(true);
      setCurrentUser(user);
      sessionStorage.setItem('ba-admin-auth', 'true');
      sessionStorage.setItem('ba-admin-user', JSON.stringify(user));
      return true;
    }

    // 3. Fallback pour Éditeurs locaux dans data.users
    const foundUser = (data.users || []).find(
      u => u.username.toLowerCase() === trimUser && u.password === password
    );

    if (foundUser) {
      setIsAuthenticated(true);
      setCurrentUser(foundUser);
      sessionStorage.setItem('ba-admin-auth', 'true');
      sessionStorage.setItem('ba-admin-user', JSON.stringify(foundUser));
      return true;
    }

    return false;
  }, [data.users]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    sessionStorage.removeItem('ba-admin-auth');
    sessionStorage.removeItem('ba-admin-user');
  }, []);

  // Users CRUD (Max 5 editors)
  const addUser = useCallback((userItem: Omit<AdminUser, 'id' | 'createdAt'>): { success: boolean; error?: string } => {
    const currentUsers = data.users || [];
    if (currentUsers.length >= 5) {
      return { success: false, error: 'Limite maximale atteinte. Vous ne pouvez pas ajouter plus de 5 éditeurs.' };
    }

    const exists = currentUsers.some(u => u.username.toLowerCase() === userItem.username.trim().toLowerCase());
    if (exists || userItem.username.trim().toLowerCase() === 'admin') {
      return { success: false, error: 'Ce nom d\'utilisateur est déjà utilisé.' };
    }

    const newUser: AdminUser = {
      ...userItem,
      username: userItem.username.trim(),
      id: generateId(),
      createdAt: new Date().toISOString().split('T')[0],
    };

    persist({ ...data, users: [...currentUsers, newUser] });
    return { success: true };
  }, [data, persist]);

  const deleteUser = useCallback((id: string) => {
    const currentUsers = data.users || [];
    persist({ ...data, users: currentUsers.filter(u => u.id !== id) });
  }, [data, persist]);

  const updateUser = useCallback((id: string, updates: Partial<Pick<AdminUser, 'name' | 'email' | 'password'>>): { success: boolean; error?: string } => {
    const currentUsers = data.users || [];
    const userIndex = currentUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return { success: false, error: 'Utilisateur introuvable.' };
    }
    const updatedUser = { ...currentUsers[userIndex], ...updates };
    const newUsers = currentUsers.map(u => u.id === id ? updatedUser : u);
    persist({ ...data, users: newUsers });
    // Mettre à jour la session courante si c'est l'utilisateur connecté
    setCurrentUser(prev => prev?.id === id ? { ...prev, ...updates } : prev);
    const sessionUser = sessionStorage.getItem('ba-admin-user');
    if (sessionUser) {
      const parsed = JSON.parse(sessionUser);
      if (parsed.id === id) {
        sessionStorage.setItem('ba-admin-user', JSON.stringify({ ...parsed, ...updates }));
      }
    }
    return { success: true };
  }, [data, persist]);

  // Impact CRUD
  const updateImpact = useCallback((id: string, item: Partial<ImpactCounter>) => {
    persist({ ...data, impact: data.impact.map(c => c.id === id ? { ...c, ...item } : c) });
  }, [data, persist]);

  const addImpact = useCallback((item: Omit<ImpactCounter, 'id'>) => {
    persist({ ...data, impact: [...data.impact, { ...item, id: generateId() }] });
  }, [data, persist]);

  const deleteImpact = useCallback((id: string) => {
    persist({ ...data, impact: data.impact.filter(c => c.id !== id) });
  }, [data, persist]);

  // Pillars CRUD
  const updatePillar = useCallback((id: string, item: Partial<Pillar>) => {
    persist({ ...data, pillars: data.pillars.map(p => p.id === id ? { ...p, ...item } : p) });
  }, [data, persist]);

  const addPillar = useCallback((item: Omit<Pillar, 'id'>) => {
    persist({ ...data, pillars: [...data.pillars, { ...item, id: generateId() }] });
  }, [data, persist]);

  const deletePillar = useCallback((id: string) => {
    persist({ ...data, pillars: data.pillars.filter(p => p.id !== id) });
  }, [data, persist]);

  // News CRUD
  const updateNews = useCallback((id: string, item: Partial<NewsArticle>) => {
    persist({ ...data, news: data.news.map(n => n.id === id ? { ...n, ...item } : n) });
  }, [data, persist]);

  const addNews = useCallback((item: Omit<NewsArticle, 'id'>) => {
    persist({ ...data, news: [{ ...item, id: generateId() }, ...data.news] });
  }, [data, persist]);

  const deleteNews = useCallback((id: string) => {
    persist({ ...data, news: data.news.filter(n => n.id !== id) });
  }, [data, persist]);

  // Projects CRUD
  const updateProject = useCallback((id: string, item: Partial<Project>) => {
    persist({ ...data, projects: data.projects.map(p => p.id === id ? { ...p, ...item } : p) });
  }, [data, persist]);

  const addProject = useCallback((item: Omit<Project, 'id'>) => {
    persist({ ...data, projects: [...data.projects, { ...item, id: generateId() }] });
  }, [data, persist]);

  const deleteProject = useCallback((id: string) => {
    persist({ ...data, projects: data.projects.filter(p => p.id !== id) });
  }, [data, persist]);

  // Contact
  const updateContact = useCallback((info: Partial<ContactInfo>) => {
    persist({ ...data, contact: { ...data.contact, ...info } });
  }, [data, persist]);

  return (
    <AdminDataContext.Provider
      value={{
        data,
        updateImpact, addImpact, deleteImpact,
        updatePillar, addPillar, deletePillar,
        updateNews, addNews, deleteNews,
        updateProject, addProject, deleteProject,
        updateContact,
        addUser, deleteUser, updateUser,
        isAuthenticated, currentUser, login, logout,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
}
