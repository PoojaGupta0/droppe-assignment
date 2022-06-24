export type Product = {
    category?: string;
    description: string;
    id?: number;
    image?: string;
    price: string;
    rating?: { rate: number; count: number };
    title: string;
    isFavorite?: boolean
}
