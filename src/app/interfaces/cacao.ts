export interface Cacao {
  avg_rating: string,
  business_name: string,
  country_id: string,
  country_name: string,
  harvest_date: Date,
  mongodbData: {
    name: string,
    organolepticEvaluation: {
      astringency: {
        clones: number,
        criollo: number,
        hybrid: number, 
        national: number
      },
      bitterness: {
        clones: number,
        criollo: number,
        hybrid: number, 
        national: number
      },
      cocoa: {
        clones: number,
        criollo: number,
        hybrid: number, 
        national: number
      },
      dryFruit: {
        clones: number,
        criollo: number,
        hybrid: number, 
        national: number
      },
      flavorInMouth: {
        clones: number,
        criollo: number,
        hybrid: number, 
        national: number
      },
      flowerly: {
        clones: number,
        criollo: number,
        hybrid: number, 
        national: number
      },
      freshFruit: {
        clones: number,
        criollo: number,
        hybrid: number, 
        national: number
      }
      fuel: {
        clones: number,
        criollo: number,
        hybrid: number, 
        national: number
      },
      mold: {
        clones: number,
        criollo: number,
        hybrid: number, 
        national: number
      },
      other: {
        clones: number,
        criollo: number,
        hybrid: number, 
        national: number
      },
      overFermented: {
        clones: number,
        criollo: number,
        hybrid: number, 
        national: number
      },
      pleasantAroma: {
        clones: number,
        criollo: number,
        hybrid: number, 
        national: number
      },
      sweet: {
        clones: number,
        criollo: number,
        hybrid: number, 
        national: number
      }
    },
    physicalEvaluation: {
      aglomerades: number,
      fuel: number,
      mediumFermented: number,
      moho: number,
      mold: number,
      overFermented: number,
      remarks: string,
      slate: number,
      smoked: number,
      violets: number,
      vulnerated: number,
      weightX100: number,
      wellFermented: number
    },
    typology: {
      criollo: number,
      national: number,
      nationalClones: number,
      naturalHybrid: number
    },
    _id: string
  },
  object_id: string,
  phone_no: string,
  price: number,
  product_id: number,
  province_name: string,
  supplier_id: string,
  type_name: string,
  unit_name: string
}