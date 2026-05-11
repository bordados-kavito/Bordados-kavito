/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  formats: string[];
  dimensions?: string;
  stitchCount?: number;
  isPremium?: boolean;
  isFree?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  imageUrl?: string;
  videoUrl?: string;
  createdAt: number;
}

export interface CustomRequest {
  id: string;
  userId: string;
  image: string;
  size: string;
  format: string;
  instructions: string;
  status: 'pending' | 'processing' | 'completed';
  createdAt: number;
}

export interface Subscriber {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subscribedAt: number;
}
