import type { DocumentSection } from '../types/document';

export const technicalTemplate: DocumentSection[] = [
  {
    id: '1',
    title: 'Document Information',
    content: 'This section contains the document metadata and revision history.',
    level: 1,
    subsections: [
      {
        id: '1.1',
        title: 'Document Properties',
        content: 'Document Title: [Enter Document Title]\nProject Name: [Enter Project Name]\nModule: [Enter SAP Module]\nDeveloper: [Enter Developer Name]\nDate: [Enter Date]\nVersion: 1.0',
        level: 2,
      },
      {
        id: '1.2',
        title: 'Revision History',
        content: 'Version | Date | Developer | Description\n1.0 | [Date] | [Developer] | Initial version',
        level: 2,
      },
    ],
  },
  {
    id: '2',
    title: 'Technical Overview',
    content: 'Provide a technical summary of the development requirements and approach. This section should give developers a high-level understanding of the technical solution.',
    level: 1,
  },
  {
    id: '3',
    title: 'Development Requirements',
    content: 'Describe the technical requirements derived from functional specifications.',
    level: 1,
    subsections: [
      {
        id: '3.1',
        title: 'Development Objects',
        content: 'List all development objects to be created or modified:\n\nPrograms:\n• Program 1: [Name] - [Description]\n• Program 2: [Name] - [Description]\n\nFunction Modules:\n• FM 1: [Name] - [Description]\n• FM 2: [Name] - [Description]\n\nClasses:\n• Class 1: [Name] - [Description]\n• Class 2: [Name] - [Description]\n\nDatabase Tables:\n• Table 1: [Name] - [Description]\n• Table 2: [Name] - [Description]',
        level: 2,
      },
      {
        id: '3.2',
        title: 'Technical Architecture',
        content: 'Describe the technical architecture and design patterns:\n\n• Architecture Pattern: [e.g., MVC, Layered, etc.]\n• Technologies Used: [ABAP OO, BAPI, RFC, etc.]\n• Design Approach: [Description]\n• Performance Considerations: [Description]',
        level: 2,
      },
    ],
  },
  {
    id: '4',
    title: 'Data Model',
    content: 'Define database tables and structures.',
    level: 1,
    subsections: [
      {
        id: '4.1',
        title: 'Custom Tables',
        content: 'Table: [Table Name]\nDescription: [Purpose of table]\n\nField Name | Data Element | Type | Length | Key | Description\n[FIELD1] | [DE_NAME] | CHAR | 10 | X | [Description]\n[FIELD2] | [DE_NAME] | NUMC | 6 | | [Description]\n[FIELD3] | [DE_NAME] | DATS | 8 | | [Description]\n\nIndexes:\n• Index 1: [Field list]\n• Index 2: [Field list]',
        level: 2,
      },
      {
        id: '4.2',
        title: 'Structures',
        content: 'Structure: [Structure Name]\nDescription: [Purpose]\n\nField Name | Data Element | Type | Length | Description\n[FIELD1] | [DE_NAME] | CHAR | 10 | [Description]\n[FIELD2] | [DE_NAME] | NUMC | 6 | [Description]',
        level: 2,
      },
      {
        id: '4.3',
        title: 'Table Relationships',
        content: 'Describe foreign key relationships and table dependencies:\n\n[Table A] -> [Table B]\n• Relationship Type: [1:1, 1:N, M:N]\n• Foreign Key Fields: [List fields]\n• Cardinality: [Description]',
        level: 2,
      },
    ],
  },
  {
    id: '5',
    title: 'Program Specifications',
    content: 'Detailed specifications for custom programs.',
    level: 1,
    subsections: [
      {
        id: '5.1',
        title: 'Reports',
        content: 'Program Name: [Program Name]\nType: Report\nTransaction Code: [T-Code]\n\nSelection Screen:\n• Parameter 1: [Name] - [Description] - [Type]\n• Select-Option 1: [Name] - [Description] - [Table-Field]\n\nProcessing Logic:\n1. [Step 1 description]\n2. [Step 2 description]\n3. [Step 3 description]\n\nOutput:\n• ALV Grid Display\n• Column 1: [Field] - [Description]\n• Column 2: [Field] - [Description]',
        level: 2,
      },
      {
        id: '5.2',
        title: 'Function Modules',
        content: 'Function Module: [FM Name]\nFunction Group: [Function Group]\n\nPurpose: [Description]\n\nImport Parameters:\n• Parameter 1: [Name] - [Type] - [Description]\n• Parameter 2: [Name] - [Type] - [Description]\n\nExport Parameters:\n• Parameter 1: [Name] - [Type] - [Description]\n• Parameter 2: [Name] - [Type] - [Description]\n\nTables:\n• Table 1: [Name] - [Type] - [Description]\n\nExceptions:\n• Exception 1: [Name] - [Condition]\n• Exception 2: [Name] - [Condition]\n\nProcessing Logic:\n1. [Step 1]\n2. [Step 2]\n3. [Step 3]',
        level: 2,
      },
      {
        id: '5.3',
        title: 'Classes and Methods',
        content: 'Class Name: [Class Name]\nType: [Local/Global]\n\nPurpose: [Description]\n\nAttributes:\n• Attribute 1: [Name] - [Type] - [Visibility] - [Description]\n• Attribute 2: [Name] - [Type] - [Visibility] - [Description]\n\nMethods:\nMethod: [Method Name]\n• Visibility: [Public/Protected/Private]\n• Importing: [Parameters]\n• Exporting: [Parameters]\n• Returning: [Parameter]\n• Description: [What the method does]\n• Logic: [Processing steps]',
        level: 2,
      },
    ],
  },
  {
    id: '6',
    title: 'Interface Specifications',
    content: 'Technical specifications for interfaces.',
    level: 1,
    subsections: [
      {
        id: '6.1',
        title: 'Inbound Interfaces',
        content: 'Interface Name: [Interface Name]\n\nTechnical Details:\n• Protocol: [RFC/IDoc/API/File]\n• Message Type: [Type]\n• Frequency: [Real-time/Batch]\n\nData Mapping:\nSource Field | Target Field | Transformation Rules\n[SOURCE1] | [TARGET1] | [Rule description]\n[SOURCE2] | [TARGET2] | [Rule description]\n\nError Handling:\n• Error Scenario 1: [Description] - [Handling approach]\n• Error Scenario 2: [Description] - [Handling approach]',
        level: 2,
      },
      {
        id: '6.2',
        title: 'Outbound Interfaces',
        content: 'Interface Name: [Interface Name]\n\nTechnical Details:\n• Protocol: [RFC/IDoc/API/File]\n• Message Type: [Type]\n• Frequency: [Real-time/Batch]\n\nData Mapping:\nSource Field | Target Field | Transformation Rules\n[SOURCE1] | [TARGET1] | [Rule description]\n[SOURCE2] | [TARGET2] | [Rule description]\n\nError Handling:\n• Error Scenario 1: [Description] - [Handling approach]\n• Error Scenario 2: [Description] - [Handling approach]',
        level: 2,
      },
    ],
  },
  {
    id: '7',
    title: 'Enhancement Specifications',
    content: 'Document standard SAP enhancements.',
    level: 1,
    subsections: [
      {
        id: '7.1',
        title: 'User Exits',
        content: 'User Exit: [Exit Name]\nProgram: [Program Name]\nEnhancement: [Enhancement Name]\n\nPurpose: [Description]\n\nImplementation:\n• Include: [Include name]\n• Logic: [Processing description]\n• Tables/Structures Used: [List]',
        level: 2,
      },
      {
        id: '7.2',
        title: 'BAdIs',
        content: 'BAdI: [BAdI Name]\nInterface: [Interface Name]\n\nPurpose: [Description]\n\nImplementation Class: [Class Name]\n\nMethods Implemented:\n• Method 1: [Name] - [Description] - [Logic]\n• Method 2: [Name] - [Description] - [Logic]',
        level: 2,
      },
      {
        id: '7.3',
        title: 'Implicit Enhancements',
        content: 'Enhancement: [Enhancement Name]\nProgram/Class: [Name]\nEnhancement Point: [Location]\n\nPurpose: [Description]\n\nCode:\n[ABAP code snippet or pseudo-code]',
        level: 2,
      },
    ],
  },
  {
    id: '8',
    title: 'Configuration Specifications',
    content: 'Technical configuration requirements.',
    level: 1,
    subsections: [
      {
        id: '8.1',
        title: 'Customizing Settings',
        content: 'Transaction: [Transaction Code]\nTable: [Customizing Table]\n\nSettings:\nField | Value | Description\n[FIELD1] | [VALUE1] | [Description]\n[FIELD2] | [VALUE2] | [Description]',
        level: 2,
      },
      {
        id: '8.2',
        title: 'Transport Requirements',
        content: 'Transport Strategy:\n• Development Transport: [TR Number/Pattern]\n• Configuration Transport: [TR Number/Pattern]\n• Transport Route: [DEV -> QAS -> PRD]\n\nDependencies:\n• Prerequisite Transport 1: [Description]\n• Prerequisite Transport 2: [Description]',
        level: 2,
      },
    ],
  },
  {
    id: '9',
    title: 'Error Handling and Logging',
    content: 'Define error handling strategy and logging requirements.',
    level: 1,
    subsections: [
      {
        id: '9.1',
        title: 'Exception Handling',
        content: 'Exception Type | Handling Approach | User Message\n[Exception 1] | [Try-Catch/Raise/Return] | [Message text]\n[Exception 2] | [Try-Catch/Raise/Return] | [Message text]\n\nError Message Classes:\n• Message Class: [Class]\n• Message Numbers: [List messages]',
        level: 2,
      },
      {
        id: '9.2',
        title: 'Application Logging',
        content: 'Log Object: [Object Name]\nLog Subobject: [Subobject Name]\n\nLogging Points:\n• Event 1: [Description] - [Log level: Error/Warning/Info]\n• Event 2: [Description] - [Log level: Error/Warning/Info]\n\nRetention Period: [Duration]',
        level: 2,
      },
    ],
  },
  {
    id: '10',
    title: 'Performance Optimization',
    content: 'Document performance considerations and optimization techniques.',
    level: 1,
    subsections: [
      {
        id: '10.1',
        title: 'Database Optimization',
        content: '• Use secondary indexes on: [Tables and fields]\n• Avoid SELECT * - specify field list\n• Use SELECT SINGLE where applicable\n• Implement buffering for: [Tables]\n• Package size for internal tables: [Size]\n• Use FOR ALL ENTRIES with duplicate check',
        level: 2,
      },
      {
        id: '10.2',
        title: 'Processing Optimization',
        content: '• Parallel processing approach: [Description]\n• Background job requirements: [Yes/No]\n• Memory management: [Approach]\n• Commit work strategy: [Description]',
        level: 2,
      },
    ],
  },
  {
    id: '11',
    title: 'Unit Testing',
    content: 'Define unit test cases for development objects.',
    level: 1,
    subsections: [
      {
        id: '11.1',
        title: 'Test Cases',
        content: 'Test Case 1:\n• Object: [Program/FM/Class]\n• Test Data: [Input values]\n• Expected Result: [Output]\n• Actual Result: [To be filled during testing]\n• Status: [Pass/Fail]\n\nTest Case 2:\n• Object: [Program/FM/Class]\n• Test Data: [Input values]\n• Expected Result: [Output]\n• Actual Result: [To be filled during testing]\n• Status: [Pass/Fail]',
        level: 2,
      },
      {
        id: '11.2',
        title: 'Code Review Checklist',
        content: '• Naming conventions followed\n• Error handling implemented\n• Code commented appropriately\n• Performance considerations addressed\n• Authorization checks included\n• Transport request assigned\n• Unit tests passed',
        level: 2,
      },
    ],
  },
  {
    id: '12',
    title: 'Appendix',
    content: 'Include supporting technical documentation.',
    level: 1,
    subsections: [
      {
        id: '12.1',
        title: 'Code Snippets',
        content: 'Include key code snippets for reference:\n\n[Code snippet 1]\n\n[Code snippet 2]',
        level: 2,
      },
      {
        id: '12.2',
        title: 'Technical References',
        content: '• SAP Documentation: [Link/Reference]\n• Related Technical Specs: [Document names]\n• External Resources: [Links]',
        level: 2,
      },
    ],
  },
];
