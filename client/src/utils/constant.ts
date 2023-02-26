export const URL = 'https://api.m-prus.uk'

export enum Language {
    ENGLISH = 'en-GB',
    POLISH = 'pl',
}

// eslint-disable-next-line
export const json: { 'en-GB': any, 'pl': any } = { 'en-GB': {
    "sd.input.search.placeholder": "Search by name",
    "today": "Today",
    "from": "From",
    "until": "Until",
  }, 'pl': {
    "sd.input.search.placeholder": "Wpisz nazwę",
    "today": "Dzisiaj",
    "from": "Od",
    "until": "Do",
  },
  
}
type SkillsTypes = {
  languages: string[],
  frameworks: string[],
  testing: string[],
  databases: string[],
  services: string[],
}

export const skills: SkillsTypes = {
  languages: [
    'HTML 5', 'CSS 3', 'SCSS', 'JavaScript', 'TypeScript', 'Python', 'PHP', 'SQL'
  ],
  frameworks: [
    'React', 'Angular', 'Redux', 'NestJs', 'Express', 'Django', 'Laravel', 'GIT'
  ],
  testing: [
    'Jest', 'Enzyme', 'Mocha', 'Chai'
  ],
  databases: [
    'MySQL', 'PostgreSQL', 'MongoDB'
  ],
  services: [
    'Digitalocean', 'Heroku', 'Netlify', 'SocketIO', 'Google Drive API', 'ScreenshotMachine API', 'Amazon s3 Storage'
  ]
}