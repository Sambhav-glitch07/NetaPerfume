import { Fragrance } from '../types';

export const FRAGRANCES: Fragrance[] = [
  {
    id: 'neta-01-statesman',
    name: 'The Statesman',
    number: 'Neta No. 01',
    subtitle: 'Warm Woody & Calabrian Bergamot',
    family: 'Woody',
    description: 'A commanding presence born from smoky bourbon vetiver, golden ambergris, and sunlit bergamot.',
    story: 'Conceived for leaders whose poise commands quiet respect without saying a word. The Statesman balances sparkling Mediterranean citrus with deep, aged Mysore sandalwood and Royal Assam oud.',
    size: '100 ml / 3.4 FL. OZ.',
    price: 9800,
    originalPrice: 14000,
    inStock: true,
    isSignature: true,
    badge: '40% OFF',
    rating: 4.96,
    reviewsCount: 342,
    notes: {
      top: ['Calabrian Bergamot', 'Pink Pepper', 'Green Cardamom'],
      heart: ['Smoked Bourbon Vetiver', 'French Clary Sage', 'Orris Root'],
      base: ['Royal Assam Oud', 'Mysore Sandalwood', 'Golden Ambergris', 'Dark Cedar']
    },
    longevity: '16+ Hours',
    sillage: 'Authoritative & Enveloping',
    concentration: 'Extrait de Parfum (32% Oil Concentration)',
    bottleStyle: 'statesman',
    liquidTint: '#d4af37'
  },
  {
    id: 'neta-02-imperial-oud',
    name: 'Imperial Oud',
    number: 'Neta No. 02',
    subtitle: 'Aged Agarwood & Damascena Rose',
    family: 'Oud',
    description: 'Sovereign depth of triple-macerated wild Assam agarwood embraced by rare Kashmiri saffron.',
    story: 'Inspired by ancient royal courts where agarwood chips were burned before state ceremonies. Imperial Oud evokes timeless prestige, regal stature, and an intoxicating warmth.',
    size: '100 ml / 3.4 FL. OZ.',
    price: 11500,
    originalPrice: 16500,
    inStock: true,
    isSignature: true,
    badge: '40% OFF',
    rating: 4.98,
    reviewsCount: 418,
    notes: {
      top: ['Kashmiri Wild Saffron', 'Blood Orange', 'Coriander Seed'],
      heart: ['Kannauj Damascena Rose', 'Smoked Incense', 'Leather Accord'],
      base: ['Aged Cambodian Agarwood', 'Warm Labdanum', 'Benzoin Tears', 'Dark Musk']
    },
    longevity: '18+ Hours',
    sillage: 'Regal & Hypnotic',
    concentration: 'Extrait de Parfum (35% Oil Concentration)',
    bottleStyle: 'imperial',
    liquidTint: '#8a4b18'
  },
  {
    id: 'neta-03-midnight-reserve',
    name: 'Midnight Reserve',
    number: 'Neta No. 03',
    subtitle: 'Smoky Vetiver, Leather & Black Cardamom',
    family: 'Woody',
    description: 'An enigmatic evening composition steeped in birch tar, dark cardamom, and nocturnal jasmine.',
    story: 'Composed for quiet midnight conclaves and gala evenings. Midnight Reserve leaves a lingering, magnetic aura of dark leather, roasted spices, and rare vetiver roots.',
    size: '100 ml / 3.4 FL. OZ.',
    price: 9200,
    originalPrice: 13000,
    inStock: true,
    isSignature: true,
    badge: '40% OFF',
    rating: 4.92,
    reviewsCount: 289,
    notes: {
      top: ['Crushed Black Cardamom', 'Italian Neroli', 'Black Pepper'],
      heart: ['Smoky Birch Tar', 'Florentine Orris', 'Night Jasmine'],
      base: ['Haitian Vetiver', 'Smoked Indonesian Patchouli', 'Spanish Cistus', 'Ebony Wood']
    },
    longevity: '15+ Hours',
    sillage: 'Magnetic & Intimate',
    concentration: 'Extrait de Parfum (30% Oil Concentration)',
    bottleStyle: 'midnight',
    liquidTint: '#4a3525'
  },
  {
    id: 'neta-04-golden-heritage',
    name: 'Golden Heritage',
    number: 'Neta No. 04',
    subtitle: 'Saffron, Mysore Sandalwood & Kashmiri Rose',
    family: 'Amber',
    description: 'A luminous tribute to classical Indian perfumery, woven with pure saffron strands and honeyed sandalwood.',
    story: 'Distilled using methods passed down through generational Kannauj masters. Golden Heritage reflects radiant optimism, graceful nobility, and sunlit amber warmth.',
    size: '100 ml / 3.4 FL. OZ.',
    price: 10400,
    originalPrice: 14800,
    inStock: true,
    isSignature: true,
    badge: '40% OFF',
    rating: 4.95,
    reviewsCount: 367,
    notes: {
      top: ['Kashmiri Saffron Filaments', 'Bitter Almond', 'Bergamot Zest'],
      heart: ['Kannauj Gulab (Centifolia)', 'Marigold Accord', 'Golden Honeycomb'],
      base: ['Vintage Mysore Sandalwood', 'Bourbon Vanilla Bean', 'Siam Benzoin', 'Golden Amber']
    },
    longevity: '17+ Hours',
    sillage: 'Radiant & Luxurious',
    concentration: 'Extrait de Parfum (32% Oil Concentration)',
    bottleStyle: 'heritage',
    liquidTint: '#d48817'
  },
  {
    id: 'neta-00-royal-durbar',
    name: 'Royal Durbar Reserve',
    number: 'Neta No. 00',
    subtitle: '25-Year Macerated Assam Oud & White Truffle Amber',
    family: 'Limited Editions' as any,
    description: 'The pinnacle of Neta perfumery. Hand-numbered flacon in pure faceted crystal with 24k gold leaf collar.',
    story: 'A collector’s treasure blended in strictly limited numbered batches of only 300 bottles annually. Formulated with our rarest twenty-five year aged forest agarwood and wild Indian white ambergris.',
    size: '100 ml Crystal Flacon',
    price: 18500,
    originalPrice: 22000,
    inStock: true,
    isLimitedEdition: true,
    badge: 'Limited Edition',
    rating: 5.0,
    reviewsCount: 84,
    notes: {
      top: ['Aged Taif Rose Absolute', 'Wild Saffron', 'Sparkling Yuzu'],
      heart: ['Centuries-old Oud Attar', 'Smoked Agarwood Heart', 'White Truffle Accord'],
      base: ['Natural Ambergris Infusion', 'Imperial Sandalwood Heartwood', 'Bourbon Civet Accord']
    },
    longevity: '24+ Hours',
    sillage: 'Monumental',
    concentration: 'Pure Parfum Nectar (40% Oil Concentration)',
    bottleStyle: 'crystal_decanter',
    liquidTint: '#7a320c'
  },
  {
    id: 'neta-enchanting-ember',
    name: 'Enchanting Ember',
    number: 'Neta Prestige',
    subtitle: 'Warm Amber, Exotic Spices & Delicate Florals',
    family: 'Amber',
    description: 'Warm glowing amber kissed by exotic spices and nighttime Indian champaca petals.',
    story: 'Evoking dusk over an ancient sandstone palace where lanterns flicker and aromatic coals send warm resinous plumes into the evening breeze.',
    size: '75 ml / 2.5 FL. OZ.',
    price: 8900,
    originalPrice: 11500,
    inStock: true,
    isLimitedEdition: true,
    badge: 'Prestige Selection',
    rating: 4.93,
    reviewsCount: 156,
    notes: {
      top: ['Ceylon Cinnamon Bark', 'Nutmeg', 'Mandarin Oil'],
      heart: ['Indian Champaca Blossom', 'Smoked Tonka Bean', 'Cacao Pod'],
      base: ['Golden Amber Crystals', 'Virginian Cedarwood', 'Vanilla Resinoid']
    },
    longevity: '14+ Hours',
    sillage: 'Intimate & Warming',
    concentration: 'Extrait de Parfum (28% Oil Concentration)',
    bottleStyle: 'heritage',
    liquidTint: '#b86118'
  },
  {
    id: 'neta-luminous-accord',
    name: 'Luminous Accord',
    number: 'Luminous Series',
    subtitle: 'Green Cardamom, White Jasmine & Bergamot',
    family: 'Fresh',
    description: 'Crisp morning dew on mountain groves paired with radiant citrus and sheer sandalwood.',
    story: 'A modern, elevated study in freshness that carries the commanding dignity of the Neta signature without heavy darkness.',
    size: '100 ml Tall Column Flacon',
    price: 9500,
    inStock: true,
    isLimitedEdition: true,
    badge: 'Prestige Series',
    rating: 4.89,
    reviewsCount: 112,
    notes: {
      top: ['Sicilian Petitgrain', 'Grapefruit Zest', 'Cardamom Pod'],
      heart: ['Night-blooming Mogra', 'Hedione Accord', 'Elemi Resin'],
      base: ['White Australian Sandalwood', 'Clean Cedar', 'Transparent Musks']
    },
    longevity: '12+ Hours',
    sillage: 'Clean & Refined',
    concentration: 'Extrait de Parfum (26% Oil Concentration)',
    bottleStyle: 'fluted_column',
    liquidTint: '#c2a859'
  },
  {
    id: 'neta-velvet-santal',
    name: 'Velvet Santal',
    number: 'Luminous Series',
    subtitle: 'Mysore Sandalwood, Cardamom & Cashmere',
    family: 'Woody',
    description: 'An enveloping sanctuary of creamy vintage sandalwood, warmed by cardamom milk and gentle cashmere.',
    story: 'The ultimate comforting yet regal woody fragrance. Pure aged Mysore Santalum Album rendered with whisper-soft cashmere and golden tonka.',
    size: '100 ml Tall Column Flacon',
    price: 11200,
    inStock: true,
    isLimitedEdition: true,
    badge: 'Prestige Series',
    rating: 4.97,
    reviewsCount: 198,
    notes: {
      top: ['Green Cardamom Milk', 'Carrot Seed', 'Cypress Leaf'],
      heart: ['Orris Concrete', 'Velvet Cashmeran', 'Indian Papyrus'],
      base: ['Aged Mysore Sandalwood', 'Cedarwood Flakes', 'Roasted Tonka']
    },
    longevity: '16+ Hours',
    sillage: 'Rich & Velvety',
    concentration: 'Extrait de Parfum (30% Oil Concentration)',
    bottleStyle: 'fluted_column',
    liquidTint: '#af7929'
  }
];

export const BRAND_PRINCIPLES = [
  {
    number: '01',
    title: 'The Art of Composition',
    subtitle: 'Harmonic Architecture',
    description: 'Mastery over the delicate equilibrium of bright opening notes, commanding heart accords, and lingering base notes that evolve gracefully over 16+ hours on skin.'
  },
  {
    number: '02',
    title: 'Character and Presence',
    subtitle: 'Authoritative Expression',
    description: 'Each fragrance family is structured to project distinct gravitas—from decisive boardroom poise to sovereign evening charisma and timeless cultural pride.'
  },
  {
    number: '03',
    title: 'The Personal Ritual',
    subtitle: 'An Unspoken Hallmark',
    description: 'Fragrance is treated not as mere accessory, but as an invisible royal mantle: a deliberate gesture that anchors memories and commands silent attention.'
  }
];

export const CRAFTSMANSHIP_POINTS = {
  left: [
    {
      title: 'Exclusivity Redefined',
      description: 'From initial botanical harvest to final hand-polishing, each batch is cured in climate-controlled oak barrels to ensure peerless depth and clarity.'
    },
    {
      title: 'High-Concentration Oil',
      description: 'Pure Extrait de Parfum formulations with up to 35% natural fragrance oils, delivering an indelible, day-to-night olfactory aura.'
    },
    {
      title: 'Time-Honored Maceration',
      description: 'Our raw materials undergo a minimum 90-day cold aging period, allowing complex resinous chords to bind seamlessly with aged woods.'
    }
  ],
  right: [
    {
      title: 'Artisanal Precision',
      description: 'Every flacon is individually weighed, flame-inspected, and fitted with custom weighted gold hardware machined to sub-millimeter tolerances.'
    },
    {
      title: 'Rare and Exquisite Botanicals',
      description: 'Formulated with verified heritage Mysore sandalwood, steam-distilled Kannauj rose attar, and ethically gathered wild Assam agarwood.'
    },
    {
      title: 'Indelible Sillage',
      description: 'Engineered for exceptional projection that leaves an authoritative, memorable wake without overwhelming the senses.'
    }
  ]
};
