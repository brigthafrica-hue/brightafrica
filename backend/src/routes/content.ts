import { Router, Request, Response } from 'express';
import SiteContent from '../models/SiteContent';

const router = Router();

// Default data fallback if MongoDB database is empty
const DEFAULT_CONTENT = {
  key: 'main_site_content',
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
  ],
  projects: [
    {
      id: '1',
      title: 'Reconstitution et Protection des Droits des Enfants',
      title_en: 'Reconstitution and Protection of Children\'s Rights',
      location: 'Goma, Nord-Kivu, RDC',
      type: 'Protection',
      type_en: 'Protection',
      status: 'En cours',
      status_en: 'Ongoing',
      description: 'Prise en charge intégrale des enfants vulnérables, victimes de conflits armés et de violences. Fourniture d\'un soutien psychosocial, réintégration scolaire et familiale.',
      description_en: 'Comprehensive care for vulnerable children, victims of armed conflicts and violence. Psychosocial support, school and family reintegration.',
      color: 'bg-ba-red',
      image: '/pillars/protection.jpg',
    },
    {
      id: '2',
      title: 'Programme de Reboisement Communautaire',
      title_en: 'Community Reforestation Program',
      location: 'Territoire de Nyiragongo',
      type: 'Environnement',
      type_en: 'Environment',
      status: 'En cours',
      status_en: 'Ongoing',
      description: 'Plantation de 12 000 arbres pour lutter contre la déforestation et sensibiliser les jeunes générations à la préservation des écosystèmes locaux.',
      description_en: 'Planting 12,000 trees to combat deforestation and raise youth awareness of local ecosystem preservation.',
      color: 'bg-ba-green',
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
      color: 'bg-ba-red',
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

// GET /api/v1/content - Fetch site content (accessible to all devices)
router.get('/', async (req: Request, res: Response) => {
  try {
    let content = await SiteContent.findOne({ key: 'main_site_content' });

    if (!content) {
      // Create initial content in MongoDB Atlas if db is empty
      content = await SiteContent.create(DEFAULT_CONTENT);
      console.log('[MongoDB] Initialized default site content in Atlas database');
    }

    res.status(200).json({
      success: true,
      data: {
        impact: content.impact,
        pillars: content.pillars,
        news: content.news,
        projects: content.projects,
        contact: content.contact,
        users: content.users || [],
      },
    });
  } catch (error: any) {
    console.error('Error fetching site content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch content from database.',
      fallback: DEFAULT_CONTENT,
    });
  }
});

// PUT /api/v1/content - Update site content in MongoDB Atlas (saves admin changes to cloud)
router.put('/', async (req: Request, res: Response) => {
  try {
    const { impact, pillars, news, projects, contact, users } = req.body;

    const updated = await SiteContent.findOneAndUpdate(
      { key: 'main_site_content' },
      {
        $set: {
          impact: impact || [],
          pillars: pillars || [],
          news: news || [],
          projects: projects || [],
          contact: contact || {},
          users: users || [],
        },
      },
      { new: true, upsert: true }
    );

    console.log('[MongoDB Cloud] Site content updated successfully');

    res.status(200).json({
      success: true,
      message: 'Content updated and synchronized across all devices!',
      data: {
        impact: updated.impact,
        pillars: updated.pillars,
        news: updated.news,
        projects: updated.projects,
        contact: updated.contact,
        users: updated.users || [],
      },
    });
  } catch (error: any) {
    console.error('Error updating site content:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to synchronize content to database.',
    });
  }
});

export default router;
