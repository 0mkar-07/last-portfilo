import academicDeadlineImg from '../assets/academic-deadline.png'
import lilgitImg from '../assets/lilgit.png'

export const archivesHeader = {
  moduleIndex: '04',
  tag: 'RECOVERED_RECORDS',
  title: 'ARCHIVES // RECOVERED RECORDS',
  subtitle: 'Salvaged software systems and engineering artifacts recovered from local terminals.',
}

export const projects = [
  {
    id: 'academic-deadline',
    recordNumber: 'RECORD_001',
    name: 'Academic Deadline CLI',
    status: 'OPERATIONAL',
    summary:
      'A command-line tool for managing and tracking academic deadlines, helping students organize assignments, exams, and important academic tasks.',
    description:
      'Academic Deadline CLI is a terminal-native productivity engine designed for students navigating demanding academic coursework. Built in modern C++ with CLI11, it eliminates context-switching by enabling rapid deadline logging, tag-based filtering, and countdown calculations directly from the shell. The tool persists tasks with atomic local storage and computes urgency tiers to ensure critical assignments are never overlooked.',
    tech: ['C++', 'CLI11', 'Git'],
    image: academicDeadlineImg,
    repoUrl: 'https://github.com/0mkar-07/Academic-Deadline',
    liveUrl: null,
  },
  {
    id: 'lilgit',
    recordNumber: 'RECORD_002',
    name: 'LilGit',
    status: 'OPERATIONAL',
    summary:
      'A lightweight Git-inspired version control system built to understand and implement core version-control concepts from the ground up.',
    description:
      'LilGit is a systems-level version control engine engineered to demystify Git internals, content-addressable storage, and graph history. Implemented in C++ without external VCS dependencies, it builds core primitives including cryptographic blob generation, tree nodes, commit ancestry tracking, and a staging index. The project demonstrates low-level filesystem traversal, SHA integrity hashing, and terminal command execution from first principles.',
    tech: ['C++', 'Git', 'CLI'],
    image: lilgitImg,
    repoUrl: 'https://github.com/0mkar-07/DaGit',
    liveUrl: null,
  },
]
