export const arsenalHeader = {
  moduleIndex: '03',
  tag: 'EQUIPPED_TOOLS',
  title: '[03] ARSENAL // EQUIPPED TOOLS',
  subtitle: 'Technical capabilities, system tooling, and active engineering proficiencies.',
}

export const skillCategories = [
  {
    id: 'languages',
    name: 'LANGUAGES',
    isLearning: false,
    skills: [
      { name: 'C++', level: 4, icon: 'CPP' },
      { name: 'Python', level: 4, icon: 'PY' },
    ],
  },
  {
    id: 'tools',
    name: 'TOOLS',
    isLearning: false,
    skills: [
      { name: 'Git', level: 4, icon: 'GIT' },
      { name: 'GitHub', level: 4, icon: 'GH' },
      { name: 'Linux', level: 3, icon: 'LNX' },
      { name: 'VS Code', level: 4, icon: 'VSC' },
    ],
  },
  {
    id: 'concepts',
    name: 'CONCEPTS',
    isLearning: false,
    skills: [
      { name: 'DSA', level: 4, icon: 'DSA' },
      { name: 'OOP', level: 4, icon: 'OOP' },
    ],
  },
  {
    id: 'learning',
    name: 'LEARNING (IN PROGRESS)',
    isLearning: true,
    skills: [
      { name: 'PyTorch', icon: 'TORCH' },
      { name: 'React', icon: 'RCT' },
    ],
  },
]
