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
      return data.user as User;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  },
};
