export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface MediaFormats {
  large: ImageFormat;
  small: ImageFormat;
  medium: ImageFormat;
  thumbnail: ImageFormat;
}

export interface Media {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: MediaFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  documentId: string;
  publishedAt: string;
}

export interface Store {
  id: number;
  title: string;
  Description: string;
  slug: string;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  STRIPE_CUSTOMER_ID: string;
  Cover: Media;
  Logo: Media;
  Favicon: Media;
  URLS: {
    id: number;
    Label: string;
    URL: string;
  }[],
  SEO: SEO;
}


export interface AlbumTrack {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  description: string;
  content: ContentBlock[];
  media: Media[];
  urls?: {
    id: number;
    Label: string;
    URL: string;
  }[];
  SEO?: SEO;
}

export interface Album {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  content: ContentBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  cover: Media;
  tracks: AlbumTrack[];
  store?: Store;
  displayType: 'grid' | 'list' | 'carousel';
  SEO?: SEO;
}

export interface AlbumResponse {
  data: Album[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      pageCount: number;
    };
  };
}


interface BlockText {
  text: string;
  type?: 'text';
  bold?: boolean;
}

interface BlockLink {
  type: 'link';
  url: string;
  children: BlockText[];
}

type BlockChild = BlockText | BlockLink;

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'list' | 'list-item' | 'image' | 'link' | 'quote' | 'code';
  level?: number;
  image?: {
    url: string;
    alternativeText?: string;
    caption?: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
    width: number;
    height: number;
    name: string;
  },
  children: Array<{
    type: string;
    code?: boolean;
    text?: string;
    bold?: boolean;
    url?: string;
    children?: Array<{ text: string; type: string; }>;
  }>;
}

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null | string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface ImageData {
  id?: number;
  name?: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: {
    large?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    thumbnail?: ImageFormat;
  };
  hash?: string;
  ext?: string;
  mime?: string;
  size?: number;
  url: string;
  previewUrl?: string | null;
  provider?: string;
  provider_metadata?: any | null;
  createdAt?: string;
  updatedAt?: string;
  documentId?: string;
  publishedAt?: string;
}

interface SEO {
  id?: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  metaUrl?: string;
  metaAuthor?: string;
  excludeFromSearch?: boolean;
  metaDate?: string;
  socialImage?: ImageData;
}

export interface Page {
  id: number;
  Title: string;
  Content: ContentBlock[];
  Active: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  menuOrder: number | null;
  documentId: string;
  store?: Store;
  SEO?: SEO;
  albums?: Album[];
}

export interface Event {
  id: number;
  documentId: string;
  Name: string;
  usd_price: number;
  startDate: string;
  Slides: Slide[];
  endDate: string;
  Description: string;
  maxCapacity: number | null;
  amountSold: number | null;
  active: boolean;
  STRIPE_PRODUCT_ID: string | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  SEO?: SEO;
  Tag?: Tag[];
  stores?: Store[];
  Thumbnail?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
}

export interface PageResponse {
  data: Page[];
}

export type Tag = {
  id: number;
  Label: string;
  Color?: string;
}

export interface Article {
  id: number;
  slug: string;
  Title: string;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Tags?: Tag[];
  Content: any[];
  SEO: SEO,
  cover: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

interface Price {
  id: number;
  Price: number;
  Currency: string;
  STRIPE_ID: string;
  Description: string;
  Name: string;
}

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null | string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface ImageFormats {
  large?: ImageFormat;
  small?: ImageFormat;
  medium?: ImageFormat;
  thumbnail?: ImageFormat;
}

interface Slide {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  documentId: string;
  publishedAt: string;
}


export interface Product {
  id: number;
  Name: string;
  usd_price: number | null;
  Description: string | null;
  quantity: number | null;
  active: boolean | null;
  attributes: any | null;
  SKU: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  slug: string;
  documentId: string;
  amountSold: number | null;
  Slides: Slide[];
  SEO?: SEO;
  PRICES?: Price[];
  Thumbnail?: ImageFormat;
  stores?: Store[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'coach' | 'patient';
  avatar?: string;
  createdAt: Date;
}

export interface Coach extends User {
  role: 'coach';
  specialization: string;
  bio: string;
  patients: Patient[];
  totalPatients: number;
  totalAppointments: number;
}

export interface Patient extends User {
  role: 'patient';
  coachId: string;
  dateOfBirth: Date;
  phone: string;
  emergencyContact: string;
  healthGoals: string[];
  medicalHistory: string;
  lastVisit?: Date;
}

export interface Appointment {
  id: string;
  coachId: string;
  patientId: string;
  patientName: string;
  date: Date;
  duration: number;
  type: 'initial' | 'follow-up' | 'group' | 'emergency';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  videoRoomId?: string;
}

export interface VideoCall {
  id: string;
  appointmentId: string;
  participants: User[];
  status: 'waiting' | 'active' | 'ended';
  startedAt?: Date;
  endedAt?: Date;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  displayName?: string;
  bio?: string;
  avatar?: { url: string };
}
