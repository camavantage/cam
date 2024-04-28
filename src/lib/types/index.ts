export type AppType = {
  id: string;
  title: string;
  description: string;
  language: LanguageType;
  status: AppStatusType;
  createdAt: Date;
  updatedAt: Date;
};

export type AppStatusType = "online" | "offline" | "maintenance";
export type LanguageType = "fr" | "en";

export type TagType = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  published: boolean;
  verified: boolean;
  articles?: ArticleTagType[];
  createdAt: Date;
  updatedAt: Date;
};
export type UserType = {
  id: string;
  username: string | null;
  name: string | null;
  bio: string | null;
  email: string;
  phone: string | null;
  image: string | null;
  role: RoleType;
  verified: boolean;
  blocked: boolean;
  articles?: ArticleType[];
  createdAt: Date;
  updatedAt: Date;
};
export type RoleType = "subscriber" | "author" | "editor" | "admin" | "owner";

export type ArticleType = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  markdown: string;
  imageUrl: string;
  authorId: string |null;
  author?: UserType;
  year: number;
  published: boolean;
  commentable: boolean;
  verified: boolean;
  blocked: boolean;
  tags?: ArticleTagType[];
  createdAt: Date;
  updatedAt: Date;
};

export type ArticleTagType = {
  articleId: string;
  article?: ArticleType;
  tagId: string;
  tag?: TagType;
};
