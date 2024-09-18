// Using interface to put json response from database into the interface's type of array

export interface CartItem {
    business_name: string,
    product_id: number;
    quantity: number;
    price: number;
    unit_name: string,
    total: number,
    available_stock: number,
    unit_id: string
  }

