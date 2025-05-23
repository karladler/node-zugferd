import z from "zod";
import { dateTimeStringFormatter } from "../../utils/helper";
import { type Schema } from "../../types/schema";
import { UNTDID_1001 } from "../../codelists/untdid/1001.gen";
import { UNTDID_5305 } from "../../codelists/untdid/5305.gen";
import { VATEX } from "../../codelists/vatex.gen";
import { CURRENCY_CODES } from "../../codelists/currency-codes.gen";
import { ISO_6523 } from "../../codelists/iso/6523.gen";
import { ISO_3166 } from "../../codelists/iso/3166";
import { UNTDID_2475 } from "../../codelists/untdid/2475";

export const minimumSchema = {
	/**
	 * Business process type
	 *
	 * Identifies the business process context in which the transaction appears, to enable the Buyer to process the Invoice in an appropriate way.
	 *
	 * To be specifid by the Buyer.
	 *
	 * CHORUSPRO: this data makes it possible to inform the "cadre de facturation" (billing framework, which could be invoice from agent, co-contractor, subcontractor, invoicing part of a public works contract, etc.). The codes to be used are defined in the CHORUSPRO specifications: A1 (invoice deposit), A2 (prepaid invoice deposit), ... By default (in the absence of this field), the case A1 is applied.
	 */
	businessProcessType: {
		key: "BT-23",
		type: "string",
		required: false,
		description: `**Business process type**

Identifies the business process context in which the transaction appears, to enable the Buyer to process the Invoice in an appropriate way.

To be specifid by the Buyer.

CHORUSPRO: this data makes it possible to inform the "cadre de facturation" (billing framework, which could be invoice from agent, co-contractor, subcontractor, invoicing part of a public works contract, etc.). The codes to be used are defined in the CHORUSPRO specifications: A1 (invoice deposit), A2 (prepaid invoice deposit), ... By default (in the absence of this field), the case A1 is applied.`,
		xpath:
			"/rsm:CrossIndustryInvoice/rsm:ExchangedDocumentContext/ram:BusinessProcessSpecifiedDocumentContextParameter/ram:ID",
	},
	/**
	 * Specification Identifier
	 *
	 * A specification identifier containing the entire set of rules regarding semantic content, cardinalities, and business rules to which the data contained in the invoice conforms.
	 *
	 * Note: This declares conformity to the respective document.
	 *
	 * For the reference to the EU standard, "urn:cen.eu:en16931:2017" must be specified.
	 *
	 * Invoices that are compliant with CIUS XRechnung should specify "urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0" here.
	 *
	 * Invoices that comply with the XRechnung extension should specify "urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0#conformant#urn:xeinkauf.de:kosit:extension:xrechnung_3.0" here. No schema is required.
	 */
	specificationIdentifier: {
		key: "BT-24",
		type: "string",
		required: false,
		defaultValue: "urn:factur-x.eu:1p0:minimum",
		description: `**Specification Identifier**
A specification identifier containing the entire set of rules regarding semantic content, cardinalities, and business rules to which the data contained in the invoice conforms.

Note: This declares conformity to the respective document. 

For the reference to the EU standard, "urn:cen.eu:en16931:2017" must be specified. 

Invoices that are compliant with CIUS XRechnung should specify "urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0" here. 

Invoices that comply with the XRechnung extension should specify "urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0#conformant#urn:xeinkauf.de:kosit:extension:xrechnung_3.0" here. No schema is required.`,
		xpath:
			"/rsm:CrossIndustryInvoice/rsm:ExchangedDocumentContext/ram:GuidelineSpecifiedDocumentContextParameter/ram:ID",
	},
	/**
	 * Invoice number
	 *
	 * A unique identification of the Invoice.
	 *
	 * The sequential number required in Article 226(2) of the directive 2006/112/EC [2], to uniquely identify the Invoice within the business context, time-frame, operating systems and records of the Seller . It may be based on one or more series of numbers, which may include alphanumeric characters. No identification scheme is to be used.
	 *
	 * CHORUSPRO: the invoice number is limited to 20 characters
	 *
	 * BR-2: An Invoice shall have an Invoice number (BT-1).
	 */
	number: {
		key: "BT-1",
		type: "string",
		description: `**Invoice number**

A unique identification of the Invoice.

The sequential number required in Article 226(2) of the directive 2006/112/EC [2], to uniquely identify the Invoice within the business context, time-frame, operating systems and records of the Seller . It may be based on one or more series of numbers, which may include alphanumeric characters. No identification scheme is to be used.

CHORUSPRO: the invoice number is limited to 20 characters

BR-2: An Invoice shall have an Invoice number (BT-1).`,
		xpath: "/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:ID",
	},
	/**
	 * Invoice type code
	 *
	 * A code specifying the functional type of the Invoice.
	 *
	 * Commercial invoices and credit notes are defined according the entries in UNTDID 1001 [6]. Other  entries of UNTDID 1001 [6] with specific invoices or credit notes may be used if applicable.
	 *
	 * The types of documents used are:
	 * - 380: Commercial Invoice
	 * - 381: Credit note
	 * - 384: Corrected invoice
	 * - 389: Self-billied invoice (created by the buyer on behalf of the supplier)
	 * - 261: Self billed credit note (not accepted by CHORUSPRO)
	 * - 386: Prepayment invoice
	 * - 751: Invoice information for accounting purposes (not accepted by CHORUSPRO)
	 *
	 * BR-4: An Invoice shall have an Invoice type code (BT-3).
	 */
	typeCode: {
		key: "BT-3",
		type: UNTDID_1001.map(({ code }) => code),
		description: `**Invoice type code**

A code specifying the functional type of the Invoice.

Commercial invoices and credit notes are defined according the entries in UNTDID 1001 [6]. Other  entries of UNTDID 1001 [6] with specific invoices or credit notes may be used if applicable.

The types of documents used are:
- 380: Commercial Invoice
- 381: Credit note
- 384: Corrected invoice
- 389: Self-billied invoice (created by the buyer on behalf of the supplier)
- 261: Self billed credit note (not accepted by CHORUSPRO)
- 386: Prepayment invoice
- 751: Invoice information for accounting purposes (not accepted by CHORUSPRO)

BR-4: An Invoice shall have an Invoice type code (BT-3).`,
		xpath: "/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:TypeCode",
	},
	/**
	 * Invoice issue date
	 *
	 * The date when the Invoice was issued.
	 *
	 * CHORUSPRO: the issue date must be before or equal to the deposit date.
	 */
	issueDate: {
		key: "BT-2",
		type: "date",
		description: `**Invoice issue date**

The date when the Invoice was issued.

CHORUSPRO: the issue date must be before or equal to the deposit date.`,
		xpath:
			"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IssueDateTime/udt:DateTimeString",
		additionalXml: {
			"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IssueDateTime/udt:DateTimeString/@format":
				"102",
		},
		transform: {
			input: dateTimeStringFormatter,
		},
	},

	/**
	 * Grouping of information about the business transaction
	 */
	transaction: {
		key: "BG-25-00",
		type: "object",
		description: "Grouping of information about the business transaction",
		required: false,
		shape: {
			/**
			 * Grouping of contract information
			 */
			tradeAgreement: {
				key: "BT-10-00",
				type: "object",
				description: "Grouping of contract information",
				required: false,
				shape: {
					/**
					 * Buyer reference
					 *
					 * An identifier assigned by the Buyer used for internal routing purposes.
					 *
					 * The identifier is defined by the Buyer (e.g. contact ID, department, office id, project code), but provided by the Seller in the Invoice.
					 *
					 * CHORUS PRO: for the public sector, it is the "Service Exécutant". It is mandatory for some buyers. It must belong to the Chorus Pro repository. It is limited to 100 characters.
					 */
					buyerReference: {
						key: "BT-10",
						type: "string",
						description: `**Buyer reference**

An identifier assigned by the Buyer used for internal routing purposes.

The identifier is defined by the Buyer (e.g. contact ID, department, office id, project code), but provided by the Seller in the Invoice.

CHORUS PRO: for the public sector, it is the "Service Exécutant". It is mandatory for some buyers. It must belong to the Chorus Pro repository. It is limited to 100 characters.`,
						required: false,
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerReference",
					},
					/**
					 * A group of business terms providing information about the Seller.
					 */
					seller: {
						key: "BG-4",
						type: "object",
						description:
							"A group of business terms providing information about the Seller.",
						shape: {
							/**
							 * Seller name
							 *
							 * The full formal name by which the Seller is registered in the national registry of legal entities or as a Taxable person or otherwise trades as a person or persons.
							 */
							name: {
								key: "BT-27",
								type: "string",
								description: `**Seller name**

The full formal name by which the Seller is registered in the national registry of legal entities or as a Taxable person or otherwise trades as a person or persons.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:Name",
							},

							/**
							 * Details about the organization
							 */
							organization: {
								key: "BT-30-00",
								type: "object",
								description: "Details about the organization",
								required: false,
								shape: {
									/**
									 * Seller legal registration identifier
									 *
									 * An identifier issued by an official registrar that identifies the Seller as a legal entity or person.
									 *
									 * If no identification scheme is specified, it must be known by Buyer and Seller.
									 */
									registrationIdentifier: {
										key: "BT-30",
										type: "object",
										description: `**Seller legal registration identifier**

An identifier issued by an official registrar that identifies the Seller as a legal entity or person.

If no identification scheme is specified, it must be known by Buyer and Seller.`,
										required: false,
										shape: {
											/**
											 * Seller legal registration identifier
											 *
											 * An identifier issued by an official registrar that identifies the Seller as a legal entity or person.
											 *
											 * If no identification scheme is specified, it must be known by Buyer and Seller.
											 */
											value: {
												type: "string",
												description: `**Seller legal registration identifier**

An identifier issued by an official registrar that identifies the Seller as a legal entity or person.

If no identification scheme is specified, it must be known by Buyer and Seller.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Seller legal registration identifier.
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
											 *
											 * For a SIREN or a SIRET, the value of this field is "0002"
											 */
											schemeIdentifier: {
												type: ISO_6523.map(({ code }) => code),
												description: `**Scheme identifier**

The identification scheme identifier of the Seller legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.

For a SIREN or a SIRET, the value of this field is "0002"`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
								},
							},

							/**
							 * Seller Address
							 *
							 * A group of business terms providing information about the address of the Seller.
							 *
							 * Sufficient components of the address are to be filled in order to comply to legal requirements.
							 *
							 * Like any address, the fields necessary to define the address must appear. The country code is mandatory.
							 *
							 * BR-8: An Invoice shall contain the Seller postal address (BG-5).
							 */
							postalAddress: {
								key: "BG-5",
								type: "object",
								description: `**Seller Address**

A group of business terms providing information about the address of the Seller.

Sufficient components of the address are to be filled in order to comply to legal requirements.

Like any address, the fields necessary to define the address must appear. The country code is mandatory.

BR-8: An Invoice shall contain the Seller postal address (BG-5).`,
								shape: {
									/**
									 * Seller country code
									 *
									 * A code that identifies the country.
									 *
									 * If no tax representative is specified, this is the country where VAT is liable. The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										key: "BT-40",
										type: ISO_3166.map(({ code }) => code.alpha2),
										description: `**Seller country code**

A code that identifies the country.

If no tax representative is specified, this is the country where VAT is liable. The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CountryID",
									},
								},
							},

							/**
							 * Detailed information on tax information of the seller
							 */
							taxRegistration: {
								key: "seller-tax-registration",
								type: "object",
								description:
									"Detailed information on tax information of the seller",
								required: false,
								shape: {
									/**
									 * Seller VAT identifier
									 *
									 * The Seller's VAT identifier (also known as Seller VAT identification number).
									 *
									 * VAT number prefixed by a country code. A VAT registered Supplier shall include his VAT ID, except when he uses a tax representative.
									 */
									vatIdentifier: {
										key: "BT-31",
										type: "string",
										description: `**Seller VAT identifier**

The Seller's VAT identifier (also known as Seller VAT identification number).

VAT number prefixed by a country code. A VAT registered Supplier shall include his VAT ID, except when he uses a tax representative.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[0]/ram:ID",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[0]/ram:ID/@schemeID":
												"VA",
										},
									},
									/**
									 * Seller tax registration identifier
									 *
									 * The local identification (defined by the Seller’s address) of the Seller for tax purposes or a reference that enables the Seller to state his registered tax status.
									 *
									 * This information may affect how the Buyer settles the payment (such as for social security fees). E.g. in some countries, if the Seller is not registered as a tax paying entity then the Buyer is required to withhold the amount of the tax and pay it on behalf of the Seller.
									 */
									localIdentifier: {
										key: "BT-32",
										type: "string",
										required: false,
										description: `**Seller tax registration identifier**

The local identification (defined by the Seller’s address) of the Seller for tax purposes or a reference that enables the Seller to state his registered tax status.

This information may affect how the Buyer settles the payment (such as for social security fees). E.g. in some countries, if the Seller is not registered as a tax paying entity then the Buyer is required to withhold the amount of the tax and pay it on behalf of the Seller.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[1]/ram:ID",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[1]/ram:ID/@schemeID":
												"FC",
										},
									},
								},
							},
						},
					},
					/**
					 * A group of business terms providing information about the Buyer.
					 */
					buyer: {
						key: "BG-7",
						type: "object",
						description:
							"A group of business terms providing information about the Buyer.",
						shape: {
							/**
							 * Buyer name
							 *
							 * The full name of the Buyer.
							 *
							 * CHORUS PRO: this field is limied to 99 characters.
							 *
							 * BR-7: An Invoice shall contain the Buyer name (BT-44).
							 */
							name: {
								key: "BT-44",
								type: "string",
								description: `**Buyer name**

The full name of the Buyer.

CHORUS PRO: this field is limied to 99 characters.

BR-7: An Invoice shall contain the Buyer name (BT-44).`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:Name",
							},

							/**
							 * Details about the organization
							 */
							organization: {
								type: "object",
								description: "Details about the organization",
								required: false,
								shape: {
									/**
									 * Buyer legal registration identifier
									 *
									 * An identifier issued by an official registrar that identifies the Buyer as a legal entity or person.
									 *
									 * If no identification scheme is specified, it should be known by Buyer and Seller, e.g. the identifier that is exclusively used in the applicable legal environment.
									 *
									 * CHORUSPRO: the identifier of the buyer (public entity) is mandatory and is always a SIRET number
									 */
									registrationIdentifier: {
										type: "object",
										description: `**Buyer legal registration identifier**

An identifier issued by an official registrar that identifies the Buyer as a legal entity or person.

If no identification scheme is specified, it should be known by Buyer and Seller, e.g. the identifier that is exclusively used in the applicable legal environment.

CHORUSPRO: the identifier of the buyer (public entity) is mandatory and is always a SIRET number`,
										required: false,
										shape: {
											/**
											 * Buyer legal registration identifier
											 *
											 * An identifier issued by an official registrar that identifies the Buyer as a legal entity or person.
											 *
											 * If no identification scheme is specified, it should be known by Buyer and Seller, e.g. the identifier that is exclusively used in the applicable legal environment.
											 *
											 * CHORUSPRO: the identifier of the buyer (public entity) is mandatory and is always a SIRET number
											 */
											value: {
												type: "string",
												description: `**Buyer legal registration identifier**

An identifier issued by an official registrar that identifies the Buyer as a legal entity or person.

If no identification scheme is specified, it should be known by Buyer and Seller, e.g. the identifier that is exclusively used in the applicable legal environment.

CHORUSPRO: the identifier of the buyer (public entity) is mandatory and is always a SIRET number`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Buyer legal registration identifier.
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
											 *
											 * For a SIREN or a SIRET, the value of this field is "0002"
											 */
											schemeIdentifier: {
												type: ISO_6523.map(({ code }) => code),
												description: `**Scheme identifier**

The identification scheme identifier of the Buyer legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.

For a SIREN or a SIRET, the value of this field is "0002"`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
								},
							},
						},
					},
					/**
					 * Details of the associated order
					 */
					associatedOrder: {
						key: "BT-13-00",
						type: "object",
						description: "Details of the associated order",
						required: false,
						shape: {
							/**
							 * Purchase order reference
							 *
							 * An identifier of a referenced purchase order, issued by the Buyer.
							 *
							 * CHORUS PRO: for the public sector, this is the "Engagement Juridique" (Legal Commitment). It is mandatory for some buyers. You should refer to the ChorusPro Directory to identify these public entity buyers that make it mandatory.
							 */
							purchaseOrderReference: {
								key: "BT-13",
								type: "string",
								description: `**Purchase order reference**

An identifier of a referenced purchase order, issued by the Buyer.

CHORUS PRO: for the public sector, this is the "Engagement Juridique" (Legal Commitment). It is mandatory for some buyers. You should refer to the ChorusPro Directory to identify these public entity buyers that make it mandatory.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerOrderReferencedDocument/ram:IssuerAssignedID",
							},
						},
					},
				},
			},
			/**
			 * Grouping of delivery details
			 */
			tradeDelivery: {
				key: "BG-13-00",
				type: "object",
				description: "Grouping of delivery details",
				xpath:
					"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery",
				defaultValue: [],
				required: false,
				shape: {},
			},
			/**
			 * Direct Debit
			 *
			 * A group of business terms to specify a direct debit.
			 *
			 * This group may be used to give prior notice in the invoice that payment will be made through a SEPA or other direct debit initiated by the Seller, in accordance with the rules of the SEPA or other direct debit scheme.
			 *
			 * CHORUS PRO : not used
			 */
			tradeSettlement: {
				key: "BG-19",
				type: "object",
				description: `**Direct Debit**

A group of business terms to specify a direct debit.

This group may be used to give prior notice in the invoice that payment will be made through a SEPA or other direct debit initiated by the Seller, in accordance with the rules of the SEPA or other direct debit scheme.

CHORUS PRO : not used`,
				shape: {
					/**
					 * Invoice currency code
					 *
					 * The currency in which all Invoice amounts are given, except for the Total VAT amount in accounting currency.
					 *
					 * Only one currency shall be used in the Invoice, except for the Total VAT amount in accounting currency (BT-111) in accordance with article 230 of Directive 2006/112/EC on VAT.
					 * The lists of valid currencies are registered with the ISO 4217 Maintenance Agency "Codes for the representation of currencies and funds".
					 *
					 * CHORUS PRO: Invoices and credit notes or Chorus Pro are mono-currencies only.
					 *
					 * BR-5: An Invoice shall have an Invoice currency code (BT-5).
					 */
					currencyCode: {
						key: "BT-5",
						type: CURRENCY_CODES.map(({ code }) => code),
						description: `**Invoice currency code**

The currency in which all Invoice amounts are given, except for the Total VAT amount in accounting currency.

Only one currency shall be used in the Invoice, except for the Total VAT amount in accounting currency (BT-111) in accordance with article 230 of Directive 2006/112/EC on VAT.
The lists of valid currencies are registered with the ISO 4217 Maintenance Agency "Codes for the representation of currencies and funds".

CHORUS PRO: Invoices and credit notes or Chorus Pro are mono-currencies only.

BR-5: An Invoice shall have an Invoice currency code (BT-5).`,
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceCurrencyCode",
					},

					/**
					 * Document Totals
					 *
					 * A group of business terms providing the monetary totals for the Invoice.
					 *
					 * CHORUS PRO: Amounts in an invoice are expressed by a figure on 19 positions.
					 * They can not have more than two decimals. The separator is ". "
					 */
					monetarySummation: {
						key: "BG-22",
						type: "object",
						description: `**Document Totals**

A group of business terms providing the monetary totals for the Invoice.

CHORUS PRO: Amounts in an invoice are expressed by a figure on 19 positions.
They can not have more than two decimals. The separator is ". "`,
						shape: {
							/**
							 * Invoice total amount without VAT
							 *
							 * The total amount of the Invoice without VAT.
							 *
							 * The Invoice total amount without VAT is the Sum of Invoice line net amount minus Sum of allowances on document level plus Sum of charges on document level.
							 *
							 * For EXTENDED profile only, BR-CO-13 is replaced by BR-FXEXT-CO-13, which add a tolerance of 0,01 euro per line, document level charge and allowance in calculation.
							 */
							taxBasisTotalAmount: {
								key: "BT-109",
								type: "string | number",
								description: `**Invoice total amount without VAT**

The total amount of the Invoice without VAT.

The Invoice total amount without VAT is the Sum of Invoice line net amount minus Sum of allowances on document level plus Sum of charges on document level.

For EXTENDED profile only, BR-CO-13 is replaced by BR-FXEXT-CO-13, which add a tolerance of 0,01 euro per line, document level charge and allowance in calculation.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxBasisTotalAmount",
							},
							/**
							 * Invoice total VAT amount
							 *
							 * The total VAT amount for the Invoice.
							 *
							 * The Invoice total VAT amount is the sum of all VAT category tax amounts.
							 */
							taxTotal: {
								key: "BT-110",
								type: "object",
								description: `**Invoice total VAT amount**

The total VAT amount for the Invoice.

The Invoice total VAT amount is the sum of all VAT category tax amounts.`,
								shape: {
									/**
									 * Invoice total VAT amount
									 *
									 * The total VAT amount for the Invoice.
									 *
									 * The Invoice total VAT amount is the sum of all VAT category tax amounts.
									 */
									amount: {
										type: "string | number",
										description: `**Invoice total VAT amount**

The total VAT amount for the Invoice.

The Invoice total VAT amount is the sum of all VAT category tax amounts.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount[0]",
									},
									/**
									 * Invoice currency code
									 */
									currencyCode: {
										type: CURRENCY_CODES.map(({ code }) => code),
										description: "Invoice currency code",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount[0]/@currencyID",
									},
								},
							},
							/**
							 * Invoice total amount with VAT
							 *
							 * The total amount of the Invoice with VAT.
							 *
							 * The Invoice total amount with VAT is the Invoice total amount without VAT plus the Invoice total VAT amount.
							 */
							grandTotalAmount: {
								key: "BT-112",
								type: "string | number",
								description: `**Invoice total amount with VAT**

The total amount of the Invoice with VAT.

The Invoice total amount with VAT is the Invoice total amount without VAT plus the Invoice total VAT amount.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:GrandTotalAmount",
							},
							/**
							 * Amount due for payment
							 *
							 * The outstanding amount that is requested to be paid.
							 *
							 * This amount is the Invoice total amount with VAT minus the paid amount that has been paid in advance. The amount is zero in case of a fully paid Invoice. The amount may be negative; in that case the Seller owes the amount to the Buyer.
							 */
							duePayableAmount: {
								key: "BT-115",
								type: "string | number",
								description: `**Amount due for payment**

The outstanding amount that is requested to be paid.

This amount is the Invoice total amount with VAT minus the paid amount that has been paid in advance. The amount is zero in case of a fully paid Invoice. The amount may be negative; in that case the Seller owes the amount to the Buyer.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:DuePayableAmount",
							},
						},
					},
					/**
					 * VAT Breakdown
					 *
					 * A group of business terms providing information about VAT breakdown by different categories, rates and exemption reasons
					 */
					vatBreakdown: {
						key: "BG-23",
						type: "object[]",
						group: "vat-breakdown",
						description: `**VAT Breakdown**

A group of business terms providing information about VAT breakdown by different categories, rates and exemption reasons`,
						required: false,
						validator: z.array(z.any()).min(1).optional(),
						shape: {
							/**
							 * VAT category tax amount
							 *
							 * The total VAT amount for a given VAT category.
							 *
							 * Calculated by multiplying the VAT category taxable amount with the VAT category rate for the relevant VAT category.
							 *
							 * For EXTENDED profile only, BR-CO-17 is not applied.
							 */
							calculatedAmount: {
								key: "BT-117",
								type: "string | number",
								description: `**VAT category tax amount**

The total VAT amount for a given VAT category.

Calculated by multiplying the VAT category taxable amount with the VAT category rate for the relevant VAT category.

For EXTENDED profile only, BR-CO-17 is not applied.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax[vat-breakdown]/ram:CalculatedAmount",
							},
							/**
							 * Type of tax (code)
							 *
							 * Coded identification of a VAT category.
							 *
							 * The VAT category code and the VAT category rate shall be consistent. For more information on the recommended codes, please refer to subclause 6.3.3.2 - Specification of VAT category codes.
							 */
							typeCode: {
								key: "BT-118-0",
								type: "string",
								description: `**Type of tax (code)**

Coded identification of a VAT category.

The VAT category code and the VAT category rate shall be consistent. For more information on the recommended codes, please refer to subclause 6.3.3.2 - Specification of VAT category codes.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax[vat-breakdown]/ram:TypeCode",
							},
							/**
							 * VAT exemption reason text
							 *
							 * A textual statement of the reason why the amount is exempted from VAT or why no VAT is being charged
							 *
							 * Articles 226 items 11 to 15 Directive 2006/112/EC [2].
							 *
							 * CHORUS PRO: this field is limited to 1024 characters
							 */
							exemptionReasonText: {
								key: "BT-120",
								type: "string",
								description: `**VAT exemption reason text**

A textual statement of the reason why the amount is exempted from VAT or why no VAT is being charged

Articles 226 items 11 to 15 Directive 2006/112/EC [2].

CHORUS PRO: this field is limited to 1024 characters`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax[vat-breakdown]/ram:ExemptionReason",
							},
							/**
							 * VAT category taxable amount
							 *
							 * Sum of all taxable amounts subject to a specific VAT category code and VAT category rate (if the VAT category rate is applicable).
							 *
							 * The sum of Invoice line net amount minus allowances plus charges on document level which are subject to a specific VAT category code and VAT category rate (if the VAT category rate is applicable).
							 */
							basisAmount: {
								key: "BT-116",
								type: "string | number",
								description: `**VAT category taxable amount**

Sum of all taxable amounts subject to a specific VAT category code and VAT category rate (if the VAT category rate is applicable).

The sum of Invoice line net amount minus allowances plus charges on document level which are subject to a specific VAT category code and VAT category rate (if the VAT category rate is applicable).`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax[vat-breakdown]/ram:BasisAmount",
							},
							/**
							 * VAT category code
							 *
							 * Coded identification of a VAT category.
							 *
							 * The following entries of UNTDID 5305 [6] are used (further clarification between brackets):
							 * - Standard rate (Liable for VAT in a standard way)
							 * - Zero rated goods (Liable for VAT with a percentage rate of zero)
							 * - Exempt from tax (VAT/IGIC/IPSI)
							 * - VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)
							 * - VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)
							 * - Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)
							 * - Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)
							 * - Canary Islands General Indirect Tax (Liable for IGIC tax)
							 * - Liable for IPSI (Ceuta/Melilla tax)
							 *
							 * The VAT category codes are as follows:
							 * - S = Standard VAT rate
							 * - Z = Zero rated goods
							 * - E = VAT exempt
							 * - AE = Reverse charge
							 * - K = Intra-Community supply (specific reverse charge)
							 * - G = Exempt VAT for Export outside EU
							 * - O = Outside VAT scope
							 * - L = Canary Islands
							 * - M = Ceuta and Mellila
							 *
							 * BR-47: Each  VAT  breakdown  (BG-23)  shall  be  defined  through  a VAT category code (BT-118).
							 *
							 * For EXTENDED profile only, BR-O-11, BR-O-12, BR-O-13 and BR-O-14 are not applied.
							 */
							categoryCode: {
								key: "BT-118",
								type: UNTDID_5305.map(({ code }) => code),
								description: `**VAT category code**

Coded identification of a VAT category.

The following entries of UNTDID 5305 [6] are used (further clarification between brackets):
- Standard rate (Liable for VAT in a standard way)
- Zero rated goods (Liable for VAT with a percentage rate of zero)
- Exempt from tax (VAT/IGIC/IPSI)
- VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)
- VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)
- Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)
- Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)
- Canary Islands General Indirect Tax (Liable for IGIC tax)
- Liable for IPSI (Ceuta/Melilla tax)

The VAT category codes are as follows:
- S = Standard VAT rate
- Z = Zero rated goods
- E = VAT exempt
- AE = Reverse charge
- K = Intra-Community supply (specific reverse charge)
- G = Exempt VAT for Export outside EU
- O = Outside VAT scope
- L = Canary Islands
- M = Ceuta and Mellila

BR-47: Each  VAT  breakdown  (BG-23)  shall  be  defined  through  a VAT category code (BT-118).

For EXTENDED profile only, BR-O-11, BR-O-12, BR-O-13 and BR-O-14 are not applied.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax[vat-breakdown]/ram:CategoryCode",
							},
							/**
							 * VAT exemption reason code
							 *
							 * A coded statement of the reason for why the amount is exempted from VAT.
							 *
							 * Code list issued and maintained by the Connecting Europe Facility.
							 */
							exemptionReasonCode: {
								key: "BT-121",
								type: VATEX.map(({ code }) => code),
								description: `**VAT exemption reason code**

A coded statement of the reason for why the amount is exempted from VAT.

Code list issued and maintained by the Connecting Europe Facility.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax[vat-breakdown]/ram:ExemptionReasonCode",
							},
							/**
							 * Value added tax point date code
							 *
							 * The code of the date when the VAT becomes accountable for the Seller and for the Buyer.
							 *
							 * The code shall distinguish between the following entries of UNTDID 2005 [6]:
							 * - Invoice docment issue date
							 * - Delivery date, actual
							 * - Payment date. The Value added tax point date code is used if the Value added tax point date is not known when the invoice is issued. The use of BT-8 and BT-7 is mutually exclusive.
							 *
							 * This code can not be present if the Value added tax point date is provided directly in the ""Value added tax point date"" (BT-7).
							 * This code should be selected from the following values from UNTDID 2475 (instead of UNTDID 2005 [6]):
							 * - 5: Date of the invoice (VAT on DEBITS)
							 * - 29: Delivery date (VAT on DEBITS)
							 * - 72: Payment date (VAT on RECEIPTS)
							 *
							 * BR-CO-3: Value added tax point date (BT-7) and Value added tax point date code (BT-8) are mutually exclusive.
							 */
							dueDateTypeCode: {
								key: "BT-8",
								type: UNTDID_2475.map(({ code }) => code),
								description: `**Value added tax point date code**

The code of the date when the VAT becomes accountable for the Seller and for the Buyer.

The code shall distinguish between the following entries of UNTDID 2005 [6]:
- Invoice docment issue date
- Delivery date, actual
- Payment date. The Value added tax point date code is used if the Value added tax point date is not known when the invoice is issued. The use of BT-8 and BT-7 is mutually exclusive.

This code can not be present if the Value added tax point date is provided directly in the ""Value added tax point date"" (BT-7).
This code should be selected from the following values from UNTDID 2475 (instead of UNTDID 2005 [6]):
- 5: Date of the invoice (VAT on DEBITS)
- 29: Delivery date (VAT on DEBITS)
- 72: Payment date (VAT on RECEIPTS)

BR-CO-3: Value added tax point date (BT-7) and Value added tax point date code (BT-8) are mutually exclusive.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax[vat-breakdown]/ram:DueDateTypeCode",
							},
							/**
							 * VAT category rate
							 *
							 * The VAT rate, represented as percentage that applies for the relevant VAT category.
							 *
							 * The VAT category code and the VAT category rate shall be consistent.
							 *
							 * The value to enter is the percentage. For example, for 20%, it must be given as 20 (and not 0.2)
							 *
							 * BR-48: Each  VAT  breakdown  (BG-23)  shall  have  a  VAT  category rate (BT-119), except if the Invoice is not subject to VAT.
							 */
							rateApplicablePercent: {
								key: "BT-119",
								type: "string | number",
								description: `**VAT category rate**

The VAT rate, represented as percentage that applies for the relevant VAT category.

The VAT category code and the VAT category rate shall be consistent.

The value to enter is the percentage. For example, for 20%, it must be given as 20 (and not 0.2)

BR-48: Each  VAT  breakdown  (BG-23)  shall  have  a  VAT  category rate (BT-119), except if the Invoice is not subject to VAT.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax[vat-breakdown]/ram:RateApplicablePercent",
							},
						},
					},
					/**
					 * Invoicing period
					 *
					 * A group of business terms providing information on the invoice period.
					 *
					 * Used to indicate when the period covered by the invoice starts and when it ends. Also called delivery period.
					 */
					invoicingPeriod: {
						key: "BG-14",
						type: "object",
						description: `**Invoicing period**

A group of business terms providing information on the invoice period.

Used to indicate when the period covered by the invoice starts and when it ends. Also called delivery period.`,
						required: false,
						shape: {
							/**
							 * Invoicing period start date
							 *
							 * The date when the Invoice period starts.
							 *
							 * The initial date of delivery of goods or services.
							 *
							 * This date must be less than or equal to the period end date (BT-74), if it exists
							 *
							 * BR-CO-19: If Invoicing period (BG-14) is used, the Invoicing period start date (BT-73) or the Invoicing period end date (BT-74) shall be filled, or both.
							 */
							startDate: {
								key: "BT-73",
								type: "date",
								description: `**Invoicing period start date**

The date when the Invoice period starts.

The initial date of delivery of goods or services.

This date must be less than or equal to the period end date (BT-74), if it exists

BR-CO-19: If Invoicing period (BG-14) is used, the Invoicing period start date (BT-73) or the Invoicing period end date (BT-74) shall be filled, or both.`,
								required: false,
								transform: {
									input: dateTimeStringFormatter,
								},
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString/@format":
										"102",
								},
							},
							/**
							 * Invoicing period end date
							 *
							 * This date must be greater than or equal to the period start date (BT-73), if it exists
							 *
							 * BR-29: If  both  Invoicing  period  start  date  (BT-73)  and  Invoicing period end date (BT-74) are given then the Invoicing period end  date  (BT-74)  shall  be  later  or  equal  to  the  Invoicing period start date (BT-73).
							 *
							 * BR-CO-19: If Invoicing period (BG-14) is used, the Invoicing period start date (BT-73) or the Invoicing period end date (BT-74) shall be filled, or both.
							 */
							endDate: {
								key: "BT-74",
								type: "date",
								description: `**Invoicing period end date**

This date must be greater than or equal to the period start date (BT-73), if it exists

BR-29: If  both  Invoicing  period  start  date  (BT-73)  and  Invoicing period end date (BT-74) are given then the Invoicing period end  date  (BT-74)  shall  be  later  or  equal  to  the  Invoicing period start date (BT-73).

BR-CO-19: If Invoicing period (BG-14) is used, the Invoicing period start date (BT-73) or the Invoicing period end date (BT-74) shall be filled, or both.`,
								required: false,
								transform: {
									input: dateTimeStringFormatter,
								},
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString/@format":
										"102",
								},
							},
						},
					},
				},
			},
		},
	},
} satisfies Schema;
