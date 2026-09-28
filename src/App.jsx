import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Alert, AppBar, Autocomplete, Box, Button, Card, CardActions, CardContent, Chip,
  Container, Divider, Drawer, FormControl, Grid, IconButton, InputAdornment, InputLabel,
  Link, MenuItem, Select, Stack, TextField, Toolbar, Tooltip, Typography
} from '@mui/material';
import {
  AccessTime, ArrowForward, Call, ChildCare, Close, CrisisAlert, Diversity3,
  FamilyRestroom, Favorite, HealthAndSafety, Language, LocalHospital, LocationOn,
  Menu, OpenInNew, Psychology, Search, Sms, SupportAgent, VolunteerActivism
} from '@mui/icons-material';

const audiences = ['Everyone', 'Adults', 'Children & young people', 'Parents & carers'];
const nations = ['UK-wide', 'England', 'Scotland', 'Wales', 'Northern Ireland'];
const englandRegions = ['London', 'South East', 'East of England', 'South West', 'West Midlands', 'East Midlands', 'North West', 'North East', 'Yorkshire and the Humber'];
const regions = ['All regions', ...englandRegions, 'Scotland', 'Wales', 'Northern Ireland'];
const needs = [
  'General mental health', 'Urgent / crisis', 'Suicidal thoughts', 'Anxiety', 'Depression / low mood',
  'Eating disorders', 'OCD', 'Bereavement', 'Domestic abuse', 'Sexual violence / abuse',
  'LGBTQ+', 'Veterans', 'Men’s wellbeing', 'Loneliness & isolation', 'Relationships', 'Local support', 'Private wellbeing support'
];
const methods = ['Phone', 'Text', 'Webchat', 'Online', 'In person', 'NHS / GP', 'Peer support'];

const services = [
  {
    name: 'NHS urgent mental health help — England', type: 'NHS', audience: ['Everyone'], nation: ['England'],
    needs: ['Urgent / crisis', 'General mental health', 'Suicidal thoughts'], methods: ['Phone', 'Online', 'NHS / GP'],
    phone: '111', actionLabel: 'Use NHS 111', url: 'https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/',
    description: 'For urgent mental health help that is not a life-threatening emergency. Call 111 and select the mental health option, or use NHS 111 online where appropriate.',
    badges: ['24/7', 'NHS', 'Free']
  },
  {
    name: 'NHS 24 Mental Health Hub — Scotland', type: 'NHS', audience: ['Everyone'], nation: ['Scotland'],
    needs: ['Urgent / crisis', 'General mental health', 'Suicidal thoughts'], methods: ['Phone', 'NHS / GP'],
    phone: '111', actionLabel: 'NHS 24 mental health', url: 'https://www.nhs24.scot/support-for-your-mental-health/',
    description: 'Urgent mental health support for people of all ages in Scotland through the NHS 24 Mental Health Hub.',
    badges: ['24/7', 'NHS', 'Free']
  },
  {
    name: 'NHS 111 Wales — press 2', type: 'NHS', audience: ['Everyone'], nation: ['Wales'],
    needs: ['Urgent / crisis', 'General mental health', 'Suicidal thoughts'], methods: ['Phone', 'NHS / GP'],
    phone: '111', actionLabel: 'NHS 111 Wales', url: 'https://111.wales.nhs.uk/encyclopaedia/m/article/mentalhealthandwellbeing',
    description: 'For urgent mental health support in Wales, call 111 and select option 2 to speak to a mental health worker in your area.',
    badges: ['24/7', 'All ages', 'Free']
  },
  {
    name: 'Lifeline — Northern Ireland', type: 'Crisis support', audience: ['Everyone'], nation: ['Northern Ireland'],
    needs: ['Urgent / crisis', 'Suicidal thoughts', 'Depression / low mood', 'Anxiety', 'Sexual violence / abuse'], methods: ['Phone'],
    phone: '0808 808 8000', actionLabel: 'Visit Lifeline guidance', url: 'https://www.nidirect.gov.uk/articles/mental-health-emergency-if-youre-crisis-or-despair',
    description: 'Confidential crisis response helpline for anyone in Northern Ireland who is in distress or despair, and for people worried about someone else.',
    badges: ['24/7', 'Free', 'Northern Ireland']
  },
  {
    name: 'Samaritans', type: 'Listening service', audience: ['Everyone'], nation: ['UK-wide'],
    needs: ['Urgent / crisis', 'Suicidal thoughts', 'General mental health', 'Depression / low mood', 'Bereavement'], methods: ['Phone', 'In person', 'Online'],
    phone: '116 123', actionLabel: 'Contact Samaritans', url: 'https://www.samaritans.org/how-we-can-help/contact-samaritan/',
    description: 'Free emotional support and a listening ear, day or night. You can call about whatever you are going through; some branches also offer face-to-face visits.',
    badges: ['24/7', 'Free', 'Confidential']
  },
  {
    name: 'Shout 85258', type: 'Text support', audience: ['Everyone'], nation: ['UK-wide'],
    needs: ['Urgent / crisis', 'Suicidal thoughts', 'Anxiety', 'Depression / low mood', 'General mental health'], methods: ['Text'],
    text: 'Text SHOUT to 85258', actionLabel: 'Get Shout support', url: 'https://giveusashout.org/get-help/',
    description: 'Free, confidential 24/7 text support for anyone in the UK who is struggling to cope and would rather type than talk.',
    badges: ['24/7', 'Text', 'Free']
  },
  {
    name: 'Mind', type: 'Information & support', audience: ['Adults', 'Parents & carers'], nation: ['England', 'Wales'],
    needs: ['General mental health', 'Local support'], methods: ['Phone', 'Online', 'In person'],
    phone: '0300 123 3393', actionLabel: 'Mind helplines', url: 'https://www.mind.org.uk/information-support/helplines/',
    description: 'Mental health information, service-finding and support. Local Minds also provide community services across England and Wales.',
    badges: ['Information', 'Local services', 'England & Wales']
  },
  {
    name: 'Rethink Mental Illness', type: 'Advice', audience: ['Adults', 'Parents & carers'], nation: ['England'],
    needs: ['General mental health', 'Local support'], methods: ['Phone', 'Webchat', 'Online'],
    phone: '0808 801 0525', actionLabel: 'Rethink advice service', url: 'https://www.rethink.org/advice-and-information/about-our-advice-service/contacting-the-advice-service/',
    description: 'Practical advice and information for adults affected by mental illness, including treatment, rights, benefits and support for carers.',
    badges: ['Advice', 'Carers', 'England']
  },
  {
    name: 'SANE', type: 'Emotional support', audience: ['Adults', 'Parents & carers'], nation: ['UK-wide'],
    needs: ['General mental health', 'Depression / low mood'], methods: ['Phone', 'Online', 'Peer support'],
    phone: '0300 304 7000', actionLabel: 'Explore SANE support', url: 'https://www.sane.org.uk/how-we-help',
    description: 'Emotional support, information, online community and other services for people affected by mental illness, including families and carers.',
    badges: ['SANEline', 'Community', 'UK-wide']
  },
  {
    name: 'Hub of Hope', type: 'Directory', audience: ['Everyone'], nation: ['UK-wide'],
    needs: ['Local support', 'General mental health'], methods: ['Online', 'In person'],
    actionLabel: 'Search local support', url: 'https://hubofhope.co.uk/',
    description: 'A large UK mental health support directory covering local, national, community, charity, private and NHS services. Search by location and need.',
    badges: ['Directory', 'Local search', 'UK-wide']
  },
  {
    name: 'Childline', type: 'Children & young people', audience: ['Children & young people'], nation: ['UK-wide'],
    needs: ['General mental health', 'Urgent / crisis', 'Suicidal thoughts', 'Anxiety', 'Depression / low mood', 'Sexual violence / abuse'], methods: ['Phone', 'Webchat', 'Online'],
    phone: '0800 1111', actionLabel: 'Get Childline support', url: 'https://www.childline.org.uk/get-support/here/',
    description: 'Free confidential support for children and young people. Call, chat online or message a counsellor about anything that is worrying you.',
    badges: ['Free', 'Confidential', 'Young people']
  },
  {
    name: 'YoungMinds Parents Helpline', type: 'Parents & carers', audience: ['Parents & carers'], nation: ['UK-wide'],
    needs: ['General mental health', 'Anxiety', 'Depression / low mood'], methods: ['Phone', 'Webchat', 'Online'],
    phone: '0808 802 5544', actionLabel: 'YoungMinds Parents Helpline', url: 'https://www.youngminds.org.uk/parents-helpline/',
    description: 'Information, advice and emotional support for parents and carers concerned about a child or young person’s mental health.',
    badges: ['Parents', 'Freephone', 'Advice']
  },
  {
    name: 'Kooth', type: 'Digital support', audience: ['Children & young people'], nation: ['UK-wide'],
    needs: ['General mental health', 'Anxiety', 'Depression / low mood'], methods: ['Online', 'Webchat', 'Peer support'],
    actionLabel: 'Check Kooth availability', url: 'https://www.kooth.com/',
    description: 'Online mental wellbeing support used in many UK areas for children and young people. Availability and age range can vary by commissioned area.',
    badges: ['Online', 'Young people', 'Area dependent']
  },
  {
    name: 'Youth Access', type: 'Local youth services', audience: ['Children & young people'], nation: ['UK-wide'],
    needs: ['Local support', 'General mental health'], methods: ['Online', 'In person'],
    actionLabel: 'Find youth support', url: 'https://www.youthaccess.org.uk/find-your-local-service',
    description: 'Find local counselling, advice and support services for young people, including services for ages roughly 11–25.',
    badges: ['Local search', 'Counselling', 'Young people']
  },
  {
    name: 'Beat', type: 'Eating disorders', audience: ['Everyone', 'Parents & carers'], nation: ['UK-wide'],
    needs: ['Eating disorders'], methods: ['Phone', 'Webchat', 'Online'],
    phone: '0808 801 0677', actionLabel: 'Beat support', url: 'https://www.beateatingdisorders.org.uk/get-information-and-support/get-help-for-myself/support-now/',
    description: 'Eating disorder information and support. Beat provides nation-specific helpline numbers and online support for people affected and those supporting them.',
    badges: ['Eating disorders', 'Helpline', 'Webchat']
  },
  {
    name: 'Anxiety UK', type: 'Anxiety support', audience: ['Adults', 'Children & young people'], nation: ['UK-wide'],
    needs: ['Anxiety'], methods: ['Phone', 'Online', 'Peer support'],
    phone: '03444 775 774', actionLabel: 'Anxiety UK support', url: 'https://www.anxietyuk.org.uk/',
    description: 'Advice, support, resources, groups and therapy options for anxiety and anxiety disorders, led by people with lived experience.',
    badges: ['Anxiety', 'Support', 'Therapy options']
  },
  {
    name: 'OCD-UK', type: 'OCD support', audience: ['Adults', 'Children & young people', 'Parents & carers'], nation: ['UK-wide'],
    needs: ['OCD'], methods: ['Online', 'Peer support'],
    actionLabel: 'OCD-UK support groups', url: 'https://www.ocduk.org/support-groups/',
    description: 'OCD information and free online support groups, with groups for adults and specific sessions for young people, parents, family and friends.',
    badges: ['OCD', 'Support groups', 'Lived experience']
  },
  {
    name: 'Cruse Bereavement Support', type: 'Bereavement', audience: ['Everyone'], nation: ['England', 'Wales', 'Northern Ireland'],
    needs: ['Bereavement'], methods: ['Phone', 'Online', 'In person'],
    phone: '0808 808 1677', actionLabel: 'Cruse support', url: 'https://www.cruse.org.uk/',
    description: 'Bereavement support, information and local services for people dealing with grief and loss.',
    badges: ['Bereavement', 'Helpline', 'Local support']
  },
  {
    name: 'CALM', type: 'Suicide prevention', audience: ['Adults'], nation: ['UK-wide'],
    needs: ['Suicidal thoughts', 'Urgent / crisis', 'Depression / low mood'], methods: ['Phone', 'Webchat', 'Online'],
    phone: '0800 58 58 58', actionLabel: 'CALM support', url: 'https://www.thecalmzone.net/get-support',
    description: 'Support for adults affected by suicide or suicidal thoughts, with helpline and online chat options.',
    badges: ['Suicide prevention', 'Adults', 'Evenings']
  },
  {
    name: 'Breathing Space', type: 'Emotional support', audience: ['Adults'], nation: ['Scotland'],
    needs: ['Anxiety', 'Depression / low mood', 'General mental health'], methods: ['Phone', 'Webchat'],
    phone: '0800 83 85 87', actionLabel: 'Breathing Space', url: 'https://www.nhsinform.scot/care-support-and-rights/nhs-services/helplines/breathing-space-helpline',
    description: 'Free confidential phone support for people in Scotland aged 16+ who feel low, depressed, anxious or overwhelmed.',
    badges: ['Scotland', '16+', 'Free']
  },
  {
    name: 'C.A.L.L. Helpline', type: 'Emotional support', audience: ['Everyone'], nation: ['Wales'],
    needs: ['General mental health', 'Depression / low mood', 'Anxiety'], methods: ['Phone', 'Online'],
    phone: '0800 132 737', actionLabel: 'C.A.L.L. Wales', url: 'https://callhelpline.org.uk/',
    description: 'Mental health listening and emotional support service for people in Wales.',
    badges: ['Wales', '24/7', 'Free']
  },
  {
    name: 'Switchboard LGBT+', type: 'LGBTQ+ support', audience: ['Everyone'], nation: ['UK-wide'],
    needs: ['LGBTQ+', 'General mental health'], methods: ['Phone', 'Webchat', 'Online'],
    phone: '0800 0119 100', actionLabel: 'Switchboard LGBT+', url: 'https://switchboard.lgbt/contact-us',
    description: 'UK LGBTQIA+ support line offering phone, instant message and email support from volunteers in the LGBTQIA+ community.',
    badges: ['LGBTQIA+', 'Peer support', 'UK-wide']
  },
  {
    name: 'National Domestic Abuse Helpline — Refuge', type: 'Domestic abuse', audience: ['Adults'], nation: ['England'],
    needs: ['Domestic abuse'], methods: ['Phone', 'Webchat', 'Online'],
    phone: '0808 2000 247', actionLabel: 'Domestic abuse support', url: 'https://refuge.org.uk/i-need-help-now/',
    description: 'Free confidential domestic abuse support, including a 24-hour phone helpline and live chat at published times.',
    badges: ['24/7 phone', 'Domestic abuse', 'Confidential']
  },
  {
    name: 'SurvivorsUK', type: 'Sexual violence support', audience: ['Adults', 'Children & young people'], nation: ['UK-wide'],
    needs: ['Sexual violence / abuse'], methods: ['Phone', 'Text', 'Webchat', 'Online'],
    phone: '0808 801 0332', text: 'SMS / WhatsApp 07860 031252', actionLabel: 'SurvivorsUK helpline', url: 'https://www.survivorsuk.org/male-nonbinary-survivor-helpline/',
    description: 'Specialist support for men, boys, trans and non-binary people who have experienced sexual abuse, and for loved ones supporting a survivor.',
    badges: ['Sexual abuse', 'Male & non-binary', 'Webchat']
  },
  {
    name: 'Combat Stress', type: 'Veterans', audience: ['Adults', 'Parents & carers'], nation: ['UK-wide'],
    needs: ['Veterans', 'General mental health'], methods: ['Phone', 'Text', 'Online'],
    phone: '0800 138 1619', text: 'Text 07537 173683', actionLabel: 'Combat Stress', url: 'https://combatstress.org.uk/get-help/',
    description: 'Specialist mental health support for veterans and their families, particularly for trauma related to military service.',
    badges: ['Veterans', '24/7 helpline', 'Trauma']
  },
  {
    name: 'Relate', type: 'Relationships', audience: ['Adults', 'Parents & carers'], nation: ['UK-wide'],
    needs: ['Relationships', 'General mental health'], methods: ['Online', 'In person'],
    actionLabel: 'Find Relate support', url: 'https://www.relate.org.uk/',
    description: 'Relationship counselling and support for couples, individuals, families and young people. Services and costs vary by local centre and format.',
    badges: ['Relationships', 'Counselling', 'Families']
  },
  {
    name: 'UK Men’s Sheds Association', type: 'Community & peer support', audience: ['Adults'], nation: ['UK-wide'], regions: ['UK-wide'],
    needs: ['Men’s wellbeing', 'Loneliness & isolation', 'General mental health', 'Local support'], methods: ['In person', 'Peer support', 'Online'],
    actionLabel: 'Find a local Men’s Shed', url: 'https://menssheds.org.uk/find-a-shed/',
    description: 'Find local Men’s Sheds across the UK. Sheds offer practical activities, friendship, social connection and peer support, helping reduce loneliness and isolation and support wellbeing.',
    badges: ['Men’s wellbeing', 'Local search', 'Community', 'UK-wide']
  },
  {
    name: 'HABS – Strength in Mind', type: 'Therapeutic & family support', audience: ['Adults', 'Children & young people', 'Parents & carers'], nation: ['England'], regions: ['East of England'],
    needs: ['General mental health', 'Anxiety', 'Depression / low mood', 'Local support'], methods: ['In person', 'Online'],
    phone: '07951 497277', actionLabel: 'Visit HABS', url: 'https://habsfamily.co.uk/',
    description: 'Hertfordshire-based therapeutic support for children, young people, adults and families, including psychotherapy, counselling, coaching, mentoring, family support and community outreach.',
    badges: ['Hertfordshire', 'Children & families', 'Adults', 'Therapeutic support']
  },
  {
    name: 'Thought Reader', type: 'Private wellbeing support', audience: ['Adults'], nation: ['UK-wide'],
    needs: ['Private wellbeing support', 'Anxiety', 'General mental health'], methods: ['Online', 'In person'],
    actionLabel: 'Visit Thought Reader', url: 'https://thought-reader.co.uk/',
    description: 'Private hypnotherapy, mindset and wellbeing support for areas such as anxiety, stress, confidence, habits and personal change. Not an emergency or crisis service.',
    badges: ['Private service', 'Hypnotherapy', 'Wellbeing']
  }
];

const categories = [
  { key: 'Urgent / crisis', title: 'I need urgent help', copy: 'Crisis and urgent mental health routes, including NHS and listening services.', icon: CrisisAlert },
  { key: 'General mental health', title: 'I need someone to talk to', copy: 'General mental health information, listening, advice and emotional support.', icon: SupportAgent },
  { key: 'Children & young people', title: 'Support for a child or young person', copy: 'Confidential support for young people plus routes for parents and carers.', icon: ChildCare, audience: true },
  { key: 'Local support', title: 'Find help near me', copy: 'Directories and local services when you want support in your area.', icon: LocationOn },
  { key: 'specialist', title: 'Specialist support', copy: 'Eating disorders, OCD, bereavement, LGBTQ+, abuse, veterans and more.', icon: Diversity3 }
];

const specialistNeeds = ['Eating disorders', 'OCD', 'Bereavement', 'Domestic abuse', 'Sexual violence / abuse', 'LGBTQ+', 'Veterans', 'Men’s wellbeing', 'Loneliness & isolation', 'Relationships'];

function getServiceRegions(service) {
  if (service.regions?.length) return service.regions;
  if (service.nation.includes('UK-wide')) return ['UK-wide'];
  if (service.nation.includes('England')) return englandRegions;
  return service.nation.filter((n) => ['Scotland', 'Wales', 'Northern Ireland'].includes(n));
}

function matchesCategory(service, category) {
  if (category === 'all') return true;
  if (category === 'specialist') return service.needs.some((need) => specialistNeeds.includes(need));
  if (category === 'Children & young people') return service.audience.includes('Children & young people');
  return service.needs.includes(category);
}

function ServiceCard({ service }) {
  return (
    <Card component="article" variant="outlined" sx={{ height: '100%', borderColor: 'divider', borderRadius: 4, display: 'flex', flexDirection: 'column', overflow: 'visible' }}>
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Box>
            <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: '.1em' }}>{service.type}</Typography>
            <Typography variant="h3" component="h3" sx={{ fontSize: { xs: '1.25rem', md: '1.4rem' }, mt: .25 }}>{service.name}</Typography>
          </Box>
          <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: 'primary.light', display: 'grid', placeItems: 'center', color: 'primary.main', flexShrink: 0 }}>
            <Favorite fontSize="small" />
          </Box>
        </Stack>
        <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.65 }}>{service.description}</Typography>
        <Stack direction="row" flexWrap="wrap" gap={.75} sx={{ mt: 2 }}>
          {service.badges.map((b) => <Chip key={b} label={b} size="small" variant="outlined" />)}
        </Stack>
        {(service.phone || service.text) && <Divider sx={{ my: 2.25 }} />}
        <Stack spacing={1}>
          {service.phone && <Stack direction="row" spacing={1} alignItems="center"><Call fontSize="small" color="primary"/><Link href={`tel:${service.phone.replace(/\s/g,'')}`} underline="hover" fontWeight={800}>{service.phone}</Link></Stack>}
          {service.text && <Stack direction="row" spacing={1} alignItems="center"><Sms fontSize="small" color="primary"/><Typography variant="body2" fontWeight={700}>{service.text}</Typography></Stack>}
        </Stack>
      </CardContent>
      <CardActions sx={{ px: 3, pb: 3, pt: 0 }}>
        <Button href={service.url} target="_blank" rel="noopener noreferrer" endIcon={<OpenInNew fontSize="small"/>} variant="contained" fullWidth>{service.actionLabel}</Button>
      </CardActions>
    </Card>
  );
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [audience, setAudience] = useState('Everyone');
  const [nation, setNation] = useState('UK-wide');
  const [region, setRegion] = useState('All regions');
  const [need, setNeed] = useState('All needs');
  const [method, setMethod] = useState('Any method');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => services.filter((service) => {
    const serviceRegions = getServiceRegions(service);
    const haystack = `${service.name} ${service.type} ${service.description} ${service.needs.join(' ')} ${service.badges.join(' ')} ${service.nation.join(' ')} ${serviceRegions.join(' ')}`.toLowerCase();
    const qOk = !query.trim() || haystack.includes(query.trim().toLowerCase());
    const audienceOk = audience === 'Everyone' || service.audience.includes('Everyone') || service.audience.includes(audience);
    const nationOk = nation === 'UK-wide' || service.nation.includes('UK-wide') || service.nation.includes(nation);
    const regionOk = region === 'All regions' || serviceRegions.includes('UK-wide') || serviceRegions.includes(region);
    const needOk = need === 'All needs' || service.needs.includes(need);
    const methodOk = method === 'Any method' || service.methods.includes(method);
    const categoryOk = matchesCategory(service, category);
    return qOk && audienceOk && nationOk && regionOk && needOk && methodOk && categoryOk;
  }), [query, audience, nation, region, need, method, category]);

  const resetFilters = () => { setQuery(''); setAudience('Everyone'); setNation('UK-wide'); setRegion('All regions'); setNeed('All needs'); setMethod('Any method'); setCategory('all'); };

  const schema = {
    '@context': 'https://schema.org', '@type': 'ItemList', name: 'UK mental health support services',
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: s.url }))
  };

  const nav = (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 3 }} alignItems={{ xs: 'stretch', md: 'center' }}>
      <Link color="inherit" underline="none" href="#urgent" onClick={() => setDrawerOpen(false)}>Urgent help</Link>
      <Link color="inherit" underline="none" href="#directory" onClick={() => setDrawerOpen(false)}>Find support</Link>
      <Link color="inherit" underline="none" href="#children" onClick={() => setDrawerOpen(false)}>Children & families</Link>
      <Link color="inherit" underline="none" href="#about" onClick={() => setDrawerOpen(false)}>About this directory</Link>
    </Stack>
  );

  return (
    <>
      <Helmet>
        <title>Mental Health Support UK | Adults, Children & Families</title>
        <meta name="description" content="Search trusted UK mental health support by age, need and region. Find urgent NHS help, helplines, Men’s Sheds, HABS, charities, local services and specialist support for adults, children and families." />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'rgba(247,245,239,.94)', backdropFilter: 'blur(14px)' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 72 }}>
            <Stack direction="row" spacing={1.25} alignItems="center" sx={{ flexGrow: 1 }}>
              <Box sx={{ width: 42, height: 42, borderRadius: 2.5, bgcolor: 'primary.main', color: 'white', display: 'grid', placeItems: 'center' }}><Psychology/></Box>
              <Box><Typography fontWeight={850} lineHeight={1}>MENTAL HEALTH</Typography><Typography variant="caption" color="text.secondary" letterSpacing=".08em">SUPPORT UK</Typography></Box>
            </Stack>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>{nav}</Box>
            <Button href="#urgent" color="secondary" variant="contained" sx={{ ml: 3, display: { xs: 'none', md: 'inline-flex' } }}>Urgent help</Button>
            <IconButton sx={{ display: { md: 'none' } }} onClick={() => setDrawerOpen(true)} aria-label="Open menu"><Menu/></IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 290, p: 3 }}><Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}><Typography fontWeight={800}>Menu</Typography><IconButton onClick={() => setDrawerOpen(false)}><Close/></IconButton></Stack>{nav}</Box>
      </Drawer>

      <Box component="main">
        <Box sx={{ bgcolor: 'primary.dark', color: 'white', py: { xs: 7, md: 11 }, position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', width: 440, height: 440, border: '1px solid rgba(255,255,255,.12)', borderRadius: '50%', right: -100, top: -150 }} />
          <Box sx={{ position: 'absolute', width: 280, height: 280, border: '1px solid rgba(255,255,255,.1)', borderRadius: '50%', right: 70, top: -25 }} />
          <Container maxWidth="lg" sx={{ position: 'relative' }}>
            <Grid container spacing={6} alignItems="center">
              <Grid size={{ xs: 12, md: 7 }}>
                <Chip icon={<HealthAndSafety/>} label="Independent UK support directory" sx={{ mb: 2.5, bgcolor: 'rgba(221,244,233,.12)', color: '#DDF4E9', '& .MuiChip-icon': { color: '#DDF4E9' } }} />
                <Typography variant="h1" sx={{ fontSize: { xs: '3rem', sm: '4.3rem', md: '5.4rem' }, maxWidth: 900 }}>Find the right mental health support.<Box component="span" sx={{ color: '#B9E6D2' }}> Start where you are.</Box></Typography>
                <Typography sx={{ mt: 3, fontSize: { xs: '1.08rem', md: '1.25rem' }, maxWidth: 760, color: 'rgba(255,255,255,.78)', lineHeight: 1.65 }}>Search UK services for adults, children, young people, parents and carers — from urgent NHS help and 24-hour listening services to specialist charities, local support and private wellbeing services.</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4 }}><Button href="#directory" variant="contained" color="secondary" size="large" endIcon={<ArrowForward/>}>Find support</Button><Button href="#urgent" variant="outlined" size="large" sx={{ color: 'white', borderColor: 'rgba(255,255,255,.4)' }}>I need urgent help</Button></Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Card sx={{ bgcolor: '#F8F7F1', color: 'text.primary', borderRadius: 5 }}>
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Typography variant="overline" color="secondary.main" fontWeight={900}>START WITH WHAT YOU NEED</Typography>
                    <Typography variant="h2" sx={{ fontSize: '2rem', mt: .5 }}>You do not need to know which service to choose.</Typography>
                    <Stack spacing={1.25} mt={3}>
                      {['Someone to talk to now', 'Help for my child', 'Specialist support', 'Local services near me'].map((x) => <Stack key={x} direction="row" spacing={1.25} alignItems="center"><Box sx={{ width: 30, height: 30, bgcolor: 'primary.light', color: 'primary.main', borderRadius: '50%', display: 'grid', placeItems: 'center' }}><ArrowForward sx={{ fontSize: 17 }}/></Box><Typography fontWeight={700}>{x}</Typography></Stack>)}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box id="urgent" sx={{ bgcolor: '#FFF1EC', py: { xs: 5, md: 6 }, borderBottom: '1px solid #F1D3C9' }}>
          <Container maxWidth="lg">
            <Grid container spacing={3} alignItems="stretch">
              <Grid size={{ xs: 12, md: 4 }}>
                <Stack height="100%" justifyContent="center">
                  <Typography variant="overline" color="secondary.main" fontWeight={900}>URGENT & EMERGENCY HELP</Typography>
                  <Typography variant="h2" sx={{ fontSize: { xs: '2.1rem', md: '2.65rem' }, mt: .5 }}>If someone is in immediate danger.</Typography>
                  <Typography color="text.secondary" mt={1.5}>Call <strong>999</strong> or go to <strong>A&amp;E</strong>. If the situation is urgent but not life-threatening, use the mental health route for your UK nation.</Typography>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <Grid container spacing={2}>
                  {[
                    ['England', '111 · mental health option', 'https://www.nhs.uk/nhs-services/mental-health-services/where-to-get-urgent-help-for-mental-health/'],
                    ['Scotland', '111 · Mental Health Hub', 'https://www.nhs24.scot/support-for-your-mental-health/'],
                    ['Wales', '111 · press option 2', 'https://111.wales.nhs.uk/encyclopaedia/m/article/mentalhealthandwellbeing'],
                    ['Northern Ireland', 'Lifeline · 0808 808 8000', 'https://www.nidirect.gov.uk/articles/mental-health-emergency-if-youre-crisis-or-despair']
                  ].map(([n, t, u]) => <Grid key={n} size={{ xs: 12, sm: 6 }}><Card variant="outlined" sx={{ boxShadow: 'none', borderColor: '#EFC9BE', height: '100%' }}><CardContent><Typography fontWeight={850}>{n}</Typography><Typography color="text.secondary" mt={.5}>{t}</Typography><Button href={u} target="_blank" rel="noopener noreferrer" size="small" sx={{ mt: 1, px: 0 }} endIcon={<OpenInNew/>}>Official guidance</Button></CardContent></Card></Grid>)}
                </Grid>
              </Grid>
            </Grid>
            <Alert severity="info" sx={{ mt: 3, borderRadius: 3 }}>Samaritans can be reached free on <strong>116 123</strong>, 24 hours a day. Shout offers 24/7 text support: <strong>text SHOUT to 85258</strong>.</Alert>
          </Container>
        </Box>

        <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
          <Typography variant="overline" color="primary.main" fontWeight={900}>CHOOSE A ROUTE</Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.35rem', md: '3.3rem' }, maxWidth: 760 }}>Start with the kind of help that feels closest to what you need.</Typography>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            {categories.map(({ key, title, copy, icon: Icon }) => <Grid key={key} size={{ xs: 12, sm: 6, md: 4 }}><Card onClick={() => { setCategory(key); document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' }); }} variant="outlined" sx={{ cursor: 'pointer', height: '100%', boxShadow: 'none', borderColor: category === key ? 'primary.main' : 'divider', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 14px 40px rgba(18,48,45,.09)' }, transition: '.2s ease' }}><CardContent sx={{ p: 3 }}><Box sx={{ width: 48, height: 48, borderRadius: '50%', bgcolor: 'primary.light', color: 'primary.main', display: 'grid', placeItems: 'center' }}><Icon/></Box><Typography variant="h3" sx={{ fontSize: '1.35rem', mt: 2 }}>{title}</Typography><Typography color="text.secondary" mt={1}>{copy}</Typography></CardContent></Card></Grid>)}
          </Grid>
        </Container>

        <Box id="directory" sx={{ bgcolor: '#EEF5F1', py: { xs: 7, md: 10 } }}>
          <Container maxWidth="xl">
            <Box sx={{ maxWidth: 850 }}><Typography variant="overline" color="primary.main" fontWeight={900}>UK SUPPORT DIRECTORY</Typography><Typography variant="h2" sx={{ fontSize: { xs: '2.35rem', md: '3.4rem' } }}>Find support by age, need, location or how you want to talk.</Typography><Typography color="text.secondary" sx={{ mt: 1.5, fontSize: '1.08rem' }}>This is a curated directory of major national and specialist services. For the widest local search, use Hub of Hope.</Typography></Box>

            <Card variant="outlined" sx={{ mt: 4, boxShadow: 'none', borderColor: 'divider' }}><CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}><TextField fullWidth value={query} onChange={(e) => setQuery(e.target.value)} label="Search support or place" placeholder="e.g. anxiety, Hertfordshire, young person" InputProps={{ startAdornment: <InputAdornment position="start"><Search/></InputAdornment> }} /></Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}><FormControl fullWidth><InputLabel>For</InputLabel><Select value={audience} label="For" onChange={(e)=>setAudience(e.target.value)}>{audiences.map(x=><MenuItem key={x} value={x}>{x}</MenuItem>)}</Select></FormControl></Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}><FormControl fullWidth><InputLabel>Nation</InputLabel><Select value={nation} label="Nation" onChange={(e)=>setNation(e.target.value)}>{nations.map(x=><MenuItem key={x} value={x}>{x}</MenuItem>)}</Select></FormControl></Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}><FormControl fullWidth><InputLabel>Region</InputLabel><Select value={region} label="Region" onChange={(e)=>setRegion(e.target.value)}>{regions.map(x=><MenuItem key={x} value={x}>{x}</MenuItem>)}</Select></FormControl></Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}><FormControl fullWidth><InputLabel>Need</InputLabel><Select value={need} label="Need" onChange={(e)=>setNeed(e.target.value)}><MenuItem value="All needs">All needs</MenuItem>{needs.map(x=><MenuItem key={x} value={x}>{x}</MenuItem>)}</Select></FormControl></Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}><FormControl fullWidth><InputLabel>Method</InputLabel><Select value={method} label="Method" onChange={(e)=>setMethod(e.target.value)}><MenuItem value="Any method">Any method</MenuItem>{methods.map(x=><MenuItem key={x} value={x}>{x}</MenuItem>)}</Select></FormControl></Grid>
              </Grid>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} spacing={1} mt={2}><Typography color="text.secondary"><strong>{filtered.length}</strong> services match your filters</Typography><Button onClick={resetFilters}>Clear filters</Button></Stack>
            </CardContent></Card>

            <Grid container spacing={2.5} sx={{ mt: 1 }}>
              {filtered.map((service) => <Grid key={service.name} size={{ xs: 12, sm: 6, lg: 4 }}><ServiceCard service={service}/></Grid>)}
            </Grid>
            {filtered.length === 0 && <Card variant="outlined" sx={{ mt: 3, boxShadow: 'none' }}><CardContent sx={{ textAlign: 'center', py: 6 }}><Search sx={{ fontSize: 46, color: 'text.secondary' }}/><Typography variant="h3" sx={{ fontSize: '1.5rem', mt: 1 }}>No exact matches</Typography><Typography color="text.secondary" mt={1}>Try clearing one or more filters, or search Hub of Hope for local services.</Typography><Button onClick={resetFilters} variant="contained" sx={{ mt: 2 }}>Show all services</Button></CardContent></Card>}
          </Container>
        </Box>

        <Container id="children" maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
          <Grid container spacing={5} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}><Typography variant="overline" color="secondary.main" fontWeight={900}>CHILDREN, YOUNG PEOPLE & FAMILIES</Typography><Typography variant="h2" sx={{ fontSize: { xs: '2.35rem', md: '3.3rem' } }}>There are routes for the young person — and separate support for the adult helping them.</Typography><Typography color="text.secondary" sx={{ mt: 2, fontSize: '1.08rem', lineHeight: 1.75 }}>Childline provides direct confidential support for young people. YoungMinds supports parents and carers. PAPYRUS focuses on suicide prevention for young people and those worried about them. Local NHS children and young people’s mental health services can also be accessed through GP, school or local referral pathways.</Typography><Button variant="contained" sx={{ mt: 3 }} onClick={() => { setAudience('Children & young people'); setCategory('all'); document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' }); }}>Show young people’s services</Button></Grid>
            <Grid size={{ xs: 12, md: 6 }}><Stack spacing={2}>{[
              ['Childline', '0800 1111', 'For children and young people who want to talk confidentially.'],
              ['YoungMinds Parents Helpline', '0808 802 5544', 'For parents and carers worried about a child’s mental health.'],
              ['PAPYRUS HOPELINE247', '0800 068 4141', 'Suicide prevention support for young people and those concerned about them.']
            ].map(([n,p,c])=><Card key={n} variant="outlined" sx={{ boxShadow: 'none' }}><CardContent><Stack direction="row" spacing={2}><Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: 'secondary.light', color: 'secondary.main', display: 'grid', placeItems: 'center', flexShrink: 0 }}><FamilyRestroom/></Box><Box><Typography fontWeight={850}>{n}</Typography><Typography fontWeight={800} color="primary.main">{p}</Typography><Typography variant="body2" color="text.secondary" mt={.5}>{c}</Typography></Box></Stack></CardContent></Card>)}</Stack></Grid>
          </Grid>
        </Container>

        <Box sx={{ bgcolor: 'primary.dark', color: 'white', py: { xs: 7, md: 9 } }}>
          <Container maxWidth="lg"><Grid container spacing={4} alignItems="center"><Grid size={{ xs: 12, md: 8 }}><Typography variant="overline" sx={{ color: '#B9E6D2' }} fontWeight={900}>CAN’T FIND THE RIGHT SERVICE?</Typography><Typography variant="h2" sx={{ fontSize: { xs: '2.2rem', md: '3rem' }, mt: .5 }}>Search tens of thousands of local and national services with Hub of Hope.</Typography><Typography sx={{ color: 'rgba(255,255,255,.72)', mt: 1.5 }}>It brings together NHS, charity, community, private and peer support across the UK.</Typography></Grid><Grid size={{ xs: 12, md: 4 }}><Button href="https://hubofhope.co.uk/" target="_blank" rel="noopener noreferrer" color="secondary" variant="contained" size="large" fullWidth endIcon={<OpenInNew/>}>Open Hub of Hope</Button></Grid></Grid></Container>
        </Box>

        <Container id="about" maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, md: 7 }}><Typography variant="overline" color="primary.main" fontWeight={900}>ABOUT THIS DIRECTORY</Typography><Typography variant="h2" sx={{ fontSize: { xs: '2.25rem', md: '3rem' } }}>A practical starting point — not a diagnosis or substitute for professional assessment.</Typography><Typography color="text.secondary" sx={{ mt: 2, lineHeight: 1.8 }}>The directory signposts to established NHS routes, charities, specialist organisations, community directories and selected private support. Services can change phone numbers, opening hours, eligibility and coverage, so always check the provider’s own website before relying on a detail. If someone is in immediate danger, call 999 or go to A&amp;E.</Typography></Grid>
            <Grid size={{ xs: 12, md: 5 }}><Card variant="outlined" sx={{ boxShadow: 'none', bgcolor: '#FCFAF4' }}><CardContent sx={{ p: 3 }}><Stack spacing={2}>{[[Language,'UK-wide focus'],[VolunteerActivism,'Charity, NHS & specialist routes'],[AccessTime,'Urgent help kept prominent'],[LocalHospital,'Official provider links']].map(([Icon,t])=><Stack direction="row" spacing={1.5} alignItems="center" key={t}><Icon color="primary"/><Typography fontWeight={750}>{t}</Typography></Stack>)}</Stack></CardContent></Card></Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="footer" sx={{ bgcolor: '#102B2A', color: 'white', py: 6 }}>
        <Container maxWidth="lg"><Grid container spacing={4}><Grid size={{ xs: 12, md: 5 }}><Stack direction="row" spacing={1.25} alignItems="center"><Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: '#DDF4E9', color: 'primary.main', display: 'grid', placeItems: 'center' }}><Psychology/></Box><Typography fontWeight={850}>MENTAL HEALTH SUPPORT UK</Typography></Stack><Typography sx={{ mt: 2, color: 'rgba(255,255,255,.65)', maxWidth: 520 }}>Independent signposting to UK mental health and wellbeing resources. Not an emergency service.</Typography></Grid><Grid size={{ xs: 12, sm: 6, md: 3 }}><Typography fontWeight={800}>Emergency</Typography><Typography sx={{ mt: 1, color: 'rgba(255,255,255,.72)' }}>Immediate danger: 999 / A&amp;E</Typography><Typography sx={{ color: 'rgba(255,255,255,.72)' }}>Samaritans: 116 123</Typography></Grid><Grid size={{ xs: 12, sm: 6, md: 4 }}><Typography fontWeight={800}>Review note</Typography><Typography sx={{ mt: 1, color: 'rgba(255,255,255,.72)' }}>Resource details researched and compiled September 2026. Provider websites remain the source of truth for current access details.</Typography></Grid></Grid><Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,.12)' }}/><Typography variant="caption" sx={{ color: 'rgba(255,255,255,.55)' }}>© {new Date().getFullYear()} Mental Health Support UK · Signposting information only</Typography></Container>
      </Box>
    </>
  );
}

export default App;
