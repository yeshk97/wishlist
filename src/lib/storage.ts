import { WishlistItem } from './types';

export const storage: WishlistItem[] = [];

export function getItems(): WishlistItem[] {
  return [...storage].sort((a, b) => b.createdAt - a.createdAt);
}

export function addItem(item: WishlistItem): WishlistItem {
  storage.push(item);
  return item;
}

export function deleteItem(id: string): boolean {
  const index = storage.findIndex((item) => item.id === id);
  if (index === -1) return false;
  storage.splice(index, 1);
  return true;
}