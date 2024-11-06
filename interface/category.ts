export interface Category {
  id: number;
  name: string;
  parentCategoryId?: number;
  description?: string;
  genderId: number;
  ageGroupId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
