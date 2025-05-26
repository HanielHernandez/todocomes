export type Restaurant = {
    id: number
    name: string
    address: string,
    phoneNumber: string,
}   

export type Category = {
    id: number
    name: string
    description: string
    imageUrl: string
    createdAt: string
    deletedAt: string | null
}

export type CreateCategoryDto =  Pick<Category, 'name' | 'description' | 'imageUrl'>;