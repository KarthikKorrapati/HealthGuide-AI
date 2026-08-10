import type { SymptomInput, PossibleCause, TriageLevel } from './types';

interface KnowledgeEntry {
  keywords: string[];
  possibleCauses: PossibleCause[];
  selfCare: string[];
  whenToSeeDoctor: string[];
  emergencySigns: string[];
  baseTriage: TriageLevel;
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    keywords: ['fever', 'temperature', 'hot', 'chills', 'shivering'],
    possibleCauses: [
      { name: 'Viral respiratory infection', description: 'Common viral infections often cause fever along with fatigue and body aches.' },
      { name: 'Influenza (flu)', description: 'Influenza typically produces higher fever, body aches, and fatigue that come on suddenly.' },
      { name: 'Bacterial infection', description: 'Various bacterial infections can cause fever, sometimes localized to one area.' },
      { name: 'Other infections', description: 'Many infections — including COVID-19 — can present with fever and should be considered.' },
    ],
    selfCare: [
      'Rest as much as possible and avoid strenuous activity.',
      'Drink plenty of fluids — water, clear soups, and oral rehydration solutions.',
      'Wear light clothing and keep the room comfortably cool.',
      'Monitor your temperature regularly.',
      'Eat light, easily digestible meals when you feel hungry.',
    ],
    whenToSeeDoctor: [
      'Fever lasting more than 3 days without improvement.',
      'Fever that goes away and then returns with worse symptoms.',
      'Persistent fever above 39°C (102°F) despite self-care.',
    ],
    emergencySigns: [
      'Fever above 40°C (104°F) that does not come down.',
      'Difficulty breathing or chest pain with fever.',
      'Confusion, severe drowsiness, or inability to stay awake.',
      'Stiff neck with severe headache and sensitivity to light.',
      'Persistent vomiting preventing fluid intake.',
    ],
    baseTriage: 1,
  },
  {
    keywords: ['cough', 'coughing', 'sore throat', 'throat pain', 'pharyngitis'],
    possibleCauses: [
      { name: 'Viral upper respiratory infection', description: 'The common cold and similar viruses often cause cough and sore throat.' },
      { name: 'Influenza', description: 'The flu can produce a dry cough and sore throat alongside fever and body aches.' },
      { name: 'Allergic reaction', description: 'Allergies can irritate the throat and cause coughing, often without fever.' },
      { name: 'Bacterial throat infection', description: 'Strep throat and similar infections can cause severe throat pain, sometimes with white patches.' },
    ],
    selfCare: [
      'Stay hydrated with warm fluids — water, herbal tea, and broth soothe the throat.',
      'Gargle with warm salt water (1/2 teaspoon salt in a glass of warm water).',
      'Use a humidifier or breathe steam to ease throat irritation.',
      'Rest your voice and avoid irritants like smoke.',
      'Honey (for adults and children over 1 year) can help soothe a cough.',
    ],
    whenToSeeDoctor: [
      'Cough or sore throat lasting more than 7–10 days.',
      'Cough accompanied by high or persistent fever.',
      'Difficulty swallowing or significant pain when swallowing.',
      'Coughing up blood or discolored phlegm.',
    ],
    emergencySigns: [
      'Severe difficulty breathing or shortness of breath at rest.',
      'Swelling of the throat or tongue that blocks swallowing or breathing.',
      'Drooling and inability to swallow saliva (especially in children).',
      'Blue or grey lips or face.',
    ],
    baseTriage: 1,
  },
  {
    keywords: ['headache', 'head pain', 'migraine', 'head ache'],
    possibleCauses: [
      { name: 'Tension headache', description: 'The most common type — often a dull, pressing pain on both sides, linked to stress or posture.' },
      { name: 'Migraine', description: 'Migraines are often one-sided, throbbing, and may come with nausea and sensitivity to light or sound.' },
      { name: 'Dehydration-related headache', description: 'Not drinking enough fluids can trigger headaches that ease with hydration and rest.' },
      { name: 'Sinus headache', description: 'Sinus inflammation can cause pressure around the forehead and cheeks, often with nasal symptoms.' },
    ],
    selfCare: [
      'Rest in a quiet, dark room.',
      'Stay well hydrated — drink water regularly.',
      'Apply a cool compress to the forehead or a warm cloth to the neck.',
      'Try gentle neck and shoulder stretches if tension is a factor.',
      'Note possible triggers (foods, stress, screen time, lack of sleep).',
    ],
    whenToSeeDoctor: [
      'Headaches occurring more frequently or becoming more severe over time.',
      'Headaches that disrupt daily life or do not respond to self-care.',
      'New headache patterns after age 50.',
    ],
    emergencySigns: [
      'Sudden, extremely severe headache ("thunderclap" headache).',
      'Headache with stiff neck, fever, and sensitivity to light.',
      'Headache after a head injury.',
      'Headache with confusion, vision loss, weakness, or trouble speaking.',
      'Headache with loss of consciousness or seizures.',
    ],
    baseTriage: 1,
  },
  {
    keywords: ['stomach', 'abdominal', 'abdomen', 'belly pain', 'nausea', 'vomiting', 'diarrhea', 'loose motion', 'indigestion', 'gas', 'bloating'],
    possibleCauses: [
      { name: 'Gastroenteritis (stomach flu)', description: 'Viral or bacterial inflammation of the stomach and intestines, often causing nausea, diarrhea, and cramps.' },
      { name: 'Food-related upset', description: 'Food intolerance, overeating, or minor food contamination can cause stomach discomfort and changes in bowel habits.' },
      { name: 'Acid reflux / indigestion', description: 'Acid flowing back into the esophagus can cause burning and bloating, especially after meals.' },
      { name: 'Other abdominal conditions', description: 'Many conditions — from irritable bowel to appendicitis — can cause abdominal pain; a doctor can determine the exact cause.' },
    ],
    selfCare: [
      'Sip clear fluids frequently in small amounts to stay hydrated.',
      'Try oral rehydration solutions if you have vomiting or diarrhea.',
      'Eat bland, easy-to-digest foods (rice, toast, bananas) when you feel able.',
      'Avoid spicy, fatty, or heavily seasoned foods and caffeine.',
      'Rest and avoid eating large meals.',
    ],
    whenToSeeDoctor: [
      'Symptoms lasting more than 2–3 days without improvement.',
      'Signs of dehydration (dry mouth, little or no urination, dizziness).',
      'Persistent abdominal pain localized to one area.',
      'Blood in vomit or stool.',
    ],
    emergencySigns: [
      'Severe, sudden, or worsening abdominal pain.',
      'Vomiting blood or material that looks like coffee grounds.',
      'Black, tarry, or bloody stools.',
      'Inability to keep any fluids down for over 24 hours.',
      'Severe dehydration — dizziness, confusion, no urination.',
      'Abdominal pain with high fever and rigid, tender abdomen.',
    ],
    baseTriage: 1,
  },
  {
    keywords: ['chest pain', 'chest pressure', 'chest tightness', 'chest discomfort', 'heart pain'],
    possibleCauses: [
      { name: 'Muscle strain', description: 'Chest wall muscles can become sore from coughing, lifting, or sudden movement.' },
      { name: 'Acid reflux', description: 'Acid reflux can cause a burning sensation in the chest that may mimic heart-related pain.' },
      { name: 'Anxiety-related chest tightness', description: 'Anxiety and panic can produce chest tightness, rapid heartbeat, and shortness of breath.' },
      { name: 'Potentially serious cardiac or lung condition', description: 'Chest pain can sometimes signal a heart or lung problem that requires urgent evaluation — a doctor must rule this out.' },
    ],
    selfCare: [
      'Stop physical activity and sit or lie down in a comfortable position.',
      'Loosen tight clothing around the chest and waist.',
      'Try to stay calm and breathe slowly and evenly.',
      'Note exactly when the pain started, what it feels like, and whether it spreads.',
    ],
    whenToSeeDoctor: [
      'Any new or unexplained chest pain should be evaluated by a doctor.',
      'Chest pain that comes and goes regularly.',
      'Chest pain related to exertion that eases with rest.',
    ],
    emergencySigns: [
      'Severe chest pain or pressure, especially spreading to the arm, jaw, neck, or back.',
      'Chest pain with shortness of breath, sweating, or nausea.',
      'Chest pain with dizziness or fainting.',
      'Chest pain lasting more than a few minutes or worsening rapidly.',
    ],
    baseTriage: 3,
  },
  {
    keywords: ['breathing', 'shortness of breath', 'breathless', 'wheezing', 'breath', "can't breathe", 'trouble breathing'],
    possibleCauses: [
      { name: 'Asthma flare-up', description: 'Asthma can cause wheezing, chest tightness, and shortness of breath, often triggered by allergens or exertion.' },
      { name: 'Respiratory infection', description: 'Infections of the airways or lungs can cause breathlessness, cough, and fever.' },
      { name: 'Anxiety / panic', description: 'Anxiety can cause a feeling of not getting enough air, along with rapid breathing and a racing heart.' },
      { name: 'Potentially serious lung or heart condition', description: 'Breathing difficulty can sometimes signal a serious condition that requires urgent evaluation.' },
    ],
    selfCare: [
      'Sit upright and lean slightly forward — this position can ease breathing.',
      'Breathe slowly through pursed lips: in through the nose, out slowly through the mouth.',
      'Use a prescribed inhaler if you have one for asthma.',
      'Open a window or move to fresh air if the environment feels stuffy.',
    ],
    whenToSeeDoctor: [
      'Shortness of breath that is new, persistent, or gradually worsening.',
      'Breathlessness with mild exertion that did not previously cause it.',
      'Wheezing that does not fully improve with usual medications.',
    ],
    emergencySigns: [
      'Severe shortness of breath at rest or inability to speak full sentences.',
      'Blue or grey lips, face, or fingertips.',
      'Breathing difficulty with chest pain or fainting.',
      'Sudden onset of severe breathlessness.',
      'Breathing difficulty after a severe allergic reaction (swelling, hives).',
    ],
    baseTriage: 3,
  },
  {
    keywords: ['rash', 'skin', 'itch', 'itching', 'hives', 'red spots', 'skin irritation', 'eczema'],
    possibleCauses: [
      { name: 'Contact dermatitis', description: 'Skin inflammation from contact with an irritant or allergen — soap, plants, cosmetics, or metals.' },
      { name: 'Allergic reaction', description: 'Allergies can produce hives (raised, itchy welts) over part or all of the body.' },
      { name: 'Viral rash', description: 'Many viral infections, especially in children, produce a rash along with mild fever.' },
      { name: 'Eczema or other skin condition', description: 'Chronic skin conditions can cause dry, itchy, inflamed patches and may need ongoing care.' },
    ],
    selfCare: [
      'Avoid scratching — it can worsen irritation and cause infection.',
      'Apply a cool, damp compress to itchy areas.',
      'Use a mild, fragrance-free moisturizer on dry skin.',
      'Identify and avoid potential triggers (new products, fabrics, foods).',
      'Wear loose, soft clothing and avoid hot showers.',
    ],
    whenToSeeDoctor: [
      'A rash that spreads quickly or covers a large area.',
      'A rash that does not improve after several days of self-care.',
      'A rash with fever or joint pain.',
      'A rash that is painful, blistering, or looks infected (pus, warmth).',
    ],
    emergencySigns: [
      'Rash with swelling of the lips, tongue, or throat.',
      'Rash with difficulty breathing or swallowing.',
      'A rash that spreads very rapidly along with fever and feeling very unwell.',
      'Purple or blood-colored spots that do not fade when pressed.',
    ],
    baseTriage: 1,
  },
  {
    keywords: ['dizzy', 'dizziness', 'lightheaded', 'faint', 'fainting', 'vertigo', 'spinning'],
    possibleCauses: [
      { name: 'Dehydration or low blood sugar', description: 'Not drinking enough or skipping meals can cause lightheadedness.' },
      { name: 'Orthostatic hypotension', description: 'A drop in blood pressure when standing up quickly can cause brief dizziness.' },
      { name: 'Inner ear issue', description: 'Inner ear problems can cause vertigo — a spinning sensation, sometimes with nausea.' },
      { name: 'Other causes', description: 'Many conditions — from anemia to heart rhythm issues — can cause dizziness; a doctor can evaluate.' },
    ],
    selfCare: [
      'Sit or lie down immediately when you feel dizzy to avoid falling.',
      'Drink water and have a small snack if you have not eaten.',
      'Rise slowly from sitting or lying positions.',
      'Avoid driving or operating machinery until the dizziness passes.',
    ],
    whenToSeeDoctor: [
      'Dizziness that recurs frequently.',
      'Dizziness with hearing changes or ringing in the ears.',
      'Dizziness that does not improve with rest and hydration.',
    ],
    emergencySigns: [
      'Fainting with chest pain, shortness of breath, or irregular heartbeat.',
      'Sudden severe dizziness with difficulty speaking, weakness, or numbness.',
      'Loss of consciousness, especially after a head injury.',
      'Dizziness with a sudden severe headache.',
    ],
    baseTriage: 2,
  },
  {
    keywords: ['fatigue', 'tired', 'exhausted', 'weakness', 'no energy', 'lethargic', 'tiredness'],
    possibleCauses: [
      { name: 'Poor sleep or stress', description: 'Inadequate rest and high stress are the most common causes of everyday fatigue.' },
      { name: 'Recovery from illness', description: 'Fatigue often lingers for days or weeks after a viral infection.' },
      { name: 'Nutritional factors', description: 'Low iron, vitamin deficiencies, or poor nutrition can contribute to low energy.' },
      { name: 'Medical conditions', description: 'Many conditions — thyroid disorders, anemia, diabetes, and others — can cause persistent fatigue.' },
    ],
    selfCare: [
      'Aim for 7–9 hours of sleep on a regular schedule.',
      'Stay hydrated and eat balanced, regular meals.',
      'Engage in light physical activity — even a short walk can help.',
      'Manage stress with relaxation, breathing, or mindful breaks.',
    ],
    whenToSeeDoctor: [
      'Fatigue lasting more than 2 weeks without a clear cause.',
      'Fatigue with unintended weight loss or fever.',
      'Fatigue severe enough to limit daily activities.',
    ],
    emergencySigns: [
      'Sudden severe weakness, especially on one side of the body.',
      'Weakness with difficulty speaking or facial drooping.',
      'Weakness with chest pain or fainting.',
    ],
    baseTriage: 1,
  },
  {
    keywords: ['back pain', 'backache', 'lower back', 'spine', 'back hurt'],
    possibleCauses: [
      { name: 'Muscle strain', description: 'Overuse, heavy lifting, or awkward movement can strain back muscles.' },
      { name: 'Poor posture', description: 'Prolonged sitting or poor ergonomics can cause dull, aching back pain.' },
      { name: 'Disc or nerve issue', description: 'Pressure on spinal nerves can cause pain radiating to the leg (sciatica).' },
      { name: 'Other causes', description: 'Kidney problems, infections, and other conditions can also cause back pain.' },
    ],
    selfCare: [
      'Apply a warm or cold compress to the painful area for 15–20 minutes.',
      'Stay gently active — prolonged bed rest can worsen back pain.',
      'Avoid heavy lifting and sudden twisting movements.',
      'Maintain good posture when sitting and standing.',
      'Try gentle stretches if they do not increase the pain.',
    ],
    whenToSeeDoctor: [
      'Back pain lasting more than 2 weeks without improvement.',
      'Back pain after an injury or fall.',
      'Back pain with numbness or tingling in the legs.',
    ],
    emergencySigns: [
      'Back pain with loss of bladder or bowel control.',
      'Back pain with numbness in the groin or inner thighs.',
      'Back pain with weakness in the legs or difficulty walking.',
      'Severe back pain with high fever.',
    ],
    baseTriage: 1,
  },
  {
    keywords: ['injury', 'wound', 'cut', 'burn', 'sprain', 'fracture', 'broke', 'fell', 'fall', 'bruise'],
    possibleCauses: [
      { name: 'Soft tissue injury', description: 'Sprains, strains, and bruises from falls or sudden movements.' },
      { name: 'Wound', description: 'Cuts and abrasions that may need cleaning and protection.' },
      { name: 'Burn', description: 'Skin damage from heat, chemicals, or friction — severity varies by depth and area.' },
      { name: 'Possible fracture', description: 'A fall or impact may cause a bone injury that needs medical imaging to confirm.' },
    ],
    selfCare: [
      'Clean minor wounds with cool running water and mild soap.',
      'Apply gentle pressure with a clean cloth to stop bleeding.',
      'Cover with a sterile dressing or clean bandage.',
      'For sprains, apply a cold pack for 15–20 minutes and elevate the area.',
      'Rest the injured area and avoid putting weight on it if painful.',
    ],
    whenToSeeDoctor: [
      'A wound that is deep, gaping, or does not stop bleeding after 10 minutes of pressure.',
      'A burn larger than the size of your palm, or with blistering on the hands, face, or joints.',
      'A possible fracture — deformity, inability to move or bear weight.',
      'A wound that may need a tetanus booster.',
      'Signs of infection (redness spreading, warmth, pus, fever).',
    ],
    emergencySigns: [
      'Severe bleeding that does not stop with pressure.',
      'A large or deep burn, or any burn to the face, airway, or genitals.',
      'An open fracture (bone visible) or severe deformity.',
      'Injury with numbness, loss of color, or coldness in the limb beyond the injury.',
      'A head injury with confusion, vomiting, or loss of consciousness.',
    ],
    baseTriage: 2,
  },
  {
    keywords: ['allergic', 'allergy', 'anaphylaxis', 'swelling', 'hives', 'reaction'],
    possibleCauses: [
      { name: 'Mild allergic reaction', description: 'Localized swelling, itching, or hives from contact with an allergen.' },
      { name: 'Food or drug allergy', description: 'Reactions to foods or medications can range from mild to severe.' },
      { name: 'Insect sting', description: 'Bee or wasp stings can cause local swelling or, in sensitive people, a severe reaction.' },
      { name: 'Severe allergic reaction (anaphylaxis)', description: 'A rare, life-threatening reaction that can rapidly affect breathing and circulation.' },
    ],
    selfCare: [
      'If you know the trigger, remove or avoid it (e.g., stop eating the food, move away from the allergen).',
      'Take an antihistamine if you have one for mild reactions.',
      'Apply a cool compress to swollen or itchy areas.',
      'Stay calm and sit upright if you feel any breathing difficulty.',
    ],
    whenToSeeDoctor: [
      'A reaction that is spreading or getting worse over minutes to hours.',
      'Widespread hives or swelling, especially around the face.',
      'Any reaction that involves breathing symptoms — seek care immediately.',
    ],
    emergencySigns: [
      'Swelling of the lips, tongue, or throat.',
      'Difficulty breathing, wheezing, or a tight throat.',
      'Sudden drop in blood pressure — dizziness, fainting, pale skin.',
      'Widespread rash that appears very rapidly after exposure.',
      'A reaction that is progressing quickly — use an epinephrine auto-injector if prescribed and call emergency services.',
    ],
    baseTriage: 3,
  },
  {
    keywords: ['eye', 'vision', 'red eye', 'eye pain', 'blurry', 'blurred vision', 'pink eye', 'conjunctivitis'],
    possibleCauses: [
      { name: 'Conjunctivitis', description: 'Inflammation of the eye surface — viral, bacterial, or allergic — causing redness and discharge.' },
      { name: 'Eye strain', description: 'Prolonged screen use or poor lighting can cause tired, aching eyes and mild blurring.' },
      { name: 'Dry eye', description: 'Insufficient tear production causes grittiness, burning, and redness.' },
      { name: 'Other eye conditions', description: 'Many conditions — from corneal scratches to glaucoma — can cause eye pain or vision changes.' },
    ],
    selfCare: [
      'Do not rub the affected eye.',
      'Use preservative-free artificial tears for dryness or mild irritation.',
      'Apply a clean, warm compress to closed eyes for a few minutes.',
      'Take breaks from screens — look 20 feet away for 20 seconds every 20 minutes.',
      'Avoid wearing contact lenses until symptoms resolve.',
    ],
    whenToSeeDoctor: [
      'Eye pain that is more than mild discomfort.',
      'Redness that does not improve after a few days.',
      'Discharge that is thick, yellow, or green.',
      'Blurred vision that does not clear with blinking.',
    ],
    emergencySigns: [
      'Sudden loss of vision in one or both eyes.',
      'Severe eye pain, especially with headache and nausea.',
      'An object stuck in the eye or a chemical exposure.',
      'Sudden flashes of light, a curtain over your vision, or many new floaters.',
    ],
    baseTriage: 2,
  },
  {
    keywords: ['anxiety', 'panic', 'stress', 'depressed', 'depression', 'sad', 'mental health', 'suicidal', 'self-harm', 'hopeless'],
    possibleCauses: [
      { name: 'Stress or anxiety', description: 'Life stressors can produce persistent worry, restlessness, and physical symptoms like a racing heart.' },
      { name: 'Panic episode', description: 'Panic can cause intense fear, shortness of breath, chest tightness, and a sense of losing control.' },
      { name: 'Low mood / depression', description: 'Depression involves persistent low mood, loss of interest, fatigue, and changes in sleep or appetite.' },
    ],
    selfCare: [
      'Try slow, deep breathing — inhale for 4 counts, hold for 4, exhale for 6.',
      'Reach out to someone you trust — talking can reduce the sense of overwhelm.',
      'Engage in small, manageable activities — a short walk, a meal, a shower.',
      'Reduce caffeine and alcohol, and keep a regular sleep routine.',
    ],
    whenToSeeDoctor: [
      'Persistent low mood or anxiety interfering with daily life for more than 2 weeks.',
      'Panic episodes recurring or causing avoidance of daily activities.',
      'Difficulty sleeping, eating, or functioning at work or home.',
    ],
    emergencySigns: [
      'Thoughts of harming yourself or ending your life.',
      'Feeling hopeless and unable to see a way forward.',
      'A plan or intent to act on thoughts of self-harm.',
      'Severe agitation or feeling completely out of control.',
    ],
    baseTriage: 2,
  },
];

const GENERIC_FALLBACK: KnowledgeEntry = {
  keywords: [],
  possibleCauses: [
    { name: 'Several possible conditions', description: 'Your symptoms can occur with a range of common conditions. A healthcare professional can help determine the exact cause.' },
  ],
  selfCare: [
    'Rest and monitor your symptoms.',
    'Stay hydrated and eat light, nourishing meals.',
    'Note any new or worsening symptoms.',
  ],
  whenToSeeDoctor: [
    'Symptoms that persist, worsen, or significantly affect your daily activities.',
    'Any new symptom that concerns you or does not have a clear cause.',
  ],
  emergencySigns: [
    'Severe or rapidly worsening symptoms.',
    'Difficulty breathing, severe chest pain, or loss of consciousness.',
    'Sudden weakness, confusion, or severe bleeding.',
  ],
  baseTriage: 2,
};

const EMERGENCY_TERMS = [
  'chest pain', 'cannot breathe', "can't breathe", 'not breathing', 'unconscious', 'passed out', 'fainted',
  'severe bleeding', 'bleeding heavily', 'seizure', 'convulsion', 'stroke', 'paralysis', 'sudden weakness',
  'anaphylaxis', 'throat swelling', 'tongue swelling', 'suicidal', 'kill myself', 'end my life', 'self-harm',
  'overdose', 'blue lips', 'blue face', 'worst headache', 'thunderclap', 'not responding',
];

const SEVERE_TERMS = ['severe', 'unbearable', 'extreme', 'worst', 'terrible', 'intense', 'crushing'];

function matchKnowledge(symptomText: string): KnowledgeEntry {
  const text = symptomText.toLowerCase();
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (text.includes(kw)) {
        score += kw.length > 6 ? 3 : 2;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }
  return bestMatch ?? GENERIC_FALLBACK;
}

function hasEmergencyTerms(text: string): boolean {
  const lower = text.toLowerCase();
  return EMERGENCY_TERMS.some((t) => lower.includes(t));
}

function hasSevereTerms(text: string): boolean {
  const lower = text.toLowerCase();
  return SEVERE_TERMS.some((t) => lower.includes(t));
}

function getPersonalizationNotes(input: SymptomInput): string[] {
  const notes: string[] = [];
  if (input.age !== undefined) {
    if (input.age < 5) notes.push('Because the person is very young, even mild symptoms should be checked by a doctor sooner than for an adult.');
    else if (input.age < 12) notes.push('For children, a lower threshold for seeking medical care is recommended.');
    else if (input.age >= 65) notes.push('For older adults, a lower threshold for seeking medical care is recommended, as symptoms can progress more quickly.');
  }
  if (input.pregnancy) notes.push('During pregnancy, any unusual symptom warrants a lower threshold for contacting your doctor.');
  if (input.existingConditions) {
    const lc = input.existingConditions.toLowerCase();
    if (lc.includes('diabetes') || lc.includes('heart') || lc.includes('lung') || lc.includes('asthma') || lc.includes('immuno') || lc.includes('kidney') || lc.includes('liver')) {
      notes.push('Because you have an existing medical condition, a lower threshold for seeking professional care is recommended.');
    }
  }
  return notes;
}

export function generateGuidance(input: SymptomInput): {
  understanding: string;
  possibleCauses: PossibleCause[];
  selfCare: string[];
  whenToSeeDoctor: string[];
  emergencySigns: string[];
  triageLevel: TriageLevel;
  triageReason: string;
  personalizationNotes: string[];
} {
  const entry = matchKnowledge(input.symptoms);
  const personalizationNotes = getPersonalizationNotes(input);
  const symptomText = input.symptoms.toLowerCase();

  const isEmergency = hasEmergencyTerms(symptomText);
  const isSevere = hasSevereTerms(symptomText) || input.severity === 'severe';
  const vulnerablePerson =
    (input.age !== undefined && (input.age < 12 || input.age >= 65)) ||
    input.pregnancy ||
    (input.existingConditions &&
      ['diabetes', 'heart', 'lung', 'asthma', 'immuno', 'kidney', 'liver'].some((c) =>
        input.existingConditions!.toLowerCase().includes(c)
      ));

  let triageLevel: TriageLevel = entry.baseTriage;
  let triageReason = '';

  if (isEmergency) {
    triageLevel = 4;
    triageReason = 'Your description includes symptoms that may indicate a medical emergency. Please seek urgent medical attention now.';
  } else if (isSevere) {
    triageLevel = 3;
    triageReason = 'Your symptoms are described as severe. Prompt medical evaluation is recommended rather than relying on self-care alone.';
  } else if (vulnerablePerson && triageLevel < 3) {
    triageLevel = Math.max(2, triageLevel) as TriageLevel;
    triageReason = 'Because of your age or existing health condition, a lower threshold for professional medical evaluation is recommended.';
  } else if (entry.baseTriage === 1) {
    triageReason = 'Your symptoms currently appear mild with no obvious warning signs. Self-care and monitoring are appropriate, but stay alert for any changes.';
  } else if (entry.baseTriage === 2) {
    triageReason = 'Your symptoms warrant a medical consultation to identify the cause and rule out anything serious.';
  } else if (entry.baseTriage === 3) {
    triageReason = 'Your symptoms warrant prompt medical evaluation — please arrange same-day care.';
  } else {
    triageReason = 'These symptoms may require urgent medical attention.';
  }

  const durationPart = input.duration ? ` for ${input.duration}` : '';
  const severityPart = input.severity ? ` described as ${input.severity}` : '';
  const understanding = `You have reported ${input.symptoms}${durationPart}${severityPart}. The information below is general guidance — a healthcare professional can determine the exact cause.`;

  return {
    understanding,
    possibleCauses: entry.possibleCauses,
    selfCare: entry.selfCare,
    whenToSeeDoctor: entry.whenToSeeDoctor,
    emergencySigns: entry.emergencySigns,
    triageLevel,
    triageReason,
    personalizationNotes,
  };
}
