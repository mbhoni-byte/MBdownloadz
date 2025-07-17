import { 
  downloadRequests, 
  users,
  type User, 
  type InsertUser,
  type DownloadRequest,
  type InsertDownloadRequest,
  type VideoMetadata
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createDownloadRequest(request: InsertDownloadRequest): Promise<DownloadRequest>;
  getDownloadRequest(id: number): Promise<DownloadRequest | undefined>;
  updateDownloadRequest(id: number, updates: Partial<DownloadRequest>): Promise<DownloadRequest | undefined>;
  getDownloadRequestByUrl(url: string): Promise<DownloadRequest | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private downloadRequests: Map<number, DownloadRequest>;
  private currentUserId: number;
  private currentDownloadId: number;

  constructor() {
    this.users = new Map();
    this.downloadRequests = new Map();
    this.currentUserId = 1;
    this.currentDownloadId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createDownloadRequest(request: InsertDownloadRequest): Promise<DownloadRequest> {
    const id = this.currentDownloadId++;
    const now = new Date();
    const downloadRequest: DownloadRequest = {
      id,
      ...request,
      selectedQuality: request.selectedQuality || null,
      status: "pending",
      videoInfo: null,
      downloadUrl: null,
      createdAt: now,
      updatedAt: now,
    };
    this.downloadRequests.set(id, downloadRequest);
    return downloadRequest;
  }

  async getDownloadRequest(id: number): Promise<DownloadRequest | undefined> {
    return this.downloadRequests.get(id);
  }

  async updateDownloadRequest(id: number, updates: Partial<DownloadRequest>): Promise<DownloadRequest | undefined> {
    const existing = this.downloadRequests.get(id);
    if (!existing) return undefined;

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.downloadRequests.set(id, updated);
    return updated;
  }

  async getDownloadRequestByUrl(url: string): Promise<DownloadRequest | undefined> {
    return Array.from(this.downloadRequests.values()).find(
      (request) => request.url === url
    );
  }
}

export const storage = new MemStorage();
