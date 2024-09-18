// Using interface to put json response from database into the interface's type of array

/**
 * product interface
 */

export interface Product {
    product_id: number,
    type_name: string,
    business_name: string,
    unit_name: string,
    avg_rating: number,
    country_id: string,
    country_name: string,
    province_name: string,
    price: number,
    // attribute: string[] // aroma:10, color: 5 (concat)
}