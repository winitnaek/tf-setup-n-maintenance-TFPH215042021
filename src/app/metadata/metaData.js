import { companies, customTaxCodes, customFormulas, worksites } from "./_metaData";

// customFormulas
customFormulas.griddef.columns = [...customTaxCodes.griddef.columns];
customFormulas.griddef.dataFields = [...customTaxCodes.griddef.dataFields];

// worksites
worksites.griddef.dataFields = [...companies.griddef.dataFields];

export * from "./_metaData";
