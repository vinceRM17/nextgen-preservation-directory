import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const sql = postgres(connectionString, { prepare: false });

interface SeedListing {
  name: string;
  description: string;
  role: string;
  specialties: string[];
  address: string;
  phone: string;
  email: string;
  website: string;
  latitude: number;
  longitude: number;
  projects: Array<{ title: string; description: string }>;
}

const seedListings: SeedListing[] = [
  // Builders
  {
    name: 'River City Restoration',
    description: 'Full-service historic restoration contractor specializing in Louisville\'s Victorian and Italianate architecture. Over 25 years preserving the character of Old Louisville and Portland neighborhoods.',
    role: 'Builder',
    specialties: ['Victorian restoration', 'Masonry repair', 'Historic roofing', 'Foundation stabilization'],
    address: '1234 S 4th St, Louisville, KY 40203',
    phone: '(502) 555-0101',
    email: 'info@rivercityrestoration.com',
    website: 'https://rivercityrestoration.com',
    latitude: 38.2365,
    longitude: -85.7637,
    projects: [
      { title: 'Conrad-Caldwell House Repairs', description: 'Exterior masonry and ornamental restoration of this Richardsonian Romanesque landmark.' },
      { title: 'Portland Ave Row Houses', description: 'Restored 6 connected shotgun houses to their 1890s appearance.' },
    ],
  },
  {
    name: 'Cornerstone Heritage Builders',
    description: 'General contractor focused on adaptive reuse of historic commercial and industrial buildings in Louisville\'s NuLu and Butchertown districts.',
    role: 'Builder',
    specialties: ['Adaptive reuse', 'Commercial renovation', 'Structural reinforcement', 'Historic tax credit projects'],
    address: '742 E Market St, Louisville, KY 40202',
    phone: '(502) 555-0102',
    email: 'build@cornerstoneheritage.com',
    website: 'https://cornerstoneheritage.com',
    latitude: 38.2545,
    longitude: -85.7395,
    projects: [
      { title: 'Butchertown Loft Conversion', description: 'Converted 1920s meatpacking warehouse into 24 residential lofts.' },
    ],
  },
  {
    name: 'Falls City Construction',
    description: 'Historic home renovation specialists serving the Highlands, Crescent Hill, and Cherokee Triangle neighborhoods since 1998.',
    role: 'Builder',
    specialties: ['Residential renovation', 'Period-accurate additions', 'Historic windows', 'Plaster restoration'],
    address: '2100 Bardstown Rd, Louisville, KY 40205',
    phone: '(502) 555-0103',
    email: 'contact@fallscityconstruction.com',
    website: 'https://fallscityconstruction.com',
    latitude: 38.2420,
    longitude: -85.7210,
    projects: [
      { title: 'Cherokee Triangle Craftsman', description: 'Complete interior and exterior restoration of a 1912 Arts & Crafts bungalow.' },
      { title: 'Crescent Hill Victorian', description: 'Added period-appropriate kitchen and bath to 1895 Victorian.' },
    ],
  },

  // Craftspeople
  {
    name: 'Derby City Millwork',
    description: 'Custom architectural millwork and woodworking shop producing period-accurate trim, doors, windows, and cabinetry for historic properties throughout Kentucky.',
    role: 'Craftsperson',
    specialties: ['Custom millwork', 'Window restoration', 'Period trim profiles', 'Hardwood flooring'],
    address: '1515 Story Ave, Louisville, KY 40206',
    phone: '(502) 555-0201',
    email: 'shop@derbycitymillwork.com',
    website: 'https://derbycitymillwork.com',
    latitude: 38.2580,
    longitude: -85.7310,
    projects: [
      { title: 'Speed Art Museum Woodwork', description: 'Reproduced original crown molding profiles for gallery renovation.' },
    ],
  },
  {
    name: 'Bluegrass Ironworks',
    description: 'Ornamental iron and metalwork artisans crafting custom railings, gates, fences, and decorative elements that honor Louisville\'s ironwork heritage.',
    role: 'Craftsperson',
    specialties: ['Ornamental iron', 'Custom railings', 'Gate fabrication', 'Metal restoration'],
    address: '820 E Washington St, Louisville, KY 40206',
    phone: '(502) 555-0202',
    email: 'forge@bluegrassironworks.com',
    website: 'https://bluegrassironworks.com',
    latitude: 38.2560,
    longitude: -85.7350,
    projects: [
      { title: 'Old Louisville Iron Fences', description: 'Restored and replicated Victorian-era iron fencing along St. James Court.' },
    ],
  },
  {
    name: 'Heritage Plaster Studio',
    description: 'Specialty plaster restoration and ornamental plasterwork. Expert in matching historic plaster profiles, ceiling medallions, and decorative cornices.',
    role: 'Craftsperson',
    specialties: ['Plaster restoration', 'Ornamental ceilings', 'Lime plaster', 'Cornice replication'],
    address: '320 W Main St, Louisville, KY 40202',
    phone: '(502) 555-0203',
    email: 'hello@heritageplaster.com',
    website: 'https://heritageplaster.com',
    latitude: 38.2570,
    longitude: -85.7590,
    projects: [
      { title: 'Brown Hotel Ceiling Restoration', description: 'Restored ornamental plaster ceiling in the English Grill dining room.' },
    ],
  },

  // Tradespeople
  {
    name: 'Commonwealth Electric',
    description: 'Licensed electricians specializing in updating wiring in historic buildings while preserving original fixtures and maintaining period aesthetics.',
    role: 'Tradesperson',
    specialties: ['Historic rewiring', 'Fixture restoration', 'Knob-and-tube replacement', 'Period lighting'],
    address: '2401 Portland Ave, Louisville, KY 40212',
    phone: '(502) 555-0301',
    email: 'service@commonwealthelectric.com',
    website: 'https://commonwealthelectric.com',
    latitude: 38.2620,
    longitude: -85.7820,
    projects: [
      { title: 'Thomas Edison House Rewiring', description: 'Complete electrical update preserving original gas-electric fixtures.' },
    ],
  },
  {
    name: 'Limestone Masonry Co.',
    description: 'Master masons providing tuckpointing, brick repair, limestone restoration, and chimney rebuilding for Louisville\'s historic masonry structures.',
    role: 'Tradesperson',
    specialties: ['Tuckpointing', 'Brick repair', 'Limestone carving', 'Chimney restoration'],
    address: '1800 Frankfort Ave, Louisville, KY 40206',
    phone: '(502) 555-0302',
    email: 'info@limestonemasonry.com',
    website: 'https://limestonemasonry.com',
    latitude: 38.2590,
    longitude: -85.7250,
    projects: [
      { title: 'Louisville Water Tower', description: 'Limestone restoration on the 1860 classical revival water tower.' },
    ],
  },
  {
    name: 'River Bend Plumbing',
    description: 'Historic plumbing specialists experienced with cast iron, lead, and clay pipe systems. Experts in bringing century-old plumbing up to code.',
    role: 'Tradesperson',
    specialties: ['Cast iron repair', 'Lead pipe replacement', 'Period fixture sourcing', 'Drain restoration'],
    address: '3200 Lexington Rd, Louisville, KY 40206',
    phone: '(502) 555-0303',
    email: 'service@riverbendplumbing.com',
    website: 'https://riverbendplumbing.com',
    latitude: 38.2480,
    longitude: -85.7080,
    projects: [],
  },

  // Developers
  {
    name: 'Preservation Partners LLC',
    description: 'Real estate development firm specializing in historic tax credit rehabilitation projects. Transforming vacant historic properties into vibrant mixed-use spaces.',
    role: 'Developer',
    specialties: ['Historic tax credits', 'Mixed-use development', 'Adaptive reuse', 'NMTC projects'],
    address: '400 W Market St, Suite 300, Louisville, KY 40202',
    phone: '(502) 555-0401',
    email: 'develop@preservationpartners.com',
    website: 'https://preservationpartners.com',
    latitude: 38.2555,
    longitude: -85.7610,
    projects: [
      { title: 'Whiskey Row Revival', description: 'Rehabilitated 5 connected buildings on historic Whiskey Row into retail and office space.' },
      { title: 'Portland Wharf District', description: 'Converting former tobacco warehouses into affordable housing and community space.' },
    ],
  },
  {
    name: 'NuLu Development Group',
    description: 'Focused on revitalizing East Market Street corridor with sensitive rehabilitation of historic commercial buildings.',
    role: 'Developer',
    specialties: ['Commercial rehabilitation', 'Retail development', 'Mixed-use', 'Neighborhood revitalization'],
    address: '800 E Market St, Louisville, KY 40202',
    phone: '(502) 555-0402',
    email: 'info@nuludev.com',
    website: 'https://nuludev.com',
    latitude: 38.2548,
    longitude: -85.7380,
    projects: [
      { title: 'NuLu Marketplace', description: 'Converted a 1910 warehouse into an artisan marketplace with 12 vendor stalls.' },
    ],
  },

  // Investors
  {
    name: 'Heritage Capital Fund',
    description: 'Impact investment fund providing capital for historic preservation projects in Louisville\'s underserved neighborhoods. Focus on community wealth-building.',
    role: 'Investor',
    specialties: ['Impact investing', 'Historic tax credit syndication', 'Community development', 'Gap financing'],
    address: '500 W Jefferson St, Louisville, KY 40202',
    phone: '(502) 555-0501',
    email: 'invest@heritagecapitalfund.org',
    website: 'https://heritagecapitalfund.org',
    latitude: 38.2530,
    longitude: -85.7620,
    projects: [
      { title: 'West End Renaissance Fund', description: 'Provided $2M in gap financing for 8 historic rehabilitation projects in Russell neighborhood.' },
    ],
  },
  {
    name: 'Louisville Land Trust',
    description: 'Community land trust focused on acquiring and preserving historic properties at risk of demolition. Ensures long-term affordability through land trust model.',
    role: 'Investor',
    specialties: ['Land trust', 'Property acquisition', 'Affordability preservation', 'Anti-displacement'],
    address: '1535 S Shelby St, Louisville, KY 40217',
    phone: '(502) 555-0502',
    email: 'info@louisvillelandtrust.org',
    website: 'https://louisvillelandtrust.org',
    latitude: 38.2350,
    longitude: -85.7450,
    projects: [],
  },

  // Advocates
  {
    name: 'Preservation Louisville',
    description: 'Nonprofit advocacy organization fighting to save Louisville\'s historic buildings and cultural spaces. Leads campaigns, provides education, and connects preservation stakeholders.',
    role: 'Advocate',
    specialties: ['Advocacy', 'Public education', 'Historic designation support', 'Endangered buildings list'],
    address: '627 W Main St, Louisville, KY 40202',
    phone: '(502) 555-0601',
    email: 'info@preservationlouisville.org',
    website: 'https://preservationlouisville.org',
    latitude: 38.2575,
    longitude: -85.7640,
    projects: [
      { title: 'Save the Seelbach Lobby Campaign', description: 'Successfully advocated for preservation of original Rookwood Pottery tiles during hotel renovation.' },
    ],
  },
  {
    name: 'West Louisville Community Council',
    description: 'Community organization advocating for culturally sensitive preservation in historically Black neighborhoods. Fights displacement while honoring heritage.',
    role: 'Advocate',
    specialties: ['Community organizing', 'Anti-displacement', 'Cultural preservation', 'Neighborhood planning'],
    address: '3000 W Broadway, Louisville, KY 40211',
    phone: '(502) 555-0602',
    email: 'council@westlouisvillecommunity.org',
    website: 'https://westlouisvillecommunity.org',
    latitude: 38.2560,
    longitude: -85.7950,
    projects: [],
  },
  {
    name: 'Old Louisville Neighborhood Council',
    description: 'Resident-led organization protecting the character of America\'s largest Victorian neighborhood. Monitors zoning, reviews development proposals, and organizes walking tours.',
    role: 'Advocate',
    specialties: ['Neighborhood watch', 'Zoning review', 'Walking tours', 'Historic district advocacy'],
    address: '1340 S 4th St, Louisville, KY 40208',
    phone: '(502) 555-0603',
    email: 'info@oldlouisville.org',
    website: 'https://oldlouisville.org',
    latitude: 38.2330,
    longitude: -85.7640,
    projects: [
      { title: 'St. James Court Preservation Plan', description: 'Created comprehensive preservation guidelines for the St. James Court Historic District.' },
    ],
  },

  // Architects
  {
    name: 'De Tienne & Associates Architects',
    description: 'Architecture firm with deep expertise in historic preservation, adaptive reuse, and rehabilitation design. Secretary of the Interior\'s Standards certified.',
    role: 'Architect',
    specialties: ['Historic preservation design', 'Adaptive reuse', 'Tax credit applications', 'Conditions assessments'],
    address: '200 S 5th St, Suite 200, Louisville, KY 40202',
    phone: '(502) 555-0701',
    email: 'design@detiennearchitects.com',
    website: 'https://detiennearchitects.com',
    latitude: 38.2525,
    longitude: -85.7580,
    projects: [
      { title: 'Louisville Palace Theatre', description: 'Led interior restoration preserving Spanish Baroque atmospheric ceiling and ornamental plaster.' },
      { title: 'Main Street Revitalization', description: 'Designed rehabilitation plans for 8 historic storefronts on Main Street.' },
    ],
  },
  {
    name: 'K. Norman Berry Associates',
    description: 'Nationally recognized preservation architecture firm. Experts in churches, theaters, courthouses, and landmark buildings across Kentucky and the Ohio Valley.',
    role: 'Architect',
    specialties: ['Landmark restoration', 'Church preservation', 'Theater rehabilitation', 'National Register nominations'],
    address: '319 E Main St, Louisville, KY 40202',
    phone: '(502) 555-0702',
    email: 'office@knormanberry.com',
    website: 'https://knormanberry.com',
    latitude: 38.2565,
    longitude: -85.7550,
    projects: [
      { title: 'Cathedral of the Assumption', description: 'Comprehensive restoration of Louisville\'s 1852 cathedral including stained glass and masonry.' },
    ],
  },

  // Government
  {
    name: 'Louisville Metro Historic Preservation Office',
    description: 'Official city agency overseeing Louisville\'s 18 local historic preservation districts. Reviews Certificates of Appropriateness and administers design guidelines.',
    role: 'Government',
    specialties: ['Design review', 'Historic districts', 'Certificates of Appropriateness', 'Landmark designation'],
    address: '444 S 5th St, Suite 300, Louisville, KY 40202',
    phone: '(502) 555-0801',
    email: 'preservation@louisvilleky.gov',
    website: 'https://louisvilleky.gov/preservation',
    latitude: 38.2510,
    longitude: -85.7575,
    projects: [],
  },
  {
    name: 'Kentucky Heritage Council',
    description: 'State historic preservation office (SHPO) administering federal and state historic tax credit programs, National Register listings, and Section 106 reviews.',
    role: 'Government',
    specialties: ['Tax credit administration', 'National Register', 'Section 106 review', 'Survey and inventory'],
    address: '410 High St, Frankfort, KY 40601',
    phone: '(502) 555-0802',
    email: 'khc@ky.gov',
    website: 'https://heritage.ky.gov',
    latitude: 38.2005,
    longitude: -84.8733,
    projects: [],
  },

  // Nonprofits
  {
    name: 'Envirome Institute',
    description: 'Research and education organization studying the relationship between built environments and human health. Partners with NextGen Preservation Collab on community health outcomes.',
    role: 'Nonprofit',
    specialties: ['Environmental health', 'Built environment research', 'Community health', 'Preservation impact studies'],
    address: '427 W Muhammad Ali Blvd, Suite 200, Louisville, KY 40202',
    phone: '(502) 555-0901',
    email: 'info@enviromeinstute.org',
    website: 'https://enviromeinstute.org',
    latitude: 38.2535,
    longitude: -85.7605,
    projects: [
      { title: 'Healthy Historic Homes Study', description: 'Research linking preserved historic housing with improved resident health outcomes.' },
    ],
  },
  {
    name: 'Fund for the Arts Louisville',
    description: 'Cultural funding organization supporting arts spaces and creative places. Provides grants for preservation of cultural venues and performance spaces.',
    role: 'Nonprofit',
    specialties: ['Arts funding', 'Cultural space preservation', 'Grant making', 'Creative placemaking'],
    address: '623 W Main St, Louisville, KY 40202',
    phone: '(502) 555-0902',
    email: 'grants@fundforthearts.org',
    website: 'https://fundforthearts.org',
    latitude: 38.2573,
    longitude: -85.7635,
    projects: [],
  },

  // Educators
  {
    name: 'University of Louisville - Historic Preservation Program',
    description: 'Graduate program training the next generation of preservation professionals. Offers MS in Historic Preservation with hands-on fieldwork in Louisville neighborhoods.',
    role: 'Educator',
    specialties: ['Graduate education', 'Field schools', 'Documentation', 'Preservation planning'],
    address: '2301 S 3rd St, Louisville, KY 40208',
    phone: '(502) 555-1001',
    email: 'preservation@louisville.edu',
    website: 'https://louisville.edu/preservation',
    latitude: 38.2160,
    longitude: -85.7620,
    projects: [
      { title: 'Smoketown Survey Project', description: 'Student-led architectural survey documenting 200+ historic structures in Smoketown neighborhood.' },
    ],
  },
  {
    name: 'Preservation Trades Network',
    description: 'Training organization providing apprenticeships and workshops in traditional building trades. Connects emerging craftspeople with experienced mentors.',
    role: 'Educator',
    specialties: ['Apprenticeships', 'Trade workshops', 'Mentorship', 'Youth programs'],
    address: '1000 E Liberty St, Louisville, KY 40204',
    phone: '(502) 555-1002',
    email: 'learn@preservationtrades.org',
    website: 'https://preservationtrades.org',
    latitude: 38.2490,
    longitude: -85.7370,
    projects: [
      { title: 'Youth Masonry Workshop', description: 'Annual summer program teaching brick and stone masonry to high school students.' },
    ],
  },
];

async function seed() {
  console.log('Seeding database with Louisville preservation stakeholders...\n');

  // Ensure extensions exist
  await sql`CREATE EXTENSION IF NOT EXISTS postgis`;
  await sql`CREATE EXTENSION IF NOT EXISTS pg_trgm`;

  let count = 0;

  for (const listing of seedListings) {
    try {
      await sql`
        INSERT INTO listings (
          name, description, role, specialties, address, phone, email, website,
          location, projects, status, created_at, updated_at, search_vector
        ) VALUES (
          ${listing.name},
          ${listing.description},
          ${listing.role},
          ${listing.specialties},
          ${listing.address},
          ${listing.phone},
          ${listing.email},
          ${listing.website},
          ST_SetSRID(ST_MakePoint(${listing.longitude}, ${listing.latitude}), 4326),
          ${JSON.stringify(listing.projects)}::jsonb,
          'approved',
          NOW(),
          NOW(),
          to_tsvector('english',
            ${listing.name} || ' ' ||
            ${listing.description} || ' ' ||
            ${listing.role} || ' ' ||
            ${listing.specialties.join(' ')} || ' ' ||
            ${listing.address}
          )
        )
        ON CONFLICT DO NOTHING
      `;
      count++;
      console.log(`  [${count}/${seedListings.length}] ${listing.name} (${listing.role})`);
    } catch (error) {
      console.error(`  Failed to insert ${listing.name}:`, error);
    }
  }

  console.log(`\nSeeded ${count} listings successfully.`);
  await sql.end();
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
