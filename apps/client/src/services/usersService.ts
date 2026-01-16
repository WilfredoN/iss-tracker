import { API_URL } from '.';
import type { User } from '../types/users';

export const usersService = {
  async getUser(): Promise<User | null> {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      // If the API returns an array, pick the first user
      if (Array.isArray(data.user)) {
        return data.user[0] ?? null;
      }
      return data.user as User;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  },
};
