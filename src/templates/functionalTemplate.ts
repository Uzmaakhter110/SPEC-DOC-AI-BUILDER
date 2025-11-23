import type { DocumentSection } from '../types/document';

export const functionalTemplate: DocumentSection[] = [
  {
    id: '1',
    title: 'Document Information',
    content: 'This section contains the document metadata and revision history.',
    level: 1,
    subsections: [
      {
        id: '1.1',
        title: 'Document Properties',
        content: 'Document Title: [Enter Document Title]\nProject Name: [Enter Project Name]\nModule: [Enter SAP Module]\nAuthor: [Enter Author Name]\nDate: [Enter Date]\nVersion: 1.0',
        level: 2,
      },
      {
        id: '1.2',
        title: 'Revision History',
        content: 'Version | Date | Author | Description\n1.0 | [Date] | [Author] | Initial version',
        level: 2,
      },
    ],
  },
  {
    id: '2',
    title: 'Executive Summary',
    content: 'Provide a brief overview of the functional requirements and objectives of this specification. This section should give stakeholders a high-level understanding of the business need and proposed solution.',
    level: 1,
  },
  {
    id: '3',
    title: 'Business Requirements',
    content: 'Describe the business requirements that drive this specification.',
    level: 1,
    subsections: [
      {
        id: '3.1',
        title: 'Business Objectives',
        content: 'List the key business objectives this solution aims to achieve:\n\n• Objective 1: [Description]\n• Objective 2: [Description]\n• Objective 3: [Description]',
        level: 2,
      },
      {
        id: '3.2',
        title: 'Business Process Overview',
        content: 'Describe the current business process (As-Is) and the desired future state (To-Be).\n\nAs-Is Process:\n[Describe current process]\n\nTo-Be Process:\n[Describe future process]\n\nGap Analysis:\n[Describe gaps between As-Is and To-Be]',
        level: 2,
      },
    ],
  },
  {
    id: '4',
    title: 'Functional Requirements',
    content: 'Detail the specific functional requirements for the SAP solution.',
    level: 1,
    subsections: [
      {
        id: '4.1',
        title: 'Process Flow',
        content: 'Describe the end-to-end process flow:\n\n1. [Step 1]\n2. [Step 2]\n3. [Step 3]\n\nInclude process flow diagrams where applicable.',
        level: 2,
      },
      {
        id: '4.2',
        title: 'User Roles and Authorizations',
        content: 'Define user roles and their access requirements:\n\nRole 1: [Role Name]\n• Responsibilities: [Description]\n• Required Access: [SAP Transactions/Functions]\n• Authorization Level: [Read/Write/Execute]\n\nRole 2: [Role Name]\n• Responsibilities: [Description]\n• Required Access: [SAP Transactions/Functions]\n• Authorization Level: [Read/Write/Execute]',
        level: 2,
      },
      {
        id: '4.3',
        title: 'Data Requirements',
        content: 'Specify data elements and structures:\n\nData Object 1:\n• Description: [Description]\n• Data Fields: [List fields]\n• Data Sources: [Source systems/tables]\n• Validation Rules: [Business rules]\n\nData Object 2:\n• Description: [Description]\n• Data Fields: [List fields]\n• Data Sources: [Source systems/tables]\n• Validation Rules: [Business rules]',
        level: 2,
      },
      {
        id: '4.4',
        title: 'Screen/UI Requirements',
        content: 'Describe user interface requirements:\n\n• Screen fields and layouts\n• Input validations\n• Mandatory vs. optional fields\n• Default values\n• Field-level help text',
        level: 2,
      },
    ],
  },
  {
    id: '5',
    title: 'Integration Requirements',
    content: 'Describe integration points with other systems or modules.',
    level: 1,
    subsections: [
      {
        id: '5.1',
        title: 'Inbound Interfaces',
        content: 'Interface 1:\n• Source System: [System Name]\n• Integration Method: [RFC/API/File/IDoc]\n• Data Objects: [List data objects]\n• Frequency: [Real-time/Batch/Scheduled]\n• Error Handling: [Error handling approach]',
        level: 2,
      },
      {
        id: '5.2',
        title: 'Outbound Interfaces',
        content: 'Interface 1:\n• Target System: [System Name]\n• Integration Method: [RFC/API/File/IDoc]\n• Data Objects: [List data objects]\n• Frequency: [Real-time/Batch/Scheduled]\n• Error Handling: [Error handling approach]',
        level: 2,
      },
    ],
  },
  {
    id: '6',
    title: 'Reporting Requirements',
    content: 'Define reporting and analytics requirements.',
    level: 1,
    subsections: [
      {
        id: '6.1',
        title: 'Standard Reports',
        content: 'Report 1: [Report Name]\n• Purpose: [Description]\n• Data Sources: [Tables/Views]\n• Selection Criteria: [Parameters]\n• Output Format: [PDF/Excel/Display]\n• Schedule: [On-demand/Scheduled]',
        level: 2,
      },
      {
        id: '6.2',
        title: 'Custom Reports',
        content: 'Report 1: [Report Name]\n• Purpose: [Description]\n• Data Sources: [Tables/Views]\n• Selection Criteria: [Parameters]\n• Output Format: [PDF/Excel/Display]\n• Schedule: [On-demand/Scheduled]',
        level: 2,
      },
    ],
  },
  {
    id: '7',
    title: 'Configuration Requirements',
    content: 'List SAP configuration settings required to support the functionality.',
    level: 1,
    subsections: [
      {
        id: '7.1',
        title: 'Master Data Configuration',
        content: '• Configuration item 1: [Description]\n• Configuration item 2: [Description]\n• Configuration item 3: [Description]',
        level: 2,
      },
      {
        id: '7.2',
        title: 'Customizing Tables',
        content: 'Table 1: [Table Name]\n• Purpose: [Description]\n• Fields to Configure: [List fields]\n\nTable 2: [Table Name]\n• Purpose: [Description]\n• Fields to Configure: [List fields]',
        level: 2,
      },
    ],
  },
  {
    id: '8',
    title: 'Testing Requirements',
    content: 'Define testing scope and approach.',
    level: 1,
    subsections: [
      {
        id: '8.1',
        title: 'Test Scenarios',
        content: 'Test Scenario 1:\n• Description: [Scenario description]\n• Test Steps: [List steps]\n• Expected Result: [Expected outcome]\n\nTest Scenario 2:\n• Description: [Scenario description]\n• Test Steps: [List steps]\n• Expected Result: [Expected outcome]',
        level: 2,
      },
      {
        id: '8.2',
        title: 'Acceptance Criteria',
        content: 'Define the criteria for successful completion:\n\n• Criterion 1: [Description]\n• Criterion 2: [Description]\n• Criterion 3: [Description]',
        level: 2,
      },
    ],
  },
  {
    id: '9',
    title: 'Assumptions and Constraints',
    content: 'Document any assumptions made and constraints identified.',
    level: 1,
    subsections: [
      {
        id: '9.1',
        title: 'Assumptions',
        content: '• Assumption 1: [Description]\n• Assumption 2: [Description]\n• Assumption 3: [Description]',
        level: 2,
      },
      {
        id: '9.2',
        title: 'Constraints',
        content: '• Constraint 1: [Description]\n• Constraint 2: [Description]\n• Constraint 3: [Description]',
        level: 2,
      },
    ],
  },
  {
    id: '10',
    title: 'Appendix',
    content: 'Include supporting documentation, diagrams, and reference materials.',
    level: 1,
    subsections: [
      {
        id: '10.1',
        title: 'Glossary',
        content: 'Term 1: [Definition]\nTerm 2: [Definition]\nTerm 3: [Definition]',
        level: 2,
      },
      {
        id: '10.2',
        title: 'References',
        content: '• Reference Document 1: [Title and location]\n• Reference Document 2: [Title and location]\n• Reference Document 3: [Title and location]',
        level: 2,
      },
    ],
  },
];
