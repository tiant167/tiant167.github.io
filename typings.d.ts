declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.md';

interface Article {
  id: string;
  title: string;
  createdAt: string;
  content: string;
}
