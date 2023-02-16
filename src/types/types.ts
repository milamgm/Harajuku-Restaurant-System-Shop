export interface IOnCookingItemsFetch {
  id: number;
  name: string;
  quantity: number;
}
export interface IItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}
export interface IProduct {
  product_category: string;
  product_description: string;
  product_id: number;
  product_img: string;
  product_isAvailabre: boolean;
  product_name: string;
  product_price: number;
}
export interface ICarouselProduct {
  product_description: string;
  product_img: string;
  product_name: string;
}

export type TpreviewItem = {
  previewItem : boolean,
  setPreviewItem : React.Dispatch<React.SetStateAction<boolean>>,
  product_id : number ,
  product_name : string,
  product_price : number,
  product_img : string,
  product_description : string ,
  quantity : number | null,
}