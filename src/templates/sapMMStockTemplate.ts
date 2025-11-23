import type { DocumentSection } from '../types/document';

export const sapMMStockTemplate: DocumentSection[] = [
  {
    id: '1',
    title: 'Document Control',
    content: 'This section contains document metadata, version control, and approval information.',
    level: 1,
    subsections: [
      {
        id: '1.1',
        title: 'Document Properties',
        content: `Document Title: Functional Specification Document - SAP MM Stock by Storage Location Report
Report Name: ZMM_STOCK_BY_SLOC
Transaction Code: ZMM_SLOC
Module: SAP Materials Management (MM)
Author: [To be assigned]
Creation Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
Version: 1.0
Status: Draft`,
        level: 2,
      },
      {
        id: '1.2',
        title: 'Approval Status',
        content: `Business Owner: [Pending]
Approval Date: [Pending]
Technical Lead: [Pending]
Approval Date: [Pending]
Project Manager: [Pending]
Approval Date: [Pending]`,
        level: 2,
      },
      {
        id: '1.3',
        title: 'Change History',
        content: `Version | Date | Author | Description of Changes | Approved By
1.0 | ${new Date().toLocaleDateString()} | [Author] | Initial version - FSD for ZMM_STOCK_BY_SLOC report | [Pending]`,
        level: 2,
      },
    ],
  },
  {
    id: '2',
    title: 'Objective',
    content: `The primary objective of this functional specification is to define the requirements for developing a custom SAP Materials Management (MM) report that provides comprehensive visibility into material stock levels across storage locations.

Business Need:
The organization requires a centralized reporting solution to monitor current inventory positions by storage location across multiple plants. This report will enable inventory planners, warehouse managers, and materials controllers to:

• Obtain real-time visibility of stock quantities by storage location
• Monitor unrestricted, blocked, and quality inspection stock categories
• Assess total stock values for financial planning and inventory optimization
• Support inventory reconciliation and cycle counting activities
• Enable informed decision-making for material planning and procurement
• Facilitate compliance with inventory accuracy and audit requirements

The report addresses the current gap where users must navigate through multiple standard SAP transactions (MMBE, MB52) to gather comprehensive stock information, resulting in inefficient processes and potential data inconsistencies.`,
    level: 1,
  },
  {
    id: '3',
    title: 'Scope',
    content: 'This section defines what is included and excluded from the report functionality.',
    level: 1,
    subsections: [
      {
        id: '3.1',
        title: 'In Scope',
        content: `The following items are within the scope of this report:

Stock Categories:
• Unrestricted-use stock (LABST from MARD)
• Stock in Quality Inspection (INSME from MARD)
• Blocked stock (SPEME from MARD)
• Total valuated stock quantity aggregation

Plant and Storage Location Coverage:
• Multiple plant selection capability
• Multiple storage location selection within plants
• All storage locations within selected plants when no specific storage location is entered

Material Filtering:
• Material number selection (single or range)
• Material group selection
• Base unit of measure display

Stock Valuation:
• Total stock value calculation using standard price or moving average price
• Currency display in local plant currency
• Price sourced from MBEW (Material Valuation)

Additional Information:
• Material descriptions from MARA
• Last goods receipt date by storage location
• Plant and storage location descriptions

Output Features:
• ALV Grid display with standard ALV functionality
• Sorting and filtering capabilities
• Export to Excel and CSV formats
• Subtotals by plant and storage location
• Grand totals for quantities and values`,
        level: 2,
      },
      {
        id: '3.2',
        title: 'Out of Scope',
        content: `The following items are explicitly excluded from this report:

Batch Management:
• Batch-level stock details
• Batch expiration dates
• Batch-specific characteristics
Note: Batch-managed materials will show aggregated quantities only

Special Stock:
• Consignment stock
• Project stock
• Sales order stock
• Stock in transit
• Vendor consignment stock
Note: Only unrestricted, quality, and blocked stock at storage locations are included

Future Projections:
• Planned receipts (purchase orders, production orders)
• Planned issues (sales orders, reservations)
• Stock requirements analysis
• Future stock projections or simulations

Serial Numbers:
• Serial number details for serialized materials
• Serial number tracking and history

Movement History:
• Historical goods movements
• Movement type details
• Document references for movements
Note: Only current stock as of the selection date is displayed

Cross-Plant Scenarios:
• Stock transport orders in transit
• Inter-company stock transfers in progress
• Stock at alternative plants

Advanced Valuation:
• Split valuation scenarios (detailed breakdown)
• Foreign currency conversion
• Different valuation types (tax price, commercial price)`,
        level: 2,
      },
    ],
  },
  {
    id: '4',
    title: 'Report Name and Transaction Code',
    content: `The custom report will be identified as follows:

Report Program Name: ZMM_STOCK_BY_SLOC
Description: Stock Levels by Storage Location Report

Custom Transaction Code: ZMM_SLOC
Description: Display Stock by Storage Location
Transaction Type: Report Transaction

Naming Convention Rationale:
• "Z" prefix indicates customer-specific development
• "MM" denotes Materials Management module
• "STOCK" describes the report purpose
• "SLOC" abbreviates Storage Location

Menu Path:
SAP Easy Access → Logistics → Materials Management → Inventory Management → Environment → Stock → Custom Reports → ZMM_SLOC

Alternative Access:
• Direct transaction code entry in command field
• Addition to user favorites
• Integration into custom menu structure (if applicable)`,
    level: 1,
  },
  {
    id: '5',
    title: 'Selection Criteria',
    content: 'This section defines the input parameters available to users when executing the report.',
    level: 1,
    subsections: [
      {
        id: '5.1',
        title: 'Selection Screen Parameters',
        content: `The report selection screen will contain the following parameters organized in logical blocks:

PLANT SELECTION (Mandatory)
Parameter: S_WERKS (Plant)
• Field Type: SELECT-OPTIONS
• Data Element: WERKS_D
• Multiple Selection: Yes (Multiple values, ranges, and exclusions allowed)
• Mandatory: Yes
• Default Value: None (User must enter at least one plant)
• Validation: Plant must exist in T001W (Plants/Branches)
• Input Help: F4 help available from T001W

STORAGE LOCATION SELECTION (Optional)
Parameter: S_LGORT (Storage Location)
• Field Type: SELECT-OPTIONS
• Data Element: LGORT_D
• Multiple Selection: Yes (Multiple values, ranges, and exclusions allowed)
• Mandatory: No
• Default Value: Blank (All storage locations if not specified)
• Validation: Storage location must exist in T001L (Storage Locations)
• Input Help: F4 help filtered by selected plants
• Dependency: Values filtered based on plant selection

MATERIAL NUMBER SELECTION (Optional)
Parameter: S_MATNR (Material Number)
• Field Type: SELECT-OPTIONS
• Data Element: MATNR
• Multiple Selection: Yes (Multiple values, ranges, and exclusions allowed)
• Mandatory: No
• Default Value: Blank (All materials if not specified)
• Validation: Material must exist in MARA (General Material Data)
• Input Help: F4 help from MARA with material description
• Additional Feature: Leading zeros conversion using CONVERSION_EXIT_ALPHA_INPUT

MATERIAL GROUP SELECTION (Optional)
Parameter: S_MATKL (Material Group)
• Field Type: SELECT-OPTIONS
• Data Element: MATKL
• Multiple Selection: Yes (Multiple values, ranges, and exclusions allowed)
• Mandatory: No
• Default Value: Blank (All material groups if not specified)
• Validation: Material group must exist in T023 (Material Groups)
• Input Help: F4 help from T023 with material group descriptions

STOCK DATE (Optional)
Parameter: P_STDAT (Stock as of Date)
• Field Type: PARAMETERS
• Data Element: SY-DATUM
• Default Value: SY-DATUM (Current system date)
• Mandatory: No (defaults to current date)
• Validation: Date cannot be in the future
• Note: Report shows stock position as of this date (currently limited to current date stock; historical stock retrieval not implemented)

OUTPUT OPTIONS
Parameter: P_LAYOUT (ALV Layout Variant)
• Field Type: PARAMETERS
• Data Element: DISVARIANT-VARIANT
• Default Value: Blank (standard layout)
• Mandatory: No
• Input Help: F4 help for saved ALV layout variants`,
        level: 2,
      },
      {
        id: '5.2',
        title: 'Selection Screen Layout',
        content: `The selection screen will be organized as follows:

Block 1: Plant and Storage Location Selection
---------------------------------------------
○ Plant(s)               [_________________] (Mandatory, Multiple Selection)
○ Storage Location(s)    [_________________] (Optional, Multiple Selection)

Block 2: Material Selection Criteria
-------------------------------------
○ Material Number(s)     [_________________] (Optional, Multiple Selection)
○ Material Group(s)      [_________________] (Optional, Multiple Selection)

Block 3: Report Parameters
---------------------------
○ Stock as of Date       [__/__/____] (Default: Current Date)

Block 4: Display Options
------------------------
○ ALV Layout Variant     [_________________] (Optional)

[ Execute ]  [ Save Variant ]  [ Get Variant ]

Selection Screen Features:
• Standard SAP selection screen with F1 (Help), F4 (Search Help), and F8 (Execute) support
• Ability to save and retrieve selection variants
• Input validation on all fields
• Dynamic F4 help (storage location filtered by selected plants)`,
        level: 2,
      },
    ],
  },
  {
    id: '6',
    title: 'Output Layout',
    content: 'This section defines the columns and data fields to be displayed in the report output.',
    level: 1,
    subsections: [
      {
        id: '6.1',
        title: 'Report Columns',
        content: `The report output will display the following columns in ALV Grid format:

Column 1: Material Number (MATNR)
• Data Source: MARD-MATNR
• Data Type: CHAR(18)
• Description: Material number with leading zeros
• Display Length: 18 characters
• Format: Standard material number format with conversion exit
• Sorting: Primary sort field
• Key Column: Yes
• Hotspot: Yes (click to navigate to MM03 - Display Material)

Column 2: Material Description (MAKTX)
• Data Source: MAKT-MAKTX
• Data Type: CHAR(40)
• Description: Short text for material
• Display Length: 40 characters
• Language: Current logon language
• Note: If description not found in logon language, display in original language

Column 3: Plant (WERKS)
• Data Source: MARD-WERKS
• Data Type: CHAR(4)
• Description: Plant identifier
• Display Length: 10 characters (includes plant name from T001W)
• Format: Display as "XXXX - Plant Name"
• Key Column: Yes

Column 4: Plant Name (NAME1)
• Data Source: T001W-NAME1
• Data Type: CHAR(30)
• Description: Name of the plant
• Display Length: 30 characters

Column 5: Storage Location (LGORT)
• Data Source: MARD-LGORT
• Data Type: CHAR(4)
• Description: Storage location identifier
• Display Length: 20 characters (includes storage location name from T001L)
• Format: Display as "XXXX - Storage Location Name"
• Key Column: Yes

Column 6: Storage Location Name (LGOBE)
• Data Source: T001L-LGOBE
• Data Type: CHAR(16)
• Description: Description of storage location
• Display Length: 20 characters

Column 7: Base Unit of Measure (MEINS)
• Data Source: MARA-MEINS
• Data Type: UNIT(3)
• Description: Base unit of measure for the material
• Display Length: 5 characters
• Format: Display unit text (e.g., "PC", "KG", "M")

Column 8: Unrestricted Stock (LABST)
• Data Source: MARD-LABST
• Data Type: QUAN(13,3)
• Description: Unrestricted-use stock quantity
• Display Length: 17 characters
• Format: Quantity format with thousand separator and 3 decimal places
• Alignment: Right-aligned
• Sum: Yes (subtotals and grand totals)
• Unit Reference: Column 7 (MEINS)

Column 9: Quality Inspection Stock (INSME)
• Data Source: MARD-INSME
• Data Type: QUAN(13,3)
• Description: Stock in quality inspection
• Display Length: 17 characters
• Format: Quantity format with thousand separator and 3 decimal places
• Alignment: Right-aligned
• Sum: Yes (subtotals and grand totals)
• Unit Reference: Column 7 (MEINS)

Column 10: Blocked Stock (SPEME)
• Data Source: MARD-SPEME
• Data Type: QUAN(13,3)
• Description: Blocked stock quantity
• Display Length: 17 characters
• Format: Quantity format with thousand separator and 3 decimal places
• Alignment: Right-aligned
• Sum: Yes (subtotals and grand totals)
• Unit Reference: Column 7 (MEINS)

Column 11: Total Stock Quantity (TOTAL_QTY)
• Data Source: Calculated (LABST + INSME + SPEME)
• Data Type: QUAN(13,3)
• Description: Total valuated stock quantity
• Display Length: 17 characters
• Format: Quantity format with thousand separator and 3 decimal places
• Alignment: Right-aligned
• Sum: Yes (subtotals and grand totals)
• Calculation: Sum of unrestricted, quality inspection, and blocked stock
• Unit Reference: Column 7 (MEINS)

Column 12: Standard/Moving Average Price (STPRS/VERPR)
• Data Source: MBEW-STPRS or MBEW-VERPR
• Data Type: CURR(11,2)
• Description: Price per base unit of measure
• Display Length: 15 characters
• Format: Currency format with thousand separator and 2 decimal places
• Alignment: Right-aligned
• Currency Reference: Column 14 (WAERS)
• Logic: Use STPRS if VPRSV = 'S' (standard price), use VERPR if VPRSV = 'V' (moving average price)

Column 13: Total Stock Value (TOTAL_VALUE)
• Data Source: Calculated (TOTAL_QTY × Price)
• Data Type: CURR(15,2)
• Description: Total value of stock at storage location
• Display Length: 18 characters
• Format: Currency format with thousand separator and 2 decimal places
• Alignment: Right-aligned
• Sum: Yes (subtotals and grand totals)
• Calculation: Total Stock Quantity × Standard/Moving Average Price
• Currency Reference: Column 14 (WAERS)

Column 14: Currency (WAERS)
• Data Source: MBEW-WAERS
• Data Type: CUKY(5)
• Description: Currency key
• Display Length: 5 characters
• Format: Standard currency code (e.g., "USD", "EUR")

Column 15: Last Goods Receipt Date (LDATE)
• Data Source: MARD-LDATE (Latest date from MSEG for goods receipt movements)
• Data Type: DATS(8)
• Description: Date of last goods receipt to this storage location
• Display Length: 10 characters
• Format: DD.MM.YYYY or based on user date format settings
• Note: If no goods receipt exists, display as blank or "No GR"

Column 16: Price Control Indicator (VPRSV)
• Data Source: MBEW-VPRSV
• Data Type: CHAR(1)
• Description: Price control indicator (S=Standard, V=Moving Average)
• Display Length: 15 characters
• Format: Display as text ("Standard Price" or "Moving Avg Price")
• Optional: Can be hidden by default in ALV layout`,
        level: 2,
      },
      {
        id: '6.2',
        title: 'ALV Grid Features',
        content: `The report output will utilize SAP ALV (ABAP List Viewer) Grid Control with the following features:

Standard ALV Functionality:
• Column sorting (ascending/descending) - click on column headers
• Column filtering - use filter icon to filter values in any column
• Column reordering - drag and drop column headers
• Column hiding/showing - right-click to personalize column display
• Column width adjustment - drag column borders to resize
• Search functionality - Ctrl+F to search for values
• Sum/Subtotal calculations - automatic for quantity and value columns

Export Options:
• Export to Microsoft Excel (.XLSX format)
• Export to CSV file (comma-separated values)
• Export to local file
• Send via email (if configured)
• Download as spreadsheet
• Print to PDF (via SAP print settings)

Subtotals and Totals:
• Subtotals at Plant level - sum of all stock quantities and values per plant
• Subtotals at Storage Location level - sum within each storage location
• Grand Total - total of all plants and storage locations
• Subtotal text: "Total for Plant XXXX" and "Grand Total"

Layout Variants:
• Users can save personalized ALV layouts (column order, widths, filters, sorts)
• Layout variants can be saved as user-specific or global (if authorized)
• Default layout provided with optimal column order and widths
• Layout selection available on selection screen

Additional ALV Features:
• Row highlighting: Materials with zero total stock highlighted in gray
• Cell coloring: Negative stock (if any) highlighted in red (error condition)
• Icon display: Traffic light icons for stock status (optional enhancement)
• Drill-down capability: Double-click material number to navigate to MM03
• Column aggregation: Right-click to add sum, average, min, max
• Filter pane: Side panel for complex filtering

Interactive Features:
• Double-click on Material Number → Navigate to MM03 (Display Material)
• Double-click on Plant → Navigate to MMBE (Stock Overview)
• Right-click menu for additional functions
• Refresh button to re-execute report with same selections`,
        level: 2,
      },
    ],
  },
  {
    id: '7',
    title: 'Data Sources',
    content: 'This section identifies the SAP tables and data sources used to retrieve information for the report.',
    level: 1,
    subsections: [
      {
        id: '7.1',
        title: 'Primary SAP Tables',
        content: `The following SAP standard tables will be accessed to populate the report:

Table: MARD - Storage Location Data for Material
Purpose: Primary source for stock quantities by storage location
Key Fields: MATNR (Material Number), WERKS (Plant), LGORT (Storage Location)
Fields Used:
• MATNR - Material Number
• WERKS - Plant
• LGORT - Storage Location
• LABST - Unrestricted-use stock
• INSME - Stock in quality inspection
• SPEME - Blocked stock
• LDATE - Date of last goods receipt (if available; may need to derive from MSEG)
Join Logic: Main driving table for the report

Table: MBEW - Material Valuation
Purpose: Material valuation data and price information
Key Fields: MATNR (Material Number), BWKEY (Valuation Area), BWTAR (Valuation Type)
Fields Used:
• MATNR - Material Number
• BWKEY - Valuation area (typically same as Plant)
• VPRSV - Price control indicator (S=Standard Price, V=Moving Average)
• VERPR - Moving average price/periodic unit price
• STPRS - Standard price
• WAERS - Currency key
• LBKUM - Total valuated stock (for validation)
Join Logic: LEFT OUTER JOIN to MARD on MATNR and BWKEY = WERKS
Note: Use BWTAR = space (no split valuation) for simplicity; handle split valuation as optional future enhancement

Table: MARA - General Material Data
Purpose: Material master general data
Key Fields: MATNR (Material Number)
Fields Used:
• MATNR - Material Number
• MEINS - Base unit of measure
• MATKL - Material group
• MTART - Material type (for validation)
Join Logic: INNER JOIN to MARD on MATNR

Table: MAKT - Material Descriptions
Purpose: Material short text descriptions
Key Fields: MATNR (Material Number), SPRAS (Language Key)
Fields Used:
• MATNR - Material Number
• MAKTX - Material description (short text)
• SPRAS - Language key
Join Logic: LEFT OUTER JOIN to MARD on MATNR and SPRAS = SY-LANGU
Note: If description in user language not found, retrieve in original language (SPRAS = 'E')

Table: T001W - Plants/Branches
Purpose: Plant master data
Key Fields: WERKS (Plant)
Fields Used:
• WERKS - Plant
• NAME1 - Name of plant
• BWKEY - Valuation area (for joining to MBEW)
Join Logic: INNER JOIN to MARD on WERKS

Table: T001L - Storage Locations
Purpose: Storage location master data
Key Fields: WERKS (Plant), LGORT (Storage Location)
Fields Used:
• WERKS - Plant
• LGORT - Storage Location
• LGOBE - Description of storage location
Join Logic: LEFT OUTER JOIN to MARD on WERKS and LGORT`,
        level: 2,
      },
      {
        id: '7.2',
        title: 'Optional Data Sources',
        content: `The following tables may be accessed for enhanced functionality or validation:

Table: MSEG - Document Segment: Material
Purpose: To derive last goods receipt date if not available in MARD-LDATE
Key Fields: MATNR, WERKS, LGORT, BWART (Movement Type)
Fields Used:
• BUDAT - Posting date
Logic: Select MAX(BUDAT) where BWART in goods receipt movement types (101, 561, etc.)
Note: This may impact performance; consider using MARD-LDATE if sufficient

Table: T023 - Material Groups
Purpose: Validation and description of material groups
Key Fields: MATKL (Material Group)
Fields Used:
• MATKL - Material group
• WGBEZ - Description of material group
Usage: For selection screen F4 help and validation

Table: T156 - Movement Type
Purpose: For filtering goods receipt movement types if accessing MSEG
Key Fields: BWART (Movement Type)

Table: T001 - Company Codes
Purpose: Additional plant-to-company code mapping if needed for reporting
Key Fields: BUKRS (Company Code)
Note: May be required if cross-company reporting is added in future`,
        level: 2,
      },
      {
        id: '7.3',
        title: 'Data Retrieval Strategy',
        content: `To ensure optimal performance, the following data retrieval strategy will be implemented:

Primary Data Extraction:
1. Read MARD table filtered by selection criteria (Plant, Storage Location, Material)
2. Perform table joins in ABAP using FOR ALL ENTRIES or database joins
3. Filter materials by Material Group after retrieving MARA data
4. Aggregate stock quantities at material-plant-storage location level

Performance Considerations:
• Use database indexes on MARD (primary key: MATNR, WERKS, LGORT)
• Limit data volume using mandatory plant selection
• Avoid reading entire MARD table without filters
• Use FOR ALL ENTRIES with internal tables limited to reasonable sizes
• Consider secondary indexes if performance issues arise

Data Validation:
• Check for materials with negative stock (data inconsistency)
• Validate that valuation area matches plant
• Handle materials without valuation data gracefully (display with zero value)
• Identify and report materials with missing material descriptions

Error Handling:
• If no data found for selection criteria, display message "No stock data found for selected criteria"
• If authorization check fails, display error message and log
• Handle database errors gracefully with error messages`,
        level: 2,
      },
    ],
  },
  {
    id: '8',
    title: 'Processing Logic',
    content: 'This section describes the business logic and calculations performed by the report.',
    level: 1,
    subsections: [
      {
        id: '8.1',
        title: 'Data Selection and Filtering',
        content: `The report will apply the following logic to select and filter data:

Step 1: Initial Data Selection
• Read MARD table based on selection screen parameters:
  - Plant (S_WERKS) - Mandatory filter
  - Storage Location (S_LGORT) - Optional filter (if blank, select all)
  - Material Number (S_MATNR) - Optional filter (if blank, select all)
• Apply WHERE clause to optimize database read
• Exclude storage locations with zero stock in all categories (optional based on user preference)

Step 2: Material Master Data Retrieval
• Retrieve material descriptions from MAKT for user's logon language (SY-LANGU)
• If description not found in user language, retrieve in English (SPRAS = 'E')
• Retrieve base unit of measure and material group from MARA
• Filter by Material Group (S_MATKL) if specified on selection screen

Step 3: Organizational Data Retrieval
• Retrieve plant names from T001W
• Retrieve storage location descriptions from T001L
• Validate that plant and storage location combinations are valid

Step 4: Valuation Data Retrieval
• Retrieve price and currency information from MBEW
• Match BWKEY (valuation area) to WERKS (plant)
• For split valuation scenarios, use BWTAR = space (standard valuation type)
• Handle materials without valuation data (e.g., non-valuated materials)

Step 5: Data Consolidation
• Consolidate all retrieved data into internal table for output
• Calculate total stock quantity and total stock value
• Apply authorization checks for plant and material access`,
        level: 2,
      },
      {
        id: '8.2',
        title: 'Stock Quantity Aggregation',
        content: `Stock quantities will be aggregated and calculated as follows:

Unrestricted Stock (LABST):
• Source: MARD-LABST
• Description: Stock available for unrestricted use (MRP, sales, production)
• Unit: Base unit of measure (MEINS)
• Format: Display with 3 decimal places

Quality Inspection Stock (INSME):
• Source: MARD-INSME
• Description: Stock currently in quality inspection (QI status)
• Unit: Base unit of measure (MEINS)
• Format: Display with 3 decimal places
• Note: Cannot be used for MRP or sales until QI is completed

Blocked Stock (SPEME):
• Source: MARD-SPEME
• Description: Stock blocked for various reasons (quality, returns, etc.)
• Unit: Base unit of measure (MEINS)
• Format: Display with 3 decimal places
• Note: Not available for use until block is removed

Total Stock Quantity Calculation:
Formula: TOTAL_QTY = LABST + INSME + SPEME

Validation Rules:
• All quantities must be in base unit of measure
• Negative stock should be flagged as data inconsistency
• Zero stock materials can be included or excluded based on user preference
• Stock quantities rounded to 3 decimal places for display`,
        level: 2,
      },
      {
        id: '8.3',
        title: 'Stock Valuation Logic',
        content: `Stock value will be calculated based on the following logic:

Price Determination:
1. Identify price control indicator (MBEW-VPRSV):
   - 'S' = Standard Price → Use MBEW-STPRS
   - 'V' = Moving Average Price → Use MBEW-VERPR

2. Retrieve the appropriate price:
   - If VPRSV = 'S': PRICE = STPRS (Standard price)
   - If VPRSV = 'V': PRICE = VERPR (Moving average price)
   - If neither exists or VPRSV is blank: PRICE = 0 (handle as non-valuated)

3. Retrieve currency from MBEW-WAERS

Stock Value Calculation:
Formula: TOTAL_VALUE = TOTAL_QTY × PRICE

Calculation Rules:
• Value calculated per material-plant-storage location combination
• Value expressed in plant currency (MBEW-WAERS)
• Value rounded to 2 decimal places for display
• If price is zero or null, value displayed as 0.00

Handling Non-Valuated Materials:
• Materials without valuation data (MBEW entry not found):
  - Display quantity but show value as 0.00
  - Display currency as plant currency from T001W
  - Do not include in value totals or subtotals (optional: include with zero value)

• Non-valuated material types (e.g., NLAG - Non-stock materials):
  - Typically excluded from MARD
  - If present, display with zero value

Price Unit Consideration:
• MBEW-PEINH (Price unit) indicates quantity for which price is valid
• If PEINH ≠ 1, adjust calculation: VALUE = (TOTAL_QTY × PRICE) / PEINH
• Example: If price is $100 per 10 pieces (PEINH = 10), unit price = $10

Subtotal and Grand Total Calculation:
• Subtotal by Plant: Sum of all TOTAL_VALUE for materials in the plant
• Subtotal by Storage Location: Sum of all TOTAL_VALUE in storage location
• Grand Total: Sum of all TOTAL_VALUE across all plants and storage locations
• Currency handling: All values in same currency (no currency conversion)`,
        level: 2,
      },
      {
        id: '8.4',
        title: 'Last Goods Receipt Date Logic',
        content: `The last goods receipt date will be determined as follows:

Option 1: Use MARD-LDATE (if available and reliable)
• MARD-LDATE contains the date of the last goods movement
• Direct retrieval from MARD table (no additional table access required)
• Note: LDATE may not always reflect only goods receipts (can include issues)

Option 2: Derive from MSEG - Document Segment: Material (recommended for accuracy)
• Access MSEG table for material/plant/storage location combinations
• Filter by goods receipt movement types:
  - 101: Goods receipt for purchase order
  - 561: Goods receipt from production
  - Other goods receipt movement types as applicable
• Select MAX(BUDAT) - latest posting date for goods receipt
• Performance consideration: Use MSEG only if necessary due to table size

Implementation Approach:
• If MARD-LDATE is sufficient for business requirements, use Option 1
• If precise goods receipt date is critical, implement Option 2
• Display format: DD.MM.YYYY based on user date settings
• If no goods receipt found: Display as blank or "No GR" text

Note: For initial implementation, use MARD-LDATE; enhance with MSEG logic if required after UAT feedback.`,
        level: 2,
      },
      {
        id: '8.5',
        title: 'Currency Conversion Logic',
        content: `Currency handling for this report:

Current Scope - No Currency Conversion:
• Stock values displayed in plant currency (MBEW-WAERS)
• Each plant may have a different valuation currency
• Report displays values in original currency without conversion
• Users must perform manual conversion if cross-currency analysis needed

Subtotal and Grand Total Behavior:
• Subtotals calculated per plant in plant currency
• Grand total is sum of all values but may be in mixed currencies
• If plants have different currencies:
  - Display subtotals in respective currencies
  - Display grand total with note "Mixed currencies - values not converted"
  - Optionally suppress grand total if currencies are mixed

Future Enhancement (Out of Scope for V1.0):
• Implement currency conversion to reporting currency (e.g., USD, EUR)
• Use exchange rate table (TCURR) and conversion function modules
• Add selection parameter for target currency
• Add column for converted value in reporting currency

Current Implementation:
• Display WAERS (currency code) in output
• Group totals by currency if multiple currencies exist
• Provide clear indication when mixed currencies are present`,
        level: 2,
      },
    ],
  },
  {
    id: '9',
    title: 'Authorization Requirements',
    content: 'This section defines the authorization objects and security requirements for the report.',
    level: 1,
    subsections: [
      {
        id: '9.1',
        title: 'SAP Authorization Objects',
        content: `The following SAP authorization objects will be checked when executing the report:

Authorization Object: M_MSEG_WMB (Goods Movements: Warehouse Management)
Activity: 03 (Display)
Fields to Check:
• WERKS (Plant) - User must have display authorization for selected plants
• LGORT (Storage Location) - User must have access to storage locations
Purpose: Controls access to inventory data by plant and storage location

Authorization Object: M_MATE_WRK (Material Master: Plants)
Activity: 03 (Display)
Fields to Check:
• WERKS (Plant) - User must have display authorization for plants
• ACTVT (Activity) - Activity 03 (Display)
Purpose: Ensures user can view material master data for selected plants

Optional Authorization Object: M_MATE_MAR (Material Master Records)
Activity: 03 (Display)
Fields to Check:
• BEGRU (Authorization Group) - Material authorization group
• ACTVT (Activity) - Activity 03 (Display)
Purpose: Restricts access to specific materials based on authorization groups

Custom Authorization Object (Optional): ZMM_STOCK (Custom Stock Report)
Fields:
• ACTVT (Activity) - 03 (Display)
• WERKS (Plant)
• BUKRS (Company Code) - Optional
Purpose: Provides granular control specific to this custom report

Authorization Check Logic:
1. On program start, check user has authorization for at least one plant in selection
2. During data retrieval, filter output to show only materials/plants user is authorized for
3. If user lacks authorization for all selected plants, display error message:
   "You do not have authorization to display stock for the selected plant(s)"
4. Authority-check failures logged in system log (SM21)`,
        level: 2,
      },
      {
        id: '9.2',
        title: 'Role and Profile Requirements',
        content: `Users executing this report should have the following roles or authorization profiles:

Standard SAP Roles:
• SAP_MM_IM_STOCK_DISP (Inventory Management - Stock Display)
  - Provides read access to inventory transactions
  - Includes authorization for MMBE, MB52, and related stock reports

• SAP_MM_IM_ACCOUNTANT (Inventory Accountant)
  - Provides access to stock and valuation data
  - Includes authorization for stock value reporting

Custom Role (To Be Created):
• ZMM_STOCK_REPORTER (Custom Stock Report User)
  - Access to ZMM_SLOC transaction
  - Read access to MARD, MBEW, MARA, MAKT, T001W, T001L
  - Display authorization for assigned plants and storage locations
  - Export to Excel authorization (if restricted)

Authorization Profile Composition:
• Transaction Code: ZMM_SLOC (custom transaction)
• Authorization Objects: M_MSEG_WMB, M_MATE_WRK, M_MATE_MAR (as defined above)
• Table Display Authorization: S_TABU_DIS for tables MARD, MBEW (if accessing via SE16)
• ALV Authorization: S_GUI for ALV export functions

User Groups:
• Inventory Planners - Full access to all plants
• Warehouse Managers - Access restricted to their assigned plants/storage locations
• Financial Accountants - Read-only access for valuation reporting
• Auditors - Temporary access for audit and compliance reviews`,
        level: 2,
      },
      {
        id: '9.3',
        title: 'Data Privacy and Compliance',
        content: `The following data privacy and compliance considerations apply:

Data Sensitivity:
• Stock quantities - Business-sensitive data
• Stock values - Financial data requiring strict access control
• Material numbers and descriptions - May include proprietary product information
• Pricing information - Confidential financial data

Access Logging:
• All report executions will be logged with user ID, date/time, and selection parameters
• Logs retained per company data retention policy
• Audit trail available for compliance reviews

Data Export Controls:
• Excel/CSV export functionality available to authorized users only
• Exported files should be handled per company data classification policy
• Users responsible for securing exported data

Segregation of Duties:
• Report execution (display) separated from stock movement transactions
• Read-only access - no ability to modify stock or master data from report
• Authorization to execute report does not grant modification privileges

Compliance Requirements:
• SOX (Sarbanes-Oxley) compliance - audit trail maintained
• Access reviews conducted quarterly/annually per policy
• Authorization concepts documented and approved by security team`,
        level: 2,
      },
    ],
  },
  {
    id: '10',
    title: 'Output Options',
    content: 'This section describes the output format and interactive features of the report.',
    level: 1,
    subsections: [
      {
        id: '10.1',
        title: 'ALV Grid Display',
        content: `The report output will be presented using SAP ALV (ABAP List Viewer) Grid Control:

ALV Grid Configuration:
• Layout: Full-screen ALV Grid display
• Toolbar: Standard ALV toolbar with all standard functions
• Column Headers: Descriptive text with sort indicators
• Row Selection: Single and multiple row selection enabled
• Grid Lines: Vertical and horizontal grid lines displayed for readability

Display Features:
• Zebra Pattern: Alternating row colors for improved readability
• Optimized Column Width: Auto-adjusted to content or set to optimal width
• Fixed Columns: Material number column fixed when scrolling horizontally (optional)
• Column Sequence: Logical order as defined in Output Layout section
• Responsive Display: Adjust to different screen resolutions

Toolbar Functions:
• Sort Ascending/Descending: Click column headers
• Filter: Apply filters to any column
• Sum: Calculate subtotals and totals
• Find: Search for specific values (Ctrl+F)
• Export: Export to Excel, CSV, or other formats
• Print: Print preview and print to printer or PDF
• Layout: Save, load, and manage custom layouts
• Refresh: Re-execute report with same selections

Interactive Elements:
• Hotspot on Material Number: Double-click to navigate to MM03 (Display Material)
• Right-Click Context Menu: Additional functions and navigation options
• Drill-Down: Click to expand/collapse subtotals (if hierarchical display implemented)

Footer Display:
• Total number of records displayed
• Sum of stock quantities and values at bottom of list
• Report execution timestamp`,
        level: 2,
      },
      {
        id: '10.2',
        title: 'Sorting and Filtering Capabilities',
        content: `The report provides extensive sorting and filtering options:

Sorting Options:
• Single-Column Sort: Click on any column header to sort ascending; click again for descending
• Multi-Column Sort: Hold Shift and click multiple column headers for multi-level sorting
• Default Sort: Material Number (ascending), then Plant, then Storage Location

Recommended Sort Sequences:
1. Material Number → Plant → Storage Location (default)
2. Plant → Storage Location → Material Number (for plant-focused analysis)
3. Total Stock Value (descending) → Material Number (for top value analysis)
4. Last Goods Receipt Date (descending) → Material Number (for activity analysis)

Filtering Capabilities:
• Column Filter: Click filter icon on column header to set filter criteria
• Filter Types:
  - Exact match: Filter for specific values
  - Range filter: Filter by range (e.g., material numbers 1000-2000)
  - Multiple selection: Select multiple values to include
  - Exclude filter: Exclude specific values
  - Wildcard filter: Use * and ? wildcards for pattern matching

Common Filter Use Cases:
• Filter by specific Plant (e.g., show only Plant 1000)
• Filter for materials with Total Stock Value > threshold amount
• Filter for materials with zero Unrestricted Stock
• Filter by Material Group after report execution
• Filter for materials with no Goods Receipt in last 90 days

Search Functionality:
• Press Ctrl+F to open search dialog
• Search across all displayed columns
• Case-insensitive search option
• Search and highlight matching rows

Filter Persistence:
• Applied filters remain active when navigating away and returning to report
• Filters can be saved as part of ALV layout variant
• Clear all filters button available to reset view`,
        level: 2,
      },
      {
        id: '10.3',
        title: 'Export Capabilities',
        content: `Users can export report data in multiple formats:

Export to Microsoft Excel:
• Format: .XLSX (Excel 2007 and later)
• Method: Click "Export" button on ALV toolbar → Select "Spreadsheet"
• Features Preserved:
  - Column headers
  - Data formatting (numbers, decimals, currency)
  - Formulas for calculated columns (optional)
  - Subtotals and grand totals
• File Naming Convention: ZMM_STOCK_BY_SLOC_YYYYMMDD_HHMMSS.xlsx
• File Location: User's local download folder or specified network path

Export to CSV (Comma-Separated Values):
• Format: .CSV (plain text)
• Delimiter: Comma (configurable to semicolon or tab)
• Use Case: For import into other systems or databases
• Features: Raw data without formatting

Export to Local File:
• Format: Unconverted (SAP list format)
• Use Case: Save output in SAP-native format for later viewing
• Re-open: Via AL11 or SAP List Viewer

Additional Export Options:
• Export to Word: Basic table export to .DOC format
• Export to PDF: Generate PDF document via print function
• Export to XML: For system integration purposes
• Send via Email: Attach exported file to email directly from SAP

Export Authorization:
• Export functionality requires S_GUI authorization
• Restricted users may have export disabled
• Export actions logged for audit purposes

Export Guidelines:
• Users responsible for handling exported data per data classification policy
• Do not save sensitive data on unencrypted local drives
• Follow company guidelines for external sharing of data
• Delete exported files after use or store in secure location`,
        level: 2,
      },
      {
        id: '10.4',
        title: 'Subtotals and Aggregations',
        content: `The report includes automatic calculation and display of subtotals and grand totals:

Subtotal Levels:
Level 1: Plant Subtotals
• Displayed after all storage locations for each plant
• Label: "Total for Plant XXXX - [Plant Name]"
• Aggregated Fields:
  - Unrestricted Stock (sum)
  - Quality Inspection Stock (sum)
  - Blocked Stock (sum)
  - Total Stock Quantity (sum)
  - Total Stock Value (sum in plant currency)

Level 2: Grand Total
• Displayed at the end of the report
• Label: "Grand Total - All Plants and Storage Locations"
• Aggregated Fields:
  - Sum of all Unrestricted Stock
  - Sum of all Quality Inspection Stock
  - Sum of all Blocked Stock
  - Sum of all Total Stock Quantity
  - Sum of all Total Stock Value
• Note: If mixed currencies, display note "Mixed currencies - see subtotals"

Subtotal Display Format:
• Bold text for subtotal rows
• Highlighted background color (light gray or light blue)
• Indented text for visual hierarchy
• Subtotal rows not sortable (fixed positions)

Additional Aggregation Options:
Users can manually add aggregations via ALV functions:
• Right-click on numeric column → Select "Sum" to add column total
• Right-click → Select "Average" to calculate average value
• Right-click → Select "Minimum" to show minimum value
• Right-click → Select "Maximum" to show maximum value

Count Display:
• Display count of materials per plant
• Display count of storage locations per plant
• Display total count of line items (detail rows)
• Example: "Total for Plant 1000 (150 materials, 12 storage locations)"`,
        level: 2,
      },
    ],
  },
  {
    id: '11',
    title: 'Testing Requirements',
    content: 'This section outlines the testing scenarios and acceptance criteria for validating the report.',
    level: 1,
    subsections: [
      {
        id: '11.1',
        title: 'Unit Testing Scenarios',
        content: `The following unit test scenarios will be executed during development:

Test Scenario 1: Single Plant Selection
Objective: Verify report retrieves data for a single plant
Test Data:
• Plant: 1000
• Storage Location: (blank - all)
• Material: (blank - all)
Expected Result:
• Report displays all materials with stock in Plant 1000
• All storage locations for Plant 1000 displayed
• Stock quantities and values correctly calculated
• No data from other plants displayed

Test Scenario 2: Multiple Plant Selection
Objective: Verify report retrieves data for multiple plants
Test Data:
• Plant: 1000, 2000, 3000 (multiple selection)
• Storage Location: (blank)
• Material: (blank)
Expected Result:
• Report displays materials from all three plants
• Subtotals displayed for each plant
• Grand total displayed at end
• Plants displayed in sorted order

Test Scenario 3: Specific Storage Location Selection
Objective: Verify filtering by storage location
Test Data:
• Plant: 1000
• Storage Location: 0001, 0002 (specific storage locations)
• Material: (blank)
Expected Result:
• Only storage locations 0001 and 0002 displayed
• Other storage locations in Plant 1000 excluded
• Stock quantities match those in MMBE for selected storage locations

Test Scenario 4: Material Number Selection
Objective: Verify filtering by material number
Test Data:
• Plant: 1000
• Storage Location: (blank)
• Material: 10000000 to 10001000 (range)
Expected Result:
• Only materials in specified range displayed
• All storage locations with stock for these materials displayed
• Materials outside range excluded

Test Scenario 5: Material Group Selection
Objective: Verify filtering by material group
Test Data:
• Plant: 1000
• Storage Location: (blank)
• Material: (blank)
• Material Group: RAW (Raw Materials)
Expected Result:
• Only materials in material group RAW displayed
• All material types excluded
• Material group filter correctly applied

Test Scenario 6: Materials with Zero Stock
Objective: Verify handling of materials with no stock
Test Data:
• Include materials with zero stock in all categories
Expected Result:
• Materials with zero stock excluded from report (or included based on configuration)
• Total stock quantity = 0 for these materials (if included)
• No negative quantities displayed

Test Scenario 7: Non-Valuated Materials
Objective: Verify handling of materials without valuation data
Test Data:
• Materials without MBEW entry
Expected Result:
• Materials displayed with stock quantities
• Price and value displayed as 0.00
• Currency displayed as plant currency
• No errors or exceptions raised

Test Scenario 8: Materials with Standard Price
Objective: Verify price retrieval for standard-priced materials
Test Data:
• Materials with VPRSV = 'S' (Standard Price)
Expected Result:
• Price from MBEW-STPRS displayed
• Stock value calculated using standard price
• Price control indicator displays "Standard Price"

Test Scenario 9: Materials with Moving Average Price
Objective: Verify price retrieval for moving-average-priced materials
Test Data:
• Materials with VPRSV = 'V' (Moving Average)
Expected Result:
• Price from MBEW-VERPR displayed
• Stock value calculated using moving average price
• Price control indicator displays "Moving Avg Price"

Test Scenario 10: Materials with Price Unit ≠ 1
Objective: Verify correct value calculation when price unit is not 1
Test Data:
• Material with PEINH = 100 (price per 100 units)
• Quantity = 500 units
• Price = $50.00 per 100 units
Expected Result:
• Unit price calculated as $50 / 100 = $0.50
• Total value = 500 × $0.50 = $250.00
• Calculation accurately reflects price unit`,
        level: 2,
      },
      {
        id: '11.2',
        title: 'Integration Testing Scenarios',
        content: `The following integration test scenarios will validate end-to-end functionality:

Test Scenario 1: Data Consistency with MMBE
Objective: Verify report output matches standard SAP transaction MMBE
Test Steps:
1. Execute ZMM_SLOC for Plant 1000, Material 10000000
2. Execute MMBE for same plant and material
3. Compare stock quantities and values
Expected Result:
• Unrestricted stock matches MMBE
• Quality inspection stock matches MMBE
• Blocked stock matches MMBE
• Total stock value matches MMBE (within acceptable rounding tolerance)

Test Scenario 2: Authorization Check - Authorized User
Objective: Verify authorized user can execute report
Test Steps:
1. Log in as user with SAP_MM_IM_STOCK_DISP role
2. Execute ZMM_SLOC for assigned plant
3. Review output
Expected Result:
• Report executes successfully
• Data displayed for authorized plants only
• No authorization errors displayed

Test Scenario 3: Authorization Check - Unauthorized User
Objective: Verify unauthorized user cannot execute report or see restricted data
Test Steps:
1. Log in as user without MM inventory authorization
2. Attempt to execute ZMM_SLOC
Expected Result:
• Report execution blocked or returns error message
• Message: "You do not have authorization to display stock for the selected plant(s)"
• No stock data displayed

Test Scenario 4: ALV Export to Excel
Objective: Verify Excel export functionality
Test Steps:
1. Execute report with test data
2. Click "Export" → "Spreadsheet"
3. Open exported Excel file
Expected Result:
• Excel file generated successfully
• All columns and data present
• Formatting preserved (numbers, currency, dates)
• File opens without errors

Test Scenario 5: Subtotals and Grand Totals
Objective: Verify subtotal and grand total calculations
Test Steps:
1. Execute report for multiple plants (e.g., Plant 1000 and 2000)
2. Review subtotals for each plant
3. Review grand total at end
Expected Result:
• Plant subtotals correctly sum all materials in plant
• Grand total equals sum of all plant subtotals
• Calculations accurate to 2 decimal places for values

Test Scenario 6: Empty Storage Locations
Objective: Verify handling when no stock exists for selected criteria
Test Steps:
1. Execute report for plant/storage location with no stock
Expected Result:
• Message displayed: "No stock data found for selected criteria"
• Empty ALV grid displayed
• No system errors or exceptions`,
        level: 2,
      },
      {
        id: '11.3',
        title: 'User Acceptance Testing (UAT) Scenarios',
        content: `The following UAT scenarios will be executed by business users:

UAT Scenario 1: Daily Stock Review by Inventory Planner
User Role: Inventory Planner
Business Process: Daily review of stock levels for assigned plant
Test Steps:
1. Log in and execute ZMM_SLOC
2. Enter Plant 1000
3. Review unrestricted stock for all materials
4. Identify materials with low stock levels
5. Export to Excel for further analysis
Acceptance Criteria:
• Report executes in < 10 seconds for single plant
• Stock quantities match physical inventory expectations
• Export to Excel successful and usable for analysis
• User confirms report meets daily review needs

UAT Scenario 2: Month-End Inventory Valuation by Finance
User Role: Financial Accountant
Business Process: Month-end inventory valuation reporting
Test Steps:
1. Execute ZMM_SLOC for all plants (1000, 2000, 3000)
2. Review total stock values by plant
3. Export data for financial reporting
4. Reconcile totals with general ledger
Acceptance Criteria:
• Report displays stock values for all plants
• Values reconcile with GL account balances (within tolerance)
• Subtotals by plant assist in reconciliation process
• Export suitable for month-end reporting package

UAT Scenario 3: Quality Inspection Stock Monitoring
User Role: Quality Manager
Business Process: Monitor materials in quality inspection status
Test Steps:
1. Execute ZMM_SLOC for all plants
2. Sort by Quality Inspection Stock column (descending)
3. Identify materials with highest QI stock
4. Investigate materials with QI stock > 30 days old
Acceptance Criteria:
• Quality Inspection Stock column displays correctly
• Sorting and filtering work as expected
• Report enables proactive QI stock management
• Identified materials match QM module data

UAT Scenario 4: Blocked Stock Investigation
User Role: Warehouse Manager
Business Process: Review and resolve blocked stock
Test Steps:
1. Execute ZMM_SLOC for assigned plant (Plant 1000)
2. Filter for materials with Blocked Stock > 0
3. Double-click material numbers to view material master (MM03)
4. Document reasons for blocked stock
Acceptance Criteria:
• Blocked stock displayed accurately
• Filtering enables quick identification of blocked materials
• Hotspot navigation to MM03 works correctly
• Report supports blocked stock resolution workflow

UAT Scenario 5: Cross-Plant Stock Analysis
User Role: Supply Chain Analyst
Business Process: Analyze stock distribution across plants
Test Steps:
1. Execute ZMM_SLOC for all plants
2. Review stock quantities by plant for key materials
3. Identify imbalances (excess in one plant, shortage in another)
4. Save custom ALV layout for future use
Acceptance Criteria:
• Multi-plant view enables cross-plant analysis
• Stock quantities accurate and up-to-date
• Custom layout saves and can be reloaded
• Report supports stock redistribution decisions`,
        level: 2,
      },
      {
        id: '11.4',
        title: 'Performance Testing',
        content: `Performance testing will validate report execution times and system resource usage:

Performance Test 1: Single Plant, All Materials
Test Data Volume:
• Plant: 1000
• Materials: 10,000 materials
• Storage Locations: 20 storage locations
Performance Criteria:
• Execution time: < 10 seconds
• Memory consumption: < 200 MB
• No system performance degradation

Performance Test 2: Multiple Plants, Large Data Volume
Test Data Volume:
• Plants: 10 plants
• Materials: 50,000 materials
• Storage Locations: 100 storage locations
Performance Criteria:
• Execution time: < 30 seconds
• Memory consumption: < 500 MB
• Report remains responsive during execution

Performance Test 3: Peak Load Concurrent Users
Test Scenario:
• 50 concurrent users executing report simultaneously
• Mixed selection criteria (single plant, multiple plants)
Performance Criteria:
• Average execution time: < 15 seconds
• No system timeouts or errors
• All users receive complete results

Performance Test 4: Export Large Data Set to Excel
Test Data Volume:
• 50,000 rows of data
Performance Criteria:
• Export completion time: < 60 seconds
• Excel file size: < 20 MB
• File opens successfully in Microsoft Excel

Performance Optimization Considerations:
• Use database indexes on MARD, MBEW, MARA
• Optimize FOR ALL ENTRIES queries
• Consider parallel processing for multiple plants
• Implement data buffering for master data (plant names, storage location descriptions)
• Monitor for performance bottlenecks and optimize as needed`,
        level: 2,
      },
      {
        id: '11.5',
        title: 'Negative Testing Scenarios',
        content: `Negative testing will validate error handling and system stability:

Negative Test 1: Invalid Plant Selection
Test Data:
• Plant: 9999 (non-existent plant)
Expected Result:
• Error message: "Plant 9999 does not exist in system"
• Report does not execute
• User prompted to correct selection

Negative Test 2: Invalid Storage Location
Test Data:
• Plant: 1000
• Storage Location: XXXX (non-existent storage location)
Expected Result:
• Warning message: "Storage location XXXX not found for Plant 1000"
• Report executes but excludes invalid storage location
• Valid data displayed

Negative Test 3: No Plant Entered (Mandatory Field)
Test Data:
• Plant: (blank)
Expected Result:
• Error message: "Plant is a mandatory field. Please enter at least one plant."
• Report does not execute
• Selection screen remains active for correction

Negative Test 4: Negative Stock Quantities (Data Inconsistency)
Test Data:
• Material with negative stock in MARD (data error)
Expected Result:
• Material displayed with negative quantity
• Row highlighted in red to indicate data issue
• Optional: Warning message logged to application log

Negative Test 5: Missing Valuation Data
Test Data:
• Material exists in MARD but not in MBEW
Expected Result:
• Material displayed with quantities
• Price displayed as 0.00
• Value displayed as 0.00
• No system error or exception

Negative Test 6: Authorization Failure During Execution
Test Data:
• User with authorization for Plant 1000 only
• Attempt to select Plant 1000 and 2000
Expected Result:
• Report executes but displays only Plant 1000 data
• Plant 2000 excluded from output
• Optional: Warning message about excluded plants

Negative Test 7: Database Timeout (Simulated)
Test Scenario:
• Simulate database connection timeout
Expected Result:
• Error message: "Database timeout. Please try again or contact support."
• Report terminates gracefully
• No system dump or short dump

Negative Test 8: Excessive Data Volume (Stress Test)
Test Data:
• Selection criteria resulting in > 100,000 rows
Expected Result:
• Warning message: "Selection criteria may result in large data volume. Continue? (Y/N)"
• If user proceeds, report executes with progress indicator
• Option to refine selection criteria if needed`,
        level: 2,
      },
    ],
  },
  {
    id: '12',
    title: 'Assumptions and Constraints',
    content: 'This section documents assumptions made during specification and known constraints.',
    level: 1,
    subsections: [
      {
        id: '12.1',
        title: 'Assumptions',
        content: `The following assumptions have been made in developing this functional specification:

Data Availability:
• MARD table contains accurate and up-to-date stock quantities for all storage locations
• MBEW table contains complete valuation data for all valuated materials
• Material master data (MARA, MAKT) is maintained and current
• Organizational data (T001W, T001L) is configured correctly for all plants and storage locations

System Configuration:
• SAP ECC or S/4HANA system with MM module fully implemented
• Standard SAP tables (MARD, MBEW, MARA, MAKT, T001W, T001L) are available and not customized
• Authorization objects (M_MSEG_WMB, M_MATE_WRK) are configured and assigned to user roles
• ABAP development environment is available for custom report development

Business Process:
• Report will be executed on-demand by authorized users (not scheduled as batch job in initial version)
• Current date stock is sufficient for initial implementation (historical stock not required)
• Users have basic SAP navigation skills and familiarity with ALV reports
• Stock quantities in base unit of measure are acceptable (no alternative unit conversions required)

Technical Environment:
• SAP GUI version 7.60 or higher installed on user workstations
• Microsoft Excel 2016 or higher available for export functionality
• Network connectivity between SAP system and user workstations is stable
• Sufficient system resources (memory, CPU) available for report execution

Authorization and Security:
• Authorization concept for MM inventory reporting is defined and implemented
• Users have appropriate roles assigned before report deployment
• Authorization checks at plant level are sufficient (no material-level authorization initially)

Testing and Deployment:
• Development, Quality Assurance, and Production environments available for testing
• Test data representative of production data volume and scenarios is available
• Two-week UAT window allocated for business user testing
• Transport mechanism (transport request) available for promoting code to production`,
        level: 2,
      },
      {
        id: '12.2',
        title: 'Constraints',
        content: `The following constraints apply to this report and must be considered:

Functional Constraints:
• Report displays current stock only; historical stock as of past dates not supported in version 1.0
• Currency conversion not implemented; values displayed in plant currency only
• Batch-level details not included; batch-managed materials show aggregated quantities only
• Special stock categories (consignment, project stock, etc.) excluded from scope
• Material document history and movement details not displayed
• Serial number details not included for serialized materials

Technical Constraints:
• Report performance dependent on data volume; execution time may increase with large datasets
• FOR ALL ENTRIES queries limited to practical internal table sizes to avoid performance issues
• Database read authorization required for underlying tables (MARD, MBEW, etc.)
• ALV Grid requires SAP GUI; web-based or Fiori interface not included in this specification
• Export to Excel limited to approximately 1 million rows due to Excel limitations

Authorization Constraints:
• Authorization checks at plant and material group level; more granular checks (e.g., storage type) not implemented
• Users must have display authorization for material master and inventory transactions
• Authorization to export data may be restricted based on user role
• Cross-company code reporting may be restricted by authorization concept

Data Quality Constraints:
• Report accuracy dependent on master data quality (material master, organizational data)
• Negative stock may be displayed if data inconsistencies exist in MARD
• Missing MBEW entries result in zero valuation (system does not error)
• Material descriptions may be missing if not maintained in material master

Resource Constraints:
• Development effort estimated at 40-60 hours (ABAP developer)
• Testing effort estimated at 20-30 hours (functional analyst + business users)
• Deployment window requires system downtime or change control approval
• Ongoing support and maintenance require dedicated resources

Timeline Constraints:
• Development: 2-3 weeks
• Testing (Unit + Integration): 1 week
• UAT: 2 weeks
• Production deployment: Subject to change control schedule
• Total estimated timeline: 6-8 weeks from specification approval to production go-live

Organizational Constraints:
• Changes to scope require approval from project sponsor and business owner
• Enhancements or additional features deferred to future versions
• Report design and functionality aligned with standard SAP MM best practices
• Compliance with company IT security and data governance policies`,
        level: 2,
      },
    ],
  },
  {
    id: '13',
    title: 'Dependencies and Prerequisites',
    content: 'This section identifies dependencies and prerequisites that must be satisfied before development and deployment.',
    level: 1,
    subsections: [
      {
        id: '13.1',
        title: 'Technical Prerequisites',
        content: `The following technical prerequisites must be in place:

SAP System Requirements:
• SAP ECC 6.0 or higher, or SAP S/4HANA 1809 or higher
• ABAP application server with development access
• SAP GUI version 7.60 or higher installed on user workstations
• Transport management system configured for code promotion

Database Requirements:
• Direct read access to tables: MARD, MBEW, MARA, MAKT, T001W, T001L
• Database indexes on MARD (primary key: MATNR, WERKS, LGORT)
• Database performance tuning completed if large data volumes anticipated

Authorization Setup:
• Authorization objects M_MSEG_WMB and M_MATE_WRK configured
• User roles with appropriate authorizations created or updated
• Test users with varying authorization levels available for testing
• Custom authorization object (if required) created and assigned

Development Tools:
• Access to SE38 (ABAP Editor) or SE80 (Object Navigator)
• Access to SE93 (Transaction Code maintenance) for creating custom transaction
• Access to transport request for code migration
• Version control or documentation repository for code management

Testing Environment:
• Quality Assurance (QA) system with representative test data
• Test data covering: single/multiple plants, various material types, valuated/non-valuated materials
• Authorization test users with different access levels
• Connectivity for UAT users to access QA system`,
        level: 2,
      },
      {
        id: '13.2',
        title: 'Business Prerequisites',
        content: `The following business prerequisites must be satisfied:

Master Data Readiness:
• Material master data (MARA, MAKT) is complete and accurate for all relevant materials
• Organizational data (plants, storage locations) configured in T001W and T001L
• Material valuation (MBEW) maintained for all valuated materials
• Material groups (T023) configured and assigned to materials

Organizational Readiness:
• Business owner identified and approved scope of report
• Key users identified for UAT participation
• Training plan developed for end users (if required)
• Support model defined for post-go-live issues

Process Readiness:
• Business processes requiring this report are documented
• Report usage scenarios and frequency defined
• Data governance policies for exported data communicated to users
• Escalation process for data discrepancies or issues established

Documentation:
• FSD (this document) reviewed and approved by business and technical stakeholders
• Technical specification document (TSD) to be created by ABAP developer after FSD approval
• User guide or quick reference documentation planned for post-deployment
• Training materials prepared (if required)`,
        level: 2,
      },
      {
        id: '13.3',
        title: 'Dependencies',
        content: `The following dependencies must be considered:

Upstream Dependencies:
• Completion and approval of this Functional Specification Document (FSD)
• Availability of ABAP developer with MM module experience
• Approval of development effort and resource allocation by project manager
• Authorization concept approval by security team

Concurrent Activities:
• No conflicting changes to MARD, MBEW, or other source tables during development
• No major SAP upgrades or patches scheduled during development and testing windows
• Coordination with other MM-related development projects to avoid conflicts

Downstream Dependencies:
• Successful completion of unit testing before promotion to QA
• Successful completion of integration and UAT before production deployment
• Approval from change advisory board (CAB) for production deployment
• Communication to end users before go-live (training, documentation, announcement)

External Dependencies:
• Microsoft Excel availability for export functionality
• Network infrastructure supporting SAP GUI connectivity
• End-user workstation compatibility with SAP GUI requirements
• Backup and recovery procedures in place for production deployment

Risk Mitigation:
• Identify backup developer in case primary developer is unavailable
• Allocate buffer time in project schedule for unforeseen issues
• Conduct early proof-of-concept to validate technical feasibility
• Establish rollback plan in case of critical issues post-deployment`,
        level: 2,
      },
    ],
  },
  {
    id: '14',
    title: 'Success Criteria and KPIs',
    content: 'This section defines the criteria for measuring the success of the report implementation.',
    level: 1,
    subsections: [
      {
        id: '14.1',
        title: 'Functional Success Criteria',
        content: `The report will be considered functionally successful if the following criteria are met:

Data Accuracy:
• Stock quantities match MMBE transaction output (100% accuracy)
• Stock values reconcile with financial reporting (within 0.1% tolerance)
• Material descriptions and organizational data displayed correctly
• Last goods receipt dates accurate and up-to-date

Performance:
• Report execution time < 10 seconds for single plant with up to 10,000 materials
• Report execution time < 30 seconds for multiple plants with up to 50,000 materials
• Export to Excel completes in < 60 seconds for large datasets
• No system performance degradation during concurrent user access

Usability:
• Users can execute report without extensive training (intuitive selection screen)
• ALV functions (sort, filter, export) work as expected without errors
• Subtotals and grand totals calculate correctly
• Hotspot navigation to MM03 functions properly

Reliability:
• Report executes without errors or system dumps (zero critical defects)
• Error messages are clear and actionable when issues occur
• Authorization checks prevent unauthorized access (100% compliance)
• Data export maintains data integrity and format`,
        level: 2,
      },
      {
        id: '14.2',
        title: 'User Acceptance Criteria',
        content: `User acceptance will be confirmed when the following criteria are satisfied:

Business User Feedback:
• 90% of UAT participants rate report as "meets requirements" or better
• Users confirm report addresses original business need
• Users can complete intended workflows using report (daily stock review, month-end reconciliation, etc.)
• Users prefer custom report over existing workarounds or manual processes

Key User Sign-Off:
• Inventory Planners approve report for daily stock monitoring
• Financial Accountants approve report for inventory valuation purposes
• Warehouse Managers approve report for storage location analysis
• Quality Managers approve report for QI stock monitoring

Documentation Acceptance:
• User guide reviewed and approved by business users
• Training materials (if provided) are clear and sufficient
• Business process documentation updated to include report usage

Go-Live Readiness:
• All critical and high-priority UAT defects resolved
• Medium and low-priority defects documented and scheduled for future releases
• Contingency plan in place for post-go-live support
• Business owner provides formal sign-off for production deployment`,
        level: 2,
      },
      {
        id: '14.3',
        title: 'Key Performance Indicators (KPIs)',
        content: `The following KPIs will be tracked post-implementation to measure report success:

Usage Metrics:
• Number of report executions per day/week/month
• Target: Minimum 50 executions per week (indicating user adoption)
• Number of unique users executing report
• Target: 80% of authorized users execute report within first month

Performance Metrics:
• Average report execution time
• Target: < 10 seconds for typical single-plant selections
• 95th percentile execution time
• Target: < 20 seconds
• Number of performance-related incidents or complaints
• Target: Zero critical performance issues after go-live

Quality Metrics:
• Number of production defects reported in first 90 days
• Target: < 5 non-critical defects
• Number of data discrepancy reports
• Target: < 2 per month (attributable to report logic vs. master data issues)
• User satisfaction score
• Target: > 4.0 out of 5.0 in post-implementation survey

Business Impact Metrics:
• Time saved per user per report execution vs. previous process
• Target: 50% reduction in time to gather stock data
• Number of users who discontinue manual workarounds
• Target: 100% of users adopt new report
• Reduction in inventory reconciliation discrepancies
• Target: 20% improvement in inventory accuracy

Support Metrics:
• Number of support tickets related to report
• Target: < 10 tickets per month after stabilization period
• Average time to resolve support tickets
• Target: < 48 hours for non-critical issues
• User training requests
• Target: Declining trend after initial training period`,
        level: 2,
      },
    ],
  },
  {
    id: '15',
    title: 'Appendix',
    content: 'This section includes supporting documentation, reference materials, and additional information.',
    level: 1,
    subsections: [
      {
        id: '15.1',
        title: 'Glossary of Terms',
        content: `The following terms and abbreviations are used in this document:

ABAP - Advanced Business Application Programming (SAP programming language)
ALV - ABAP List Viewer (standard SAP reporting format)
Blocked Stock - Stock that is blocked from use due to quality or other reasons (SPEME)
BWKEY - Valuation Area (typically corresponds to plant)
Company Code - Organizational unit representing a legal entity for financial reporting
FSD - Functional Specification Document
Material Group - Classification of materials for grouping and analysis purposes (MATKL)
Material Master - Central repository of material data in SAP (tables MARA, MARC, MARD, etc.)
Material Number - Unique identifier for materials in SAP (MATNR)
MBEW - Material Valuation table containing price and valuation data
MM - Materials Management module in SAP
Moving Average Price (MAP) - Valuation method where price is recalculated with each goods receipt (VERPR)
MARA - General Material Data table
MARD - Storage Location Data for Material table
MAKT - Material Descriptions table
Plant - Physical location or site for manufacturing, storage, or distribution (WERKS)
Quality Inspection Stock - Stock currently undergoing quality inspection (INSME)
SAP - Systems, Applications, and Products in Data Processing (enterprise software)
Standard Price - Fixed price set manually in material master (STPRS)
Storage Location - Subdivision of plant for storing materials (LGORT)
T001L - Storage Locations master data table
T001W - Plants/Branches master data table
TSD - Technical Specification Document (to be created by developer)
UAT - User Acceptance Testing
Unit of Measure (UOM) - Unit in which material quantity is measured (e.g., PC, KG, M) - field MEINS
Unrestricted Stock - Stock available for unrestricted use (LABST)
Valuation Type - Further classification for split valuation scenarios (BWTAR)
Z-Program - Custom-developed ABAP program (prefix "Z" denotes customer namespace)`,
        level: 2,
      },
      {
        id: '15.2',
        title: 'Reference Documents',
        content: `The following reference documents were consulted or should be referenced during implementation:

SAP Standard Documentation:
• SAP Help Portal - Materials Management (MM) Module Documentation
• SAP Table Documentation: MARD, MBEW, MARA, MAKT, T001W, T001L
• SAP Authorization Object Documentation: M_MSEG_WMB, M_MATE_WRK
• SAP Transaction Documentation: MMBE (Stock Overview), MB52 (List of Warehouse Stocks)

Company-Specific Documents:
• SAP MM Master Data Standards and Guidelines (document reference: [Insert Doc ID])
• SAP Authorization and Security Policy (document reference: [Insert Doc ID])
• Data Governance and Classification Policy (document reference: [Insert Doc ID])
• SAP Development Standards and Naming Conventions (document reference: [Insert Doc ID])
• Change Management and Deployment Procedures (document reference: [Insert Doc ID])

Related Project Documents:
• Project Charter - SAP MM Reporting Enhancements (document reference: [Insert Doc ID])
• Business Requirements Document (BRD) - Inventory Reporting (document reference: [Insert Doc ID])
• Technical Specification Document (TSD) - ZMM_STOCK_BY_SLOC (to be created)
• Test Plan and Test Cases - ZMM_STOCK_BY_SLOC (to be created)
• User Guide - Stock by Storage Location Report (to be created)

External References:
• ABAP Development Guidelines - SAP Community
• ALV Grid Control Best Practices
• SAP MM Best Practices Guide`,
        level: 2,
      },
      {
        id: '15.3',
        title: 'Sample Report Output',
        content: `Sample output format (illustrative):

Material Number | Material Description      | Plant | Plant Name | Storage Location | Storage Loc Name | UoM | Unrestricted | Quality Insp | Blocked | Total Qty | Price   | Total Value | Currency | Last GR Date | Price Type
10000001       | Raw Material A           | 1000  | Plant US01 | 0001            | Main Warehouse   | KG  | 1,500.000   | 0.000       | 0.000   | 1,500.000 | 10.50   | 15,750.00   | USD      | 01/15/2024  | Standard Price
10000001       | Raw Material A           | 1000  | Plant US01 | 0002            | Quality Area     | KG  | 0.000       | 250.000     | 0.000   | 250.000   | 10.50   | 2,625.00    | USD      | 01/10/2024  | Standard Price
10000002       | Component B              | 1000  | Plant US01 | 0001            | Main Warehouse   | PC  | 5,000.000   | 0.000       | 100.000 | 5,100.000 | 2.75    | 14,025.00   | USD      | 01/18/2024  | Moving Avg Price
10000003       | Packaging Material C     | 1000  | Plant US01 | 0001            | Main Warehouse   | M   | 2,000.000   | 0.000       | 0.000   | 2,000.000 | 1.25    | 2,500.00    | USD      | 01/12/2024  | Standard Price
---
Total for Plant 1000 - Plant US01                                                                        8,500.000   | 250.000     | 100.000 | 8,850.000 |         | 34,900.00   | USD
---

Grand Total - All Plants and Storage Locations                                                          8,500.000   | 250.000     | 100.000 | 8,850.000 |         | 34,900.00   | USD

Number of Materials: 3
Number of Storage Locations: 2
Report Execution Date/Time: ${new Date().toLocaleString()}

Note: This is a simplified illustrative example. Actual output will be in ALV Grid format with full SAP GUI functionality.`,
        level: 2,
      },
      {
        id: '15.4',
        title: 'Approval and Sign-Off',
        content: `This Functional Specification Document requires formal approval from the following stakeholders:

Business Owner:
Name: [To be assigned]
Title: [Title]
Signature: _________________ Date: _______
Comments:

Functional Lead (MM):
Name: [To be assigned]
Title: SAP MM Functional Lead
Signature: _________________ Date: _______
Comments:

Technical Lead (ABAP):
Name: [To be assigned]
Title: SAP ABAP Technical Lead
Signature: _________________ Date: _______
Comments:

Project Manager:
Name: [To be assigned]
Title: IT Project Manager
Signature: _________________ Date: _______
Comments:

Security/Authorization Lead:
Name: [To be assigned]
Title: SAP Security Analyst
Signature: _________________ Date: _______
Comments:

Final Approval Authority:
Name: [To be assigned]
Title: [Senior Manager/Director]
Signature: _________________ Date: _______
Comments:

Approval Date: _______________

Document Status: ☐ Draft  ☐ Under Review  ☐ Approved  ☐ Rejected

Change Control:
Any changes to this approved FSD must be submitted via formal change request process and require re-approval from affected stakeholders.`,
        level: 2,
      },
    ],
  },
];
