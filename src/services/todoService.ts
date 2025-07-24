/**
 * API service for managing Todo data from jsonplaceholder
 */
import axios from 'axios';
import type { Todo, User } from '../types';
import { logger } from '../utils/logger';
import { perf } from '../utils/performance';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export class TodoService {
  /**
   * Fetch all todos from the API
   * @returns Promise<Todo[]> Array of todos
   */
  static async getAllTodos(): Promise<Todo[]> {
    try {
      const response = await perf.measureAsync(
        'API: Fetch Todos',
        api.get<Todo[]>('/todos')
      );
      return response.data;
    } catch (error) {
      logger.error('Error fetching todos:', error);
      throw new Error('Failed to fetch todos');
    }
  }

  /**
   * Fetch all users to populate the UserID dropdown
   * @returns Promise<User[]> Array of users
   */
  static async getAllUsers(): Promise<User[]> {
    try {
      const response = await perf.measureAsync(
        'API: Fetch Users',
        api.get<User[]>('/users')
      );
      return response.data;
    } catch (error) {
      logger.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  /**
   * Create a new todo (simulated - jsonplaceholder doesn't persist)
   * @param todo Partial todo object (without id)
   * @returns Promise<Todo> Created todo with generated id
   */
  static async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    try {
      const response = await api.post<Todo>('/todos', todo);
      return response.data;
    } catch (error) {
      logger.error('Error creating todo:', error);
      throw new Error('Failed to create todo');
    }
  }

  /**
   * Update an existing todo (simulated - jsonplaceholder doesn't persist)
   * @param id Todo ID to update
   * @param todo Updated todo data
   * @returns Promise<Todo> Updated todo
   */
  static async updateTodo(id: number, todo: Partial<Todo>): Promise<Todo> {
    try {
      const response = await api.patch<Todo>(`/todos/${id}`, todo);
      return response.data;
    } catch (error) {
      logger.error('Error updating todo:', error);
      throw new Error('Failed to update todo');
    }
  }

  /**
   * Delete a todo (simulated - jsonplaceholder doesn't persist)
   * @param id Todo ID to delete
   * @returns Promise<void>
   */
  static async deleteTodo(id: number): Promise<void> {
    try {
      await api.delete(`/todos/${id}`);
    } catch (error) {
      logger.error('Error deleting todo:', error);
      throw new Error('Failed to delete todo');
    }
  }
}