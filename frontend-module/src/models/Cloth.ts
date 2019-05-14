export interface Cloth {
    _id?: number,
    type: ClothType,
    size: Size,
    price: number,
    count: number,
}

export enum ClothType {
    Shirt = "shirt",
    Jeans = "jeans",
    T_shirt = "t_shirt",
}

export enum Size {
    xs = 0,
    s = 1,
    m = 2,
    l = 3,
    xl = 4,
}